import React from 'react';

export interface ResultFeedbackProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  visible: boolean;
}

export const ResultFeedback: React.FC<ResultFeedbackProps> = ({ result, visible }) => {
  if (!visible || !result) return null;

  const config = {
    homerun: {
      text: "💥 홈런!",
      className: "text-5xl md:text-7xl font-extrabold text-yellow-400 animate-ping drop-shadow-2xl"
    },
    triple: {
      text: "🔥 3루타!",
      className: "text-4xl md:text-6xl font-bold text-orange-400 animate-bounce"
    },
    double: {
      text: "✅ 2루타!",
      className: "text-4xl md:text-6xl font-bold text-green-400 animate-bounce"
    },
    single: {
      text: "👍 1루타!",
      className: "text-3xl md:text-5xl font-bold text-blue-400 animate-pulse"
    },
    strike: {
      text: "❌ 스트라이크!",
      className: "text-3xl md:text-5xl font-bold text-red-400 animate-pulse" // Using pulse instead of shake as shake isn't a default tailwind animation
    }
  };

  const { text, className } = config[result];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50" role="alert" aria-live="assertive" aria-label="타격 결과">
      <div className={`${className} transition-all duration-150`}>
        {text}
      </div>
    </div>
  );
};
