import React from 'react';

export interface FinalScoreCardProps {
  score: number;
  maxScore?: number;
}

export const FinalScoreCard: React.FC<FinalScoreCardProps> = ({ score, maxScore = 12 }) => {
  return (
    <div className="flex flex-col items-center gap-1 bg-gray-800 border border-yellow-400/30 rounded-2xl px-10 py-6 shadow-xl" role="text" aria-label="최종 점수 카드">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">FINAL SCORE</span>
      <div className="flex items-baseline gap-2">
        <span className="text-6xl font-extrabold text-white tabular-nums">{score}</span>
        <span className="text-sm text-gray-500">/ {maxScore}</span>
      </div>
    </div>
  );
};
