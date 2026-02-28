import React from 'react';
import { Download } from 'lucide-react';
import { ERPObjectHeader } from '../erp/ERPObjectHeader';
import { ERPMoney } from '../erp/ERPMoney';
import { FinancialStatus } from '../erp/ERPStatus';
import { ERPTimeline, TimelineEvent } from '../erp/ERPTimeline';
import { Button } from '../ui/Button';

export interface PaymentDetailRecord {
  id: string;
  txRef: string;
  chapaRef: string;
  invoiceNo: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  timestamp: string;
  status: FinancialStatus;
}

interface PaymentDetailProps {
  payment: PaymentDetailRecord;
  onBack: () => void;
}

/**
 * QINDE ERP — Payment Transaction Master-Detail Workspace
 */
export const PaymentDetail: React.FC<PaymentDetailProps> = ({ payment, onBack }) => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'p1',
      title: `Checkout Initiated (${payment.paymentMethod})`,
      timestamp: payment.timestamp,
      status: 'completed',
      description: `Target Invoice: ${payment.invoiceNo} · Customer: ${payment.customerName}`,
    },
    {
      id: 'p2',
      title: 'Gateway Provider Processing',
      timestamp: payment.timestamp,
      status: 'completed',
      description: `Chapa Provider Reference: ${payment.chapaRef}`,
    },
    {
      id: 'p3',
      title: 'HMAC Signature & Webhook Verified',
      timestamp: payment.timestamp,
      status: 'completed',
      description: 'HMAC-SHA256 signature matched signature header.',
    },
    {
      id: 'p4',
      title: 'Outbox Event Dispatched to Telegram Channel',
      timestamp: payment.timestamp,
      status: 'completed',
      description: 'Notification delivered to Telegram channel subscribers.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <ERPObjectHeader
        objectType="Payment Gateway Ledger"
        identifier={payment.txRef}
        title={`Payment from ${payment.customerName}`}
        status={payment.status}
        keyAmount={payment.amount}
        subtitle={`Chapa Reference: ${payment.chapaRef} · Method: ${payment.paymentMethod}`}
        onBack={onBack}
        secondaryActions={
          <Button variant="secondary" icon={Download}>
            Download Gateway Receipt
          </Button>
        }
      />

      {/* Content Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left: Transaction Attributes Card */}
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
            Payment Transaction Metadata
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>System Transaction Ref:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {payment.txRef}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Chapa Gateway Reference:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {payment.chapaRef}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Invoice Paid:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {payment.invoiceNo}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Payment Rail / Method:</span>
              <strong style={{ color: 'var(--color-brand-navy)' }}>{payment.paymentMethod}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Settlement Timestamp:</span>
              <strong style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {payment.timestamp}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Settlement Amount:</span>
              <ERPMoney amount={payment.amount} size="md" />
            </div>
          </div>
        </div>

        {/* Right: Transaction Signal Rail */}
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
            Transaction Signal Event Rail
          </h3>
          <ERPTimeline events={timelineEvents} />
        </div>
      </div>
    </div>
  );
};
