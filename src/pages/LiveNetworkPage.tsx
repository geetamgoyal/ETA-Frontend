import React, { useState } from 'react';
import { LiveTrackingHeader } from '../components/tracking/LiveTrackingHeader';
import { TrainTrackingList } from '../components/tracking/TrainTrackingList';
import { OperationalRailwayMap } from '../components/tracking/OperationalRailwayMap';
import { SelectedTrainTrackingPanel } from '../components/tracking/SelectedTrainTrackingPanel';
import { Footer } from '../components/layout/Footer';

type MobileTab = 'all' | 'list' | 'map' | 'panel';

export const LiveNetworkPage: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<MobileTab>('all');

  return (
    <main className="px-3 sm:px-4 md:px-margin py-5 pb-xl flex-1 flex flex-col gap-4 max-w-[1680px] mx-auto w-full animate-fade-in">
      {/* ── Control Room Operational Header ────────────────────────── */}
      <LiveTrackingHeader />

      {/* ── Mobile / Small Viewport Tab Switcher ────────────────────── */}
      <div className="flex lg:hidden items-center justify-between bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30 text-xs font-bold shadow-xs">
        <button
          onClick={() => setMobileTab('all')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
            mobileTab === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">dashboard</span>
          <span>Workspace</span>
        </button>
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
            mobileTab === 'list'
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
          <span>Trains</span>
        </button>
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
            mobileTab === 'map'
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">map</span>
          <span>Map</span>
        </button>
        <button
          onClick={() => setMobileTab('panel')}
          className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
            mobileTab === 'panel'
              ? 'bg-primary text-white shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">info</span>
          <span>Telemetry</span>
        </button>
      </div>

      {/* ── 3-Column Control-Room Monitoring Workspace ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: Train Monitoring List (3 cols on lg/xl) */}
        <div
          className={`lg:col-span-3 ${
            mobileTab === 'list' || mobileTab === 'all' ? 'block' : 'hidden lg:block'
          }`}
        >
          <TrainTrackingList />
        </div>

        {/* MAIN COLUMN: Large Operational Railway Map (6 cols on lg/xl) */}
        <div
          className={`lg:col-span-6 ${
            mobileTab === 'map' || mobileTab === 'all' ? 'block' : 'hidden lg:block'
          }`}
        >
          <OperationalRailwayMap />
        </div>

        {/* RIGHT COLUMN: Selected Train Telemetry Panel (3 cols on lg/xl) */}
        <div
          className={`lg:col-span-3 ${
            mobileTab === 'panel' || mobileTab === 'all' ? 'block' : 'hidden lg:block'
          }`}
        >
          <SelectedTrainTrackingPanel />
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
};
