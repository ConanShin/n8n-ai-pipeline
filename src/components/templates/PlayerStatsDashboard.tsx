import React from 'react';
import { DashboardHeader } from '../molecules/DashboardHeader';
import { PlayerProfileCard } from '../molecules/PlayerProfileCard';
import { StatsTable, StatItem } from '../organisms/StatsTable';
import { PerformanceChart, GameStat } from '../organisms/PerformanceChart';

export interface PlayerStatsDashboardProps {
  playerId: string;
  season: string;
  isLoading?: boolean;
  hasError?: boolean;
  onSeasonChange?: (season: string) => void;
  playerData?: any;
  statsData?: StatItem[];
  gamesData?: GameStat[];
}

export const PlayerStatsDashboard: React.FC<PlayerStatsDashboardProps> = ({
  playerId,
  season,
  isLoading,
  hasError,
  onSeasonChange,
  playerData,
  statsData = [],
  gamesData = []
}) => {
  if (hasError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader title="Baseball Stats" selectedSeason={season} seasons={['2026', '2025', '2024']} />
        <div className="flex flex-col items-center justify-center gap-4 text-center py-24 text-gray-500">
          <p className="text-xl">Error loading dashboard data.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div role="main" aria-label="Baseball player statistics dashboard" className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Baseball Stats" 
        selectedSeason={season} 
        seasons={['2026', '2025', '2024']} 
        onSeasonChange={onSeasonChange} 
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 w-full">
          <PlayerProfileCard 
            playerName={playerData?.name || "Loading..."}
            teamName={playerData?.team || "Loading..."}
            position={playerData?.position || "-"}
            jerseyNumber={playerData?.jerseyNumber || 0}
            battingAverage={playerData?.avg || 0}
            homeRuns={playerData?.hr || 0}
            rbi={playerData?.rbi || 0}
            isLoading={isLoading}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsTable stats={statsData} isLoading={isLoading} />
          <PerformanceChart games={gamesData} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};
