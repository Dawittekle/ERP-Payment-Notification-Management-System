import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, X, ChevronRight } from 'lucide-react';

export interface InsightCardItem {
  id: string;
  type: 'FORECAST' | 'RISK' | 'TAX_OPTIMIZATION' | 'RECONCILIATION_ALERT';
  severity: 'CRITICAL' | 'WARNING' | 'POSITIVE' | 'NEUTRAL';
  title: string;
  description: string;
  impactValue?: string;
  recommendedAction?: string;
}

interface ERPAIInsightsProps {
  onActionClick?: (insightId: string) => void;
}

/**
 * QINDE ERP — Smart AI Financial Insights Panel
 * Executive summary cards highlighting cash flow forecasts, overdue invoice alerts, and reconciliation anomaly warnings.
 */
export const ERPAIInsights: React.FC<ERPAIInsightsProps> = ({ onActionClick }) => {
  const [insights, setInsights] = useState<InsightCardItem[]>([
    {
      id: 'ins_01',
      type: 'FORECAST',
      severity: 'POSITIVE',
      title: 'Positive Cash Flow Forecast (+22.4%)',
      description: 'Based on recurring Telebirr enterprise subscription cycles, projected revenue for next month will exceed 1.52M ETB.',
      impactValue: '+276,400 ETB Inflow',
      recommendedAction: 'Review Capital Allocation',
    },
    {
      id: 'ins_02',
      type: 'RECONCILIATION_ALERT',
      severity: 'WARNING',
      title: 'Settlement Batch Discrepancy Signal',
      description: 'Chapa Batch #SETTLE-8930 has 2 un-matched transaction references totaling 12,500 ETB requiring Dual Authorization.',
      impactValue: '2 Exceptions Active',
      recommendedAction: 'Open Reconciliation Workspace',
    },
    {
      id: 'ins_03',
      type: 'TAX_OPTIMIZATION',
      severity: 'NEUTRAL',
      title: '15% VAT Tax Reserve Compliance',
      description: 'MOR Tax liability reserve currently stands at 66,367.57 ETB. Fiscal ledgers are 100% synchronized for monthly filing.',
      impactValue: 'Compliant Ledger',
      recommendedAction: 'Export MOR Tax Package',
    },
  ]);

  const dismissInsight = (id: string) => {
    setInsights((prev: InsightCardItem[]) => prev.filter((i: InsightCardItem) => i.id !== id));
  };

  if (insights.length === 0) return null;

  const severityColors: Record<string, { border: string; bg: string; text: string; iconColor: string }> = {
    CRITICAL: {
      border: 'rgba(220, 38, 38, 0.3)',
      bg: 'rgba(220, 38, 38, 0.05)',
      text: 'var(--color-status-error)',
      iconColor: '#DC2626',
    },
    WARNING: {
      border: 'rgba(217, 119, 6, 0.3)',
      bg: 'rgba(217, 119, 6, 0.05)',
      text: 'var(--color-status-warning)',
      iconColor: '#D97706',
    },
    POSITIVE: {
      border: 'rgba(25, 135, 84, 0.3)',
      bg: 'rgba(25, 135, 84, 0.05)',
      text: 'var(--color-brand-green)',
      iconColor: '#198754',
    },
    NEUTRAL: {
      border: 'var(--color-border-default)',
      bg: 'var(--color-surface-subtle)',
      text: 'var(--color-brand-navy)',
      iconColor: 'var(--color-brand-navy)',
    },
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-micro)',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              color: '#4F46E5',
              display: 'flex',
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
              QINDE AI Executive Financial Insights
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Real-time automated analytics, cash flow projections, and anomaly detection.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 600, color: '#4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.08)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
          {insights.length} Active Signals
        </span>
      </div>

      {/* Insights Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {insights.map((item: InsightCardItem) => {
          const colors = severityColors[item.severity] || severityColors.NEUTRAL;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 'var(--radius-standard)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                position: 'relative',
              }}
            >
              {/* Dismiss button */}
              <button
                onClick={() => dismissInsight(item.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  padding: '2px',
                }}
                title="Dismiss Insight"
              >
                <X size={14} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.severity === 'POSITIVE' && <TrendingUp size={16} color={colors.iconColor} />}
                  {item.severity === 'WARNING' && <AlertTriangle size={16} color={colors.iconColor} />}
                  {item.severity === 'NEUTRAL' && <ShieldCheck size={16} color={colors.iconColor} />}
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h4>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {item.description}
                </p>
              </div>

              {/* Action Button & Impact Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                {item.impactValue && (
                  <span style={{ fontSize: '12px', fontWeight: 700, color: colors.text }}>
                    {item.impactValue}
                  </span>
                )}
                {item.recommendedAction && (
                  <button
                    onClick={() => onActionClick && onActionClick(item.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-brand-navy)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{item.recommendedAction}</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
