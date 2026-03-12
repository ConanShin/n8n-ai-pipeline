
import React from 'react';

export interface StartPauseButtonProps {
  gameState: 'idle' | 'playing' | 'paused' | 'result';
  onClick: () => void;
}

export const StartPauseButton: React.FC<StartPauseButtonProps> = ({ gameState, onClick }) => {
  const icon = gameState === 'playing' ? '⏸' : '▶';
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all duration-150 shadow-lg shadow-yellow-400/40"
      aria-label="게임 시작/일시정지"
    >
      <span className="text-gray-900 text-2xl font-black">{icon}</span>
    </button>
  );
};
