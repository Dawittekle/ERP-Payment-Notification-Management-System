import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { ReconciliationSummaryBar } from './ReconciliationSummaryBar';
import { ReconciliationDualView, ReconciliationRecord } from './ReconciliationDualView';
import { ResolutionModal } from './ResolutionModal';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';

/**
 * QINDE ERP — Reconciliation Dual-View Workspace Page (QINDE Signature Screen)
 */
export const ReconciliationWorkspace: React.FC = () => {
  const [selectedForResolution, setSelectedForResolution] = useState<ReconciliationRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSavedView, setActiveSavedView] = useState('all');

  const [records, setRecords] = useState<ReconciliationRecord[]>([
    {
      id: 'rec_101',
      txRef: 'TX-89320-CP',
      customerName: 'Ethio Telecom Enterprise',
      erpRecord: { amount: 145000.0, status: 'PAID', timestamp: '2026-09-01 14:32' },
      chapaRecord: { chapaRef: 'CHAPA-98432-ET', amount: 145000.0, status: 'PAID', timestamp: '2026-09-01 14:32' },
      matchState: 'MATCHED',
    },
    {
      id: 'rec_102',
      txRef: 'TX-89321-CP',
      customerName: 'Awash International Bank S.C.',
      erpRecord: { amount: 82450.5, status: 'PENDING', timestamp: '2026-09-01 15:10' },
      chapaRecord: { chapaRef: 'CHAPA-98435-ET', amount: 80000.0, status: 'PAID', timestamp: '2026-09-01 15:10' },
      matchState: 'AMOUNT_MISMATCH',
    },
    {
      id: 'rec_103',
      txRef: 'TX-89322-CP',
      customerName: 'Habesha Breweries S.C.',
      erpRecord: { amount: 32100.0, status: 'PENDING', timestamp: '2026-09-01 10:15' },
      chapaRecord: null,
      matchState: 'MISSING_PROVIDER',
    },
  ]);

  const handleResolveRecord = (_action: 'MANUAL_MATCH' | 'FORCE_RESOLVE' | 'INVESTIGATE', _rationale: string) => {
    if (!selectedForResolution) return;
    setRecords(
      records.map((r) =>
        r.id === selectedForResolution.id
          ? {
              ...r,
              matchState: 'MATCHED',
              chapaRecord: r.chapaRecord
                ? { ...r.chapaRecord, amount: r.erpRecord.amount, status: r.erpRecord.status }
                : { chapaRef: 'CHAPA-MANUAL-SYNC', amount: r.erpRecord.amount, status: r.erpRecord.status, timestamp: 'Now' },
            }
          : r
      )
    );
  };

  const matchedCount = records.filter((r) => r.matchState === 'MATCHED').length;
  const needReviewCount = records.filter((r) => r.matchState !== 'MATCHED').length;
  const missingProviderCount = records.filter((r) => r.matchState === 'MISSING_PROVIDER').length;
  const amountMismatchCount = records.filter((r) => r.matchState === 'AMOUNT_MISMATCH').length;

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.txRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeSavedView === 'matched') return r.matchState === 'MATCHED';
    if (activeSavedView === 'exceptions') return r.matchState !== 'MATCHED';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Reconciliation Workspace — Dual-View Diff Engine
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Side-by-side comparison of internal ERP ledger records vs gateway Chapa provider entries.
          </p>
        </div>

        <Button variant="secondary" icon={RefreshCw}>
          Re-Run Diff Engine
        </Button>
      </div>

      <ReconciliationSummaryBar
        matchedCount={matchedCount}
        needReviewCount={needReviewCount}
        missingProviderCount={missingProviderCount}
        amountMismatchCount={amountMismatchCount}
      />

      <div>
        <ERPFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          activeFilters={[]}
          onRemoveFilter={() => {}}
          onClearAllFilters={() => {}}
          savedViews={[
            { id: 'all', name: 'All Comparison Records' },
            { id: 'exceptions', name: 'Exceptions Needing Review' },
            { id: 'matched', name: '100% Matched Records' },
          ]}
          activeSavedView={activeSavedView}
          onSelectSavedView={(v) => setActiveSavedView(v)}
        />

        <ReconciliationDualView
          records={filteredRecords}
          onOpenResolution={(rec) => setSelectedForResolution(rec)}
        />
      </div>

      {selectedForResolution && (
        <ResolutionModal
          isOpen={!!selectedForResolution}
          onClose={() => setSelectedForResolution(null)}
          txRef={selectedForResolution.txRef}
          erpAmount={selectedForResolution.erpRecord.amount}
          providerAmount={selectedForResolution.chapaRecord ? selectedForResolution.chapaRecord.amount : 0}
          onResolve={handleResolveRecord}
        />
      )}
    </div>
  );
};
