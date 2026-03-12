import React, { useEffect, useState } from 'react';

export interface CountdownTimerProps {
  count: number | string;
  visible: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ count, visible }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [count]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
      <span 
        key={key}
        className="text-8xl sm:text-9xl font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] select-none animate-[countdownScale_900ms_ease-in-out_forwards]"
        role="timer"
        aria-live="assertive"
        aria-label={`게임 시작까지 ${count}`}
      >
        {count}
      </span>
      <style>{`
        @keyframes countdownScale {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
