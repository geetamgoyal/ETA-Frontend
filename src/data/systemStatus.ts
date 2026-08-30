import { SystemClusterNode, TelemetryFeed } from '../types/system';

export const MOCK_CLUSTER_NODES: SystemClusterNode[] = [
  { id: 'node-01', name: 'Inference Worker-01 (NCR Primary)', zone: 'North Central', status: 'ONLINE', inferenceLatencyMs: 38, gpuMemoryUtilizationPercent: 62, processedEventsPerSec: 1420 },
  { id: 'node-02', name: 'Inference Worker-02 (NR High-Speed)', zone: 'Northern', status: 'ONLINE', inferenceLatencyMs: 41, gpuMemoryUtilizationPercent: 58, processedEventsPerSec: 1290 },
  { id: 'node-03', name: 'Inference Worker-03 (ER Heavy Freight & Coaching)', zone: 'Eastern', status: 'ONLINE', inferenceLatencyMs: 46, gpuMemoryUtilizationPercent: 71, processedEventsPerSec: 1540 },
  { id: 'node-04', name: 'Inference Worker-04 (ECR Bottleneck Predictor)', zone: 'East Central', status: 'ONLINE', inferenceLatencyMs: 39, gpuMemoryUtilizationPercent: 54, processedEventsPerSec: 1180 },
  { id: 'node-05', name: 'Inference Worker-05 (Standby Failover Cluster)', zone: 'Disaster Recovery', status: 'STANDBY', inferenceLatencyMs: 0, gpuMemoryUtilizationPercent: 8, processedEventsPerSec: 0 },
];

export const MOCK_TELEMETRY_FEEDS: TelemetryFeed[] = [
  { id: 'feed-1', name: 'Locomotive RTIS / GPS SatCom Stream', source: 'ISRO GAGAN NavIC', type: 'GPS', status: 'HEALTHY', latency: '420ms', lastPacketTime: 'Just now' },
  { id: 'feed-2', name: 'Electronic Interlocking (EI) Block Telemetry', source: 'NCR S&T Div', type: 'Signaling / Interlocking', status: 'HEALTHY', latency: '120ms', lastPacketTime: 'Just now' },
  { id: 'feed-3', name: 'Traction SCADA / OHE Voltage Sensors', source: 'Central Grid NCR', type: 'OHE / Traction', status: 'HEALTHY', latency: '250ms', lastPacketTime: '2s ago' },
  { id: 'feed-4', name: 'Doppler Weather & Fog Radar Network', source: 'IMD North India', type: 'Weather Radar', status: 'HEALTHY', latency: '1.2s', lastPacketTime: '5s ago' },
];
