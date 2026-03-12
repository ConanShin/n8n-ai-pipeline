import React from 'react';

export interface ScoreDisplayProps {
  score: number;
  label?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, label = 'SCORE' }) => {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-start gap-0.5" role="text" aria-label="현재 점수">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className={`text-3xl md:text-4xl font-extrabold tabular-nums transition-colors duration-300 ${animate ? 'animate-bounce text-yellow-400' : 'text-white'}`}>
        {score}
      </span>
    </div>
  );
};
