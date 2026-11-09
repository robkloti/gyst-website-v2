import React from 'react';
import { Reveal } from '../ui/Reveal';
import { HARNESS_STRIP, ALSO_WIRED } from '../../constants';

// Replaces the tech-logo marquee. Four tiles in the framing voice.md prescribes.
export const HarnessStrip = () => (
    <section className="relative w-full bg-charcoal border-t border-paper/10 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {HARNESS_STRIP.map((t, i) => (
                        <div key={t.label} className={`py-6 pr-6 ${i < 3 ? 'md:border-r md:border-paper/10' : ''} ${i % 2 === 0 ? 'border-r border-paper/10 md:border-r' : ''} ${i < 2 ? 'border-b border-paper/10 md:border-b-0' : ''} ${i > 0 ? 'md:pl-6' : ''} ${i % 2 === 1 ? 'pl-6 md:pl-6' : ''}`}>
                            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel">{t.label}</div>
                            <div className="font-display text-2xl text-paper mt-1">{t.value}</div>
                            <div className="text-[11px] text-steel mt-1">{t.detail}</div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-paper/10 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-steel">
                    Also wired where the job needs it: {ALSO_WIRED.map((w, i) => (
                        <span key={w}><span className="text-paper">{w}</span>{i < ALSO_WIRED.length - 1 ? ' · ' : ''}</span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);
