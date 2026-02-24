import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface ERPTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  density?: 'comfortable' | 'dense';
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  bulkActions?: React.ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
}

/**
 * QINDE ERP — High-Density Enterprise Data Table
 * Primary work surface for financial transactions, invoices, customers, and audit logs.
 */
export function ERPTable<T>({
  columns,
  data,
  keyExtractor,
  density = 'comfortable',
  onRowClick,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  bulkActions,
  pagination,
}: ERPTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange(data.map((item) => keyExtractor(item)));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange([...selectedKeys, key]);
    } else {
      onSelectionChange(selectedKeys.filter((k) => k !== key));
    }
  };

  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;
  const paddingY = density === 'dense' ? '8px' : '12px';

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Contextual Bulk Action Bar */}
      {selectable && selectedKeys.length > 0 && (
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--color-brand-navy)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: 'var(--color-brand-green)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {selectedKeys.length} Selected
            </span>
            <span>Items ready for bulk operational processing</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {bulkActions}
            <button
              onClick={() => onSelectionChange?.([])}
              style={{
                background: 'none',
                border: 'none',
                color: '#CBD5E1',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline',
              }}
            >
              Deselect all
            </button>
          </div>
        </div>
      )}

      {/* Table Canvas */}
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: density === 'dense' ? '13px' : '14px',
            fontFamily: 'var(--font-family-primary)',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderBottom: '1px solid var(--color-border-default)',
                color: 'var(--color-text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {selectable && (
                <th style={{ width: '40px', padding: `${paddingY} 12px`, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    style={{ cursor: 'pointer', accentColor: 'var(--color-brand-navy)' }}
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: `${paddingY} 16px`,
                    width: col.width,
                    textAlign: col.align || 'left',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <span>{col.header}</span>
                    {col.sortable && sortKey === col.key && (
                      <span style={{ color: 'var(--color-brand-navy)' }}>
                        {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{
                    padding: '36px',
                    textAlign: 'center',
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                  }}
                >
                  No financial records found in current view.
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const rowKey = keyExtractor(row);
                const isSelected = selectedKeys.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(row)}
                    style={{
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor: isSelected
                        ? 'rgba(16, 42, 67, 0.04)'
                        : 'var(--color-surface-card)',
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background var(--motion-fast)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--color-surface-card)';
                    }}
                  >
                    {selectable && (
                      <td
                        style={{ padding: `${paddingY} 12px`, textAlign: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                          style={{ cursor: 'pointer', accentColor: 'var(--color-brand-navy)' }}
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          padding: `${paddingY} 16px`,
                          textAlign: col.align || 'left',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {col.accessor
                          ? col.accessor(row)
                          : ((row as Record<string, unknown>)[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--color-surface-subtle)',
            borderTop: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div>
            Showing <strong style={{ color: 'var(--color-text-primary)' }}>
              {(pagination.currentPage - 1) * pagination.pageSize + 1}
            </strong> to{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
            </strong> of <strong style={{ color: 'var(--color-text-primary)' }}>{pagination.totalItems}</strong> entries
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.currentPage === 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            >
              <ChevronLeft size={14} /> Previous
            </Button>
            <span style={{ padding: '0 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            >
              Next <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
