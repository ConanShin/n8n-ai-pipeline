import React, { useState, useMemo } from 'react';
import { SectionHeading, TableHeaderCell } from '../atoms';
import { StatsTableRow, GameStat } from '../molecules';

export interface PlayerStatsTableProps {
  rows: GameStat[];
}

export const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ rows }) => {
  const [sortColumn, setSortColumn] = useState<keyof GameStat>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const handleSort = (column: keyof GameStat) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
    setCurrentPage(0);
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = sortColumn === 'avg' ? parseFloat(aVal) : aVal;
        bVal = sortColumn === 'avg' ? parseFloat(bVal) : bVal;
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const columns: { key: keyof GameStat; label: string; sortable: boolean }[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'opponent', label: 'OPP', sortable: true },
    { key: 'result', label: 'Res', sortable: true },
    { key: 'atBats', label: 'AB', sortable: true },
    { key: 'hits', label: 'H', sortable: true },
    { key: 'hr', label: 'HR', sortable: true },
    { key: 'rbi', label: 'RBI', sortable: true },
    { key: 'avg', label: 'AVG', sortable: true },
  ];

  return (
    <section
      role="region"
      aria-label="Recent game statistics table"
      className="flex flex-col gap-0 bg-gray-800 rounded-2xl shadow-lg overflow-hidden w-full h-full"
    >
      <div className="p-6 pb-2">
        <SectionHeading title="Game Logs" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              {columns.map(col => (
                <TableHeaderCell
                  key={col.key}
                  label={col.label}
                  sortable={col.sortable}
                  sortDirection={sortColumn === col.key ? sortDirection : 'none'}
                  onClick={() => handleSort(col.key)}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, idx) => (
                <StatsTableRow key={`${row.date}-${idx}`} game={row} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  No games found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-auto border-t border-gray-700 bg-gray-900 p-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Page {currentPage + 1} of {Math.max(1, totalPages)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1.5 text-sm font-medium bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1.5 text-sm font-medium bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};