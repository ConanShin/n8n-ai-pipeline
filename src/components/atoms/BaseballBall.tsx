import React from 'react';

export interface BaseballBallProps {
  state: 'idle' | 'incoming' | 'hit' | 'miss';
  speed?: number;
}

export const BaseballBall: React.FC<BaseballBallProps> = ({ state, speed = 1500 }) => {
  let stateClasses = '';
  switch (state) {
    case 'idle':
      stateClasses = 'top-1/3 left-1/2 -translate-x-1/2 w-4 h-4 opacity-0 scale-50';
      break;
    case 'incoming':
      stateClasses = 'top-[70%] left-1/2 -translate-x-1/2 w-16 h-16 md:w-24 md:h-24 opacity-100 scale-100';
      break;
    case 'hit':
      stateClasses = 'top-[-20%] left-1/2 -translate-x-1/2 opacity-0 scale-150';
      break;
    case 'miss':
      stateClasses = 'top-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-110';
      break;
  }

  return (
    <div
      role="img"
      aria-label="날아오는 야구공"
      className={`absolute transition-all ease-linear flex items-center justify-center text-5xl md:text-7xl drop-shadow-2xl ${stateClasses}`}
      style={{ transitionDuration: state === 'incoming' ? `${speed}ms` : state === 'hit' || state === 'miss' ? '500ms' : '0ms' }}
    >
      ⚾
    </div>
  );
};
