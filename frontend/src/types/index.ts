/**
 * QINDE ERP Domain Types & Navigation Contracts
 */

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'FINANCE_MANAGER'
  | 'ACCOUNTANT'
  | 'SALES'
  | 'SUPPORT'
  | 'CUSTOMER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
}

export type NavItemKey =
  | 'overview'
  | 'customers'
  | 'invoices'
  | 'payments'
  | 'refunds'
  | 'reconciliation'
  | 'reports'
  | 'notifications'
  | 'administration'
  | 'saved_views'
  | 'help'
  | 'settings';

export interface NavItem {
  key: NavItemKey;
  label: string;
  amharicLabel?: string;
  path: string;
  iconName: string;
  badge?: number | string;
  badgeVariant?: 'success' | 'warning' | 'error' | 'info';
  rolesAllowed?: UserRole[];
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  shortcut: string;
  category: 'create' | 'navigate' | 'action';
  iconName: string;
  action: () => void;
}
