import React from 'react';

export interface CounterDisplayProps {
  count: number;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  return (
    <div
      role="status"
      aria-label="Current count value"
      className="flex justify-center items-center text-6xl font-bold text-gray-800 p-8 bg-white rounded-xl shadow-sm min-w-[200px]"
    >
      {count}
    </div>
  );
};
