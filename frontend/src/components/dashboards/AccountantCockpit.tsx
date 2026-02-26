import React from 'react';
import {
  FileText,
  Calculator,
  Plus,
  Clock,
  Receipt,
  Download,
} from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { Button } from '../ui/Button';

interface SettlementItem {
  id: string;
  txRef: string;
  invoiceRef: string;
  customer: string;
  subtotal: number;
  vatAmount: number;
  total: number;
  settledAt: string;
  status: 'PAID' | 'PROCESSING';
}

/**
 * QINDE ERP — Accountant Operational Cockpit
 * Focused on invoice generation, line item tax/VAT calculations (15%), and daily settlement matching.
 */
export const AccountantCockpit: React.FC = () => {
  const dailySettlements: SettlementItem[] = [
    {
      id: 'set_01',
      txRef: 'CHAPA-98432-ET',
      invoiceRef: 'INV-2026-00182',
      customer: 'Ethio Telecom Enterprise',
      subtotal: 126086.96,
      vatAmount: 18913.04,
      total: 145000.0,
      settledAt: '2026-09-01 14:32',
      status: 'PAID',
    },
    {
      id: 'set_02',
      txRef: 'CHAPA-98435-ET',
      invoiceRef: 'INV-2026-00183',
      customer: 'Awash International Bank',
      subtotal: 71696.09,
      vatAmount: 10754.41,
      total: 82450.5,
      settledAt: '2026-09-01 15:10',
      status: 'PROCESSING',
    },
  ];

  const columns: Column<SettlementItem>[] = [
    {
      key: 'txRef',
      header: 'Gateway Tx Ref',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.txRef}
        </span>
      ),
    },
    { key: 'invoiceRef', header: 'Invoice #' },
    { key: 'customer', header: 'Customer Entity' },
    {
      key: 'subtotal',
      header: 'Subtotal (Excl. VAT)',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.subtotal} align="right" />,
    },
    {
      key: 'vatAmount',
      header: '15% VAT Tax',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.vatAmount} color="var(--color-text-secondary)" align="right" />,
    },
    {
      key: 'total',
      header: 'Gross Settled',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.total} align="right" />,
    },
    {
      key: 'status',
      header: 'Settlement Status',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Accountant Operational Ledger
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Daily tax calculations, VAT accounting, and invoice issuance control.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={Download}>
            Download Tax Ledger (CSV)
          </Button>
          <Button variant="primary" icon={Plus}>
            Issue New Invoice
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Daily Gross Settlement"
          value={227450.5}
          isCurrency
          icon={Receipt}
          iconVariant="green"
          subtitle="Collected today via Chapa"
        />
        <ERPMetric
          title="15% VAT Collected"
          value={29667.45}
          isCurrency
          icon={Calculator}
          iconVariant="navy"
          subtitle="Tax liability reserve"
        />
        <ERPMetric
          title="Invoices Issued Today"
          value={8}
          icon={FileText}
          iconVariant="info"
          subtitle="6 Paid · 2 Pending"
        />
        <ERPMetric
          title="Pending Payments"
          value={82450.5}
          isCurrency
          icon={Clock}
          iconVariant="warning"
          subtitle="Awaiting customer transfer"
        />
      </div>

      {/* Daily Tax & Settlement Table */}
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
          Daily Settlement & 15% VAT Breakdown
        </h3>
        <ERPTable columns={columns} data={dailySettlements} keyExtractor={(item) => item.id} />
      </div>
    </div>
  );
};
