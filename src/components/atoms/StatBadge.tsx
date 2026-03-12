import React from 'react';

export interface StatBadgeProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'up' | 'down' | 'highlight';
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, trend, variant }) => {
  const getVariantClasses = () => {
    // If variant is explicitly provided, use it. Otherwise derive from trend.
    const activeVariant = variant || (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'default');
    
    switch (activeVariant) {
      case 'up': return 'bg-green-100 text-green-700';
      case 'down': return 'bg-red-100 text-red-700';
      case 'highlight': return 'bg-blue-600 text-white';
      case 'default':
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'neutral' ? '-' : '';

  return (
    <span 
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getVariantClasses()}`}
      role="status"
      aria-label={`Stat badge showing ${label}: ${value}`}
    >
      <span className="opacity-75">{label}</span>
      <span>{value}</span>
      {trendIcon && <span>{trendIcon}</span>}
    </span>
  );
};
