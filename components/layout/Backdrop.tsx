import React from 'react';
import { SectionId } from '../../types';
import { LoopVisualizer } from '../visuals/LoopVisualizer';

// The fixed ring behind every page section. It changes shape as sections scroll into view.
export const RingBackdrop: React.FC<{ activeSection: SectionId }> = ({ activeSection }) => (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-[800px] max-h-[800px] opacity-[0.15] lg:opacity-100 lg:translate-x-[25%] transition-all duration-700">
            <LoopVisualizer activeSection={activeSection} />
        </div>
    </div>
);

export const Grain = () => (
    <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }} />
);
