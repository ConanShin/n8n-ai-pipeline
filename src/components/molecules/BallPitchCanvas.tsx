
import React from 'react';
import { BallIcon } from '../atoms/BallIcon';

export interface BallPitchCanvasProps {
  pitching: boolean;
  progress: number;
  hitResult?: string | null;
}

export const BallPitchCanvas: React.FC<BallPitchCanvasProps> = ({ pitching, progress, hitResult }) => {
  const ballSize = 12 + progress * 52; 
  const ballTop = 25 + progress * 37;
  
  return (
    <div 
      role="img" 
      aria-label="야구공 투구 애니메이션 영역"
      className="relative w-full aspect-[4/3] sm:aspect-video bg-gradient-to-b from-sky-500 via-sky-300 to-green-600 rounded-3xl overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white/20 fill-current">
            <polygon points="50,20 80,50 50,80 20,50" />
        </svg>
      </div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full bg-amber-100 opacity-60" />
      
      {!pitching && !hitResult && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xl font-bold">
          READY...
        </div>
      )}
      
      {(pitching || (hitResult && hitResult === 'strike')) && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 transition-none"
          style={{ top: `${ballTop}%` }}
        >
          <BallIcon variant="flying" size={ballSize} />
        </div>
      )}

      {hitResult && hitResult !== 'strike' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="w-full h-full border-t-4 border-dashed border-white/50 rounded-full animate-ping-once opacity-50 absolute top-1/2" />
        </div>
      )}
    </div>
  );
};
