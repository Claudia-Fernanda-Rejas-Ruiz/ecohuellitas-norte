import React from 'react';

export function Input({
  label,
  helper,
  error,
  leftIcon,
  rightIcon,
  id,
  type = 'text',
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
        >
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}

      <div className="relative rounded-2xl shadow-sm">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          required={required}
          className={`
            w-full rounded-2xl bg-stone-50 dark:bg-slate-800/80 border text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400
            transition-all duration-200 min-h-[44px] py-2.5
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightIcon ? 'pr-10' : 'pr-4'}
            ${error
              ? 'border-coral-400 focus:border-coral-500 focus:ring-2 focus:ring-coral-400/20'
              : 'border-stone-200 dark:border-slate-700 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'}
            focus:outline-none focus:bg-white dark:focus:bg-slate-800
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-semibold text-coral-600 dark:text-coral-400">{error}</p>
      ) : helper ? (
        <p className="text-[11px] text-stone-500 dark:text-stone-400">{helper}</p>
      ) : null}
    </div>
  );
}

export function Textarea({
  label,
  helper,
  error,
  id,
  rows = 3,
  className = '',
  required = false,
  ...props
}) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
        >
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`
          w-full rounded-2xl bg-stone-50 dark:bg-slate-800/80 border text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400
          transition-all duration-200 p-3.5
          ${error
            ? 'border-coral-400 focus:border-coral-500 focus:ring-2 focus:ring-coral-400/20'
            : 'border-stone-200 dark:border-slate-700 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'}
          focus:outline-none focus:bg-white dark:focus:bg-slate-800
          ${className}
        `}
        {...props}
      ></textarea>

      {error ? (
        <p className="text-[11px] font-semibold text-coral-600 dark:text-coral-400">{error}</p>
      ) : helper ? (
        <p className="text-[11px] text-stone-500 dark:text-stone-400">{helper}</p>
      ) : null}
    </div>
  );
}
