export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'WARNING' | 'RECOVERY' | 'NETWORK' | 'INFO';

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
