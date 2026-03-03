import React, { useState } from 'react';
import { FileText, CreditCard, UserPlus, Download, Zap, X } from 'lucide-react';
import { NavItemKey } from '../../types';

interface ERPQuickActionsProps {
  onNavigate: (key: NavItemKey) => void;
  onOpenInvoiceWizard?: () => void;
  onOpenPaymentModal?: () => void;
  onExportLedger?: () => void;
}

/**
 * QINDE ERP — Floating & Fixed Quick Actions Widget
 * Speeds up repetitive financial workflows with 1-click access to critical actions.
 */
export const ERPQuickActions: React.FC<ERPQuickActionsProps> = ({
  onNavigate,
  onOpenInvoiceWizard,
  onOpenPaymentModal,
  onExportLedger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'issue_invoice',
      label: 'Issue New Invoice',
      icon: FileText,
      color: '#102A43',
      handler: () => {
        setIsOpen(false);
        if (onOpenInvoiceWizard) onOpenInvoiceWizard();
        else onNavigate('invoices');
      },
    },
    {
      id: 'register_payment',
      label: 'Register Payment (Chapa)',
      icon: CreditCard,
      color: '#198754',
      handler: () => {
        setIsOpen(false);
        if (onOpenPaymentModal) onOpenPaymentModal();
        else onNavigate('payments');
      },
    },
    {
      id: 'add_customer',
      label: 'Add Customer Entity',
      icon: UserPlus,
      color: '#2563EB',
      handler: () => {
        setIsOpen(false);
        onNavigate('customers');
      },
    },
    {
      id: 'export_ledger',
      label: 'Export Tax Statement (CSV)',
      icon: Download,
      color: '#D9A441',
      handler: () => {
        setIsOpen(false);
        if (onExportLedger) onExportLedger();
        else onNavigate('reports');
      },
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {/* Speed Dial Menu Items */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'qindeFadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.handler}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border-default)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: 'var(--shadow-hover)',
                  cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'transform 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: act.color,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={13} />
                </div>
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev: boolean) => !prev)}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: isOpen ? 'var(--color-brand-navy)' : 'var(--color-brand-green)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: 'var(--shadow-hover)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease',
          transform: isOpen ? 'rotate(45deg)' : 'scale(1)',
        }}
        title="Quick Actions Launcher"
      >
        {isOpen ? <X size={24} /> : <Zap size={24} />}
      </button>
    </div>
  );
};
