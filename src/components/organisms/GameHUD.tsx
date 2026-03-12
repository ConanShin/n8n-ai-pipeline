import React from 'react';
import { GameControlBar } from '../molecules/GameControlBar';
import { ScoreDisplay } from '../molecules/ScoreDisplay';
import { StrikeCounter } from '../molecules/StrikeCounter';

export interface GameHUDProps {
  score: number;
  bestScore?: number;
  strikeCount: number;
  scoreUpdated?: boolean;
  isPaused: boolean;
  isMuted: boolean;
  onPause: () => void;
  onRestart: () => void;
  onMute: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  bestScore,
  strikeCount,
  scoreUpdated,
  isPaused,
  isMuted,
  onPause,
  onRestart,
  onMute
}) => {
  return (
    <div 
      className="flex flex-col w-full"
      role="region"
      aria-label="게임 현황 HUD"
    >
      <GameControlBar 
        isPaused={isPaused}
        isMuted={isMuted}
        onPause={onPause}
        onRestart={onRestart}
        onMute={onMute}
      />
      <div className="flex items-start justify-between px-6 py-3">
        <ScoreDisplay score={score} bestScore={bestScore} scoreUpdated={scoreUpdated} />
        <StrikeCounter usedCount={strikeCount} maxCount={3} />
      </div>
    </div>
  );
};
