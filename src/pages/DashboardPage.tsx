import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrains } from '../context/TrainContext';
import { OperationalKPIs } from '../components/dashboard/OperationalKPIs';
import { NetworkSchematicMap } from '../components/dashboard/NetworkSchematicMap';
import { ActiveTrainsTable } from '../components/dashboard/ActiveTrainsTable';
import { LiveAlertsPanel } from '../components/dashboard/LiveAlertsPanel';
import { ETAForecastSummary, NetworkStatusPanel } from '../components/dashboard/ETAAndNetworkPanels';
import { TrainDetailDrawer } from '../components/dashboard/TrainDetailDrawer';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { trains, selectedTrainId, setSelectedTrainId, lastUpdatedAt, isSimulating } = useTrains();
  const [drawerTrainId, setDrawerTrainId] = useState<string | null>(null);

  // Select a train — also highlights it on the map
  const handleSelectTrain = useCallback(
    (id: string) => {
      setSelectedTrainId(id);
      setDrawerTrainId(id);
    },
    [setSelectedTrainId],
  );

  const handleCloseDrawer = useCallback(() => {
    setDrawerTrainId(null);
  }, []);

  const drawerTrain = trains.find((t) => t.id === drawerTrainId) ?? null;

  // Format last-updated time
  const lastUpdStr = lastUpdatedAt
    ? lastUpdatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—';

  // Aggregate counts for header band
  const criticalCount = trains.filter((t) => t.currentDelayMinutes > 20).length;
  const delayedCount  = trains.filter((t) => t.currentDelayMinutes > 2).length;

  return (
    <main className="flex flex-col flex-1 min-h-0 max-w-[1600px] mx-auto w-full">
      {/* ── Page Header Band ────────────────────────────────────────────── */}
      <div className="px-4 md:px-margin pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 bg-surface-container-lowest/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">radar</span>
            <h1 className="text-headline-md font-bold text-on-surface">Operations Dashboard</h1>
            {/* Live indicator */}
            {isSimulating && (
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-subtle" />
                SIMULATION FEED
              </div>
            )}
          </div>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Dynamic ETA Forecast · North &amp; Central India Rail Network · Prototype Demo
          </p>
        </div>

        {/* Right: status chips */}
        <div className="flex items-center gap-3 flex-wrap">
          {criticalCount > 0 && (
            <button
              onClick={() => navigate('/alerts')}
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-status-critical border border-status-critical-border px-2.5 py-1 rounded-full animate-pulse-subtle"
            >
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {criticalCount} Critical
            </button>
          )}
          {delayedCount > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-status-warn-text bg-status-warn-bg px-2.5 py-1 rounded-full border border-status-warn-border">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {delayedCount} Delayed
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/40">
            <span className="material-symbols-outlined text-[14px]">history</span>
            Updated {lastUpdStr}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/40">
            <span className="material-symbols-outlined text-[14px] text-status-ok">train</span>
            {trains.length} Active Trains
          </div>
        </div>
      </div>

      {/* ── Main Scrollable Content ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 md:px-margin py-4 flex flex-col gap-4 pb-8">

          {/* SECTION 1: Operational KPIs ────────────────────────────────── */}
          <section aria-label="Operational KPIs">
            <OperationalKPIs />
          </section>

          {/* SECTION 2+4: Network Map + Alerts (side by side) ──────────── */}
          <section
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            aria-label="Network map and alerts"
          >
            {/* Network Map — 2/3 width */}
            <div
              className="lg:col-span-2 rounded-lg overflow-hidden border border-[#1e3d57] flex flex-col"
              style={{ background: '#060f1a', minHeight: 360 }}
            >
              {/* Map top strip */}
              <NetworkSchematicMap
                selectedTrainId={selectedTrainId}
                onSelectTrain={handleSelectTrain}
              />
            </div>

            {/* Live Alerts — 1/3 width */}
            <div className="lg:col-span-1" style={{ minHeight: 360 }}>
              <LiveAlertsPanel onSelectTrain={handleSelectTrain} />
            </div>
          </section>

          {/* SECTION 3: Active Trains Table ─────────────────────────────── */}
          <section aria-label="Active trains table">
            <ActiveTrainsTable
              selectedTrainId={selectedTrainId}
              onSelectTrain={handleSelectTrain}
            />
          </section>

          {/* SECTION 5+6: ETA Summary + Network Status ──────────────────── */}
          <section
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            aria-label="ETA forecast summary and network status"
          >
            <div className="lg:col-span-2">
              <ETAForecastSummary />
            </div>
            <div className="lg:col-span-1">
              <NetworkStatusPanel />
            </div>
          </section>

          {/* Footer note */}
          <div className="flex items-center justify-center py-2">
            <p className="text-[10px] text-on-surface-variant text-center max-w-lg">
              <strong>Prototype Demo</strong> — Data shown is simulated for SIH demonstration purposes.
              AI ETA predictions update every 20 seconds. Simulation feed is active.
            </p>
          </div>

        </div>
      </div>

      {/* Train Detail Drawer (portal-style, fixed position) */}
      <TrainDetailDrawer train={drawerTrain} onClose={handleCloseDrawer} />
    </main>
  );
};
