
import React from 'react';
import { DiamondBaseMap } from '../molecules/DiamondBaseMap';
import { StartPauseButton } from '../atoms/StartPauseButton';

export interface GameHUDProps {
  gameState: 'idle' | 'playing' | 'paused' | 'result';
  onStart: () => void;
  onPause: () => void;
  basesOccupied: { first: boolean; second: boolean; third: boolean };
}

export const GameHUD: React.FC<GameHUDProps> = ({ gameState, onStart, onPause, basesOccupied }) => {
  const handleClick = () => {
    if (gameState === 'idle') onStart();
    else onPause();
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-900/90 backdrop-blur-sm border-t border-gray-700" role="toolbar" aria-label="게임 컨트롤">
      <DiamondBaseMap basesOccupied={basesOccupied} />
      <StartPauseButton gameState={gameState} onClick={handleClick} />
    </div>
  );
};
