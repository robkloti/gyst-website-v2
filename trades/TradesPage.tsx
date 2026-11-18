import React, { useEffect, useMemo, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { BOOK_LABEL, BOOK_URL, OFFER_MODULES } from '../constants';
import { Grain, RingBackdrop } from '../components/layout/Backdrop';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { DemoOrbit } from '../components/sections/DemoOrbit';
import { SkillTree } from '../components/sections/SkillTree';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { WorkerRoom } from '../rooms/WorkerRoom';
import { HVAC_ROOM } from '../rooms/hvac';
import { track, trackBookClick } from '../lib/track';
import { useSection } from '../lib/useSection';
import { VerticalContext, verticalByKey } from '../lib/vertical';
import { SectionId } from '../types';
import { LEAKS, NIGHT_LOG, OWNER_WORDS, PROOF, STEPS, TRADES_FAQ, TRADES_FINAL, TRADES_HERO, TRADES_ORBIT } from './copy';
import { bookUrl, shopFromSearch } from './shop';

const LABEL = 'font-mono text-[10px] uppercase tracking-[0.16em]';
const H2 = 'font-display text-4xl md:text-6xl text-paper';
// Same rhythm as the homepage sections in components/sections.
const SECTION = 'relative z-10 w-full py-24 px-4 sm:px-6 md:px-12 border-t border-paper/10 scroll-mt-20';
const NAV: [string, string][] = [['#demos', 'The demos'], ['#room', 'The room'], ['#stack', 'The stack'], ['#proof', 'Proof']];
// On a phone the log keeps the call, the booking and the morning report so the demos sit higher.
const PHONE_ROWS = [0, 2, 4];
// The trades vertical swings the HVAC demo to the top of the orbit.
const TRADES = { vertical: verticalByKey('trades'), setVertical: () => {} };

const Book: React.FC<{ href: string; label: string; className?: string }> = ({ href, label, className = '' }) => (
    <a href={href} onClick={() => trackBookClick(label)} className={`no-underline ${className}`}>
        <Button variant="primary" className="w-full">{BOOK_LABEL}</Button>
    </a>
);

// The front desk on a sample night. Sits where the homepage hero has its console: a row of five on a wide screen, a list of three on a phone.
const NightLog: React.FC<{ shop: string | null }> = ({ shop }) => (
    <motion.figure
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="w-full max-w-[1040px] mx-auto mt-10 md:mt-16 relative z-20"
    >
        <div className="border border-paper/20 bg-[#141517] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 px-3 py-2.5 border-b border-paper/10">
                <span className="hidden sm:flex gap-1.5" aria-hidden="true">
                    <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                    <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                    <i className="w-[9px] h-[9px] rounded-full bg-paper/15" />
                </span>
                <span className="flex-1 min-w-0 text-left bg-paper/[0.04] px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-steel break-words">
                    <span className="text-paper">{shop ?? 'Your shop'}</span> / front desk
                </span>
                <span className={`${LABEL} text-steel shrink-0 border border-paper/20 px-2 py-1`}>Sample night</span>
            </div>
            <ol className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-paper/10 text-left">
                {NIGHT_LOG.map((row, i) => (
                    <motion.li
                        key={row.time + row.who}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.22 }}
                        className={`bg-[#141517] ${PHONE_ROWS.includes(i) ? 'grid' : 'hidden lg:grid'} grid-cols-[68px_1fr] lg:grid-cols-1 lg:content-start gap-x-3 gap-y-3 px-4 py-3 lg:px-5 lg:py-5`}
                    >
                        <span className="font-mono text-[11px] lg:text-[12px] text-steel pt-[3px] lg:pt-0 whitespace-nowrap">{row.time}</span>
                        <span className="min-w-0">
                            <span className={`${LABEL} text-steel flex items-center gap-2`}>
                                <i aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-paper' : 'bg-paper/30'}`} />
                                {row.who}
                            </span>
                            <span className="block text-paper text-[15px] leading-snug mt-1.5">{row.text}</span>
                        </span>
                    </motion.li>
                ))}
            </ol>
        </div>
        <figcaption className="text-steel text-[12.5px] mt-3 text-left">An example night at the front desk. Sample calls, not real customer data.</figcaption>
    </motion.figure>
);

const TradesPage: React.FC = () => {
    const shop = useMemo(() => shopFromSearch(window.location.search), []);
    const book = useMemo(() => bookUrl(BOOK_URL, window.location.search), []);
    const trades = TRADES.vertical;
    const modules = trades.modules.map((id) => OFFER_MODULES.find((m) => m.id === id)!);

    // Each section tells the ring behind the page what to draw, the same way the homepage does.
    const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
    const heroRef = useSection(SectionId.HERO, setActiveSection);
    const roomRef = useSection(SectionId.ROUTE, setActiveSection);
    const leaksRef = useSection(SectionId.PROBLEM, setActiveSection);
    const stackRef = useSection(SectionId.DO, setActiveSection);
    const proofRef = useSection(SectionId.RUN, setActiveSection);
    const faqRef = useSection(SectionId.FINAL, setActiveSection);

    useEffect(() => {
        document.title = 'GYST for HVAC and trades shops - every call answered, every quote chased';
        track('trades_view', { personalised: shop !== null });
    }, [shop]);

    return (
        <MotionConfig reducedMotion="user">
            <VerticalContext.Provider value={TRADES}>
                <div className="min-h-screen w-full bg-charcoal text-paper selection:bg-hazard/30 selection:text-hazard overflow-x-hidden font-sans">
                    <Navbar links={NAV} homeHref="#hero" bookHref={book} bookLocation="trades-nav" />
                    <RingBackdrop activeSection={activeSection} />

                    <main className="relative z-10 flex flex-col w-full">
                        <section ref={heroRef} id="hero" className="pt-32 pb-14 md:pb-28 flex flex-col items-center px-4 sm:px-6 md:px-12 relative z-10 w-full overflow-hidden">
                            <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className={`${LABEL} md:text-[11px] text-hazard inline-flex items-center gap-3 min-h-[2.6em] max-w-full`}
                                >
                                    <span aria-hidden="true" className="hidden sm:block w-6 h-[2px] bg-hazard shrink-0" />
                                    <span id="trades-eyebrow" className="min-w-0 break-words">{shop ? `Built for ${shop}` : TRADES_HERO.eyebrow}</span>
                                    <span aria-hidden="true" className="hidden sm:block w-6 h-[2px] bg-hazard shrink-0" />
                                </motion.div>
                                <h1 className="font-display text-[clamp(36px,10.4vw,104px)] text-paper mt-6">
                                    {TRADES_HERO.line1}<br />
                                    <span className="text-hazard">{TRADES_HERO.line2}</span>
                                </h1>
                                <p className="text-base md:text-lg text-steel leading-relaxed max-w-[43rem] mt-7 text-pretty">{TRADES_HERO.sub}</p>
                                <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
                                    <Book href={book} label="trades-hero" />
                                    <a href="/find-leaks" onClick={() => track('trades_calculator_click', { location: 'hero' })} className="no-underline">
                                        <Button variant="secondary" className="w-full">Find your leaks &middot; 4 min</Button>
                                    </a>
                                </div>
                            </div>
                            <NightLog shop={shop} />
                        </section>

                        <DemoOrbit intro={TRADES_ORBIT} />

                        <section ref={roomRef} id="room" className={`${SECTION} border-t-0`}>
                            <div className="max-w-6xl mx-auto">
                                <Reveal>
                                    <div className={`${LABEL} text-steel mb-4`}>The room</div>
                                    <h2 className={`${H2} max-w-3xl`}>Your shop, with the night shift covered.</h2>
                                    <p className="text-steel text-lg mt-5 max-w-2xl">Every desk is one job. Two of them are still people: your dispatcher and you. Click any desk to see what it does.</p>
                                </Reveal>
                                <p className="text-steel text-[15px] mt-10 mb-4">An example room built from the HVAC install. Sample activity, not a client.</p>
                                <WorkerRoom room={HVAC_ROOM} />
                            </div>
                        </section>

                        <section ref={leaksRef} id="leaks" className={SECTION}>
                            <div className="max-w-6xl mx-auto">
                                <Reveal>
                                    <div className={`${LABEL} text-steel mb-4`}>Three leaks</div>
                                    <h2 className={`${H2} max-w-3xl`}>Where the jobs go.</h2>
                                    <p className="text-steel text-lg mt-5 max-w-2xl">You did the hard part. The phone rang, the quote went out, the job got done. This is where the money leaks after that.</p>
                                </Reveal>
                                <Reveal>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-12">
                                        {LEAKS.map((leak, i) => (
                                            <div key={leak.title} className="bg-charcoal p-6 md:p-7 flex flex-col">
                                                <div className={`${LABEL} text-steel`}>Leak {String(i + 1).padStart(2, '0')}</div>
                                                <h3 className="font-display text-[32px] md:text-4xl text-paper mt-3">{leak.title}</h3>
                                                <p className="text-steel text-[15px] leading-relaxed mt-3 mb-6">{leak.pain}</p>
                                                <div className="mt-auto bg-paper/[0.04] border border-paper/10 px-4 py-3.5">
                                                    <div className={`${LABEL} text-paper`}>What we build</div>
                                                    <p className="text-paper/85 text-[14.5px] leading-snug mt-1.5">{leak.fix}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>
                                <Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-14">
                                        {OWNER_WORDS.map((words) => (
                                            <blockquote key={words} className="border-l-2 border-paper/30 pl-5 text-paper text-[20px] md:text-[22px] leading-snug font-medium text-pretty">
                                                &ldquo;{words}&rdquo;
                                            </blockquote>
                                        ))}
                                    </div>
                                    <p className={`${LABEL} text-steel mt-6 leading-relaxed`}>Trades owners in their own words, from public forums. Not GYST clients.</p>
                                </Reveal>
                            </div>
                        </section>

                        <section ref={stackRef} id="stack" className={`${SECTION} bg-charcoal`}>
                            <div className="max-w-6xl mx-auto">
                                <Reveal>
                                    <div className={`${LABEL} text-steel mb-4`}>The Trades stack</div>
                                    <h2 className={`${H2} max-w-3xl`}>Write the shop down once. Build on it.</h2>
                                    <p className="text-steel text-lg mt-5 max-w-2xl">The front desk can only quote your price if it has read your price book. So that comes first. Everything else plugs into it. Pick a module to see the skills inside it and what it reads.</p>
                                </Reveal>

                                <Reveal>
                                    <SkillTree modules={modules} brainLine={`${trades.pack} Written down once, in files you own.`} bookHref={book} bookLocation="trades-stack" showLive={false} />
                                </Reveal>

                                <Reveal>
                                    <div className={`${LABEL} text-steel mt-14 mb-4`}>How it goes in</div>
                                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
                                        {STEPS.map((step) => (
                                            <li key={step.when} className="bg-charcoal p-5">
                                                <div className="text-paper text-[17px] font-semibold">{step.when}</div>
                                                <p className="text-steel text-[14.5px] leading-relaxed mt-2">{step.what}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </Reveal>
                            </div>
                        </section>

                        <section ref={proofRef} id="proof" className={SECTION}>
                            <div className="max-w-6xl mx-auto">
                                <Reveal>
                                    <div className={`${LABEL} text-steel mb-4`}>Proof</div>
                                    <h2 className={`${H2} max-w-3xl`}>Don&rsquo;t take our word. Open it.</h2>
                                    <p className="text-steel text-lg mt-5 max-w-2xl">No borrowed logos and no made-up numbers. Two things you can click through right now, and one real build in another trade.</p>
                                </Reveal>
                                <Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-12">
                                        {PROOF.map((card) => (
                                            <a
                                                key={card.title}
                                                href={card.href}
                                                onClick={() => track('trades_proof_click', { card: card.href })}
                                                className="group bg-charcoal flex flex-col no-underline hover:bg-[#202124] transition-colors"
                                            >
                                                <div className="aspect-[16/10] overflow-hidden border-b border-paper/10 bg-[#141517]">
                                                    <img src={card.image} alt={card.alt} loading="lazy" className="block w-full h-full object-cover object-top" />
                                                </div>
                                                <div className="p-6 flex flex-col flex-1">
                                                    <div className={`${LABEL} text-steel`}>{card.tag}</div>
                                                    <h3 className="text-paper text-[20px] font-semibold leading-tight mt-2">{card.title}</h3>
                                                    <p className="text-steel text-[14.5px] leading-relaxed mt-2 mb-5">{card.line}</p>
                                                    <span className="mt-auto text-paper text-[14.5px] font-semibold group-hover:underline underline-offset-4">
                                                        {card.cta} <span aria-hidden="true">&rarr;</span>
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </Reveal>
                            </div>
                        </section>

                        <section ref={faqRef} id="faq" className={`${SECTION} pb-28 bg-charcoal`}>
                            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
                                <Reveal>
                                    <div className={`${LABEL} text-steel mb-4`}>Questions</div>
                                    <h2 className={H2}>Before you book.</h2>
                                </Reveal>
                                <Reveal>
                                    <div className="border-t border-paper/15">
                                        {TRADES_FAQ.map(([q, a]) => (
                                            <details key={q} className="group border-b border-paper/15">
                                                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden py-5 text-paper text-[17px] md:text-[18px] font-semibold">
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
                                    <h2 className="font-display text-[clamp(38px,9vw,88px)] text-paper text-balance">{TRADES_FINAL.title}</h2>
                                    <p className="text-steel text-lg mt-5 max-w-xl mx-auto">{TRADES_FINAL.sub}</p>
                                    <Book href={book} label="trades-final" className="inline-block mt-8" />
                                </Reveal>
                            </div>
                        </section>
                        <Footer bookHref={book} bookLocation="trades-footer" landing />
                    </main>

                    <Grain />
                </div>
            </VerticalContext.Provider>
        </MotionConfig>
    );
};

export default TradesPage;
