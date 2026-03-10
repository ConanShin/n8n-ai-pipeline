import React from 'react';

export interface ActivityItemProps {
  action: string;
  timestamp: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ action, timestamp }) => {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="text-sm text-gray-900">{action}</p>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};
