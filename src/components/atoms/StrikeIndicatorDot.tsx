
import React from 'react';

export interface StrikeIndicatorDotProps {
  isUsed: boolean;
  index: number;
}

export const StrikeIndicatorDot: React.FC<StrikeIndicatorDotProps> = ({ isUsed, index }) => {
  const baseClasses = "inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm transition-all duration-300";
  const variants = {
    active: "bg-white border-2 border-gray-400 text-transparent",
    used: "bg-red-500 border-2 border-red-600 text-white scale-110 shadow-md"
  };

  return (
    <span
      role="img"
      aria-label={`${index + 1}번 기회 — ${isUsed ? '소진' : '남음'}`}
      className={`${baseClasses} ${isUsed ? variants.used : variants.active}`}
    >
      {isUsed ? '✕' : ''}
    </span>
  );
};
