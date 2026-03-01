import React, { useState } from 'react';
import { X, RotateCcw, AlertTriangle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ERPMoney } from '../erp/ERPMoney';

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNo?: string;
  maxRefundableAmount?: number;
  customerName?: string;
  onSubmit: (refundData: { amount: number; reason: string }) => void;
}

/**
 * QINDE ERP — Refund Request Modal with Refundable Balance Guardrails
 */
export const RefundRequestModal: React.FC<RefundRequestModalProps> = ({
  isOpen,
  onClose,
  invoiceNo = 'INV-2026-00182',
  maxRefundableAmount = 145000.0,
  customerName = 'Ethio Telecom Enterprise',
  onSubmit,
}) => {
  const [amount, setAmount] = useState<number>(maxRefundableAmount);
  const [reason, setReason] = useState<string>('Duplicate service charge reconciliation');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Refund amount must be greater than zero ETB.');
      return;
    }
    if (amount > maxRefundableAmount) {
      setError(`Refund amount cannot exceed max refundable balance of ${maxRefundableAmount} ETB.`);
      return;
    }

    onSubmit({ amount, reason });
    onClose();
  };

  return (
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
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-modal)',
          border: '1px solid var(--color-border-default)',
          boxShadow: 'var(--shadow-overlay)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
              Request Customer Refund
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Initiate refund request for dual-authorization approval.
            </p>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Target Summary Card */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border-default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Target Invoice:</span>
              <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                {invoiceNo}
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{customerName}</span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block', textAlign: 'right' }}>Max Refundable:</span>
              <ERPMoney amount={maxRefundableAmount} align="right" />
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-micro)',
                backgroundColor: 'rgba(217, 83, 79, 0.1)',
                border: '1px solid var(--color-status-error)',
                color: 'var(--color-status-error)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Refund Amount (ETB)"
            type="number"
            value={amount}
            onChange={(e) => {
              setError(null);
              setAmount(parseFloat(e.target.value) || 0);
            }}
            required
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
              Refund Business Rationale & Rationale Notes
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide clear justification for Finance Manager approval..."
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
            <Button variant="danger" fullWidth icon={RotateCcw} type="submit">
              Submit Refund Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
