import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1 mb-4" role="heading" aria-label={title}>
      <h2 className="text-xl font-bold text-white relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 w-12 h-1 bg-cyan-400 rounded-full"></span>
      </h2>
      {subtitle && <p className="text-sm text-slate-400 mt-2">{subtitle}</p>}
    </div>
  );
};
