import React from 'react';
import { TableDataCell } from '../atoms';

export interface GameStat {
  date: string;
  opponent: string;
  result: 'W' | 'L';
  atBats: number;
  hits: number;
  hr: number;
  rbi: number;
  avg: string;
}

export interface StatsTableRowProps {
  game: GameStat;
}

export const StatsTableRow: React.FC<StatsTableRowProps> = ({ game }) => {
  return (
    <tr
      role="row"
      aria-label={`Game stats row: ${game.date} vs ${game.opponent}`}
      className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-150 cursor-default"
    >
      <TableDataCell value={game.date} />
      <TableDataCell value={game.opponent} />
      <TableDataCell value={game.result} emphasis={game.result === 'W'} />
      <TableDataCell value={game.atBats} />
      <TableDataCell value={game.hits} emphasis={game.hits > 0} />
      <TableDataCell value={game.hr} emphasis={game.hr > 0} />
      <TableDataCell value={game.rbi} emphasis={game.rbi > 0} />
      <TableDataCell value={game.avg} emphasis />
    </tr>
  );
};