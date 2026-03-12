import React from 'react';
import { TeamAvatar, GameStatusBadge } from '../atoms';

export interface TeamData {
  name: string;
  shortName: string;
  initials: string;
  teamColor?: string;
  logoSrc?: string;
  totalRuns?: number;
}

export interface ScoreboardHeaderProps {
  homeTeam: TeamData;
  awayTeam: TeamData;
  gameStatus: 'scheduled' | 'live' | 'final' | string;
  currentInning?: number;
  inningHalf?: 'top' | 'bottom' | string;
  venue?: string;
  gameDate?: string;
}

export const ScoreboardHeader: React.FC<ScoreboardHeaderProps> = ({
  homeTeam,
  awayTeam,
  gameStatus,
  currentInning,
  inningHalf,
  venue,
  gameDate,
}) => {
  return (
    <div
      role="banner"
      aria-label={`경기 헤더 — ${awayTeam.name} vs ${homeTeam.name} 현재 점수`}
      className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 bg-gray-900 border-b border-gray-800"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-gray-500">{gameDate}</span>
          <span className="text-xs text-gray-600">{venue}</span>
        </div>
        <GameStatusBadge
          status={gameStatus}
          currentInning={currentInning}
          inningHalf={inningHalf}
        />
      </div>

      <div className="flex items-center justify-between gap-4 py-2">
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <TeamAvatar
            initials={awayTeam.initials}
            teamColor={awayTeam.teamColor}
            logoSrc={awayTeam.logoSrc}
            size="lg"
          />
          <span className="text-sm font-bold text-gray-200 text-center">
            {awayTeam.shortName}
          </span>
          <span className="text-4xl sm:text-5xl font-black tabular-nums text-white">
            {awayTeam.totalRuns ?? '-'}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 px-2">
          <span className="text-2xl font-black text-gray-600">:</span>
          <span className="text-xs text-gray-600 uppercase tracking-widest">
            VS
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 flex-1">
          <TeamAvatar
            initials={homeTeam.initials}
            teamColor={homeTeam.teamColor}
            logoSrc={homeTeam.logoSrc}
            size="lg"
          />
          <span className="text-sm font-bold text-gray-200 text-center">
            {homeTeam.shortName}
          </span>
          <span className="text-4xl sm:text-5xl font-black tabular-nums text-white">
            {homeTeam.totalRuns ?? '-'}
          </span>
        </div>
      </div>
    </div>
  );
};
