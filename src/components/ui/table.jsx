import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 dark:border-slate-800">
      <table className={`w-full text-left text-xs text-stone-700 dark:text-stone-300 ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-stone-50 dark:bg-slate-800/80 text-[11px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-slate-700">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-stone-100 dark:divide-slate-800 bg-white dark:bg-slate-900">{children}</tbody>;
}

export function TableRow({ children, className = '', hover = true, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`
        transition-colors duration-150
        ${hover ? 'hover:bg-stone-50/80 dark:hover:bg-slate-800/50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return <th scope="col" className={`py-3.5 px-4 font-bold select-none ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }) {
  return <td className={`py-3.5 px-4 align-middle ${className}`}>{children}</td>;
}
