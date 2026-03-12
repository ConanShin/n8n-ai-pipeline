import React from 'react';

export interface InningCellProps {
  score: number | null;
  isCurrent: boolean;
  isHeader?: boolean;
  inningNumber?: number;
}

export const InningCell: React.FC<InningCellProps> = ({
  score,
  isCurrent,
  isHeader = false,
  inningNumber,
}) => {
  const ariaLabel = isHeader
    ? `${inningNumber}회`
    : isCurrent
    ? `현재 ${inningNumber}회 ${score ?? '진행 중'}점`
    : `${inningNumber}회 ${score ?? '미진행'}점`;

  const baseClasses = 'flex items-center justify-center w-8 h-9 sm:w-10 sm:h-10 text-sm font-bold tabular-nums transition-colors duration-200 shrink-0';

  let variantClasses = 'bg-transparent text-gray-200';
  if (isHeader) {
    variantClasses = 'bg-transparent text-gray-500 text-xs font-semibold uppercase';
  } else if (isCurrent) {
    variantClasses = 'bg-yellow-400 text-gray-900 rounded font-extrabold ring-2 ring-yellow-300 shadow-yellow-400/50 shadow-md';
  } else if (score === null) {
    variantClasses = 'bg-transparent text-gray-600';
  }

  const content = isHeader ? inningNumber : score === null ? '-' : score;

  return (
    <div role="cell" aria-label={ariaLabel} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </div>
  );
};
