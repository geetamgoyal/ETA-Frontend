export interface NetworkNode {
  code: string;
  name: string;
  x: number;
  y: number;
  zone: string;
  isJunction: boolean;
  activeTrainsCount?: number;
}

export interface NetworkRouteSegment {
  from: string;
  to: string;
  lengthKm: number;
  utilizationPercent: number;
  status: 'normal' | 'congested' | 'recovery';
}

export interface NetworkIntelligenceItem {
  id: string;
  type: 'congestion' | 'recovery' | 'alert';
  title: string;
  corridor: string;
  subtitle?: string;
  metrics: {
    label: string;
    value: string;
    isError?: boolean;
    isSuccess?: boolean;
  }[];
  riskLevel?: 'HIGH' | 'MODERATE' | 'LOW';
  statusText?: string;
}
