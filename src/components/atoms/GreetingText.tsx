import React from 'react';

export interface GreetingTextProps {
  /** 표시할 인사 문구. 기본값: 'Hello GitHub Copilot!' */
  text: string;
}

export const GreetingText: React.FC<GreetingTextProps> = ({ text }) => {
  return (
    <h1
      role="heading"
      aria-level={1}
      aria-label={text}
      className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center"
    >
      {text}
    </h1>
  );
};

export default GreetingText;
