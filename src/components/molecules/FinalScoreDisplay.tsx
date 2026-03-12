
import React from 'react';

export interface FinalScoreDisplayProps {
  score: number;
}

export const FinalScoreDisplay: React.FC<FinalScoreDisplayProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center gap-1" role="status" aria-label="최종 점수">
      <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">FINAL SCORE</span>
      <span className="text-8xl font-black tabular-nums text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.7)]">
        {score}
      </span>
    </div>
  );
};
