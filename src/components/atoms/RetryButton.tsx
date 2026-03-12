import React from 'react';

export interface RetryButtonProps {
  onClick: () => void;
  label?: string;
}

export const RetryButton: React.FC<RetryButtonProps> = ({ onClick, label = '다시 하기' }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-xs">
      <button
        type="button"
        onClick={onClick}
        role="button"
        aria-label="게임 다시 하기"
        className="w-full py-4 px-8 text-xl font-bold rounded-full bg-yellow-400 text-gray-900 shadow-lg transition-all duration-150 hover:bg-yellow-300 hover:scale-105 active:scale-95"
      >
        {label}
      </button>
    </div>
  );
};
