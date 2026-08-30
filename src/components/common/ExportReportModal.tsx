import React, { useState } from 'react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [dateRange, setDateRange] = useState('7d');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-xl max-w-md w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 bg-primary text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">download</span>
            <h3 className="font-headline-sm text-headline-sm font-bold">Export Performance Report</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-white/80 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Timeframe
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['24h', '7d', '30d'].map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`py-2 text-xs font-semibold rounded-lg border ${
                    dateRange === r
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30'
                  }`}
                >
                  {r === '24h' ? 'Last 24 Hours' : r === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pdf', 'csv', 'json'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`py-2 text-xs font-bold uppercase rounded-lg border flex flex-col items-center gap-1 ${
                    format === fmt
                      ? 'bg-secondary text-white border-secondary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {fmt === 'pdf' ? 'picture_as_pdf' : fmt === 'csv' ? 'table_chart' : 'code'}
                  </span>
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {exportComplete && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Report generated successfully. Downloading payload...
            </div>
          )}
        </div>

        <div className="p-4 bg-surface border-t border-outline-variant/20 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 flex items-center gap-2"
          >
            {isExporting ? 'Generating Report...' : 'Download Report'}
          </button>
        </div>
      </div>
    </div>
  );
};
