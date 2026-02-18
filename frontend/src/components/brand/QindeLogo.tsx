import React from 'react';

interface QindeLogoProps {
  variant?: 'full' | 'icon-only' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * QINDE ERP (ቅንده) — Official Brand Logo Component
 * Combines structural Navy (#102A43), Emerald Green (#198754) transaction pulse, and Warm Gold (#D9A441) detail.
 */
export const QindeLogo: React.FC<QindeLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 44,
  };

  const currentSize = iconSizes[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      {/* QINDE Geometric Brand Icon */}
      <svg
        width={currentSize}
        height={currentSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="QINDE Logo Icon"
      >
        {/* Outer Ring / Struct (Navy) */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill="#102A43" />
        
        {/* Abstract Interlocking Q & ቅ Geometric Paths */}
        <path
          d="M12 14C12 11.7909 13.7909 10 16 10H24C26.2091 10 28 11.7909 28 14V22C28 24.2091 26.2091 26 24 26H16C13.7909 26 12 24.2091 12 22V14Z"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        
        {/* Vertical Order Pillar / Rail */}
        <path d="M20 14V22" stroke="#198754" strokeWidth="3" strokeLinecap="round" />
        
        {/* Q Tail & Financial Pulse Accent (Emerald Green) */}
        <path d="M23 23L29 29" stroke="#198754" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Warm Gold Dot (Precision Detail) */}
        <circle cx="27" cy="13" r="2.5" fill="#D9A441" />
      </svg>

      {/* Brand Text Header (Full Variant) */}
      {variant !== 'icon-only' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontWeight: 700,
                fontSize: size === 'lg' ? '22px' : size === 'sm' ? '14px' : '17px',
                letterSpacing: '-0.02em',
                color: variant === 'inverse' ? '#FFFFFF' : '#102A43',
                lineHeight: 1.1,
              }}
            >
              QINDE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-family-amharic)',
                fontWeight: 600,
                fontSize: size === 'lg' ? '14px' : '12px',
                color: '#198754',
              }}
            >
              ቅንደ
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 500,
              fontSize: '11px',
              color: variant === 'inverse' ? '#98A2B3' : '#667085',
              letterSpacing: '0.01em',
            }}
          >
            Business, in order.
          </span>
        </div>
      )}
    </div>
  );
};
