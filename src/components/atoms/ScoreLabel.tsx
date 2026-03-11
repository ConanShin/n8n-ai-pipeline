
import React from 'react';

export interface ScoreLabelProps {
  result: 'homerun' | '3base' | '2base' | '1base' | 'strike';
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreLabel: React.FC<ScoreLabelProps> = ({ result, size = 'md' }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-extrabold tracking-widest shadow-lg select-none";
  
  const variants: Record<string, { tailwind: string, label: string }> = {
    homerun: { tailwind: "bg-yellow-400 text-yellow-900 ring-4 ring-yellow-200 animate-bounce text-3xl sm:text-4xl", label: "⚾ HOMERUN!" },
    '3base': { tailwind: "bg-green-500 text-white ring-4 ring-green-300 text-2xl sm:text-3xl", label: "3루타!" },
    '2base': { tailwind: "bg-blue-500 text-white ring-4 ring-blue-300 text-2xl sm:text-3xl", label: "2루타!" },
    '1base': { tailwind: "bg-indigo-400 text-white ring-4 ring-indigo-300 text-2xl sm:text-3xl", label: "1루타!" },
    strike: { tailwind: "bg-red-500 text-white ring-4 ring-red-300 text-2xl sm:text-3xl animate-shake", label: "STRIKE!" }
  };
  
  const sizeMap = {
    sm: "text-base px-3 py-1",
    md: "text-2xl px-4 py-2",
    lg: "text-4xl px-6 py-3"
  };

  const { tailwind, label } = variants[result] || variants.strike;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={`타격 결과: ${result}`}
      className={`${baseClasses} ${tailwind} ${sizeMap[size]}`}
    >
      {label}
    </span>
  );
};
