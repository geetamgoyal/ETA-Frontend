import React from 'react';
import { LiveNetworkVisualizer } from '../components/network/LiveNetworkVisualizer';
import { NetworkIntelligenceSidebar } from '../components/network/NetworkIntelligenceSidebar';
import { LiveTrainActivityTable } from '../components/network/LiveTrainActivityTable';
import { Footer } from '../components/layout/Footer';

export const LiveNetworkPage: React.FC = () => {
  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
          Live Network
        </h2>
        <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
          Real-time operational view of active coaching trains across the railway network
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-lg ambient-shadow border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Active Trains
            </span>
            <span className="material-symbols-outlined text-secondary">train</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              128
            </span>
          </div>
          <span className="font-body-md text-xs text-outline mt-2">Across monitored network</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg ambient-shadow border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              On Time
            </span>
            <span className="material-symbols-outlined text-green-600">check_circle</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              82
            </span>
            <div className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
            </div>
          </div>
          <span className="font-body-md text-xs text-outline mt-2">64% of active trains</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg ambient-shadow border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Minor Delays
            </span>
            <span className="material-symbols-outlined text-amber-500">schedule</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              34
            </span>
          </div>
          <span className="font-body-md text-xs text-outline mt-2">Average delay: 12 min</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg ambient-shadow border border-error/30 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <div className="flex justify-between items-start mb-2 pl-2">
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              Critical Risk
            </span>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div className="flex items-baseline gap-2 pl-2">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-error font-mono-data">
              12
            </span>
          </div>
          <span className="font-body-md text-xs text-error mt-2 font-bold pl-2">
            Requires operational attention
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Map (8 cols) + Intelligence (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8">
          <LiveNetworkVisualizer />
        </div>
        <div className="lg:col-span-4">
          <NetworkIntelligenceSidebar />
        </div>
      </div>

      {/* Bottom Train Activity Table */}
      <LiveTrainActivityTable />

      <Footer />
    </main>
  );
};
