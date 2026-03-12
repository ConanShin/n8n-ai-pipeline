import React from 'react';

export interface ResultTitleProps {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  message: string;
}

export const ResultTitle: React.FC<ResultTitleProps> = ({ grade, message }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center" role="heading" aria-level={2} aria-label="결과 등급 및 메시지">
      <div className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">{grade}</div>
      <div className="text-xl text-gray-200 font-semibold">{message}</div>
    </div>
  );
};
