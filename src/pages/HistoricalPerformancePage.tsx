import React, { useState, useMemo } from 'react';
import {
  HISTORICAL_JOURNEYS,
  TRAIN_HISTORICAL_SUMMARIES,
  ROUTE_HISTORICAL_SUMMARIES,
  STATION_BOTTLENECK_SUMMARIES,
} from '../data/historicalData';
import { HistoryFilterState, HistoricalJourney } from '../types/history';
import { HistoricalHeader } from '../components/history/HistoricalHeader';
import { HistoricalFiltersBar } from '../components/history/HistoricalFiltersBar';
import { HistoricalSummaryKPIs } from '../components/history/HistoricalSummaryKPIs';
import { HistoricalTrendsSection } from '../components/history/HistoricalTrendsSection';
import { TrainPerformanceTable } from '../components/history/TrainPerformanceTable';
import { RoutePerformanceSection } from '../components/history/RoutePerformanceSection';
import { StationBottleneckAnalysis } from '../components/history/StationBottleneckAnalysis';
import { RecentJourneysList } from '../components/history/RecentJourneysList';
import { HistoricalJourneyDrawer } from '../components/history/HistoricalJourneyDrawer';
import { ExportReportModal } from '../components/common/ExportReportModal';
import { Footer } from '../components/layout/Footer';

export const HistoricalPerformancePage: React.FC = () => {
  const [filters, setFilters] = useState<HistoryFilterState>({
    dateRange: 'Last 7 Days',
    selectedTrain: 'ALL',
    selectedRoute: 'ALL',
    selectedStation: 'ALL',
    searchQuery: '',
  });

  const [selectedJourney, setSelectedJourney] = useState<HistoricalJourney | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Train, Route, and Station options for dropdowns
  const trainOptions = useMemo(() => {
    const map = new Map<string, string>();
    HISTORICAL_JOURNEYS.forEach((j) => map.set(j.trainNumber, j.trainName));
    return Array.from(map.entries()).map(([number, name]) => ({ number, name }));
  }, []);

  const routeOptions = useMemo(() => {
    return ROUTE_HISTORICAL_SUMMARIES.map((r) => ({ id: r.routeId, name: r.routeName }));
  }, []);

  const stationOptions = useMemo(() => {
    return STATION_BOTTLENECK_SUMMARIES.map((s) => ({ code: s.stationCode, name: s.stationName }));
  }, []);

  // Filtered journeys
  const filteredJourneys = useMemo(() => {
    return HISTORICAL_JOURNEYS.filter((j) => {
      // Date filter
      if (filters.dateRange === 'Last 24 Hours') {
        if (j.journeyDate !== '2026-09-12') return false;
      } else if (filters.dateRange === 'Last 7 Days') {
        if (j.journeyDate < '2026-09-06') return false;
      }

      // Train filter
      if (filters.selectedTrain !== 'ALL' && j.trainNumber !== filters.selectedTrain) {
        return false;
      }

      // Route filter
      if (filters.selectedRoute !== 'ALL' && j.routeId !== filters.selectedRoute) {
        return false;
      }

      // Station filter
      if (filters.selectedStation !== 'ALL') {
        const hasStation = j.stations.some((s) => s.stationCode === filters.selectedStation);
        if (!hasStation) return false;
      }

      // Free text search
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchTrain = j.trainNumber.toLowerCase().includes(q) || j.trainName.toLowerCase().includes(q);
        const matchRoute = j.routeName.toLowerCase().includes(q);
        const matchStation = j.stations.some(
          (s) => s.stationCode.toLowerCase().includes(q) || s.stationName.toLowerCase().includes(q)
        );
        if (!matchTrain && !matchRoute && !matchStation) return false;
      }

      return true;
    });
  }, [filters]);

  // Handle drill-down filters from cards/tables
  const handleSelectTrain = (trainNumber: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTrain: prev.selectedTrain === trainNumber ? 'ALL' : trainNumber,
    }));
  };

  const handleSelectRoute = (routeId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedRoute: prev.selectedRoute === routeId ? 'ALL' : routeId,
    }));
  };

  const handleSelectStation = (stationCode: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedStation: prev.selectedStation === stationCode ? 'ALL' : stationCode,
    }));
  };

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-6 max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* 1. Page Header with Disclaimer & Export Action */}
      <HistoricalHeader onExportClick={() => setIsExportOpen(true)} />

      {/* 2. Interactive Multi-Parameter Filters Bar */}
      <HistoricalFiltersBar
        filters={filters}
        onFilterChange={setFilters}
        trainOptions={trainOptions}
        routeOptions={routeOptions}
        stationOptions={stationOptions}
        totalFilteredCount={filteredJourneys.length}
      />

      {/* 3. Top Summary KPIs (Dynamically calculated from filtered journeys) */}
      <section aria-labelledby="summary-kpis-heading">
        <h2 id="summary-kpis-heading" className="sr-only">Historical Operational Summary</h2>
        <HistoricalSummaryKPIs journeys={filteredJourneys} />
      </section>

      {/* 4. Trends Visualizations (Delay, ETA error, Punctuality) */}
      <section aria-labelledby="trends-heading">
        <HistoricalTrendsSection />
      </section>

      {/* 5. Coaching Train Performance Table */}
      <section aria-labelledby="train-perf-heading">
        <TrainPerformanceTable
          trainSummaries={TRAIN_HISTORICAL_SUMMARIES}
          onSelectTrain={handleSelectTrain}
          selectedTrainNumber={filters.selectedTrain !== 'ALL' ? filters.selectedTrain : undefined}
        />
      </section>

      {/* 6. Route & Corridor Operational Reliability */}
      <section aria-labelledby="route-perf-heading">
        <RoutePerformanceSection
          routes={ROUTE_HISTORICAL_SUMMARIES}
          onSelectRoute={handleSelectRoute}
          selectedRouteId={filters.selectedRoute !== 'ALL' ? filters.selectedRoute : undefined}
        />
      </section>

      {/* 7. Station & Junction Bottleneck Analysis */}
      <section aria-labelledby="station-analysis-heading">
        <StationBottleneckAnalysis
          stations={STATION_BOTTLENECK_SUMMARIES}
          onSelectStation={handleSelectStation}
          selectedStationCode={filters.selectedStation !== 'ALL' ? filters.selectedStation : undefined}
        />
      </section>

      {/* 8. Recent Evaluated Journeys Log */}
      <section aria-labelledby="recent-journeys-heading">
        <RecentJourneysList
          journeys={filteredJourneys}
          onSelectJourney={(j) => setSelectedJourney(j)}
          selectedJourneyId={selectedJourney?.id}
        />
      </section>

      <Footer />

      {/* Slide-over Journey Detail Inspection Drawer */}
      <HistoricalJourneyDrawer
        journey={selectedJourney}
        isOpen={Boolean(selectedJourney)}
        onClose={() => setSelectedJourney(null)}
      />

      {/* Export Report Modal */}
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </main>
  );
};
