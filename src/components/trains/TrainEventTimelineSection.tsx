import React from 'react';
import { Train, TrainEvent } from '../../types/train';
import { clsx } from 'clsx';

interface TrainEventTimelineSectionProps {
  train: Train;
}

export const TrainEventTimelineSection: React.FC<TrainEventTimelineSectionProps> = ({ train }) => {
  // Combine existing recentEvents with contextual events matching the train status
  const baseEvents: TrainEvent[] = train.recentEvents && train.recentEvents.length > 0
    ? train.recentEvents
    : [
        {
          id: 'ev-1',
          timestamp: '16:21',
          description: 'Signal restriction detected at approach outer interlocking',
          type: 'slowdown',
        },
        {
          id: 'ev-2',
          timestamp: '16:25',
          description: `Average speed decreased to ${train.currentSpeedKmH} km/h on active block section`,
          type: 'slowdown',
        },
        {
          id: 'ev-3',
          timestamp: '16:31',
          description: `Dynamic ETA recalculated to ${train.aiPredictedEta} (+${train.currentDelayMinutes}m delay)`,
          type: 'update',
        },
        {
          id: 'ev-4',
          timestamp: '16:38',
          description: train.status === 'Recovering'
            ? 'Recovery throttle applied — delay delta trending downward'
            : `Predicted delay adjusted to +${train.currentDelayMinutes}m based on downstream headway`,
          type: train.status === 'Recovering' ? 'recovery' : 'halt',
        },
      ];

  const getEventIcon = (type: TrainEvent['type']) => {
    switch (type) {
      case 'departure':
        return { icon: 'directions_transit', color: 'text-emerald-600 bg-emerald-100 border-emerald-300' };
      case 'recovery':
        return { icon: 'trending_up', color: 'text-sky-600 bg-sky-100 border-sky-300' };
      case 'slowdown':
        return { icon: 'warning', color: 'text-amber-600 bg-amber-100 border-amber-300' };
      case 'halt':
        return { icon: 'pause', color: 'text-red-600 bg-red-100 border-red-300' };
      case 'update':
      default:
        return { icon: 'update', color: 'text-indigo-600 bg-indigo-100 border-indigo-300' };
    }
  };

  return (
    <section aria-label="Train Event Timeline" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
          <h3 className="text-base font-bold text-on-surface">
            Operational Event Timeline
          </h3>
        </div>
        <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-mono">
          Live Telemetry Log
        </span>
      </div>

      {/* Events Feed */}
      <div className="space-y-3">
        {baseEvents.map((ev, idx) => {
          const style = getEventIcon(ev.type);
          const isLatest = idx === 0;

          return (
            <div
              key={ev.id}
              className={clsx(
                'border rounded-xl p-3 flex items-start gap-3 transition-colors',
                isLatest
                  ? 'bg-secondary/5 border-secondary/30 shadow-2xs'
                  : 'bg-surface-container-low/40 border-outline-variant/30',
              )}
            >
              {/* Event Icon */}
              <div
                className={clsx(
                  'w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 mt-0.5',
                  style.color,
                )}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {style.icon}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-on-surface bg-surface-container px-1.5 py-0.5 rounded">
                    {ev.timestamp}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                    {ev.type}
                  </span>
                </div>

                <p className="text-[12px] text-on-surface font-medium leading-normal mt-1">
                  {ev.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
