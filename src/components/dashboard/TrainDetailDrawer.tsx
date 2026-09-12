import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface TrainDetailDrawerProps {
  train: Train | null;
  onClose: () => void;
}

function getDelayColor(delay: number): string {
  if (delay <= 2) return '#16a34a';
  if (delay <= 15) return '#d97706';
  return '#dc2626';
}

function getDelayLabel(delay: number): string {
  if (delay <= 0) return 'On Time';
  return `+${delay} min`;
}

function getStatusStyle(status: string): { bg: string; text: string; border: string } {
  switch (status) {
    case 'On Time': case 'Good':
      return { bg: 'bg-status-ok-bg', text: 'text-status-ok-text', border: 'border-status-ok-border' };
    case 'Minor Delay': case 'Warning': case 'Delayed':
      return { bg: 'bg-status-warn-bg', text: 'text-status-warn-text', border: 'border-status-warn-border' };
    case 'Critical Delay': case 'Critical':
      return { bg: 'bg-status-critical-bg', text: 'text-status-critical-text', border: 'border-status-critical-border' };
    case 'Recovering':
      return { bg: 'bg-status-recovery-bg', text: 'text-status-recovery-text', border: 'border-status-recovery-border' };
    default:
      return { bg: 'bg-surface-container', text: 'text-on-surface-variant', border: 'border-outline-variant' };
  }
}

export const TrainDetailDrawer: React.FC<TrainDetailDrawerProps> = ({ train, onClose }) => {
  const navigate = useNavigate();

  // ESC key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const isOpen = !!train;

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-primary/30 backdrop-blur-sm z-40 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={clsx(
          'fixed right-0 top-0 h-full w-[380px] max-w-[92vw] z-50',
          'bg-surface-container-lowest border-l border-outline-variant/40 shadow-xl',
          'flex flex-col transition-transform duration-250 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={train ? `Train details: ${train.trainName}` : 'Train details'}
      >
        {!train ? null : (
          <>
            {/* Drawer header */}
            <div className="flex items-start justify-between p-4 border-b border-outline-variant/40">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-secondary text-[20px]">train</span>
                  <span className="data-value text-[13px] font-black text-primary">{train.trainNumber}</span>
                  <span
                    className={clsx(
                      'text-[10px] font-bold px-2 py-0.5 rounded border',
                      getStatusStyle(train.status).bg,
                      getStatusStyle(train.status).text,
                      getStatusStyle(train.status).border,
                    )}
                  >
                    {train.status}
                  </span>
                </div>
                <p className="text-[14px] font-bold text-on-surface">{train.trainName}</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  {train.source.split('(')[0].trim()} → {train.destination.split('(')[0].trim()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors flex-shrink-0"
                aria-label="Close drawer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* ETA Hero */}
              <div className="p-4 border-b border-outline-variant/20">
                <p className="ops-label mb-2">ETA Comparison</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[10px] text-on-surface-variant mb-0.5">Scheduled</p>
                    <p className="data-value text-[1.25rem] font-bold text-on-surface line-through decoration-status-critical/60">
                      {train.previousEta}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[20px]">arrow_forward</span>
                  <div>
                    <p className="text-[10px] text-on-surface-variant mb-0.5">AI Predicted</p>
                    <p
                      className="data-value text-[1.5rem] font-black"
                      style={{ color: getDelayColor(train.currentDelayMinutes) }}
                    >
                      {train.aiPredictedEta}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] text-on-surface-variant mb-0.5">Delay</p>
                    <p
                      className="data-value text-[1.125rem] font-bold"
                      style={{ color: getDelayColor(train.currentDelayMinutes) }}
                    >
                      {getDelayLabel(train.currentDelayMinutes)}
                    </p>
                  </div>
                </div>
                {/* ETA range */}
                <div className="mt-2 px-3 py-2 bg-surface-container rounded-lg flex items-center justify-between">
                  <span className="text-[10px] text-on-surface-variant">ETA Range</span>
                  <span className="data-value text-[11px] font-bold text-on-surface">
                    {train.expectedEtaRange.min} – {train.expectedEtaRange.max}
                  </span>
                </div>
              </div>

              {/* Operational metrics */}
              <div className="p-4 border-b border-outline-variant/20">
                <p className="ops-label mb-3">Live Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Current Location', value: train.currentLocation, icon: 'location_on' },
                    { label: 'Next Station', value: train.nextStation, icon: 'pin_drop' },
                    { label: 'Current Speed', value: `${train.currentSpeedKmH} km/h`, icon: 'speed' },
                    { label: 'Max Speed', value: `${train.maxSpeedKmH} km/h`, icon: 'fast_forward' },
                    { label: 'Zone', value: train.zone.split('(')[0].trim(), icon: 'map' },
                    { label: 'AI Confidence', value: `${train.confidencePercent}%`, icon: 'psychology' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[15px] text-secondary mt-0.5 flex-shrink-0">{m.icon}</span>
                      <div>
                        <p className="text-[9px] text-on-surface-variant uppercase tracking-wide font-bold">{m.label}</p>
                        <p className="text-[11px] font-semibold text-on-surface leading-tight">{m.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey progress */}
              <div className="p-4 border-b border-outline-variant/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="ops-label">Journey Progress</p>
                  <span className="data-value text-[11px] font-bold text-on-surface">
                    {train.journeyProgressPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${train.journeyProgressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant">
                  <span>{train.source.split('(')[0].trim()}</span>
                  <span className="font-mono">
                    {train.remainingDistanceKm.toFixed(0)} km remaining
                  </span>
                  <span>{train.destination.split('(')[0].trim()}</span>
                </div>
              </div>

              {/* Recent events */}
              {train.recentEvents && train.recentEvents.length > 0 && (
                <div className="p-4 border-b border-outline-variant/20">
                  <p className="ops-label mb-3">Recent Events</p>
                  <div className="flex flex-col gap-2">
                    {train.recentEvents.slice(0, 4).map((ev) => {
                      const evIconMap: Record<string, string> = {
                        departure: 'directions_transit',
                        recovery:  'trending_up',
                        slowdown:  'warning',
                        halt:      'pause',
                        update:    'update',
                      };
                      return (
                        <div key={ev.id} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant flex-shrink-0 mt-0.5">
                            {evIconMap[ev.type] ?? 'info'}
                          </span>
                          <div>
                            <p className="text-[11px] text-on-surface leading-tight">{ev.description}</p>
                            <p className="text-[9px] text-on-surface-variant font-mono mt-0.5">{ev.timestamp}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AI Factor summary */}
              {train.factors && (
                <div className="p-4">
                  <p className="ops-label mb-3">AI Delay Decomposition</p>
                  {[
                    { label: 'Initial delay', value: train.factors.initialDelayMinutes, sign: '+' },
                    { label: 'Speed recovery', value: train.factors.speedRecoveryMinutes, sign: '' },
                    { label: 'Route congestion', value: train.factors.routeCongestionMinutes, sign: '+' },
                    { label: 'Historical patterns', value: train.factors.historicalPatternsMinutes, sign: '' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center justify-between py-1.5 border-b border-outline-variant/10 last:border-0">
                      <span className="text-[11px] text-on-surface-variant">{f.label}</span>
                      <span
                        className={clsx(
                          'data-value text-[11px] font-bold',
                          f.value > 0 ? 'text-status-critical-text' : f.value < 0 ? 'text-status-ok-text' : 'text-on-surface-variant',
                        )}
                      >
                        {f.value > 0 ? `+${f.value}m` : `${f.value}m`}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 mt-1 bg-surface-container rounded-lg px-3">
                    <span className="text-[11px] font-bold text-on-surface">AI Forecast Delay</span>
                    <span
                      className="data-value text-[13px] font-black"
                      style={{ color: getDelayColor(train.factors.finalForecastDelayMinutes) }}
                    >
                      {train.factors.finalForecastDelayMinutes > 0
                        ? `+${train.factors.finalForecastDelayMinutes}m`
                        : `${train.factors.finalForecastDelayMinutes}m`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions footer */}
            <div className="p-4 border-t border-outline-variant/40 flex flex-col gap-2">
              <button
                onClick={() => navigate(`/train-monitoring/${train.id}`)}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-[12px] py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
                Open Train Details &amp; Dynamic ETA ↗
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/eta-forecast/${train.id}`)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container font-semibold text-[11px] py-2 rounded-lg transition-colors"
                >
                  AI ETA Forecast
                </button>
                <button
                  onClick={() => navigate(`/route-predictions/${train.id}`)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container font-semibold text-[11px] py-2 rounded-lg transition-colors"
                >
                  Route Forecast
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
