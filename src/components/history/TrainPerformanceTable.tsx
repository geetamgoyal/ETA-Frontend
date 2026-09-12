import React, { useState, useMemo } from 'react';
import { TrainHistoricalSummary } from '../../types/history';

interface TrainPerformanceTableProps {
  trainSummaries: TrainHistoricalSummary[];
  onSelectTrain: (trainNumber: string) => void;
  selectedTrainNumber?: string;
}

type SortField = 'trainNumber' | 'totalJourneys' | 'onTimePercent' | 'avgDelayMinutes' | 'avgEtaErrorMinutes' | 'status';
type SortDirection = 'asc' | 'desc';

export const TrainPerformanceTable: React.FC<TrainPerformanceTableProps> = ({
  trainSummaries,
  onSelectTrain,
  selectedTrainNumber,
}) => {
  const [sortField, setSortField] = useState<SortField>('avgDelayMinutes');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'onTimePercent' ? 'desc' : 'asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return trainSummaries
      .filter((t) => (statusFilter === 'ALL' ? true : t.status === statusFilter))
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (typeof valA === 'string') {
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
  }, [trainSummaries, sortField, sortDirection, statusFilter]);

  const getStatusBadge = (status: TrainHistoricalSummary['status']) => {
    switch (status) {
      case 'EXCELLENT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/25">EXCELLENT</span>;
      case 'GOOD':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-800 border border-sky-500/25">GOOD</span>;
      case 'ATTENTION':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-800 border border-amber-500/25">ATTENTION</span>;
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-800 border border-rose-500/25">CRITICAL</span>;
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">train</span>
            <h2 className="text-sm font-bold text-on-surface">
              Coaching Train Historical Performance
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Punctuality benchmarks, average delay deviations, and dynamic ETA prediction accuracy by train rake.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 text-xs font-semibold">
          {['ALL', 'EXCELLENT', 'GOOD', 'ATTENTION', 'CRITICAL'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-surface text-primary font-bold shadow-2xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Table */}
      <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/25">
              <th className="py-2.5 px-3 cursor-pointer hover:text-on-surface" onClick={() => handleSort('trainNumber')}>
                <div className="flex items-center gap-1">
                  <span>Train</span>
                  {sortField === 'trainNumber' && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-on-surface text-center" onClick={() => handleSort('totalJourneys')}>
                <div className="flex items-center justify-center gap-1">
                  <span>Journeys</span>
                  {sortField === 'totalJourneys' && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-on-surface text-center" onClick={() => handleSort('onTimePercent')}>
                <div className="flex items-center justify-center gap-1">
                  <span>On-Time %</span>
                  {sortField === 'onTimePercent' && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-on-surface text-center" onClick={() => handleSort('avgDelayMinutes')}>
                <div className="flex items-center justify-center gap-1">
                  <span>Avg Delay</span>
                  {sortField === 'avgDelayMinutes' && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-on-surface text-center" onClick={() => handleSort('avgEtaErrorMinutes')}>
                <div className="flex items-center justify-center gap-1">
                  <span>Avg ETA Error</span>
                  {sortField === 'avgEtaErrorMinutes' && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15">
            {filteredAndSorted.map((t) => {
              const isSelected = selectedTrainNumber === t.trainNumber;
              return (
                <tr
                  key={t.trainNumber}
                  className={`hover:bg-surface-container-low/50 transition-colors ${
                    isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-surface-container border border-outline-variant/30 flex items-center justify-center font-mono font-bold text-xs text-primary">
                        🚆
                      </div>
                      <div>
                        <div className="font-bold text-on-surface flex items-center gap-1.5">
                          <span className="font-mono text-primary font-bold">#{t.trainNumber}</span>
                          <span>{t.trainName}</span>
                          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                            {t.type}
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                          {t.route}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-semibold text-on-surface">
                    {t.totalJourneys} runs
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`font-mono font-bold ${t.onTimePercent >= 85 ? 'text-emerald-700' : t.onTimePercent >= 70 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {t.onTimePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-800">
                    +{t.avgDelayMinutes.toFixed(1)}m
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">
                    {t.avgEtaErrorMinutes.toFixed(1)}m
                  </td>
                  <td className="py-3 px-3 text-center">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectTrain(t.trainNumber)}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      Filter Runs →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
