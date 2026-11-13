import React from 'react';
import { SectionId } from '../../types';
import { BOOK_LABEL, BOOK_URL, FAQ } from '../../constants';
import { trackBookClick } from '../../lib/track';
import { useSection } from '../../lib/useSection';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const Faq: React.FC<{ onInView: (id: SectionId) => void }> = ({ onInView }) => {
    const ref = useSection(SectionId.FINAL, onInView);
    return (
        <section ref={ref} id="faq" className="relative w-full pt-24 pb-28 px-4 sm:px-6 md:px-12 z-10 scroll-mt-20 border-t border-paper/10 bg-charcoal">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">Questions</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper">Before you book.</h2>
                </Reveal>
                <Reveal>
                    <div className="border-t border-paper/15">
                        {FAQ.map(([q, a]) => (
                            <details key={q} className="group border-b border-paper/15">
                                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden py-5 text-paper text-[18px] font-semibold">
                                    {q}
                                    <span aria-hidden="true" className="font-mono text-steel text-[18px] leading-none transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="text-steel text-[16px] leading-relaxed pb-6 max-w-2xl">{a}</p>
                            </details>
                        ))}
                    </div>
                </Reveal>
            </div>

            <div className="max-w-6xl mx-auto mt-24 text-center flex flex-col items-center">
                <Reveal>
                    <h2 className="font-display text-[clamp(40px,9vw,88px)] text-paper">Get it out of your head.</h2>
                    <p className="text-steel text-lg mt-5 max-w-xl mx-auto">One call to map how the business runs today and pick the first thing worth building.</p>
                    <a href={BOOK_URL} onClick={() => trackBookClick('home_final')} className="inline-block mt-8 no-underline">
                        <Button variant="primary">{BOOK_LABEL}</Button>
                    </a>
                </Reveal>
            </div>
        </section>
    );
};
