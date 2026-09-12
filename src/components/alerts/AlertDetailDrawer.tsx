import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IncidentAlert } from '../../types/alert';
import { useAlerts } from '../../context/AlertContext';
import { useTrains } from '../../context/TrainContext';

interface AlertDetailDrawerProps {
  alert: IncidentAlert | null;
  onClose: () => void;
}

export const AlertDetailDrawer: React.FC<AlertDetailDrawerProps> = ({ alert, onClose }) => {
  const navigate = useNavigate();
  const { acknowledgeAlert, resolveAlert } = useAlerts();
  const { setSelectedTrainId } = useTrains();

  if (!alert) return null;

  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';
  const isResolved = alert.status === 'Resolved';
  const isAck = alert.status === 'Acknowledged';

  const handleViewTrain = () => {
    if (alert.trainNumber) {
      setSelectedTrainId(alert.trainNumber);
      navigate(`/train/${alert.trainNumber}`);
    }
  };

  const handleViewRoute = () => {
    if (alert.trainNumber) {
      setSelectedTrainId(alert.trainNumber);
    }
    navigate('/live-network');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      {/* Click outside backdrop to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-Over Drawer Container */}
      <div className="w-full max-w-xl bg-surface-container-lowest border-l border-outline-variant/30 shadow-2xl h-full flex flex-col overflow-hidden animate-slide-in-right">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* Severity */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isCritical
                    ? 'bg-red-500/15 text-red-700 border border-red-500/30'
                    : isHigh
                    ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                    : 'bg-sky-500/15 text-sky-800 border border-sky-500/30'
                }`}
              >
                {alert.severity} PRIORITY
              </span>

              {/* Category */}
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-bold text-[10px] uppercase tracking-wider">
                {alert.category}
              </span>

              {/* Status */}
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isResolved
                    ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                    : isAck
                    ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                    : 'bg-red-500/15 text-red-800 border border-red-500/30'
                }`}
              >
                {alert.status}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-on-surface tracking-tight leading-snug">
              {alert.eventDescription}
            </h2>
            <span className="text-[11px] text-outline font-mono mt-0.5 block">
              Incident ID: #{alert.id} · Detected at {alert.detectionTime} ({alert.timeAgo})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer shrink-0"
            title="Close Drawer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* ── 1. AFFECTED TRAIN & LOCATION CARD ───────────────────── */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
              Affected Train &amp; Route Topology
            </span>

            {alert.trainNumber ? (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-primary text-white">
                      #{alert.trainNumber}
                    </span>
                    <span className="font-bold text-sm text-on-surface">
                      {alert.trainName}
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    Zone: <span className="font-semibold text-on-surface">{alert.zone || 'Northern Railway'}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Current Section: <span className="font-semibold text-on-surface">{alert.location}</span>
                  </div>
                </div>

                {alert.speedKmH !== undefined && (
                  <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/20 text-right">
                    <span className="text-[10px] text-outline uppercase block font-bold">Speed</span>
                    <span className="font-mono text-base font-black text-on-surface">
                      {alert.speedKmH} km/h
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="font-bold text-sm text-on-surface block">
                  Corridor Interlocking: {alert.location}
                </span>
                <span className="text-xs text-on-surface-variant block mt-0.5">
                  Route Corridor: {alert.routeSection}
                </span>
              </div>
            )}
          </div>

          {/* ── 2. DYNAMIC ETA IMPACT COMPARISON ─────────────────────── */}
          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/25 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <span>Dynamic Forecast Deviation</span>
              <span className="text-primary font-mono font-bold">AI Recalculated</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/20">
                <span className="text-[10px] uppercase font-bold text-outline block">
                  Scheduled ETA
                </span>
                <span className="text-xl font-black font-mono text-slate-700 block mt-0.5">
                  {alert.scheduledEta}
                </span>
                <span className="text-[10px] text-outline">Published baseline</span>
              </div>

              <div className="bg-primary/5 p-2.5 rounded-lg border border-primary/25">
                <span className="text-[10px] uppercase font-bold text-primary block flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  Predicted ETA
                </span>
                <span className="text-xl font-black font-mono text-primary block mt-0.5">
                  {alert.predictedEta}
                </span>
                <span className="text-[10px] text-primary/80 font-bold">Revised arrival</span>
              </div>
            </div>

            {/* Delay Impact Pill */}
            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-medium">Net ETA Impact</span>
              <span
                className={`font-mono font-bold text-sm ${
                  alert.currentDelay > 20
                    ? 'text-red-700'
                    : alert.currentDelay > 0
                    ? 'text-amber-800'
                    : 'text-emerald-700'
                }`}
              >
                {alert.etaImpact}
              </span>
            </div>
          </div>

          {/* ── 3. OPERATIONAL GUIDANCE & INVESTIGATION ───────────────── */}
          <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Decision Support &amp; Investigation Advice</span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              {alert.aiRecommendation}
            </p>
          </div>

          {/* ── 4. CHRONOLOGICAL INCIDENT TIMELINE ────────────────────── */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                Chronological Event Sequence
              </span>
              <span className="text-[10px] font-mono text-outline">Incident Progression</span>
            </div>

            <div className="relative pl-5 space-y-3 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
              {alert.timeline.map((item, i) => (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-surface-container-lowest ${
                      item.type === 'critical'
                        ? 'bg-red-600 ring-2 ring-red-600/30'
                        : item.type === 'slowdown' || item.type === 'signal'
                        ? 'bg-amber-500'
                        : item.type === 'recalculation'
                        ? 'bg-primary'
                        : item.type === 'recovery'
                        ? 'bg-emerald-500'
                        : 'bg-outline'
                    }`}
                  />
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] font-bold text-primary shrink-0">
                      {item.time}
                    </span>
                    <span className="text-xs text-on-surface leading-snug">
                      {item.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. LIFECYCLE AUDIT TRAIL ──────────────────────────────── */}
          {(alert.acknowledgedAt || alert.resolvedAt) && (
            <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/15 text-[11px] space-y-1 font-mono text-on-surface-variant">
              {alert.acknowledgedAt && (
                <div>
                  ✓ Acknowledged at <span className="font-bold text-on-surface">{alert.acknowledgedAt}</span> by {alert.acknowledgedBy}
                </div>
              )}
              {alert.resolvedAt && (
                <div>
                  ✓ Resolved at <span className="font-bold text-emerald-700">{alert.resolvedAt}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer: Actions & Navigation */}
        <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest flex flex-col gap-2.5">
          {/* Top Actions: Acknowledge / Resolve */}
          {!isResolved && (
            <div className="grid grid-cols-2 gap-2">
              {!isAck ? (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="py-2 px-3 rounded-lg bg-amber-500/15 text-amber-800 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">done</span>
                  <span>Acknowledge Alert</span>
                </button>
              ) : (
                <div className="py-2 px-3 rounded-lg bg-amber-500/10 text-amber-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-amber-500/20">
                  <span className="material-symbols-outlined text-[15px]">done_all</span>
                  <span>Acknowledged</span>
                </div>
              )}

              <button
                onClick={() => resolveAlert(alert.id)}
                className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Mark Resolved</span>
              </button>
            </div>
          )}

          {/* Bottom Actions: View Train & View Route */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleViewTrain}
              disabled={!alert.trainNumber}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                alert.trainNumber
                  ? 'bg-primary text-white hover:bg-primary-hover cursor-pointer shadow-xs'
                  : 'bg-surface-container text-outline cursor-not-allowed'
              }`}
            >
              <span>View Train Details</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>

            <button
              onClick={handleViewRoute}
              className="py-2 px-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface hover:bg-surface-container text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">hub</span>
              <span>View Route on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
