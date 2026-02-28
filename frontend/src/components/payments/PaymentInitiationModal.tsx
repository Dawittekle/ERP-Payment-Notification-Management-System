import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ERPMoney } from '../erp/ERPMoney';

interface PaymentInitiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNo?: string;
  amount?: number;
  customerName?: string;
  onPaymentSuccess?: () => void;
}

/**
 * QINDE ERP — Chapa Payment Initiation & Gateway Verification Simulation Modal
 */
export const PaymentInitiationModal: React.FC<PaymentInitiationModalProps> = ({
  isOpen,
  onClose,
  invoiceNo = 'INV-2026-00183',
  amount = 82450.5,
  customerName = 'Awash International Bank S.C.',
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'TELEBIRR' | 'CBE_BIRR' | 'CARD'>('TELEBIRR');
  const [phoneNumber, setPhoneNumber] = useState('+251 911 876 543');
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'SUCCESS'>('INPUT');

  if (!isOpen) return null;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PROCESSING');

    // Simulate Chapa Server-to-Server Verification Roundtrip
    setTimeout(() => {
      setStep('SUCCESS');
    }, 2000);
  };

  const handleComplete = () => {
    onPaymentSuccess?.();
    setStep('INPUT');
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
            backgroundColor: 'var(--color-brand-navy)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="var(--color-brand-green)" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Chapa Payment Gateway Checkout</h3>
              <p style={{ fontSize: '11px', color: '#94A3B8' }}>TLS 1.3 Verified Gateway Integration</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Content depending on step */}
        <div style={{ padding: '24px' }}>
          {step === 'INPUT' && (
            <form onSubmit={handleStartPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Paying Invoice:</span>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-brand-navy)', fontFamily: 'var(--font-family-technical)' }}>
                    {invoiceNo}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{customerName}</span>
                </div>
                <ERPMoney amount={amount} size="lg" align="right" />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '8px', display: 'block' }}>
                  Select Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'TELEBIRR', label: 'Telebirr' },
                    { id: 'CBE_BIRR', label: 'CBE Birr' },
                    { id: 'CARD', label: 'Bank Card' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id as any)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 'var(--radius-micro)',
                        border: method === m.id ? '2px solid var(--color-brand-navy)' : '1px solid var(--color-border-default)',
                        backgroundColor: method === m.id ? 'rgba(16, 42, 67, 0.06)' : 'var(--color-surface-card)',
                        fontWeight: method === m.id ? 700 : 500,
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Mobile Account Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+251 911 ..."
                required
              />

              <Button type="submit" variant="success" size="lg" fullWidth icon={CreditCard}>
                Confirm & Pay via {method}
              </Button>
            </form>
          )}

          {step === 'PROCESSING' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '16px', textAlign: 'center' }}>
              <RefreshCw size={36} color="var(--color-brand-navy)" style={{ animation: 'spin 1.2s linear infinite' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
                  Awaiting Chapa Gateway Response...
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Verifying HMAC-SHA256 signature and ledger reconciliation.
                </p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0', gap: '16px', textAlign: 'center' }}>
              <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(25, 135, 84, 0.1)', color: 'var(--color-brand-green)' }}>
                <CheckCircle2 size={40} />
              </div>

              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
                  Payment Verified & Settled!
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Chapa Ref: <strong>CHAPA-98435-ET</strong> · Invoice status updated to <strong>PAID</strong>.
                </p>
              </div>

              <Button variant="primary" fullWidth onClick={handleComplete}>
                Return to Workspace
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
