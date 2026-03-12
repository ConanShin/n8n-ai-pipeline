import React from 'react';

export interface StatCellProps {
  value: number | string;
  statType?: 'H' | 'E' | 'BB' | 'R' | string;
  isHeader?: boolean;
}

export const StatCell: React.FC<StatCellProps> = ({
  value,
  statType,
  isHeader = false,
}) => {
  const ariaLabel = isHeader ? `${statType} 통계 항목` : `${statType} ${value}`;

  const baseClasses = 'flex items-center justify-center w-10 h-9 sm:w-12 sm:h-10 text-sm font-bold tabular-nums shrink-0';

  let variantClasses = 'text-gray-200';
  if (isHeader) {
    variantClasses = 'text-gray-400 text-xs font-semibold uppercase tracking-wider';
  } else {
    switch (statType) {
      case 'H':
        variantClasses = 'text-green-400 font-extrabold';
        break;
      case 'E':
        variantClasses = 'text-red-400 font-extrabold';
        break;
      case 'BB':
        variantClasses = 'text-blue-400 font-extrabold';
        break;
      case 'R':
        variantClasses = 'text-yellow-300 font-extrabold';
        break;
    }
  }

  return (
    <div role="cell" aria-label={ariaLabel} className={`${baseClasses} ${variantClasses}`}>
      {value}
    </div>
  );
};
