import React, { useState } from 'react';
import { Activity, Server, RefreshCw, ShieldCheck } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPTable, Column } from '../erp/ERPTable';
import { Button } from '../ui/Button';

export interface WebhookEventLog {
  id: string;
  eventId: string;
  provider: 'CHAPA_GATEWAY' | 'TELEBIRR_DIRECT';
  signatureState: 'VERIFIED' | 'FAILED_HMAC';
  payloadSummary: string;
  processedAt: string;
  latencyMs: number;
}

/**
 * QINDE ERP — System Integration & Webhook Health Monitor
 */
export const SystemHealthMonitor: React.FC = () => {
  const [webhooks] = useState<WebhookEventLog[]>([
    {
      id: 'wb_1',
      eventId: 'evt_chapa_89432',
      provider: 'CHAPA_GATEWAY',
      signatureState: 'VERIFIED',
      payloadSummary: 'checkout.completed · Amount: 145,000.00 ETB',
      processedAt: '2026-09-01 14:32:10',
      latencyMs: 84,
    },
    {
      id: 'wb_2',
      eventId: 'evt_chapa_89433',
      provider: 'CHAPA_GATEWAY',
      signatureState: 'VERIFIED',
      payloadSummary: 'checkout.processing · Amount: 82,450.50 ETB',
      processedAt: '2026-09-01 15:10:04',
      latencyMs: 92,
    },
  ]);

  const columns: Column<WebhookEventLog>[] = [
    {
      key: 'eventId',
      header: 'Event ID',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
          {row.eventId}
        </span>
      ),
    },
    { key: 'provider', header: 'Gateway Provider' },
    {
      key: 'signatureState',
      header: 'HMAC SHA256 Status',
      accessor: (row) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 700,
            color: row.signatureState === 'VERIFIED' ? 'var(--color-status-success)' : 'var(--color-status-error)',
          }}
        >
          <ShieldCheck size={14} /> {row.signatureState}
        </span>
      ),
    },
    { key: 'payloadSummary', header: 'Payload Summary' },
    {
      key: 'latencyMs',
      header: 'Latency',
      align: 'right',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontSize: '12px' }}>
          {row.latencyMs} ms
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: () => (
        <Button variant="ghost" size="sm" icon={RefreshCw}>
          Replay Webhook
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Chapa Gateway & Webhook Infrastructure Health
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Real-time API latency monitoring, HMAC verification engine, and background poller status.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Chapa Gateway Endpoint Latency"
          value="88ms"
          icon={Activity}
          iconVariant="green"
          subtitle="SLA Target: <200ms"
        />
        <ERPMetric
          title="HMAC Verification Engine"
          value="100% Operational"
          icon={ShieldCheck}
          iconVariant="navy"
          subtitle="SHA256 Signature Guard"
        />
        <ERPMetric
          title="Background Jobs Poller"
          value="Active (Idle)"
          icon={Server}
          iconVariant="green"
          subtitle="Polling frequency: 15s"
        />
      </div>

      <ERPTable columns={columns} data={webhooks} keyExtractor={(item) => item.id} />
    </div>
  );
};
