import React from 'react';
import { BarChart3, TrendingUp, CreditCard, DollarSign } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPMoney } from '../erp/ERPMoney';

/**
 * QINDE ERP — Operational Reporting & Financial Analytics Dashboard
 */
export const OperationalReports: React.FC = () => {
  const methodDistribution = [
    { name: 'Telebirr SuperApp', percentage: 65, amount: 287592.5, color: '#198754' },
    { name: 'CBE Birr (Commercial Bank of Ethiopia)', percentage: 25, amount: 110612.5, color: '#102A43' },
    { name: 'Visa / Mastercard / International', percentage: 10, amount: 44245.5, color: '#D9A441' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Operational Reporting & Financial Analytics
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Payment performance metrics, revenue distribution, and Ethiopian 15% VAT tax summaries.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Gross Billed Value"
          value={442450.5}
          isCurrency
          icon={TrendingUp}
          iconVariant="navy"
          subtitle="+14.2% Month-over-Month"
        />
        <ERPMetric
          title="Ethiopian 15% VAT Collected"
          value={66367.57}
          isCurrency
          icon={DollarSign}
          iconVariant="green"
          subtitle="Tax Authority Ledger (MOR)"
        />
        <ERPMetric
          title="Payment Success Rate"
          value="99.8%"
          icon={CreditCard}
          iconVariant="green"
          subtitle="Chapa Gateway SLA"
        />
        <ERPMetric
          title="Average Transaction Value"
          value={147483.5}
          isCurrency
          icon={BarChart3}
          iconVariant="info"
        />
      </div>

      {/* Revenue Distribution Progress Bars */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
          Payment Method Rail Distribution (Ethiopian Market)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {methodDistribution.map((item) => (
            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <strong style={{ color: 'var(--color-brand-navy)' }}>{item.name}</strong>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <ERPMoney amount={item.amount} size="sm" />
                  <span style={{ fontWeight: 700, color: item.color }}>{item.percentage}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '5px',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
