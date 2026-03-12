import React from 'react';

export interface TotalScoreCellProps {
  score: number | null;
  isWinning?: boolean;
  isHeader?: boolean;
}

export const TotalScoreCell: React.FC<TotalScoreCellProps> = ({
  score,
  isWinning = false,
  isHeader = false,
}) => {
  const ariaLabel = isHeader ? '총 득점' : `합계 ${score ?? 0}점${isWinning ? ' (리드 중)' : ''}`;

  const baseClasses = 'flex items-center justify-center w-12 h-9 sm:w-14 sm:h-10 text-lg font-black tabular-nums border-l border-gray-600 shrink-0';

  let variantClasses = 'text-white';
  if (isHeader) {
    variantClasses = 'text-gray-400 text-xs font-semibold uppercase tracking-wider text-sm';
  } else if (isWinning) {
    variantClasses = 'text-yellow-300';
  }

  const content = isHeader ? 'R' : score === null ? '-' : score;

  return (
    <div role="cell" aria-label={ariaLabel} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </div>
  );
};
