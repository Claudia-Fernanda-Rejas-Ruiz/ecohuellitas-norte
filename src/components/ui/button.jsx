import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'coral', 'amber', 'outline', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg', 'icon'
  isLoading = false,
  disabled = false,
  className = '',
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none min-h-[44px]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
    icon: 'p-2.5 w-11 h-11'
  };

  const variantStyles = {
    primary: 'bg-mint-600 hover:bg-mint-700 text-white shadow-md shadow-mint-600/25 focus:ring-mint-500',
    secondary: 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-100 focus:ring-stone-400',
    coral: 'bg-coral-500 hover:bg-coral-600 text-white shadow-md shadow-coral-500/25 focus:ring-coral-400',
    amber: 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-md shadow-amber-500/25 focus:ring-amber-400 font-extrabold',
    outline: 'border-2 border-stone-200 dark:border-slate-700 bg-transparent hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-200 focus:ring-stone-400',
    ghost: 'bg-transparent hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-600 dark:text-stone-300 focus:ring-stone-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 focus:ring-red-400'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
