import React from 'react';
import { Clock, CheckCircle, ShieldAlert, User, FileText } from 'lucide-react';

export function Timeline({ items = [] }) {
  if (!items || items.length === 0) {
    return <p className="text-xs text-stone-400">Sin eventos registrados aún.</p>;
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-slate-800 text-left">
      {items.map((item, index) => {
        return (
          <div key={item.id || index} className="relative group">
            {/* Dot */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-mint-500 flex items-center justify-center text-mint-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-mint-500"></span>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {item.action}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {item.timestamp ? new Date(item.timestamp).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                </span>
              </div>

              {item.user && (
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                  <User className="w-3 h-3 text-stone-400" />
                  <span>{item.user}</span>
                </div>
              )}

              {item.comment && (
                <p className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-stone-200/60 dark:border-slate-800 mt-1 leading-relaxed">
                  {item.comment}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
