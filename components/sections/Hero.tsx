import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../../types';
import { BOOK_LABEL, BOOK_URL, HERO, VERTICALS } from '../../constants';
import { trackBookClick } from '../../lib/track';
import { useSection } from '../../lib/useSection';
import { useVertical } from '../../lib/vertical';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroSection: React.FC<{ onInView: (id: SectionId) => void }> = ({ onInView }) => {
    const ref = useSection(SectionId.HERO, onInView);
    const { vertical, setVertical } = useVertical();
    const [still, setStill] = useState(reducedMotion);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const on = () => setStill(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);

    // React does not write the muted attribute, and browsers refuse autoplay without it.
    const video = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!video.current) return;
        video.current.muted = true;
        video.current.play().catch(() => {});
    }, [still]);

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const i = VERTICALS.findIndex((v) => v.key === vertical.key);
        const next = VERTICALS[(i + (e.key === 'ArrowRight' ? 1 : VERTICALS.length - 1)) % VERTICALS.length];
        setVertical(next.key);
        document.getElementById(`vertical-tab-${next.key}`)?.focus();
    };

    return (
        <section ref={ref} id="hero" className="pt-32 pb-20 md:pb-28 flex flex-col items-center px-4 sm:px-6 md:px-12 relative z-10 w-full overflow-hidden">
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-hazard min-h-[2.6em]"
                >
                    <span className="hidden sm:block w-6 h-[2px] bg-hazard shrink-0" />
                    {vertical.eyebrow}
                    <span className="hidden sm:block w-6 h-[2px] bg-hazard shrink-0" />
                </motion.div>

                <h1 className="font-display text-[clamp(40px,11.6vw,112px)] text-paper mt-6">
                    {HERO.line1}<br />
                    <span className="text-hazard">{HERO.line2}</span>
                </h1>

                <p className="text-base md:text-lg text-steel leading-relaxed max-w-[43rem] mt-7 text-pretty">
                    {HERO.sub[0]}<span className="text-paper font-medium">{HERO.sub[1]}</span>{HERO.sub[2]}
                </p>

                <div className="w-full max-w-[860px] mt-9">
                    <div id="vertical-label" className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-3">I run a</div>
                    <div role="tablist" aria-labelledby="vertical-label" onKeyDown={onKey} className="grid grid-cols-2 md:grid-cols-6 gap-px bg-paper/20 border border-paper/20">
                        {VERTICALS.map((v) => (
                            <button
                                key={v.key}
                                id={`vertical-tab-${v.key}`}
                                role="tab"
                                type="button"
                                aria-selected={v.key === vertical.key}
                                aria-controls="vertical-panel"
                                tabIndex={v.key === vertical.key ? 0 : -1}
                                onClick={() => setVertical(v.key)}
                                className={`px-2 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${v.key === vertical.key ? 'bg-paper text-charcoal' : 'bg-charcoal text-steel hover:text-paper'}`}
                            >
                                {v.tab}
                            </button>
                        ))}
                    </div>
                    <div id="vertical-panel" role="tabpanel" aria-labelledby={`vertical-tab-${vertical.key}`} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10 border border-t-0 border-paper/10 text-left">
                        <div className="bg-charcoal px-4 py-4 md:min-h-[104px]">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">We package</div>
                            <p className="text-paper text-[14.5px] leading-snug mt-2">{vertical.pack}</p>
                        </div>
                        <div className="bg-charcoal px-4 py-4 md:min-h-[104px]">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">Then we build</div>
                            <p className="text-paper text-[14.5px] leading-snug mt-2">{vertical.build}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
                    <a href={BOOK_URL} onClick={() => trackBookClick('home_hero')} className="no-underline">
                        <Button variant="primary" className="w-full">{BOOK_LABEL}</Button>
                    </a>
                    <a href="#work" className="no-underline">
                        <Button variant="secondary" className="w-full pl-6 pr-4">
                            See the work <Icon name="ArrowRight" size={14} className="ml-2 rotate-90" />
                        </Button>
                    </a>
                </div>
            </div>

            <motion.figure
                id="hero-console"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="w-full max-w-[1040px] mx-auto mt-14 md:mt-16 relative z-20 scroll-mt-24"
            >
                <div className="border border-paper/20 bg-[#141517] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center gap-3 px-3 py-2.5 border-b border-paper/10">
                        <span className="flex gap-1.5" aria-hidden="true">
                            <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                            <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                            <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                        </span>
                        <span className="flex-1 min-w-0 truncate text-left bg-paper/[0.04] px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-steel">
                            console.shangproperties / agentic-os
                        </span>
                    </div>
                    {still ? (
                        <img src="/hero/shang-console.jpg" alt="The Shang Properties Agentic OS console: an orb of micro apps, this month's numbers and what needs review." width={1280} height={720} className="block w-full h-auto" />
                    ) : (
                        <video
                            ref={video}
                            className="block w-full h-auto"
                            width={1280}
                            height={720}
                            poster="/hero/shang-console.jpg"
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Screen recording of the Shang Properties Agentic OS console"
                        >
                            <source src="/hero/shang-console.mp4" type="video/mp4" />
                        </video>
                    )}
                </div>
                <figcaption className="text-steel text-[12.5px] mt-3 text-left">{HERO.caption}</figcaption>
            </motion.figure>
        </section>
    );
};
