import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  txRef: string;
  erpAmount: number;
  providerAmount: number;
  onResolve: (action: 'MANUAL_MATCH' | 'FORCE_RESOLVE' | 'INVESTIGATE', rationale: string) => void;
}

/**
 * QINDE ERP — Reconciliation Exception Resolution Action Modal
 */
export const ResolutionModal: React.FC<ResolutionModalProps> = ({
  isOpen,
  onClose,
  txRef,
  erpAmount,
  providerAmount,
  onResolve,
}) => {
  const [action, setAction] = useState<'MANUAL_MATCH' | 'FORCE_RESOLVE' | 'INVESTIGATE'>('MANUAL_MATCH');
  const [rationale, setRationale] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResolve(action, rationale);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.5)',
        backdropFilter: 'blur(3px)',
        zIndex: 1100,
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
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Resolve Reconciliation Exception
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Transaction Ref: <strong style={{ fontFamily: 'var(--font-family-technical)' }}>{txRef}</strong>
            </p>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'rgba(217, 164, 65, 0.1)',
              border: '1px solid var(--color-brand-gold)',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span>Internal ERP Amount: <strong>{erpAmount.toLocaleString()} ETB</strong></span>
            <span>Chapa Provider Amount: <strong>{providerAmount.toLocaleString()} ETB</strong></span>
            <span style={{ color: 'var(--color-status-warning)', fontWeight: 600 }}>
              Discrepancy Variance: {Math.abs(erpAmount - providerAmount).toLocaleString()} ETB
            </span>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '8px', display: 'block' }}>
              Select Resolution Action
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {[
                { id: 'MANUAL_MATCH', label: 'Manual Match' },
                { id: 'FORCE_RESOLVE', label: 'Force Resolve' },
                { id: 'INVESTIGATE', label: 'Flag Audit' },
              ].map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAction(a.id as any)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-micro)',
                    border: action === a.id ? '2px solid var(--color-brand-navy)' : '1px solid var(--color-border-default)',
                    backgroundColor: action === a.id ? 'rgba(16, 42, 67, 0.06)' : 'var(--color-surface-card)',
                    fontWeight: action === a.id ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
              Audit Mandatory Rationale & Rationale Notes
            </label>
            <textarea
              rows={3}
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="State clear rationale for audit tracking..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--color-border-default)',
                fontSize: '14px',
                fontFamily: 'var(--font-family-primary)',
                outline: 'none',
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button variant="secondary" fullWidth onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" fullWidth icon={CheckCircle2} type="submit">
              Apply Resolution
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
