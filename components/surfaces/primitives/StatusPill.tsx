import React from 'react';

/**
 * "running now" pill with a pulsing green dot. Lives upper-right of a live-system card.
 * The pulse is pure CSS (surface-status-pulse) and respects prefers-reduced-motion.
 */
export const StatusPill: React.FC<{ label?: string }> = ({ label = 'running now' }) => (
  <span className="surface-status-pill">
    <span className="surface-status-pill__dot" aria-hidden="true" />
    <span className="surface-status-pill__label">{label}</span>
  </span>
);
