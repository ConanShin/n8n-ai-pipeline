import React, { useState } from 'react';
import { StatsTableRow, StatsTableRowProps } from '../molecules/StatsTableRow';
import { SectionHeading } from '../atoms/SectionHeading';

export interface StatsTableProps {
  rows: StatsTableRowProps[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  currentPage?: number;
  totalPages?: number;
  isLoading?: boolean;
}

export const StatsTable: React.FC<StatsTableProps> = ({
  rows, sortBy = 'date', sortDirection = 'desc', currentPage = 1, totalPages = 1, isLoading
}) => {
  const [internalSortBy, setInternalSortBy] = useState(sortBy);
  const [internalSortDir, setInternalSortDir] = useState(sortDirection);
  const [internalPage, setInternalPage] = useState(currentPage);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'opponent', label: 'OPP', sortable: false },
    { key: 'atBats', label: 'AB', sortable: true },
    { key: 'hits', label: 'H', sortable: true },
    { key: 'homeRuns', label: 'HR', sortable: true },
    { key: 'rbis', label: 'RBI', sortable: true },
    { key: 'battingAverage', label: 'AVG', sortable: true }
  ];

  const handleSort = (key: string, isSortable: boolean) => {
    if (!isSortable) return;
    if (internalSortBy === key) {
      setInternalSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setInternalSortBy(key);
      setInternalSortDir('desc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = a[internalSortBy as keyof StatsTableRowProps] as any;
    const bVal = b[internalSortBy as keyof StatsTableRowProps] as any;

    if (aVal === bVal) return 0;
    
    // Sort logic
    if (internalSortDir === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeading title="Game Logs" subtitle="Recent per-game performance statistics" />
      
      <div 
        className="flex flex-col gap-0 rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100"
        role="table"
        aria-label="Player game statistics table"
        aria-live="polite"
      >
        <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
          {columns.map(col => (
            <div 
              key={col.key} 
              className={`text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1 ${col.sortable ? 'cursor-pointer select-none hover:text-gray-900' : ''}`}
              onClick={() => handleSort(col.key, col.sortable)}
            >
              {col.label}
              {col.sortable && internalSortBy === col.key && (
                <span>{internalSortDir === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 border-b border-gray-100 bg-gray-50 animate-pulse"></div>
            ))}
          </div>
        ) : sortedRows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No game data available</div>
        ) : (
          <div className="flex flex-col max-h-[400px] overflow-y-auto">
            {sortedRows.map((row, i) => (
              <StatsTableRow key={i} {...row} />
            ))}
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-600">Page {internalPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button 
              disabled={internalPage <= 1 || isLoading}
              onClick={() => setInternalPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 bg-white border border-gray-200 rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              disabled={internalPage >= totalPages || isLoading}
              onClick={() => setInternalPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-white border border-gray-200 rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
