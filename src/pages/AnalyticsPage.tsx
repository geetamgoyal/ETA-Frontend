import React, { useState } from 'react';
import { AnalyticsKPIs } from '../components/analytics/AnalyticsKPIs';
import { NetworkDelayTrendChart } from '../components/analytics/NetworkDelayTrendChart';
import { OnTimePerformanceDonut } from '../components/analytics/OnTimePerformanceDonut';
import { AIEtaAccuracyCard } from '../components/analytics/AIEtaAccuracyCard';
import { DelayDistributionCard } from '../components/analytics/DelayDistributionCard';
import { CorridorPerformanceTable } from '../components/analytics/CorridorPerformanceTable';
import { AIPerformanceInsights } from '../components/analytics/AIPerformanceInsights';
import { ExportReportModal } from '../components/common/ExportReportModal';
import { Footer } from '../components/layout/Footer';

export const AnalyticsPage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Page Header with Timeframe & Export Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            Analytics & Performance Intelligence
          </h2>
          <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
            Analyze network operational efficiency, delay progression trajectories and AI model accuracy
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Timeframe Dropdown */}
          <div className="flex items-center bg-surface border border-outline-variant rounded-lg px-3 py-2 shadow-sm text-xs">
            <span className="material-symbols-outlined text-on-surface-variant mr-1.5 text-[18px]">
              calendar_today
            </span>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent font-semibold text-on-surface outline-none cursor-pointer"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Quarter to Date</option>
            </select>
          </div>

          {/* Export Report CTA */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="bg-primary text-on-primary font-body-md text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <AnalyticsKPIs />

      {/* Row 1: Delay Trend Chart (65%) + On-Time Donut (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-xl">
        <NetworkDelayTrendChart />
        <OnTimePerformanceDonut />
      </div>

      {/* Row 2: AI Accuracy Card (50%) + Delay Distribution Bars (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-xl">
        <AIEtaAccuracyCard />
        <DelayDistributionCard />
      </div>

      {/* Row 3: Corridor Performance Table */}
      <CorridorPerformanceTable />

      {/* Row 4: AI Performance Insights Banner */}
      <AIPerformanceInsights />

      <Footer />

      {/* Export Report Modal */}
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </main>
  );
};
