import React from 'react';

export interface StatsTableRowProps {
  season: string;
  games: number;
  atBats: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  rbi: number;
  avg: string;
  obp: string;
  slg: string;
  ops: string;
  isHighlighted?: boolean;
}

export const StatsTableRow: React.FC<StatsTableRowProps> = (props) => {
  const { season, games, atBats, hits, doubles, triples, homeRuns, rbi, avg, obp, slg, ops, isHighlighted } = props;
  
  return (
    <tr 
      className={`border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${isHighlighted ? 'bg-slate-800/80 font-medium' : ''}`}
      role="row"
      aria-label={`Stats for ${season}`}
    >
      <th scope="row" className="px-4 py-3 text-left font-normal text-white">{season}</th>
      <td className="px-4 py-3 text-right text-slate-300">{games}</td>
      <td className="px-4 py-3 text-right text-slate-300">{atBats}</td>
      <td className="px-4 py-3 text-right text-slate-300">{hits}</td>
      <td className="px-4 py-3 text-right text-slate-300">{doubles}</td>
      <td className="px-4 py-3 text-right text-slate-300">{triples}</td>
      <td className="px-4 py-3 text-right text-slate-300">{homeRuns}</td>
      <td className="px-4 py-3 text-right text-slate-300">{rbi}</td>
      <td className="px-4 py-3 text-right font-semibold text-white">{avg}</td>
      <td className="px-4 py-3 text-right text-slate-300">{obp}</td>
      <td className="px-4 py-3 text-right text-slate-300">{slg}</td>
      <td className="px-4 py-3 text-right font-semibold text-cyan-400">{ops}</td>
    </tr>
  );
};
