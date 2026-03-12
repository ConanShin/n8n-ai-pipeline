import React from 'react';

export interface GameStatusBadgeProps {
  status: 'scheduled' | 'live' | 'final' | string;
  currentInning?: number;
  inningHalf?: 'top' | 'bottom' | string;
}

export const GameStatusBadge: React.FC<GameStatusBadgeProps> = ({
  status,
  currentInning,
  inningHalf,
}) => {
  const ariaLabel =
    status === 'final'
      ? '경기 종료'
      : status === 'live'
      ? `${currentInning}회 ${inningHalf === 'top' ? '초' : '말'} 진행 중`
      : '경기 전';

  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase select-none';

  let variantClasses = '';
  let label = '';
  let icon = '';

  if (status === 'scheduled') {
    variantClasses = 'bg-gray-700 text-gray-300 border border-gray-600';
    label = '경기 전';
    icon = '🕐';
  } else if (status === 'live') {
    variantClasses = 'bg-red-600 text-white shadow-red-500/50 shadow-md animate-pulse border border-red-400';
    label = `${inningHalf === 'top' ? '▲' : '▼'} ${currentInning}회`;
    icon = '🔴';
  } else if (status === 'final') {
    variantClasses = 'bg-yellow-400 text-gray-900 shadow-yellow-400/40 shadow-md border border-yellow-300';
    label = 'FINAL';
    icon = '✅';
  }

  return (
    <div role="status" aria-live="polite" aria-label={`경기 상태: ${ariaLabel}`} className={`${baseClasses} ${variantClasses}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};
