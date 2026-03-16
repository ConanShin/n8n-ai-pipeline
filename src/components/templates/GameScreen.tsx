import React from 'react';
import { GameHUD } from '../organisms/GameHUD';
import { BallField } from '../organisms/BallField';
import { TimingZone } from '../organisms/TimingZone';
import { ResultFeedback } from '../molecules/ResultFeedback';

export interface GameScreenProps {
  score: number;
  chancesLeft: number;
  ballState: 'idle' | 'incoming' | 'hit' | 'miss';
  lastResult?: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  onBat: () => void;
  progress: number;
  zones: Array<{ label: string; color: string; rangeStart: number; rangeEnd: number }>;
  pitchCount?: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  score,
  chancesLeft,
  ballState,
  lastResult,
  onBat,
  progress,
  zones,
  pitchCount
}) => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full min-h-[100dvh] select-none bg-gray-950" role="region" aria-label="게임 플레이 화면" aria-live="polite">
      <GameHUD score={score} chancesLeft={chancesLeft} pitchCount={pitchCount} />
      
      <div className="relative flex-1 w-full overflow-hidden flex flex-col">
        <BallField ballState={ballState} onTap={onBat} result={lastResult} />
        <ResultFeedback result={lastResult || null} visible={!!lastResult} />
      </div>
      
      <TimingZone progress={progress} zones={zones} />
    </div>
  );
};
