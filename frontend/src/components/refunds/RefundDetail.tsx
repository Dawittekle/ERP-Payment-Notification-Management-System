import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { ERPObjectHeader } from '../erp/ERPObjectHeader';
import { ERPMoney } from '../erp/ERPMoney';
import { FinancialStatus } from '../erp/ERPStatus';
import { ERPTimeline, TimelineEvent } from '../erp/ERPTimeline';
import { Button } from '../ui/Button';

export interface RefundDetailRecord {
  id: string;
  refundNo: string;
  invoiceNo: string;
  customerName: string;
  amount: number;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
  timestamp: string;
  status: FinancialStatus;
  chapaRefundRef?: string;
}

interface RefundDetailProps {
  refund: RefundDetailRecord;
  onBack: () => void;
  onApproveRefund?: (refundId: string) => void;
}

/**
 * QINDE ERP — Refund Audit & Detail Workspace Page
 */
export const RefundDetail: React.FC<RefundDetailProps> = ({ refund, onBack, onApproveRefund }) => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'r1',
      title: 'Refund Requested by Accountant',
      timestamp: refund.timestamp,
      status: 'completed',
      description: `Requested by ${refund.requestedBy} · Reason: ${refund.reason}`,
    },
    {
      id: 'r2',
      title: refund.status === 'AUTH_NEEDED' ? 'Awaiting Finance Manager Dual-Auth' : 'Finance Manager Authorized',
      timestamp: refund.status === 'AUTH_NEEDED' ? 'Pending Action' : refund.timestamp,
      status: refund.status === 'AUTH_NEEDED' ? 'pending' : 'completed',
      description: refund.approvedBy ? `Authorized by ${refund.approvedBy}` : 'Requires 2nd signature approval.',
    },
    {
      id: 'r3',
      title: 'Chapa Provider Gateway Processing',
      timestamp: refund.status === 'PAID' ? refund.timestamp : 'Queued...',
      status: refund.status === 'PAID' ? 'completed' : 'pending',
      description: refund.chapaRefundRef ? `Chapa Ref: ${refund.chapaRefundRef}` : 'Awaiting payout dispatch.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ERPObjectHeader
        objectType="Refund Authorization Ledger"
        identifier={refund.refundNo}
        title={`Refund for ${refund.customerName}`}
        status={refund.status}
        keyAmount={refund.amount}
        subtitle={`Target Invoice: ${refund.invoiceNo} · Requested by ${refund.requestedBy}`}
        onBack={onBack}
        primaryAction={
          refund.status === 'AUTH_NEEDED' && onApproveRefund ? (
            <Button variant="primary" icon={ShieldCheck} onClick={() => onApproveRefund(refund.id)}>
              Approve Refund Payout
            </Button>
          ) : undefined
        }
        secondaryActions={
          <Button variant="secondary" icon={Download}>
            Refund Voucher (PDF)
          </Button>
        }
      />

      {/* Main Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Refund Business Justification & Gateway Metadata
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Refund Reference #:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {refund.refundNo}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Chapa Payout Reference:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {refund.chapaRefundRef || 'Pending Payout Generation'}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Original Invoice #:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {refund.invoiceNo}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Refund Payout Amount:</span>
              <ERPMoney amount={refund.amount} size="md" color="var(--color-status-error)" />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Business Rationale:
              </span>
              <p
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-micro)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border-default)',
                  fontSize: '13px',
                  lineHeight: '1.4',
                }}
              >
                {refund.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Signal Rail */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '24px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '16px' }}>
            Authorization & Audit Rail
          </h3>
          <ERPTimeline events={timelineEvents} />
        </div>
      </div>
    </div>
  );
};
