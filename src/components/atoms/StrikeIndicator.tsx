import React from 'react';

export interface StrikeIndicatorProps {
  used: boolean;
  index: number;
}

export const StrikeIndicator: React.FC<StrikeIndicatorProps> = ({ used, index }) => {
  return (
    <div
      role="img"
      aria-label={`${used ? '사용된 기회' : '남은 기회'} ${index + 1}번째`}
      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
        used 
          ? 'border-red-500 bg-red-500 shadow-red-500/50 shadow-md scale-110' 
          : 'border-gray-600 bg-transparent'
      }`}
    />
  );
};
