import React, { useState, useEffect } from 'react';
import { PlayerStatsDashboard } from '../templates/PlayerStatsDashboard';

export interface PlayerStatsDashboardPageProps {
  params: { playerId: string };
}

export const PlayerStatsDashboardPage: React.FC<PlayerStatsDashboardPageProps> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const profileData = {
    playerId: params.playerId,
    fullName: "Shohei Ohtani",
    teamName: "Los Angeles Dodgers",
    teamLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Los_Angeles_Dodgers_logo.svg",
    position: "Designated Hitter",
    jerseyNumber: 17,
    nationality: "🇯🇵",
    avatarUrl: "https://i.pravatar.cc/150?u=shohei",
    keyStats: [
      { label: "AVG", value: ".304", trend: "up" as const },
      { label: "HR", value: 44, trend: "up" as const },
      { label: "RBI", value: 95, trend: "neutral" as const }
    ]
  };

  const quickStatsData = {
    battingAverage: ".304",
    homeRuns: 44,
    rbis: 95,
    hits: 151,
    gamesPlayed: 135
  };

  const chartData = [
    { date: "Oct 1", battingAverage: 0.290, homeRuns: 40, rbis: 80, opponent: "SF" },
    { date: "Oct 5", battingAverage: 0.295, homeRuns: 42, rbis: 85, opponent: "SD" },
    { date: "Oct 10", battingAverage: 0.301, homeRuns: 43, rbis: 90, opponent: "ARI" },
    { date: "Oct 15", battingAverage: 0.304, homeRuns: 44, rbis: 95, opponent: "COL" }
  ];

  const tableData = [
    { date: "Oct 15", opponent: "COL", atBats: 4, hits: 2, homeRuns: 1, rbis: 3, battingAverage: ".500", isHighlighted: true },
    { date: "Oct 10", opponent: "ARI", atBats: 5, hits: 1, homeRuns: 0, rbis: 0, battingAverage: ".200" },
    { date: "Oct 5", opponent: "SD", atBats: 3, hits: 2, homeRuns: 1, rbis: 2, battingAverage: ".667" },
    { date: "Oct 1", opponent: "SF", atBats: 4, hits: 1, homeRuns: 0, rbis: 0, battingAverage: ".250" },
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [params.playerId]);

  return (
    <div className="flex flex-col min-h-screen" role="document" aria-label="Player stats dashboard page">
      <PlayerStatsDashboard 
        playerId={params.playerId}
        profileData={profileData}
        quickStatsData={quickStatsData}
        chartData={chartData}
        tableData={tableData}
        isLoading={isLoading}
      />
    </div>
  );
};
