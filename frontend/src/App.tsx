import React, { useState } from 'react';
import { ERPShell } from './components/layout/ERPShell';
import { LoginPage } from './components/auth/LoginPage';
import { FinanceManagerCockpit } from './components/dashboards/FinanceManagerCockpit';
import { AccountantCockpit } from './components/dashboards/AccountantCockpit';
import { AdminCockpit } from './components/dashboards/AdminCockpit';
import { CustomerCockpit } from './components/dashboards/CustomerCockpit';
import { CustomerList } from './components/customers/CustomerList';
import { InvoiceList } from './components/invoices/InvoiceList';
import { PaymentList } from './components/payments/PaymentList';
import { NavItemKey, UserRole } from './types';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeKey, setActiveKey] = useState<NavItemKey>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('FINANCE_MANAGER');

  const handleLoginSuccess = (_email: string, role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Render main workspace view based on activeKey & currentRole
  const renderMainWorkspace = () => {
    switch (activeKey) {
      case 'customers':
        return (
          <CustomerList
            onIssueInvoiceForCustomer={() => {
              setActiveKey('invoices');
            }}
          />
        );
      case 'invoices':
        return (
          <InvoiceList
            onInitiatePaymentForInvoice={() => {
              setActiveKey('payments');
            }}
          />
        );
      case 'payments':
        return <PaymentList />;
      case 'overview':
      default:
        switch (currentRole) {
          case 'FINANCE_MANAGER':
            return <FinanceManagerCockpit />;
          case 'ACCOUNTANT':
            return <AccountantCockpit />;
          case 'SUPER_ADMIN':
          case 'ADMIN':
            return <AdminCockpit />;
          case 'CUSTOMER':
            return <CustomerCockpit />;
          default:
            return <FinanceManagerCockpit />;
        }
    }
  };

  return (
    <ERPShell
      activeKey={activeKey}
      onNavigate={(key) => setActiveKey(key)}
      currentRole={currentRole}
      onChangeRole={(role) => setCurrentRole(role)}
    >
      {renderMainWorkspace()}
    </ERPShell>
  );
};
