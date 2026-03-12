import React, { useState } from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { ChartLegend } from '../atoms/ChartLegend';
import { PerformanceChartTooltip } from '../atoms/PerformanceChartTooltip';

export interface ChartDataPoint {
  date: string;
  battingAverage: number;
  homeRuns: number;
  rbis: number;
  opponent?: string;
}

export interface PerformanceChartProps {
  data: ChartDataPoint[];
  activeMetrics: Array<'battingAverage' | 'homeRuns' | 'rbis'>;
  isLoading?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, activeMetrics, isLoading }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const colors = {
    battingAverage: "#3B82F6",
    homeRuns: "#EF4444",
    rbis: "#10B981"
  };

  const legendItems = activeMetrics.map(m => ({
    label: m === 'battingAverage' ? 'Batting Avg' : m === 'homeRuns' ? 'Home Runs' : 'RBIs',
    color: colors[m]
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white shadow-md border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  // Calculate SVG bounds
  const width = 800;
  const height = 300;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = data.length > 0 ? Math.max(...data.flatMap(d => activeMetrics.map(m => d[m]))) || 1 : 1;

  const getPoints = (metric: 'battingAverage' | 'homeRuns' | 'rbis') => {
    return data.map((d, i) => {
      const x = padding + (i / Math.max(1, data.length - 1)) * chartWidth;
      const y = height - padding - (d[metric] / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div 
      className="flex flex-col gap-4 p-6 rounded-2xl bg-white shadow-md border border-gray-100"
      role="img"
      aria-label="Performance trend chart for selected metrics over recent games"
    >
      <SectionHeading title="Performance Trends" subtitle="Visualizing key metrics over time" />
      <ChartLegend items={legendItems} />
      
      <div className="relative w-full h-64 md:h-80">
        {data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">No data available</div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {/* Y-axis labels */}
            {[0, 0.5, 1].map((ratio) => (
              <text key={ratio} x={padding - 10} y={height - padding - ratio * chartHeight + 4} textAnchor="end" className="text-xs fill-gray-400">
                {(maxValue * ratio).toFixed(2)}
              </text>
            ))}

            {/* Grid lines */}
            {[0, 0.5, 1].map((ratio) => (
              <line key={ratio} x1={padding} y1={height - padding - ratio * chartHeight} x2={width - padding} y2={height - padding - ratio * chartHeight} stroke="#E5E7EB" strokeDasharray="4 4" />
            ))}
            
            {/* Lines */}
            {activeMetrics.map(metric => (
              <polyline
                key={metric}
                points={getPoints(metric)}
                fill="none"
                stroke={colors[metric]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ))}

            {/* Hover Points */}
            {data.map((d, i) => {
              const x = padding + (i / Math.max(1, data.length - 1)) * chartWidth;
              return activeMetrics.map(metric => {
                const y = height - padding - (d[metric] / maxValue) * chartHeight;
                return (
                  <circle
                    key={`${metric}-${i}`}
                    cx={x}
                    cy={y}
                    r={hoverIndex === i ? 6 : 4}
                    fill={colors[metric]}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                );
              });
            })}
          </svg>
        )}

        {/* Custom Tooltip Overlay */}
        {hoverIndex !== null && data[hoverIndex] && (
          <div 
            className="absolute top-0 pointer-events-none transition-all duration-200"
            style={{ left: `${(hoverIndex / Math.max(1, data.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
          >
            <div className="mt-[-10px]">
              {activeMetrics.map((metric, idx) => (
                <div key={idx} className="mb-1">
                  <PerformanceChartTooltip
                    date={data[hoverIndex].date}
                    value={data[hoverIndex][metric]}
                    opponent={data[hoverIndex].opponent}
                    visible={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
