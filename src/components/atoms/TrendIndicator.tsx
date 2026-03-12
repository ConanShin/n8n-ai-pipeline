import React from 'react';

export interface TrendIndicatorProps {
  direction: 'up' | 'down' | 'neutral';
  value?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ direction, value }) => {
  const variantClasses = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-gray-400',
  };

  const icon = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '−';

  return (
    <span
      role="img"
      aria-label={`Trend direction: ${direction}`}
      className={`inline-flex items-center gap-1 text-sm font-medium ${variantClasses[direction]}`}
    >
      <span>{icon}</span>
      {value && <span>{value}</span>}
    </span>
  );
};
