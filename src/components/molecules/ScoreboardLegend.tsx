import React from 'react';
import { StatSummaryRow } from './StatSummaryRow';

export interface ScoreboardLegendProps {
  lastUpdated?: string;
}

export const ScoreboardLegend: React.FC<ScoreboardLegendProps> = ({ lastUpdated }) => {
  return (
    <div
      role="complementary"
      aria-label="스코어보드 부가 정보"
      className="flex items-center justify-between flex-wrap gap-2 px-3 py-2 border-t border-gray-800 bg-gray-900/50"
    >
      <StatSummaryRow />
      {lastUpdated && (
        <span className="text-xs text-gray-600 ml-auto">{lastUpdated}</span>
      )}
    </div>
  );
};
