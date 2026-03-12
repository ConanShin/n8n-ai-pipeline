import React from 'react';

export interface EmptyStateProps {
  icon?: string;
  message: string;
  subMessage?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, message, subMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-gray-400" role="status" aria-label="No data available">
      {icon && <div className="text-4xl">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-600">{message}</h3>
      {subMessage && <p className="text-sm text-gray-400 max-w-sm">{subMessage}</p>}
    </div>
  );
};