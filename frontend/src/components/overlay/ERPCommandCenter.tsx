import React, { useEffect, useState } from 'react';
import {
  Search,
  PlusCircle,
  FileText,
  CreditCard,
  RotateCcw,
  GitCompare,
  Users,
  CornerDownLeft,
  X,
  Keyboard,
} from 'lucide-react';
import { NavItemKey } from '../../types';

interface ERPCommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (key: NavItemKey) => void;
}

export const ERPCommandCenter: React.FC<ERPCommandCenterProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Handle Keyboard Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: 'create-invoice',
      title: 'Create New Invoice',
      category: 'Actions',
      shortcut: 'C',
      icon: PlusCircle,
      action: () => {
        onNavigate('invoices');
        onClose();
      },
    },
    {
      id: 'nav-invoices',
      title: 'Go to Invoice List',
      category: 'Navigation',
      shortcut: 'G then I',
      icon: FileText,
      action: () => {
        onNavigate('invoices');
        onClose();
      },
    },
    {
      id: 'nav-payments',
      title: 'Go to Payments Workspace',
      category: 'Navigation',
      shortcut: 'G then P',
      icon: CreditCard,
      action: () => {
        onNavigate('payments');
        onClose();
      },
    },
    {
      id: 'nav-refunds',
      title: 'Review Pending Refunds Queue',
      category: 'Approval',
      shortcut: 'G then R',
      icon: RotateCcw,
      action: () => {
        onNavigate('refunds');
        onClose();
      },
    },
    {
      id: 'nav-reconcile',
      title: 'Open Reconciliation Workspace',
      category: 'Finance',
      shortcut: 'G then X',
      icon: GitCompare,
      action: () => {
        onNavigate('reconciliation');
        onClose();
      },
    },
    {
      id: 'nav-customers',
      title: 'Find Customer Profile',
      category: 'Directory',
      shortcut: 'G then C',
      icon: Users,
      action: () => {
        onNavigate('customers');
        onClose();
      },
    },
  ];

  const filteredActions = quickActions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-modal)',
          boxShadow: 'var(--shadow-overlay)',
          border: '1px solid var(--color-border-default)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid var(--color-border-default)',
          }}
        >
          <Search size={20} color="var(--color-brand-navy)" />
          <input
            type="text"
            placeholder="Type a command, shortcut, or search business records..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'var(--font-family-primary)',
              color: 'var(--color-text-primary)',
              background: 'transparent',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action List Body */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '12px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
              paddingLeft: '8px',
            }}
          >
            Suggested Quick Actions & Shortcuts
          </div>

          {filteredActions.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No commands found matching "{query}"
            </div>
          ) : (
            filteredActions.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-input)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'background var(--motion-fast)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '6px',
                        borderRadius: 'var(--radius-micro)',
                        backgroundColor: 'rgba(16, 42, 67, 0.06)',
                        color: 'var(--color-brand-navy)',
                      }}
                    >
                      <IconComp size={16} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-surface-subtle)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-family-technical)',
                        backgroundColor: 'var(--color-surface-canvas)',
                        border: '1px solid var(--color-border-default)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {item.shortcut}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Instructions */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--color-surface-subtle)',
            borderTop: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Keyboard size={13} /> Navigate <strong style={{ color: 'var(--color-text-primary)' }}>↑↓</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CornerDownLeft size={13} /> Select <strong style={{ color: 'var(--color-text-primary)' }}>Enter</strong>
            </span>
          </div>
          <span>
            Press <strong style={{ color: 'var(--color-text-primary)' }}>Esc</strong> to close
          </span>
        </div>
      </div>
    </div>
  );
};
