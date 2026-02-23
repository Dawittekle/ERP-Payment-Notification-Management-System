import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'gold';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * QINDE ERP — Pill Badge Component for Statuses, Tags and Filters
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  style,
}) => {
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    success: {
      backgroundColor: 'var(--color-status-success-bg)',
      color: 'var(--color-status-success)',
      border: '1px solid rgba(22, 163, 74, 0.2)',
    },
    warning: {
      backgroundColor: 'var(--color-status-warning-bg)',
      color: 'var(--color-status-warning)',
      border: '1px solid rgba(217, 119, 6, 0.2)',
    },
    error: {
      backgroundColor: 'var(--color-status-error-bg)',
      color: 'var(--color-status-error)',
      border: '1px solid rgba(220, 38, 38, 0.2)',
    },
    info: {
      backgroundColor: 'var(--color-status-info-bg)',
      color: 'var(--color-status-info)',
      border: '1px solid rgba(37, 99, 235, 0.2)',
    },
    neutral: {
      backgroundColor: 'var(--color-surface-subtle)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border-default)',
    },
    gold: {
      backgroundColor: '#FFFBEB',
      color: '#B45309',
      border: '1px solid rgba(217, 164, 65, 0.3)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1.2,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};
