export interface HistoricalStationStop {
  stationCode: string;
  stationName: string;
  scheduledArrival: string;
  actualArrival: string;
  predictedArrival: string;
  scheduledDwellMinutes: number;
  actualDwellMinutes: number;
  delayMinutes: number;
  speedEnteringKmH: number;
}

export interface HistoricalMajorEvent {
  time: string;
  location: string;
  type: 'SIGNAL' | 'SPEED_RESTRICTION' | 'DWELL' | 'CONGESTION' | 'PRECEDENCE';
  description: string;
  delayImpactMinutes: number;
}

export interface HistoricalEtaTick {
  timestamp: string;
  predictedArrival: string;
  delayMinutes: number;
  confidence: number;
}

export interface HistoricalJourney {
  id: string;
  journeyDate: string; // YYYY-MM-DD
  trainNumber: string;
  trainName: string;
  type: string;
  routeId: string;
  routeName: string;
  origin: string;
  destination: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  actualDeparture: string;
  actualArrival: string;
  finalDelayMinutes: number;
  finalEtaErrorMinutes: number; // |actualArrival - predictedArrival|
  onTime: boolean; // finalDelayMinutes <= 2
  confidenceScore: number;
  stations: HistoricalStationStop[];
  majorEvents: HistoricalMajorEvent[];
  etaEvolutionTicks: HistoricalEtaTick[];
}

export interface TrainHistoricalSummary {
  trainNumber: string;
  trainName: string;
  type: string;
  route: string;
  totalJourneys: number;
  onTimePercent: number;
  avgDelayMinutes: number;
  avgEtaErrorMinutes: number;
  status: 'EXCELLENT' | 'GOOD' | 'ATTENTION' | 'CRITICAL';
}

export interface RouteHistoricalSummary {
  routeId: string;
  routeName: string;
  zone: string;
  avgDelayMinutes: number;
  avgEtaErrorMinutes: number;
  affectedJourneys: number;
  totalJourneys: number;
  trend: 'IMPROVING' | 'STABLE' | 'DEGRADING';
  primaryBottleneck: string;
}

export interface StationBottleneckSummary {
  stationCode: string;
  stationName: string;
  zone: string;
  avgDwellMinutes: number;
  scheduledDwellMinutes: number;
  dwellVarianceMinutes: number;
  avgDelayArrivalMinutes: number;
  delayFrequencyPercent: number;
  avgPredictionDeviationMinutes: number;
  throughputRank: string;
  cause: string;
}

export interface DailyTrendPoint {
  date: string;
  label: string;
  avgDelayMinutes: number;
  avgEtaErrorMinutes: number;
  onTimePercent: number;
  totalRuns: number;
}

export type HistoryDateRange = 'Last 24 Hours' | 'Last 7 Days' | 'Last 30 Days';

export interface HistoryFilterState {
  dateRange: HistoryDateRange;
  selectedTrain: string; // 'ALL' | trainNumber
  selectedRoute: string; // 'ALL' | routeId
  selectedStation: string; // 'ALL' | stationCode
  searchQuery: string;
}
