import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrains } from '../../context/TrainContext';
import { Train } from '../../types/train';

export const DelayDistributionSection: React.FC = () => {
  const navigate = useNavigate();
  const { trains } = useTrains();

  // Categorize active trains
  const onTimeTrains = trains.filter((t) => t.currentDelayMinutes <= 2);
  const minorDelayTrains = trains.filter((t) => t.currentDelayMinutes > 2 && t.currentDelayMinutes <= 15);
  const moderateDelayTrains = trains.filter((t) => t.currentDelayMinutes > 15 && t.currentDelayMinutes <= 30);
  const majorDelayTrains = trains.filter((t) => t.currentDelayMinutes > 30);

  const total = Math.max(1, trains.length);

  const categories = [
    {
      label: 'On Time',
      range: '≤ 2 min deviation',
      count: onTimeTrains.length,
      percentage: Math.round((onTimeTrains.length / total) * 100),
      colorClass: 'text-emerald-800 bg-emerald-500/10 border-emerald-500/30',
      barColor: 'bg-emerald-500',
      trains: onTimeTrains,
      statusDesc: 'Cruising on published working timetable buffer',
    },
    {
      label: 'Minor Delay',
      range: '3–15 min delay',
      count: minorDelayTrains.length,
      percentage: Math.round((minorDelayTrains.length / total) * 100),
      colorClass: 'text-sky-800 bg-sky-500/10 border-sky-500/30',
      barColor: 'bg-sky-500',
      trains: minorDelayTrains,
      statusDesc: 'Section caution orders & platform dwell adjustment',
    },
    {
      label: 'Moderate Delay',
      range: '16–30 min delay',
      count: moderateDelayTrains.length,
      percentage: Math.round((moderateDelayTrains.length / total) * 100),
      colorClass: 'text-amber-800 bg-amber-500/10 border-amber-500/30',
      barColor: 'bg-amber-500',
      trains: moderateDelayTrains,
      statusDesc: 'High corridor saturation & overtaking precedence',
    },
    {
      label: 'Major Delay',
      range: '> 30 min critical',
      count: majorDelayTrains.length,
      percentage: Math.round((majorDelayTrains.length / total) * 100),
      colorClass: 'text-red-800 bg-red-500/10 border-red-500/30',
      barColor: 'bg-red-500',
      trains: majorDelayTrains,
      statusDesc: 'Unscheduled track holds or point signal anomalies',
    },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-outline-variant/15">
        <div>
          <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">pie_chart</span>
            Live Fleet Delay Distribution
          </h3>
          <p className="text-xs text-on-surface-variant">
            Categorization of active monitored coaching trains across operational delay brackets
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant self-start sm:self-auto">
          {trains.length} Monitored Trains Active
        </span>
      </div>

      {/* Aggregate Proportional Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden flex">
          {categories.map((c) =>
            c.count > 0 ? (
              <div
                key={c.label}
                className={`${c.barColor} h-full transition-all duration-500`}
                style={{ width: `${(c.count / total) * 100}%` }}
                title={`${c.label}: ${c.count} trains (${c.percentage}%)`}
              />
            ) : null
          )}
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {categories.map((c) => (
          <div
            key={c.label}
            className={`p-3.5 rounded-xl border ${c.colorClass} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="font-bold text-xs uppercase tracking-wider">
                  {c.label}
                </span>
                <span className="text-[10px] font-mono font-semibold text-outline">
                  {c.range}
                </span>
              </div>

              <div className="flex items-baseline gap-2 my-1">
                <span className="text-3xl font-black font-mono">
                  {c.count}
                </span>
                <span className="text-xs font-bold opacity-80">
                  rakes ({c.percentage}%)
                </span>
              </div>

              <p className="text-[11px] opacity-90 leading-tight mt-1">
                {c.statusDesc}
              </p>
            </div>

            {/* Active Train Pills */}
            <div className="mt-3 pt-2 border-t border-black/10 flex flex-wrap gap-1.5">
              {c.trains.length === 0 ? (
                <span className="text-[10px] text-outline italic">No rakes currently in bracket</span>
              ) : (
                c.trains.map((t: Train) => (
                  <button
                    key={t.id}
                    onClick={() => navigate(`/train/${t.id}`)}
                    className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-[10px] font-mono font-bold text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1 cursor-pointer"
                    title={`Inspect ${t.trainName} (${t.currentDelayMinutes > 0 ? `+${t.currentDelayMinutes}m` : 'On Time'})`}
                  >
                    <span>#{t.trainNumber}</span>
                    <span className="text-[9px] text-outline">
                      {t.currentDelayMinutes > 0 ? `+${t.currentDelayMinutes}m` : '0m'}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
