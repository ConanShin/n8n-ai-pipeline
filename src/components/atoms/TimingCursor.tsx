
import React from 'react';

export interface TimingCursorProps {
  progress: number;
  inHitZone: boolean;
  inPerfectZone: boolean;
}

export const TimingCursor: React.FC<TimingCursorProps> = ({ progress, inHitZone, inPerfectZone }) => {
  const baseClasses = "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md border-2 transition-colors duration-75";
  let variantClass = "bg-white border-gray-400";
  
  if (inPerfectZone) {
    variantClass = "bg-yellow-300 border-yellow-500 scale-125 shadow-yellow-400/80 animate-pulse";
  } else if (inHitZone) {
    variantClass = "bg-green-300 border-green-600 scale-110 shadow-green-400/60";
  }

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`${baseClasses} ${variantClass}`}
      style={{ left: `${progress * 100}%`, transform: 'translate(-50%, -50%)' }}
    />
  );
};
