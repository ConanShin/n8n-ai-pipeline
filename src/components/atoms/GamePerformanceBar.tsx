import React from 'react';

export interface GamePerformanceBarProps {
  date: string;
  value: number;
  maxValue: number;
  isSelected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  opponent?: string;
  activeStatLabel?: string;
}

export const GamePerformanceBar: React.FC<GamePerformanceBarProps> = ({
  date,
  value,
  maxValue,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  opponent,
  activeStatLabel
}) => {
  const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  return (
    <div 
      className="flex flex-col items-center justify-end gap-2 cursor-pointer group relative h-48 w-8 md:w-12"
      role="img"
      aria-label={`Game on ${date}: ${value}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={0}
    >
      <div className={`absolute bottom-full mb-2 bg-slate-900 text-white text-xs p-2 rounded shadow-lg whitespace-nowrap z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}>
        <div className="font-bold">{date} vs {opponent}</div>
        <div>{activeStatLabel}: {value}</div>
      </div>
      
      <div 
        className={`w-full bg-cyan-400 rounded-t-md transition-all duration-300 ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800 bg-cyan-300' : 'group-hover:bg-cyan-300'}`}
        style={{ height: `${Math.max(heightPercentage, 2)}%` }}
      ></div>
      
      <div className="text-[10px] md:text-xs text-slate-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
        {date}
      </div>
    </div>
  );
};
