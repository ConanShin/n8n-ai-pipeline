import React from 'react';

export interface StatBadgeProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, highlight }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl text-white min-w-[80px] ${highlight ? 'bg-blue-600' : 'bg-slate-800'}`}
      role="region"
      aria-label={`Statistic badge showing ${label}: ${value}`}
    >
      <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};
