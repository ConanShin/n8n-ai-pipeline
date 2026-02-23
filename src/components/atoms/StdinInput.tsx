import React from 'react';

export interface StdinInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const StdinInput: React.FC<StdinInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      role="textbox"
      aria-label="Standard input for pipeline test"
    />
  );
};
