import React from 'react';

export interface ShareButtonProps {
  onClick?: () => void;
  label?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ onClick, label = '결과 공유' }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-xs">
      <button
        type="button"
        onClick={onClick}
        role="button"
        aria-label="게임 결과 공유"
        className="w-full py-3 px-8 text-base font-semibold rounded-full border border-gray-600 text-gray-300 bg-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all duration-150 active:scale-95"
      >
        {label}
      </button>
    </div>
  );
};
