
import React from 'react';
export interface BaseballBallProps { x: number; y: number; scale: number; isHit?: boolean; state: 'flying' | 'hit' | 'strike'; }
export const BaseballBall: React.FC<BaseballBallProps> = ({ x, y, scale, state }) => (
  <div 
    className="absolute pointer-events-none z-10"
    style={{ 
      left: `${x}%`, top: `${y}%`, 
      transform: `translate(-50%, -50%) scale(${scale})`,
      transition: state === 'flying' ? 'none' : 'all 0.3s ease-out'
    }}
    role="img" aria-label="날아오는 야구공" aria-hidden="true"
  >
    <div className="w-6 h-6 rounded-full bg-white border border-red-400 shadow-lg relative flex items-center justify-center">
      {state === 'hit' && (
        <div className="absolute inset-0 rounded-full ring-4 ring-yellow-300 ring-opacity-80 scale-150 opacity-0 animate-ping duration-300" />
      )}
    </div>
  </div>
);
