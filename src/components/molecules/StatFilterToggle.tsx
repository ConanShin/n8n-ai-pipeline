import React from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface StatFilterToggleProps {
  options: FilterOption[];
  activeOption: string;
  onChange: (value: string) => void;
}

export const StatFilterToggle: React.FC<StatFilterToggleProps> = ({ options, activeOption, onChange }) => {
  return (
    <div 
      className="flex flex-row gap-1 p-1 rounded-xl bg-slate-900 w-fit"
      role="group"
      aria-label="Filter chart by statistic"
    >
      {options.map(option => {
        const isActive = activeOption === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
