import React from 'react';
import { SectionId } from '../../types';
import { BOOK_LABEL, BOOK_URL, OFFER_MODULES, OFFER_STACKS } from '../../constants';
import { trackBookClick } from '../../lib/track';
import { useSection } from '../../lib/useSection';
import { useVertical } from '../../lib/vertical';
import { Reveal } from '../ui/Reveal';
import { SkillTree } from './SkillTree';

// One flagship, six modules that plug into it, two ready-made stacks. No prices.
export const Offer: React.FC<{ onInView: (id: SectionId) => void }> = ({ onInView }) => {
    const ref = useSection(SectionId.OFFER, onInView);
    const { vertical } = useVertical();
    const modules = vertical.modules.map((id) => OFFER_MODULES.find((m) => m.id === id)!);

    return (
        <section ref={ref} id="offer" className="relative w-full py-24 px-4 sm:px-6 md:px-12 z-10 scroll-mt-20 bg-charcoal border-t border-paper/10">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">The offer</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">One brain. Six modules that plug into it.</h2>
                    <p className="text-steel text-lg mt-5 max-w-2xl">Everyone starts with the brain. A module is only good when it reads the brain, so the modules come second. Pick one to see the skills inside it and what it reads.</p>
                </Reveal>

                <Reveal>
                    <SkillTree modules={modules} />
                </Reveal>

                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mt-14 mb-4">Ready-made stacks</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10 border border-paper/10">
                        {OFFER_STACKS.map((s) => (
                            <div key={s.name} className="bg-charcoal p-6 flex flex-col">
                                <h3 className="text-paper text-[18px] font-semibold">{s.name}</h3>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] bg-paper text-charcoal border border-paper px-2 py-1">Brain</span>
                                    {s.parts.map((p) => (
                                        <span key={p} className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-paper border border-paper/25 px-2 py-1">{p}</span>
                                    ))}
                                </div>
                                <p className="text-steel text-[14.5px] leading-relaxed mt-3 mb-5">{s.line}</p>
                                <a href={BOOK_URL} onClick={() => trackBookClick('home_stack')} className="mt-auto text-paper text-[14.5px] font-semibold no-underline hover:underline underline-offset-4">
                                    {BOOK_LABEL} <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
