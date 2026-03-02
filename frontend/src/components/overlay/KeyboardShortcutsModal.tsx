import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { Button } from '../ui/Button';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * QINDE ERP — Global Keyboard Shortcuts (`?` Help Sheet)
 */
export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', description: 'Open Global Command Center & Search' },
    { key: 'G + I', description: 'Navigate to Invoices Ledger' },
    { key: 'G + P', description: 'Navigate to Payment Transactions' },
    { key: 'G + C', description: 'Navigate to Customer Directory' },
    { key: 'G + R', description: 'Navigate to Refund Queue' },
    { key: 'G + D', description: 'Navigate to Reconciliation Diff Workspace' },
    { key: 'Esc', description: 'Close Modals, Drawers & Command Center' },
    { key: '?', description: 'Open Keyboard Shortcuts Help Sheet' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.5)',
        backdropFilter: 'blur(3px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-modal)',
          border: '1px solid var(--color-border-default)',
          boxShadow: 'var(--shadow-overlay)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Keyboard size={20} color="var(--color-brand-navy)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Keyboard Shortcuts (`?` Help Sheet)
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shortcuts.map((s) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-micro)',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border-default)',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--color-brand-navy)', fontWeight: 500 }}>
                {s.description}
              </span>
              <kbd
                style={{
                  fontFamily: 'var(--font-family-technical)',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '3px 8px',
                  backgroundColor: 'var(--color-brand-navy)',
                  color: '#fff',
                  borderRadius: '4px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border-default)', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--color-surface-subtle)' }}>
          <Button variant="secondary" onClick={onClose}>
            Close Sheet
          </Button>
        </div>
      </div>
    </div>
  );
};
