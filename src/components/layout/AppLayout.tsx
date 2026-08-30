import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { SimulationModal } from '../common/SimulationModal';

export const AppLayout: React.FC = () => {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        onOpenSimulation={() => setIsSimulationOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative w-full overflow-x-hidden">
        {/* Sticky Top Bar */}
        <TopNavbar onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Scrollable Page Content Canvas */}
        <div className="pt-16 flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>

      {/* Interactive Simulation Modal */}
      <SimulationModal
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
      />
    </div>
  );
};
