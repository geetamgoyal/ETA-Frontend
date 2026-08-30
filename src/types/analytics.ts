export interface DelayTrendPoint {
  day: string;
  currentWeekMinutes: number;
  previousWeekMinutes: number;
}

export interface CorridorPerformance {
  id: string;
  corridor: string;
  trainsCount: number;
  averageDelayMinutes: number;
  onTimeRatePercent: number;
  riskStatus: 'High Risk' | 'Moderate' | 'Low';
  trend: 'Increasing' | 'Improving' | 'Stable';
}

export interface DelayDistributionItem {
  range: string;
  percentage: number;
  colorClass: string;
}

export interface AnalyticsSummary {
  avgNetworkDelayMinutes: number;
  avgDelayChangePercent: number;
  onTimePerformancePercent: number;
  onTimePerformanceChangePercent: number;
  aiEtaAccuracyPercent: number;
  aiEtaAccuracyChangePercent: number;
  trainsAnalyzedCount: number;
  totalOnTime: number;
  totalMinorDelay: number;
  totalCriticalDelay: number;
}
