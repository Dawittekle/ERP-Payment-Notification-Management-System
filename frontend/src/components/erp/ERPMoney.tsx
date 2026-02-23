import React from 'react';

interface ERPMoneyProps {
  amount: number | string;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'kpi';
  align?: 'left' | 'right' | 'center';
  color?: string;
  showDecimals?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * QINDE ERP — Shared Financial Currency Formatter Component
 * Uses tabular mono numerals for high financial scannability (ETB 125,000.00).
 */
export const ERPMoney: React.FC<ERPMoneyProps> = ({
  amount,
  currency = 'ETB',
  size = 'md',
  align = 'left',
  color,
  showDecimals = true,
  className = '',
  style,
}) => {
  const numericVal = typeof amount === 'string' ? parseFloat(amount) : amount;
  const isNegative = numericVal < 0;
  const absVal = Math.abs(isNaN(numericVal) ? 0 : numericVal);

  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(absVal);

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: '13px', fontWeight: 600 },
    md: { fontSize: '14px', fontWeight: 600 },
    lg: { fontSize: '18px', fontWeight: 700 },
    kpi: { fontSize: '28px', fontWeight: 700 },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
        fontFamily: 'var(--font-family-technical)',
        fontVariantNumeric: 'tabular-nums',
        textAlign: align,
        color: color || 'var(--color-text-primary)',
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
        ...style,
      }}
      className={className}
    >
      <span
        style={{
          fontSize: size === 'kpi' ? '18px' : '0.85em',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          marginRight: '2px',
        }}
      >
        {currency}
      </span>
      <span>
        {isNegative ? '-' : ''}
        {formattedNumber}
      </span>
    </span>
  );
};
