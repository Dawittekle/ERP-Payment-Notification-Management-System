import React from 'react';
import { LucideIcon, FolderSearch } from 'lucide-react';
import { Button } from '../ui/Button';

interface ERPEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * QINDE ERP — Empty State Placeholder Component
 */
export const ERPEmptyState: React.FC<ERPEmptyStateProps> = ({
  title,
  description,
  icon: IconComp = FolderSearch,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          padding: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface-subtle)',
          color: 'var(--color-brand-navy)',
          marginBottom: '16px',
        }}
      >
        <IconComp size={32} />
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '6px' }}>
        {title}
      </h3>

      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '420px', marginBottom: '20px', lineHeight: 1.5 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
