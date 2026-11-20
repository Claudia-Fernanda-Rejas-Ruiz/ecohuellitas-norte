import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './card';

export function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend = null, // { value: '+12%', isPositive: true }
  color = 'mint', // 'mint', 'coral', 'amber', 'sky'
  className = ''
}) {
  const iconColorStyles = {
    mint: 'bg-mint-50 dark:bg-mint-950/40 text-mint-600 dark:text-mint-400',
    coral: 'bg-coral-50 dark:bg-coral-950/40 text-coral-600 dark:text-coral-400',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    sky: 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
  };

  return (
    <Card className={`p-5 sm:p-6 text-left ${className}`} hoverEffect>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            {title}
          </span>
          <div className="text-3xl font-display font-black text-stone-900 dark:text-stone-100 mt-1 tabular-nums">
            {value}
          </div>
          {subvalue && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium">{subvalue}</p>
          )}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${iconColorStyles[color] || iconColorStyles.mint}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-bold">
          {trend.isPositive ? (
            <span className="text-mint-600 dark:text-mint-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {trend.value}
            </span>
          ) : (
            <span className="text-coral-600 dark:text-coral-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> {trend.value}
            </span>
          )}
          <span className="text-stone-400 dark:text-stone-500 text-[11px] font-normal">vs. mes anterior</span>
        </div>
      )}
    </Card>
  );
}
