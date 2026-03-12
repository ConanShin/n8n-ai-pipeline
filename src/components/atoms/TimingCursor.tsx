import React from 'react';

export interface TimingCursorProps {
  progress: number;
}

export const TimingCursor: React.FC<TimingCursorProps> = ({ progress }) => {
  return (
    <div
      className="absolute top-0 h-full w-1 transition-none z-10"
      style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
      role="presentation"
      aria-hidden="true"
    >
      <div className="w-1 h-full bg-white rounded shadow-md shadow-white/50" />
      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow" />
    </div>
  );
};
