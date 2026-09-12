import React from 'react';

export type SeverityFilter = 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type StatusFilter = 'ALL' | 'Active' | 'Acknowledged' | 'Resolved';

interface AlertFiltersBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  severity: SeverityFilter;
  onSeverityChange: (v: SeverityFilter) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  severityCounts: Record<SeverityFilter, number>;
  onReset: () => void;
}

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'Signal', label: 'Signal' },
  { value: 'Congestion', label: 'Congestion' },
  { value: 'Stoppage', label: 'Stoppage' },
  { value: 'ETA Deviation', label: 'ETA Deviation' },
  { value: 'Station Dwell', label: 'Station Dwell' },
  { value: 'Caution Order', label: 'Caution Order' },
];

export const AlertFiltersBar: React.FC<AlertFiltersBarProps> = ({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  severityCounts,
  onReset,
}) => {
  const isFiltered = search || severity !== 'ALL' || category !== 'ALL' || status !== 'ALL';

  return (
    <div className="bg-surface-container-lowest rounded-xl p-3.5 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
      {/* Top row: Search input + Category Selector + Status Selector + Reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search alerts by train #, name, location, or keyword..."
            className="w-full pl-9 pr-8 py-2 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-0.5"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider hidden md:inline">
            Category:
          </span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider hidden md:inline">
            Status:
          </span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-lg text-xs font-bold text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Bottom row: Severity Filter Pills */}
      <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
          Severity:
        </span>

        <button
          onClick={() => onSeverityChange('ALL')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            severity === 'ALL'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          All ({severityCounts.ALL})
        </button>

        <button
          onClick={() => onSeverityChange('CRITICAL')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            severity === 'CRITICAL'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-red-500/10 text-red-800 hover:bg-red-500/20'
          }`}
        >
          Critical ({severityCounts.CRITICAL})
        </button>

        <button
          onClick={() => onSeverityChange('HIGH')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            severity === 'HIGH'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20'
          }`}
        >
          High ({severityCounts.HIGH})
        </button>

        <button
          onClick={() => onSeverityChange('MEDIUM')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            severity === 'MEDIUM'
              ? 'bg-yellow-600 text-white shadow-xs'
              : 'bg-yellow-500/10 text-yellow-800 hover:bg-yellow-500/20'
          }`}
        >
          Medium ({severityCounts.MEDIUM})
        </button>

        <button
          onClick={() => onSeverityChange('LOW')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            severity === 'LOW'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-sky-500/10 text-sky-800 hover:bg-sky-500/20'
          }`}
        >
          Low ({severityCounts.LOW})
        </button>
      </div>
    </div>
  );
};
