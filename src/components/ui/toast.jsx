import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, Undo2 } from 'lucide-react';
import { useData } from '../../context/data-context';

export function ToastContainer() {
  const { toasts, removeToast } = useData();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-mint-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <AlertCircle className="w-5 h-5 text-coral-500" />,
    info: <Info className="w-5 h-5 text-sky-500" />
  };

  const borders = {
    success: 'border-mint-200 dark:border-mint-800/60',
    warning: 'border-amber-200 dark:border-amber-800/60',
    error: 'border-coral-200 dark:border-coral-800/60',
    info: 'border-sky-200 dark:border-sky-800/60'
  };

  const handleUndo = async () => {
    if (toast.undoAction) {
      await toast.undoAction();
      onDismiss();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      className={`
        pointer-events-auto bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-xl flex items-start gap-3 text-left
        ${borders[toast.type] || borders.info}
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type] || icons.info}</div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{toast.title}</h4>
        {toast.message && (
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
            {toast.message}
          </p>
        )}

        {toast.undoAction && (
          <button
            type="button"
            onClick={handleUndo}
            className="mt-2 text-[11px] font-bold text-mint-700 dark:text-mint-400 hover:underline flex items-center gap-1"
          >
            <Undo2 className="w-3 h-3" />
            <span>{toast.undoLabel || 'Deshacer acción'}</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
