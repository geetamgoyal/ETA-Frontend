import { NetworkNode, NetworkIntelligenceItem } from '../types/network';

export const MOCK_NETWORK_NODES: NetworkNode[] = [
  { code: 'NDLS', name: 'New Delhi', x: 150, y: 150, zone: 'Northern Railway', isJunction: true, activeTrainsCount: 18 },
  { code: 'MTJ', name: 'Mathura Jn', x: 230, y: 180, zone: 'North Central', isJunction: true, activeTrainsCount: 9 },
  { code: 'AGC', name: 'Agra Cantt', x: 280, y: 170, zone: 'North Central', isJunction: true, activeTrainsCount: 12 },
  { code: 'CNB', name: 'Kanpur Central', x: 350, y: 200, zone: 'North Central', isJunction: true, activeTrainsCount: 24 },
  { code: 'PRYJ', name: 'Prayagraj Jn', x: 550, y: 150, zone: 'North Central', isJunction: true, activeTrainsCount: 16 },
  { code: 'BSB', name: 'Varanasi Jn', x: 650, y: 210, zone: 'Northern Railway', isJunction: true, activeTrainsCount: 14 },
  { code: 'PNBE', name: 'Patna Jn', x: 720, y: 180, zone: 'East Central', isJunction: true, activeTrainsCount: 19 },
  { code: 'HWH', name: 'Howrah Jn', x: 750, y: 250, zone: 'Eastern Railway', isJunction: true, activeTrainsCount: 22 },
];

export const MOCK_NETWORK_INTELLIGENCE: NetworkIntelligenceItem[] = [
  {
    id: 'net-1',
    type: 'congestion',
    title: 'High Congestion',
    corridor: 'Kanpur - Prayagraj corridor',
    metrics: [
      { label: 'Utilization', value: '85%' },
      { label: 'Impact', value: '+5 to +21m', isError: true },
    ],
    riskLevel: 'HIGH',
  },
  {
    id: 'net-2',
    type: 'recovery',
    title: 'Delay Recovery',
    corridor: 'Delhi - Agra corridor',
    subtitle: 'Multiple trains recovering',
    metrics: [
      { label: 'Avg recovery:', value: '6 min', isSuccess: true },
    ],
    riskLevel: 'LOW',
  },
  {
    id: 'net-3',
    type: 'alert',
    title: 'Network Alert',
    corridor: 'Unusual stoppage detected',
    subtitle: '1 train stopped near Jhansi',
    metrics: [
      { label: 'Status:', value: 'Under Investigation' },
    ],
    statusText: 'Under Investigation',
  },
];
