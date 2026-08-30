import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrainMonitoringMetrics } from '../components/trains/TrainMonitoringMetrics';
import { TrainSearchFilter } from '../components/trains/TrainSearchFilter';
import { TrainDataTable } from '../components/trains/TrainDataTable';
import { AIActiveInsightsSidebar } from '../components/trains/AIActiveInsightsSidebar';
import { Footer } from '../components/layout/Footer';
import { MOCK_TRAINS } from '../data/trains';

export const TrainMonitoringPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const filteredTrains = MOCK_TRAINS.filter((train) => {
    // Search text filter
    const matchesSearch =
      train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.trainNumber.includes(searchTerm) ||
      train.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filter
    if (activeFilter === 'on_time') return train.status.toLowerCase().includes('on time') || train.status.toLowerCase().includes('good');
    if (activeFilter === 'minor_delay') return train.status.toLowerCase().includes('minor') || train.status.toLowerCase().includes('warning');
    if (activeFilter === 'critical_delay') return train.status.toLowerCase().includes('critical');
    if (activeFilter === 'ai_risk') return train.confidencePercent < 90 || train.currentDelayMinutes > 15;

    return true;
  });

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
          Train Monitoring
        </h2>
        <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
          Real-time fleet tracking, dynamic speed analysis and AI ETA confidence scores
        </p>
      </div>

      {/* Summary Metrics */}
      <TrainMonitoringMetrics />

      {/* 2-Column Grid: Main Table (Left 3 cols) + AI Insights (Right 1 col) */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-lg">
        <div className="xl:col-span-3 flex flex-col gap-md">
          <TrainSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <TrainDataTable trains={filteredTrains} />
        </div>

        <div className="xl:col-span-1">
          <AIActiveInsightsSidebar />
        </div>
      </div>

      <Footer />
    </main>
  );
};
