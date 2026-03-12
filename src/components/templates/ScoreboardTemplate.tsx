import React, { ReactNode } from 'react';

export interface ScoreboardTemplateProps {
  header: ReactNode;
  table: ReactNode;
  footer: ReactNode;
  isLoading?: boolean;
}

export const ScoreboardTemplate: React.FC<ScoreboardTemplateProps> = ({
  header,
  table,
  footer,
  isLoading = false,
}) => {
  return (
    <div
      role="region"
      aria-label="야구 경기 스코어보드"
      className="flex flex-col w-full max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
    >
      <div className="w-full flex-shrink-0">{header}</div>
      <div className="relative">
        <div className="w-full">{table}</div>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-20 animate-pulse">
            <span className="text-gray-400 text-sm">데이터 불러오는 중...</span>
          </div>
        )}
      </div>
      <div className="w-full flex-shrink-0">{footer}</div>
    </div>
  );
};
