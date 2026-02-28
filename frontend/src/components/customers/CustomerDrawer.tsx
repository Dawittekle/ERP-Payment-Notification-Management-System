import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, FileText, Check } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface CustomerData {
  name: string;
  tinNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerData) => void;
  initialData?: CustomerData;
}

/**
 * QINDE ERP — Customer Creation & Edit Drawer Component
 */
export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<CustomerData>(
    initialData || {
      name: '',
      tinNumber: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          maxWidth: '480px',
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
              {initialData ? 'Edit Customer Profile' : 'Register New Customer Entity'}
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Enter enterprise tax TIN number & billing contact info.
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

        {/* Drawer Form Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Enterprise / Organization Name"
            placeholder="e.g. Ethio Telecom Enterprise"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={Building2}
            required
          />

          <Input
            label="Tax Identification Number (TIN)"
            placeholder="0048932014"
            value={formData.tinNumber}
            onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
            leftIcon={FileText}
            required
          />

          <Input
            label="Primary Contact Person"
            placeholder="e.g. Ato Bethlehem Worku"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            leftIcon={User}
            required
          />

          <Input
            label="Billing Email Address"
            type="email"
            placeholder="billing@ethiotelecom.et"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={Mail}
            required
          />

          <Input
            label="Phone Number"
            placeholder="+251 911 234 567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            leftIcon={Phone}
            required
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
              Billing Physical Address
            </label>
            <textarea
              rows={3}
              placeholder="Churchill Road, Kirkos Sub-City, Addis Ababa, Ethiopia"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--color-border-default)',
                fontSize: '14px',
                fontFamily: 'var(--font-family-primary)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', gap: '12px' }}>
            <Button variant="secondary" fullWidth onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" fullWidth icon={Check} type="submit">
              {initialData ? 'Save Changes' : 'Register Customer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
