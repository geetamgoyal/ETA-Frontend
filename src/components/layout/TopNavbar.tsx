import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAlerts } from '../../context/AlertContext';
import { useTrains } from '../../context/TrainContext';

interface TopNavbarProps {
  isCollapsed?: boolean;
  onToggleMenu?: () => void;
  onToggleMobileMenu?: () => void; // backwards compat if passed
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  isCollapsed = false,
  onToggleMenu,
  onToggleMobileMenu,
}) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { alerts, setSelectedAlertId } = useAlerts();
  const { trains } = useTrains();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const activeAlerts = alerts.filter((a) => a.status === 'Active');
  const criticalCount = activeAlerts.filter((a) => a.severity === 'CRITICAL').length;

  const handleToggle = () => {
    if (onToggleMenu) {
      onToggleMenu();
    } else if (onToggleMobileMenu) {
      onToggleMobileMenu();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;

    // Check if query matches a train number or ID
    const matchingTrain = trains.find(
      (t) => t.trainNumber.toLowerCase() === query.toLowerCase() || t.id.toLowerCase() === query.toLowerCase()
    );

    if (matchingTrain) {
      navigate(`/train/${matchingTrain.id}`);
    } else {
      navigate(`/train-monitoring?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/20 flex justify-between items-center px-3 md:px-margin transition-all duration-300 ease-in-out ${
        isCollapsed
          ? 'w-full md:w-[calc(100%-4.5rem)]'
          : 'w-full md:w-[calc(100%-16rem)]'
      }`}
    >
      {/* Left: 3-Line Hamburger Menu Toggle + Live Status */}
      <div className="flex items-center gap-3">
        {/* 3-Line Hamburger Button (Visible on all screen sizes) */}
        <button
          onClick={handleToggle}
          className="group flex items-center justify-center w-10 h-10 rounded-xl text-on-surface hover:text-primary hover:bg-surface-container active:scale-95 transition-all"
          title={isCollapsed ? t('nav.expand_sidebar') : t('nav.collapse_sidebar')}
          aria-label="Toggle Sidebar Menu"
        >
          <div className="flex flex-col justify-center items-center gap-1 w-5 h-5">
            <span
              className={`h-0.5 bg-current rounded-full transition-all duration-200 ${
                isCollapsed ? 'w-5' : 'w-4 group-hover:w-5'
              }`}
            />
            <span className="h-0.5 w-5 bg-current rounded-full transition-all duration-200" />
            <span
              className={`h-0.5 bg-current rounded-full transition-all duration-200 ${
                isCollapsed ? 'w-5' : 'w-3 group-hover:w-5'
              }`}
            />
          </div>
        </button>

        {/* Live Monitoring Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] rounded-full font-label-md text-[11px] font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span>{t('topbar.live_monitoring')}</span>
        </div>

        {/* Time Status */}
        <span className="text-on-surface-variant font-label-md text-[11px] hidden lg:block">
          {t('topbar.last_updated')}
        </span>
      </div>

      {/* Right: Language Button + Search + Quick Actions + User Profile */}
      <div className="flex items-center gap-2 md:gap-3.5">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('topbar.search_placeholder')}
            className="pl-9 pr-4 py-1.5 bg-surface-container-low border-b border-outline-variant focus:border-b-2 focus:border-secondary rounded-t-md outline-none font-body-md text-sm w-44 lg:w-60 transition-all text-on-surface"
          />
        </form>

        {/* 🌐 Hindi / English Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-secondary/30 bg-surface-container-low hover:bg-surface-container hover:border-secondary text-on-surface hover:text-primary transition-all shadow-xs text-xs font-semibold active:scale-95 group"
          title={language === 'en' ? 'Switch to Hindi (हिन्दी में बदलें)' : 'Switch to English (अंग्रेज़ी में बदलें)'}
          aria-label="Change Language to Hindi or English"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary group-hover:scale-110 transition-transform">
            translate
          </span>
          <div className="flex items-center gap-1 font-bold">
            <span
              className={`transition-colors ${
                language === 'en' ? 'text-primary font-black underline underline-offset-2' : 'text-on-surface-variant font-medium'
              }`}
            >
              EN
            </span>
            <span className="text-outline-variant/60 text-[10px] font-normal">/</span>
            <span
              className={`transition-colors ${
                language === 'hi' ? 'text-primary font-black underline underline-offset-2' : 'text-on-surface-variant font-medium'
              }`}
            >
              हिन्दी
            </span>
          </div>
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-colors relative cursor-pointer"
            title={t('topbar.alerts_title')}
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {activeAlerts.length > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
              </>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl p-3 z-50 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20 mb-2">
                <span className="font-label-md text-xs font-bold text-primary">{t('topbar.alerts_title')}</span>
                <span className="text-[10px] text-error font-semibold bg-error-container/50 px-1.5 py-0.5 rounded">
                  {criticalCount > 0 ? `${criticalCount} Critical` : `${activeAlerts.length} Active`}
                </span>
              </div>
              <div className="space-y-2 text-xs max-h-64 overflow-y-auto custom-scrollbar">
                {activeAlerts.length === 0 ? (
                  <p className="text-center py-4 text-on-surface-variant text-xs">
                    No active incident alerts. Network operating smoothly.
                  </p>
                ) : (
                  activeAlerts.slice(0, 4).map((alt) => (
                    <div
                      key={alt.id}
                      onClick={() => {
                        setSelectedAlertId(alt.id);
                        navigate('/alerts');
                        setShowNotifications(false);
                      }}
                      className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                        alt.severity === 'CRITICAL'
                          ? 'bg-error-container/20 hover:bg-error-container/40 border border-error/20'
                          : 'bg-surface-container-low hover:bg-surface-container border border-outline-variant/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${alt.severity === 'CRITICAL' ? 'text-error' : 'text-on-surface'}`}>
                          {alt.category} {alt.trainNumber ? `· #${alt.trainNumber}` : ''}
                        </span>
                        <span className="text-[10px] font-mono text-on-surface-variant">
                          {alt.timeAgo || alt.detectionTime}
                        </span>
                      </div>
                      <p className="text-on-surface-variant mt-0.5 text-[11px] line-clamp-2">
                        {alt.eventDescription}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => {
                  navigate('/alerts');
                  setShowNotifications(false);
                }}
                className="w-full mt-2.5 pt-2 border-t border-outline-variant/20 text-center font-label-md text-xs text-secondary hover:text-secondary-container font-semibold block transition-colors cursor-pointer"
              >
                {t('topbar.view_all_alerts')}
              </button>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-colors hidden sm:block"
          title={t('nav.settings')}
          aria-label="Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 border-l border-outline-variant/30 cursor-pointer group"
          title={t('topbar.chief_controller')}
        >
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-secondary transition-all">
            RO
          </div>
          <div className="text-left hidden xl:block">
            <p className="text-xs font-semibold text-on-surface leading-tight">{t('topbar.chief_controller')}</p>
            <p className="text-[10px] text-on-surface-variant">{t('topbar.ncr_hq')}</p>
          </div>
        </button>
      </div>
    </header>
  );
};
