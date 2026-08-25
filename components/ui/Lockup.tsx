import React from 'react';
import { Icon } from './Icons';

interface LockupProps {
    size?: number;          // wordmark font size in px; everything scales off it
    descriptor?: boolean;   // drop below ~8px descriptor (spec §4 "compact")
    className?: string;
}

// Primary lockup — device as the period. Spec §4. Hazard appears here on the device.
export const Lockup: React.FC<LockupProps> = ({ size = 22, descriptor = true, className = '' }) => {
    const deviceSize = size * 0.22;
    const useSmall = deviceSize <= 32;
    return (
        <a href="/" className={`inline-flex items-end no-underline ${className}`} aria-label="GYST — Automated Systems" style={{ fontSize: size, lineHeight: 0.82 }}>
            <span className="font-display text-paper flex items-end" style={{ letterSpacing: '.005em', gap: '.145em', lineHeight: 0.82 }}>
                GYST
                <Icon name={useSmall ? 'GystDeviceSmall' : 'GystLogo'} size={deviceSize} className="text-hazard shrink-0" style={{ marginBottom: '.03em' }} />
            </span>
            {descriptor && (
                <span className="font-mono uppercase text-steel" style={{ fontSize: size * 0.30, letterSpacing: '.24em', lineHeight: 1.3, marginLeft: '.5em', paddingBottom: '.05em', fontWeight: 400 }}>
                    Automated<br />Systems
                </span>
            )}
        </a>
    );
};
