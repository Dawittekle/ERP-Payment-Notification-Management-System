import React, { useState } from 'react';
import { CreditCard, Eye } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';
import { PaymentDetail, PaymentDetailRecord } from './PaymentDetail';
import { PaymentInitiationModal } from './PaymentInitiationModal';

interface PaymentListProps {
  initialOpenModal?: boolean;
}

/**
 * QINDE ERP — Payment Transactions Gateway Workspace
 */
export const PaymentList: React.FC<PaymentListProps> = ({ initialOpenModal = false }) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentDetailRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(initialOpenModal);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSavedView, setActiveSavedView] = useState('all');

  const [payments, setPayments] = useState<PaymentDetailRecord[]>([
    {
      id: 'pay_1',
      txRef: 'TX-89320-CP',
      chapaRef: 'CHAPA-98432-ET',
      invoiceNo: 'INV-2026-00182',
      customerName: 'Ethio Telecom Enterprise',
      amount: 145000.0,
      paymentMethod: 'Telebirr SuperApp',
      timestamp: '2026-09-01 14:32:10',
      status: 'PAID',
    },
    {
      id: 'pay_2',
      txRef: 'TX-89321-CP',
      chapaRef: 'CHAPA-98435-ET',
      invoiceNo: 'INV-2026-00183',
      customerName: 'Awash International Bank S.C.',
      amount: 82450.5,
      paymentMethod: 'CBE Birr',
      timestamp: '2026-09-01 15:10:04',
      status: 'PROCESSING',
    },
    {
      id: 'pay_3',
      txRef: 'TX-89319-CP',
      chapaRef: 'CHAPA-98428-ET',
      invoiceNo: 'INV-2026-00180',
      customerName: 'Dashen Bank Share Co.',
      amount: 215000.0,
      paymentMethod: 'Bank Transfer (CBE)',
      timestamp: '2026-08-28 11:20:00',
      status: 'PAID',
    },
  ]);

  const handlePaymentSuccess = () => {
    const newPay: PaymentDetailRecord = {
      id: `pay_${Date.now()}`,
      txRef: `TX-${Math.floor(89322 + Math.random() * 1000)}-CP`,
      chapaRef: `CHAPA-${Math.floor(98436 + Math.random() * 1000)}-ET`,
      invoiceNo: 'INV-2026-00183',
      customerName: 'Awash International Bank S.C.',
      amount: 82450.5,
      paymentMethod: 'Telebirr SuperApp',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'PAID',
    };
    setPayments([newPay, ...payments]);
  };

  if (selectedPayment) {
    return <PaymentDetail payment={selectedPayment} onBack={() => setSelectedPayment(null)} />;
  }

  // Filter based on Saved Views
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.txRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.chapaRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeSavedView === 'paid') return p.status === 'PAID';
    if (activeSavedView === 'processing') return p.status === 'PROCESSING';
    return true;
  });

  const columns: Column<PaymentDetailRecord>[] = [
    {
      key: 'txRef',
      header: 'Tx Reference',
      sortable: true,
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.txRef}
        </span>
      ),
    },
    {
      key: 'chapaRef',
      header: 'Gateway Chapa Ref',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
          {row.chapaRef}
        </span>
      ),
    },
    { key: 'customerName', header: 'Customer Entity' },
    { key: 'invoiceNo', header: 'Invoice #' },
    { key: 'paymentMethod', header: 'Payment Rail' },
    {
      key: 'amount',
      header: 'Settlement Amount',
      sortable: true,
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.amount} align="right" />,
    },
    {
      key: 'status',
      header: 'Gateway Status',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedPayment(row)}>
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Payment Gateway Transactions
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Real-time Chapa gateway transaction processing, webhooks, and settlement logs.
          </p>
        </div>

        <Button variant="success" icon={CreditCard} onClick={() => setIsModalOpen(true)}>
          Test Gateway Checkout
        </Button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Processed Revenue"
          value={442450.5}
          isCurrency
          icon={CreditCard}
          iconVariant="green"
        />
        <ERPMetric
          title="Active Gateway Transactions"
          value={payments.length}
          icon={CreditCard}
          iconVariant="navy"
        />
        <ERPMetric
          title="Processing Queue"
          value={1}
          icon={CreditCard}
          iconVariant="warning"
        />
      </div>

      {/* Filter Bar & Data Table */}
      <div>
        <ERPFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          activeFilters={[]}
          onRemoveFilter={() => {}}
          onClearAllFilters={() => {}}
          savedViews={[
            { id: 'all', name: 'All Payment Transactions' },
            { id: 'paid', name: 'Settled & Verified (PAID)' },
            { id: 'processing', name: 'Processing Queue' },
          ]}
          activeSavedView={activeSavedView}
          onSelectSavedView={(v) => setActiveSavedView(v)}
        />

        <ERPTable
          columns={columns}
          data={filteredPayments}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => setSelectedPayment(row)}
        />
      </div>

      {/* Payment Gateway Modal Simulation */}
      <PaymentInitiationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
