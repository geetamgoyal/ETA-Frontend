import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-outline-variant/20 pt-4 pb-4 px-margin flex flex-col sm:flex-row justify-between items-center text-center gap-2 bg-surface">
      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {t('footer.cluster_active')}
        </span>
        <span>•</span>
        <span>{t('footer.model_version')}</span>
      </div>
      <span className="font-body-md text-xs text-on-surface-variant font-medium">
        {t('footer.stats')}
      </span>
      <span className="text-[11px] text-outline">
        {t('footer.platform_copyright')}
      </span>
    </footer>
  );
};
