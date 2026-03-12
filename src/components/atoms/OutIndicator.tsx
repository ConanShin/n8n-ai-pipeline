
import React from 'react';

export interface OutIndicatorProps {
  active: number;
  total: number;
}

export const OutIndicator: React.FC<OutIndicatorProps> = ({ active, total }) => {
  return (
    <div className="flex items-center gap-1.5" aria-label={`아웃 ${active}/${total}`}>
      <span className="text-xs font-semibold text-orange-400 mr-1">O</span>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${i < active ? 'bg-orange-500' : 'bg-gray-600'}`}
        />
      ))}
    </div>
  );
};
