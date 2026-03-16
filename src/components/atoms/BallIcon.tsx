
import React from 'react';
export interface BallIconProps { active: boolean; }
export const BallIcon: React.FC<BallIconProps> = ({ active }) => (
  <div className="flex items-center justify-center" role="img" aria-label="야구공">
    <div className={active ? "w-5 h-5 rounded-full bg-white border-2 border-yellow-300 shadow-md" : "w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-500 opacity-50"} />
  </div>
);
