
import React from 'react';
import { ScoreLabel } from '../atoms/ScoreLabel';

export interface ResultOverlayProps {
  result: 'homerun' | '3base' | '2base' | '1base' | 'strike' | null;
  scoreIncrement: number;
  visible: boolean;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({ result, scoreIncrement, visible }) => {
  if (!visible || !result) return null;

  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      aria-label={`타격 결과 알림: ${result}`}
      className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-4 animate-fade-scale-in">
        <ScoreLabel result={result} size="lg" />
        {scoreIncrement > 0 && (
          <span className="text-white text-2xl font-black drop-shadow-lg animate-score-float">
            + {scoreIncrement}점
          </span>
        )}
      </div>
    </div>
  );
};
