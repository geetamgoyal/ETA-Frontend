import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onOpenSimulation: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenSimulation,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const mainNavItems = [
    { to: '/', label: 'Dashboard', icon: 'dashboard' },
    { to: '/train-monitoring', label: 'Train Monitoring', icon: 'train' },
    { to: '/live-network', label: 'Live Network', icon: 'hub' },
    { to: '/eta-forecast', label: 'AI ETA Forecast', icon: 'precision_manufacturing' },
    { to: '/route-predictions', label: 'Route Predictions', icon: 'route' },
    { to: '/alerts', label: 'Alerts', icon: 'notifications_active' },
    { to: '/analytics', label: 'Analytics', icon: 'analytics' },
  ];

  const bottomNavItems = [
    { to: '/system-status', label: 'System Status', icon: 'dns' },
    { to: '/settings', label: 'Settings', icon: 'settings' },
    { to: '/profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-primary/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-surface-container-lowest shadow-sm flex flex-col py-lg border-r border-outline-variant/30 z-50 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-margin mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">train</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary leading-tight">
              RailForecast AI
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Operational Intelligence
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all ${
                  isActive
                    ? 'text-primary font-bold border-r-4 border-primary bg-surface-container scale-[0.98]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'material-symbols-filled text-primary' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* New Simulation CTA */}
        <div className="px-margin mt-4 mb-4">
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onOpenSimulation();
            }}
            className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md py-2.5 px-4 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            New Simulation
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t border-outline-variant/30 pt-4 flex flex-col gap-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'text-primary font-bold bg-surface-container border-r-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};
