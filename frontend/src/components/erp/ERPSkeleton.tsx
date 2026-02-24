import React from 'react';

interface ERPSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * QINDE ERP — Skeleton Loading Pulse Placeholder Component
 */
export const ERPSkeleton: React.FC<ERPSkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-micro)',
  className = '',
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--color-surface-subtle)',
        opacity: 0.7,
        animation: 'pulse 1.5s ease-in-out infinite',
        ...style,
      }}
      className={className}
    />
  );
};
