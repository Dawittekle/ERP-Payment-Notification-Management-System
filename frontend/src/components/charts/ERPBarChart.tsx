import React, { useState } from 'react';
import { ERPMoney } from '../erp/ERPMoney';

export interface BarChartItem {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
}

interface ERPBarChartProps {
  title?: string;
  subtitle?: string;
  data?: BarChartItem[];
  isCurrency?: boolean;
}

const DEFAULT_BAR_DATA: BarChartItem[] = [
  { label: 'Starter', value: 45000, color: 'rgba(37, 99, 235, 0.85)' },
  { label: 'Growth', value: 82500, color: 'rgba(25, 135, 84, 0.85)' },
  { label: 'Scale', value: 114000, color: 'rgba(16, 42, 67, 0.9)' },
  { label: 'Enterprise', value: 145000, color: 'rgba(217, 164, 65, 0.9)' },
];

/**
 * QINDE ERP — Multi-Category Vertical Bar Chart
 * Inspired by Pulse & Ficopay subscription tier and plan performance charts.
 */
export const ERPBarChart: React.FC<ERPBarChartProps> = ({
  title = 'Subscription Plan Performance',
  subtitle = 'Revenue distribution across enterprise tiers',
  data = DEFAULT_BAR_DATA,
  isCurrency = true,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15 || 1;

  return (
    <div
      className="qinde-card-interactive"
      style={{
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div>
        <h3 style={{ fontSize: 'var(--font-size-title-card)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          {subtitle}
        </p>
      </div>

      {/* Bar Grid */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', height: '180px', paddingTop: '20px' }}>
        {data.map((item, idx) => {
          const barHeightPct = (item.value / maxVal) * 100;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                height: '100%',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
            >
              {/* Tooltip Value */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isHovered ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)',
                  opacity: isHovered ? 1 : 0.85,
                  transition: 'all 0.15s ease',
                  minHeight: '16px',
                }}
              >
                {isCurrency ? <ERPMoney amount={item.value} size="sm" showDecimals={false} /> : item.value}
              </div>

              {/* Bar Fill */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '48px',
                  height: `${barHeightPct}%`,
                  backgroundColor: item.color || 'var(--color-brand-navy)',
                  borderRadius: '8px 8px 3px 3px',
                  boxShadow: isHovered ? 'var(--shadow-hover)' : 'none',
                  transform: isHovered ? 'scaleY(1.03)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), boxShadow 0.2s ease',
                }}
              />

              {/* Bar Label */}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: isHovered ? 700 : 500,
                  color: isHovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  transition: 'color 0.15s ease',
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
