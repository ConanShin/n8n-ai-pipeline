import React from 'react';

export interface DashboardFilterBarProps {
  selectedSeason: string;
  availableSeasons: string[];
  activeMetrics: Array<'battingAverage' | 'homeRuns' | 'rbis'>;
  onSeasonChange: (season: string) => void;
  onMetricToggle: (metric: 'battingAverage' | 'homeRuns' | 'rbis') => void;
}

export const DashboardFilterBar: React.FC<DashboardFilterBarProps> = ({
  selectedSeason, availableSeasons, activeMetrics, onSeasonChange, onMetricToggle
}) => {
  const metrics: Array<{ id: 'battingAverage' | 'homeRuns' | 'rbis', label: string }> = [
    { id: 'battingAverage', label: 'Batting Avg' },
    { id: 'homeRuns', label: 'Home Runs' },
    { id: 'rbis', label: 'RBIs' }
  ];

  return (
    <div 
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3 w-full"
      role="toolbar"
      aria-label="Dashboard filter controls"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="season-select" className="text-sm font-medium text-gray-700">Season:</label>
        <select 
          id="season-select"
          value={selectedSeason} 
          onChange={(e) => onSeasonChange(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
        >
          {availableSeasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        {metrics.map(metric => {
          const isActive = activeMetrics.includes(metric.id);
          return (
            <button
              key={metric.id}
              onClick={() => onMetricToggle(metric.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
              } border`}
            >
              {metric.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
