import React, { useState, useRef } from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { PerformanceChartBar } from '../atoms/PerformanceChartBar';
import { PerformanceChartTooltip } from '../atoms/PerformanceChartTooltip';

export interface GameStat {
  date: string;
  opponent: string;
  result: 'W' | 'L' | 'ND';
  hits: number;
  atBats: number;
  rbi: number;
  homeRuns: number;
}

export interface PerformanceChartProps {
  games: GameStat[];
  statKey?: 'hits' | 'homeRuns' | 'rbi';
  title?: string;
  maxGames?: number;
  isLoading?: boolean;
  hasError?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  games,
  statKey = 'hits',
  title = "Recent Game Performance",
  maxGames = 10,
  isLoading,
  hasError
}) => {
  const [activeStat, setActiveStat] = useState<'hits' | 'homeRuns' | 'rbi'>(statKey);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const chartRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <div className="animate-pulse bg-gray-200 rounded-2xl h-64 w-full"></div>;
  if (hasError) return <div className="flex items-center justify-center h-48 text-red-500 text-sm">Failed to load chart</div>;
  if (!games || games.length === 0) return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No recent game data available.</div>
    </div>
  );

  const displayGames = games.slice(-maxGames);
  const maxValue = Math.max(...displayGames.map(g => g[activeStat]), 1);

  const statTabs = [
    { key: 'hits', label: 'Hits' },
    { key: 'homeRuns', label: 'HR' },
    { key: 'rbi', label: 'RBI' }
  ] as const;

  return (
    <div
      role="img"
      aria-label="Bar chart of player's recent game performance"
      className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-full"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <SectionHeading title={title} subtitle={`Last ${maxGames} games`} />
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="text-emerald-500">●</span> Win</span>
          <span className="flex items-center gap-1"><span className="text-red-500">●</span> Loss</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {statTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveStat(tab.key)}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${
              activeStat === tab.key 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div 
        ref={chartRef}
        className="relative flex items-end justify-between gap-2 h-48 px-1 mt-4 border-b border-gray-200"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {displayGames.map((game, i) => (
          <PerformanceChartBar
            key={i}
            value={game[activeStat]}
            maxValue={maxValue}
            label={game.date}
            gameResult={game.result}
            isActive={selectedIndex === i}
            onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
            onMouseEnter={() => setHoveredIndex(i)}
          />
        ))}

        {hoveredIndex !== null && (
          <PerformanceChartTooltip
            visible={true}
            date={displayGames[hoveredIndex].date}
            opponent={displayGames[hoveredIndex].opponent}
            stats={{
              hits: displayGames[hoveredIndex].hits,
              'home runs': displayGames[hoveredIndex].homeRuns,
              rbi: displayGames[hoveredIndex].rbi,
              'at bats': displayGames[hoveredIndex].atBats
            }}
            style={{ 
              left: `calc(${(hoveredIndex + 0.5) * (100 / displayGames.length)}% - 6px)`, 
              top: '0' 
            }}
          />
        )}
      </div>

      <div className="flex justify-between px-1 text-xs text-gray-400">
        {displayGames.map((game, i) => (
          <div key={i} className="w-8 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {game.date.split(' ')[0]}
          </div>
        ))}
      </div>
      
      {selectedIndex !== null && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-900 border border-blue-100">
          <strong>Selected Game:</strong> {displayGames[selectedIndex].date} vs {displayGames[selectedIndex].opponent} - 
          Result: {displayGames[selectedIndex].result} - 
          Hits: {displayGames[selectedIndex].hits}, HR: {displayGames[selectedIndex].homeRuns}, RBI: {displayGames[selectedIndex].rbi}
        </div>
      )}
    </div>
  );
};
