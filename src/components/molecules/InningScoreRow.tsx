import React from 'react';
import { TeamInfoRow } from './TeamInfoRow';
import { InningCell, TotalScoreCell, StatCell } from '../atoms';

export interface InningScoreRowProps {
  teamName: string;
  teamShortName: string;
  initials: string;
  teamColor?: string;
  logoSrc?: string;
  scores: (number | null)[];
  totalRuns: number;
  hits: number;
  errors: number;
  walks: number;
  currentInning: number;
  isWinning?: boolean;
  totalInnings?: number;
}

export const InningScoreRow: React.FC<InningScoreRowProps> = ({
  teamName,
  teamShortName,
  initials,
  teamColor,
  logoSrc,
  scores,
  totalRuns,
  hits,
  errors,
  walks,
  currentInning,
  isWinning = false,
  totalInnings = 9,
}) => {
  const displayScores = [...scores];
  while (displayScores.length < totalInnings) {
    displayScores.push(null);
  }

  return (
    <div
      role="row"
      aria-label={`${teamName} 점수 행`}
      className="flex items-center border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-150"
    >
      <TeamInfoRow
        teamName={teamName}
        teamShortName={teamShortName}
        initials={initials}
        teamColor={teamColor}
        logoSrc={logoSrc}
      />
      <div className="flex items-center">
        {displayScores.slice(0, totalInnings).map((score, index) => (
          <InningCell
            key={index}
            score={score}
            isCurrent={index + 1 === currentInning}
          />
        ))}
      </div>
      <div className="flex items-center">
        <TotalScoreCell score={totalRuns} isWinning={isWinning} />
        <StatCell value={hits} statType="H" />
        <StatCell value={errors} statType="E" />
        <StatCell value={walks} statType="BB" />
      </div>
    </div>
  );
};
