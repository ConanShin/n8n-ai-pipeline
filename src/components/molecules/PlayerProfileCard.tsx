import React from 'react';
import { AvatarImage, PositionTag, StatBadge } from '../atoms';

export interface PlayerProfileCardProps {
  playerName: string;
  team: string;
  position: string;
  jerseyNumber: number;
  avatarSrc?: string;
  stats: {
    avg: string;
    hr: number;
    rbi: number;
    ops: string;
  };
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName,
  team,
  position,
  jerseyNumber,
  avatarSrc,
  stats
}) => {
  return (
    <section
      role="region"
      aria-label={`Player profile card for ${playerName}`}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gray-800 rounded-2xl shadow-lg w-full"
    >
      <AvatarImage src={avatarSrc} alt={playerName} size="lg" />
      
      <div className="flex-1 flex flex-col items-center sm:items-start w-full">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{playerName}</h1>
          <span className="text-2xl font-bold text-gray-500">#{jerseyNumber}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 font-medium">{team}</span>
          <span className="text-gray-600">•</span>
          <PositionTag position={position} />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <StatBadge label="AVG" value={stats.avg} />
          <StatBadge label="HR" value={stats.hr} />
          <StatBadge label="RBI" value={stats.rbi} />
          <StatBadge label="OPS" value={stats.ops} />
        </div>
      </div>
    </section>
  );
};