
import React from 'react';
export interface ScoreBadgeProps { score: number; }
export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => (
  <div className="flex flex-col items-center gap-0.5" role="status" aria-label="현재 점수" aria-live="polite">
    <span className="text-xs font-semibold tracking-widest text-yellow-300 uppercase">SCORE</span>
    <span className="text-3xl font-extrabold text-white tabular-nums">{score}</span>
  </div>
);
