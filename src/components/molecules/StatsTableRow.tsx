import React from 'react';

export interface StatsTableRowProps {
  date?: string;
  opponent?: string;
  atBats: number;
  hits: number;
  homeRuns: number;
  rbis: number;
  battingAverage: string;
  isHighlighted?: boolean;
}

export const StatsTableRow: React.FC<StatsTableRowProps> = ({
  date, opponent, atBats, hits, homeRuns, rbis, battingAverage, isHighlighted
}) => {
  return (
    <div 
      className={`grid grid-cols-7 gap-2 px-4 py-3 text-sm border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150 ${isHighlighted ? 'bg-yellow-50 font-semibold' : 'bg-white'}`}
      role="row"
      aria-label={`Game stats row for ${date} vs ${opponent}`}
    >
      <div className="text-gray-600 truncate">{date || '-'}</div>
      <div className="text-gray-600 truncate">{opponent || '-'}</div>
      <div className="tabular-nums text-gray-700">{atBats}</div>
      <div className="tabular-nums text-gray-700">{hits}</div>
      <div className="tabular-nums text-gray-700">{homeRuns}</div>
      <div className="tabular-nums text-gray-700">{rbis}</div>
      <div className="tabular-nums text-gray-700">{battingAverage}</div>
    </div>
  );
};
