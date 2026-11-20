import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';

export function StatusBadge({ status, size = 'sm' }) {
  const configs = {
    pending: {
      label: 'Pendiente',
      icon: Clock,
      classes: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60'
    },
    reviewing: {
      label: 'En revisión',
      icon: Eye,
      classes: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/60'
    },
    in_progress: {
      label: 'En atención',
      icon: Sparkles,
      classes: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60'
    },
    resolved: {
      label: 'Resuelto',
      icon: CheckCircle2,
      classes: 'bg-mint-50 text-mint-800 border-mint-200 dark:bg-mint-950/50 dark:text-mint-300 dark:border-mint-800/60'
    },
    rejected: {
      label: 'Desestimado',
      icon: AlertCircle,
      classes: 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-slate-800 dark:text-stone-400 dark:border-slate-700'
    }
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border shadow-sm ${config.classes} ${sizeClasses}`}>
      <Icon className={size === 'xs' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
}

export function IncidentBadge({ type, size = 'sm' }) {
  const configs = {
    heces_sin_recoger: { label: 'Heces sin recoger', color: 'bg-coral-50 text-coral-700 border-coral-200 dark:bg-coral-950/40 dark:text-coral-300' },
    orina_fachada: { label: 'Orina en fachada', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
    mascota_suelta: { label: 'Mascota suelta', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },
    maltrato: { label: 'Riesgo / Maltrato', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300' }
  };

  const config = configs[type] || { label: type, color: 'bg-stone-100 text-stone-700 border-stone-200' };
  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-bold rounded-full border ${config.color} ${sizeClasses}`}>
      {config.label}
    </span>
  );
}

export function DistrictBadge({ district }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-slate-700">
      <span className="w-1.5 h-1.5 rounded-full bg-mint-500"></span>
      {district}
    </span>
  );
}
