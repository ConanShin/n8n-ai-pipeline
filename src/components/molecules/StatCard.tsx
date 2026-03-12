import React from 'react';
import { StatBadge } from '../atoms/StatBadge';

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendValue, icon }) => {
  return (
    <div 
      className="flex flex-col gap-2 p-5 rounded-2xl bg-white shadow-md border border-gray-100 min-w-[140px]"
      role="region"
      aria-label={`${label} stat card`}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest font-medium text-gray-500">{label}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-3xl font-extrabold tabular-nums text-gray-900">{value}</div>
      {trendValue && (
        <div className="mt-1 flex items-center">
          <StatBadge label="vs Last" value={trendValue} trend={trend} />
        </div>
      )}
    </div>
  );
};
