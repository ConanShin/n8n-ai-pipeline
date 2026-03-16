
import React from 'react';
export type HitResult = '홈런' | '3루타' | '2루타' | '1루타' | '스트라이크' | 'none';
export interface HitHistoryItemProps { inning: number; result: HitResult; }
export const HitHistoryItem: React.FC<HitHistoryItemProps> = ({ inning, result }) => {
  const resultStyles: Record<string, string> = {
    "홈런": "bg-yellow-400 text-yellow-900",
    "3루타": "bg-orange-400 text-orange-900",
    "2루타": "bg-green-400 text-green-900",
    "1루타": "bg-blue-400 text-blue-900",
    "스트라이크": "bg-red-700 text-red-100",
    "none": "bg-gray-700 text-gray-400"
  };
  const ordinals = ["1st", "2nd", "3rd"];
  return (
    <div className="flex flex-col items-center gap-1" role="listitem" aria-label="타석 결과">
      <span className="text-xs text-gray-500">{ordinals[inning - 1]}</span>
      <span className={`px-2 py-1 rounded-lg text-sm font-bold ${resultStyles[result] || resultStyles.none}`}>
        {result === 'none' ? '-' : result}
      </span>
    </div>
  );
};
