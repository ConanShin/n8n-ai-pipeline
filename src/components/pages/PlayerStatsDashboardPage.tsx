import React, { useState, useEffect } from 'react';
import { PlayerStatsDashboard } from '../templates/PlayerStatsDashboard';
import { StatItem } from '../organisms/StatsTable';
import { GameStat } from '../organisms/PerformanceChart';

export interface PlayerStatsDashboardPageProps {
  routeParams: {
    playerId: string;
    season?: string;
  };
}

const MOCK_PLAYER = {
  name: "Aaron Judge",
  team: "New York Yankees",
  position: "OF",
  jerseyNumber: 99,
  avg: 0.322,
  hr: 58,
  rbi: 144
};

const MOCK_STATS: StatItem[] = [
  { statLabel: "Batting Average", statKey: "AVG", value: ".322", rank: 1, trend: "up", delta: "+.002" },
  { statLabel: "Home Runs", statKey: "HR", value: 58, rank: 1, trend: "up", delta: "+2", isHighlighted: true },
  { statLabel: "Runs Batted In", statKey: "RBI", value: 144, rank: 1, trend: "up", delta: "+4" },
  { statLabel: "On-Base Percentage", statKey: "OBP", value: ".458", rank: 1, trend: "neutral" },
  { statLabel: "Slugging Percentage", statKey: "SLG", value: ".701", rank: 1, trend: "down", delta: "-.005" },
];

const MOCK_GAMES: GameStat[] = Array.from({ length: 10 }).map((_, i) => ({
  date: `Oct ${10 + i}`,
  opponent: ["BOS", "TOR", "BAL", "TB"][i % 4],
  result: i % 3 === 0 ? 'L' : 'W',
  hits: Math.floor(Math.random() * 4),
  atBats: 4,
  rbi: Math.floor(Math.random() * 3),
  homeRuns: Math.floor(Math.random() * 2)
}));

export const PlayerStatsDashboardPage: React.FC<PlayerStatsDashboardPageProps> = ({ routeParams }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState(routeParams.season || '2026');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [season, routeParams.playerId]);

  return (
    <div role="document" aria-label="Baseball player stats dashboard page" lang="en" className="min-h-screen w-full bg-gray-50">
      <PlayerStatsDashboard
        playerId={routeParams.playerId}
        season={season}
        isLoading={isLoading}
        onSeasonChange={setSeason}
        playerData={MOCK_PLAYER}
        statsData={MOCK_STATS}
        gamesData={MOCK_GAMES}
      />
    </div>
  );
};
