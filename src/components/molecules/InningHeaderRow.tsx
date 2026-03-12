import React from 'react';
import { InningCell, TotalScoreCell, StatCell } from '../atoms';

export interface InningHeaderRowProps {
  totalInnings?: number;
  currentInning: number;
  showExtended?: boolean;
}

export const InningHeaderRow: React.FC<InningHeaderRowProps> = ({
  totalInnings = 9,
  currentInning,
  showExtended = false,
}) => {
  const innings = Array.from({ length: totalInnings }, (_, i) => i + 1);

  return (
    <div
      role="row"
      aria-label="스코어보드 컬럼 헤더"
      className="flex items-center sticky top-0 z-10 bg-gray-900 border-b border-gray-700"
    >
      <div className="min-w-[120px] sm:min-w-[160px] h-8 px-2 sm:px-3 flex items-center">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">팀</span>
      </div>
      <div className="flex items-center">
        {innings.map((inning) => (
          <InningCell
            key={inning}
            score={null}
            isCurrent={inning === currentInning}
            isHeader={true}
            inningNumber={inning}
          />
        ))}
      </div>
      <div className="flex items-center border-l border-gray-600">
        <TotalScoreCell score={null} isHeader={true} />
        <StatCell value="H" statType="H" isHeader={true} />
        <StatCell value="E" statType="E" isHeader={true} />
        <StatCell value="BB" statType="BB" isHeader={true} />
      </div>
    </div>
  );
};
