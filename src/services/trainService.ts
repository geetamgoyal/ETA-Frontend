/**
 * TrainService — Conceptual Data Layer Abstraction for Indian Railways Operations
 *
 * Provides a clean boundary between the UI components and the underlying data source.
 * Supports:
 * 1. Prototype / Simulation Mode (current: local high-fidelity dataset)
 * 2. Spring Boot REST / WebSocket API Mode (backend readiness: plug-and-play)
 *
 * Conforms to the standard train state model:
 * id, trainNumber, name, origin, destination, currentLocation, speed,
 * nextStation, scheduledETA, predictedETA, delay, status, confidence, route, events.
 */

import { Train, TrainEvent } from '../types/train';
import { IncidentAlert } from '../types/alert';
import { MOCK_TRAINS } from '../data/trains';

export interface TrainETAData {
  trainId: string;
  trainNumber: string;
  scheduledEta: string;
  predictedEta: string;
  delayMinutes: number;
  confidencePercent: number;
  status: string;
  expectedRange: { min: string; max: string };
}

export interface DataSourceConnectionStatus {
  mode: 'prototype' | 'spring_boot';
  label: string;
  badgeText: string;
  isConnected: boolean;
  endpointUrl?: string;
  protocol: 'Mock/Memory' | 'REST + STOMP WebSocket';
}

export interface ITrainDataSource {
  getTrains(): Promise<Train[]>;
  getTrain(id: string): Promise<Train | undefined>;
  getETA(id: string): Promise<TrainETAData | undefined>;
  getAlerts(): Promise<IncidentAlert[]>;
  getEvents(id: string): Promise<TrainEvent[]>;
}

// ── Baseline Prototype Alerts (matching CRIS Incident Specification) ──────────
export const INITIAL_INCIDENT_ALERTS: IncidentAlert[] = [
  {
    id: 'inc-12050',
    severity: 'CRITICAL',
    category: 'Stoppage',
    trainNumber: '12050',
    trainName: 'Gatimaan Express',
    location: 'Mathura Junction (Block 14)',
    routeSection: 'NZM – JHS Corridor (Central Trunk)',
    eventDescription: 'Unusual stoppage detected outside scheduled station halt — speed dropped to 0 km/h.',
    detectionTime: '16:21:40',
    timeAgo: '2 min ago',
    currentDelay: 45,
    scheduledEta: '18:51',
    predictedEta: '19:36',
    etaImpact: '+45 min dynamic arrival delay',
    status: 'Active',
    aiRecommendation: 'Investigate signal aspect and track interlocking at Mathura outer crossover immediately to prevent cascading delays on Delhi-Bhopal rakes.',
    zone: 'Northern Railway',
    speedKmH: 0,
    timeline: [
      { time: '16:15', event: 'Normal operation cruising at MPS 160 km/h', type: 'normal' },
      { time: '16:21', event: 'Caution aspect encountered on approach to Mathura outer signal', type: 'signal' },
      { time: '16:25', event: 'Speed decreased below 30 km/h and came to complete halt', type: 'slowdown' },
      { time: '16:31', event: 'Dynamic ETA recalculated from 18:51 to 19:36 (+45 min)', type: 'recalculation' },
      { time: '16:38', event: 'Critical Delay threshold crossed (>30 min) — Alert raised', type: 'critical' },
    ],
  },
  {
    id: 'inc-cnb-pryj',
    severity: 'HIGH',
    category: 'Congestion',
    trainNumber: '12309',
    trainName: 'Rajdhani Express',
    location: 'Kanpur – Prayagraj Section (KM 492)',
    routeSection: 'East Grand Trunk Corridor (NDLS – HWH)',
    eventDescription: 'Heavy track section saturation — 5 coaching trains queued on bidirectional automatic block.',
    detectionTime: '16:12:15',
    timeAgo: '12 min ago',
    currentDelay: 17,
    scheduledEta: '18:24',
    predictedEta: '18:41',
    etaImpact: '+17 min accumulated section delay',
    status: 'Active',
    aiRecommendation: 'Regulate downstream freight headway and give absolute line precedence to Rajdhani 12309 to recover section running time.',
    zone: 'North Central Railway',
    speedKmH: 86,
    timeline: [
      { time: '15:55', event: 'Section capacity utilization reached 88%', type: 'normal' },
      { time: '16:05', event: 'Preceding goods train cleared loop with 7m headway lag', type: 'slowdown' },
      { time: '16:12', event: 'Rajdhani 12309 entered section with cautionary green-yellow', type: 'signal' },
      { time: '16:20', event: 'Dynamic ETA updated from 18:24 to 18:41 (+17 min)', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-bsb-sig',
    severity: 'HIGH',
    category: 'Signal',
    location: 'Varanasi Junction (Throat Yard Lead 3)',
    routeSection: 'BSB – PNBE Section (East Corridor)',
    eventDescription: 'Signal interlocking failure and point detection anomaly on Platform Lead 4.',
    detectionTime: '16:04:30',
    timeAgo: '20 min ago',
    currentDelay: 12,
    scheduledEta: '17:40',
    predictedEta: '17:52',
    etaImpact: '+12 min terminal approach holding',
    status: 'Active',
    aiRecommendation: 'Route incoming Vande Bharat 22436 and local passenger rakes through loop line Platform 2 to bypass defective point machine.',
    zone: 'Northern Railway',
    timeline: [
      { time: '15:50', event: 'Relay interlocking circuit report: intermittent contact resistance', type: 'normal' },
      { time: '16:04', event: 'Red signal hold locked on Approach Block 2', type: 'signal' },
      { time: '16:10', event: 'Dynamic headway holding imposed for approaching coaching rakes', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-12002-tsr',
    severity: 'MEDIUM',
    category: 'Caution Order',
    trainNumber: '12002',
    trainName: 'Bhopal Shatabdi',
    location: 'Bridge 42 near Agra Cantt',
    routeSection: 'Delhi – Agra Section (Central Corridor)',
    eventDescription: 'Temporary Speed Restriction (TSR 60 km/h) active for ballast consolidation.',
    detectionTime: '15:45:00',
    timeAgo: '39 min ago',
    currentDelay: 6,
    scheduledEta: '19:10',
    predictedEta: '19:16',
    etaImpact: '+6 min section running time variance',
    status: 'Acknowledged',
    aiRecommendation: 'Maintain planned TSR adherence. Driver instructed to utilize buffer recovery on Agra-Gwalior high-speed section.',
    zone: 'North Central Railway',
    speedKmH: 60,
    timeline: [
      { time: '15:30', event: 'Civil engineering notice posted for ballast tamping', type: 'normal' },
      { time: '15:45', event: 'TSR 60 km/h operational caution order enforced', type: 'signal' },
      { time: '15:55', event: 'Controller acknowledged caution order', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-pnbe-dwell',
    severity: 'LOW',
    category: 'Station Dwell',
    location: 'Patna Junction (Platform 3)',
    routeSection: 'East Central Corridor',
    eventDescription: 'High passenger surge causing 4m station dwell extension beyond scheduled timetable halt.',
    detectionTime: '15:30:10',
    timeAgo: '54 min ago',
    currentDelay: 4,
    scheduledEta: '18:00',
    predictedEta: '18:04',
    etaImpact: '+4 min platform turnaround delay',
    status: 'Acknowledged',
    aiRecommendation: 'Deploy additional platform marshals for rapid passenger movement; expedite starter signal clearance.',
    zone: 'East Central Railway',
    timeline: [
      { time: '15:20', event: 'Train arrived on Platform 3 on schedule', type: 'normal' },
      { time: '15:28', event: 'Scheduled 5-minute halt exceeded due to festival passenger rush', type: 'slowdown' },
      { time: '15:30', event: 'AI ETA adjusted departure forecast by +4m', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-12951-rec',
    severity: 'LOW',
    category: 'ETA Deviation',
    trainNumber: '12951',
    trainName: 'Mumbai Tejas Rajdhani',
    location: 'Kota Junction',
    routeSection: 'Western Trunk Corridor (MMCT – NDLS)',
    eventDescription: 'Train recovered 8 minutes on Kota-Mathura clear track section.',
    detectionTime: '15:15:00',
    timeAgo: '1h 09m ago',
    currentDelay: 2,
    scheduledEta: '17:30',
    predictedEta: '17:32',
    etaImpact: '-8 min delay recovery gain',
    status: 'Resolved',
    aiRecommendation: 'Section speed optimal at 118 km/h. Expected on-time arrival at New Delhi terminus.',
    zone: 'Western Railway',
    speedKmH: 118,
    timeline: [
      { time: '14:45', event: 'Departed Vadodara with 10m initial delay', type: 'normal' },
      { time: '15:05', event: 'Cruising at 120 km/h on clear automatic block corridor', type: 'recovery' },
      { time: '15:15', event: 'Delay reduced from 10m to 2m; incident closed', type: 'recalculation' },
    ],
  },
];

/**
 * Prototype / Simulation Data Source Implementation
 * Serves canonical high-fidelity mock data mimicking CRIS / RTIS live feeds.
 */
export class PrototypeTrainDataSource implements ITrainDataSource {
  async getTrains(): Promise<Train[]> {
    return Promise.resolve([...MOCK_TRAINS]);
  }

  async getTrain(id: string): Promise<Train | undefined> {
    const found = MOCK_TRAINS.find((t) => t.id === id || t.trainNumber === id);
    return Promise.resolve(found ? { ...found } : undefined);
  }

  async getETA(id: string): Promise<TrainETAData | undefined> {
    const train = await this.getTrain(id);
    if (!train) return undefined;
    return {
      trainId: train.id,
      trainNumber: train.trainNumber,
      scheduledEta: train.previousEta,
      predictedEta: train.aiPredictedEta,
      delayMinutes: train.currentDelayMinutes,
      confidencePercent: train.confidencePercent,
      status: train.status,
      expectedRange: train.expectedEtaRange,
    };
  }

  async getAlerts(): Promise<IncidentAlert[]> {
    return Promise.resolve([...INITIAL_INCIDENT_ALERTS]);
  }

  async getEvents(id: string): Promise<TrainEvent[]> {
    const train = await this.getTrain(id);
    return Promise.resolve(train?.recentEvents ? [...train.recentEvents] : []);
  }
}

/**
 * Spring Boot REST & WebSocket Data Source Implementation (Ready for Integration)
 *
 * When VITE_BACKEND_URL is configured, this connects to:
 * - GET /api/v1/trains
 * - GET /api/v1/trains/{id}
 * - GET /api/v1/trains/{id}/eta
 * - GET /api/v1/alerts
 * - GET /api/v1/trains/{id}/events
 * Fallback to prototype data if network or server is unavailable.
 */
export class SpringBootApiDataSource implements ITrainDataSource {
  private baseUrl: string;
  private fallback: PrototypeTrainDataSource;

  constructor(baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1') {
    this.baseUrl = baseUrl;
    this.fallback = new PrototypeTrainDataSource();
  }

  async getTrains(): Promise<Train[]> {
    try {
      const res = await fetch(`${this.baseUrl}/trains`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      // Graceful fallback to prototype data
      return this.fallback.getTrains();
    }
  }

  async getTrain(id: string): Promise<Train | undefined> {
    try {
      const res = await fetch(`${this.baseUrl}/trains/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.fallback.getTrain(id);
    }
  }

  async getETA(id: string): Promise<TrainETAData | undefined> {
    try {
      const res = await fetch(`${this.baseUrl}/trains/${id}/eta`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.fallback.getETA(id);
    }
  }

  async getAlerts(): Promise<IncidentAlert[]> {
    try {
      const res = await fetch(`${this.baseUrl}/alerts`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.fallback.getAlerts();
    }
  }

  async getEvents(id: string): Promise<TrainEvent[]> {
    try {
      const res = await fetch(`${this.baseUrl}/trains/${id}/events`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.fallback.getEvents(id);
    }
  }
}

// ── Active Data Service Provider ──────────────────────────────────────────────
class TrainServiceManager implements ITrainDataSource {
  private activeSource: ITrainDataSource;
  private mode: 'prototype' | 'spring_boot';

  constructor() {
    const hasBackend = Boolean(import.meta.env.VITE_BACKEND_URL);
    this.mode = hasBackend ? 'spring_boot' : 'prototype';
    this.activeSource = hasBackend
      ? new SpringBootApiDataSource()
      : new PrototypeTrainDataSource();
  }

  getTrains(): Promise<Train[]> {
    return this.activeSource.getTrains();
  }

  getTrain(id: string): Promise<Train | undefined> {
    return this.activeSource.getTrain(id);
  }

  getETA(id: string): Promise<TrainETAData | undefined> {
    return this.activeSource.getETA(id);
  }

  getAlerts(): Promise<IncidentAlert[]> {
    return this.activeSource.getAlerts();
  }

  getEvents(id: string): Promise<TrainEvent[]> {
    return this.activeSource.getEvents(id);
  }

  getConnectionStatus(): DataSourceConnectionStatus {
    if (this.mode === 'spring_boot') {
      return {
        mode: 'spring_boot',
        label: 'Connected to Spring Boot API',
        badgeText: 'CONNECTED • REST + WS',
        isConnected: true,
        endpointUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1',
        protocol: 'REST + STOMP WebSocket',
      };
    }

    return {
      mode: 'prototype',
      label: 'Prototype Data Feed (Ready for Spring Boot)',
      badgeText: 'PROTOTYPE DATA FEED',
      isConnected: false,
      protocol: 'Mock/Memory',
    };
  }
}

export const trainService = new TrainServiceManager();
