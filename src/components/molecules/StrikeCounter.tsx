import React from 'react';
import { StrikeIndicator } from '../atoms/StrikeIndicator';

export interface StrikeCounterProps {
  usedCount: number;
  maxCount?: number;
}

export const StrikeCounter: React.FC<StrikeCounterProps> = ({ usedCount, maxCount = 3 }) => {
  const isLastChance = usedCount === maxCount - 1;

  return (
    <div 
      className="flex flex-col items-center gap-1.5"
      role="status"
      aria-label={`남은 기회 ${maxCount - usedCount}번`}
    >
      <span className={`text-xs font-semibold uppercase tracking-widest ${isLastChance ? 'text-red-400 animate-pulse' : 'text-gray-400'}`}>
        STRIKES
      </span>
      <div className="flex items-center gap-2">
        {Array.from({ length: maxCount }).map((_, i) => (
          <StrikeIndicator key={i} index={i} used={i < usedCount} />
        ))}
      </div>
    </div>
  );
};
