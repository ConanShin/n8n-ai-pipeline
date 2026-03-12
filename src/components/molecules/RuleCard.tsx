import React from 'react';
import { RuleItem } from '../atoms/RuleItem';

export interface RuleCardProps {
  rules: Array<{ icon: string; label: string; timing: string; color: string; points: number }>;
  chances: number;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rules, chances }) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-xl" role="region" aria-label="게임 규칙 설명">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-200">점수 규칙</h2>
        <span className="text-sm font-semibold text-gray-400">총 {chances}번의 기회</span>
      </div>
      <div className="flex flex-col gap-3">
        {rules.map((rule, idx) => (
          <RuleItem key={idx} {...rule} />
        ))}
      </div>
    </div>
  );
};
