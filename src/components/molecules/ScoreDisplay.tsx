
import React from 'react';

export interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-start gap-0.5" role="status" aria-label="현재 점수" aria-live="polite">
      <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400">SCORE</span>
      <span className="text-4xl font-black tabular-nums text-white leading-none">{score}</span>
    </div>
  );
};
