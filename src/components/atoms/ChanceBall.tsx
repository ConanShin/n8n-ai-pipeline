import React from 'react';

export interface ChanceBallProps {
  active: boolean;
}

export const ChanceBall: React.FC<ChanceBallProps> = ({ active }) => {
  return (
    <span
      role="img"
      aria-label="기회 공"
      className={`inline-flex text-2xl transition-all ${
        active ? 'opacity-100 drop-shadow' : 'opacity-25 grayscale'
      }`}
    >
      ⚾
    </span>
  );
};
