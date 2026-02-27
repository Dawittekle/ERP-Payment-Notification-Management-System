import React from 'react';
import {
  ShieldCheck,
  Activity,
  Send,
  Users,
} from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPStatus } from '../erp/ERPStatus';
import { ERPTable, Column } from '../erp/ERPTable';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED';
}

/**
 * QINDE ERP — System Administrator Cockpit
 * Focused on RBAC user permissions, system health indicators, audit event logs, and Telegram bot notification status.
 */
export const AdminCockpit: React.FC = () => {
  const auditLogs: AuditLog[] = [
    {
      id: 'aud_101',
      timestamp: '2026-09-01 15:42:10',
      user: 'dawit.tekle@qinde.com',
      action: 'UPDATE_ROLE_PERMISSIONS',
      entity: 'ROLE:ACCOUNTANT',
      ipAddress: '197.156.12.89',
      status: 'SUCCESS',
    },
    {
      id: 'aud_102',
      timestamp: '2026-09-01 15:38:04',
      user: 'system.outbox.worker',
      action: 'DISPATCH_TELEGRAM_NOTIF',
      entity: 'NOTIF:PAY-8932',
      ipAddress: '127.0.0.1 (Local)',
      status: 'SUCCESS',
    },
    {
      id: 'aud_103',
      timestamp: '2026-09-01 14:32:15',
      user: 'chapa.webhook.listener',
      action: 'VERIFY_WEBHOOK_HMAC',
      entity: 'WEBHOOK:CHAPA-98432',
      ipAddress: '196.188.42.10',
      status: 'SUCCESS',
    },
  ];

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
          {row.timestamp}
        </span>
      ),
    },
    {
      key: 'user',
      header: 'User / Service Principal',
      accessor: (row) => <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>{row.user}</span>,
    },
    { key: 'action', header: 'Action Executed' },
    { key: 'entity', header: 'Target Entity' },
    {
      key: 'ipAddress',
      header: 'Origin IP',
      accessor: (row) => (
        <span style={{ fontFamily: 'var(--font-family-technical)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          {row.ipAddress}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Outcome',
      accessor: (row) => <ERPStatus status={row.status} size="sm" />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="System Health Score"
          value="99.9%"
          icon={Activity}
          iconVariant="green"
          subtitle="All micro-modules nominal"
        />
        <ERPMetric
          title="Active RBAC Users"
          value={7}
          icon={Users}
          iconVariant="navy"
          subtitle="Across 7 System Roles"
        />
        <ERPMetric
          title="Telegram Bot Outbox"
          value="Healthy"
          icon={Send}
          iconVariant="info"
          subtitle="Queue latency: 120ms"
        />
        <ERPMetric
          title="Security Events Today"
          value={142}
          icon={ShieldCheck}
          iconVariant="warning"
          subtitle="Zero unauthorized attempts"
        />
      </div>

      {/* Health Panels Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Telegram Bot & Webhook Health Panel */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '20px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Outbox Event Consumer & Webhooks
            </h3>
            <ERPStatus status="ACTIVE" customLabel="Telegram Bot Connected" />
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span>Chapa Webhook Listener:</span>
              <strong style={{ color: 'var(--color-status-success)' }}>● 200 OK (0 retries)</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span>Telegram Bot Notification Outbox:</span>
              <strong style={{ color: 'var(--color-status-success)' }}>● 0 Pending / 1,420 Dispatched</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PostgreSQL Database Connection Pool:</span>
              <strong style={{ color: 'var(--color-brand-navy)' }}>12 Active / 50 Max</strong>
            </li>
          </ul>
        </div>

        {/* Database & System Container Specs */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '20px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Docker Stack & Environment Infrastructure
            </h3>
            <ERPStatus status="VERIFIED" customLabel="Docker Compose Up" />
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span>Frontend Web Server:</span>
              <strong style={{ color: 'var(--color-brand-navy)' }}>Nginx 1.25 Alpine (Port 80/3000)</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span>Backend Modular Monolith:</span>
              <strong style={{ color: 'var(--color-brand-navy)' }}>Spring Boot Java 21 Target</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Database Storage Engine:</span>
              <strong style={{ color: 'var(--color-brand-navy)' }}>PostgreSQL 16 Alpine</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* System Audit Event Log Table */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '16px' }}>
          Real-Time System Audit Event Log
        </h3>
        <ERPTable columns={columns} data={auditLogs} keyExtractor={(item) => item.id} />
      </div>
    </div>
  );
};
