import React from 'react';
import { Search, Bell, Command, UserCheck, ChevronDown } from 'lucide-react';
import { UserRole, UserProfile } from '../../types';

interface ERPTopBarProps {
  currentPath: string;
  onOpenCommandCenter: () => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  user: UserProfile;
  unreadCount?: number;
}

export const ERPTopBar: React.FC<ERPTopBarProps> = ({
  currentPath,
  onOpenCommandCenter,
  currentRole,
  onChangeRole,
  user,
  unreadCount = 3,
}) => {
  const roleLabels: Record<UserRole, string> = {
    FINANCE_MANAGER: 'Finance Manager',
    ACCOUNTANT: 'Accountant',
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'System Admin',
    SALES: 'Sales Manager',
    SUPPORT: 'Support Lead',
    CUSTOMER: 'Customer Portal',
  };

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--color-surface-card)',
        borderBottom: '1px solid var(--color-border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
      }}
    >
      {/* Left: Breadcrumbs & Section Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: 'var(--font-size-caption)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
          }}
        >
          QINDE ERP
        </span>
        <span style={{ color: 'var(--color-border-default)' }}>/</span>
        <span
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textTransform: 'capitalize',
          }}
        >
          {currentPath}
        </span>
      </div>

      {/* Center: Command Center Quick Launch Bar */}
      <div style={{ flex: 1, maxWidth: '420px', margin: '0 24px' }}>
        <button
          onClick={onOpenCommandCenter}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px 14px',
            backgroundColor: 'var(--color-surface-canvas)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-input)',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-body)',
            cursor: 'pointer',
            transition: 'border-color var(--motion-fast)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={16} color="var(--color-text-secondary)" />
            <span>Search invoices, payments, customers...</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
            }}
          >
            <Command size={11} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Controls, Role Switcher, Notification & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Interactive Role Switcher Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-surface-subtle)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border-default)',
          }}
        >
          <UserCheck size={14} color="var(--color-brand-green)" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Role:
          </span>
          <select
            value={currentRole}
            onChange={(e) => onChangeRole(e.target.value as UserRole)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-brand-navy)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {Object.entries(roleLabels).map(([roleKey, label]) => (
              <option key={roleKey} value={roleKey}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Indicator */}
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 'var(--radius-micro)',
            color: 'var(--color-text-secondary)',
          }}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-status-error)',
                borderRadius: '50%',
                border: '2px solid var(--color-surface-card)',
              }}
            />
          )}
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border-default)' }} />

        {/* User Account Avatar Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-brand-navy)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
              {user.name}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              {roleLabels[currentRole]}
            </span>
          </div>
          <ChevronDown size={14} color="var(--color-text-secondary)" />
        </div>
      </div>
    </header>
  );
};
