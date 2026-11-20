import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PawPrint, FileText, MapPin, LayoutDashboard, ArrowRight, X } from 'lucide-react';
import { useData } from '../../context/data-context';
import { Modal } from '../ui/modal';

export function CommandMenu() {
  const { commandOpen, setCommandOpen, pets, reports } = useData();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandOpen]);

  const handleSelect = (path) => {
    setCommandOpen(false);
    setQuery('');
    navigate(path);
  };

  const filteredPets = query.trim()
    ? pets.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.breed.toLowerCase().includes(query.toLowerCase()) ||
          p.registrationCode.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredReports = query.trim()
    ? reports.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.address.toLowerCase().includes(query.toLowerCase()) ||
          r.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <Modal
      isOpen={commandOpen}
      onClose={() => setCommandOpen(false)}
      maxWidth="max-w-xl"
      showCloseButton={false}
    >
      <div className="space-y-4 text-left">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-stone-200 dark:border-slate-800 pb-3">
          <Search className="w-5 h-5 text-stone-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar mascotas, reportes, distritos o pantallas..."
            className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setCommandOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Route Shortcuts */}
        {!query.trim() && (
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Navegación Rápida
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSelect('/')}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 hover:bg-mint-50 dark:hover:bg-mint-950/40 text-stone-700 dark:text-stone-200 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2">
                  <PawPrint className="w-4 h-4 text-mint-600" />
                  <span className="font-bold">Inicio</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelect('/report')}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 hover:bg-coral-50 dark:hover:bg-coral-950/40 text-stone-700 dark:text-stone-200 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-coral-600" />
                  <span className="font-bold">Reportar Foco</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelect('/map')}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 hover:bg-mint-50 dark:hover:bg-mint-950/40 text-stone-700 dark:text-stone-200 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-mint-600" />
                  <span className="font-bold">Mapa en Vivo</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelect('/dashboard')}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-200 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Panel Municipal</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Mascotas Encontradas */}
        {filteredPets.length > 0 && (
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Mascotas en Padrón
            </span>
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => handleSelect('/pets')}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <span className="font-bold text-stone-900 dark:text-stone-100">{pet.name}</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 ml-2">
                      {pet.breed} · {pet.district}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] bg-mint-50 dark:bg-mint-950/60 text-mint-700 dark:text-mint-400 px-2 py-0.5 rounded-full border border-mint-200 dark:border-mint-800">
                  {pet.registrationCode}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reportes Encontrados */}
        {filteredReports.length > 0 && (
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Reportes de Salubridad
            </span>
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => handleSelect(`/reports/${report.id}`)}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition"
              >
                <div className="truncate max-w-sm">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block truncate">
                    {report.title}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {report.address} · {report.district}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-stone-400 ml-2">#{report.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
