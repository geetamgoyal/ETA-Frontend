import { DelayTrendPoint, CorridorPerformance, DelayDistributionItem, AnalyticsSummary } from '../types/analytics';

export const MOCK_ANALYTICS_SUMMARY: AnalyticsSummary = {
  avgNetworkDelayMinutes: 12,
  avgDelayChangePercent: -8.0,
  onTimePerformancePercent: 64,
  onTimePerformanceChangePercent: 5.2,
  aiEtaAccuracyPercent: 94.8,
  aiEtaAccuracyChangePercent: 2.1,
  trainsAnalyzedCount: 128,
  totalOnTime: 82,
  totalMinorDelay: 34,
  totalCriticalDelay: 12,
};

export const MOCK_DELAY_TRENDS: DelayTrendPoint[] = [
  { day: 'Mon', currentWeekMinutes: 14, previousWeekMinutes: 16 },
  { day: 'Tue', currentWeekMinutes: 11, previousWeekMinutes: 15 },
  { day: 'Wed', currentWeekMinutes: 12, previousWeekMinutes: 17 },
  { day: 'Thu', currentWeekMinutes: 8, previousWeekMinutes: 14 },
  { day: 'Fri', currentWeekMinutes: 10, previousWeekMinutes: 16 },
  { day: 'Sat', currentWeekMinutes: 7, previousWeekMinutes: 15 },
  { day: 'Sun', currentWeekMinutes: 8, previousWeekMinutes: 15 },
];

export const MOCK_CORRIDORS: CorridorPerformance[] = [
  {
    id: 'cor-1',
    corridor: 'Kanpur – Prayagraj',
    trainsCount: 24,
    averageDelayMinutes: 18,
    onTimeRatePercent: 48,
    riskStatus: 'High Risk',
    trend: 'Increasing',
  },
  {
    id: 'cor-2',
    corridor: 'Delhi – Agra',
    trainsCount: 31,
    averageDelayMinutes: 9,
    onTimeRatePercent: 72,
    riskStatus: 'Moderate',
    trend: 'Improving',
  },
  {
    id: 'cor-3',
    corridor: 'Varanasi – Patna',
    trainsCount: 19,
    averageDelayMinutes: 14,
    onTimeRatePercent: 58,
    riskStatus: 'High Risk',
    trend: 'Stable',
  },
  {
    id: 'cor-4',
    corridor: 'Mathura – Kanpur',
    trainsCount: 27,
    averageDelayMinutes: 6,
    onTimeRatePercent: 81,
    riskStatus: 'Low',
    trend: 'Improving',
  },
];

export const MOCK_DELAY_DISTRIBUTION: DelayDistributionItem[] = [
  { range: 'On Time', percentage: 64, colorClass: 'bg-secondary' },
  { range: '0–10 min', percentage: 21, colorClass: 'bg-accent-green' },
  { range: '10–30 min', percentage: 10, colorClass: 'bg-accent-orange' },
  { range: '30+ min', percentage: 5, colorClass: 'bg-error' },
];
