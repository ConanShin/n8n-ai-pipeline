import React from 'react';

export interface PositionTagProps {
  position: string;
}

export const PositionTag: React.FC<PositionTagProps> = ({ position }) => {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white uppercase tracking-widest"
      role="text"
      aria-label={`Position: ${position}`}
    >
      {position}
    </span>
  );
};
