import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrains } from '../../context/TrainContext';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface AlertItem {
  id: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  category: 'Critical Delay' | 'Congestion' | 'Unusual Stoppage' | 'ETA Deviation' | 'Signal Restriction' | 'Recovery';
  description: string;
  severity: 'critical' | 'warn' | 'ok' | 'info';
  time: string;
  impact: string;
}

function buildAlerts(trains: Train[]): AlertItem[] {
  const alerts: AlertItem[] = [];

  trains.forEach((t) => {
    const delayMins = t.currentDelayMinutes;
    // Critical delay
    if (delayMins > 25) {
      alerts.push({
        id: `${t.id}-critical`,
        trainId: t.id,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        category: 'Critical Delay',
        description: `${t.trainName} is ${delayMins} min behind schedule. Unusual stoppage detected.`,
        severity: 'critical',
        time: 'Now',
        impact: `AI ETA revised to ${t.aiPredictedEta}. ${t.expectedEtaRange.min}–${t.expectedEtaRange.max} range.`,
      });
    } else if (delayMins > 10) {
      alerts.push({
        id: `${t.id}-delay`,
        trainId: t.id,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        category: 'ETA Deviation',
        description: `${t.trainName} running ${delayMins} min late. Recovery trajectory uncertain.`,
        severity: 'warn',
        time: '2m ago',
        impact: `Predicted ETA: ${t.aiPredictedEta} (${delayMins}m over schedule).`,
      });
    } else if (t.status === 'Recovering' && delayMins > 3) {
      alerts.push({
        id: `${t.id}-recovering`,
        trainId: t.id,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        category: 'Recovery',
        description: `${t.trainName} recovering — making up time on current block section.`,
        severity: 'ok',
        time: '5m ago',
        impact: `Estimated recovery: ${Math.round(delayMins * 0.3)} min by next major stop.`,
      });
    }
    // Speed-zero stoppage
    if (t.currentSpeedKmH === 0 && t.status !== 'On Time') {
      alerts.push({
        id: `${t.id}-stopped`,
        trainId: t.id,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        category: 'Unusual Stoppage',
        description: `${t.trainName} at standstill near ${t.currentLocation}. Awaiting track clearance.`,
        severity: 'critical',
        time: 'Active',
        impact: 'Signal interlocking or preceding train conflict likely cause.',
      });
    }
    // Low confidence
    if (t.confidencePercent < 82) {
      alerts.push({
        id: `${t.id}-lowconf`,
        trainId: t.id,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        category: 'Congestion',
        description: `AI confidence low (${t.confidencePercent}%) for ${t.trainName} — route congestion affecting forecast.`,
        severity: 'warn',
        time: '8m ago',
        impact: 'Wider ETA range: ±10 min. Manual dispatcher review recommended.',
      });
    }
  });

  // Sort: critical first
  const order = { critical: 0, warn: 1, ok: 3, info: 4 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 8);
}

const SEV_STYLE = {
  critical: {
    strip: 'bg-status-critical',
    badge: 'bg-status-critical-bg text-status-critical-text border-status-critical-border',
    icon:  'text-status-critical',
    iconName: 'warning',
  },
  warn: {
    strip: 'bg-status-warn',
    badge: 'bg-status-warn-bg text-status-warn-text border-status-warn-border',
    icon:  'text-status-warn',
    iconName: 'schedule',
  },
  ok: {
    strip: 'bg-status-ok',
    badge: 'bg-status-ok-bg text-status-ok-text border-status-ok-border',
    icon:  'text-status-ok',
    iconName: 'trending_up',
  },
  info: {
    strip: 'bg-status-info',
    badge: 'bg-status-info-bg text-status-info-text border-status-info-border',
    icon:  'text-status-info',
    iconName: 'info',
  },
};

interface LiveAlertsPanelProps {
  onSelectTrain?: (id: string) => void;
}

export const LiveAlertsPanel: React.FC<LiveAlertsPanelProps> = ({ onSelectTrain }) => {
  const { trains } = useTrains();
  const navigate = useNavigate();

  const alerts = useMemo(() => buildAlerts(trains), [trains]);
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-status-critical">notifications_active</span>
          <h3 className="text-[13px] font-bold text-on-surface">Live Alerts</h3>
          {criticalCount > 0 && (
            <span className="text-[9px] font-bold text-white bg-status-critical px-1.5 py-0.5 rounded animate-pulse-subtle">
              {criticalCount} CRITICAL
            </span>
          )}
        </div>
        <button
          onClick={() => navigate('/alerts')}
          className="text-[10px] font-bold text-secondary hover:underline"
        >
          All alerts →
        </button>
      </div>

      {/* Alert list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-outline-variant/20">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="material-symbols-outlined text-[32px] text-status-ok mb-2">check_circle</span>
            <p className="text-[12px] font-semibold text-on-surface-variant">All trains operating normally</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const sev = SEV_STYLE[alert.severity];
            return (
              <div
                key={alert.id}
                className="flex items-stretch gap-0 hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => onSelectTrain?.(alert.trainId)}
              >
                {/* Left strip */}
                <div className={clsx('w-1 flex-shrink-0', sev.strip)} />
                {/* Content */}
                <div className="flex-1 px-3 py-2.5 min-w-0">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={clsx(
                          'text-[9px] font-bold px-1.5 py-0.5 rounded border',
                          sev.badge,
                        )}
                      >
                        {alert.category.toUpperCase()}
                      </span>
                      <span className="data-value text-[10px] font-bold text-primary">
                        {alert.trainNumber}
                      </span>
                    </div>
                    <span className="text-[9px] text-on-surface-variant flex-shrink-0 font-mono">
                      {alert.time}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-[11px] text-on-surface leading-tight mb-1">
                    {alert.description}
                  </p>
                  {/* Impact */}
                  <p className="text-[10px] text-on-surface-variant leading-tight">
                    {alert.impact}
                  </p>
                  {/* Action row */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/eta-forecast/${alert.trainId}`); }}
                      className="text-[10px] font-bold text-secondary hover:underline"
                    >
                      View ETA
                    </button>
                    <span className="text-outline-variant/40">·</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/train-monitoring/${alert.trainId}`); }}
                      className="text-[10px] font-bold text-secondary hover:underline"
                    >
                      Live details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
