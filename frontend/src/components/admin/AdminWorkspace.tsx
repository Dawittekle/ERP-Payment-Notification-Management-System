import React, { useState } from 'react';
import { ShieldCheck, BarChart3, Users, Activity, Settings } from 'lucide-react';
import { AuditLogList } from './AuditLogList';
import { OperationalReports } from './OperationalReports';
import { UserManagement } from './UserManagement';
import { SystemHealthMonitor } from './SystemHealthMonitor';
import { SystemSettings } from './SystemSettings';

type AdminTab = 'audit' | 'reports' | 'users' | 'health' | 'settings';

/**
 * QINDE ERP — Master Administration & Operations Workspace Container
 */
export const AdminWorkspace: React.FC<{ initialTab?: AdminTab }> = ({ initialTab = 'audit' }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);

  const tabs: { id: AdminTab; label: string; icon: React.FC<any> }[] = [
    { id: 'audit', label: 'Audit Log Trail', icon: ShieldCheck },
    { id: 'reports', label: 'Financial Analytics', icon: BarChart3 },
    { id: 'users', label: 'User & RBAC Scoping', icon: Users },
    { id: 'health', label: 'System Health & Webhooks', icon: Activity },
    { id: 'settings', label: 'Organization & Gateways', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            System Operations & Platform Administration
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Central administration cockpit for audit logging, system health monitoring, and access controls.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--color-border-default)',
          paddingBottom: '2px',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-micro) var(--radius-micro) 0 0',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--color-brand-navy)' : '3px solid transparent',
                backgroundColor: isActive ? 'rgba(16, 42, 67, 0.05)' : 'transparent',
                color: isActive ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} color={isActive ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Workspace Tab Content */}
      <div style={{ marginTop: '8px' }}>
        {activeTab === 'audit' && <AuditLogList />}
        {activeTab === 'reports' && <OperationalReports />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'health' && <SystemHealthMonitor />}
        {activeTab === 'settings' && <SystemSettings />}
      </div>
    </div>
  );
};
