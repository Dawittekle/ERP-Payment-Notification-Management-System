import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  FileEdit,
  LucideIcon,
} from 'lucide-react';
import { Badge, BadgeVariant } from '../ui/Badge';

export type FinancialStatus =
  | 'PAID'
  | 'SUCCESS'
  | 'VERIFIED'
  | 'PENDING'
  | 'ISSUED'
  | 'PARTIALLY_PAID'
  | 'NEEDS_REVIEW'
  | 'REQUESTED'
  | 'AUTH_NEEDED'
  | 'FAILED'
  | 'CANCELLED'
  | 'OVERDUE'
  | 'PROCESSING'
  | 'INITIATED'
  | 'DRAFT'
  | 'ACTIVE'
  | 'INACTIVE';

interface ERPStatusProps {
  status: FinancialStatus;
  customLabel?: string;
  size?: 'sm' | 'md';
}

/**
 * QINDE ERP — Financial & Domain Status Badge Component
 * STRICT CONTRACT: Always combines Icon + Label + Semantic Color. Never color alone.
 */
export const ERPStatus: React.FC<ERPStatusProps> = ({
  status,
  customLabel,
  size = 'md',
}) => {
  const statusConfigs: Record<
    FinancialStatus,
    { label: string; variant: BadgeVariant; icon: LucideIcon }
  > = {
    PAID: { label: 'Paid', variant: 'success', icon: CheckCircle2 },
    SUCCESS: { label: 'Successful', variant: 'success', icon: CheckCircle2 },
    VERIFIED: { label: 'Verified', variant: 'success', icon: CheckCircle2 },
    ACTIVE: { label: 'Active', variant: 'success', icon: CheckCircle2 },

    PENDING: { label: 'Pending', variant: 'warning', icon: Clock },
    ISSUED: { label: 'Issued', variant: 'warning', icon: Clock },
    PARTIALLY_PAID: { label: 'Partially Paid', variant: 'warning', icon: Clock },

    NEEDS_REVIEW: { label: 'Needs Review', variant: 'gold', icon: AlertTriangle },
    REQUESTED: { label: 'Requested', variant: 'gold', icon: AlertTriangle },
    AUTH_NEEDED: { label: 'Auth Needed', variant: 'gold', icon: AlertTriangle },

    FAILED: { label: 'Failed', variant: 'error', icon: XCircle },
    CANCELLED: { label: 'Cancelled', variant: 'error', icon: XCircle },
    OVERDUE: { label: 'Overdue', variant: 'error', icon: XCircle },

    PROCESSING: { label: 'Processing', variant: 'info', icon: RefreshCw },
    INITIATED: { label: 'Initiated', variant: 'info', icon: RefreshCw },

    DRAFT: { label: 'Draft', variant: 'neutral', icon: FileEdit },
    INACTIVE: { label: 'Inactive', variant: 'neutral', icon: FileEdit },
  };

  const config = statusConfigs[status] || {
    label: status,
    variant: 'neutral',
    icon: Clock,
  };

  const IconComp = config.icon;

  return (
    <Badge
      variant={config.variant}
      size={size}
      icon={<IconComp size={size === 'sm' ? 12 : 14} style={{ flexShrink: 0 }} />}
    >
      {customLabel || config.label}
    </Badge>
  );
};
