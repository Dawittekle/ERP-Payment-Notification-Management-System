import React from 'react';
import { ERPStatus, FinancialStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { Button } from '../ui/Button';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export interface ReconciliationRecord {
  id: string;
  txRef: string;
  customerName: string;
  // Internal ERP Ledger Record
  erpRecord: {
    amount: number;
    status: FinancialStatus;
    timestamp: string;
  };
  // Gateway Chapa Record
  chapaRecord: {
    chapaRef: string;
    amount: number;
    status: FinancialStatus;
    timestamp: string;
  } | null;
  matchState: 'MATCHED' | 'AMOUNT_MISMATCH' | 'MISSING_PROVIDER' | 'STATUS_MISMATCH';
}

interface ReconciliationDualViewProps {
  records: ReconciliationRecord[];
  onOpenResolution: (record: ReconciliationRecord) => void;
}

/**
 * QINDE ERP — Dual-View Reconciliation Diff Workspace (QINDE Signature Screen)
 * Displays side-by-side comparison of internal ERP ledger records vs gateway Chapa records.
 */
export const ReconciliationDualView: React.FC<ReconciliationDualViewProps> = ({
  records,
  onOpenResolution,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {records.map((rec) => {
        const isMismatch = rec.matchState !== 'MATCHED';

        return (
          <div
            key={rec.id}
            style={{
              backgroundColor: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-card)',
              border: isMismatch ? '1px solid var(--color-brand-gold)' : '1px solid var(--color-border-default)',
              boxShadow: isMismatch ? '0 0 0 1px var(--color-brand-gold)' : 'var(--shadow-subtle)',
              overflow: 'hidden',
            }}
          >
            {/* Diff Header */}
            <div
              style={{
                padding: '12px 20px',
                backgroundColor: isMismatch ? 'rgba(217, 164, 65, 0.08)' : 'var(--color-surface-subtle)',
                borderBottom: '1px solid var(--color-border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)', fontSize: '14px' }}>
                  {rec.txRef}
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Customer: <strong>{rec.customerName}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {rec.matchState === 'MATCHED' && (
                  <span style={{ fontSize: '12px', color: 'var(--color-status-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={16} /> 100% MATCHED
                  </span>
                )}
                {rec.matchState === 'AMOUNT_MISMATCH' && (
                  <span style={{ fontSize: '12px', color: 'var(--color-status-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={16} /> AMOUNT VARIANCE
                  </span>
                )}
                {rec.matchState === 'MISSING_PROVIDER' && (
                  <span style={{ fontSize: '12px', color: 'var(--color-status-error)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldAlert size={16} /> MISSING CHAPA RECORD
                  </span>
                )}

                {isMismatch && (
                  <Button variant="secondary" size="sm" onClick={() => onOpenResolution(rec)}>
                    Resolve Diff
                  </Button>
                )}
              </div>
            </div>

            {/* Dual Grid Comparison Body */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--color-border-subtle)' }}>
              {/* Internal ERP Record */}
              <div style={{ backgroundColor: 'var(--color-surface-card)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-brand-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Internal ERP Ledger Record
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Amount:</span>
                  <ERPMoney amount={rec.erpRecord.amount} size="md" align="right" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Status:</span>
                  <ERPStatus status={rec.erpRecord.status} size="sm" />
                </div>
              </div>

              {/* Gateway Chapa Record */}
              <div style={{ backgroundColor: 'var(--color-surface-card)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-brand-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Chapa Gateway Provider Record
                </span>
                {rec.chapaRecord ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Provider Amount:</span>
                      <ERPMoney
                        amount={rec.chapaRecord.amount}
                        size="md"
                        color={rec.chapaRecord.amount !== rec.erpRecord.amount ? 'var(--color-status-warning)' : undefined}
                        align="right"
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Status:</span>
                      <ERPStatus status={rec.chapaRecord.status} size="sm" />
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '12px', backgroundColor: 'rgba(217, 83, 79, 0.08)', borderRadius: 'var(--radius-micro)', color: 'var(--color-status-error)', fontSize: '13px' }}>
                    No corresponding transaction found in Chapa Provider API.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
