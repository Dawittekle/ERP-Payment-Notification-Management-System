import React from 'react';
import { Download, Send, CreditCard } from 'lucide-react';
import { ERPObjectHeader } from '../erp/ERPObjectHeader';
import { ERPMoney } from '../erp/ERPMoney';
import { FinancialStatus } from '../erp/ERPStatus';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPTimeline, TimelineEvent } from '../erp/ERPTimeline';
import { Button } from '../ui/Button';

export interface InvoiceDetailRecord {
  id: string;
  invoiceNo: string;
  customerName: string;
  tinNumber: string;
  dueDate: string;
  issueDate: string;
  subtotal: number;
  vatAmount: number;
  grossAmount: number;
  status: FinancialStatus;
  lineItems: { id: string; description: string; qty: number; unitPrice: number; total: number }[];
}

interface InvoiceDetailProps {
  invoice: InvoiceDetailRecord;
  onBack: () => void;
  onInitiatePayment: (invoiceId: string) => void;
}

/**
 * QINDE ERP — Invoice Detail & Payment Workspace Page
 */
export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  onBack,
  onInitiatePayment,
}) => {
  const lineColumns: Column<{ id: string; description: string; qty: number; unitPrice: number; total: number }>[] = [
    { key: 'description', header: 'Service Description' },
    { key: 'qty', header: 'Quantity', align: 'center' },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.unitPrice} align="right" />,
    },
    {
      key: 'total',
      header: 'Line Total (Excl. VAT)',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.total} align="right" />,
    },
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: 'e1',
      title: 'Invoice Draft Created & Verified',
      timestamp: `${invoice.issueDate} 09:00`,
      status: 'completed',
      description: `Issued to ${invoice.customerName} (TIN: ${invoice.tinNumber}).`,
    },
    {
      id: 'e2',
      title: 'Telegram & Email Notification Sent',
      timestamp: `${invoice.issueDate} 09:05`,
      status: 'completed',
      description: 'Outbox worker delivered notification payload.',
    },
    {
      id: 'e3',
      title: invoice.status === 'PAID' ? 'Payment Received via Chapa' : 'Awaiting Payment Settlement',
      timestamp: invoice.status === 'PAID' ? `${invoice.issueDate} 14:32` : 'Pending...',
      status: invoice.status === 'PAID' ? 'completed' : 'pending',
      description: invoice.status === 'PAID' ? 'Chapa Gateway Tx verified: SUCCESS.' : 'Awaiting customer transfer.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <ERPObjectHeader
        objectType="Invoice Ledger"
        identifier={invoice.invoiceNo}
        title={`Invoice for ${invoice.customerName}`}
        status={invoice.status}
        keyAmount={invoice.grossAmount}
        subtitle={`Issued on ${invoice.issueDate} · Payment Due by ${invoice.dueDate}`}
        onBack={onBack}
        primaryAction={
          invoice.status !== 'PAID' ? (
            <Button variant="success" icon={CreditCard} onClick={() => onInitiatePayment(invoice.id)}>
              Initiate Payment
            </Button>
          ) : undefined
        }
        secondaryActions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" icon={Download}>
              Download PDF
            </Button>
            <Button variant="secondary" icon={Send}>
              Resend Alert
            </Button>
          </div>
        }
      />

      {/* Main Content Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left: Line Items & Tax Calculation */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Itemized Invoice Charges Breakdown
          </h3>

          <ERPTable columns={lineColumns} data={invoice.lineItems} keyExtractor={(item) => item.id} />

          {/* Tax Summary Footer */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border-default)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginLeft: 'auto',
              width: '320px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Subtotal:</span>
              <ERPMoney amount={invoice.subtotal} align="right" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <span>15.0% Ethiopian VAT:</span>
              <ERPMoney amount={invoice.vatAmount} color="var(--color-text-secondary)" align="right" />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--color-brand-navy)',
                paddingTop: '8px',
                borderTop: '1px solid var(--color-border-default)',
              }}
            >
              <span>Gross Amount:</span>
              <ERPMoney amount={invoice.grossAmount} size="lg" align="right" />
            </div>
          </div>
        </div>

        {/* Right: Payment Timeline Rail */}
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
            Invoice Audit Signal Rail
          </h3>
          <ERPTimeline events={timelineEvents} />
        </div>
      </div>
    </div>
  );
};
