import React from 'react';
import { UserProfileHeader } from '../organisms/UserProfileHeader';
import { StatsRow } from '../organisms/StatsRow';
import { ActivityFeed } from '../organisms/ActivityFeed';
import { ActivityItemProps } from '../molecules/ActivityItem';

export interface UserProfileDashboardProps {
  userData: {
    username: string;
    handle: string;
    avatarUrl: string;
    stats: {
      followers: number;
      posts: number;
      likes: number;
    };
    activities: ActivityItemProps[];
  };
}

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({ userData }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <UserProfileHeader 
        username={userData.username} 
        handle={userData.handle} 
        avatarUrl={userData.avatarUrl}
      />
      <StatsRow stats={userData.stats} />
      <ActivityFeed activities={userData.activities} />
    </div>
  );
};
