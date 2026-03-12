import React from 'react';

export interface GameResultBadgeProps {
  result: 'W' | 'L' | 'ND';
  opponent?: string;
  date?: string;
}

export const GameResultBadge: React.FC<GameResultBadgeProps> = ({ result, opponent, date }) => {
  const variantClasses = {
    W: 'bg-emerald-100 text-emerald-700',
    L: 'bg-red-100 text-red-600',
    ND: 'bg-gray-100 text-gray-500',
  };

  return (
    <span
      role="status"
      aria-label={`Game result: ${result} vs ${opponent || 'Unknown'}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variantClasses[result]}`}
    >
      {result}
      {opponent && <span className="opacity-75">vs {opponent}</span>}
      {date && <span className="opacity-75">{date}</span>}
    </span>
  );
};
