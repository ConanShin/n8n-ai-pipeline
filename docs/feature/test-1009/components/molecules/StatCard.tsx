import React from 'react';

export interface StatCardProps {
  label: string;
  value: number | string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span className="text-sm text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  );
};
