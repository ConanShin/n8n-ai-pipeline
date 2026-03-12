import React from 'react';

export interface GameControlBarProps {
  isPaused: boolean;
  isMuted: boolean;
  onPause: () => void;
  onRestart: () => void;
  onMute: () => void;
}

export const GameControlBar: React.FC<GameControlBarProps> = ({
  isPaused,
  isMuted,
  onPause,
  onRestart,
  onMute
}) => {
  return (
    <div 
      className="flex items-center justify-between w-full px-4 py-2"
      role="toolbar"
      aria-label="게임 컨트롤"
    >
      <button 
        onClick={onPause}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors text-lg"
        role="button"
        aria-label={isPaused ? '게임 재개' : '게임 일시정지'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>

      <span className="text-sm font-bold text-gray-300 tracking-widest uppercase">
        BASEBALL-011
      </span>

      <button 
        onClick={onMute}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors text-lg"
        role="button"
        aria-label={isMuted ? '소리 켜기' : '음소거'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
};
