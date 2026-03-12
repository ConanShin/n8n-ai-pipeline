import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  level?: 2 | 3 | 4;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, level = 2 }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <div className="flex flex-col gap-0.5" role="heading" aria-label="Section heading">
      <Tag className="text-lg font-semibold text-gray-800">{title}</Tag>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};