import React from 'react';

export interface StatBadgeProps {
  label: string;
  value: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, variant = 'neutral' }) => {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-700',
  };

  return (
    <div
      role="status"
      aria-label={`Stat badge for ${label}: ${value}`}
      className={`inline-flex flex-col items-center justify-center px-3 py-1.5 rounded-lg gap-0.5 min-w-[64px] ${variantClasses[variant]}`}
    >
      <span className="text-[10px] font-semibold opacity-80 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
};
