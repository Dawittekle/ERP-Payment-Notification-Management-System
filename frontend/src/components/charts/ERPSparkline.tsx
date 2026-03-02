import React from 'react';

interface ERPSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

/**
 * QINDE ERP — Mini SVG Sparkline Component for ERPMetric KPI Cards
 */
export const ERPSparkline: React.FC<ERPSparklineProps> = ({
  data,
  color = 'var(--color-brand-green)',
  width = 70,
  height = 24,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};
