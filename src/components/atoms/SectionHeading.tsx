import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className="text-xl font-semibold text-gray-800" aria-label={title} aria-level={2}>
        {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
};
