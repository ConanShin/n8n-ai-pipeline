import React, { useState } from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { ChartLegend } from '../atoms/ChartLegend';
import { GamePerformanceBar } from '../atoms/GamePerformanceBar';

export interface GameData {
  date: string;
  hits: number;
  homeRuns: number;
  rbi: number;
  opponent: string;
}

export interface PerformanceChartProps {
  games: GameData[];
  activeStat?: 'hits' | 'homeRuns' | 'rbi';
  isLoading?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  games, 
  activeStat = 'hits',
  isLoading 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-800 shadow-lg w-full min-h-[300px]" role="region" aria-label="Loading chart">
        <div className="h-6 w-48 bg-slate-700 rounded mb-4 animate-pulse"></div>
        <div className="flex-1 flex items-end justify-between gap-2 animate-pulse">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-8 bg-slate-700 rounded-t-md" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800 shadow-lg w-full min-h-[300px] text-slate-400">
        <p>No recent games available.</p>
      </div>
    );
  }

  const maxValue = Math.max(...games.map(g => g[activeStat]), 1);
  const statLabels = {
    hits: 'Hits',
    homeRuns: 'Home Runs',
    rbi: 'RBIs'
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-800 shadow-lg w-full" role="region" aria-label="Recent game performance chart">
      <SectionHeading title="Recent Performance" subtitle={`Last ${games.length} Games`} />
      
      <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 mt-8 pt-10 border-b border-slate-700 pb-2">
        {games.map((game, idx) => (
          <GamePerformanceBar
            key={idx}
            date={game.date}
            value={game[activeStat]}
            maxValue={maxValue}
            opponent={game.opponent}
            activeStatLabel={statLabels[activeStat]}
            isSelected={selectedIndex === idx}
            onClick={() => setSelectedIndex(idx === selectedIndex ? null : idx)}
          />
        ))}
      </div>
      
      <ChartLegend items={[
        { label: statLabels[activeStat], color: '#22D3EE' }
      ]} />
    </div>
  );
};
