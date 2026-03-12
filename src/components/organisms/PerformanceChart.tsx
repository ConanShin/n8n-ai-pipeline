import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { EmptyState } from '../atoms/EmptyState';
import { PerformanceChartBar } from '../molecules/PerformanceChartBar';

export interface PerformanceChartData {
  label: string;
  hits: number;
  homeRuns: number;
  battingAverage: number;
}

export interface PerformanceChartProps {
  data: PerformanceChartData[];
  metric?: 'hits' | 'homeRuns' | 'battingAverage';
  title?: string;
  isLoading?: boolean;
  maxGames?: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data, metric: initialMetric = 'hits', title = 'Performance Trend', isLoading, maxGames = 10
}) => {
  const [activeMetric, setActiveMetric] = useState<'hits' | 'homeRuns' | 'battingAverage'>(initialMetric);
  
  const displayData = useMemo(() => {
    return data.slice(-maxGames);
  }, [data, maxGames]);

  const maxValue = useMemo(() => {
    if (displayData.length === 0) return 1;
    const max = Math.max(...displayData.map(d => d[activeMetric]));
    return max > 0 ? max : 1;
  }, [displayData, activeMetric]);

  const metrics = [
    { id: 'hits', label: 'Hits' },
    { id: 'homeRuns', label: 'HR' },
    { id: 'battingAverage', label: 'AVG' }
  ];

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6 gap-4" role="img" aria-label="Player performance bar chart">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionHeading title={title} subtitle={`Last ${displayData.length} games`} />
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {metrics.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMetric === m.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-1 h-48 mt-4 border-b border-gray-200 pb-2">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <LoadingSpinner size="lg" label="Loading chart data" />
          </div>
        ) : displayData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <EmptyState icon="📊" message="No data to display" />
          </div>
        ) : (
          displayData.map((d, i) => {
            const val = d[activeMetric];
            const formattedVal = activeMetric === 'battingAverage' ? val.toFixed(3).replace(/^0/, '') : val;
            return (
              <PerformanceChartBar 
                key={i}
                value={val}
                maxValue={maxValue}
                label={d.label}
                tooltipText={`${d.label}: ${formattedVal} ${metrics.find(m=>m.id === activeMetric)?.label}`}
                color={activeMetric === 'battingAverage' ? 'bg-blue-500' : activeMetric === 'homeRuns' ? 'bg-green-500' : 'bg-yellow-500'}
              />
            );
          })
        )}
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span> AVG
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> HR
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Hits
        </span>
      </div>
    </div>
  );
};