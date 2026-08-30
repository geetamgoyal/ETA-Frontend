import React from 'react';
import { MOCK_CLUSTER_NODES, MOCK_TELEMETRY_FEEDS } from '../data/systemStatus';
import { Footer } from '../components/layout/Footer';

export const SystemStatusPage: React.FC = () => {
  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            System Status & Telemetry Pipelines
          </h2>
          <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
            Real-time health monitoring of AI neural inference clusters, GPS feeds and interlocking telemetry
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#ecfdf5] text-[#059669] px-3 py-1.5 rounded-full border border-[#a7f3d0] font-label-md text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>

      {/* Cluster Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Cluster Availability
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-display-lg text-3xl font-black text-primary font-mono-data">99.98%</span>
          </div>
          <span className="text-xs text-accent-green font-semibold mt-1">0 failover events in 30d</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Inference Latency (p95)
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-display-lg text-3xl font-black text-secondary font-mono-data">41 ms</span>
          </div>
          <span className="text-xs text-secondary font-semibold mt-1">Real-time model vector sync</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Active GPS Streams
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-display-lg text-3xl font-black text-on-surface font-mono-data">128</span>
          </div>
          <span className="text-xs text-on-surface-variant mt-1">100% locos emitting NavIC signal</span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Model Deployment
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-headline-sm text-lg font-black text-primary font-mono-data">
              v4.2.0-rf-coaching
            </span>
          </div>
          <span className="text-xs text-on-surface-variant mt-1">Deployed Aug 2026 • Hot reload verified</span>
        </div>
      </div>

      {/* Inference Worker Nodes Table */}
      <div className="bg-white rounded-xl shadow-ambient border border-outline-variant/30 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
          <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">memory</span>
            AI Neural Inference Cluster Nodes
          </h3>
          <span className="text-xs font-mono-data text-on-surface-variant">5 Nodes Provisioned</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3 px-4">Node Identifier</th>
                <th className="py-3 px-4">Operational Zone</th>
                <th className="py-3 px-4">Cluster Status</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">GPU Memory</th>
                <th className="py-3 px-4">Events / Sec</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs font-body-md">
              {MOCK_CLUSTER_NODES.map((node) => (
                <tr key={node.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3.5 px-4 font-bold text-primary font-mono-data">{node.name}</td>
                  <td className="py-3.5 px-4 text-on-surface font-medium">{node.zone}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                        node.status === 'ONLINE'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {node.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-data font-semibold text-secondary">
                    {node.inferenceLatencyMs > 0 ? `${node.inferenceLatencyMs} ms` : 'Standby'}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: `${node.gpuMemoryUtilizationPercent}%` }}
                        ></div>
                      </div>
                      <span className="font-mono-data">{node.gpuMemoryUtilizationPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono-data font-semibold text-on-surface">
                    {node.processedEventsPerSec > 0 ? `${node.processedEventsPerSec} eps` : 'Idle'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Telemetry Feeds Table */}
      <div className="bg-white rounded-xl shadow-ambient border border-outline-variant/30 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
          <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">sensors</span>
            Railway Telemetry Ingestion Feeds
          </h3>
          <span className="text-xs font-mono-data text-on-surface-variant">Active Pipelines</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3 px-4">Feed Source</th>
                <th className="py-3 px-4">Provider / Authority</th>
                <th className="py-3 px-4">Data Type</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4">Stream Latency</th>
                <th className="py-3 px-4">Last Ingestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs font-body-md">
              {MOCK_TELEMETRY_FEEDS.map((feed) => (
                <tr key={feed.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3.5 px-4 font-bold text-primary">{feed.name}</td>
                  <td className="py-3.5 px-4 text-on-surface">{feed.source}</td>
                  <td className="py-3.5 px-4 font-semibold text-secondary">{feed.type}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 bg-[#ccfbf1] text-[#0f766e] border border-[#99f6e4] px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]"></span>
                      {feed.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-data font-semibold text-on-surface">
                    {feed.latency}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant font-mono-data">
                    {feed.lastPacketTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </main>
  );
};
