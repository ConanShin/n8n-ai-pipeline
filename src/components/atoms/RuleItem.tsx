import React from 'react';

export interface RuleItemProps {
  icon: string;
  label: string;
  timing: string;
  color: string;
  points: number;
}

export const RuleItem: React.FC<RuleItemProps> = ({ icon, label, timing, color, points }) => {
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-base w-full" role="listitem" aria-label="규칙 항목">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className={`${color} font-bold`}>{label}</span>
      </div>
      <div className="flex items-center gap-4 text-gray-400 text-xs md:text-sm">
        <span>{timing}</span>
        <span className="font-semibold text-gray-200">{points}점</span>
      </div>
    </div>
  );
};
