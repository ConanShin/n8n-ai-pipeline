
import React from 'react';

export interface StrikeIndicatorProps {
  active: number;
  total: number;
}

export const StrikeIndicator: React.FC<StrikeIndicatorProps> = ({ active, total }) => {
  return (
    <div className="flex items-center gap-1.5" aria-label={`스트라이크 ${active}/${total}`}>
      <span className="text-xs font-semibold text-red-400 mr-1">S</span>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${i < active ? 'bg-red-500' : 'bg-gray-600'}`}
        />
      ))}
    </div>
  );
};
