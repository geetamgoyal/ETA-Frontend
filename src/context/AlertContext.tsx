import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { IncidentAlert } from '../types/alert';
import { useTrains } from './TrainContext';

interface AlertContextType {
  alerts: IncidentAlert[];
  selectedAlertId: string | null;
  setSelectedAlertId: (id: string | null) => void;
  selectedAlert: IncidentAlert | null;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  addAlert: (alert: Omit<IncidentAlert, 'id'>) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

// Initial baseline mock incident alerts connected to railway corridors
const INITIAL_INCIDENT_ALERTS: IncidentAlert[] = [
  {
    id: 'inc-12050',
    severity: 'CRITICAL',
    category: 'Stoppage',
    trainNumber: '12050',
    trainName: 'Gatimaan Express',
    location: 'Mathura Junction (Block 14)',
    routeSection: 'NZM – JHS Corridor (Central Trunk)',
    eventDescription: 'Unusual stoppage detected outside scheduled station halt — speed dropped to 0 km/h.',
    detectionTime: '16:21:40',
    timeAgo: '2 min ago',
    currentDelay: 45,
    scheduledEta: '18:51',
    predictedEta: '19:36',
    etaImpact: '+45 min dynamic arrival delay',
    status: 'Active',
    aiRecommendation: 'Investigate signal aspect and track interlocking at Mathura outer crossover immediately to prevent cascading delays on Delhi-Bhopal rakes.',
    zone: 'Northern Railway',
    speedKmH: 0,
    timeline: [
      { time: '16:15', event: 'Normal operation cruising at MPS 160 km/h', type: 'normal' },
      { time: '16:21', event: 'Caution aspect encountered on approach to Mathura outer signal', type: 'signal' },
      { time: '16:25', event: 'Speed decreased below 30 km/h and came to complete halt', type: 'slowdown' },
      { time: '16:31', event: 'Dynamic ETA recalculated from 18:51 to 19:36 (+45 min)', type: 'recalculation' },
      { time: '16:38', event: 'Critical Delay threshold crossed (>30 min) — Alert raised', type: 'critical' },
    ],
  },
  {
    id: 'inc-cnb-pryj',
    severity: 'HIGH',
    category: 'Congestion',
    trainNumber: '12309',
    trainName: 'Rajdhani Express',
    location: 'Kanpur – Prayagraj Section (KM 492)',
    routeSection: 'East Grand Trunk Corridor (NDLS – HWH)',
    eventDescription: 'Heavy track section saturation — 5 coaching trains queued on bidirectional automatic block.',
    detectionTime: '16:12:15',
    timeAgo: '12 min ago',
    currentDelay: 17,
    scheduledEta: '18:24',
    predictedEta: '18:41',
    etaImpact: '+17 min accumulated section delay',
    status: 'Active',
    aiRecommendation: 'Regulate downstream freight headway and give absolute line precedence to Rajdhani 12309 to recover section running time.',
    zone: 'North Central Railway',
    speedKmH: 86,
    timeline: [
      { time: '15:55', event: 'Section capacity utilization reached 88%', type: 'normal' },
      { time: '16:05', event: 'Preceding goods train cleared loop with 7m headway lag', type: 'slowdown' },
      { time: '16:12', event: 'Rajdhani 12309 entered section with cautionary green-yellow', type: 'signal' },
      { time: '16:20', event: 'Dynamic ETA updated from 18:24 to 18:41 (+17 min)', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-bsb-sig',
    severity: 'HIGH',
    category: 'Signal',
    location: 'Varanasi Junction (Throat Yard Lead 3)',
    routeSection: 'BSB – PNBE Section (East Corridor)',
    eventDescription: 'Signal interlocking failure and point detection anomaly on Platform Lead 4.',
    detectionTime: '16:04:30',
    timeAgo: '20 min ago',
    currentDelay: 12,
    scheduledEta: '17:40',
    predictedEta: '17:52',
    etaImpact: '+12 min terminal approach holding',
    status: 'Active',
    aiRecommendation: 'Route incoming Vande Bharat 22436 and local passenger rakes through loop line Platform 2 to bypass defective point machine.',
    zone: 'Northern Railway',
    timeline: [
      { time: '15:50', event: 'Relay interlocking circuit report: intermittent contact resistance', type: 'normal' },
      { time: '16:04', event: 'Red signal hold locked on Approach Block 2', type: 'signal' },
      { time: '16:10', event: 'Dynamic headway holding imposed for approaching coaching rakes', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-12002-tsr',
    severity: 'MEDIUM',
    category: 'Caution Order',
    trainNumber: '12002',
    trainName: 'Bhopal Shatabdi',
    location: 'Bridge 42 near Agra Cantt',
    routeSection: 'Delhi – Agra Section (Central Corridor)',
    eventDescription: 'Temporary Speed Restriction (TSR 60 km/h) active for ballast consolidation.',
    detectionTime: '15:45:00',
    timeAgo: '39 min ago',
    currentDelay: 6,
    scheduledEta: '19:10',
    predictedEta: '19:16',
    etaImpact: '+6 min section running time variance',
    status: 'Acknowledged',
    aiRecommendation: 'Maintain planned TSR adherence. Driver instructed to utilize buffer recovery on Agra-Gwalior high-speed section.',
    zone: 'North Central Railway',
    speedKmH: 60,
    timeline: [
      { time: '15:30', event: 'Civil engineering notice posted for ballast tamping', type: 'normal' },
      { time: '15:45', event: 'TSR 60 km/h operational caution order enforced', type: 'signal' },
      { time: '15:55', event: 'Controller acknowledged caution order', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-pnbe-dwell',
    severity: 'LOW',
    category: 'Station Dwell',
    location: 'Patna Junction (Platform 3)',
    routeSection: 'East Central Corridor',
    eventDescription: 'High passenger surge causing 4m station dwell extension beyond scheduled timetable halt.',
    detectionTime: '15:30:10',
    timeAgo: '54 min ago',
    currentDelay: 4,
    scheduledEta: '18:00',
    predictedEta: '18:04',
    etaImpact: '+4 min platform turnaround delay',
    status: 'Acknowledged',
    aiRecommendation: 'Deploy additional platform marshals for rapid passenger movement; expedite starter signal clearance.',
    zone: 'East Central Railway',
    timeline: [
      { time: '15:20', event: 'Train arrived on Platform 3 on schedule', type: 'normal' },
      { time: '15:28', event: 'Scheduled 5-minute halt exceeded due to festival passenger rush', type: 'slowdown' },
      { time: '15:30', event: 'AI ETA adjusted departure forecast by +4m', type: 'recalculation' },
    ],
  },
  {
    id: 'inc-12951-rec',
    severity: 'LOW',
    category: 'ETA Deviation',
    trainNumber: '12951',
    trainName: 'Mumbai Tejas Rajdhani',
    location: 'Kota Junction',
    routeSection: 'Western Trunk Corridor (MMCT – NDLS)',
    eventDescription: 'Train recovered 8 minutes on Kota-Mathura clear track section.',
    detectionTime: '15:15:00',
    timeAgo: '1h 09m ago',
    currentDelay: 2,
    scheduledEta: '17:30',
    predictedEta: '17:32',
    etaImpact: '-8 min delay recovery gain',
    status: 'Resolved',
    aiRecommendation: 'Section speed optimal at 118 km/h. Expected on-time arrival at New Delhi terminus.',
    zone: 'Western Railway',
    speedKmH: 118,
    timeline: [
      { time: '14:45', event: 'Departed Vadodara with 10m initial delay', type: 'normal' },
      { time: '15:05', event: 'Cruising at 120 km/h on clear automatic block corridor', type: 'recovery' },
      { time: '15:15', event: 'Delay reduced from 10m to 2m; incident closed', type: 'recalculation' },
    ],
  },
];

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trains } = useTrains();
  const [alertsState, setAlertsState] = useState<IncidentAlert[]>(INITIAL_INCIDENT_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>('inc-12050');

  // Synchronize alerts with live train state from TrainContext
  const alerts = useMemo(() => {
    return alertsState.map((alert) => {
      if (!alert.trainNumber) return alert;

      const liveTrain = trains.find((t) => t.trainNumber === alert.trainNumber);
      if (!liveTrain) return alert;

      // Dynamically update fields from live train telemetry
      const delay = liveTrain.currentDelayMinutes;
      const scheduledEta = liveTrain.previousEta;
      const predictedEta = liveTrain.aiPredictedEta;
      const speedKmH = liveTrain.currentSpeedKmH;
      const location = liveTrain.currentLocation;

      let severity = alert.severity;
      if (liveTrain.status === 'Critical Delay') severity = 'CRITICAL';
      else if (liveTrain.status === 'Minor Delay') severity = 'HIGH';

      return {
        ...alert,
        currentDelay: delay,
        scheduledEta,
        predictedEta,
        speedKmH,
        location: `${location} (Live Block)`,
        etaImpact: delay > 0 ? `+${delay} min predicted delay` : 'On Time forecast',
        severity,
      };
    });
  }, [alertsState, trains]);

  const selectedAlert = useMemo(() => {
    return alerts.find((a) => a.id === selectedAlertId) || alerts[0] || null;
  }, [alerts, selectedAlertId]);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlertsState((prev) =>
      prev.map((alt) => {
        if (alt.id !== id) return alt;
        return {
          ...alt,
          status: 'Acknowledged',
          acknowledgedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          acknowledgedBy: 'Chief Controller (NCR HQ)',
        };
      }),
    );
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlertsState((prev) =>
      prev.map((alt) => {
        if (alt.id !== id) return alt;
        return {
          ...alt,
          status: 'Resolved',
          resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
      }),
    );
  }, []);

  const addAlert = useCallback((newAlertData: Omit<IncidentAlert, 'id'>) => {
    const newAlert: IncidentAlert = {
      ...newAlertData,
      id: `inc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setAlertsState((prev) => [newAlert, ...prev]);
    setSelectedAlertId(newAlert.id);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        selectedAlertId,
        setSelectedAlertId,
        selectedAlert,
        acknowledgeAlert,
        resolveAlert,
        addAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
