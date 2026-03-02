import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ERPTable, Column } from '../erp/ERPTable';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'ACTIVE' | 'SUSPENDED';
  lastActive: string;
}

/**
 * QINDE ERP — User & Role Permission Management Workspace
 */
export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: 'usr_1',
      name: 'Dawit Tekle',
      email: 'dawit.tekle@qinde.com',
      role: 'FINANCE_MANAGER',
      department: 'Executive Finance',
      status: 'ACTIVE',
      lastActive: '2 mins ago',
    },
    {
      id: 'usr_2',
      name: 'Mesfin Haile',
      email: 'mesfin.accountant@qinde.et',
      role: 'ACCOUNTANT',
      department: 'Accounts Payable & Receivable',
      status: 'ACTIVE',
      lastActive: '14 mins ago',
    },
    {
      id: 'usr_3',
      name: 'Super Admin',
      email: 'admin@qinde.et',
      role: 'SUPER_ADMIN',
      department: 'Platform Administration',
      status: 'ACTIVE',
      lastActive: '1 hour ago',
    },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const columns: Column<UserRecord>[] = [
    {
      key: 'name',
      header: 'Full Name',
      accessor: (row) => <strong style={{ color: 'var(--color-brand-navy)' }}>{row.name}</strong>,
    },
    { key: 'email', header: 'Email Address' },
    { key: 'department', header: 'Department Scoping' },
    {
      key: 'role',
      header: 'RBAC Assigned Role',
      accessor: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row.id, e.target.value as UserRole)}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius-micro)',
            border: '1px solid var(--color-border-default)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-brand-navy)',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FINANCE_MANAGER">FINANCE_MANAGER</option>
          <option value="ACCOUNTANT">ACCOUNTANT</option>
          <option value="SALES">SALES</option>
          <option value="SUPPORT">SUPPORT</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      accessor: (row) => (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: 'var(--radius-micro)',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: row.status === 'ACTIVE' ? 'rgba(25, 135, 84, 0.1)' : 'rgba(217, 83, 79, 0.1)',
            color: row.status === 'ACTIVE' ? 'var(--color-status-success)' : 'var(--color-status-error)',
          }}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'lastActive', header: 'Last Active Session' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            User & Access Control Directory
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Role-Based Access Control (RBAC) user permission matrix and session auditing.
          </p>
        </div>

        <Button variant="primary" icon={Plus}>
          Add ERP User
        </Button>
      </div>

      <ERPTable columns={columns} data={users} keyExtractor={(item) => item.id} />
    </div>
  );
};
