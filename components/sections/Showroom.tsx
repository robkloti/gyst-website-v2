import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SHOWROOM } from '../../constants';

// Replaces the case studies. "The proof is the showroom" — offer.md §4.6.
export const Showroom = () => (
    <section className="relative w-full py-24 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto">
            <Reveal>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-hazard mb-4">The receipt</div>
                <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">Three brands. One harness.</h2>
                <p className="text-steel text-lg mt-5 max-w-2xl">Every public short, every ad cycle, every outreach wave below shipped through the same engine you'd get. Same folder pattern, different CONTEXT.md.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-12">
                {SHOWROOM.map((b, i) => (
                    <Reveal key={b.name} delay={0.1 * i} className="bg-charcoal">
                        <div className="p-7 h-full flex flex-col gap-5">
                            <div>
                                <div className="font-display text-3xl text-paper">{b.name}</div>
                                <div className="text-sm text-steel mt-1">{b.role}</div>
                                <div className="font-mono text-[10px] text-steel/70 mt-2 truncate">{b.room}</div>
                            </div>
                            <ul className="space-y-3 mt-auto">
                                {b.receipts.map((r) => (
                                    <li key={r} className="flex gap-3 text-[14px] text-paper/85 leading-snug">
                                        <span className="font-mono text-emerald-400 shrink-0">✓</span>
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mt-4">Reply rates are human-classified after OOO and wrong-ICP filtering. Raw rates aren't quoted here.</p>
        </div>
    </section>
);
