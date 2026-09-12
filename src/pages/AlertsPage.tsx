import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAlerts } from '../context/AlertContext';
import { AlertsHeader } from '../components/alerts/AlertsHeader';
import { AlertsSummaryCards } from '../components/alerts/AlertsSummaryCards';
import { AlertFiltersBar, SeverityFilter, StatusFilter } from '../components/alerts/AlertFiltersBar';
import { IncidentAlertsTable } from '../components/alerts/IncidentAlertsTable';
import { AlertDetailDrawer } from '../components/alerts/AlertDetailDrawer';
import { ConfigureAlertsModal } from '../components/common/ConfigureAlertsModal';
import { Footer } from '../components/layout/Footer';
import { IncidentAlert } from '../types/alert';

export const AlertsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { alerts, selectedAlert, setSelectedAlertId } = useAlerts();

  const [search, setSearch] = useState(searchParams.get('train') || searchParams.get('q') || '');
  const [severity, setSeverity] = useState<SeverityFilter>('ALL');
  const [category, setCategory] = useState('ALL');
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const targetTrain = searchParams.get('train') || searchParams.get('q');
    if (targetTrain) {
      setSearch(targetTrain);
      const match = alerts.find((a) => a.trainNumber === targetTrain || (a.trainName && a.trainName.toLowerCase().includes(targetTrain.toLowerCase())));
      if (match) {
        setSelectedAlertId(match.id);
        setIsDrawerOpen(true);
      }
    }
  }, [searchParams, alerts, setSelectedAlertId]);

  // Compute severity counts
  const severityCounts = useMemo(() => {
    return {
      ALL: alerts.length,
      CRITICAL: alerts.filter((a) => a.severity === 'CRITICAL').length,
      HIGH: alerts.filter((a) => a.severity === 'HIGH').length,
      MEDIUM: alerts.filter((a) => a.severity === 'MEDIUM').length,
      LOW: alerts.filter((a) => a.severity === 'LOW').length,
    };
  }, [alerts]);

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alt) => {
      // Severity
      if (severity !== 'ALL' && alt.severity !== severity) return false;

      // Category
      if (category !== 'ALL' && alt.category !== category) return false;

      // Status
      if (status !== 'ALL' && alt.status !== status) return false;

      // Search text
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (alt.trainNumber && alt.trainNumber.toLowerCase().includes(q)) ||
        (alt.trainName && alt.trainName.toLowerCase().includes(q)) ||
        alt.location.toLowerCase().includes(q) ||
        alt.eventDescription.toLowerCase().includes(q) ||
        alt.category.toLowerCase().includes(q) ||
        (alt.routeSection && alt.routeSection.toLowerCase().includes(q))
      );
    });
  }, [alerts, severity, category, status, search]);

  const handleSelectAlert = (alert: IncidentAlert) => {
    setSelectedAlertId(alert.id);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSeverity('ALL');
    setCategory('ALL');
    setStatus('ALL');
  };

  return (
    <main className="px-3 sm:px-4 md:px-margin py-5 pb-xl flex-1 flex flex-col gap-4 max-w-[1680px] mx-auto w-full animate-fade-in">
      {/* 1. Header */}
      <AlertsHeader onConfigureClick={() => setIsConfigureOpen(true)} />

      {/* 2. Summary KPI Cards */}
      <AlertsSummaryCards />

      {/* 3. Multi-tier Filters Bar */}
      <AlertFiltersBar
        search={search}
        onSearchChange={setSearch}
        severity={severity}
        onSeverityChange={setSeverity}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        severityCounts={severityCounts}
        onReset={handleResetFilters}
      />

      {/* 4. Incident Alert Table */}
      <IncidentAlertsTable
        alerts={filteredAlerts}
        onSelectAlert={handleSelectAlert}
      />

      {/* 5. Slide-Over Detail Drawer */}
      {isDrawerOpen && (
        <AlertDetailDrawer
          alert={selectedAlert}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {/* 6. Configure Alerts Modal */}
      <ConfigureAlertsModal
        isOpen={isConfigureOpen}
        onClose={() => setIsConfigureOpen(false)}
      />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
};
