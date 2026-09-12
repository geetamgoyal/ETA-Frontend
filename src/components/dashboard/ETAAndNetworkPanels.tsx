import React, { useMemo } from 'react';
import { useTrains } from '../../context/TrainContext';
import { clsx } from 'clsx';

// ── ETA Comparison Chart ──────────────────────────────────────────────────────
export const ETAForecastSummary: React.FC = () => {
  const { trains } = useTrains();

  const items = useMemo(
    () =>
      trains.map((t) => {
        const schedMins = parseInt(t.previousEta.split(':')[0]) * 60 + parseInt(t.previousEta.split(':')[1]);
        const aiMins    = parseInt(t.aiPredictedEta.split(':')[0]) * 60 + parseInt(t.aiPredictedEta.split(':')[1]);
        return {
          id:           t.id,
          trainNum:     t.trainNumber,
          name:         t.trainName,
          scheduled:    t.previousEta,
          predicted:    t.aiPredictedEta,
          delay:        t.currentDelayMinutes,
          confidence:   t.confidencePercent,
          diffMins:     aiMins - schedMins,
        };
      }).sort((a, b) => b.delay - a.delay),
    [trains],
  );

  // Find max delay for bar scaling
  const maxAbsDiff = Math.max(...items.map((i) => Math.abs(i.diffMins)), 1);

  const BAR_MAX = 120; // px max bar width

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-status-ai">bar_chart</span>
          <h3 className="text-[13px] font-bold text-on-surface">ETA Forecast Summary</h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="w-8 h-1.5 bg-outline-variant/50 inline-block rounded" />
            Scheduled ETA
          </span>
          <span className="flex items-center gap-1">
            <span className="w-8 h-1.5 bg-secondary inline-block rounded" />
            Predicted ETA
          </span>
          <span className="flex items-center gap-1">
            <span className="w-8 h-1.5 bg-status-critical inline-block rounded" />
            Expected Delay
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {items.map((item) => {
          const isLate    = item.diffMins > 0;
          const isOnTime  = item.diffMins <= 1;
          const barColor  = isOnTime ? '#16a34a' : isLate ? '#dc2626' : '#0369a1';
          const barWidth  = Math.min((Math.abs(item.diffMins) / maxAbsDiff) * BAR_MAX, BAR_MAX);

          return (
            <div key={item.id} className="flex items-center gap-3">
              {/* Train ID */}
              <div className="w-16 flex-shrink-0">
                <span className="data-value text-[11px] font-bold text-primary">{item.trainNum}</span>
                <p className="text-[9px] text-on-surface-variant truncate">{item.name.split(' ').slice(0, 2).join(' ')}</p>
              </div>

              {/* ETA comparison */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="data-value text-[10px] text-on-surface-variant line-through">{item.scheduled}</span>
                  <span className="material-symbols-outlined text-[12px] text-on-surface-variant">arrow_forward</span>
                  <span className="data-value text-[11px] font-bold" style={{ color: barColor }}>{item.predicted}</span>
                  <span
                    className={clsx(
                      'data-value text-[10px] font-bold px-1 rounded',
                      isOnTime ? 'text-status-ok-text bg-status-ok-bg'
                      : isLate ? 'text-status-critical-text bg-status-critical-bg'
                      : 'text-status-info-text bg-status-info-bg',
                    )}
                  >
                    {isOnTime ? 'On Time' : isLate ? `+${item.diffMins}m` : `${item.diffMins}m`}
                  </span>
                </div>

                {/* Bar chart */}
                <div className="h-2 bg-surface-container rounded-full overflow-hidden relative">
                  {/* Scheduled marker (center) */}
                  <div
                    className="absolute top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: barColor,
                      width: `${barWidth}px`,
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>

              {/* Confidence */}
              <div className="w-12 flex-shrink-0 text-right">
                <span
                  className={clsx(
                    'data-value text-[10px] font-bold',
                    item.confidence >= 90 ? 'text-status-ok-text'
                    : item.confidence >= 78 ? 'text-status-warn-text'
                    : 'text-status-critical-text',
                  )}
                >
                  {item.confidence}%
                </span>
                <p className="text-[8px] text-on-surface-variant">conf.</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-outline-variant/20 bg-surface-container-low/50">
        <p className="text-[10px] text-on-surface-variant">
          Bars show deviation from scheduled ETA · AI confidence scores update every 20 seconds
        </p>
      </div>
    </div>
  );
};

// ── Network Status Panel ──────────────────────────────────────────────────────
export const NetworkStatusPanel: React.FC = () => {
  const { trains } = useTrains();

  const corridors = useMemo(() => {
    // East: trains 12309, 22436, 12274
    const eastTrains = trains.filter((t) => ['12309', '22436', '12274'].includes(t.id));
    const eastDelay  = eastTrains.filter((t) => t.currentDelayMinutes > 5).length;
    // Central: trains 12002, 12050
    const centralTrains = trains.filter((t) => ['12002', '12050'].includes(t.id));
    const centralDelay  = centralTrains.filter((t) => t.currentDelayMinutes > 5).length;
    // Western: train 12951
    const westTrains = trains.filter((t) => ['12951'].includes(t.id));
    const westDelay  = westTrains.filter((t) => t.currentDelayMinutes > 5).length;

    const getStatus = (delayed: number, total: number) => {
      if (delayed === 0) return { label: 'Normal', color: '#16a34a', bg: '#f0fdf4', dot: 'bg-status-ok' };
      if (delayed / total >= 0.5) return { label: 'Congested', color: '#dc2626', bg: '#fef2f2', dot: 'bg-status-critical' };
      return { label: 'Partial Delay', color: '#d97706', bg: '#fffbeb', dot: 'bg-status-warn' };
    };

    return [
      {
        name: 'East Corridor',
        route: 'NDLS → HWH',
        length: '1,451 km',
        trains: eastTrains.length,
        delayed: eastDelay,
        status: getStatus(eastDelay, eastTrains.length),
        color: '#0ea5e9',
      },
      {
        name: 'Central Corridor',
        route: 'NZM → RKMP',
        length: '708 km',
        trains: centralTrains.length,
        delayed: centralDelay,
        status: getStatus(centralDelay, centralTrains.length),
        color: '#22c55e',
      },
      {
        name: 'Western Corridor',
        route: 'MMCT → NDLS',
        length: '1,384 km',
        trains: westTrains.length,
        delayed: westDelay,
        status: getStatus(westDelay, westTrains.length),
        color: '#f59e0b',
      },
    ];
  }, [trains]);

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant/40 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-secondary">network_check</span>
        <h3 className="text-[13px] font-bold text-on-surface">Network Status</h3>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {corridors.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 p-3 rounded-lg border"
            style={{ borderColor: `${c.color}30`, background: `${c.color}06` }}
          >
            {/* Corridor color indicator */}
            <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: c.color }} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[12px] font-bold text-on-surface">{c.name}</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ color: c.status.color, background: c.status.bg }}
                >
                  {c.status.label.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-on-surface-variant">{c.route}</span>
                <span className="text-[10px] text-on-surface-variant">·</span>
                <span className="text-[10px] text-on-surface-variant">{c.length}</span>
              </div>
            </div>

            {/* Train count */}
            <div className="text-right flex-shrink-0">
              <p className="data-value text-[14px] font-bold text-on-surface">{c.trains}</p>
              <p className="text-[9px] text-on-surface-variant">
                {c.delayed > 0 ? `${c.delayed} delayed` : 'all on time'}
              </p>
            </div>
          </div>
        ))}

        {/* Network health bar */}
        <div className="pt-3 border-t border-outline-variant/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="ops-label">Overall Network Health</span>
            <span className="data-value text-[11px] font-bold text-status-ok-text">
              {Math.round((trains.filter((t) => t.currentDelayMinutes <= 5).length / trains.length) * 100)}% Optimal
            </span>
          </div>
          <div className="h-2 bg-surface-container rounded-full overflow-hidden flex gap-0.5">
            {trains.map((t) => (
              <div
                key={t.id}
                className="flex-1 h-full rounded-sm"
                style={{
                  background: t.currentDelayMinutes <= 2 ? '#16a34a' : t.currentDelayMinutes <= 15 ? '#d97706' : '#dc2626',
                }}
                title={`${t.trainNumber}: ${t.currentDelayMinutes}m delay`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
