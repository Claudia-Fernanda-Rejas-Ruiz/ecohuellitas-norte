import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Crosshair, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Input, Textarea } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card, CardBody } from '../components/ui/card';

export function ReportWizardPage() {
  const { user } = useAuth();
  const { createReport } = useData();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdReport, setCreatedReport] = useState(null);

  const [formData, setFormData] = useState({
    title: 'Heces sin recoger en parque comunal',
    incidentType: 'heces_sin_recoger',
    district: user?.district || 'Los Olivos',
    address: 'Parque Central de Covida, Calle Los Naranjos cdra 3',
    coordinates: { lat: -11.9922, lng: -77.0708 },
    photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    description: 'Vecino pasea a su mascota temprano y deja desechos en la zona infantil.',
    priority: 'alta',
    citizenName: user?.name || 'Claudia Rejas'
  });

  const samplePhotos = [
    { label: 'Heces en vereda', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80' },
    { label: 'Orina en fachada', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80' },
    { label: 'Perro suelto', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80' },
    { label: 'Parque afectado', url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80' }
  ];

  const districtCoords = {
    'Los Olivos': { lat: -11.9922, lng: -77.0708 },
    'Comas': { lat: -11.9355, lng: -77.0540 },
    'San Martín de Porres': { lat: -12.0160, lng: -77.0580 },
    'Independencia': { lat: -11.9880, lng: -77.0490 }
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: dist,
      coordinates: districtCoords[dist] || prev.coordinates
    }));
  };

  const detectGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            coordinates: {
              lat: Number(pos.coords.latitude.toFixed(6)),
              lng: Number(pos.coords.longitude.toFixed(6))
            }
          }));
        },
        () => {
          alert('No se pudo obtener el GPS en este navegador. Usando coordenadas distritales.');
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const rep = await createReport(formData);
      setCreatedReport(rep);
      setStep(4); // Success step
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      
      {/* Step Indicator */}
      {step < 4 && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs font-bold text-stone-400">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-mint-600 dark:text-mint-400 font-black' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-mint-600 text-white' : 'bg-stone-100 dark:bg-slate-800'}`}>
              1
            </span>
            <span>Tipo e Imagen</span>
          </div>
          <div className="w-8 h-0.5 bg-stone-200 dark:bg-slate-700"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-mint-600 dark:text-mint-400 font-black' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-mint-600 text-white' : 'bg-stone-100 dark:bg-slate-800'}`}>
              2
            </span>
            <span>Ubicación GPS</span>
          </div>
          <div className="w-8 h-0.5 bg-stone-200 dark:bg-slate-700"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-mint-600 dark:text-mint-400 font-black' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-mint-600 text-white' : 'bg-stone-100 dark:bg-slate-800'}`}>
              3
            </span>
            <span>Confirmar</span>
          </div>
        </div>
      )}

      {/* STEP 1: Tipo de Incidente y Foto */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
              Paso 1 de 3
            </span>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100 mt-1">
              ¿Qué tipo de infracción deseas reportar?
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Selecciona la categoría del foco de salubridad para derivar a serenazgo o cuadrilla.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { id: 'heces_sin_recoger', label: 'Heces sin recoger', sub: 'Vereda o parque', icon: '💩' },
              { id: 'orina_fachada', label: 'Orina en fachada', sub: 'Pared / esquina', icon: '💦' },
              { id: 'mascota_suelta', label: 'Perro suelto', sub: 'Sin correa ni bozal', icon: '🐕' },
              { id: 'maltrato', label: 'Riesgo / Maltrato', sub: 'Abandono animal', icon: '❤️‍🩹' }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setFormData((p) => ({ ...p, incidentType: item.id }))}
                className={`
                  p-4 rounded-2xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition
                  ${formData.incidentType === item.id
                    ? 'border-mint-600 bg-mint-50/80 dark:bg-mint-950/40 shadow-sm'
                    : 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 hover:border-mint-300'}
                `}
              >
                <div className="text-2xl">{item.icon}</div>
                <span className="font-bold text-stone-900 dark:text-stone-100">{item.label}</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">{item.sub}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Input
              label="Título del Reporte"
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              required
            />

            <Input
              label="Fotografía de Evidencia (URL)"
              value={formData.photoUrl}
              onChange={(e) => setFormData((p) => ({ ...p, photoUrl: e.target.value }))}
              placeholder="https://..."
              required
            />

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-400">O elige una foto de muestra:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, photoUrl: item.url }))}
                    className="text-[10px] font-medium bg-stone-100 dark:bg-slate-800 hover:bg-mint-50 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-lg border border-stone-200 dark:border-slate-700 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              onClick={() => setStep(2)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continuar a Ubicación
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: Ubicación & Coordenadas */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
              Paso 2 de 3
            </span>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100 mt-1">
              Ubicación del Punto Crítico
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Indica la dirección exacta para el patrullaje de serenazgo y cuadrillas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Distrito de Lima Norte"
              value={formData.district}
              onChange={handleDistrictChange}
              options={[
                { value: 'Los Olivos', label: 'Los Olivos' },
                { value: 'Comas', label: 'Comas' },
                { value: 'San Martín de Porres', label: 'San Martín de Porres' },
                { value: 'Independencia', label: 'Independencia' }
              ]}
            />

            <Input
              label="Dirección o Referencia"
              value={formData.address}
              onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
              placeholder="Ej. Jr. Las Palmeras cdra 4"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitud"
              value={formData.coordinates.lat}
              onChange={(e) => setFormData((p) => ({ ...p, coordinates: { ...p.coordinates, lat: parseFloat(e.target.value) || 0 } }))}
              type="number"
              step="any"
            />
            <Input
              label="Longitud"
              value={formData.coordinates.lng}
              onChange={(e) => setFormData((p) => ({ ...p, coordinates: { ...p.coordinates, lng: parseFloat(e.target.value) || 0 } }))}
              type="number"
              step="any"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={detectGPS}
              className="text-xs text-mint-700 dark:text-mint-400 font-bold flex items-center gap-1.5 bg-mint-50 dark:bg-mint-950/60 px-3 py-1.5 rounded-xl border border-mint-200 dark:border-mint-800"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Obtener ubicación actual por GPS</span>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Anterior
            </Button>
            <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continuar a Confirmación
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: Confirmación y Envío */}
      {step === 3 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
              Paso 3 de 3
            </span>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100 mt-1">
              Revisar y Enviar Reporte
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Verifica los datos antes de ingresar la alerta a la mesa de fiscalización.
            </p>
          </div>

          <Textarea
            label="Detalle u Horario de Recurrencia"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            placeholder="Ej. Vecino saca al perro sin correa todos los días a las 7am..."
          />

          {/* Resumen Box */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Resumen del Reporte
            </span>
            <div className="flex justify-between">
              <span className="text-stone-500">Distrito:</span>
              <strong className="text-stone-800 dark:text-stone-200">{formData.district}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tipo de infracción:</span>
              <strong className="text-stone-800 dark:text-stone-200">{formData.incidentType}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Dirección:</span>
              <strong className="text-stone-800 dark:text-stone-200">{formData.address}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Coordenadas:</span>
              <strong className="font-mono text-stone-800 dark:text-stone-200">
                {formData.coordinates.lat}, {formData.coordinates.lng}
              </strong>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Anterior
            </Button>
            <Button
              variant="coral"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Enviar a Fiscalización Municipal
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: Success Screen */}
      {step === 4 && createdReport && (
        <Card className="p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-mint-50 dark:bg-mint-950/60 text-mint-600 dark:text-mint-400 border border-mint-200 dark:border-mint-800 flex items-center justify-center text-3xl shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold bg-mint-100 dark:bg-mint-950 text-mint-800 dark:text-mint-300 px-3 py-1 rounded-full border border-mint-300 dark:border-mint-800">
              Reporte #{createdReport.id}
            </span>
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
              ¡Reporte Registrado con Éxito!
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
              La alerta ha sido enviada a la central de serenazgo y cuadrilla de limpieza de <strong>{createdReport.district}</strong>. Puedes ver su estado en el mapa comunitario.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => navigate(`/reports/${createdReport.id}`)}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Ver Detalle del Reporte
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/map')}
              leftIcon={<MapPin className="w-4 h-4" />}
            >
              Ver en Mapa Comunitario
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setStep(1);
                setCreatedReport(null);
              }}
            >
              Crear Otro Reporte
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
}
