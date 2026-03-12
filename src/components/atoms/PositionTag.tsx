import React from 'react';

export interface PositionTagProps {
  position: string;
}

export const PositionTag: React.FC<PositionTagProps> = ({ position }) => {
  return (
    <span
      role="note"
      aria-label={`Position: ${position}`}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800"
    >
      {position}
    </span>
  );
};