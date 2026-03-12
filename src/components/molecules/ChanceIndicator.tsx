import React from 'react';
import { ChanceBall } from '../atoms/ChanceBall';

export interface ChanceIndicatorProps {
  chancesLeft: number;
  totalChances?: number;
}

export const ChanceIndicator: React.FC<ChanceIndicatorProps> = ({ chancesLeft, totalChances = 3 }) => {
  return (
    <div className="flex flex-col items-end gap-0.5" role="status" aria-label="남은 기회 표시">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">OUTS</span>
      <div className="flex gap-1">
        {Array.from({ length: totalChances }).map((_, idx) => (
          <ChanceBall key={idx} active={idx < chancesLeft} />
        ))}
      </div>
    </div>
  );
};
