import React from 'react';
import { TrendIndicator } from '../atoms/TrendIndicator';

export interface StatsTableRowProps {
  statLabel: string;
  statKey: string;
  value: string | number;
  rank?: number;
  trend?: 'up' | 'down' | 'neutral';
  delta?: string;
  isHighlighted?: boolean;
}

export const StatsTableRow: React.FC<StatsTableRowProps> = ({
  statLabel,
  value,
  rank,
  trend,
  delta,
  isHighlighted
}) => {
  return (
    <div
      role="row"
      aria-label={`${statLabel}: ${value}`}
      className={`grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150 ${isHighlighted ? 'bg-yellow-50' : ''}`}
    >
      <span className="text-sm font-medium text-gray-700">{statLabel}</span>
      <span className="text-sm font-bold text-gray-900 text-right">{value}</span>
      <div className="text-right flex justify-end">
        {trend && <TrendIndicator direction={trend} value={delta} />}
      </div>
      <span className="text-xs text-gray-400 text-right">
        {rank ? `Rank #${rank}` : '-'}
      </span>
    </div>
  );
};
