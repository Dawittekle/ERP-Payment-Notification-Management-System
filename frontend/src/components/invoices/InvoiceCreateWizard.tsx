import React, { useState } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ERPMoney } from '../erp/ERPMoney';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface NewInvoiceData {
  customerName: string;
  tinNumber: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  grossTotal: number;
}

interface InvoiceCreateWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoice: NewInvoiceData) => void;
}

/**
 * QINDE ERP — Multi-Step Invoice Creation Wizard
 * Features line item calculations and auto 15% Ethiopian VAT tax logic.
 */
export const InvoiceCreateWizard: React.FC<InvoiceCreateWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [customerName, setCustomerName] = useState('Ethio Telecom Enterprise');
  const [tinNumber, setTinNumber] = useState('0048932014');
  const [dueDate, setDueDate] = useState('2026-09-30');

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: 'line_1',
      description: 'QINDE ERP Enterprise Subscription (Annual)',
      quantity: 1,
      unitPrice: 100000.0,
      total: 100000.0,
    },
    {
      id: 'line_2',
      description: 'Chapa Webhook & Telegram Integration SLA',
      quantity: 1,
      unitPrice: 26086.96,
      total: 26086.96,
    },
  ]);

  if (!isOpen) return null;

  const handleQuantityChange = (id: string, qty: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, quantity: qty, total: qty * item.unitPrice } : item
      )
    );
  };

  const handlePriceChange = (id: string, price: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, unitPrice: price, total: item.quantity * price } : item
      )
    );
  };

  const handleDescriptionChange = (id: string, desc: string) => {
    setLineItems(
      lineItems.map((item) => (item.id === id ? { ...item, description: desc } : item))
    );
  };

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: `line_${Date.now()}`,
        description: 'Additional Operational Service Item',
        quantity: 1,
        unitPrice: 5000.0,
        total: 5000.0,
      },
    ]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((i) => i.id !== id));
  };

  const subtotal = lineItems.reduce((acc, item) => acc + item.total, 0);
  const vatRate = 0.15; // 15% Standard Ethiopian VAT
  const vatAmount = subtotal * vatRate;
  const grossTotal = subtotal + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerName,
      tinNumber,
      dueDate,
      lineItems,
      subtotal,
      vatRate,
      vatAmount,
      grossTotal,
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.4)',
        backdropFilter: 'blur(2px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          height: '100%',
          backgroundColor: 'var(--color-surface-card)',
          boxShadow: 'var(--shadow-overlay)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              Issue Tax Invoice Wizard
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Calculate itemized line prices with automatic 15% VAT tax.
            </p>
          </div>

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
            <X size={20} />
          </button>
        </div>

        {/* Drawer Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Customer Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <Input
              label="Select Customer Entity"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <Input
              label="Customer TIN Ref"
              value={tinNumber}
              onChange={(e) => setTinNumber(e.target.value)}
              required
            />
            <Input
              label="Payment Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Line Items Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
                Itemized Service Line Items
              </h3>
              <Button type="button" variant="ghost" size="sm" icon={Plus} onClick={handleAddLineItem}>
                Add Line Item
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-micro)',
                    border: '1px solid var(--color-border-default)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    display: 'grid',
                    gridTemplateColumns: '2fr 70px 100px 100px 30px',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-micro)',
                      border: '1px solid var(--color-border-default)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-micro)',
                      border: '1px solid var(--color-border-default)',
                      fontSize: '13px',
                      outline: 'none',
                      textAlign: 'center',
                    }}
                  />
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-micro)',
                      border: '1px solid var(--color-border-default)',
                      fontSize: '13px',
                      outline: 'none',
                      textAlign: 'right',
                    }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <ERPMoney amount={item.total} size="sm" align="right" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLineItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-status-error)',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Calculation Box */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border-default)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Subtotal (Excl. Tax):</span>
              <ERPMoney amount={subtotal} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <span>15.0% Ethiopian Standard VAT:</span>
              <ERPMoney amount={vatAmount} color="var(--color-text-secondary)" />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--color-brand-navy)',
                paddingTop: '8px',
                borderTop: '1px solid var(--color-border-default)',
              }}
            >
              <span>Gross Total Payable:</span>
              <ERPMoney amount={grossTotal} size="lg" />
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
            <Button variant="secondary" fullWidth onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" fullWidth icon={Check} type="submit">
              Generate & Issue Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
