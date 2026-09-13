import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { IncidentAlert } from '../types/alert';
import { useTrains } from './TrainContext';
import { INITIAL_INCIDENT_ALERTS } from '../services/trainService';

interface AlertContextType {
  alerts: IncidentAlert[];
  selectedAlertId: string | null;
  setSelectedAlertId: (id: string | null) => void;
  selectedAlert: IncidentAlert | null;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  addAlert: (alert: Omit<IncidentAlert, 'id'>) => void;
  upsertDemoAlert: (alert: IncidentAlert | null) => void;
  resetAlertsToBaseline: () => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

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

  const upsertDemoAlert = useCallback((demoAlert: IncidentAlert | null) => {
    setAlertsState((prev) => {
      const filtered = prev.filter((a) => !a.id.startsWith('demo-'));
      if (!demoAlert) return filtered;
      return [demoAlert, ...filtered];
    });
    if (demoAlert) {
      setSelectedAlertId(demoAlert.id);
    }
  }, []);

  const resetAlertsToBaseline = useCallback(() => {
    setAlertsState(INITIAL_INCIDENT_ALERTS);
    setSelectedAlertId('inc-12050');
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
        upsertDemoAlert,
        resetAlertsToBaseline,
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
