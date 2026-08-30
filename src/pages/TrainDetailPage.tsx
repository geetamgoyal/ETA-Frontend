import React from 'react';
import { LiveTrainDetailsView } from '../components/trains/LiveTrainDetailsView';
import { Footer } from '../components/layout/Footer';

export const TrainDetailPage: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col justify-between">
      <LiveTrainDetailsView />
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-margin">
        <Footer />
      </div>
    </main>
  );
};
