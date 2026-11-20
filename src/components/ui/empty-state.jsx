import React from 'react';
import { Button } from './button';

export function EmptyState({
  title = 'No se encontraron resultados',
  description = 'Intenta ajustar los filtros de búsqueda o registra un nuevo elemento.',
  actionLabel,
  onAction,
  iconType = 'dog' // 'dog', 'cat', 'search', 'report'
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto space-y-4">
      <div className="w-24 h-24 rounded-3xl bg-mint-50 dark:bg-mint-950/40 border border-mint-200 dark:border-mint-800 flex items-center justify-center text-mint-600 dark:text-mint-400 shadow-sm">
        {iconType === 'dog' && (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.5 1 1.62-.659 2.334-1.63 4-2.828" />
            <path d="M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.5 1-1.62-.659-2.334-1.63-4-2.828" />
            <path d="M12 14c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="9" cy="11" r="1.5" fill="currentColor" />
            <circle cx="15" cy="11" r="1.5" fill="currentColor" />
            <path d="M12 15v1" />
          </svg>
        )}
        {iconType === 'report' && (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-black text-lg text-stone-900 dark:text-stone-100">{title}</h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
