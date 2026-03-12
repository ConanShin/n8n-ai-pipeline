import React, { useState, useEffect } from 'react';
import { PlayerStatsDashboard, PlayerData } from '../templates/PlayerStatsDashboard';

export interface PlayerStatsDashboardPageProps {
  playerId: string;
}

const fetchPlayerData = async (id: string): Promise<PlayerData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Shohei Ohtani',
        team: 'Los Angeles Dodgers',
        position: 'DH',
        jerseyNumber: 17,
        photoUrl: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=200&h=200&fit=crop',
        stats: {
          avg: '.304',
          hr: 54,
          rbi: 130
        },
        seasonStats: [
          { season: '2023', games: 135, atBats: 497, hits: 151, doubles: 26, triples: 8, homeRuns: 44, rbi: 95, avg: '.304', obp: '.412', slg: '.654', ops: '1.066' },
          { season: '2024', games: 159, atBats: 636, hits: 197, doubles: 38, triples: 7, homeRuns: 54, rbi: 130, avg: '.310', obp: '.390', slg: '.646', ops: '1.036', isHighlighted: true },
          { season: 'Career', games: 860, atBats: 3119, hits: 871, doubles: 167, triples: 36, homeRuns: 225, rbi: 567, avg: '.279', obp: '.366', slg: '.556', ops: '.922' },
        ],
        recentGames: [
          { date: 'Mar 1', opponent: 'SD', hits: 2, homeRuns: 1, rbi: 3 },
          { date: 'Mar 2', opponent: 'SD', hits: 1, homeRuns: 0, rbi: 0 },
          { date: 'Mar 4', opponent: 'SF', hits: 3, homeRuns: 2, rbi: 4 },
          { date: 'Mar 5', opponent: 'SF', hits: 0, homeRuns: 0, rbi: 0 },
          { date: 'Mar 7', opponent: 'COL', hits: 2, homeRuns: 0, rbi: 1 },
          { date: 'Mar 8', opponent: 'COL', hits: 1, homeRuns: 1, rbi: 2 },
          { date: 'Mar 9', opponent: 'COL', hits: 2, homeRuns: 0, rbi: 0 },
          { date: 'Mar 11', opponent: 'ARI', hits: 1, homeRuns: 0, rbi: 0 },
          { date: 'Mar 12', opponent: 'ARI', hits: 3, homeRuns: 1, rbi: 2 },
        ]
      });
    }, 1500);
  });
};

export const PlayerStatsDashboardPage: React.FC<PlayerStatsDashboardPageProps> = ({ playerId }) => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const data = await fetchPlayerData(playerId);
        if (isMounted) {
          setPlayerData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch player data. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (playerId) {
      loadData();
    } else {
      setIsLoading(false);
      setError('No player ID provided.');
    }

    return () => {
      isMounted = false;
    };
  }, [playerId]);

  return (
    <div className="flex flex-col w-full min-h-screen" role="document" aria-label="Baseball player stats page">
      <PlayerStatsDashboard 
        player={playerData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};
