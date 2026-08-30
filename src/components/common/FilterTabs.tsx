import React from 'react';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
  icon?: string;
  isAiRisk?: boolean;
  isError?: boolean;
}

interface FilterTabsProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        if (tab.isError) {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors border flex items-center gap-1 ${
                isActive
                  ? 'bg-error text-white border-error shadow-sm'
                  : 'bg-error-container/30 text-error hover:bg-error-container/50 border-error/30'
              }`}
            >
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          );
        }

        if (tab.isAiRisk) {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors border flex items-center gap-1 ${
                isActive
                  ? 'bg-secondary text-white border-secondary shadow-sm'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-variant border-outline-variant/50'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-colors border whitespace-nowrap ${
              isActive
                ? 'bg-primary text-on-primary border-primary shadow-sm'
                : 'bg-surface text-on-surface-variant hover:bg-surface-variant border-outline-variant/50'
            }`}
          >
            {tab.label} {tab.count !== undefined && `(${tab.count})`}
          </button>
        );
      })}
    </div>
  );
};
