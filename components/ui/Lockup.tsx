import React from 'react';

// BRAND.md §3-4: device as the period. Master device above 32px, small (no seams) at or below.
const MASTER = [
    [8, 0, 8, 20], [8, 28, 8, 3], [8, 41, 8, 7], [32, 0, 8, 7], [32, 17, 8, 3], [32, 28, 8, 20],
    [0, 8, 7, 8], [17, 8, 3, 8], [28, 8, 20, 8], [0, 32, 20, 8], [28, 32, 3, 8], [41, 32, 7, 8],
];
const SMALL = [
    [8, 0, 8, 20], [8, 28, 8, 20], [32, 0, 8, 20], [32, 28, 8, 20],
    [0, 8, 20, 8], [28, 8, 20, 8], [0, 32, 20, 8], [28, 32, 20, 8],
];

export const Device: React.FC<{ size: number; className?: string }> = ({ size, className = '' }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
        <g fill="currentColor">
            {(size > 32 ? MASTER : SMALL).map(([x, y, w, h]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />)}
        </g>
    </svg>
);

// Descriptor is .115em of the wordmark; spec says drop it (compact) when it would fall under ~8px.
export const Lockup: React.FC<{ size?: number }> = ({ size = 28 }) => (
    <a href="/" aria-label="GYST - Automated Systems" className="inline-flex items-end no-underline" style={{ fontSize: size, lineHeight: 0.82 }}>
        <span className="font-anton text-paper flex items-end" style={{ letterSpacing: '.005em', gap: '.145em', lineHeight: 0.82 }}>
            GYST
            <Device size={size * 0.22} className="text-hazard shrink-0" />
        </span>
        {size * 0.115 >= 8 && (
            <span className="font-mono uppercase text-steel" style={{ fontSize: size * 0.115, letterSpacing: '.24em', lineHeight: 1.85, marginLeft: '.34em', paddingBottom: '.07em' }}>
                Automated<br />Systems
            </span>
        )}
    </a>
);
