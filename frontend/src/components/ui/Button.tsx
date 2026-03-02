import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'success' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * QINDE ERP — Standardized Action Button Component
 * Adheres to Navy structure, Emerald Green financial action, and restrained shape language.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  style,
  ...rest
}) => {
  // Variant Style Mapping
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-brand-navy)',
      color: '#FFFFFF',
      border: '1px solid var(--color-brand-navy)',
    },
    success: {
      backgroundColor: 'var(--color-brand-green)',
      color: '#FFFFFF',
      border: '1px solid var(--color-brand-green)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface-card)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-default)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent',
    },
    danger: {
      backgroundColor: 'var(--color-status-error)',
      color: '#FFFFFF',
      border: '1px solid var(--color-status-error)',
    },
  };

  // Size Padding & Font Mapping
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: '6px 12px',
      fontSize: '12px',
      borderRadius: 'var(--radius-micro)',
    },
    md: {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: 'var(--radius-input)',
    },
    lg: {
      padding: '12px 22px',
      fontSize: '15px',
      borderRadius: 'var(--radius-standard)',
    },
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    fontFamily: 'var(--font-family-primary)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'transform var(--motion-fast), box-shadow var(--motion-fast), background-color var(--motion-fast)',
    width: fullWidth ? '100%' : 'auto',
    userSelect: 'none',
    boxShadow: variant === 'ghost' ? 'none' : 'var(--shadow-subtle)',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button disabled={disabled || isLoading} style={baseStyle} className={className} {...rest}>
      {isLoading ? (
        <span
          style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : (
        <>
          {IconComponent && iconPosition === 'left' && <IconComponent size={size === 'sm' ? 14 : 16} />}
          <span>{children}</span>
          {IconComponent && iconPosition === 'right' && <IconComponent size={size === 'sm' ? 14 : 16} />}
        </>
      )}
    </button>
  );
};
