import React from 'react';

export interface TableDataCellProps {
  value: string | number;
  emphasis?: boolean;
}

export const TableDataCell: React.FC<TableDataCellProps> = ({ value, emphasis }) => {
  return (
    <td
      role="cell"
      className={`px-4 py-3 text-sm whitespace-nowrap ${emphasis ? 'font-bold text-white' : 'text-gray-200'}`}
    >
      {value}
    </td>
  );
};