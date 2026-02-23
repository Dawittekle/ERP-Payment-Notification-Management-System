import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  prefixText?: string;
}

/**
 * QINDE ERP — Form Input Component
 */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  prefixText,
  id,
  className = '',
  style,
  disabled,
  ...rest
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {LeftIcon && (
          <div style={{ position: 'absolute', left: '12px', color: 'var(--color-text-secondary)', display: 'flex' }}>
            <LeftIcon size={16} />
          </div>
        )}

        {prefixText && (
          <span
            style={{
              position: 'absolute',
              left: LeftIcon ? '36px' : '12px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family-technical)',
            }}
          >
            {prefixText}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '8px 12px',
            paddingLeft: prefixText ? (LeftIcon ? '68px' : '44px') : LeftIcon ? '36px' : '12px',
            paddingRight: RightIcon ? '36px' : '12px',
            fontSize: '14px',
            fontFamily: 'var(--font-family-primary)',
            color: 'var(--color-text-primary)',
            backgroundColor: disabled ? 'var(--color-surface-subtle)' : 'var(--color-surface-card)',
            border: `1px solid ${error ? 'var(--color-status-error)' : 'var(--color-border-default)'}`,
            borderRadius: 'var(--radius-input)',
            outline: 'none',
            transition: 'border-color var(--motion-fast)',
            ...style,
          }}
          className={className}
          {...rest}
        />

        {RightIcon && (
          <div style={{ position: 'absolute', right: '12px', color: 'var(--color-text-secondary)', display: 'flex' }}>
            <RightIcon size={16} />
          </div>
        )}
      </div>

      {(error || helperText) && (
        <span
          style={{
            fontSize: '12px',
            color: error ? 'var(--color-status-error)' : 'var(--color-text-secondary)',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};
