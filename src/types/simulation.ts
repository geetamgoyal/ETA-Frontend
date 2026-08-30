export interface SimulationParameters {
  trainId: string;
  scenarioType: 'signal_failure' | 'track_maintenance' | 'weather_disruption' | 'speed_boost' | 'priority_overtake';
  impactZone: string;
  intensityMinutes: number;
}

export interface SimulationResult {
  trainName: string;
  originalEta: string;
  simulatedEta: string;
  delayDeltaMinutes: number;
  confidenceScore: number;
  impactSummary: string;
  affectedDownstreamTrains: number;
}
