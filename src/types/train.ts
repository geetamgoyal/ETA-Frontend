// ── Train Status ─────────────────────────────────────────────────────────────
export type TrainStatus =
  | 'On Time'
  | 'Minor Delay'
  | 'Critical Delay'
  | 'Recovering'
  | 'Good'
  | 'Warning'
  | 'Critical'
  | 'Delayed';

// ── Station Stop ─────────────────────────────────────────────────────────────
export interface StationStop {
  stationCode: string;
  stationName: string;
  distanceKm: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualOrPredictedArrival: string;
  predictedDelayMinutes: number;
  confidence: number;
  status:
    | 'Departed'
    | 'Current'
    | 'Upcoming'
    | 'Destination'
    | 'On Time'
    | 'Minor Risk'
    | 'Moderate Risk'
    | 'Low Risk'
    | 'Stable';
  platform?: string;
  haltMinutes?: number;
}

// ── AI Factor Breakdown ───────────────────────────────────────────────────────
export interface FactorBreakdown {
  initialDelayMinutes: number;
  speedRecoveryMinutes: number;
  routeCongestionMinutes: number;
  historicalPatternsMinutes: number;
  scheduledHaltStatus: string;
  finalForecastDelayMinutes: number;
}

// ── ETA History Point (for time-series chart) ────────────────────────────────
export interface EtaHistoryPoint {
  /** e.g. "12:30", "14:45" */
  timestamp: string;
  /** Predicted ETA at that time, e.g. "19:36" */
  predictedEta: string;
  /** Delay in minutes at that time */
  delayMinutes: number;
  /** Confidence score at that time (0-100) */
  confidence: number;
}

// ── Recent Event ──────────────────────────────────────────────────────────────
export interface TrainEvent {
  id: string;
  timestamp: string;
  description: string;
  type: 'departure' | 'recovery' | 'slowdown' | 'halt' | 'update';
}

// ── Train (main entity) ───────────────────────────────────────────────────────
export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  type: 'Rajdhani' | 'Shatabdi' | 'Gatimaan' | 'Vande Bharat' | 'Duronto' | 'Mail/Express';

  // Route
  source: string;
  destination: string;
  zone: string;
  direction?: string; // e.g. "Down (NDLS → HWH)"

  // Current State
  currentLocation: string;
  nextStation: string;
  distanceToNextStationKm?: number;
  platform?: string;
  currentSpeedKmH: number;
  maxSpeedKmH: number;
  operationalStatusText?: string; // e.g. "Running with predicted delay"

  // Delay & ETA
  currentDelayMinutes: number;
  previousEta: string;
  aiPredictedEta: string;
  confidencePercent: number;
  status: TrainStatus;
  expectedEtaRange: { min: string; max: string };

  // Journey Progress
  totalDistanceKm: number;
  remainingDistanceKm: number;
  journeyProgressPercent: number;

  // Optional: map position
  routeCoordinates?: { x: number; y: number };

  // AI Factors
  factors?: FactorBreakdown;

  // Station stops
  stations: StationStop[];

  // ETA history for time-series chart [NEW]
  etaHistory: EtaHistoryPoint[];

  // Recent operational events
  recentEvents?: TrainEvent[];

  // Last simulation update timestamp [NEW]
  lastUpdatedAt?: string;
}

// ── Simulation Result ─────────────────────────────────────────────────────────
export interface SimulationResult {
  trainId: string;
  trainName: string;
  originalEta: string;
  simulatedEta: string;
  delayDeltaMinutes: number;
  confidenceScore: number;
  impactSummary: string;
}
