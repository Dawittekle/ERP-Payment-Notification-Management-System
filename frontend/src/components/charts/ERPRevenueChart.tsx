import React, { useState } from 'react';
import { ERPMoney } from '../erp/ERPMoney';

export interface RevenueDataPoint {
  label: string;
  inflow: number;
  outflow: number;
}

interface ERPRevenueChartProps {
  title?: string;
  subtitle?: string;
  data?: RevenueDataPoint[];
}

const DEFAULT_DATA: RevenueDataPoint[] = [
  { label: 'Jan', inflow: 42000, outflow: 18000 },
  { label: 'Feb', inflow: 58000, outflow: 22000 },
  { label: 'Mar', inflow: 74000, outflow: 29000 },
  { label: 'Apr', inflow: 61000, outflow: 24000 },
  { label: 'May', inflow: 89000, outflow: 34000 },
  { label: 'Jun', inflow: 112000, outflow: 41000 },
  { label: 'Jul', inflow: 105000, outflow: 38000 },
  { label: 'Aug', inflow: 135000, outflow: 46000 },
  { label: 'Sep', inflow: 148000, outflow: 52000 },
  { label: 'Oct', inflow: 162000, outflow: 59000 },
  { label: 'Nov', inflow: 179000, outflow: 64000 },
  { label: 'Dec', inflow: 210000, outflow: 71000 },
];

/**
 * QINDE ERP — Interactive Multi-Line Area Revenue & Cash Flow Spline Chart
 * Inspired by Pulse, Ficopay, and Vision SaaS design references.
 */
export const ERPRevenueChart: React.FC<ERPRevenueChartProps> = ({
  title = 'Platform Revenue & Cash Flow Performance',
  subtitle = 'Monthly Inflow vs Outflow Ledger Analysis',
  data = DEFAULT_DATA,
}) => {
  const [timeRange, setTimeRange] = useState<'30D' | '90D' | '12M' | 'Custom'>('12M');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.flatMap((d) => [d.inflow, d.outflow])) * 1.15 || 1;

  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 20;

  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const getCoords = (dataList: RevenueDataPoint[], key: 'inflow' | 'outflow') => {
    return dataList.map((d, idx) => {
      const x = paddingX + (idx / (dataList.length - 1)) * chartW;
      const y = paddingY + chartH - (d[key] / maxVal) * chartH;
      return { x, y, val: d[key], label: d.label };
    });
  };

  const inflowCoords = getCoords(data, 'inflow');
  const outflowCoords = getCoords(data, 'outflow');

  const makeBezierPath = (coords: { x: number; y: number }[]) => {
    if (coords.length < 2) return '';
    let d = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp1y = curr.y;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      const cp2y = next.y;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    return d;
  };

  const inflowPath = makeBezierPath(inflowCoords);
  const outflowPath = makeBezierPath(outflowCoords);

  const inflowAreaPath = `${inflowPath} L ${inflowCoords[inflowCoords.length - 1].x},${
    paddingY + chartH
  } L ${inflowCoords[0].x},${paddingY + chartH} Z`;

  const hoveredData = hoveredIdx !== null ? data[hoveredIdx] : null;
  const hoveredInflow = hoveredIdx !== null ? inflowCoords[hoveredIdx] : null;

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-title-card)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {title}
          </h3>
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {subtitle}
          </p>
        </div>

        {/* Legend & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-brand-green)' }} />
              Inflow (Revenue)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-status-warning)' }} />
              Outflow (Expenses)
            </span>
          </div>

          {/* Time Range Pills */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--color-surface-subtle)',
              padding: '2px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--color-border-default)',
            }}
          >
            {(['30D', '90D', '12M', 'Custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  backgroundColor: timeRange === range ? 'var(--color-brand-navy)' : 'transparent',
                  color: timeRange === range ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Frame */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', minWidth: '550px' }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#198754" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#198754" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = paddingY + chartH * pct;
            return (
              <line
                key={pct}
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="var(--color-border-subtle)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Gradient Area Fill */}
          <path d={inflowAreaPath} fill="url(#inflowGrad)" />

          {/* Spline Lines */}
          <path d={outflowPath} fill="none" stroke="var(--color-status-warning)" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d={inflowPath} fill="none" stroke="var(--color-brand-green)" strokeWidth="3" />

          {/* Data Nodes & Hover Interactivity */}
          {inflowCoords.map((pt, idx) => (
            <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} style={{ cursor: 'pointer' }}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === idx ? '6' : '3.5'}
                fill="#FFFFFF"
                stroke="var(--color-brand-green)"
                strokeWidth="2.5"
              />
              <rect
                x={pt.x - 15}
                y={paddingY}
                width="30"
                height={chartH}
                fill="transparent"
              />
            </g>
          ))}

          {/* Hover Vertical Guide Line */}
          {hoveredInflow && (
            <line
              x1={hoveredInflow.x}
              y1={paddingY}
              x2={hoveredInflow.x}
              y2={paddingY + chartH}
              stroke="var(--color-brand-navy)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* X Axis Labels */}
          {inflowCoords.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={svgHeight - 4}
              textAnchor="middle"
              fontSize="11"
              fill={hoveredIdx === idx ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)'}
              fontWeight={hoveredIdx === idx ? '700' : '500'}
            >
              {pt.label}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip Popover */}
        {hoveredData && hoveredInflow && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `${(hoveredInflow.x / svgWidth) * 100}%`,
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-brand-navy)',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: 'var(--radius-input)',
              boxShadow: 'var(--shadow-overlay)',
              fontSize: '12px',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-brand-gold)', fontWeight: 700 }}>
              {hoveredData.label} Financial Record
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', opacity: 0.8 }}>Inflow: </span>
                <ERPMoney amount={hoveredData.inflow} color="#FFFFFF" size="sm" />
              </div>
              <div>
                <span style={{ fontSize: '10px', opacity: 0.8 }}>Outflow: </span>
                <ERPMoney amount={hoveredData.outflow} color="var(--color-status-warning)" size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
