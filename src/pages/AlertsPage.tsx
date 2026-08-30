import React, { useState } from 'react';
import { AlertsKPIs } from '../components/alerts/AlertsKPIs';
import { ActiveAlertsTable } from '../components/alerts/ActiveAlertsTable';
import { AIAlertIntelligence } from '../components/alerts/AIAlertIntelligence';
import { AlertTimeline } from '../components/alerts/AlertTimeline';
import { OperationalPerfCard } from '../components/alerts/OperationalPerfCard';
import { ConfigureAlertsModal } from '../components/common/ConfigureAlertsModal';
import { Footer } from '../components/layout/Footer';

export const AlertsPage: React.FC = () => {
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            Alerts & Operational Risks
          </h2>
          <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
            AI-powered detection, prioritization and automated mitigation of railway operational anomalies
          </p>
        </div>

        <button
          onClick={() => setIsConfigureOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-label-md text-xs font-bold flex items-center gap-2 transition-all shadow-ambient active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Configure Alerts
        </button>
      </div>

      {/* KPI Cards Grid */}
      <AlertsKPIs />

      {/* Main Split Grid: Table (Left 8 cols) + AI Intelligence (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg mb-lg">
        <div className="lg:col-span-8 flex flex-col gap-lg">
          <ActiveAlertsTable />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-lg">
          <AIAlertIntelligence />
        </div>
      </div>

      {/* Bottom Section: Timeline (8 cols) + Operational Performance Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <div className="lg:col-span-8">
          <AlertTimeline />
        </div>
        <div className="lg:col-span-4">
          <OperationalPerfCard />
        </div>
      </div>

      <Footer />

      {/* Configure Alerts Modal */}
      <ConfigureAlertsModal
        isOpen={isConfigureOpen}
        onClose={() => setIsConfigureOpen(false)}
      />
    </main>
  );
};
