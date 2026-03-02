import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { ERPMoney } from './ERPMoney';

export type MetricIconVariant = 'navy' | 'green' | 'warning' | 'info';

interface ERPMetricProps {
  title: string;
  value: number | string;
  isCurrency?: boolean;
  currencySymbol?: string;
  trend?: {
    percentage: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: LucideIcon;
  iconVariant?: MetricIconVariant;
  subtitle?: string;
}

/**
 * QINDE ERP — Compact KPI Stat Metric Card Component
 * Adheres to metrics-first cockpit layout in QINDE_DESIGN.md.
 */
export const ERPMetric: React.FC<ERPMetricProps> = ({
  title,
  value,
  isCurrency = false,
  currencySymbol = 'ETB',
  trend,
  icon: IconComponent,
  iconVariant = 'navy',
  subtitle,
}) => {
  const iconColors: Record<MetricIconVariant, { bg: string; text: string }> = {
    navy: { bg: 'rgba(16, 42, 67, 0.08)', text: 'var(--color-brand-navy)' },
    green: { bg: 'rgba(25, 135, 84, 0.1)', text: 'var(--color-brand-green)' },
    warning: { bg: 'rgba(217, 119, 6, 0.1)', text: 'var(--color-status-warning)' },
    info: { bg: 'rgba(37, 99, 235, 0.1)', text: 'var(--color-status-info)' },
  };

  const activeColor = iconColors[iconVariant] || iconColors.navy;

  return (
    <div
      className="qinde-card-interactive"
      style={{
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        padding: '20px',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
      }}
    >
      {/* Header: Title & Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 'var(--font-size-caption)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>

        {IconComponent && (
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-micro)',
              backgroundColor: activeColor.bg,
              color: activeColor.text,
              display: 'flex',
            }}
          >
            <IconComponent size={18} />
          </div>
        )}
      </div>

      {/* Primary Numerals */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        {isCurrency && typeof value === 'number' ? (
          <ERPMoney amount={value} currency={currencySymbol} size="lg" />
        ) : (
          <span
            style={{
              fontSize: 'var(--font-size-kpi)',
              fontWeight: 700,
              fontFamily: 'var(--font-family-primary)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            {value}
          </span>
        )}
      </div>

      {/* Footer: Trend or Subtitle */}
      {(trend || subtitle) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          {trend && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontWeight: 600,
                color:
                  trend.direction === 'up'
                    ? 'var(--color-status-success)'
                    : trend.direction === 'down'
                    ? 'var(--color-status-error)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {trend.direction === 'up' && <ArrowUpRight size={14} />}
              {trend.direction === 'down' && <ArrowDownRight size={14} />}
              {trend.direction === 'neutral' && <Minus size={14} />}
              <span>{trend.percentage > 0 ? `+${trend.percentage}%` : `${trend.percentage}%`}</span>
            </div>
          )}

          <span style={{ color: 'var(--color-text-secondary)' }}>
            {trend?.label || subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
