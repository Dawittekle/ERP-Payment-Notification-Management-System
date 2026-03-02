import React, { useState } from 'react';

export interface DonutSegment {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface ERPDonutChartProps {
  title?: string;
  subtitle?: string;
  data?: DonutSegment[];
  totalLabel?: string;
}

const DEFAULT_DONUT_DATA: DonutSegment[] = [
  { label: 'Telebirr SuperApp', value: 245000, percentage: 52, color: 'var(--color-brand-green)' },
  { label: 'CBE Birr Wallet', value: 132000, percentage: 28, color: 'var(--color-brand-navy)' },
  { label: 'Bank Card (TLS)', value: 85000, percentage: 15, color: 'var(--color-brand-gold)' },
  { label: 'Other Rails', value: 23500, percentage: 5, color: 'var(--color-status-info)' },
];

/**
 * QINDE ERP — Multi-Segment Interactive Donut Chart
 * Inspired by Pulse & Ficopay payment channel and traffic source breakdowns.
 */
export const ERPDonutChart: React.FC<ERPDonutChartProps> = ({
  title = 'Payment Gateway Channels',
  subtitle = 'Acquisition distribution by payment rail',
  data = DEFAULT_DONUT_DATA,
  totalLabel = 'Total Settlement',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const radius = 60;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

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

      {/* Donut & Legend Container */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        {/* SVG Donut Ring */}
        <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
          <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {data.map((seg, idx) => {
              const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += seg.percentage;
              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={idx}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
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
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
              {hoveredIdx !== null ? `${data[hoveredIdx].percentage}%` : '100%'}
            </span>
            <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
              {hoveredIdx !== null ? data[hoveredIdx].label : totalLabel}
            </span>
          </div>
        </div>

        {/* Legend Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '150px' }}>
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
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-micro)',
                  backgroundColor: isHovered ? 'var(--color-surface-hover)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: seg.color }} />
                  <span style={{ fontSize: '12px', fontWeight: isHovered ? 700 : 500, color: 'var(--color-text-primary)' }}>
                    {seg.label}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  {seg.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
