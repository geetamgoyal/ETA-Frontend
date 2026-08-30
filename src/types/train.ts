export type TrainStatus = 'On Time' | 'Minor Delay' | 'Critical Delay' | 'Recovering' | 'Good' | 'Warning' | 'Critical' | 'Delayed';

export interface StationStop {
  stationCode: string;
  stationName: string;
  distanceKm: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualOrPredictedArrival: string;
  predictedDelayMinutes: number;
  confidence: number;
  status: 'Departed' | 'Current' | 'Upcoming' | 'Destination' | 'On Time' | 'Minor Risk' | 'Moderate Risk' | 'Low Risk' | 'Stable';
  platform?: string;
  haltMinutes?: number;
}

export interface FactorBreakdown {
  initialDelayMinutes: number;
  speedRecoveryMinutes: number;
  routeCongestionMinutes: number;
  historicalPatternsMinutes: number;
  scheduledHaltStatus: string;
  finalForecastDelayMinutes: number;
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  type: 'Rajdhani' | 'Shatabdi' | 'Gatimaan' | 'Vande Bharat' | 'Duronto' | 'Mail/Express';
  source: string;
  destination: string;
  currentLocation: string;
  nextStation: string;
  platform?: string;
  currentSpeedKmH: number;
  maxSpeedKmH: number;
  currentDelayMinutes: number;
  previousEta: string;
  aiPredictedEta: string;
  confidencePercent: number;
  status: TrainStatus;
  zone: string;
  routeCoordinates?: { x: number; y: number };
  totalDistanceKm: number;
  remainingDistanceKm: number;
  journeyProgressPercent: number;
  expectedEtaRange: { min: string; max: string };
  factors?: FactorBreakdown;
  stations: StationStop[];
  recentEvents?: {
    id: string;
    timestamp: string;
    description: string;
    type: 'departure' | 'recovery' | 'slowdown' | 'halt';
  }[];
}
