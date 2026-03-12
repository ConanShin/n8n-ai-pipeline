import React from 'react';

export interface DashboardTemplateProps {
  isLoading?: boolean;
  profileCard: React.ReactNode;
  performanceChart: React.ReactNode;
  statsTable: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  isLoading, profileCard, performanceChart, statsTable
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full" role="main" aria-label="Baseball player stats dashboard layout">
      <div className="col-span-1">
        {profileCard}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {performanceChart}
        {statsTable}
      </div>
    </div>
  );
};