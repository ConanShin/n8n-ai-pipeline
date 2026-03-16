
import React from 'react';
export type Grade = 'mvp' | 'good' | 'tryAgain';
export interface ResultGradeIconProps { grade: Grade; }
export const ResultGradeIcon: React.FC<ResultGradeIconProps> = ({ grade }) => {
  const styles = {
    mvp: "bg-yellow-400 text-5xl shadow-[0_0_20px_rgba(250,204,21,0.7)]",
    good: "bg-green-500 text-4xl",
    tryAgain: "bg-gray-600 text-4xl"
  };
  const emojis = { mvp: "🏆", good: "⭐", tryAgain: "🔄" };
  return (
    <div className={`flex items-center justify-center w-20 h-20 rounded-full ${styles[grade]}`} role="img" aria-label="게임 결과 등급 아이콘">
      {emojis[grade]}
    </div>
  );
};
