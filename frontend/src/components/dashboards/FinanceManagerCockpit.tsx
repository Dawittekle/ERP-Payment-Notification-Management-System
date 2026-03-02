import React from 'react';
import {
  CreditCard,
  RotateCcw,
  GitCompare,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { Button } from '../ui/Button';
import { ERPRevenueChart } from '../charts/ERPRevenueChart';
import { ERPBarChart } from '../charts/ERPBarChart';
import { ERPDonutChart } from '../charts/ERPDonutChart';
import { ERPGaugeChart } from '../charts/ERPGaugeChart';

interface PendingRefund {
  id: string;
  refundNo: string;
  customerName: string;
  originalAmount: number;
  refundAmount: number;
  reason: string;
  status: 'REQUESTED' | 'AUTH_NEEDED';
}

/**
 * QINDE ERP — Finance Manager Cockpit
 * Exception-First Executive Dashboard highlighting settlement velocity, pending refund approvals,
 * and reconciliation discrepancy alerts.
 */
export const FinanceManagerCockpit: React.FC = () => {
  const pendingRefunds: PendingRefund[] = [
    {
      id: 'ref_101',
      refundNo: 'REF-2026-0042',
      customerName: 'Ethio Telecom Enterprise',
      originalAmount: 145000.0,
      refundAmount: 12500.0,
      reason: 'Duplicate payment attempt on gateway',
      status: 'AUTH_NEEDED',
    },
    {
      id: 'ref_102',
      refundNo: 'REF-2026-0043',
      customerName: 'Awash International Bank',
      originalAmount: 82450.5,
      refundAmount: 8245.0,
      reason: 'Partial SLA billing adjustment',
      status: 'REQUESTED',
    },
  ];

  const refundColumns: Column<PendingRefund>[] = [
    {
      key: 'refundNo',
      header: 'Refund Ref',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.refundNo}
        </span>
      ),
    },
    { key: 'customerName', header: 'Customer Entity' },
    {
      key: 'originalAmount',
      header: 'Original Amount',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.originalAmount} align="right" />,
    },
    {
      key: 'refundAmount',
      header: 'Refund Requested',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.refundAmount} color="var(--color-status-error)" align="right" />,
    },
    { key: 'reason', header: 'Stated Justification' },
    {
      key: 'status',
      header: 'Approval State',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'action',
      header: 'Dual Auth Action',
      align: 'center',
      accessor: () => (
        <Button variant="success" size="sm">
          Approve Refund
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Row with Sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Monthly Revenue"
          value={1245800.0}
          isCurrency
          icon={CreditCard}
          iconVariant="green"
          trend={{ percentage: 18.4, direction: 'up', label: 'vs last month' }}
          sparklineData={[42000, 58000, 74000, 61000, 89000, 112000, 145000]}
        />
        <ERPMetric
          title="Refund Approval Queue"
          value={2}
          icon={RotateCcw}
          iconVariant="warning"
          trend={{ percentage: -1.0, direction: 'neutral', label: 'requires dual authorization' }}
          sparklineData={[5, 4, 3, 4, 2, 3, 2]}
        />
        <ERPMetric
          title="Reconciliation Differences"
          value={2}
          icon={GitCompare}
          iconVariant="info"
          subtitle="Chapa vs ERP match rate: 99.4%"
          sparklineData={[8, 6, 4, 5, 3, 2, 2]}
        />
        <ERPMetric
          title="Overdue Receivables"
          value={64200.0}
          isCurrency
          icon={FileText}
          iconVariant="navy"
          trend={{ percentage: -4.2, direction: 'down', label: 'improving collection' }}
          sparklineData={[92000, 88000, 76000, 71000, 68000, 64200]}
        />
      </div>

      {/* Primary Analytics & Financial Spline Chart */}
      <ERPRevenueChart />

      {/* Secondary Data Visualization Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <ERPBarChart />
        <ERPDonutChart />
        <ERPGaugeChart />
      </div>

      {/* Exception Alert Banner */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'var(--color-status-warning-bg)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={20} color="var(--color-status-warning)" />
          <div>
            <strong style={{ fontSize: '14px', color: 'var(--color-brand-navy)' }}>
              2 Discrepancies Detected in Chapa Settlement Reconciliation
            </strong>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Batch #SETTLE-8930 has 2 transactions where gateway payout does not match ERP invoice totals.
            </p>
          </div>
        </div>

        <Button variant="secondary" size="sm">
          Open Reconciliation Workspace
        </Button>
      </div>

      {/* Pending Refund Approval Queue */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Dual-Authorization Refund Approval Queue
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Refund requests awaiting Finance Manager signature. Unused balance constraints enforced.
            </p>
          </div>
          <ERPStatus status="AUTH_NEEDED" customLabel="2 Pending Approval" />
        </div>

        <ERPTable columns={refundColumns} data={pendingRefunds} keyExtractor={(r) => r.id} />
      </div>
    </div>
  );
};
