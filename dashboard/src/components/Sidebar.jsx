import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@reava/ui';
import { useAuth } from '@reava/hooks';

const navItems = [
  { to: 'overview', label: 'Overview', icon: '📊' },
  { to: 'campaigns', label: 'Campaigns', icon: '🎯' },
  { to: 'analytics', label: 'Analytics', icon: '📈' },
  { to: 'settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden w-72 flex-shrink-0 border-r border-white/10 bg-surface/70 px-6 py-10 shadow-lg shadow-black/30 md:flex">
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary-200">Reava</p>
            <h1 className="mt-2 text-2xl font-semibold text-neutral-50">Control Center</h1>
          </div>
          <div className="h-12 w-12 rounded-full border border-primary-500/40 bg-gradient-to-br from-primary-500/60 to-secondary-500/60"></div>
        </div>

        <nav className="mt-12 flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-500/15 text-primary-100 shadow-card'
                    : 'text-neutral-300 hover:bg-white/5',
                ].join(' ')
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary-500/20 via-primary-500/10 to-transparent p-5">
          <p className="text-sm font-medium text-neutral-200">Logged in as</p>
          <p className="truncate text-lg font-semibold text-neutral-50">{user?.email ?? 'Guest'}</p>
          <Button
            as="a"
            href="mailto:support@reava.co"
            variant="outline"
            size="sm"
            className="mt-4 w-full justify-center border-white/20 text-neutral-100 hover:bg-white/10"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
