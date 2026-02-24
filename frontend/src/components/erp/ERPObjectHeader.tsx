import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { ERPStatus, FinancialStatus } from './ERPStatus';
import { ERPMoney } from './ERPMoney';

interface ERPObjectHeaderProps {
  objectType: string;
  identifier: string;
  title: string;
  status: FinancialStatus;
  keyAmount?: number;
  currency?: string;
  subtitle?: string;
  onBack?: () => void;
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  tabs?: { key: string; label: string; count?: number }[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
}

/**
 * QINDE ERP — Object Workspace Header Component
 * Header for Invoice, Payment, Refund, Customer and Reconciliation detail screens.
 */
export const ERPObjectHeader: React.FC<ERPObjectHeaderProps> = ({
  objectType,
  identifier,
  title,
  status,
  keyAmount,
  currency = 'ETB',
  subtitle,
  onBack,
  primaryAction,
  secondaryActions,
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        padding: '24px 28px 0 28px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Top Row: Breadcrumb & Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: 'var(--color-brand-navy)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          {onBack && <span>•</span>}
          <span>{objectType}</span>
          <ChevronRight size={14} />
          <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-technical)' }}>
            {identifier}
          </strong>
        </div>

        <ERPStatus status={status} />
      </div>

      {/* Main Title Row & Key Amount */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-brand-navy)',
              letterSpacing: '-0.01em',
              marginBottom: '4px',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Key Financial Amount Summary */}
        {keyAmount !== undefined && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Total Amount
            </span>
            <div>
              <ERPMoney amount={keyAmount} currency={currency} size="lg" />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      {(primaryAction || secondaryActions) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
          {primaryAction}
          {secondaryActions}
        </div>
      )}

      {/* Workspace Tabs Navigation */}
      {tabs && tabs.length > 0 && (
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--color-border-default)', marginTop: '8px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange?.(tab.key)}
                style={{
                  padding: '12px 4px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--color-brand-navy)' : '3px solid transparent',
                  color: isActive ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all var(--motion-fast)',
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isActive ? 'rgba(16, 42, 67, 0.1)' : 'var(--color-surface-subtle)',
                      color: isActive ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
