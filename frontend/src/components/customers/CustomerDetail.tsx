import React from 'react';
import { Building2, Mail, Phone, MapPin, FileText, Plus, Download } from 'lucide-react';
import { ERPObjectHeader } from '../erp/ERPObjectHeader';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPStatus, FinancialStatus } from '../erp/ERPStatus';
import { Button } from '../ui/Button';

export interface CustomerRecord {
  id: string;
  name: string;
  tinNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  totalInvoiced: number;
  totalPaid: number;
  outstandingBalance: number;
  status: FinancialStatus;
}

interface CustomerDetailProps {
  customer: CustomerRecord;
  onBack: () => void;
  onIssueInvoice: (customerId: string) => void;
}

interface CustomerInvoiceSummary {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  status: FinancialStatus;
}

/**
 * QINDE ERP — Customer Master-Detail Workspace
 */
export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onBack,
  onIssueInvoice,
}) => {
  const customerInvoices: CustomerInvoiceSummary[] = [
    {
      id: 'inv_101',
      invoiceNo: 'INV-2026-00182',
      date: '2026-08-15',
      amount: 145000.0,
      status: 'PAID',
    },
    {
      id: 'inv_102',
      invoiceNo: 'INV-2026-00190',
      date: '2026-09-01',
      amount: 45000.0,
      status: 'PENDING',
    },
  ];

  const columns: Column<CustomerInvoiceSummary>[] = [
    {
      key: 'invoiceNo',
      header: 'Invoice Reference',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.invoiceNo}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Issue Date',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', color: 'var(--color-text-secondary)' }}>
          {row.date}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Gross Total',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.amount} align="right" />,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <ERPObjectHeader
        objectType="Customer Directory"
        identifier={`TIN: ${customer.tinNumber}`}
        title={customer.name}
        status={customer.status}
        keyAmount={customer.totalPaid}
        subtitle={`Primary Contact: ${customer.contactPerson} (${customer.email})`}
        onBack={onBack}
        primaryAction={
          <Button variant="primary" icon={Plus} onClick={() => onIssueInvoice(customer.id)}>
            Issue Invoice
          </Button>
        }
        secondaryActions={
          <Button variant="secondary" icon={Download}>
            Statement (PDF)
          </Button>
        }
      />

      {/* Financial Overview Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Lifetime Invoiced"
          value={customer.totalInvoiced}
          isCurrency
          icon={FileText}
          iconVariant="navy"
        />
        <ERPMetric
          title="Settled Revenue Paid"
          value={customer.totalPaid}
          isCurrency
          icon={Building2}
          iconVariant="green"
        />
        <ERPMetric
          title="Outstanding Balance"
          value={customer.outstandingBalance}
          isCurrency
          icon={FileText}
          iconVariant="warning"
        />
      </div>

      {/* Info Card & Invoices History Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Entity Info Box */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '20px',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Organization Contact Profile
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <Building2 size={16} color="var(--color-brand-navy)" />
            <span>TIN: <strong>{customer.tinNumber}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <Mail size={16} color="var(--color-brand-navy)" />
            <span>{customer.email}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <Phone size={16} color="var(--color-brand-navy)" />
            <span>{customer.phone}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
            <MapPin size={16} color="var(--color-brand-navy)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{customer.address}</span>
          </div>
        </div>

        {/* Invoice History Grid */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '16px' }}>
            Customer Billing & Invoice History
          </h3>
          <ERPTable columns={columns} data={customerInvoices} keyExtractor={(i) => i.id} />
        </div>
      </div>
    </div>
  );
};
