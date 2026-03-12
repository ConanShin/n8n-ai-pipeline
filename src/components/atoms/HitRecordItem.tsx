import React from 'react';

export interface HitRecordItemProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike';
  index: number;
}

export const HitRecordItem: React.FC<HitRecordItemProps> = ({ result, index }) => {
  const colorMap = {
    homerun: "text-yellow-400",
    triple:  "text-orange-400",
    double:  "text-green-400",
    single:  "text-blue-400",
    strike:  "text-red-400"
  };
  
  const iconMap = {
    homerun: "💥",
    triple:  "🔥",
    double:  "✅",
    single:  "👍",
    strike:  "❌"
  };
  
  const labelMap = {
    homerun: "HR",
    triple:  "3B",
    double:  "2B",
    single:  "1B",
    strike:  "ST"
  };

  return (
    <div className="flex flex-col items-center gap-1" role="listitem" aria-label="타격 결과 항목">
      <span className="text-gray-500 text-xs">{index}구</span>
      <span className="text-3xl">{iconMap[result]}</span>
      <span className={`text-xs font-bold ${colorMap[result]}`}>{labelMap[result]}</span>
    </div>
  );
};
