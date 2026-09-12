import React, { useState, useMemo } from 'react';
import { useTrains } from '../../context/TrainContext';

type FilterType = 'all' | 'ontime' | 'delayed' | 'critical';

export const TrainTrackingList: React.FC = () => {
  const { trains, selectedTrainId, setSelectedTrainId } = useTrains();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<'delay' | 'number' | 'speed'>('delay');

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: trains.length,
      ontime: trains.filter((t) => t.status === 'On Time' || t.status === 'Good').length,
      delayed: trains.filter((t) => t.status === 'Minor Delay' || t.status === 'Recovering' || t.status === 'Delayed').length,
      critical: trains.filter((t) => t.status === 'Critical Delay' || t.status === 'Critical').length,
    };
  }, [trains]);

  // Filtered & sorted trains
  const displayedTrains = useMemo(() => {
    return trains
      .filter((t) => {
        // Status filter
        if (filter === 'ontime') {
          if (t.status !== 'On Time' && t.status !== 'Good') return false;
        } else if (filter === 'delayed') {
          if (t.status !== 'Minor Delay' && t.status !== 'Recovering' && t.status !== 'Delayed') return false;
        } else if (filter === 'critical') {
          if (t.status !== 'Critical Delay' && t.status !== 'Critical') return false;
        }

        // Search filter
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          t.trainNumber.toLowerCase().includes(q) ||
          t.trainName.toLowerCase().includes(q) ||
          t.currentLocation.toLowerCase().includes(q) ||
          t.nextStation.toLowerCase().includes(q) ||
          t.source.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'delay') return b.currentDelayMinutes - a.currentDelayMinutes;
        if (sortBy === 'speed') return b.currentSpeedKmH - a.currentSpeedKmH;
        return a.trainNumber.localeCompare(b.trainNumber);
      });
  }, [trains, filter, search, sortBy]);

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm flex flex-col h-[650px] lg:h-[720px] overflow-hidden">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-outline-variant/20 bg-surface-container-lowest">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">format_list_bulleted</span>
            <h3 className="font-bold text-sm text-on-surface tracking-tight">Active Trains</h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
            {displayedTrains.length} of {trains.length}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2.5">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search #, name, station..."
            className="w-full pl-8 pr-7 py-1.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-0.5"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('ontime')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'ontime'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/20'
            }`}
          >
            On Time ({counts.ontime})
          </button>
          <button
            onClick={() => setFilter('delayed')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'delayed'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20'
            }`}
          >
            Delayed ({counts.delayed})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'critical'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-500/10 text-red-800 hover:bg-red-500/20'
            }`}
          >
            Critical ({counts.critical})
          </button>
        </div>
      </div>

      {/* Train List Body */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 divide-y divide-outline-variant/10">
        {displayedTrains.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <span className="material-symbols-outlined text-outline text-3xl mb-1">train</span>
            <p className="text-xs font-bold text-on-surface-variant">No trains match criteria</p>
            <button
              onClick={() => {
                setSearch('');
                setFilter('all');
              }}
              className="mt-2 text-[11px] text-primary font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          displayedTrains.map((t) => {
            const isSelected = t.id === selectedTrainId;
            const isCritical = t.status === 'Critical Delay' || t.status === 'Critical';
            const isOnTime = t.status === 'On Time' || t.status === 'Good';

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTrainId(t.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-primary/5 border-primary/40 shadow-sm ring-1 ring-primary/20'
                    : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-outline-variant/60 hover:bg-surface-container-low'
                }`}
              >
                {/* Active selection vertical marker */}
                {isSelected && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full" />
                )}

                {/* Card Top: Number, Name & Delay badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-primary">
                        #{t.trainNumber}
                      </span>
                      <span className="text-[10px] text-outline font-semibold">·</span>
                      <span className="text-xs font-black text-on-surface truncate">
                        {t.trainName}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                      {t.source.split('(')[0]} → {t.destination.split('(')[0]}
                    </p>
                  </div>

                  {/* Delay Pill */}
                  <div
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-tight whitespace-nowrap self-start ${
                      isOnTime
                        ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                        : isCritical
                        ? 'bg-red-500/15 text-red-700 border border-red-500/30'
                        : 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                    }`}
                  >
                    {isOnTime ? 'On Time' : `+${t.currentDelayMinutes}m`}
                  </div>
                </div>

                {/* Card Middle: Current Location */}
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[13px] text-secondary shrink-0">
                    location_on
                  </span>
                  <span className="font-semibold text-on-surface truncate">
                    {t.currentLocation}
                  </span>
                </div>

                {/* Card Bottom: Speed, Next Stop & Status */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-outline-variant/15 text-[10px]">
                  {/* Speed */}
                  <div className="flex items-center gap-1 font-mono text-on-surface-variant">
                    <span className="material-symbols-outlined text-[12px] text-outline">speed</span>
                    <span className="font-bold text-on-surface">{t.currentSpeedKmH} km/h</span>
                  </div>

                  {/* Next Station */}
                  <div className="truncate text-outline text-right">
                    Next: <span className="font-semibold text-on-surface-variant">{t.nextStation.split('(')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Panel Footer: Quick Sort */}
      <div className="p-2.5 border-t border-outline-variant/20 bg-surface-container-low/60 flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant font-medium">Sort by:</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSortBy('delay')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              sortBy === 'delay' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Delay
          </button>
          <button
            onClick={() => setSortBy('speed')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              sortBy === 'speed' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Speed
          </button>
          <button
            onClick={() => setSortBy('number')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              sortBy === 'number' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            #
          </button>
        </div>
      </div>
    </div>
  );
};
