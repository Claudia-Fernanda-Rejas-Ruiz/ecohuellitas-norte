import React from 'react';

export function FilterChip({
  label,
  count,
  active = false,
  onClick,
  icon: Icon,
  className = ''
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 select-none border min-h-[36px]
        ${active
          ? 'bg-mint-600 border-mint-600 text-white shadow-md shadow-mint-600/25 scale-[1.02]'
          : 'bg-white dark:bg-slate-800/80 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-700'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`
            text-[10px] px-1.5 py-0.2 rounded-full font-mono
            ${active
              ? 'bg-mint-700 text-white'
              : 'bg-stone-100 dark:bg-slate-700 text-stone-500 dark:text-stone-400'}
          `}
        >
          {count}
        </span>
      )}
    </button>
  );
}
