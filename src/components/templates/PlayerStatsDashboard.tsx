import React, { useState } from 'react';
import { PlayerProfileCard, PlayerProfileCardProps } from '../molecules/PlayerProfileCard';
import { QuickStatsStrip, QuickStatsStripProps } from '../organisms/QuickStatsStrip';
import { DashboardFilterBar, DashboardFilterBarProps } from '../molecules/DashboardFilterBar';
import { PerformanceChart, PerformanceChartProps } from '../organisms/PerformanceChart';
import { StatsTable, StatsTableProps } from '../organisms/StatsTable';

export interface PlayerStatsDashboardProps {
  playerId: string;
  profileData: PlayerProfileCardProps;
  quickStatsData: QuickStatsStripProps;
  chartData: PerformanceChartProps['data'];
  tableData: StatsTableProps['rows'];
  isLoading?: boolean;
}

export const PlayerStatsDashboard: React.FC<PlayerStatsDashboardProps> = ({
  playerId, profileData, quickStatsData, chartData, tableData, isLoading
}) => {
  const [selectedSeason, setSelectedSeason] = useState('2025');
  const [activeMetrics, setActiveMetrics] = useState<Array<'battingAverage' | 'homeRuns' | 'rbis'>>(['battingAverage']);

  const handleMetricToggle = (metric: 'battingAverage' | 'homeRuns' | 'rbis') => {
    setActiveMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" role="main" aria-label="Baseball player statistics dashboard">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-700">MLB Stats</div>
        <div className="text-sm text-gray-500">Player ID: {playerId}</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6">
        <section className="w-full">
          <PlayerProfileCard {...profileData} isLoading={isLoading} />
        </section>

        <section className="w-full">
          <QuickStatsStrip {...quickStatsData} isLoading={isLoading} />
        </section>

        <section className="w-full flex flex-col gap-4">
          <DashboardFilterBar 
            selectedSeason={selectedSeason}
            availableSeasons={['2025', '2024', '2023', 'Career']}
            activeMetrics={activeMetrics}
            onSeasonChange={setSelectedSeason}
            onMetricToggle={handleMetricToggle}
          />
          <PerformanceChart 
            data={chartData} 
            activeMetrics={activeMetrics.length > 0 ? activeMetrics : ['battingAverage']} 
            isLoading={isLoading} 
          />
        </section>

        <section className="w-full">
          <StatsTable rows={tableData} isLoading={isLoading} totalPages={3} currentPage={1} />
        </section>
      </main>
    </div>
  );
};
