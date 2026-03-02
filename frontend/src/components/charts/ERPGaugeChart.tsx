import React, { useState } from 'react';
import { ERPMoney } from '../erp/ERPMoney';

export interface GaugeSegment {
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ERPGaugeChartProps {
  title?: string;
  subtitle?: string;
  data?: GaugeSegment[];
  totalAmount?: number;
}

const DEFAULT_GAUGE_DATA: GaugeSegment[] = [
  { label: 'Salaries & Payroll', amount: 3200, percentage: 48, color: 'var(--color-brand-green)' },
  { label: 'Cloud & Subscriptions', amount: 1200, percentage: 22, color: 'var(--color-status-warning)' },
  { label: 'Marketing & Ads', amount: 850, percentage: 16, color: 'var(--color-status-info)' },
  { label: 'Client Operations', amount: 620, percentage: 14, color: 'var(--color-brand-navy)' },
];

/**
 * QINDE ERP — Curved Half-Donut Arch Gauge Chart
 * Inspired by Vision SaaS Expense Breakdown half-circle gauge chart.
 */
export const ERPGaugeChart: React.FC<ERPGaugeChartProps> = ({
  title = 'Expense Breakdown',
  subtitle = 'Monthly operational expenditure breakdown',
  data = DEFAULT_GAUGE_DATA,
  totalAmount = 6580,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const radius = 64;
  const strokeWidth = 14;
  const halfCircumference = Math.PI * radius;

  let accumulatedPercent = 0;

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

      {/* Half Donut SVG */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', width: '180px', height: '95px', overflow: 'hidden' }}>
          <svg viewBox="0 0 180 95" style={{ width: '100%', height: '180px', transform: 'rotate(180deg)' }}>
            {data.map((seg, idx) => {
              const strokeDasharray = `${(seg.percentage / 100) * halfCircumference} ${halfCircumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * halfCircumference);
              accumulatedPercent += seg.percentage;
              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={idx}
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </svg>

          {/* Center Readout */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block' }}>
              {hoveredIdx !== null ? data[hoveredIdx].label : 'Monthly Expense'}
            </span>
            <ERPMoney
              amount={hoveredIdx !== null ? data[hoveredIdx].amount : totalAmount}
              size="lg"
            />
          </div>
        </div>

        {/* Legend Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', marginTop: '12px' }}>
          {data.map((seg, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 6px',
                  borderRadius: 'var(--radius-micro)',
                  backgroundColor: isHovered ? 'var(--color-surface-hover)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: seg.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: isHovered ? 700 : 500, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {seg.label}
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  ${seg.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
