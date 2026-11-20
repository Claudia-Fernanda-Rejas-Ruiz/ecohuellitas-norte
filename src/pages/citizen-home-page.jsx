import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Camera, Plus, QrCode, Filter, Search, Trash2, Edit3, ArrowRight, Eye } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { useData } from '../context/data-context';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardBody } from '../components/ui/card';
import { FilterChip } from '../components/ui/chip';
import { StatusBadge, IncidentBadge, DistrictBadge } from '../components/ui/badge';
import { PetCredentialCard } from '../components/common/pet-credential-card';
import { Modal } from '../components/ui/modal';
import { EmptyState } from '../components/ui/empty-state';

export function CitizenHomePage() {
  const { user } = useAuth();
  const { pets, reports, deletePet, deleteReport } = useData();
  const navigate = useNavigate();

  const [selectedPetQR, setSelectedPetQR] = useState(null);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [petToDelete, setPetToDelete] = useState(null);

  // Filtrado de mascotas
  const myPets = pets.filter((p) => {
    if (districtFilter !== 'all' && p.district !== districtFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.registrationCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtrado de reportes
  const filteredReports = reports.filter((r) => {
    if (districtFilter !== 'all' && r.district !== districtFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const confirmDeletePet = async () => {
    if (petToDelete) {
      await deletePet(petToDelete.id);
      setPetToDelete(null);
    }
  };

  return (
    <div className="space-y-10 text-left">
      
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-black text-2xl text-stone-900 dark:text-stone-100">
              ¡Hola, {user?.name || 'Vecino'}!
            </h2>
            <span className="text-[11px] font-bold bg-mint-50 dark:bg-mint-950/60 text-mint-700 dark:text-mint-400 px-2.5 py-0.5 rounded-full border border-mint-200 dark:border-mint-800">
              {user?.district || 'Los Olivos'}
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Gestiona tus mascotas registradas, emite reportes de salubridad y sigue su atención.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="coral"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => navigate('/report')}
          >
            Reportar Foco
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/pets/new')}
          >
            Nueva Mascota
          </Button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm">
        
        {/* District Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="Todos los Distritos"
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
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, código..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-mint-500"
          />
        </div>

      </div>

      {/* Section 1: Mis Mascotas Registradas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100">
              Padrón de Mascotas ({myPets.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Carnés oficiales con QR para collar y control veterinario.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/pets/new')}
          >
            Empadronar Mascota
          </Button>
        </div>

        {myPets.length === 0 ? (
          <EmptyState
            title="No hay mascotas en este filtro"
            description="Registra a tu mascota para obtener su credencial y QR oficial."
            actionLabel="Registrar mi Mascota"
            onAction={() => navigate('/pets/new')}
            iconType="dog"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPets.map((pet) => (
              <PetCredentialCard
                key={pet.id}
                pet={pet}
                onShowQR={(p) => setSelectedPetQR(p)}
                onDelete={(id) => setPetToDelete(pet)}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Reportes de Salubridad Registrados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100">
              Reportes de Salubridad en Lima Norte ({filteredReports.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Focos de heces, orina o infracciones en seguimiento municipal.
            </p>
          </div>
          <Button
            variant="coral"
            size="sm"
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={() => navigate('/report')}
          >
            Nuevo Reporte
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="Todos los estados"
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          />
          <FilterChip
            label="Pendientes"
            active={statusFilter === 'pending'}
            onClick={() => setStatusFilter('pending')}
          />
          <FilterChip
            label="En revisión"
            active={statusFilter === 'reviewing'}
            onClick={() => setStatusFilter('reviewing')}
          />
          <FilterChip
            label="En atención"
            active={statusFilter === 'in_progress'}
            onClick={() => setStatusFilter('in_progress')}
          />
          <FilterChip
            label="Resueltos"
            active={statusFilter === 'resolved'}
            onClick={() => setStatusFilter('resolved')}
          />
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <EmptyState
            title="Sin reportes registrados"
            description="No hay focos de suciedad con estos criterios. ¡Mantengamos el distrito limpio!"
            actionLabel="Crear Nuevo Reporte"
            onAction={() => navigate('/report')}
            iconType="report"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                hoverEffect
                onClick={() => navigate(`/reports/${report.id}`)}
                className="overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-stone-100 dark:bg-slate-800">
                    <img
                      src={report.photoUrl}
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <IncidentBadge type={report.incidentType} />
                    </div>
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={report.status} />
                    </div>
                  </div>

                  <CardBody className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="font-mono">#{report.id}</span>
                      <span>{new Date(report.createdAt).toLocaleDateString('es-PE')}</span>
                    </div>

                    <h4 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-1">
                      {report.title}
                    </h4>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {report.description}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                      <DistrictBadge district={report.district} />
                      <span className="truncate text-[11px] text-stone-400">{report.address}</span>
                    </div>
                  </CardBody>
                </div>

                <div className="p-4 pt-0 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-mint-700 dark:text-mint-400 font-bold">
                  <span>Ver historial y mapa</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>

      {/* QR Modal */}
      <Modal
        isOpen={!!selectedPetQR}
        onClose={() => setSelectedPetQR(null)}
        title={`Carné Oficial: ${selectedPetQR?.name}`}
        maxWidth="max-w-sm"
      >
        {selectedPetQR && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-white rounded-3xl border-4 border-mint-500 inline-block shadow-md">
              <img
                src={selectedPetQR.qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48 mx-auto object-contain rounded-xl"
              />
            </div>
            <div className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200">
              {selectedPetQR.registrationCode}
            </div>
            <p className="text-xs text-stone-500">
              Código QR oficial para lectura por inspectores municipales.
            </p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                alert(`Imprimiendo carné digital de ${selectedPetQR.name}...`);
                setSelectedPetQR(null);
              }}
            >
              Descargar / Imprimir
            </Button>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!petToDelete}
        onClose={() => setPetToDelete(null)}
        title="¿Dar de baja esta mascota?"
        maxWidth="max-w-md"
      >
        {petToDelete && (
          <div className="space-y-4 text-left">
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Estás por eliminar a <strong>{petToDelete.name}</strong> ({petToDelete.registrationCode}) del padrón municipal de {petToDelete.district}. Podrás deshacer esta acción durante los próximos segundos.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setPetToDelete(null)}>
                Cancelar
              </Button>
              <Button variant="danger" size="sm" onClick={confirmDeletePet}>
                Confirmar Baja
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
