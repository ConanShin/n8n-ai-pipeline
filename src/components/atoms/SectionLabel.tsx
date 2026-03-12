import React from 'react';

export interface SectionLabelProps {
  text: string;
  variant?: 'default' | 'muted' | 'highlight';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  variant = 'default',
}) => {
  const baseClasses = 'inline-block text-xs tracking-wider select-none';

  let variantClasses = 'text-gray-400';
  if (variant === 'muted') {
    variantClasses = 'text-gray-600';
  } else if (variant === 'highlight') {
    variantClasses = 'text-yellow-400 font-semibold';
  }

  return (
    <span role="none" className={`${baseClasses} ${variantClasses}`}>
      {text}
    </span>
  );
};
