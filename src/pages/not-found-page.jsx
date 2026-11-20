import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6">
      <div className="w-28 h-28 rounded-3xl bg-mint-50 dark:bg-mint-950/40 border border-mint-200 dark:border-mint-800 flex items-center justify-center text-4xl shadow-sm">
        🐶🔍
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs font-bold text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200">
          Error 404 · Ruta no encontrada
        </span>
        <h1 className="font-display font-black text-3xl text-stone-900 dark:text-stone-100">
          ¡Guau! Parece que esta página se extravió
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          No pudimos encontrar la sección que estás buscando en EcoHuellitas Norte. Revisa el enlace o regresa a la página principal.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Volver atrás
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
          Ir al Inicio
        </Button>
      </div>
    </div>
  );
}
