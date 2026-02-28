import React, { useState } from 'react';
import { Plus, Eye, FileText } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';
import { InvoiceDetail, InvoiceDetailRecord } from './InvoiceDetail';
import { InvoiceCreateWizard, NewInvoiceData } from './InvoiceCreateWizard';

interface InvoiceListProps {
  onInitiatePaymentForInvoice?: (invoiceId: string) => void;
}

/**
 * QINDE ERP — Invoice Ledger Workspace
 */
export const InvoiceList: React.FC<InvoiceListProps> = ({ onInitiatePaymentForInvoice }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetailRecord | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSavedView, setActiveSavedView] = useState('all');

  const [invoices, setInvoices] = useState<InvoiceDetailRecord[]>([
    {
      id: 'inv_101',
      invoiceNo: 'INV-2026-00182',
      customerName: 'Ethio Telecom Enterprise',
      tinNumber: '0048932014',
      issueDate: '2026-08-15',
      dueDate: '2026-09-15',
      subtotal: 126086.96,
      vatAmount: 18913.04,
      grossAmount: 145000.0,
      status: 'PAID',
      lineItems: [
        { id: 'l1', description: 'QINDE Enterprise SaaS Annual Core License', qty: 1, unitPrice: 126086.96, total: 126086.96 },
      ],
    },
    {
      id: 'inv_102',
      invoiceNo: 'INV-2026-00183',
      customerName: 'Awash International Bank S.C.',
      tinNumber: '0012398410',
      issueDate: '2026-08-20',
      dueDate: '2026-09-10',
      subtotal: 71696.09,
      vatAmount: 10754.41,
      grossAmount: 82450.5,
      status: 'PENDING',
      lineItems: [
        { id: 'l2', description: 'Payment Notification Gateway API Service', qty: 1, unitPrice: 71696.09, total: 71696.09 },
      ],
    },
    {
      id: 'inv_103',
      invoiceNo: 'INV-2026-00184',
      customerName: 'Habesha Breweries S.C.',
      tinNumber: '0098412055',
      issueDate: '2026-07-30',
      dueDate: '2026-08-30',
      subtotal: 27913.04,
      vatAmount: 4186.96,
      grossAmount: 32100.0,
      status: 'OVERDUE',
      lineItems: [
        { id: 'l3', description: 'ERP Integration Support & Onboarding', qty: 1, unitPrice: 27913.04, total: 27913.04 },
      ],
    },
  ]);

  const handleCreateInvoice = (newInv: NewInvoiceData) => {
    const createdRecord: InvoiceDetailRecord = {
      id: `inv_${Date.now()}`,
      invoiceNo: `INV-2026-00${Math.floor(100 + Math.random() * 900)}`,
      customerName: newInv.customerName,
      tinNumber: newInv.tinNumber,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInv.dueDate,
      subtotal: newInv.subtotal,
      vatAmount: newInv.vatAmount,
      grossAmount: newInv.grossTotal,
      status: 'PENDING',
      lineItems: newInv.lineItems.map((item) => ({
        id: item.id,
        description: item.description,
        qty: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
    };
    setInvoices([createdRecord, ...invoices]);
  };

  if (selectedInvoice) {
    return (
      <InvoiceDetail
        invoice={selectedInvoice}
        onBack={() => setSelectedInvoice(null)}
        onInitiatePayment={(id) => onInitiatePaymentForInvoice?.(id)}
      />
    );
  }

  // Filter Data based on Saved View Selector
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeSavedView === 'paid') return inv.status === 'PAID';
    if (activeSavedView === 'pending') return inv.status === 'PENDING';
    if (activeSavedView === 'overdue') return inv.status === 'OVERDUE';
    return true;
  });

  const columns: Column<InvoiceDetailRecord>[] = [
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
    { key: 'customerName', header: 'Customer Entity', sortable: true },
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
      key: 'grossAmount',
      header: 'Gross Total',
      sortable: true,
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.grossAmount} align="right" />,
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
      accessor: (row) => (
        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedInvoice(row)}>
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Workspace Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Invoice Ledger & Tax Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Issue invoices, track settlement states, and view itemized 15% VAT tax lines.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setIsWizardOpen(true)}>
          Issue Tax Invoice
        </Button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Invoiced Gross"
          value={259550.5}
          isCurrency
          icon={FileText}
          iconVariant="navy"
        />
        <ERPMetric
          title="Settled Paid Revenue"
          value={145000.0}
          isCurrency
          icon={FileText}
          iconVariant="green"
        />
        <ERPMetric
          title="Pending Receivables"
          value={82450.5}
          isCurrency
          icon={FileText}
          iconVariant="info"
        />
        <ERPMetric
          title="Overdue Receivables"
          value={32100.0}
          isCurrency
          icon={FileText}
          iconVariant="warning"
        />
      </div>

      {/* Filter Toolbar & Data Table */}
      <div>
        <ERPFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          activeFilters={[]}
          onRemoveFilter={() => {}}
          onClearAllFilters={() => {}}
          savedViews={[
            { id: 'all', name: 'All Invoices' },
            { id: 'paid', name: 'Paid Invoices' },
            { id: 'pending', name: 'Pending Payment' },
            { id: 'overdue', name: 'Overdue Invoices' },
          ]}
          activeSavedView={activeSavedView}
          onSelectSavedView={(v) => setActiveSavedView(v)}
        />

        <ERPTable
          columns={columns}
          data={filteredInvoices}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => setSelectedInvoice(row)}
        />
      </div>

      {/* Invoice Creation Wizard Drawer */}
      <InvoiceCreateWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleCreateInvoice}
      />
    </div>
  );
};
