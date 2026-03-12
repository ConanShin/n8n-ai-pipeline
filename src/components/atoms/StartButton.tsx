import React from 'react';

export interface StartButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const StartButton: React.FC<StartButtonProps> = ({ label = '게임 시작', onClick, disabled }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-xs">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        role="button"
        aria-label="야구 게임 시작"
        className="w-full py-4 px-8 text-xl font-bold rounded-full bg-yellow-400 text-gray-900 shadow-lg transition-all duration-150 hover:bg-yellow-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {label}
      </button>
    </div>
  );
};
