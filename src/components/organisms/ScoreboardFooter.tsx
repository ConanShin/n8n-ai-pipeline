import React from 'react';
import { ScoreboardLegend } from '../molecules';

export interface ScoreboardFooterProps {
  lastUpdated?: string;
  broadcastChannel?: string;
}

export const ScoreboardFooter: React.FC<ScoreboardFooterProps> = ({
  lastUpdated,
  broadcastChannel,
}) => {
  return (
    <div
      role="contentinfo"
      aria-label="스코어보드 하단 정보"
      className="flex flex-col gap-1 bg-gray-900 rounded-b-2xl overflow-hidden"
    >
      <ScoreboardLegend lastUpdated={lastUpdated} />
      {broadcastChannel && (
        <div className="flex items-center justify-between px-3 pb-3 gap-2">
          <span className="text-xs text-gray-600">
            📺 {broadcastChannel} 중계
          </span>
        </div>
      )}
    </div>
  );
};
