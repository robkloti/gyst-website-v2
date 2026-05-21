import React from 'react';

type SurfaceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

/**
 * The shared dark card: flat against the page (no drop shadow), 1px border,
 * 12px radius, faint warm inner glow. Padding 32px mobile / 48px desktop.
 */
export const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={`surface-card${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </div>
  )
);

SurfaceCard.displayName = 'SurfaceCard';
