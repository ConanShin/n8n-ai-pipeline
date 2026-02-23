import React from 'react';
import { ActivityItem, ActivityItemProps } from '../molecules/ActivityItem';

export interface ActivityFeedProps {
  activities: ActivityItemProps[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            action={activity.action} 
            timestamp={activity.timestamp} 
          />
        ))}
      </div>
    </div>
  );
};
