
import React from 'react';

export interface ResultTitleProps {
  message: string;
}

export const ResultTitle: React.FC<ResultTitleProps> = ({ message }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-black text-yellow-400 tracking-tight" role="heading" aria-level={2}>
        {message}
      </h2>
    </div>
  );
};
