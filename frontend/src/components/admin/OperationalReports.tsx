import React from 'react';
import { BarChart3, TrendingUp, CreditCard, DollarSign } from 'lucide-react';
import { ERPMetric } from '../erp/ERPMetric';
import { ERPMoney } from '../erp/ERPMoney';
import { ERPRevenueChart } from '../charts/ERPRevenueChart';
import { ERPBarChart } from '../charts/ERPBarChart';
import { ERPDonutChart } from '../charts/ERPDonutChart';
import { ERPGaugeChart } from '../charts/ERPGaugeChart';

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

      {/* KPI Stats with Sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <ERPMetric
          title="Gross Billed Value"
          value={442450.5}
          isCurrency
          icon={TrendingUp}
          iconVariant="navy"
          subtitle="+14.2% Month-over-Month"
          sparklineData={[310000, 340000, 380000, 410000, 442450]}
        />
        <ERPMetric
          title="Ethiopian 15% VAT Collected"
          value={66367.57}
          isCurrency
          icon={DollarSign}
          iconVariant="green"
          subtitle="Tax Authority Ledger (MOR)"
          sparklineData={[45000, 51000, 57000, 62000, 66367]}
        />
        <ERPMetric
          title="Payment Success Rate"
          value="99.8%"
          icon={CreditCard}
          iconVariant="green"
          subtitle="Chapa Gateway SLA"
          sparklineData={[98.5, 99.1, 99.4, 99.7, 99.8]}
        />
        <ERPMetric
          title="Average Transaction Value"
          value={147483.5}
          isCurrency
          icon={BarChart3}
          iconVariant="info"
          sparklineData={[120000, 132000, 141000, 147483]}
        />
      </div>

      {/* Main Revenue & Outflow Trend Chart */}
      <ERPRevenueChart title="Platform Revenue & Cash Flow Analytics" subtitle="Interactive 12-Month Inflow vs Outflow Ledger Analysis" />

      {/* Visual Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <ERPBarChart title="Subscription Plan Performance" subtitle="Revenue generated per customer tier" />
        <ERPDonutChart title="Acquisition Channels" subtitle="Traffic and payment source volume" />
        <ERPGaugeChart title="Expense & Operations Breakdown" subtitle="Monthly cost distribution across teams" />
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
