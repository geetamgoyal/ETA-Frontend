export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'WARNING' | 'RECOVERY' | 'NETWORK' | 'INFO';

export type IncidentCategory =
  | 'Signal'
  | 'Congestion'
  | 'Stoppage'
  | 'ETA Deviation'
  | 'Station Dwell'
  | 'Caution Order';

export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved';

export interface IncidentTimelineItem {
  time: string;
  event: string;
  type?: 'normal' | 'signal' | 'slowdown' | 'recalculation' | 'critical' | 'recovery';
}

export interface IncidentAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: IncidentCategory;
  trainNumber?: string;
  trainName?: string;
  location: string;
  routeSection: string;
  eventDescription: string;
  detectionTime: string;
  timeAgo: string;
  currentDelay: number;
  scheduledEta: string;
  predictedEta: string;
  etaImpact: string;
  status: AlertStatus;
  aiRecommendation: string;
  timeline: IncidentTimelineItem[];
  zone?: string;
  speedKmH?: number;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
}

export interface OperationalAlert {
  id: string;
  severity: AlertSeverity;
  eventDescription: string;
  trainOrLocation: string;
  trainNumber?: string;
  zone?: string;
  impactStatus: string;
  impactDetails?: string;
  timeAgo: string;
  timestamp: string;
  isResolved?: boolean;
  aiRecommendation?: string;
  actionLabel?: string;
}

export interface AIIntelligenceCard {
  id: string;
  type: 'critical' | 'warning' | 'recovery';
  title: string;
  description: string;
  icon: string;
  actionText?: string;
  trainRef?: string;
}

export interface AlertTimelineEvent {
  id: string;
  title: string;
  minutesAgo: number;
  timeLabel: string;
  type: 'recovery' | 'network' | 'warning' | 'critical';
  description?: string;
}
