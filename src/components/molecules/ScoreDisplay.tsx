import React from 'react';
import { ScoreBadge } from '../atoms/ScoreBadge';

export interface ScoreDisplayProps {
  score: number;
  bestScore?: number;
  scoreUpdated?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, bestScore, scoreUpdated = false }) => {
  return (
    <div 
      className="flex flex-col items-center gap-1"
      role="region"
      aria-label="점수 현황"
    >
      <ScoreBadge score={score} animated={scoreUpdated} />
      {bestScore !== undefined && (
        <span className="text-xs text-gray-600 tabular-nums">
          BEST {bestScore}
        </span>
      )}
    </div>
  );
};
