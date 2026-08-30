import React from 'react';
import { MOCK_TIMELINE_EVENTS } from '../../data/alerts';

export const AlertTimeline: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-ambient p-lg border border-outline-variant/30">
      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-md flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">history</span>
        Alert Activity Timeline (Last Hour)
      </h3>

      <div className="relative pt-6 pb-4">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-outline-variant/30 -translate-y-1/2 z-0"></div>

        {/* Timeline Points */}
        <div className="flex justify-between relative z-10 w-full px-4 overflow-x-auto">
          {MOCK_TIMELINE_EVENTS.map((ev) => (
            <div key={ev.id} className="flex flex-col items-center group cursor-pointer relative min-w-[50px]">
              <div
                className={`rounded-full border-2 border-white shadow-sm group-hover:scale-125 transition-transform ${
                  ev.type === 'critical'
                    ? 'w-5 h-5 bg-alert-critical animate-pulse'
                    : ev.type === 'recovery'
                    ? 'w-4 h-4 bg-alert-recovery'
                    : ev.type === 'warning'
                    ? 'w-4 h-4 bg-alert-warning'
                    : 'w-4 h-4 bg-primary'
                }`}
              ></div>

              {/* Tooltip on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-surface-container px-2.5 py-1 rounded shadow-lg text-[11px] whitespace-nowrap z-20 pointer-events-none border border-outline-variant/20">
                <div className="font-bold text-primary">{ev.title}</div>
                <div className="text-on-surface-variant text-[10px]">{ev.description}</div>
              </div>

              <div
                className={`mt-2 text-[10px] font-mono-data ${
                  ev.type === 'critical' ? 'font-bold text-alert-critical' : 'text-on-surface-variant'
                }`}
              >
                {ev.timeLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
