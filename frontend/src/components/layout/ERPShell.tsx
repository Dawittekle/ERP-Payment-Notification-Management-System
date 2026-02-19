import React, { useState, useEffect } from 'react';
import { ERPSidebar } from './ERPSidebar';
import { ERPTopBar } from './ERPTopBar';
import { ERPCommandCenter } from '../overlay/ERPCommandCenter';
import { NavItemKey, UserRole, UserProfile } from '../../types';

interface ERPShellProps {
  children: React.ReactNode;
  activeKey: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const ERPShell: React.FC<ERPShellProps> = ({
  children,
  activeKey,
  onNavigate,
  currentRole,
  onChangeRole,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);

  // Sample Authenticated User Profile
  const currentUser: UserProfile = {
    id: 'usr_01923',
    name: 'Dawit Tekle',
    email: 'dawit.tekle@qinde.com',
    role: currentRole,
    department: 'Financial Operations',
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--color-surface-canvas)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      {/* Persistent Enterprise Sidebar */}
      <ERPSidebar
        activeKey={activeKey}
        onNavigate={onNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        currentRole={currentRole}
      />

      {/* Main Content Workspace Column */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // Prevents flex child overflow
        }}
      >
        {/* Top Quiet Header */}
        <ERPTopBar
          currentPath={activeKey}
          onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
          currentRole={currentRole}
          onChangeRole={onChangeRole}
          user={currentUser}
        />

        {/* Main Operational Canvas Viewport */}
        <main
          style={{
            flex: 1,
            padding: '28px 36px',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {children}
        </main>
      </div>

      {/* Global Command Center Overlay (Ctrl+K) */}
      <ERPCommandCenter
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
