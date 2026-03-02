import React, { useState } from 'react';
import { ShieldCheck, Eye } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';

export interface AuditLogItem {
  id: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

/**
 * QINDE ERP — Audit Log Workspace Page
 */
export const AuditLogList: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [logs] = useState<AuditLogItem[]>([
    {
      id: 'aud_101',
      actor: 'dawit.tekle@qinde.com',
      role: 'FINANCE_MANAGER',
      action: 'REFUND_APPROVED',
      resource: 'RFD-2026-0042',
      timestamp: '2026-09-01 16:30:12',
      ipAddress: '197.156.90.12',
      details: 'Approved customer payout of 14,500.00 ETB for Ethio Telecom Enterprise.',
      status: 'SUCCESS',
    },
    {
      id: 'aud_102',
      actor: 'mesfin.accountant@qinde.et',
      role: 'ACCOUNTANT',
      action: 'INVOICE_CREATED',
      resource: 'INV-2026-00183',
      timestamp: '2026-09-01 14:10:05',
      ipAddress: '197.156.90.15',
      details: 'Issued multi-line tax invoice with 15% Ethiopian VAT auto-calculation.',
      status: 'SUCCESS',
    },
    {
      id: 'aud_103',
      actor: 'system.chapa.webhook',
      role: 'SYSTEM',
      action: 'HMAC_VERIFICATION_FAILED',
      resource: 'TX-89322-CP',
      timestamp: '2026-09-01 10:15:00',
      ipAddress: '52.28.110.45',
      details: 'Signature verification mismatch detected on incoming Chapa webhook payload.',
      status: 'WARNING',
    },
  ]);

  const columns: Column<AuditLogItem>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          {row.timestamp}
        </span>
      ),
    },
    { key: 'actor', header: 'Actor Email' },
    {
      key: 'role',
      header: 'Role',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--color-brand-navy)' }}>
          {row.role}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action Event',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
          {row.action}
        </span>
      ),
    },
    { key: 'resource', header: 'Resource Target' },
    { key: 'ipAddress', header: 'IP Address' },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedLog(row)}>
          Inspect Audit JSON
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            System Audit Trail & Immutable Log Stream
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Real-time compliance logs for security, financial transactions, and RBAC actions.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Audit Events Recorded"
          value={12840}
          icon={ShieldCheck}
          iconVariant="navy"
          subtitle="Retention: 365 Days"
        />
        <ERPMetric
          title="Security Exceptions"
          value={1}
          icon={ShieldCheck}
          iconVariant="warning"
          subtitle="Signature Mismatches"
        />
        <ERPMetric
          title="Active Authenticated Sessions"
          value={24}
          icon={ShieldCheck}
          iconVariant="green"
        />
      </div>

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
          data={logs.filter(
            (l) =>
              l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.resource.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => setSelectedLog(row)}
        />
      </div>

      {/* JSON Inspect Drawer Modal */}
      {selectedLog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 42, 67, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedLog(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-modal)',
              border: '1px solid var(--color-border-default)',
              boxShadow: 'var(--shadow-overlay)',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '12px' }}>
              Audit Log Details: {selectedLog.id}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              {selectedLog.details}
            </p>
            <pre
              style={{
                backgroundColor: 'var(--color-brand-navy)',
                color: '#fff',
                padding: '16px',
                borderRadius: 'var(--radius-micro)',
                fontSize: '12px',
                fontFamily: 'var(--font-family-technical)',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(selectedLog, null, 2)}
            </pre>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setSelectedLog(null)}>
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
