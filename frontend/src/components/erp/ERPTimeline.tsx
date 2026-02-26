import React from 'react';


export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  description?: string;
  actor?: string;
}

interface ERPTimelineProps {
  events: TimelineEvent[];
}

/**
 * QINDE ERP — Transaction Signal Timeline Component
 * Signature vertical pulse rail motif for tracking financial event lifecycles.
 */
export const ERPTimeline: React.FC<ERPTimelineProps> = ({ events }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%' }}>
      {events.map((evt, idx) => {
        const isLast = idx === events.length - 1;

        const statusColors: Record<TimelineEvent['status'], { dot: string; line: string }> = {
          completed: { dot: 'var(--color-brand-green)', line: 'var(--color-brand-green)' },
          current: { dot: 'var(--color-brand-navy)', line: 'var(--color-border-default)' },
          pending: { dot: '#CBD5E1', line: '#E2E8F0' },
          failed: { dot: 'var(--color-status-error)', line: 'var(--color-status-error)' },
        };

        const currentColors = statusColors[evt.status] || statusColors.pending;

        return (
          <div key={evt.id} style={{ display: 'flex', gap: '16px' }}>
            {/* Vertical Signal Pulse Rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentColors.dot,
                  border: '2.5px solid var(--color-surface-card)',
                  boxShadow: evt.status === 'completed' ? '0 0 0 3px rgba(25, 135, 84, 0.2)' : 'none',
                  zIndex: 2,
                  marginTop: '4px',
                }}
              />
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    width: '2px',
                    backgroundColor: currentColors.line,
                    minHeight: '36px',
                    margin: '2px 0',
                  }}
                />
              )}
            </div>

            {/* Event Body Content */}
            <div style={{ flex: 1, paddingBottom: isLast ? '0' : '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {evt.title}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-family-technical)',
                  }}
                >
                  {evt.timestamp}
                </span>
              </div>

              {evt.description && (
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {evt.description}
                </p>
              )}

              {evt.actor && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-disabled)', marginTop: '4px', display: 'block' }}>
                  By: {evt.actor}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
