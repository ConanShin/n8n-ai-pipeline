import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { EmptyState } from '../atoms/EmptyState';
import { StatsTableRow, StatsTableRowProps } from '../molecules/StatsTableRow';

export interface StatsTableProps {
  rows: StatsTableRowProps[];
  isLoading?: boolean;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
}

export const StatsTable: React.FC<StatsTableProps> = ({ rows, isLoading, sortKey: initialSortKey = 'date', sortDirection: initialSortDirection = 'desc' }) => {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'opponent', label: 'OPP', sortable: false },
    { key: 'atBats', label: 'AB', sortable: true },
    { key: 'hits', label: 'H', sortable: true },
    { key: 'homeRuns', label: 'HR', sortable: true },
    { key: 'rbi', label: 'RBI', sortable: true },
    { key: 'battingAverage', label: 'AVG', sortable: true }
  ];

  const handleSort = (key: string, sortable: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aVal = a[sortKey as keyof StatsTableRowProps];
      const bVal = b[sortKey as keyof StatsTableRowProps];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortKey, sortDirection]);

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden" role="table" aria-label="Player game-by-game statistics table">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <SectionHeading title="Recent Games" subtitle="Game-by-game breakdown" />
      </div>
      
      <div className="grid grid-cols-7 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
        {columns.map((col) => (
          <div 
            key={col.key} 
            className={`flex items-center gap-1 ${col.sortable ? 'cursor-pointer hover:text-gray-700' : ''}`}
            onClick={() => handleSort(col.key, col.sortable)}
          >
            {col.label}
            {col.sortable && sortKey === col.key && (
              <span className="text-gray-500">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-100 min-h-[200px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <LoadingSpinner size="lg" label="Loading table data" />
          </div>
        ) : rows.length === 0 ? (
          <EmptyState icon="📅" message="No games played yet" subMessage="Check back later for updated stats." />
        ) : (
          sortedRows.map((row, index) => (
            <StatsTableRow key={`${row.date}-${index}`} {...row} />
          ))
        )}
      </div>
      
      {!isLoading && rows.length > 0 && (
        <div className="px-6 py-3 text-xs text-gray-400 text-right bg-gray-50 border-t border-gray-100">
          Showing {rows.length} games
        </div>
      )}
    </div>
  );
};