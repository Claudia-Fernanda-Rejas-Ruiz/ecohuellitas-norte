import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardBody } from '../components/ui/card';
import { StatusBadge, IncidentBadge, DistrictBadge } from '../components/ui/badge';
import { Timeline } from '../components/ui/timeline';
import { Modal } from '../components/ui/modal';

const customPin = L.divIcon({
  className: 'custom-map-pin',
  html: `<div style="background-color: #F43F5E; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">📍</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isInspector } = useAuth();
  const { reports, updateReportStatus, assignReportInspector, addReportComment, deleteReport } = useData();

  const [commentText, setCommentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Reporte no encontrado</h2>
        <Button variant="primary" onClick={() => navigate('/pets')}>
          Volver a Mis Mascotas / Reportes
        </Button>
      </div>
    );
  }

  const handleStatusChange = async (newStatus) => {
    await updateReportStatus(report.id, newStatus, user);
  };

  const handleAssignToMe = async () => {
    await assignReportInspector(report.id, user.id, user.name, user);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await addReportComment(report.id, user, commentText);
    setCommentText('');
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await deleteReport(report.id, user);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Volver atrás
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-stone-400">#{report.id}</span>
          <StatusBadge status={report.status} />
          {user?.role === 'admin' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Evidence & Map */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4 overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <IncidentBadge type={report.incidentType} />
                <DistrictBadge district={report.district} />
              </div>
              <h1 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
                {report.title}
              </h1>
            </div>

            {/* Photo */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-800">
              <img
                src={report.photoUrl}
                alt="Foto del reporte"
                className="w-full h-72 object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Detalle del Incidente
              </span>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-stone-200 dark:border-slate-700">
                {report.description}
              </p>
            </div>

            {/* Georeference & Map View */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Ubicación Georreferenciada
                </span>
                <span className="font-mono text-stone-400 text-[11px]">
                  {report.coordinates.lat}, {report.coordinates.lng}
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                {report.address} ({report.district})
              </p>

              <div className="h-48 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800">
                <MapContainer
                  center={[report.coordinates.lat, report.coordinates.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[report.coordinates.lat, report.coordinates.lng]}
                    icon={customPin}
                  >
                    <Popup>{report.address}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Inspector Actions & Activity Timeline */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action Box */}
          <Card className="p-6 space-y-4">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Gestión de Fiscalización
            </h3>

            {/* Status Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-600 dark:text-stone-400 block">
                Cambiar Estado de Atención:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleStatusChange('pending')}
                  className={`p-2.5 rounded-xl border font-bold text-center transition ${report.status === 'pending' ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-50 dark:bg-slate-800 border-stone-200 dark:border-slate-700'}`}
                >
                  Pendiente
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('reviewing')}
                  className={`p-2.5 rounded-xl border font-bold text-center transition ${report.status === 'reviewing' ? 'bg-sky-500 text-white border-sky-500' : 'bg-stone-50 dark:bg-slate-800 border-stone-200 dark:border-slate-700'}`}
                >
                  En Revisión
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('in_progress')}
                  className={`p-2.5 rounded-xl border font-bold text-center transition ${report.status === 'in_progress' ? 'bg-purple-600 text-white border-purple-600' : 'bg-stone-50 dark:bg-slate-800 border-stone-200 dark:border-slate-700'}`}
                >
                  En Atención
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('resolved')}
                  className={`p-2.5 rounded-xl border font-bold text-center transition ${report.status === 'resolved' ? 'bg-mint-600 text-white border-mint-600' : 'bg-stone-50 dark:bg-slate-800 border-stone-200 dark:border-slate-700'}`}
                >
                  Resuelto
                </button>
              </div>
            </div>

            {/* Inspector Assignment */}
            <div className="pt-2 border-t border-stone-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Inspector Responsable:</span>
                <strong className="text-stone-900 dark:text-stone-100">
                  {report.assignedInspectorName || 'Sin asignar'}
                </strong>
              </div>

              {!report.assignedInspectorId && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleAssignToMe}
                >
                  Asignarme este reporte
                </Button>
              )}
            </div>
          </Card>

          {/* Timeline & Notes */}
          <Card className="p-6 space-y-4">
            <h3 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
              Historial de Atención y Notas
            </h3>

            <Timeline items={report.timeline} />

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-stone-100 dark:border-slate-800 space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Añadir nota de patrullaje o desinfección..."
                rows={2}
                className="w-full text-xs p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Registrar Nota
                </Button>
              </div>
            </form>
          </Card>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="¿Eliminar este reporte?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-stone-600 dark:text-stone-300">
            Esta acción eliminará permanentemente el reporte <strong>#{report.id}</strong> del sistema. Podrás restaurarlo durante unos segundos mediante la notificación de deshacer.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete} isLoading={isDeleting}>
              Confirmar Eliminación
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
