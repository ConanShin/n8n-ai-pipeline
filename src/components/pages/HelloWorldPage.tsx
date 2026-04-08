import React, { useEffect, useState } from 'react';
import { HelloWorldCard } from '../molecules/HelloWorldCard';

export const HelloWorldPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // 페이지 진입 시 HelloWorldCard 페이드인 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      role="main"
      aria-label="Hello GitHub Copilot page"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-12"
    >
      <div
        className={`transition-all duration-700 ease-out w-full ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <HelloWorldCard
          greetingText="Hello GitHub Copilot!"
          badgeLabel="Powered by Claude Sonnet via GitHub Copilot"
        />
      </div>
    </main>
  );
};

export default HelloWorldPage;
