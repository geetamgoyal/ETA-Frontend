import React, { useState } from 'react';
import { useTrains } from '../context/TrainContext';
import { ETAAnalyticsHeader, TimeframeRange } from '../components/analytics/ETAAnalyticsHeader';
import { ModelPerformanceCards } from '../components/analytics/ModelPerformanceCards';
import { PredictedVsActualChart } from '../components/analytics/PredictedVsActualChart';
import { PredictionErrorDistChart } from '../components/analytics/PredictionErrorDistChart';
import { DelayDistributionSection } from '../components/analytics/DelayDistributionSection';
import { RoutePerformanceTable } from '../components/analytics/RoutePerformanceTable';
import { PredictionFactorsExplainer } from '../components/analytics/PredictionFactorsExplainer';
import { ExportReportModal } from '../components/common/ExportReportModal';
import { Footer } from '../components/layout/Footer';

export const AnalyticsPage: React.FC = () => {
  const { trains } = useTrains();
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeRange>('Today');
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-6 max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* 1. Page Header & Time Filter */}
      <ETAAnalyticsHeader
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
        onExportClick={() => setIsExportOpen(true)}
      />

      {/* 2. Model Performance Metrics (MAE, RMSE, Bias, Timetable Deviation) */}
      <section aria-labelledby="model-performance-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="model-performance-heading" className="text-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            Model Validation &amp; Accuracy Metrics
          </h2>
          <span className="text-[11px] text-on-surface-variant font-medium">
            Active evaluation window: <strong className="text-on-surface font-semibold">{selectedTimeframe}</strong>
          </span>
        </div>
        <ModelPerformanceCards timeframe={selectedTimeframe} trains={trains} />
      </section>

      {/* 3. Visual Charts Grid: Predicted vs Actual Scatter (60%) + Error Distribution (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" aria-label="Prediction Accuracy Visualizations">
        <div className="lg:col-span-7">
          <PredictedVsActualChart timeframe={selectedTimeframe} />
        </div>
        <div className="lg:col-span-5">
          <PredictionErrorDistChart timeframe={selectedTimeframe} />
        </div>
      </section>

      {/* 4. Live Operational Delay Distribution */}
      <section aria-labelledby="delay-dist-heading">
        <DelayDistributionSection />
      </section>

      {/* 5. Corridor / Route Performance Intelligence */}
      <section aria-labelledby="route-perf-heading">
        <RoutePerformanceTable />
      </section>

      {/* 6. Grounded Prediction Factors & Mathematical Aggregation */}
      <section aria-labelledby="factors-explainer-heading">
        <PredictionFactorsExplainer />
      </section>

      <Footer />

      {/* Export Report Modal */}
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </main>
  );
};

