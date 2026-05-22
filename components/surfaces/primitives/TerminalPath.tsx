import React from 'react';

/**
 * Terminal-style path indicator, e.g. `~/calculator / hvac / live`.
 * The single strongest "this is a real system, not a marketing image" signal.
 */
export const TerminalPath: React.FC<{ path: string; className?: string }> = ({
  path,
  className,
}) => (
  <span className={`surface-terminal-path${className ? ` ${className}` : ''}`}>
    {path}
  </span>
);
