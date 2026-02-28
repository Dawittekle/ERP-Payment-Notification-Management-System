import React, { useState } from 'react';
import { Plus, Building2, Eye } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';
import { CustomerRecord, CustomerDetail } from './CustomerDetail';
import { CustomerDrawer, CustomerData } from './CustomerDrawer';

interface CustomerListProps {
  onIssueInvoiceForCustomer?: (customerId: string) => void;
}

/**
 * QINDE ERP — Customer Directory Workspace
 */
export const CustomerList: React.FC<CustomerListProps> = ({ onIssueInvoiceForCustomer }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [customers, setCustomers] = useState<CustomerRecord[]>([
    {
      id: 'cust_1',
      name: 'Ethio Telecom Enterprise',
      tinNumber: '0048932014',
      contactPerson: 'Ato Bethlehem Worku',
      email: 'billing@ethiotelecom.et',
      phone: '+251 911 234 567',
      address: 'Churchill Road, Addis Ababa, Ethiopia',
      totalInvoiced: 190000.0,
      totalPaid: 145000.0,
      outstandingBalance: 45000.0,
      status: 'ACTIVE',
    },
    {
      id: 'cust_2',
      name: 'Awash International Bank S.C.',
      tinNumber: '0012398410',
      contactPerson: 'Wro Meron Tadesse',
      email: 'finance@awashbank.com',
      phone: '+251 911 876 543',
      address: 'Ras Abebe Aregay Street, Addis Ababa',
      totalInvoiced: 82450.5,
      totalPaid: 82450.5,
      outstandingBalance: 0.0,
      status: 'VERIFIED',
    },
    {
      id: 'cust_3',
      name: 'Habesha Breweries S.C.',
      tinNumber: '0098412055',
      contactPerson: 'Ato Yonas Alemu',
      email: 'accounts@habeshabrewery.et',
      phone: '+251 922 456 789',
      address: 'Debre Birhan Industrial Zone, Amhara, Ethiopia',
      totalInvoiced: 32100.0,
      totalPaid: 0.0,
      outstandingBalance: 32100.0,
      status: 'OVERDUE',
    },
  ]);

  const handleRegisterCustomer = (data: CustomerData) => {
    const newCust: CustomerRecord = {
      id: `cust_${Date.now()}`,
      name: data.name,
      tinNumber: data.tinNumber,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
      totalInvoiced: 0,
      totalPaid: 0,
      outstandingBalance: 0,
      status: 'ACTIVE',
    };
    setCustomers([newCust, ...customers]);
  };

  if (selectedCustomer) {
    return (
      <CustomerDetail
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        onIssueInvoice={(id) => onIssueInvoiceForCustomer?.(id)}
      />
    );
  }

  const columns: Column<CustomerRecord>[] = [
    {
      key: 'name',
      header: 'Enterprise Name',
      sortable: true,
      accessor: (row) => (
        <div>
          <strong style={{ color: 'var(--color-brand-navy)', fontSize: '14px', display: 'block' }}>
            {row.name}
          </strong>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-technical)' }}>
            TIN: {row.tinNumber}
          </span>
        </div>
      ),
    },
    { key: 'contactPerson', header: 'Contact Person' },
    { key: 'email', header: 'Email' },
    {
      key: 'totalInvoiced',
      header: 'Total Invoiced',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.totalInvoiced} align="right" />,
    },
    {
      key: 'outstandingBalance',
      header: 'Outstanding',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.outstandingBalance} color={row.outstandingBalance > 0 ? 'var(--color-status-warning)' : 'var(--color-text-secondary)'} align="right" />,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedCustomer(row)}>
          View
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
            Customer Accounts Directory
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Registered client business entities, tax TIN numbers, and billing profiles.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setIsDrawerOpen(true)}>
          Register New Customer
        </Button>
      </div>

      {/* Overview KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Registered Entities"
          value={customers.length}
          icon={Building2}
          iconVariant="navy"
        />
        <ERPMetric
          title="Total Settled Revenue"
          value={227450.5}
          isCurrency
          icon={Building2}
          iconVariant="green"
        />
        <ERPMetric
          title="Total Receivables Outstanding"
          value={77100.0}
          isCurrency
          icon={Building2}
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
        />

        <ERPTable
          columns={columns}
          data={customers.filter((c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.tinNumber.includes(searchQuery)
          )}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => setSelectedCustomer(row)}
        />
      </div>

      {/* Customer Drawer Form */}
      <CustomerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleRegisterCustomer}
      />
    </div>
  );
};
