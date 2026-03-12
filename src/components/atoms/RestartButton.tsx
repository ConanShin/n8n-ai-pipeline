
import React from 'react';

export interface RestartButtonProps {
  onClick: () => void;
}

export const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full max-w-xs h-14 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all duration-150 shadow-lg shadow-yellow-400/30"
      aria-label="게임 다시 시작"
    >
      <span className="text-gray-900 text-lg font-black tracking-wide">다시 하기</span>
    </button>
  );
};
