import React from 'react';

export interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, icon, href, isActive = false }) => {
  const baseClasses =
    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer';
  const stateClasses = isActive
    ? 'bg-indigo-600 text-white shadow-sm'
    : 'text-slate-400 hover:bg-slate-700 hover:text-white';

  return (
    <a
      href={href}
      role="link"
      aria-label="Navigation item"
      aria-current={isActive ? 'page' : undefined}
      className={`${baseClasses} ${stateClasses}`}
    >
      <span className="w-5 h-5 shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </a>
  );
};
