import React from 'react';

export interface StatBadgeProps {
  label: string;
  value: string | number;
  variant?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, variant = 'gray' }) => {
  const variantClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-700'
  };

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center px-4 py-2 rounded-xl gap-0.5 ${variantClasses[variant]}`}
      role="status"
      aria-label="Stat badge"
    >
      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</span>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
};