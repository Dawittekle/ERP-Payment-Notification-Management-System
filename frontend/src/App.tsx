import React, { useState } from 'react';
import { ERPShell } from './components/layout/ERPShell';
import { NavItemKey, UserRole } from './types';
import { Command, ShieldCheck, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState<NavItemKey>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('FINANCE_MANAGER');

  return (
    <ERPShell
      activeKey={activeKey}
      onNavigate={(key) => setActiveKey(key)}
      currentRole={currentRole}
      onChangeRole={(role) => setCurrentRole(role)}
    >
      {/* Overview Workspace Canvas (Phase 1 Baseline) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Page Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--color-border-default)',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-title-page)',
                fontWeight: 700,
                color: 'var(--color-brand-navy)',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              QINDE ERP Operations Cockpit
            </h1>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
              Active Role: <strong style={{ color: 'var(--color-brand-green)' }}>{currentRole}</strong> · Foundation & Shell Architecture Ready
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: 'var(--color-brand-navy)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-input)',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <Sparkles size={16} />
              <span>Phase 1 Verified</span>
            </button>
          </div>
        </div>

        {/* Welcome Card & Shell Architecture Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '28px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--color-status-success-bg)',
                color: 'var(--color-status-success)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '14px',
              }}
            >
              ● Phase 1 Complete — Foundation & Shell Architecture
            </div>

            <h2
              style={{
                fontSize: 'var(--font-size-title-section)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              Enterprise Shell Layout & Command Center Initialized
            </h2>

            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              The structural layout shell for QINDE ERP is fully operational. Featuring the <strong>QINDE Brand Logo (ቅንደ)</strong>, 
              Navy sidebar navigation with role-based filtering, quiet topbar with role context switcher, design system tokens, 
              and the <code>Ctrl+K</code> Command Center keyboard shortcut launcher.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-micro)',
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                }}
              >
                <Command size={15} color="var(--color-brand-navy)" />
                <span>Press <strong>Ctrl + K</strong> to launch Command Center</span>
              </div>
            </div>
          </div>

          {/* Quick Info Panel */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-canvas)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-input)',
              padding: '20px',
              width: '280px',
              flexShrink: 0,
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-title-card)',
                fontWeight: 600,
                color: 'var(--color-brand-navy)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={18} color="var(--color-brand-green)" />
              System Specs
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Brand:</span> <strong style={{ color: 'var(--color-text-primary)' }}>QINDE (ቅንደ)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Primary Color:</span> <strong style={{ color: '#102A43' }}>#102A43 (Navy)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Accent Color:</span> <strong style={{ color: '#198754' }}>#198754 (Green)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Typography:</span> <strong style={{ color: 'var(--color-text-primary)' }}>Inter & Ethiopic</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Design Contract:</span> <strong style={{ color: 'var(--color-status-success)' }}>QINDE_DESIGN.md</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Workspace Placeholder Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
              Phase 2 Target
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Reusable ERP Component Suite: ERPMetric, ERPStatus, ERPMoney, ERPTable & Transaction Signal.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
              Phase 3 Target
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Auth Login Screen & Exception-First Cockpits for Finance Manager, Accountant & Admin.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
              Phase 4-7 Target
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Core Workspaces (Invoice Wizard, Payments, Refund Queue, Reconciliation & Audit Logs).
            </p>
          </div>
        </div>
      </div>
    </ERPShell>
  );
};
