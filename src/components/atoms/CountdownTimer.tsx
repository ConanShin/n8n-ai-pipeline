
import React from 'react';

export interface CountdownTimerProps {
  count: number | string;
  visible: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ count, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
      <span 
        key={count} 
        className="text-8xl sm:text-9xl font-black text-white drop-shadow-2xl animate-ping-once"
        role="status"
        aria-live="assertive"
        aria-label={`타석 시작 카운트다운: ${count}`}
      >
        {count}
      </span>
    </div>
  );
};
