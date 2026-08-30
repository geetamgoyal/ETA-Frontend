import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TrainMonitoringPage } from './pages/TrainMonitoringPage';
import { TrainDetailPage } from './pages/TrainDetailPage';
import { LiveNetworkPage } from './pages/LiveNetworkPage';
import { AIEtaForecastPage } from './pages/AIEtaForecastPage';
import { RoutePredictionsPage } from './pages/RoutePredictionsPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SystemStatusPage } from './pages/SystemStatusPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="train-monitoring" element={<TrainMonitoringPage />} />
          <Route path="train-monitoring/:id" element={<TrainDetailPage />} />
          <Route path="train/:id" element={<TrainDetailPage />} />
          <Route path="live-network" element={<LiveNetworkPage />} />
          <Route path="eta-forecast" element={<AIEtaForecastPage />} />
          <Route path="eta-forecast/:id" element={<AIEtaForecastPage />} />
          <Route path="route-predictions" element={<RoutePredictionsPage />} />
          <Route path="route-predictions/:id" element={<RoutePredictionsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="system-status" element={<SystemStatusPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
