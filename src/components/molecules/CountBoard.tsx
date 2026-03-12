
import React from 'react';
import { StrikeIndicator } from '../atoms/StrikeIndicator';
import { OutIndicator } from '../atoms/OutIndicator';

export interface CountBoardProps {
  strikes: number;
  maxStrikes?: number;
  outs: number;
  maxOuts?: number;
}

export const CountBoard: React.FC<CountBoardProps> = ({ strikes, maxStrikes = 3, outs, maxOuts = 3 }) => {
  return (
    <div className="flex flex-col items-end gap-1" role="group" aria-label="스트라이크 및 아웃 현황">
      <StrikeIndicator active={strikes} total={maxStrikes} />
      <OutIndicator active={outs} total={maxOuts} />
    </div>
  );
};
