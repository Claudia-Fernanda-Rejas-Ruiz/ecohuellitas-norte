import React from 'react';

export function Card({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  onClick,
  ...props
}) {
  const base = 'rounded-3xl border transition-all duration-200';
  const glassStyle = glass
    ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-stone-200/80 dark:border-slate-800'
    : 'bg-white dark:bg-slate-900 border-stone-200/80 dark:border-slate-800 shadow-card-soft';
  const hoverStyle = hoverEffect
    ? 'hover:shadow-card-elevated hover:border-mint-300 dark:hover:border-mint-700 hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${base} ${glassStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', title, subtitle, action }) {
  return (
    <div className={`p-6 pb-3 flex items-start justify-between gap-4 border-b border-stone-100 dark:border-slate-800/80 ${className}`}>
      {title ? (
        <div>
          <h3 className="font-display font-extrabold text-lg text-stone-900 dark:text-stone-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      ) : (
        children
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-6 pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
}
