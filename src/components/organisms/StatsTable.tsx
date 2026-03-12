import React from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { StatsTableRow } from '../molecules/StatsTableRow';

export interface StatItem {
  statLabel: string;
  statKey: string;
  value: string | number;
  rank?: number;
  trend?: 'up' | 'down' | 'neutral';
  delta?: string;
  isHighlighted?: boolean;
}

export interface StatsTableProps {
  stats: StatItem[];
  caption?: string;
  isLoading?: boolean;
}

export const StatsTable: React.FC<StatsTableProps> = ({ stats, caption, isLoading }) => {
  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 rounded-2xl h-64 w-full"></div>;
  }

  return (
    <div
      role="table"
      aria-label="Player season statistics table"
      aria-caption={caption}
      className="flex flex-col w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
    >
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <SectionHeading title="Season Statistics" subtitle="2026 Regular Season" />
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50">
        <span>Stat</span>
        <span className="text-right">Value</span>
        <span className="text-right">Trend</span>
        <span className="text-right">Rank</span>
      </div>
      <div className="divide-y divide-gray-50">
        {stats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
            No statistics available.
          </div>
        ) : (
          stats.map((stat) => (
            <StatsTableRow key={stat.statKey} {...stat} />
          ))
        )}
      </div>
    </div>
  );
};
