import React, { useState } from 'react';
import { RotateCcw, Eye, ShieldCheck } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';
import { RefundDetail, RefundDetailRecord } from './RefundDetail';
import { RefundRequestModal } from './RefundRequestModal';

export const RefundList: React.FC = () => {
  const [selectedRefund, setSelectedRefund] = useState<RefundDetailRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSavedView, setActiveSavedView] = useState('all');

  const [refunds, setRefunds] = useState<RefundDetailRecord[]>([
    {
      id: 'ref_101',
      refundNo: 'RFD-2026-0042',
      invoiceNo: 'INV-2026-00182',
      customerName: 'Ethio Telecom Enterprise',
      amount: 14500.0,
      reason: 'Partial refund due to SLA service disruption hours',
      requestedBy: 'mesfin.accountant@qinde.et',
      approvedBy: 'dawit.tekle@qinde.com',
      timestamp: '2026-09-01 11:20:00',
      status: 'PAID',
      chapaRefundRef: 'CHAPA-RFD-90432',
    },
    {
      id: 'ref_102',
      refundNo: 'RFD-2026-0043',
      invoiceNo: 'INV-2026-00183',
      customerName: 'Awash International Bank S.C.',
      amount: 25000.0,
      reason: 'Duplicate payment authorization auto-detected by webhook',
      requestedBy: 'selam.accountant@qinde.et',
      timestamp: '2026-09-01 15:40:00',
      status: 'AUTH_NEEDED',
    },
  ]);

  const handleApproveRefund = (refundId: string) => {
    setRefunds(
      refunds.map((r) =>
        r.id === refundId
          ? {
              ...r,
              status: 'PAID',
              approvedBy: 'dawit.tekle@qinde.com',
              chapaRefundRef: `CHAPA-RFD-${Math.floor(90433 + Math.random() * 1000)}`,
            }
          : r
      )
    );
    if (selectedRefund && selectedRefund.id === refundId) {
      setSelectedRefund({
        ...selectedRefund,
        status: 'PAID',
        approvedBy: 'dawit.tekle@qinde.com',
        chapaRefundRef: `CHAPA-RFD-90434`,
      });
    }
  };

  const handleCreateRefundRequest = (data: { amount: number; reason: string }) => {
    const newRef: RefundDetailRecord = {
      id: `ref_${Date.now()}`,
      refundNo: `RFD-2026-00${Math.floor(44 + Math.random() * 100)}`,
      invoiceNo: 'INV-2026-00182',
      customerName: 'Ethio Telecom Enterprise',
      amount: data.amount,
      reason: data.reason,
      requestedBy: 'dawit.tekle@qinde.com',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'AUTH_NEEDED',
    };
    setRefunds([newRef, ...refunds]);
  };

  if (selectedRefund) {
    return (
      <RefundDetail
        refund={selectedRefund}
        onBack={() => setSelectedRefund(null)}
        onApproveRefund={handleApproveRefund}
      />
    );
  }

  const filteredRefunds = refunds.filter((r) => {
    const matchesSearch =
      r.refundNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeSavedView === 'pending') return r.status === 'AUTH_NEEDED';
    if (activeSavedView === 'completed') return r.status === 'PAID';
    return true;
  });

  const columns: Column<RefundDetailRecord>[] = [
    {
      key: 'refundNo',
      header: 'Refund Reference',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.refundNo}
        </span>
      ),
    },
    { key: 'customerName', header: 'Customer Entity' },
    { key: 'invoiceNo', header: 'Invoice Reference' },
    {
      key: 'amount',
      header: 'Refund Amount',
      align: 'right',
      accessor: (row) => <ERPMoney amount={row.amount} color="var(--color-status-error)" align="right" />,
    },
    {
      key: 'status',
      header: 'Authorization State',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {row.status === 'AUTH_NEEDED' && (
            <Button variant="success" size="sm" icon={ShieldCheck} onClick={(e) => { e.stopPropagation(); handleApproveRefund(row.id); }}>
              Approve Payout
            </Button>
          )}
          <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedRefund(row)}>
            Inspect
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Refund Queue & Dual-Authorization Workspace
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Finance Manager authorization queue for customer payout requests.
          </p>
        </div>

        <Button variant="danger" icon={RotateCcw} onClick={() => setIsModalOpen(true)}>
          Request Customer Refund
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Awaiting Dual-Authorization"
          value={refunds.filter((r) => r.status === 'AUTH_NEEDED').length}
          icon={RotateCcw}
          iconVariant="warning"
          subtitle="Requires Manager Payout Approval"
        />
        <ERPMetric
          title="Total Refund Payouts Settled"
          value={14500.0}
          isCurrency
          icon={RotateCcw}
          iconVariant="green"
        />
        <ERPMetric
          title="Pending Authorization Value"
          value={25000.0}
          isCurrency
          icon={RotateCcw}
          iconVariant="info"
        />
      </div>

      <div>
        <ERPFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          activeFilters={[]}
          onRemoveFilter={() => {}}
          onClearAllFilters={() => {}}
          savedViews={[
            { id: 'all', name: 'All Refund Requests' },
            { id: 'pending', name: 'Awaiting Authorization (AUTH_NEEDED)' },
            { id: 'completed', name: 'Settled Payouts (PAID)' },
          ]}
          activeSavedView={activeSavedView}
          onSelectSavedView={(v) => setActiveSavedView(v)}
        />

        <ERPTable
          columns={columns}
          data={filteredRefunds}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => setSelectedRefund(row)}
        />
      </div>

      <RefundRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRefundRequest}
      />
    </div>
  );
};
