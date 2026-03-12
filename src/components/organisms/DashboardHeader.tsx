import React, { useState } from 'react';

export interface DashboardHeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title = 'Baseball Stats', onSearch, onThemeToggle, isDark = true }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <header
      role="banner"
      aria-label="Dashboard header"
      className="flex items-center justify-between gap-4 px-4 py-3 bg-gray-900 border-b border-gray-700 rounded-xl shadow-md w-full col-span-1 lg:col-span-12"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
          <path d="M6 12h12" />
          <path d="M12 6v12" />
        </svg>
        <span className="text-lg font-bold text-white hidden sm:inline-block">{title}</span>
      </div>

      <div className="flex-1 max-w-md mx-2 sm:mx-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            placeholder="Search player..."
          />
        </form>
      </div>

      <button
        onClick={onThemeToggle}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </header>
  );
};