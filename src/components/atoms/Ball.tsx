
import React from 'react';

export interface BallProps {
  size: number;
  positionX: number;
  positionY: number;
  isVisible: boolean;
}

export const Ball: React.FC<BallProps> = ({ size, positionX, positionY, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div
      className="absolute rounded-full bg-white shadow-lg shadow-white/40 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${positionX}%`,
        top: `${positionY}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 100ms linear'
      }}
      aria-hidden="true"
    >
      <span className="block w-full h-full rounded-full border border-red-400/60" />
    </div>
  );
};
