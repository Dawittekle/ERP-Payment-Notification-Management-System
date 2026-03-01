import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPTable, Column } from '../erp/ERPTable';
import { ERPFilterBar } from '../erp/ERPFilterBar';
import { Button } from '../ui/Button';

export interface TelegramOutboxLog {
  id: string;
  eventId: string;
  channel: 'TELEGRAM_BOT' | 'EMAIL';
  recipient: string;
  messageType: 'PAYMENT_RECEIVED' | 'INVOICE_ISSUED' | 'REFUND_APPROVED';
  timestamp: string;
  status: 'DELIVERED' | 'PENDING' | 'FAILED';
  retryCount: number;
}

/**
 * QINDE ERP — Notification & Telegram Bot Outbox Logs Workspace
 */
export const NotificationLogList: React.FC = () => {
  const [logs, setLogs] = useState<TelegramOutboxLog[]>([
    {
      id: 'notif_101',
      eventId: 'EVT-90432',
      channel: 'TELEGRAM_BOT',
      recipient: '@qinde_finance_alerts',
      messageType: 'PAYMENT_RECEIVED',
      timestamp: '2026-09-01 14:32:11',
      status: 'DELIVERED',
      retryCount: 0,
    },
    {
      id: 'notif_102',
      eventId: 'EVT-90433',
      channel: 'EMAIL',
      recipient: 'billing@ethiotelecom.et',
      messageType: 'INVOICE_ISSUED',
      timestamp: '2026-09-01 15:00:00',
      status: 'DELIVERED',
      retryCount: 0,
    },
    {
      id: 'notif_103',
      eventId: 'EVT-90434',
      channel: 'TELEGRAM_BOT',
      recipient: '@qinde_finance_alerts',
      messageType: 'REFUND_APPROVED',
      timestamp: '2026-09-01 15:42:00',
      status: 'PENDING',
      retryCount: 1,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleRetryNotification = (id: string) => {
    setLogs(
      logs.map((l) =>
        l.id === id ? { ...l, status: 'DELIVERED', retryCount: l.retryCount + 1 } : l
      )
    );
  };

  const columns: Column<TelegramOutboxLog>[] = [
    {
      key: 'eventId',
      header: 'Event ID',
      accessor: (row) => (
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-technical)', color: 'var(--color-brand-navy)' }}>
          {row.eventId}
        </span>
      ),
    },
    { key: 'channel', header: 'Channel' },
    { key: 'recipient', header: 'Recipient Target' },
    { key: 'messageType', header: 'Event Payload' },
    {
      key: 'timestamp',
      header: 'Dispatched At',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          {row.timestamp}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Outbox State',
      accessor: (row) => (
        <ERPStatus
          status={row.status === 'DELIVERED' ? 'SUCCESS' : row.status === 'PENDING' ? 'PENDING' : 'FAILED'}
          customLabel={row.status}
          size="sm"
        />
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        row.status !== 'DELIVERED' ? (
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={() => handleRetryNotification(row.id)}>
            Retry
          </Button>
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--color-status-success)' }}>Delivered</span>
        )
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Notification Outbox & Telegram Bot Queue
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Transactional outbox pattern log stream for Telegram bot dispatches and email receipts.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Total Messages Dispatched"
          value={1420}
          icon={Send}
          iconVariant="green"
          subtitle="99.8% Success Delivery Rate"
        />
        <ERPMetric
          title="Outbox Queue Latency"
          value="120ms"
          icon={Send}
          iconVariant="navy"
          subtitle="Polling interval: 500ms"
        />
        <ERPMetric
          title="Pending Retries"
          value={logs.filter((l) => l.status === 'PENDING').length}
          icon={Send}
          iconVariant="warning"
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
          data={logs.filter((l) =>
            l.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.eventId.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};
