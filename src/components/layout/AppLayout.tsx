import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { SimulationModal } from '../common/SimulationModal';
import { DemoControlBar } from '../demo/DemoControlBar';
import { useTrains } from '../../context/TrainContext';
import { useDemo } from '../../context/DemoContext';

export const AppLayout: React.FC = () => {
  const { isSimulationModalOpen, simulationModalTrainId, openSimulationModal, closeSimulationModal } = useTrains();
  const { isDemoActive, isBarMinimized } = useDemo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Persistent desktop collapsed state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('railforecast_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const handleToggleSidebar = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('railforecast_sidebar_collapsed', JSON.stringify(next));
        } catch {
          // ignore storage exceptions
        }
        return next;
      });
    }
  }, []);

  // Keyboard shortcut listener ('[' to toggle sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput =
        activeElement &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName) ||
          (activeElement as HTMLElement).isContentEditable);

      if (isInput) return;

      if (e.key === '[' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleToggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleSidebar]);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex">
      {/* Global Collapsible / Flyout Navigation Sidebar */}
      <Sidebar
        onOpenSimulation={() => openSimulationModal()}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content Canvas with smooth margin adjustment */}
      <div
        className={`flex-1 flex flex-col min-h-screen relative w-full overflow-x-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:ml-[72px]' : 'md:ml-64'
        }`}
      >
        {/* Sticky Top Bar with 3-line hamburger menu */}
        <TopNavbar
          isCollapsed={isCollapsed}
          onToggleMenu={handleToggleSidebar}
        />

        {/* Scrollable Page Content Canvas */}
        <div className={`pt-16 ${isDemoActive && !isBarMinimized ? 'pb-28' : 'pb-8 md:pb-10'} flex-1 flex flex-col`}>
          <Outlet />
        </div>
      </div>

      {/* Interactive Simulation Modal */}
      <SimulationModal
        isOpen={isSimulationModalOpen}
        targetTrainId={simulationModalTrainId}
        onClose={closeSimulationModal}
      />

      {/* Persistent SIH Deterministic Demo Controller */}
      <DemoControlBar />
    </div>
  );
};
