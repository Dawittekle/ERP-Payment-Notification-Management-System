import React, { useState } from 'react';
import { ERPShell } from './components/layout/ERPShell';
import { NavItemKey, UserRole } from './types';
import {
  CreditCard,
  FileText,
  Users,
  RotateCcw,
  Plus,
  Download,
  Send,
  Eye,
} from 'lucide-react';
import { ERPMetric } from './components/erp/ERPMetric';
import { ERPStatus, FinancialStatus } from './components/erp/ERPStatus';
import { ERPMoney } from './components/erp/ERPMoney';
import { ERPTable, Column } from './components/erp/ERPTable';
import { ERPFilterBar } from './components/erp/ERPFilterBar';
import { ERPObjectHeader } from './components/erp/ERPObjectHeader';
import { ERPTimeline, TimelineEvent } from './components/erp/ERPTimeline';
import { Button } from './components/ui/Button';

// Sample Financial Record Interface
interface SampleInvoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: FinancialStatus;
}

export const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState<NavItemKey>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('FINANCE_MANAGER');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHeaderTab, setActiveHeaderTab] = useState('overview');

  // Sample Financial Data
  const invoicesData: SampleInvoice[] = [
    {
      id: 'inv_101',
      invoiceNo: 'INV-2026-00182',
      customerName: 'Ethio Telecom Enterprise',
      amount: 145000.0,
      dueDate: '2026-09-15',
      status: 'PAID',
    },
    {
      id: 'inv_102',
      invoiceNo: 'INV-2026-00183',
      customerName: 'Awash International Bank',
      amount: 82450.5,
      dueDate: '2026-09-10',
      status: 'PENDING',
    },
    {
      id: 'inv_103',
      invoiceNo: 'INV-2026-00184',
      customerName: 'Habesha Breweries S.C.',
      amount: 32100.0,
      dueDate: '2026-08-30',
      status: 'OVERDUE',
    },
    {
      id: 'inv_104',
      invoiceNo: 'INV-2026-00185',
      customerName: 'Dashen Bank Share Co.',
      amount: 215000.0,
      dueDate: '2026-09-02',
      status: 'PROCESSING',
    },
    {
      id: 'inv_105',
      invoiceNo: 'INV-2026-00186',
      customerName: 'Midroc Investment Group',
      amount: 67800.0,
      dueDate: '2026-09-20',
      status: 'NEEDS_REVIEW',
    },
  ];

  // Sample Transaction Signal Lifecycle Events
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'evt_1',
      title: 'Payment Initiated via Chapa Gateway',
      timestamp: '2026-09-01 14:32:10',
      status: 'completed',
      description: 'Transaction ref: TX-89320-CP. Customer authorized payment of ETB 145,000.00.',
      actor: 'System / Chapa v2 Boundary',
    },
    {
      id: 'evt_2',
      title: 'Webhook Signal Received',
      timestamp: '2026-09-01 14:32:15',
      status: 'completed',
      description: 'Chapa webhook payload verified with HMAC-SHA256 signature match.',
      actor: 'Payment Event Outbox Consumer',
    },
    {
      id: 'evt_3',
      title: 'Server Verification Confirmed',
      timestamp: '2026-09-01 14:32:18',
      status: 'completed',
      description: 'Direct server-to-server verification endpoint confirmed transaction status: SUCCESS.',
      actor: 'QINDE Verification Service',
    },
    {
      id: 'evt_4',
      title: 'Ledger Reconciled & Telegram Alert Dispatched',
      timestamp: '2026-09-01 14:32:20',
      status: 'completed',
      description: 'Invoice INV-2026-00182 updated to PAID. Dispatching alert to Telegram channel.',
      actor: 'Finance Ledger Engine',
    },
  ];

  // Table Column Definitions
  const columns: Column<SampleInvoice>[] = [
    {
      key: 'invoiceNo',
      header: 'Invoice Reference',
      sortable: true,
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.invoiceNo}
        </span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer Enterprise',
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Total Amount',
      sortable: true,
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.amount} align="right" />,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', color: 'var(--color-text-secondary)' }}>
          {row.dueDate}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: () => (
        <Button variant="ghost" size="sm" icon={Eye}>
          View
        </Button>
      ),
    },
  ];

  return (
    <ERPShell
      activeKey={activeKey}
      onNavigate={(key) => setActiveKey(key)}
      currentRole={currentRole}
      onChangeRole={(role) => setCurrentRole(role)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Phase 2 ERP Object Header Component Showcase */}
        <ERPObjectHeader
          objectType="Financial Cockpit"
          identifier="QINDE-PHASE-2"
          title="QINDE Shared ERP Component Suite"
          status="PAID"
          keyAmount={542350.5}
          subtitle="Production-ready financial primitives: ERPMetric, ERPStatus, ERPMoney, ERPTable, ERPFilterBar, and Transaction Signal Timeline."
          primaryAction={
            <Button variant="primary" icon={Plus}>
              New Invoice
            </Button>
          }
          secondaryActions={
            <Button variant="secondary" icon={Download}>
              Export Report
            </Button>
          }
          tabs={[
            { key: 'overview', label: 'Component Showcase', count: 6 },
            { key: 'invoices', label: 'Invoices Table View', count: 5 },
            { key: 'timeline', label: 'Transaction Signal Motif', count: 4 },
          ]}
          activeTab={activeHeaderTab}
          onTabChange={(k) => setActiveHeaderTab(k)}
        />

        {/* 1. ERPMetric KPI Cards Grid */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '14px' }}>
            1. ERPMetric KPI Stat Cards
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <ERPMetric
              title="Total Revenue Settled"
              value={442350.5}
              isCurrency
              icon={CreditCard}
              iconVariant="green"
              trend={{ percentage: 14.8, direction: 'up', label: 'vs last month' }}
            />
            <ERPMetric
              title="Pending Approval Queue"
              value={4}
              icon={RotateCcw}
              iconVariant="warning"
              trend={{ percentage: -2.4, direction: 'down', label: 'pending review' }}
            />
            <ERPMetric
              title="Active Customer Profiles"
              value="128"
              icon={Users}
              iconVariant="navy"
              subtitle="Verified business entities"
            />
            <ERPMetric
              title="Outstanding Overdue"
              value={32100.0}
              isCurrency
              icon={FileText}
              iconVariant="warning"
              trend={{ percentage: 5.1, direction: 'up', label: 'requires action' }}
            />
          </div>
        </div>

        {/* 2. ERPStatus Contract Showcase */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '8px' }}>
            2. ERPStatus Rule — Icon + Label + Semantic Color
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
            Strict compliance: status never communicates through color alone. Always pair explicit status icons with semantic badges.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <ERPStatus status="PAID" />
            <ERPStatus status="SUCCESS" />
            <ERPStatus status="VERIFIED" />
            <ERPStatus status="PENDING" />
            <ERPStatus status="PARTIALLY_PAID" />
            <ERPStatus status="NEEDS_REVIEW" />
            <ERPStatus status="FAILED" />
            <ERPStatus status="OVERDUE" />
            <ERPStatus status="PROCESSING" />
            <ERPStatus status="DRAFT" />
          </div>
        </div>

        {/* 3. Filter Bar & Dense ERP Data Table */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '14px' }}>
            3. ERPFilterBar & High-Density ERP Table
          </h2>

          <ERPFilterBar
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            activeFilters={[
              { id: 'f1', label: 'Status', value: 'Paid & Pending' },
              { id: 'f2', label: 'Currency', value: 'ETB' },
            ]}
            onRemoveFilter={() => {}}
            onClearAllFilters={() => {}}
          />

          <ERPTable
            columns={columns}
            data={invoicesData.filter((i) =>
              i.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              i.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            selectable
            selectedKeys={selectedInvoices}
            onSelectionChange={(keys) => setSelectedInvoices(keys)}
            bulkActions={
              <Button variant="success" size="sm" icon={Send}>
                Bulk Process
              </Button>
            }
            pagination={{
              currentPage: 1,
              totalPages: 5,
              totalItems: 48,
              pageSize: 10,
              onPageChange: () => {},
            }}
          />
        </div>

        {/* 4. Transaction Signal Lifecycle Timeline */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
            4. Transaction Signal Rail Motif (Payment Lifecycle)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
            Visual pulse indicator tracking payments from gateway initiation to webhook receipt and ledger reconciliation.
          </p>

          <ERPTimeline events={timelineEvents} />
        </div>
      </div>
    </ERPShell>
  );
};
