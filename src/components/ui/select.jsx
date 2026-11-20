import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  helper,
  error,
  options = [],
  id,
  className = '',
  required = false,
  value,
  onChange,
  placeholder = 'Selecciona una opción...',
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
        >
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}

      <div className="relative rounded-2xl shadow-sm">
        <select
          id={selectId}
          required={required}
          value={value}
          onChange={onChange}
          className={`
            w-full appearance-none rounded-2xl bg-stone-50 dark:bg-slate-800/80 border text-xs text-stone-900 dark:text-stone-100
            transition-all duration-200 min-h-[44px] py-2.5 pl-4 pr-10 cursor-pointer
            ${error
              ? 'border-coral-400 focus:border-coral-500 focus:ring-2 focus:ring-coral-400/20'
              : 'border-stone-200 dark:border-slate-700 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'}
            focus:outline-none focus:bg-white dark:focus:bg-slate-800
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val} className="py-2 text-stone-800 dark:text-stone-100 dark:bg-slate-800">
                {lbl}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-[11px] font-semibold text-coral-600 dark:text-coral-400">{error}</p>
      ) : helper ? (
        <p className="text-[11px] text-stone-500 dark:text-stone-400">{helper}</p>
      ) : null}
    </div>
  );
}
