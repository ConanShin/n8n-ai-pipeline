import React from 'react';

export interface StatsTableRowProps {
  date: string;
  opponent: string;
  atBats: number;
  hits: number;
  homeRuns: number;
  rbi: number;
  battingAverage: number;
  isHighlighted?: boolean;
}

export const StatsTableRow: React.FC<StatsTableRowProps> = ({
  date, opponent, atBats, hits, homeRuns, rbi, battingAverage, isHighlighted
}) => {
  return (
    <div 
      className={`grid grid-cols-7 items-center px-4 py-3 text-sm border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors ${isHighlighted ? 'bg-blue-50' : 'bg-white'}`}
      role="row"
      aria-label="Game stats row"
    >
      <div className="text-gray-500">{date}</div>
      <div className="font-medium text-gray-900">{opponent}</div>
      <div className="text-gray-700">{atBats}</div>
      <div className="text-gray-700 font-semibold">{hits}</div>
      <div className="text-gray-700">{homeRuns}</div>
      <div className="text-gray-700">{rbi}</div>
      <div className="text-blue-600 font-medium">{battingAverage.toFixed(3).replace(/^0/, '')}</div>
    </div>
  );
};