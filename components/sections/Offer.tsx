import React from 'react';
import { SectionId } from '../../types';
import { BOOK_LABEL, BOOK_URL, OFFER_BRAIN, OFFER_MODULES, OFFER_STACKS } from '../../constants';
import { trackBookClick } from '../../lib/track';
import { useSection } from '../../lib/useSection';
import { useVertical } from '../../lib/vertical';
import { Reveal } from '../ui/Reveal';

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
                    <p className="text-steel text-lg mt-5 max-w-2xl">Everyone starts with the brain. A module is only good when it reads the brain, so the modules come second.</p>
                </Reveal>

                <Reveal>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5 mt-12">
                        {modules.map((m, i) => (
                            <div key={m.id} className="relative bg-[#202124] border border-paper/20 p-4 lg:min-h-[168px]">
                                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel">Module {String(i + 1).padStart(2, '0')}</div>
                                <h3 className="text-paper text-[16px] font-semibold leading-tight mt-2">{m.name}</h3>
                                <p className="text-steel text-[13px] leading-snug mt-2">{m.line}</p>
                                <span aria-hidden="true" className="hidden lg:block absolute left-1/2 -bottom-[11px] w-[2px] h-[10px] bg-paper/25" />
                            </div>
                        ))}
                    </div>

                    <div className="bg-paper text-charcoal mt-2.5 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-7 lg:gap-10">
                        <div>
                            <span className="inline-block bg-charcoal text-paper font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1">The flagship &middot; start here</span>
                            <h3 className="font-display text-[44px] md:text-[60px] text-charcoal mt-4">{OFFER_BRAIN.name}</h3>
                            <p className="text-[#4A4D54] text-[15px] leading-relaxed mt-3">Your AI operating system. {OFFER_BRAIN.line}</p>
                            <a href={BOOK_URL} onClick={() => trackBookClick('home_offer')} className="inline-flex mt-5 no-underline border border-charcoal bg-charcoal text-paper hover:bg-transparent hover:text-charcoal transition-colors font-mono font-bold text-[11px] uppercase tracking-[0.12em] px-7 py-3.5 rounded-sm">
                                {BOOK_LABEL}
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15 self-start">
                            {OFFER_BRAIN.inside.map(([name, note]) => (
                                <div key={name} className="bg-paper px-4 py-3">
                                    <div className="text-[14.5px] font-semibold">{name}</div>
                                    <div className="text-[#5C6068] text-[13px] leading-snug mt-0.5">{note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
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
