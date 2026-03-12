import React from 'react';
import { SwingResultLabel } from '../atoms/SwingResultLabel';

export interface ResultOverlayProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike';
  timing?: 'perfect' | 'good' | 'early' | 'late' | null;
  visible: boolean;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({ result, timing, visible }) => {
  if (!visible) return null;

  const timingText = timing === 'perfect' ? '🎯 Perfect Timing!' :
                     timing === 'good' ? '👍 Good!' :
                     timing === 'early' ? '⬅ Too Early' :
                     timing === 'late' ? '➡ Too Late' : '';

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30 pointer-events-none"
      role="alert"
      aria-live="assertive"
      aria-label={`판정 결과: ${result}`}
    >
      <div className="relative w-full flex items-center justify-center">
         <SwingResultLabel result={result} visible={visible} />
      </div>
      {!!timing && result !== 'strike' && (
        <span className="text-base sm:text-lg font-bold text-white/80 tracking-wide drop-shadow animate-[resultPop_200ms_forwards,fadeOut_700ms_ease-in_forwards] mt-24">
          {timingText}
        </span>
      )}
    </div>
  );
};
