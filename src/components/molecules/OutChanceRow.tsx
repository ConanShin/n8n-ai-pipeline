
import React from 'react';
import { StrikeIndicatorDot } from '../atoms/StrikeIndicatorDot';

export interface OutChanceRowProps {
  totalChances?: number;
  usedChances: number;
}

export const OutChanceRow: React.FC<OutChanceRowProps> = ({ totalChances = 3, usedChances }) => {
  return (
    <div 
      role="group" 
      aria-label={`기회 ${totalChances - usedChances}번 남음`}
      className="flex items-center gap-2"
    >
      {Array.from({ length: totalChances }).map((_, i) => (
        <StrikeIndicatorDot key={i} index={i} isUsed={i < usedChances} />
      ))}
    </div>
  );
};
