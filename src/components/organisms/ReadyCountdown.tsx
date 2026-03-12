import React, { useEffect, useState } from 'react';
import { CountdownTimer } from '../atoms/CountdownTimer';

export interface ReadyCountdownProps {
  onCountdownEnd: () => void;
  visible: boolean;
}

export const ReadyCountdown: React.FC<ReadyCountdownProps> = ({ onCountdownEnd, visible }) => {
  const [count, setCount] = useState<number | string>(3);
  const [phase, setPhase] = useState<'showing-guide' | 'counting-down'>('showing-guide');

  useEffect(() => {
    if (visible) {
      setPhase('showing-guide');
      setCount(3);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && phase === 'counting-down') {
      const seq = [3, 2, 1, 'GO!'];
      let idx = 0;
      
      const timer = setInterval(() => {
        idx++;
        if (idx < seq.length) {
          setCount(seq[idx]);
        } else {
          clearInterval(timer);
          onCountdownEnd();
        }
      }, 900);

      return () => clearInterval(timer);
    }
  }, [visible, phase, onCountdownEnd]);

  if (!visible) return null;

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gray-950/80 backdrop-blur-sm z-40"
      role="dialog"
      aria-label="게임 시작 준비"
      aria-live="polite"
    >
      {phase === 'showing-guide' ? (
        <div 
          className="flex flex-col items-center gap-2 text-center px-6 animate-[fadeIn_300ms_ease-in]"
          onClick={() => setPhase('counting-down')}
          style={{ cursor: 'pointer' }}
        >
          <span className="text-5xl mb-2">⚾</span>
          <p className="text-xl sm:text-2xl font-black text-white">공이 오면 탭하세요!</p>
          <p className="text-sm text-gray-400 mt-1">타이밍에 따라 홈런 · 안타 · 스트라이크가 결정됩니다</p>
          
          <div className="flex gap-4 mt-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
              <span className="text-xs text-gray-300">Perfect → 홈런</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
              <span className="text-xs text-gray-300">Good → 안타</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
              <span className="text-xs text-gray-300">Miss → 스트라이크</span>
            </div>
          </div>
          
          <button className="mt-8 px-8 py-3 bg-amber-500 text-white font-bold rounded-full shadow-lg shadow-amber-500/30 animate-pulse">
            화면을 탭하여 시작
          </button>
        </div>
      ) : (
        <CountdownTimer count={count} visible={true} />
      )}
    </div>
  );
};
