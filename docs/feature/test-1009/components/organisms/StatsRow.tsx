import React from 'react';
import { StatCard } from '../molecules/StatCard';

export interface StatsRowProps {
  stats: {
    followers: number;
    posts: number;
    likes: number;
  };
}

export const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <StatCard label="Followers" value={stats.followers} />
      <StatCard label="Posts" value={stats.posts} />
      <StatCard label="Likes" value={stats.likes} />
    </div>
  );
};
