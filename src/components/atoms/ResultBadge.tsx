
import React from 'react';

export interface ResultBadgeProps {
  grade: 'legend' | 'great' | 'good' | 'out';
  label: string;
  icon?: string;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ grade, label, icon }) => {
  const baseClasses = "flex flex-col items-center gap-2 px-10 py-5 rounded-3xl shadow-2xl font-black text-center";
  const variants = {
    legend: "bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900 ring-4 ring-yellow-200 text-4xl animate-bounce",
    great: "bg-gradient-to-br from-green-400 to-emerald-500 text-green-900 ring-4 ring-green-200 text-3xl",
    good: "bg-gradient-to-br from-blue-400 to-sky-500 text-blue-900 ring-4 ring-blue-200 text-3xl",
    out: "bg-gradient-to-br from-gray-500 to-gray-700 text-white ring-4 ring-gray-400 text-3xl"
  };

  return (
    <div role="status" aria-label={`최종 결과 등급: ${grade}`} className={`${baseClasses} ${variants[grade]}`}>
      {icon && <span className="text-5xl">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
