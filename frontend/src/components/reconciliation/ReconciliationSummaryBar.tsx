import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, FileX } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';

interface ReconciliationSummaryBarProps {
  matchedCount: number;
  needReviewCount: number;
  missingProviderCount: number;
  amountMismatchCount: number;
}

/**
 * QINDE ERP — Reconciliation Workspace Summary Bar
 */
export const ReconciliationSummaryBar: React.FC<ReconciliationSummaryBarProps> = ({
  matchedCount,
  needReviewCount,
  missingProviderCount,
  amountMismatchCount,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      <ERPMetric
        title="Fully Matched Records"
        value={matchedCount}
        icon={CheckCircle2}
        iconVariant="green"
        subtitle="100% ERP & Chapa Sync"
      />
      <ERPMetric
        title="Requires Human Review"
        value={needReviewCount}
        icon={HelpCircle}
        iconVariant="warning"
        subtitle="Exceptions requiring audit"
      />
      <ERPMetric
        title="Amount Mismatches"
        value={amountMismatchCount}
        icon={AlertTriangle}
        iconVariant="warning"
        subtitle="Discrepancy in ledger value"
      />
      <ERPMetric
        title="Missing Provider Records"
        value={missingProviderCount}
        icon={FileX}
        iconVariant="warning"
        subtitle="Internal tx not in Chapa"
      />
    </div>
  );
};
