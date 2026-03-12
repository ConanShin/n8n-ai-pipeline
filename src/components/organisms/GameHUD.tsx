import React from 'react';
import { ScoreDisplay } from '../molecules/ScoreDisplay';
import { ChanceIndicator } from '../molecules/ChanceIndicator';

export interface GameHUDProps {
  score: number;
  chancesLeft: number;
  totalChances?: number;
  pitchCount?: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, chancesLeft, totalChances = 3, pitchCount = 0 }) => {
  return (
    <div className="flex items-center justify-between w-full px-6 pt-6 pb-4 bg-gray-900 border-b border-gray-700 shadow-lg z-10 relative" role="status" aria-label="게임 현황 표시">
      <ScoreDisplay score={score} />
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-bold text-gray-500 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
          PITCH {pitchCount}
        </span>
      </div>

      <ChanceIndicator chancesLeft={chancesLeft} totalChances={totalChances} />
    </div>
  );
};
