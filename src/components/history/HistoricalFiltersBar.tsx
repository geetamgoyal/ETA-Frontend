import React from 'react';
import { HistoryFilterState, HistoryDateRange } from '../../types/history';

interface HistoricalFiltersBarProps {
  filters: HistoryFilterState;
  onFilterChange: (newFilters: HistoryFilterState) => void;
  trainOptions: Array<{ number: string; name: string }>;
  routeOptions: Array<{ id: string; name: string }>;
  stationOptions: Array<{ code: string; name: string }>;
  totalFilteredCount: number;
}

export const HistoricalFiltersBar: React.FC<HistoricalFiltersBarProps> = ({
  filters,
  onFilterChange,
  trainOptions,
  routeOptions,
  stationOptions,
  totalFilteredCount,
}) => {
  const activeFiltersCount =
    (filters.dateRange !== 'Last 7 Days' ? 1 : 0) +
    (filters.selectedTrain !== 'ALL' ? 1 : 0) +
    (filters.selectedRoute !== 'ALL' ? 1 : 0) +
    (filters.selectedStation !== 'ALL' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  const resetFilters = () => {
    onFilterChange({
      dateRange: 'Last 7 Days',
      selectedTrain: 'ALL',
      selectedRoute: 'ALL',
      selectedStation: 'ALL',
      searchQuery: '',
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-3 sm:p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Evaluation Filters
          </span>
          {activeFiltersCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black">
              {activeFiltersCount} active
            </span>
          )}
        </div>

        <div className="text-xs text-on-surface-variant">
          Showing <strong className="text-on-surface">{totalFilteredCount}</strong> matching journeys
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {/* Date Range Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Time Range
          </label>
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value as HistoryDateRange })}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer appearance-none pr-7"
            >
              <option value="Last 24 Hours">Last 24 Hours</option>
              <option value="Last 7 Days">Last 7 Days (Default)</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Train Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Train Rake
          </label>
          <div className="relative">
            <select
              value={filters.selectedTrain}
              onChange={(e) => onFilterChange({ ...filters, selectedTrain: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer appearance-none pr-7"
            >
              <option value="ALL">All Trains ({trainOptions.length})</option>
              {trainOptions.map((t) => (
                <option key={t.number} value={t.number}>
                  #{t.number} - {t.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Route / Corridor Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Corridor / Section
          </label>
          <div className="relative">
            <select
              value={filters.selectedRoute}
              onChange={(e) => onFilterChange({ ...filters, selectedRoute: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer appearance-none pr-7"
            >
              <option value="ALL">All Corridors ({routeOptions.length})</option>
              {routeOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Station Bottleneck Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Station Filter
          </label>
          <div className="relative">
            <select
              value={filters.selectedStation}
              onChange={(e) => onFilterChange({ ...filters, selectedStation: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer appearance-none pr-7"
            >
              <option value="ALL">All Stations ({stationOptions.length})</option>
              {stationOptions.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Free Text Search & Reset Action */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            Search Keyword
          </label>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search train, station, route..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-8 pr-2.5 py-1.5 text-xs font-medium text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute left-2 top-1/2 -translate-y-1/2">
                search
              </span>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                title="Reset all filters"
                className="p-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-red-600 hover:border-red-500/30 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
