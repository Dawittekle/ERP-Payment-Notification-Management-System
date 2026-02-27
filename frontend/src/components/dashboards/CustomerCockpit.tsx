import React, { useState } from 'react';
import { CreditCard, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { Button } from '../ui/Button';

interface CustomerInvoice {
  id: string;
  invoiceNo: string;
  serviceDescription: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

/**
 * QINDE ERP — Customer Self-Service Portal Cockpit
 * Allows client organization contacts to view issued invoices, download tax receipts, and pay via Chapa Gateway.
 */
export const CustomerCockpit: React.FC = () => {
  const [invoices] = useState<CustomerInvoice[]>([
    {
      id: 'cinv_01',
      invoiceNo: 'INV-2026-00182',
      serviceDescription: 'QINDE Enterprise SaaS License & Integration Support',
      amount: 145000.0,
      dueDate: '2026-09-15',
      status: 'PAID',
    },
    {
      id: 'cinv_02',
      invoiceNo: 'INV-2026-00190',
      serviceDescription: 'Custom Outbox Notification Channel Setup',
      amount: 45000.0,
      dueDate: '2026-09-10',
      status: 'PENDING',
    },
  ]);

  const handlePayInvoice = (invoiceId: string) => {
    alert(`Redirecting to Chapa Gateway API v2 for Invoice ID: ${invoiceId}...`);
  };

  const columns: Column<CustomerInvoice>[] = [
    {
      key: 'invoiceNo',
      header: 'Invoice Reference',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.invoiceNo}
        </span>
      ),
    },
    { key: 'serviceDescription', header: 'Service Items' },
    {
      key: 'dueDate',
      header: 'Due Date',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', color: 'var(--color-text-secondary)' }}>
          {row.dueDate}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Total Payable',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.amount} align="right" />,
    },
    {
      key: 'status',
      header: 'Payment Status',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'action',
      header: 'Action',
      align: 'center',
      accessor: (row) =>
        row.status === 'PENDING' || row.status === 'OVERDUE' ? (
          <Button variant="success" size="sm" icon={CreditCard} onClick={() => handlePayInvoice(row.id)}>
            Pay via Chapa
          </Button>
        ) : (
          <Button variant="secondary" size="sm" icon={Download}>
            Receipt (PDF)
          </Button>
        ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '4px' }}>
            Welcome to Ethio Telecom Billing Portal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Customer Account Ref: <strong style={{ color: 'var(--color-brand-navy)' }}>CUST-ETH-902</strong> · Verified Entity
          </p>
        </div>

        <ERPStatus status="VERIFIED" customLabel="Account Verified" />
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Outstanding Payable"
          value={45000.0}
          isCurrency
          icon={CreditCard}
          iconVariant="warning"
          subtitle="Due in 8 days"
        />
        <ERPMetric
          title="Settled Invoices Year-To-Date"
          value={145000.0}
          isCurrency
          icon={CheckCircle2}
          iconVariant="green"
          subtitle="1 Invoice Fully Paid"
        />
        <ERPMetric
          title="Chapa Payment Gateway"
          value="Instant Active"
          icon={ShieldCheck}
          iconVariant="navy"
          subtitle="Supports Telebirr, CBE & Cards"
        />
      </div>

      {/* Invoices Table */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '16px' }}>
          Issued Invoices & Settlement History
        </h3>
        <ERPTable columns={columns} data={invoices} keyExtractor={(item) => item.id} />
      </div>
    </div>
  );
};
