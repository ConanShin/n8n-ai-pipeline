import React, { useEffect, useState } from 'react';

export interface PitchBallProps {
  speedMs: number;
  isActive: boolean;
  hitQuality?: 'perfect' | 'good' | 'miss' | null;
}

export const PitchBall: React.FC<PitchBallProps> = ({ speedMs, isActive, hitQuality }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    if (isActive) {
      setStyle({
        transition: `transform ${speedMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transform: 'translateX(0)', // Start at 0, moving left
        right: '0%', // Start right edge
      });
      // Need a small timeout to trigger transition if we start from off-screen
      const timer = setTimeout(() => {
        setStyle({
          transition: `transform ${speedMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          transform: 'translateX(-100vw)', // Or whatever point
          right: '0%',
        });
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setStyle({ transform: 'translateX(0)', right: '-50px', transition: 'none' }); // Reset
    }
  }, [isActive, speedMs]);

  // Handle hit state styling
  let variantClasses = "bg-white border-4 border-gray-200 shadow-white/30";
  if (hitQuality === 'perfect') {
    variantClasses = "bg-yellow-300 border-4 border-yellow-400 shadow-yellow-300/60 scale-125 opacity-0 transition-all duration-200 ease-out";
  } else if (hitQuality === 'good') {
    variantClasses = "bg-green-300 border-4 border-green-400 shadow-green-300/40 scale-150 opacity-0 transition-all duration-200 ease-out";
  } else if (hitQuality === 'miss') {
    variantClasses = "bg-gray-400 border-4 border-gray-500 opacity-40 transition-opacity duration-300";
  }

  if (!isActive && !hitQuality) return null;

  return (
    <div
      role="img"
      aria-label="날아오는 야구공"
      aria-hidden="true"
      className={`absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl pointer-events-none select-none flex items-center justify-center top-1/2 -translate-y-1/2 ${variantClasses}`}
      style={style}
    />
  );
};
