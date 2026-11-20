import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Camera, Filter, Eye, ArrowRight, Layers, Sparkles, X, AlertCircle } from 'lucide-react';
import { useData } from '../context/data-context';
import { Card } from '../components/ui/card';
import { FilterChip } from '../components/ui/chip';
import { StatusBadge, IncidentBadge, DistrictBadge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// Helper to center the map when district changes
function MapCenterController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet HTML Pin Icon generator
function createCustomPin(color, typeIcon) {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        ${typeIcon}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

export function MapPage() {
  const { reports, cleanPoints } = useData();
  const navigate = useNavigate();

  const [districtFilter, setDistrictFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCleanPoints, setShowCleanPoints] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  const districtCoordinates = {
    all: { center: [-11.9800, -77.0600], zoom: 12 },
    'Los Olivos': { center: [-11.9922, -77.0708], zoom: 14 },
    'Comas': { center: [-11.9355, -77.0540], zoom: 13 },
    'San Martín de Porres': { center: [-12.0160, -77.0580], zoom: 13 },
    'Independencia': { center: [-11.9880, -77.0490], zoom: 14 }
  };

  const currentView = districtCoordinates[districtFilter] || districtCoordinates.all;

  // Filtrado de reportes
  const filteredReports = reports.filter((r) => {
    if (districtFilter !== 'all' && r.district !== districtFilter) return false;
    if (typeFilter !== 'all' && r.incidentType !== typeFilter) return false;
    return true;
  });

  // Filtrado de puntos limpios
  const filteredCleanPoints = cleanPoints.filter((cp) => {
    if (districtFilter !== 'all' && cp.district !== districtFilter) return false;
    return true;
  });

  const getPinColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B'; // Amber
      case 'reviewing': return '#0284C7'; // Sky
      case 'in_progress': return '#7C3AED'; // Purple
      case 'resolved': return '#10B981'; // Mint
      default: return '#6B7280';
    }
  };

  const getTypeSymbol = (type) => {
    switch (type) {
      case 'heces_sin_recoger': return '💩';
      case 'orina_fachada': return '💦';
      case 'mascota_suelta': return '🐕';
      case 'maltrato': return '❤️‍🩹';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner & Filters */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-mint-600" /> Mapa Comunitario de Salubridad
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Visualiza en tiempo real los puntos críticos reportados y estaciones de limpieza en Lima Norte.
            </p>
          </div>

          <Button
            variant="coral"
            size="sm"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => navigate('/report')}
          >
            Reportar Punto Aquí
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1">
            Distrito:
          </span>
          <FilterChip
            label="Todos"
            active={districtFilter === 'all'}
            onClick={() => setDistrictFilter('all')}
          />
          <FilterChip
            label="Los Olivos"
            active={districtFilter === 'Los Olivos'}
            onClick={() => setDistrictFilter('Los Olivos')}
          />
          <FilterChip
            label="Comas"
            active={districtFilter === 'Comas'}
            onClick={() => setDistrictFilter('Comas')}
          />
          <FilterChip
            label="SMP"
            active={districtFilter === 'San Martín de Porres'}
            onClick={() => setDistrictFilter('San Martín de Porres')}
          />
          <FilterChip
            label="Independencia"
            active={districtFilter === 'Independencia'}
            onClick={() => setDistrictFilter('Independencia')}
          />

          <div className="hidden md:block w-px h-6 bg-stone-200 dark:bg-slate-700 mx-2"></div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1">
            Tipo:
          </span>
          <FilterChip
            label="Todos"
            active={typeFilter === 'all'}
            onClick={() => setTypeFilter('all')}
          />
          <FilterChip
            label="Heces"
            active={typeFilter === 'heces_sin_recoger'}
            onClick={() => setTypeFilter('heces_sin_recoger')}
          />
          <FilterChip
            label="Orina"
            active={typeFilter === 'orina_fachada'}
            onClick={() => setTypeFilter('orina_fachada')}
          />
          <FilterChip
            label="Perro Suelto"
            active={typeFilter === 'mascota_suelta'}
            onClick={() => setTypeFilter('mascota_suelta')}
          />

          <label className="ml-auto flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 cursor-pointer bg-stone-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-stone-200 dark:border-slate-700">
            <input
              type="checkbox"
              checked={showCleanPoints}
              onChange={(e) => setShowCleanPoints(e.target.checked)}
              className="w-3.5 h-3.5 text-mint-600 rounded"
            />
            <span>Mostrar Puntos Limpios</span>
          </label>
        </div>
      </div>

      {/* Map + Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Main Map */}
        <div className={`transition-all duration-300 ${selectedReport ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-card">
            <MapContainer
              center={currentView.center}
              zoom={currentView.zoom}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <MapCenterController center={currentView.center} zoom={currentView.zoom} />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Render Report Markers */}
              {filteredReports.map((report) => {
                const pin = createCustomPin(getPinColor(report.status), getTypeSymbol(report.incidentType));
                return (
                  <Marker
                    key={report.id}
                    position={[report.coordinates.lat, report.coordinates.lng]}
                    icon={pin}
                    eventHandlers={{
                      click: () => setSelectedReport(report)
                    }}
                  >
                    <Popup>
                      <div className="text-left space-y-1.5 p-1 max-w-[200px]">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-stone-400">#{report.id}</span>
                          <StatusBadge status={report.status} size="xs" />
                        </div>
                        <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{report.title}</h4>
                        <p className="text-[10px] text-stone-500 line-clamp-2">{report.address}</p>
                        <button
                          type="button"
                          onClick={() => setSelectedReport(report)}
                          className="w-full text-center text-[10px] font-bold text-mint-700 bg-mint-50 py-1 rounded-lg border border-mint-200 mt-1"
                        >
                          Ver Detalle Completo
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Render Clean Points */}
              {showCleanPoints &&
                filteredCleanPoints.map((cp) => {
                  const greenPin = createCustomPin('#10B981', '🗑️');
                  return (
                    <Marker
                      key={cp.id}
                      position={[cp.coordinates.lat, cp.coordinates.lng]}
                      icon={greenPin}
                    >
                      <Popup>
                        <div className="text-left space-y-1 p-1">
                          <span className="text-[10px] font-bold text-mint-700 uppercase">Punto Limpio / Tacho</span>
                          <h4 className="font-bold text-xs text-stone-900">{cp.name}</h4>
                          <p className="text-[10px] text-stone-500">{cp.address}</p>
                          <span className="text-[9px] text-stone-400 block font-mono">Último vaciado: {cp.lastEmptied}</span>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          </div>

          {/* Map Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm flex-shrink-0"></span>
              <span className="font-semibold text-stone-700 dark:text-stone-300">Pendiente</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <span className="w-3.5 h-3.5 rounded-full bg-sky-500 shadow-sm flex-shrink-0"></span>
              <span className="font-semibold text-stone-700 dark:text-stone-300">En revisión</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-sm flex-shrink-0"></span>
              <span className="font-semibold text-stone-700 dark:text-stone-300">En atención</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <span className="w-3.5 h-3.5 rounded-full bg-mint-500 shadow-sm flex-shrink-0"></span>
              <span className="font-semibold text-stone-700 dark:text-stone-300">Resuelto / Limpio</span>
            </div>
          </div>
        </div>

        {/* Selected Report Drawer */}
        {selectedReport && (
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-6 space-y-4 relative">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pr-8">
                <span className="font-mono text-[10px] text-stone-400">#{selectedReport.id}</span>
                <h3 className="font-display font-black text-lg text-stone-900 dark:text-stone-100">
                  {selectedReport.title}
                </h3>
              </div>

              <img
                src={selectedReport.photoUrl}
                alt="Evidencia"
                className="w-full h-44 object-cover rounded-2xl border border-stone-200 dark:border-slate-700"
              />

              <div className="flex items-center gap-2">
                <IncidentBadge type={selectedReport.incidentType} />
                <StatusBadge status={selectedReport.status} />
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-stone-400 text-[10px] uppercase font-bold">Ubicación:</span>
                <p className="font-medium text-stone-800 dark:text-stone-200">{selectedReport.address}</p>
                <DistrictBadge district={selectedReport.district} />
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-stone-200 dark:border-slate-700">
                {selectedReport.description}
              </p>

              <div className="pt-2 flex justify-between gap-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate(`/reports/${selectedReport.id}`)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Ver Ficha Completa
                </Button>
              </div>
            </Card>
          </div>
        )}

      </div>

    </div>
  );
}
