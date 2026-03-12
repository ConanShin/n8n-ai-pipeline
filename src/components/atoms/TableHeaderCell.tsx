import React from 'react';

export interface TableHeaderCellProps {
  label: string;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | 'none';
  onClick?: () => void;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label, sortable, sortDirection = 'none', onClick }) => {
  return (
    <th
      role="columnheader"
      aria-label={`${label} column header`}
      aria-sort={sortDirection === 'none' ? 'none' : sortDirection === 'asc' ? 'ascending' : 'descending'}
      onClick={sortable ? onClick : undefined}
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900 select-none ${sortable ? 'cursor-pointer hover:bg-gray-800' : ''}`}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortable && sortDirection !== 'none' && (
          <span className="text-indigo-400">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );
};