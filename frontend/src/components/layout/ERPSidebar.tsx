import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  RotateCcw,
  GitCompare,
  BarChart3,
  Bell,
  ShieldCheck,
  Bookmark,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { QindeLogo } from '../brand/QindeLogo';
import { NavItemKey, UserRole } from '../../types';
import { useTheme, ACCENT_PRESETS, AccentPreset } from '../../context/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';

interface ERPSidebarProps {
  activeKey: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentRole: UserRole;
  unreadNotificationsCount?: number;
  pendingRefundsCount?: number;
}

export const ERPSidebar: React.FC<ERPSidebarProps> = ({
  activeKey,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  currentRole,
  unreadNotificationsCount = 3,
  pendingRefundsCount = 4,
}) => {
  const { theme, toggleTheme, accentPreset, setAccentPreset } = useTheme();
  // Main Operational Navigation Items
  const primaryNavItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'invoices', label: 'Invoices', icon: FileText },
    { key: 'payments', label: 'Payments', icon: CreditCard },
    {
      key: 'refunds',
      label: 'Refunds',
      icon: RotateCcw,
      badge: pendingRefundsCount > 0 ? pendingRefundsCount : undefined,
      badgeVariant: 'warning',
    },
    {
      key: 'reconciliation',
      label: 'Reconciliation',
      icon: GitCompare,
      badge: '2 diff',
      badgeVariant: 'error',
    },
    { key: 'reports', label: 'Reports', icon: BarChart3 },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
      badgeVariant: 'info',
    },
    {
      key: 'administration',
      label: 'Administration',
      icon: ShieldCheck,
      rolesAllowed: ['SUPER_ADMIN', 'ADMIN'],
    },
  ];

  // Utility Navigation Items
  const utilityNavItems = [
    { key: 'saved_views', label: 'Saved Views', icon: Bookmark },
    { key: 'help', label: 'Help & Docs', icon: HelpCircle },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
        backgroundColor: 'var(--color-brand-navy)',
        color: 'var(--color-text-inverse)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--motion-standard)',
        zIndex: 'var(--z-sticky)',
        boxShadow: 'var(--shadow-subtle)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        userSelect: 'none',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: isCollapsed ? '18px 12px' : '20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <QindeLogo variant={isCollapsed ? 'icon-only' : 'inverse'} size={isCollapsed ? 'md' : 'md'} />
      </div>

      {/* Navigation Sections Scroll Container */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        {/* Section Label */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#98A2B3',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
              paddingLeft: '8px',
            }}
          >
            Operations
          </div>
        )}

        {/* Primary Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {primaryNavItems.map((item) => {
            // Role Permission Filter Check
            if (item.rolesAllowed && !item.rolesAllowed.includes(currentRole)) {
              return null;
            }

            const isActive = activeKey === item.key;
            const IconComponent = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key as NavItemKey)}
                title={isCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: isCollapsed ? '12px' : '10px 12px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-micro)',
                  backgroundColor: isActive ? 'var(--color-brand-navy-hover)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all var(--motion-fast)',
                  position: 'relative',
                }}
              >
                {/* Active Indicator Pulse Bar */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '6px',
                      bottom: '6px',
                      width: '3.5px',
                      backgroundColor: 'var(--color-brand-green)',
                      borderRadius: '0 4px 4px 0',
                    }}
                  />
                )}

                <IconComponent
                  size={19}
                  color={isActive ? 'var(--color-brand-green)' : '#94A3B8'}
                  style={{ flexShrink: 0 }}
                />

                {!isCollapsed && (
                  <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )}

                {/* Badge Indicator */}
                {!isCollapsed && item.badge && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor:
                        item.badgeVariant === 'error'
                          ? '#EF4444'
                          : item.badgeVariant === 'warning'
                          ? 'var(--color-brand-gold)'
                          : '#2563EB',
                      color: '#FFFFFF',
                      lineHeight: 1,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            margin: '20px 0 16px 0',
          }}
        />

        {/* Utility Section */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#98A2B3',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
              paddingLeft: '8px',
            }}
          >
            Utilities
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {utilityNavItems.map((item) => {
            const isActive = activeKey === item.key;
            const IconComponent = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key as NavItemKey)}
                title={isCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: isCollapsed ? '12px' : '10px 12px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-micro)',
                  backgroundColor: isActive ? 'var(--color-brand-navy-hover)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all var(--motion-fast)',
                }}
              >
                <IconComponent size={18} color="#94A3B8" style={{ flexShrink: 0 }} />
                {!isCollapsed && (
                  <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            margin: '20px 0 16px 0',
          }}
        />

        {/* Theme Engine Settings Section */}
        {!isCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '4px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#98A2B3',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Appearance</span>
              <Palette size={13} color="#98A2B3" />
            </div>

            {/* Dark / Light Toggle Switch */}
            <div
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-micro)',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#CBD5E1',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? <Moon size={15} color="var(--color-brand-gold)" /> : <Sun size={15} color="#F59E0B" />}
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div
                style={{
                  width: '32px',
                  height: '18px',
                  borderRadius: '10px',
                  backgroundColor: theme === 'dark' ? 'var(--color-brand-green)' : '#475569',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: theme === 'dark' ? '16px' : '2px',
                    transition: 'left 0.2s ease',
                  }}
                />
              </div>
            </div>

            {/* Accent Theme Swatches */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Accent Palette:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(Object.keys(ACCENT_PRESETS) as AccentPreset[]).map((key) => {
                  const preset = ACCENT_PRESETS[key];
                  const isSelected = accentPreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setAccentPreset(key)}
                      title={preset.name}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: preset.navy,
                        border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.3)',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.15s ease',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collapse / Expand Toggle Button */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
        }}
      >
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-micro)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            color: '#94A3B8',
            border: 'none',
            cursor: 'pointer',
            transition: 'background var(--motion-fast)',
          }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};
