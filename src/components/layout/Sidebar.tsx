import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  onOpenSimulation: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  to: string;
  labelKey: string;
  icon: string;
  descKey: string;
  badgeKey?: string;
  badgeColor?: string;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

interface TooltipState {
  label: string;
  description: string;
  icon: string;
  category?: string;
  badge?: string;
  badgeColor?: string;
  top: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenSimulation,
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { t } = useLanguage();
  const [activeTooltip, setActiveTooltip] = useState<TooltipState | null>(null);

  const navSections: NavSection[] = [
    {
      titleKey: 'nav.operations',
      items: [
        {
          to: '/',
          labelKey: 'nav.dashboard',
          icon: 'dashboard',
          descKey: 'desc.dashboard',
        },
        {
          to: '/train-monitoring',
          labelKey: 'nav.train_monitoring',
          icon: 'train',
          descKey: 'desc.train_monitoring',
          badgeKey: 'badge.12_live',
          badgeColor: 'bg-primary/10 text-primary',
        },
        {
          to: '/live-network',
          labelKey: 'nav.live_network',
          icon: 'hub',
          descKey: 'desc.live_network',
          badgeKey: 'badge.live',
          badgeColor: 'bg-emerald-500/15 text-emerald-600',
        },
        {
          to: '/eta-forecast',
          labelKey: 'nav.eta_forecast',
          icon: 'precision_manufacturing',
          descKey: 'desc.eta_forecast',
          badgeKey: 'badge.ai',
          badgeColor: 'bg-indigo-500/15 text-indigo-600',
        },
        {
          to: '/route-predictions',
          labelKey: 'nav.route_predictions',
          icon: 'route',
          descKey: 'desc.route_predictions',
        },
      ],
    },
    {
      titleKey: 'nav.intelligence',
      items: [
        {
          to: '/alerts',
          labelKey: 'nav.alerts',
          icon: 'notifications_active',
          descKey: 'desc.alerts',
          badgeKey: 'badge.3_critical',
          badgeColor: 'bg-red-500 text-white',
        },
        {
          to: '/analytics',
          labelKey: 'nav.analytics',
          icon: 'analytics',
          descKey: 'desc.analytics',
        },
      ],
    },
    {
      titleKey: 'nav.system_admin',
      items: [
        {
          to: '/system-status',
          labelKey: 'nav.system_status',
          icon: 'dns',
          descKey: 'desc.system_status',
          badgeKey: 'badge.99_9',
          badgeColor: 'bg-emerald-500/10 text-emerald-600',
        },
        {
          to: '/settings',
          labelKey: 'nav.settings',
          icon: 'settings',
          descKey: 'desc.settings',
        },
        {
          to: '/profile',
          labelKey: 'nav.profile',
          icon: 'person',
          descKey: 'desc.profile',
        },
      ],
    },
  ];

  const handleLinkClick = () => {
    setActiveTooltip(null);
    if (isOpenMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    item: {
      label: string;
      description: string;
      icon: string;
      badge?: string;
      badgeColor?: string;
    },
    category?: string
  ) => {
    if (!isCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      label: item.label,
      description: item.description,
      icon: item.icon,
      badge: item.badge,
      badgeColor: item.badgeColor,
      category,
      top: rect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`h-screen fixed left-0 top-0 overflow-y-auto overflow-x-hidden bg-surface-container-lowest shadow-lg md:shadow-sm flex flex-col border-r border-outline-variant/30 z-50 transition-all duration-300 ease-in-out custom-scrollbar ${
          isOpenMobile ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-[72px]' : 'md:w-64'}`}
      >
        {/* Brand Header */}
        <div
          className={`h-16 flex items-center border-b border-outline-variant/20 px-3 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-between px-4'
          }`}
        >
          <div
            className="flex items-center gap-3 overflow-hidden cursor-pointer"
            onMouseEnter={(e) =>
              handleMouseEnter(
                e,
                {
                  label: t('nav.brand_title'),
                  icon: 'train',
                  description: t('desc.platform'),
                },
                t('nav.platform')
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            {/* Logo Train Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md flex-shrink-0 ring-2 ring-primary/20">
              <span className="material-symbols-outlined text-[22px]">train</span>
            </div>

            {/* Brand Titles (Hidden when collapsed on desktop) */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <h1 className="font-headline-sm text-[15px] font-extrabold text-primary leading-tight truncate tracking-tight">
                  {t('nav.brand_title')}
                </h1>
                <p className="font-label-md text-[10px] text-on-surface-variant font-medium tracking-wide uppercase truncate">
                  {t('nav.ops_intelligence')}
                </p>
              </div>
            )}
          </div>

          {/* 3-Line Hamburger / Collapse Button in Header (Visible when expanded) */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
              title={t('nav.collapse_sidebar')}
              aria-label="Collapse sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">menu_open</span>
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* New Simulation Interactive CTA */}
        <div className={`p-3 transition-all ${isCollapsed ? 'flex justify-center' : ''}`}>
          {isCollapsed ? (
            <button
              onClick={() => {
                handleLinkClick();
                onOpenSimulation();
              }}
              onMouseEnter={(e) =>
                handleMouseEnter(
                  e,
                  {
                    label: t('nav.new_simulation'),
                    icon: 'science',
                    description: t('desc.new_simulation'),
                    badge: t('badge.interactive'),
                    badgeColor: 'bg-secondary-container text-on-secondary-container',
                  },
                  t('nav.simulation_tool')
                )
              }
              onMouseLeave={handleMouseLeave}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-secondary to-primary text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              aria-label={t('nav.new_simulation')}
            >
              <span className="material-symbols-outlined text-[20px]">science</span>
            </button>
          ) : (
            <button
              onClick={() => {
                handleLinkClick();
                onOpenSimulation();
              }}
              className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-label-md text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">science</span>
              <span>{t('nav.new_simulation')}</span>
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-2 py-2 flex flex-col gap-4">
          {navSections.map((section, idx) => (
            <div key={section.titleKey} className="flex flex-col gap-0.5">
              {/* Category Header or Divider */}
              {!isCollapsed ? (
                <div className="px-3 pt-2 pb-1">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-wider">
                    {t(section.titleKey)}
                  </span>
                </div>
              ) : (
                idx > 0 && <div className="my-1 border-t border-outline-variant/20 mx-2" />
              )}

              {/* Navigation Items */}
              {section.items.map((item) => {
                const label = t(item.labelKey);
                const desc = t(item.descKey);
                const badge = item.badgeKey ? t(item.badgeKey) : undefined;
                const category = t(section.titleKey);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={handleLinkClick}
                    onMouseEnter={(e) =>
                      handleMouseEnter(
                        e,
                        {
                          label,
                          description: desc,
                          icon: item.icon,
                          badge,
                          badgeColor: item.badgeColor,
                        },
                        category
                      )
                    }
                    onMouseLeave={handleMouseLeave}
                    className={({ isActive }) =>
                      `group relative flex items-center rounded-xl transition-all duration-150 ${
                        isCollapsed
                          ? 'justify-center w-11 h-11 mx-auto my-0.5'
                          : 'gap-3 px-3 py-2.5 mx-1 font-label-md text-xs'
                      } ${
                        isActive
                          ? 'bg-primary/10 text-primary font-bold shadow-xs'
                          : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Left active glowing indicator bar */}
                        {isActive && (
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-primary rounded-r-full transition-all ${
                              isCollapsed ? 'w-1 h-6 left-0' : 'w-1 h-5 left-0'
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <span
                          className={`material-symbols-outlined transition-transform duration-150 ${
                            isCollapsed ? 'text-[22px]' : 'text-[20px]'
                          } ${
                            isActive
                              ? 'material-symbols-filled text-primary'
                              : 'group-hover:scale-110 group-hover:text-primary'
                          }`}
                        >
                          {item.icon}
                        </span>

                        {/* Label & Badge (Expanded Mode) */}
                        {!isCollapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0 overflow-hidden">
                            <span className="truncate">{label}</span>
                            {badge && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                                  item.badgeColor || 'bg-surface-container text-on-surface'
                                }`}
                              >
                                {badge}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer & Toggle Action */}
        <div className="p-3 border-t border-outline-variant/20 flex flex-col gap-2 bg-surface-container-low/40">
          {/* Operations Officer Badge (Expanded Only) */}
          {!isCollapsed && (
            <div className="px-2 py-1.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                RO
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-on-surface truncate leading-tight">
                  {t('topbar.chief_controller')}
                </p>
                <p className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t('badge.sector_online')}
                </p>
              </div>
            </div>
          )}

          {/* Desktop Toggle Button at bottom */}
          <button
            onClick={onToggleCollapse}
            onMouseEnter={(e) =>
              handleMouseEnter(
                e,
                {
                  label: isCollapsed ? t('nav.expand_sidebar') : t('nav.collapse_sidebar'),
                  icon: isCollapsed ? 'chevron_right' : 'chevron_left',
                  description: t('desc.toggle_sidebar'),
                  badge: t('badge.shortcut'),
                  badgeColor: 'bg-white/20 text-white',
                },
                t('nav.view_control')
              )
            }
            onMouseLeave={handleMouseLeave}
            className={`hidden md:flex items-center justify-center rounded-xl p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all ${
              isCollapsed ? 'w-11 h-10 mx-auto' : 'w-full gap-2 text-xs font-semibold'
            }`}
            aria-label={isCollapsed ? t('nav.expand_sidebar') : t('nav.collapse_sidebar')}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
            {!isCollapsed && (
              <span className="text-xs text-on-surface-variant flex items-center justify-between flex-1">
                <span>{t('nav.collapse_sidebar')}</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-surface-container rounded border border-outline-variant/30 font-mono">
                  [
                </kbd>
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Rich Floating Tooltip (Rendered outside aside scroll container to avoid clipping) */}
      {isCollapsed && activeTooltip && (
        <div
          style={{ top: `${activeTooltip.top}px` }}
          className="fixed left-[76px] -translate-y-1/2 hidden md:flex items-center z-[9999] pointer-events-none transition-all duration-150"
        >
          {/* Left Arrow Pointer */}
          <div className="w-2.5 h-2.5 bg-[#001733] border-l border-b border-secondary/40 rotate-45 -mr-1.5 z-10" />

          {/* Tooltip Card */}
          <div className="bg-[#001733] text-white border border-secondary/40 rounded-xl px-3.5 py-2.5 shadow-2xl backdrop-blur-md min-w-[210px] max-w-[270px]">
            {/* Header: Icon, Label, Badge */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                <span className="material-symbols-outlined text-[17px] text-secondary-container">
                  {activeTooltip.icon}
                </span>
                <span className="text-[13px] font-bold text-white">{activeTooltip.label}</span>
              </div>
              {activeTooltip.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                    activeTooltip.badgeColor || 'bg-white/20 text-white'
                  }`}
                >
                  {activeTooltip.badge}
                </span>
              )}
            </div>

            {/* Category tag */}
            {activeTooltip.category && (
              <div className="text-[9px] font-bold uppercase tracking-wider text-secondary-container/80 mb-1">
                {activeTooltip.category}
              </div>
            )}

            {/* Explanatory description of what the icon is actually for */}
            <p className="text-[11px] text-slate-300 leading-snug font-normal">
              {activeTooltip.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
