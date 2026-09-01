import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const NetworkHealthStrip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-surface-container-lowest rounded-md p-3.5 shadow-sm border border-outline-variant/20 flex items-center gap-3">
      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
      <span className="font-body-md text-sm text-on-surface">
        <span className="font-bold text-primary">{t('dash.network_health')}</span> | {t('dash.health_strip_desc')}
      </span>
    </div>
  );
};
