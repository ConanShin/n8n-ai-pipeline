import React from 'react';

export interface StatusBadgeProps {
  status: 'idle' | 'running' | 'success' | 'failure';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: StatusBadgeProps['status']) => {
    switch (status) {
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
      role="status"
      aria-label="Current test status"
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
