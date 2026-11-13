import React, { useEffect, useMemo } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { BOOK_LABEL, BOOK_URL, OFFER_BRAIN } from '../constants';
import { Button } from '../components/ui/Button';
import { Wordmark } from '../components/ui/Lockup';
import { Reveal } from '../components/ui/Reveal';
import { WorkerRoom } from '../rooms/WorkerRoom';
import { HVAC_ROOM } from '../rooms/hvac';
import { track, trackBookClick } from '../lib/track';
import { verticalByKey } from '../lib/vertical';
import { LEAKS, NIGHT_LOG, OWNER_WORDS, PROOF, STACK, STEPS, TRADES_FAQ, TRADES_FINAL, TRADES_HERO } from './copy';
import { bookUrl, shopFromSearch } from './shop';

const LABEL = 'font-mono text-[10px] uppercase tracking-[0.16em]';
const H2 = 'font-display text-4xl md:text-6xl text-paper';
const SECTION = 'relative w-full py-20 md:py-24 px-4 sm:px-6 md:px-12 border-t border-paper/10 scroll-mt-16';

const Book: React.FC<{ href: string; label: string; className?: string }> = ({ href, label, className = '' }) => (
    <a href={href} onClick={() => trackBookClick(label)} className={`no-underline ${className}`}>
        <Button variant="primary" className="w-full">{BOOK_LABEL}</Button>
    </a>
);

// The front desk on a sample night. Stands in for the engine dashboard, which stays off this page.
const NightLog: React.FC<{ shop: string | null }> = ({ shop }) => (
    <motion.figure
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[520px] mx-auto lg:mx-0 lg:ml-auto"
    >
        <div className="border border-paper/20 bg-[#141517] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-paper/10">
                <span className={`${LABEL} text-paper min-w-0 leading-relaxed break-words`}>{shop ?? 'Your shop'} / front desk</span>
                <span className={`${LABEL} text-steel shrink-0 border border-paper/20 px-2 py-1`}>Sample night</span>
            </div>
            <ol className="px-4 py-2">
                {NIGHT_LOG.map((row, i) => (
                    <motion.li
                        key={row.time + row.who}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.22 }}
                        className="grid grid-cols-[68px_1fr] gap-3 py-3 border-b border-paper/10 last:border-b-0"
                    >
                        <span className="font-mono text-[11px] text-steel pt-[3px] whitespace-nowrap">{row.time}</span>
                        <span className="min-w-0">
                            <span className={`${LABEL} text-steel flex items-center gap-2`}>
                                <i aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-hazard' : 'bg-paper/40'}`} />
                                {row.who}
                            </span>
                            <span className="block text-paper text-[15px] leading-snug mt-1">{row.text}</span>
                        </span>
                    </motion.li>
                ))}
            </ol>
        </div>
        <figcaption className="text-steel text-[12.5px] mt-3">An example night at the front desk. Sample calls, not real customer data.</figcaption>
    </motion.figure>
);

const TradesPage: React.FC = () => {
    const shop = useMemo(() => shopFromSearch(window.location.search), []);
    const book = useMemo(() => bookUrl(BOOK_URL, window.location.search), []);
    const trades = verticalByKey('trades');

    useEffect(() => {
        document.title = 'GYST for HVAC and trades shops - every call answered, every quote chased';
        track('trades_view', { personalised: shop !== null });
    }, [shop]);

    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen w-full bg-charcoal text-paper selection:bg-hazard/30 selection:text-hazard overflow-x-hidden font-sans">
                {/* The nav is the mark and one button. No way out to other verticals. */}
                <header className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur border-b border-paper/10">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 xl:px-0 h-16 flex items-center justify-between gap-4">
                        <Wordmark size={22} />
                        <a href={book} onClick={() => trackBookClick('trades-nav')} className="no-underline">
                            <Button variant="secondary" className="!px-4 sm:!px-5 !py-2 !text-[10px]">{BOOK_LABEL}</Button>
                        </a>
                    </div>
                </header>

                <main>
                    <section id="hero" className="relative w-full pt-14 md:pt-20 pb-20 md:pb-24 px-4 sm:px-6 md:px-12">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-14 items-center">
                            <div className="min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className={`${LABEL} md:text-[11px] text-hazard flex items-center gap-3`}
                                >
                                    <span aria-hidden="true" className="w-6 h-[2px] bg-hazard shrink-0" />
                                    <span id="trades-eyebrow" className="min-w-0 break-words">{shop ? `Built for ${shop}` : TRADES_HERO.eyebrow}</span>
                                </motion.div>
                                <h1 className="font-display text-[clamp(36px,10.4vw,66px)] text-paper mt-6">
                                    {TRADES_HERO.line1}<br />
                                    <span className="text-hazard">{TRADES_HERO.line2}</span>
                                </h1>
                                <p className="text-base md:text-lg text-steel leading-relaxed max-w-[36rem] mt-7 text-pretty">{TRADES_HERO.sub}</p>
                                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                    <Book href={book} label="trades-hero" />
                                    <a href="/find-leaks" onClick={() => track('trades_calculator_click', { location: 'hero' })} className="no-underline">
                                        <Button variant="secondary" className="w-full">Find your leaks &middot; 4 min</Button>
                                    </a>
                                </div>
                            </div>
                            <NightLog shop={shop} />
                        </div>
                    </section>

                    <section id="leaks" className={SECTION}>
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

                    <section id="room" className={SECTION}>
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

                    <section id="stack" className={SECTION}>
                        <div className="max-w-6xl mx-auto">
                            <Reveal>
                                <div className={`${LABEL} text-steel mb-4`}>The Trades stack</div>
                                <h2 className={`${H2} max-w-3xl`}>Write the shop down once. Build on it.</h2>
                                <p className="text-steel text-lg mt-5 max-w-2xl">The front desk can only quote your price if it has read your price book. So that comes first. Everything else plugs into it.</p>
                            </Reveal>

                            <Reveal>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-12">
                                    {STACK.map((part, i) => (
                                        <div key={part.name} className="relative bg-[#202124] border border-paper/20 p-5 lg:min-h-[176px]">
                                            <div className={`${LABEL} tracking-[0.14em] text-steel`}>Built on top {String(i + 1).padStart(2, '0')}</div>
                                            <h3 className="text-paper text-[18px] font-semibold leading-tight mt-2">{part.name}</h3>
                                            <p className="text-steel text-[14px] leading-snug mt-2">{part.line}</p>
                                            <span aria-hidden="true" className="hidden lg:block absolute left-1/2 -bottom-[11px] w-[2px] h-[10px] bg-paper/25" />
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-paper text-charcoal mt-2.5 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-7 lg:gap-10">
                                    <div>
                                        <span className={`inline-block bg-charcoal text-paper ${LABEL} px-2 py-1`}>Underneath &middot; start here</span>
                                        <h3 className="font-display text-[44px] md:text-[60px] text-charcoal mt-4">{OFFER_BRAIN.name}</h3>
                                        <p className="text-[#4A4D54] text-[15px] leading-relaxed mt-3">{trades.pack} Written down once, in files you own.</p>
                                        <a href={book} onClick={() => trackBookClick('trades-stack')} className="inline-flex mt-5 no-underline border border-charcoal bg-charcoal text-paper hover:bg-transparent hover:text-charcoal transition-colors font-mono font-bold text-[11px] uppercase tracking-[0.12em] px-7 py-3.5 rounded-sm">
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

                    <section id="proof" className={SECTION}>
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

                    <section id="faq" className={`${SECTION} pb-28`}>
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
                </main>

                <footer className="border-t border-paper/10">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 xl:px-0 py-8 flex flex-wrap items-center justify-between gap-4">
                        <Wordmark size={20} />
                        <div className={`${LABEL} tracking-[0.12em] text-steel`}>
                            <a href="mailto:rob@gyst-ai.com" className="text-steel hover:text-paper no-underline">rob@gyst-ai.com</a> &middot; Sheridan, WY &middot; &copy; 2026 GYST AI
                        </div>
                    </div>
                </footer>

                <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }} />
            </div>
        </MotionConfig>
    );
};

export default TradesPage;
