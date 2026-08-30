import React from 'react';
import { DashboardKPIs } from '../components/dashboard/DashboardKPIs';
import { NetworkHealthStrip } from '../components/dashboard/NetworkHealthStrip';
import { LiveNetworkMap } from '../components/dashboard/LiveNetworkMap';
import { RecentETAChangesTable } from '../components/dashboard/RecentETAChangesTable';
import { AIEtaInsightsPanel } from '../components/dashboard/AIEtaInsightsPanel';
import { CriticalAlertsPanel } from '../components/dashboard/CriticalAlertsPanel';
import { Footer } from '../components/layout/Footer';

export const DashboardPage: React.FC = () => {
  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface">
            Operations Dashboard
          </h2>
          <p className="font-body-md text-xs text-on-surface-variant hidden md:block mt-0.5">
            Real-time railway monitoring and AI-powered ETA forecasting for coaching trains
          </p>
        </div>
      </div>

      {/* Top 5 KPIs */}
      <DashboardKPIs />

      {/* Network Health Status Strip */}
      <NetworkHealthStrip />

      {/* Main 2-Column Dashboard Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg h-full flex-1">
        {/* Left Column: Live Map + Recent Changes Table */}
        <div className="lg:col-span-2 flex flex-col gap-lg">
          <LiveNetworkMap />
          <RecentETAChangesTable />
        </div>

        {/* Right Column: AI ETA Insights + Critical Alerts */}
        <div className="flex flex-col gap-lg">
          <AIEtaInsightsPanel />
          <CriticalAlertsPanel />
        </div>
      </section>

      {/* Global Status Footer */}
      <Footer />
    </main>
  );
};
