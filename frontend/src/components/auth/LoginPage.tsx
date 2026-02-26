import React, { useState } from 'react';
import { QindeLogo } from '../brand/QindeLogo';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';
import { Lock, Mail, Shield, AlertCircle, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string, role: UserRole) => void;
}

/**
 * QINDE ERP — Branded Enterprise Login Screen
 * Features Navy structure, Ethiopian identity accent, role preview, and secure credentials entry.
 */
export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('dawit.tekle@qinde.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FINANCE_MANAGER');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (!email || !password) {
        setError('Please provide valid organizational credentials.');
        return;
      }
      onLoginSuccess(email, selectedRole);
    }, 600);
  };

  const roleOptions: { key: UserRole; title: string; desc: string }[] = [
    { key: 'FINANCE_MANAGER', title: 'Finance Manager', desc: 'Executive KPIs, refund approvals & reconciliation' },
    { key: 'ACCOUNTANT', title: 'Accountant', desc: 'Invoice issuance, tax/VAT & daily settlements' },
    { key: 'SUPER_ADMIN', title: 'System Admin', desc: 'RBAC permissions, audit log & webhook health' },
    { key: 'CUSTOMER', title: 'Customer Portal', desc: 'View invoices, download receipts & pay' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        backgroundColor: 'var(--color-brand-navy)',
        color: '#FFFFFF',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      {/* Left Branding & Narrative Panel */}
      <div
        style={{
          flex: 1.2,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #102A43 0%, #0B1D30 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div>
          <QindeLogo variant="inverse" size="lg" />
        </div>

        <div style={{ maxWidth: '520px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(25, 135, 84, 0.2)',
              color: '#4ADE80',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '20px',
              border: '1px solid rgba(25, 135, 84, 0.4)',
            }}
          >
            <Shield size={14} /> Enterprise Security Protocol Enabled
          </div>

          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#FFFFFF',
            }}
          >
            Financial Clarity & Business Operations, in order.
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            QINDE (ቅንደ) unifies invoicing, payment gateway reconciliation, refund approval workflows, 
            and automated Telegram notifications into an exception-first enterprise cockpit.
          </p>

          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase' }}>
              System Role Cockpit Selector
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {roleOptions.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRole(r.key)}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-micro)',
                    border: selectedRole === r.key ? '1px solid var(--color-brand-green)' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: selectedRole === r.key ? 'rgba(25, 135, 84, 0.15)' : 'transparent',
                    color: selectedRole === r.key ? '#FFFFFF' : '#94A3B8',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: selectedRole === r.key ? 600 : 400,
                    transition: 'all var(--motion-fast)',
                  }}
                >
                  <div style={{ color: selectedRole === r.key ? '#4ADE80' : '#E2E8F0', fontWeight: 600 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#64748B' }}>
          QINDE ERP v1.0 · Protected by Chapa Gateway Verification Engine & TLS 1.3
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'var(--color-surface-canvas)',
          color: 'var(--color-text-primary)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-modal)',
            border: '1px solid var(--color-border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-overlay)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
              Sign In to QINDE ERP
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Enter credentials to access your <strong>{selectedRole.replace('_', ' ')}</strong> workspace.
            </p>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-micro)',
                backgroundColor: 'var(--color-status-error-bg)',
                color: 'var(--color-status-error)',
                fontSize: '13px',
                marginBottom: '20px',
                border: '1px solid rgba(220, 38, 38, 0.2)',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Work Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              placeholder="name@company.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={Lock}
              placeholder="••••••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Authenticate & Launch Workspace
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
