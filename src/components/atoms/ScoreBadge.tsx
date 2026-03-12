import React, { useEffect, useState } from 'react';

export interface ScoreBadgeProps {
  score: number;
  animated?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, animated = false }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animated) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [score, animated]);

  return (
    <div 
      className="flex flex-col items-center gap-0.5"
      role="status"
      aria-live="polite"
      aria-label={`현재 점수 ${score}점`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">SCORE</span>
      <span className={`text-4xl sm:text-5xl font-black tabular-nums transition-transform duration-200 ${
        animate ? 'scale-125 text-yellow-300' : 'text-white scale-100'
      }`}>
        {score}
      </span>
    </div>
  );
};
