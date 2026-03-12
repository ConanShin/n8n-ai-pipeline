import React from 'react';
import { InningHeaderRow, InningScoreRow } from '../molecules';

export interface ScoreboardTeamData {
  name: string;
  shortName: string;
  initials: string;
  teamColor?: string;
  logoSrc?: string;
  scores: (number | null)[];
  totalRuns: number;
  hits: number;
  errors: number;
  walks: number;
}

export interface ScoreboardTableProps {
  homeTeam: ScoreboardTeamData;
  awayTeam: ScoreboardTeamData;
  currentInning: number;
  gameStatus: 'scheduled' | 'live' | 'final' | string;
  totalInnings?: number;
}

export const ScoreboardTable: React.FC<ScoreboardTableProps> = ({
  homeTeam,
  awayTeam,
  currentInning,
  gameStatus,
  totalInnings = 9,
}) => {
  return (
    <div
      role="region"
      aria-label="이닝별 스코어보드 테이블"
      className="block w-full overflow-x-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700"
    >
      <table
        role="table"
        aria-label="이닝별 점수 테이블"
        className="min-w-max w-full border-collapse"
      >
        <thead>
          <tr>
            <td>
              <InningHeaderRow
                totalInnings={totalInnings}
                currentInning={currentInning}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <InningScoreRow
                teamName={awayTeam.name}
                teamShortName={awayTeam.shortName}
                initials={awayTeam.initials}
                teamColor={awayTeam.teamColor}
                logoSrc={awayTeam.logoSrc}
                scores={awayTeam.scores}
                totalRuns={awayTeam.totalRuns}
                hits={awayTeam.hits}
                errors={awayTeam.errors}
                walks={awayTeam.walks}
                currentInning={currentInning}
                isWinning={awayTeam.totalRuns > homeTeam.totalRuns}
                totalInnings={totalInnings}
              />
            </td>
          </tr>
          <tr>
            <td>
              <InningScoreRow
                teamName={homeTeam.name}
                teamShortName={homeTeam.shortName}
                initials={homeTeam.initials}
                teamColor={homeTeam.teamColor}
                logoSrc={homeTeam.logoSrc}
                scores={homeTeam.scores}
                totalRuns={homeTeam.totalRuns}
                hits={homeTeam.hits}
                errors={homeTeam.errors}
                walks={homeTeam.walks}
                currentInning={currentInning}
                isWinning={homeTeam.totalRuns > awayTeam.totalRuns}
                totalInnings={totalInnings}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
