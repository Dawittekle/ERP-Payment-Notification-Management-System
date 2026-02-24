import React from 'react';
import { Filter, X, Bookmark, Search, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
}

interface ERPFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: ActiveFilter[];
  onRemoveFilter: (id: string) => void;
  onClearAllFilters: () => void;
  savedViews?: { id: string; name: string }[];
  activeSavedView?: string;
  onSelectSavedView?: (id: string) => void;
  onSaveCurrentView?: () => void;
}

/**
 * QINDE ERP — Toolbar & Filter Chip Bar Component
 * Provides Search, Filter Chips, Saved Views and Export actions.
 */
export const ERPFilterBar: React.FC<ERPFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  savedViews = [
    { id: 'today', name: "Today's Payments" },
    { id: 'failed', name: 'Failed Payments Queue' },
    { id: 'overdue', name: 'Overdue Invoices' },
    { id: 'refunds', name: 'Refunds Awaiting Approval' },
  ],
  activeSavedView,
  onSelectSavedView,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginBottom: '16px' }}>
      {/* Top Bar: Search Input & Saved View Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ flex: 1, maxWidth: '380px' }}>
          <Input
            placeholder="Search records, reference numbers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={Search}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Saved Views Dropdown */}
          {savedViews.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-surface-card)',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-input)',
                padding: '6px 12px',
                fontSize: '13px',
              }}
            >
              <Bookmark size={15} color="var(--color-brand-navy)" />
              <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>View:</span>
              <select
                value={activeSavedView || ''}
                onChange={(e) => onSelectSavedView?.(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-brand-navy)',
                  cursor: 'pointer',
                }}
              >
                <option value="">Default View</option>
                {savedViews.map((sv) => (
                  <option key={sv.id} value={sv.id}>
                    {sv.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button variant="secondary" icon={Filter} size="md">
            Filters ({activeFilters.length})
          </Button>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Active Filters:
          </span>

          {activeFilters.map((filter) => (
            <div
              key={filter.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                backgroundColor: 'var(--color-surface-card)',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>{filter.label}:</span>
              <strong>{filter.value}</strong>
              <button
                onClick={() => onRemoveFilter(filter.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={12} />
              </button>
            </div>
          ))}

          <button
            onClick={onClearAllFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: 'var(--color-status-error)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '4px',
            }}
          >
            <RotateCcw size={12} /> Clear all
          </button>
        </div>
      )}
    </div>
  );
};
