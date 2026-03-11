import React from 'react';

export interface GreetingBadgeProps {
  /** 배지 텍스트. 기본값: 'Powered by Claude Sonnet via GitHub Copilot' */
  label?: string;
}

export const GreetingBadge: React.FC<GreetingBadgeProps> = ({
  label = 'Powered by Claude Sonnet via GitHub Copilot',
}) => {
  return (
    <div
      role="status"
      aria-label={label}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 transition-colors duration-300 hover:bg-blue-50 cursor-default"
    >
      {/* 온라인/활성 상태를 나타내는 녹색 점 */}
      <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
      {/* 배지 텍스트 */}
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default GreetingBadge;
