import React, { useState } from 'react';
import { SectionHeading } from '../atoms';
import { PerformanceChartBar, GameStat } from '../molecules';

export interface PerformanceChartProps {
  games: GameStat[];
}

type MetricType = 'avg' | 'hits' | 'hr' | 'rbi';

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ games }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('avg');
  
  const chartGames = [...games].sort((a, b) => a.date.localeCompare(b.date)).slice(-14);

  const getMetricValue = (game: GameStat, metric: MetricType) => {
    if (metric === 'avg') return parseFloat(game.avg);
    return game[metric];
  };

  const maxVal = Math.max(
    ...chartGames.map(g => getMetricValue(g, activeMetric) as number),
    activeMetric === 'avg' ? 0.400 : 1
  );

  const metrics: { id: MetricType; label: string }[] = [
    { id: 'avg', label: 'AVG' },
    { id: 'hits', label: 'Hits' },
    { id: 'hr', label: 'HR' },
    { id: 'rbi', label: 'RBI' },
  ];

  return (
    <section
      role="region"
      aria-label="Recent game performance chart"
      className="flex flex-col gap-4 bg-gray-800 rounded-2xl shadow-lg p-6 w-full h-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeading title="Performance Trends" />
        
        <div className="flex p-1 bg-gray-900 rounded-lg w-fit border border-gray-700">
          {metrics.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMetric === m.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[200px] mt-4 flex items-end justify-between gap-1 sm:gap-2">
        {chartGames.length > 0 ? (
          chartGames.map((game, i) => {
            const rawVal = getMetricValue(game, activeMetric);
            const normalized = maxVal === 0 ? 0 : (rawVal as number) / maxVal;
            const dateLabel = game.date.split('-').slice(1).join('/'); // MM/DD
            
            return (
              <PerformanceChartBar
                key={`${game.date}-${i}`}
                label={dateLabel}
                value={normalized}
                rawValue={game[activeMetric]}
                color={activeMetric === 'avg' ? 'bg-indigo-500' : 'bg-emerald-500'}
                tooltipData={{
                  date: game.date,
                  avg: game.avg,
                  hits: game.hits,
                  hr: game.hr,
                  rbi: game.rbi
                }}
              />
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm h-full">
            No data available
          </div>
        )}
      </div>
    </section>
  );
};