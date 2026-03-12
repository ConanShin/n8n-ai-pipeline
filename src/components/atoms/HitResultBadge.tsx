
import React from 'react';

export interface HitResultBadgeProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  isVisible: boolean;
}

export const HitResultBadge: React.FC<HitResultBadgeProps> = ({ result, isVisible }) => {
  if (!isVisible || !result) return null;

  const variants = {
    homerun: {
      className: 'text-6xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.9)] animate-bounce',
      text: 'HOME RUN!'
    },
    triple: {
      className: 'text-5xl font-black text-cyan-300 drop-shadow-[0_0_16px_rgba(103,232,249,0.8)]',
      text: '3루타!'
    },
    double: {
      className: 'text-5xl font-black text-green-400 drop-shadow-[0_0_16px_rgba(74,222,128,0.8)]',
      text: '2루타!'
    },
    single: {
      className: 'text-5xl font-black text-blue-300 drop-shadow-[0_0_16px_rgba(147,197,253,0.8)]',
      text: '1루타!'
    },
    strike: {
      className: 'text-5xl font-black text-red-500 drop-shadow-[0_0_16px_rgba(239,68,68,0.8)]',
      text: 'STRIKE'
    }
  };

  const { className, text } = variants[result];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" role="alert" aria-live="assertive" aria-atomic="true">
      <span className={className}>{text}</span>
    </div>
  );
};
