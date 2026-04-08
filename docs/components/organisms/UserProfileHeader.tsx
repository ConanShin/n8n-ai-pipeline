import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';

export interface UserProfileHeaderProps {
  username: string;
  handle: string;
  avatarUrl: string; // Added prop for Avatar src since it's required by Avatar
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ 
  username, 
  handle,
  avatarUrl 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl shadow-sm">
      <Avatar src={avatarUrl} alt={username} size="xl" />
      <div className="text-center md:text-left flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
        <p className="text-sm text-gray-500">{handle}</p>
      </div>
      <Button label="Settings" variant="outline" />
    </div>
  );
};
