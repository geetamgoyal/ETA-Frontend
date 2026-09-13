import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { TrainProvider } from './context/TrainContext';
import { AlertProvider } from './context/AlertContext';
import { DemoProvider } from './context/DemoContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TrainMonitoringPage } from './pages/TrainMonitoringPage';
import { TrainDetailPage } from './pages/TrainDetailPage';
import { LiveNetworkPage } from './pages/LiveNetworkPage';
import { AIEtaForecastPage } from './pages/AIEtaForecastPage';
import { RoutePredictionsPage } from './pages/RoutePredictionsPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoricalPerformancePage } from './pages/HistoricalPerformancePage';
import { SystemStatusPage } from './pages/SystemStatusPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ToastContainer } from './components/ui/Toast';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <TrainProvider>
        <AlertProvider>
          <DemoProvider>
            {isLoading && (
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            )}
            {/* Toast container — rendered outside router so it's always on top */}
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="train-monitoring" element={<TrainMonitoringPage />} />
                  <Route path="train-monitoring/:id" element={<TrainDetailPage />} />
                  <Route path="train/:id" element={<TrainDetailPage />} />
                  <Route path="live-network" element={<LiveNetworkPage />} />
                  <Route path="live-tracking" element={<LiveNetworkPage />} />
                  <Route path="tracking" element={<LiveNetworkPage />} />
                  <Route path="eta-forecast" element={<AIEtaForecastPage />} />
                  <Route path="eta-forecast/:id" element={<AIEtaForecastPage />} />
                  <Route path="route-predictions" element={<RoutePredictionsPage />} />
                  <Route path="route-predictions/:id" element={<RoutePredictionsPage />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="historical-performance" element={<HistoricalPerformancePage />} />
                  <Route path="history" element={<HistoricalPerformancePage />} />
                  <Route path="system-status" element={<SystemStatusPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DemoProvider>
        </AlertProvider>
      </TrainProvider>
    </LanguageProvider>
  );
};
