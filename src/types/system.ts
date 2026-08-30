export interface SystemClusterNode {
  id: string;
  name: string;
  zone: string;
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
  inferenceLatencyMs: number;
  gpuMemoryUtilizationPercent: number;
  processedEventsPerSec: number;
}

export interface TelemetryFeed {
  id: string;
  name: string;
  source: string;
  type: 'GPS' | 'Signaling / Interlocking' | 'OHE / Traction' | 'Weather Radar';
  status: 'HEALTHY' | 'SYNCING' | 'WARN';
  latency: string;
  lastPacketTime: string;
}
