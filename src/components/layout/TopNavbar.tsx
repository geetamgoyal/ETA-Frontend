import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopNavbarProps {
  onToggleMobileMenu?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/train-monitoring?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/20 flex justify-between items-center px-4 md:px-margin transition-all">
      {/* Left: Mobile Menu Toggle & Live Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg"
          aria-label="Open Navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] rounded-full font-label-md text-[11px] font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          LIVE MONITORING
        </div>

        <span className="text-on-surface-variant font-label-md text-[11px] hidden lg:block">
          Last updated: 12 seconds ago
        </span>
      </div>

      {/* Right: Search + Quick Actions + User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search train (e.g., 12309, Rajdhani)..."
            className="pl-9 pr-4 py-1.5 bg-surface-container-low border-b border-outline-variant focus:border-b-2 focus:border-secondary rounded-t-md outline-none font-body-md text-sm w-48 lg:w-64 transition-all text-on-surface"
          />
        </form>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl p-3 z-50 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20 mb-2">
                <span className="font-label-md text-xs font-bold text-primary">Alert Notifications</span>
                <span className="text-[10px] text-error font-semibold bg-error-container/50 px-1.5 py-0.5 rounded">
                  3 Critical
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => {
                    navigate('/alerts');
                    setShowNotifications(false);
                  }}
                  className="p-2 rounded-lg bg-error-container/20 hover:bg-error-container/40 cursor-pointer transition-colors"
                >
                  <p className="font-bold text-error">Unusual stoppage: Tr. 12050</p>
                  <p className="text-on-surface-variant mt-0.5">Near Mathura/Jhansi (0 km/h)</p>
                </div>
                <div
                  onClick={() => {
                    navigate('/alerts');
                    setShowNotifications(false);
                  }}
                  className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <p className="font-semibold text-on-surface">Delay Recovery: Tr. 12309</p>
                  <p className="text-on-surface-variant mt-0.5">Recovered 4 min near Kanpur</p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate('/alerts');
                  setShowNotifications(false);
                }}
                className="w-full text-center text-[11px] font-semibold text-secondary hover:underline pt-2 mt-2 border-t border-outline-variant/20 block"
              >
                View All Alerts & Operational Risks →
              </button>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors hidden sm:block"
          title="Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 border-l border-outline-variant/30 cursor-pointer group"
          title="Operations Officer Profile"
        >
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-secondary transition-all">
            RO
          </div>
          <div className="text-left hidden xl:block">
            <p className="text-xs font-semibold text-on-surface leading-tight">Chief Controller</p>
            <p className="text-[10px] text-on-surface-variant">NCR Operations HQ</p>
          </div>
        </button>
      </div>
    </header>
  );
};
