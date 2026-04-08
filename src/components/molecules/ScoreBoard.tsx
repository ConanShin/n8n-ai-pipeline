
import React, { useEffect, useState } from 'react';
import { OutChanceRow } from './OutChanceRow';

export interface ScoreBoardProps {
  score: number;
  currentInning: number;
  usedChances: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, currentInning, usedChances }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    let start = displayScore;
    const end = score;
    if (start === end) return;
    
    const duration = 400;
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.floor(start + (end - start) * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayScore(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div 
      role="region" 
      aria-label="점수판 — 현재 점수, 타석, 남은 기회 표시"
      className="flex items-center justify-between w-full px-4 py-3 bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg"
    >
      <div className="flex flex-col items-start gap-0.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">SCORE</span>
        <span className="text-3xl font-black text-yellow-300 tabular-nums">{displayScore}</span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">INNING</span>
        <span className="text-3xl font-black text-white tabular-nums">{currentInning} / 3</span>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">CHANCE</span>
        <OutChanceRow usedChances={usedChances} />
      </div>
    </div>
  );
};
