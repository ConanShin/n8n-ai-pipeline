import React from 'react';
import { StatCard } from '../molecules/StatCard';

export interface QuickStatsStripProps {
  battingAverage: string;
  homeRuns: number;
  rbis: number;
  hits: number;
  gamesPlayed?: number;
  isLoading?: boolean;
}

export const QuickStatsStrip: React.FC<QuickStatsStripProps> = ({
  battingAverage, homeRuns, rbis, hits, gamesPlayed, isLoading
}) => {
  const cards = [
    { label: 'Batting Average', value: battingAverage },
    { label: 'Home Runs', value: homeRuns },
    { label: 'RBIs', value: rbis },
    { label: 'Hits', value: hits }
  ];

  if (gamesPlayed !== undefined) {
    cards.push({ label: 'Games Played', value: gamesPlayed });
  }

  return (
    <div 
      className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-hide w-full snap-x"
      role="region"
      aria-label="Quick statistics overview"
    >
      {isLoading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 min-w-[140px] snap-center">
            <StatCard label="Loading..." value="-" isLoading={true} />
          </div>
        ))
      ) : (
        cards.map((card, i) => (
          <div key={i} className="flex-1 min-w-[140px] snap-center">
            <StatCard label={card.label} value={card.value} />
          </div>
        ))
      )}
    </div>
  );
};
