import React from 'react';

export interface PerformanceChartBarProps {
  value: number;
  maxValue: number;
  label?: string;
  isActive?: boolean;
  gameResult?: 'W' | 'L' | 'ND';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PerformanceChartBar: React.FC<PerformanceChartBarProps> = ({
  value,
  maxValue,
  label,
  isActive,
  gameResult = 'ND',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  const barStyles = {
    W: 'bg-emerald-400 group-hover:bg-emerald-500',
    L: 'bg-red-400 group-hover:bg-red-500',
    ND: 'bg-gray-300 group-hover:bg-gray-400',
  };

  const activeStyle = isActive ? 'ring-2 ring-offset-1 ring-blue-500' : '';

  return (
    <div
      role="img"
      aria-label={`Game on ${label}: ${value} hits, result ${gameResult}`}
      className="flex flex-col items-center justify-end gap-1 cursor-pointer group h-full w-8"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`w-8 rounded-t-md transition-all duration-300 ease-in-out ${barStyles[gameResult]} ${activeStyle}`}
        style={{ height: `${heightPercent}%`, minHeight: '4px' }}
      ></div>
    </div>
  );
};
