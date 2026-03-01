import { X, Bell } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * QINDE ERP — Notification Center Drawer
 */
export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Payment Discrepancy Resolved',
      time: '10 mins ago',
      desc: 'Transaction TX-89321-CP matched by Finance Manager.',
      type: 'SUCCESS',
    },
    {
      id: 'n2',
      title: 'Refund Request Submitted',
      time: '45 mins ago',
      desc: 'RFD-2026-0043 requires dual-authorization payout.',
      type: 'WARNING',
    },
    {
      id: 'n3',
      title: 'Telegram Bot Dispatch Successful',
      time: '1 hour ago',
      desc: 'Outbox event EVT-90432 sent to @qinde_finance_alerts.',
      type: 'INFO',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.4)',
        backdropFilter: 'blur(2px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--color-surface-card)',
          boxShadow: 'var(--shadow-overlay)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--color-brand-navy)" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Operational Notifications
            </h2>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border-default)',
                backgroundColor: 'var(--color-surface-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '13px', color: 'var(--color-brand-navy)' }}>{n.title}</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                {n.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
