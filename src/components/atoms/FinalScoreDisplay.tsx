
import React from 'react';
export interface FinalScoreDisplayProps { score: number; }
export const FinalScoreDisplay: React.FC<FinalScoreDisplayProps> = ({ score }) => (
  <div className="flex flex-col items-center gap-1" role="status" aria-label="최종 점수">
    <span className="text-sm tracking-widest text-gray-400 uppercase">FINAL SCORE</span>
    <span className="text-5xl font-black text-white tabular-nums">{score}</span>
  </div>
);
