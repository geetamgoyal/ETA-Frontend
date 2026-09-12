import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainStatus } from '../../types/train';
import { useTrains } from '../../context/TrainContext';
import { clsx } from 'clsx';

type SortField = 'trainNumber' | 'status' | 'currentLocation' | 'nextStation' | 'currentSpeedKmH' | 'previousEta' | 'aiPredictedEta' | 'currentDelayMinutes' | 'confidencePercent';
type SortDir = 'asc' | 'desc';

const STATUS_FILTER_TABS = [
  { id: 'all',      label: 'All' },
  { id: 'on_time',  label: 'On Time' },
  { id: 'delayed',  label: 'Minor Delay' },
  { id: 'critical', label: 'Critical' },
  { id: 'ai_risk',  label: 'AI Risk' },
];

function getDelayStyle(delay: number): { text: string; badge: string } {
  if (delay <= 0)  return { text: 'text-status-ok-text',       badge: 'bg-status-ok-bg border-status-ok-border text-status-ok-text' };
  if (delay <= 10) return { text: 'text-status-warn-text',     badge: 'bg-status-warn-bg border-status-warn-border text-status-warn-text' };
  return              { text: 'text-status-critical-text',  badge: 'bg-status-critical-bg border-status-critical-border text-status-critical-text' };
}

function getStatusDot(status: TrainStatus): string {
  switch (status) {
    case 'On Time': case 'Good':  return 'bg-status-ok';
    case 'Minor Delay': case 'Warning': case 'Delayed': return 'bg-status-warn';
    case 'Critical Delay': case 'Critical': return 'bg-status-critical';
    case 'Recovering': return 'bg-status-recovery';
    default: return 'bg-on-surface-variant';
  }
}

function getStatusTextColor(status: TrainStatus): string {
  switch (status) {
    case 'On Time': case 'Good':  return 'text-status-ok-text';
    case 'Minor Delay': case 'Warning': case 'Delayed': return 'text-status-warn-text';
    case 'Critical Delay': case 'Critical': return 'text-status-critical-text';
    case 'Recovering': return 'text-status-recovery-text';
    default: return 'text-on-surface-variant';
  }
}

interface ActiveTrainsTableProps {
  selectedTrainId?: string;
  onSelectTrain: (id: string) => void;
}

export const ActiveTrainsTable: React.FC<ActiveTrainsTableProps> = ({
  selectedTrainId,
  onSelectTrain,
}) => {
  const { trains } = useTrains();
  const navigate   = useNavigate();
  const [sortField, setSortField] = useState<SortField>('currentDelayMinutes');
  const [sortDir, setSortDir]     = useState<SortDir>('desc');
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    let list = [...trains];
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.trainName.toLowerCase().includes(q) ||
          t.trainNumber.includes(q) ||
          t.currentLocation.toLowerCase().includes(q) ||
          t.nextStation.toLowerCase().includes(q),
      );
    }
    // Status filter
    if (filter === 'on_time')  list = list.filter((t) => t.currentDelayMinutes <= 2);
    if (filter === 'delayed')  list = list.filter((t) => t.currentDelayMinutes > 2 && t.currentDelayMinutes <= 20);
    if (filter === 'critical') list = list.filter((t) => t.currentDelayMinutes > 20);
    if (filter === 'ai_risk')  list = list.filter((t) => t.confidencePercent < 90 || t.currentDelayMinutes > 15);
    // Sort
    list.sort((a, b) => {
      const av = (a as unknown as Record<string, unknown>)[sortField];
      const bv = (b as unknown as Record<string, unknown>)[sortField];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return list;
  }, [trains, search, filter, sortField, sortDir]);

  const SortTh: React.FC<{ field: SortField; children: React.ReactNode; className?: string }> = ({
    field, children, className,
  }) => (
    <th
      className={clsx(
        'px-3 py-2.5 text-left cursor-pointer select-none group whitespace-nowrap',
        'text-[10px] font-bold uppercase tracking-wider text-on-surface-variant',
        'hover:text-on-surface transition-colors',
        className,
      )}
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        <span
          className={clsx(
            'material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 transition-opacity',
            sortField === field && 'opacity-100',
          )}
        >
          {sortField === field ? (sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
        </span>
      </span>
    </th>
  );

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden flex flex-col">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-b border-outline-variant/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">table_rows</span>
          <h3 className="text-[13px] font-bold text-on-surface">Active Trains</h3>
          <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-mono">
            {filtered.length}/{trains.length}
          </span>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-on-surface-variant">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search train, station..."
              className="pl-7 pr-3 py-1.5 text-[11px] bg-surface-container border border-outline-variant/60 rounded-md outline-none focus:border-secondary text-on-surface placeholder:text-on-surface-variant/50 w-44"
            />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border-b border-outline-variant/30 px-2">
        {STATUS_FILTER_TABS.map((tab) => {
          const count = tab.id === 'all' ? trains.length
            : tab.id === 'on_time'  ? trains.filter((t) => t.currentDelayMinutes <= 2).length
            : tab.id === 'delayed'  ? trains.filter((t) => t.currentDelayMinutes > 2 && t.currentDelayMinutes <= 20).length
            : tab.id === 'critical' ? trains.filter((t) => t.currentDelayMinutes > 20).length
            : trains.filter((t) => t.confidencePercent < 90 || t.currentDelayMinutes > 15).length;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={clsx(
                'px-3 py-2 text-[11px] font-semibold border-b-2 transition-colors whitespace-nowrap',
                filter === tab.id
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface',
              )}
            >
              {tab.label}
              {count > 0 && (
                <span className="ml-1.5 text-[9px] bg-surface-container-high px-1 py-0.5 rounded font-mono">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant/40 sticky top-0 z-10">
            <tr>
              <SortTh field="trainNumber">Train</SortTh>
              <SortTh field="status">Status</SortTh>
              <SortTh field="currentLocation">Location</SortTh>
              <SortTh field="nextStation" className="hidden md:table-cell">Next Station</SortTh>
              <SortTh field="currentSpeedKmH" className="hidden lg:table-cell">Speed</SortTh>
              <SortTh field="previousEta" className="hidden md:table-cell">Sched. ETA</SortTh>
              <SortTh field="aiPredictedEta">AI ETA</SortTh>
              <SortTh field="currentDelayMinutes">Delay</SortTh>
              <SortTh field="confidencePercent" className="hidden lg:table-cell">Confidence</SortTh>
              <th className="px-3 py-2.5 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-[12px] text-on-surface-variant">
                  No trains match the current filter.
                </td>
              </tr>
            ) : (
              filtered.map((train) => {
                const isSelected = train.id === selectedTrainId;
                const delayStyle = getDelayStyle(train.currentDelayMinutes);
                return (
                  <tr
                    key={train.id}
                    className={clsx(
                      'cursor-pointer transition-colors table-row-hover',
                      isSelected
                        ? 'bg-secondary/5 border-l-2 border-l-secondary'
                        : '',
                    )}
                    onClick={() => onSelectTrain(train.id)}
                    onDoubleClick={() => navigate(`/train-monitoring/${train.id}`)}
                  >
                    {/* Train */}
                    <td className="px-3 py-3">
                      <div className="flex flex-col">
                        <span className="data-value text-[12px] font-bold text-primary hover:underline">{train.trainNumber}</span>
                        <span className="text-[10px] text-on-surface-variant leading-tight max-w-[120px] truncate">
                          {train.trainName}
                        </span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', getStatusDot(train.status))} />
                        <span className={clsx('text-[11px] font-semibold whitespace-nowrap', getStatusTextColor(train.status))}>
                          {train.status}
                        </span>
                      </div>
                    </td>
                    {/* Location */}
                    <td className="px-3 py-3">
                      <span className="text-[12px] text-on-surface">{train.currentLocation}</span>
                    </td>
                    {/* Next Station */}
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="text-[11px] text-on-surface-variant">{train.nextStation}</span>
                    </td>
                    {/* Speed */}
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <span className="data-value text-[12px] font-bold text-on-surface">
                        {train.currentSpeedKmH}
                      </span>
                      <span className="text-[10px] text-on-surface-variant ml-0.5">km/h</span>
                    </td>
                    {/* Scheduled ETA */}
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="data-value text-[12px] text-on-surface-variant line-through decoration-1">
                        {train.previousEta}
                      </span>
                    </td>
                    {/* AI ETA */}
                    <td className="px-3 py-3">
                      <span className="data-value text-[13px] font-bold text-primary">
                        {train.aiPredictedEta}
                      </span>
                    </td>
                    {/* Delay */}
                    <td className="px-3 py-3">
                      <span
                        className={clsx(
                          'data-value text-[11px] font-bold px-1.5 py-0.5 rounded border',
                          delayStyle.badge,
                        )}
                      >
                        {train.currentDelayMinutes <= 0 ? 'On Time' : `+${train.currentDelayMinutes}m`}
                      </span>
                    </td>
                    {/* Confidence */}
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full',
                              train.confidencePercent >= 90 ? 'bg-status-ok'
                              : train.confidencePercent >= 78 ? 'bg-status-warn'
                              : 'bg-status-critical',
                            )}
                            style={{ width: `${train.confidencePercent}%` }}
                          />
                        </div>
                        <span className="data-value text-[11px] text-on-surface-variant">
                          {train.confidencePercent}%
                        </span>
                      </div>
                    </td>
                    {/* Action */}
                    <td className="px-3 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/train-monitoring/${train.id}`);
                        }}
                        className="text-[10px] font-bold text-secondary hover:text-secondary/80 border border-secondary/30 px-2.5 py-1 rounded hover:bg-secondary/10 transition-colors whitespace-nowrap"
                        title="Open Full Train Details & Dynamic ETA"
                      >
                        Investigate ↗
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-4 py-2 border-t border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50">
        <span className="text-[10px] text-on-surface-variant">
          Showing {filtered.length} of {trains.length} trains • Prototype simulation data
        </span>
        <button
          onClick={() => navigate('/train-monitoring')}
          className="text-[10px] font-bold text-secondary hover:underline"
        >
          Full monitoring view →
        </button>
      </div>
    </div>
  );
};
