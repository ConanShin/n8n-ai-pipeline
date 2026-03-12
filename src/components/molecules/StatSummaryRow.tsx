import React from 'react';

export interface StatSummaryRowProps {
  compact?: boolean;
}

export const StatSummaryRow: React.FC<StatSummaryRowProps> = ({ compact = false }) => {
  return (
    <div
      role="note"
      aria-label="스코어보드 범례: H 안타, E 에러, BB 볼넷, 노란색 셀은 현재 이닝"
      className="flex items-center gap-4 sm:gap-6 px-3 py-2"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>
        <span className="text-xs text-gray-400">H 안타</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
        <span className="text-xs text-gray-400">E 에러</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
        <span className="text-xs text-gray-400">BB 볼넷</span>
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <span className="w-3 h-3 rounded-sm bg-yellow-400 shrink-0"></span>
        <span className="text-xs text-gray-400">현재 이닝</span>
      </div>
    </div>
  );
};
