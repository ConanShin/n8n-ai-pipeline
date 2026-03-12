import React from 'react';

export interface SectionHeadingProps {
  title: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <h2
      role="heading"
      aria-level={2}
      className="flex items-center gap-3 text-lg font-bold text-white border-l-4 border-indigo-500 pl-3 mb-4"
    >
      {title}
    </h2>
  );
};