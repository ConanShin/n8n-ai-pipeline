import React from 'react';

export interface StatBadgeProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, highlight }) => {
  return (
    <div
      role="listitem"
      aria-label={`Stat badge showing ${label}: ${value}`}
      className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl ${highlight ? 'bg-indigo-600' : 'bg-gray-800'} text-white min-w-[72px]`}
    >
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-extrabold tabular-nums">{value}</span>
    </div>
  );
};