import React from 'react';
import { FilterTabs, TabOption } from '../common/FilterTabs';

interface TrainSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

export const TrainSearchFilter: React.FC<TrainSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  const tabs: TabOption[] = [
    { id: 'all', label: 'All Trains' },
    { id: 'on_time', label: 'On Time' },
    { id: 'minor_delay', label: 'Minor Delay' },
    { id: 'critical_delay', label: 'Critical Delay', isError: true },
    { id: 'ai_risk', label: 'AI Risk', isAiRisk: true },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl p-margin border border-outline-variant/30 shadow-sm">
      <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-4">
        Find a Train
      </h3>

      {/* Large search bar */}
      <div className="relative w-full mb-4">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[24px]">
          train
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by train number or train name (e.g., 12309, Rajdhani)..."
          className="w-full pl-12 pr-4 py-3 bg-surface-bright border border-outline-variant/50 rounded-lg font-body-lg text-body-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all text-on-surface placeholder:text-on-surface-variant/60 shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <FilterTabs
        tabs={tabs}
        activeTab={activeFilter}
        onChange={onFilterChange}
      />
    </div>
  );
};
