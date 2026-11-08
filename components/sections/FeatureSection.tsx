import { trackBookClick } from '../../lib/track';
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionContent, SectionId } from '../../types';
import { Reveal } from '../ui/Reveal';
import { Icon } from '../ui/Icons';
import { OFFER_STACK, OFFER_STACK_TOTAL, OFFER_PRICE, OFFER_GUARANTEE } from '../../constants';

interface FeatureSectionProps {
    content: SectionContent;
    onInView: (id: any) => void;
}

const Mono: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${className}`}>{children}</span>
);

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="w-full bg-[#141416] border border-paper/10 rounded-sm shadow-2xl overflow-hidden">
        <div className="h-9 border-b border-paper/10 flex items-center px-4 gap-3">
            <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-70" />
            </div>
            <span className="font-mono text-[10px] text-steel">{title}</span>
        </div>
        {children}
    </div>
);

// 01 · Route — CLAUDE.md as a routing table
const RouteVisual = () => {
    const rows = [
        { say: 'content, post, reel', go: '/content', chain: 'spawn-shorts → stop-slop' },
        { say: 'ads, 100 ads, ship ads', go: '/ads', chain: 'meta-ads → eval' },
        { say: 'outreach, cold email', go: '/outreach', chain: 'cold-email → stop-slop' },
        { say: 'client, deliverable', go: '/clients', chain: '—' },
    ];
    return (
        <Frame title="CLAUDE.md">
            <div className="p-5 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <div className="text-steel mb-3">## Routing</div>
                <div className="grid grid-cols-[1.2fr_0.7fr_1.3fr] gap-x-4 text-[10px] uppercase tracking-[0.12em] text-steel/70 pb-2 border-b border-paper/10">
                    <span>When I say…</span><span>Go to</span><span>Skill chain</span>
                </div>
                {rows.map((r, i) => (
                    <motion.div key={r.go} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12 }}
                        className={`grid grid-cols-[1.2fr_0.7fr_1.3fr] gap-x-4 py-2 border-b border-paper/5 ${i === 0 ? 'text-paper' : 'text-steel'}`}>
                        <span className="truncate">{r.say}</span>
                        <span className={i === 0 ? 'text-hazard' : ''}>{r.go}</span>
                        <span className="truncate">{r.chain}</span>
                    </motion.div>
                ))}
                <div className="mt-4 text-steel/70">→ loads content/CONTEXT.md only. 3 files read, not 40.</div>
            </div>
        </Frame>
    );
};

// 02 · Remember — one CONTEXT.md per room
const RememberVisual = () => {
    const tree = [
        { d: 0, t: 'marketing/', dim: false },
        { d: 1, t: 'CLAUDE.md', note: '# routing', dim: false },
        { d: 1, t: 'content/', dim: false },
        { d: 2, t: 'CONTEXT.md', note: '# process · voice · state', hi: true },
        { d: 2, t: 'results/', note: '# what worked', dim: true },
        { d: 1, t: 'ads/', dim: false },
        { d: 2, t: 'CONTEXT.md', hi: true },
        { d: 1, t: 'references/', dim: false },
        { d: 2, t: 'voice.md', note: '# from 6–10 real transcripts', hi: true },
        { d: 2, t: 'icp-profile.md', dim: true },
    ];
    return (
        <Frame title="tree -L 2">
            <div className="p-5 font-mono text-[11px] leading-[1.9] overflow-x-auto whitespace-nowrap">
                {tree.map((n, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06 }}
                        className={`flex gap-3 ${n.hi ? 'text-paper' : n.dim ? 'text-steel/60' : 'text-steel'}`} style={{ paddingLeft: n.d * 18 }}>
                        <span>{n.d > 0 ? '├── ' : ''}{n.t}</span>
                        {n.note && <span className="text-steel/60">{n.note}</span>}
                        {n.hi && <span className="ml-auto text-hazard">●</span>}
                    </motion.div>
                ))}
            </div>
        </Frame>
    );
};

// 03 · Do — a skill chain running
const DoVisual = () => {
    const steps = [
        { t: 'spawn-shorts · 7 sub-agents', s: 'done' },
        { t: 'carousel-build · 7 slides · 1080×1350', s: 'done' },
        { t: 'humanizer', s: 'done' },
        { t: 'stop-slop', s: 'loading' },
        { t: 'log-spawn → content/queue/', s: 'pending' },
    ];
    return (
        <Frame title="content room · skill chain">
            <div className="p-5 space-y-2 font-mono text-[11px]">
                {steps.map((st, i) => (
                    <motion.div key={st.t} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-sm bg-charcoal border border-paper/5">
                        <span className={st.s === 'done' ? 'text-paper' : 'text-steel'}>{st.t}</span>
                        {st.s === 'done' ? <Icon name="CheckCircle2" size={14} className="text-emerald-400" /> :
                         st.s === 'loading' ? <div className="w-3.5 h-3.5 rounded-full border-2 border-paper/20 border-t-hazard animate-spin" /> :
                         <Icon name="Circle" size={14} className="text-steel/40" />}
                    </motion.div>
                ))}
                <div className="pt-2 text-steel/70">$ ls content/queue/2026-08-19-design-md/ <span className="text-paper">→ 7 files</span></div>
            </div>
        </Frame>
    );
};

// 04 · Run — hooks on a schedule
const RunVisual = () => {
    const hooks = [
        { when: '06:00 daily', what: 'daily-content-prompt → 3 drafts in queue/', on: true },
        { when: 'on write', what: 'watch content/queue/ → lint → notify Telegram', on: true },
        { when: 'Sun 21:00', what: 'feedback-synth → voice.md delta', on: true },
        { when: 'day 7', what: 'meta-ads-eval flywheel → prediction-log.md', on: false },
    ];
    return (
        <Frame title="hooks">
            <div className="p-5 font-mono text-[11px] space-y-3">
                {hooks.map((h, i) => (
                    <motion.div key={h.what} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.1 }}
                        className="grid grid-cols-[92px_1fr_auto] gap-3 items-center">
                        <span className="text-hazard">{h.when}</span>
                        <span className={h.on ? 'text-paper' : 'text-steel'}>{h.what}</span>
                        <span className={`w-2 h-2 rounded-full ${h.on ? 'bg-emerald-400 animate-pulse' : 'bg-steel/40'}`} />
                    </motion.div>
                ))}
                <div className="pt-2 text-steel/70">you: read the log at 09:00. that's the job now.</div>
            </div>
        </Frame>
    );
};

const CtaCard: React.FC<{ headline?: string }> = ({ headline }) => (
    <Reveal className="w-full pt-16 pb-8 relative z-20">
        <div className="relative w-full bg-[#141416] border border-paper/10 rounded-sm overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-3 h-full bg-hazard" />
            <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col items-center justify-center text-center z-10">
                <Mono className="text-hazard mb-5">14 days · your folders · your voice</Mono>
                <h2 className="font-display text-5xl md:text-7xl text-paper mb-8">{headline}</h2>
                <p className="text-steel max-w-lg mb-8">Twenty minutes. Bring the folder your team works in. I'll show you what the harness does to it, and what day 14 looks like.</p>
                <a href="/calendar-page.html" onClick={() => trackBookClick('home_offer')} className="group inline-flex items-center bg-hazard text-charcoal pl-6 pr-3 py-3 rounded-sm font-mono text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-paper transition-colors">
                    Book the install call
                    <span className="ml-4 w-7 h-7 flex items-center justify-center group-hover:translate-x-0.5 transition-transform"><Icon name="ArrowRight" size={16} /></span>
                </a>
            </div>
        </div>
    </Reveal>
);

const OfferStack = () => (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mt-4">
        <Reveal delay={0.15}>
            <div className="border border-paper/10 rounded-sm overflow-hidden text-left">
                {OFFER_STACK.map((v) => (
                    <div key={v.name} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3.5 border-b border-paper/10">
                        <div>
                            <div className="text-paper text-[15px]">{v.name}</div>
                            <div className="text-steel text-[12px] mt-0.5">{v.detail}</div>
                        </div>
                        <div className="font-mono text-steel text-[13px] tabular-nums">{v.value}</div>
                    </div>
                ))}
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3.5 bg-hazard text-charcoal font-bold">
                    <span>Stacked value</span>
                    <span className="font-mono tabular-nums">{OFFER_STACK_TOTAL}</span>
                </div>
                {OFFER_PRICE && (
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-4 px-5 py-4 bg-paper/5">
                        <div>
                            <div className="text-paper">You pay</div>
                            <div className="text-steel text-[12px]">One-time install + monthly run. Cancel any month.</div>
                        </div>
                        <span className="font-mono text-paper font-bold tabular-nums whitespace-nowrap">{OFFER_PRICE}</span>
                    </div>
                )}
            </div>
        </Reveal>
        <Reveal delay={0.25}>
            <div className="border border-paper/10 rounded-sm text-left h-full flex flex-col">
                <div className="px-5 py-3 border-b border-paper/10"><Mono className="text-hazard">The guarantee, in three layers</Mono></div>
                {OFFER_GUARANTEE.map((g) => (
                    <div key={g.when} className="px-5 py-4 border-b border-paper/10 last:border-b-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel mb-1">{g.when}</div>
                        <div className="text-paper text-[14px] leading-snug">{g.what}</div>
                    </div>
                ))}
                <div className="px-5 py-4 mt-auto text-steel text-[12px]">Past day 14 the fee is non-refundable for a reason I'll say out loud: the system is on your machine. You can read it, fork it, export it. I don't take it back. I make it work.</div>
            </div>
        </Reveal>
    </div>
);

export const FeatureSection: React.FC<FeatureSectionProps> = ({ content, onInView }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    const isCta = content.type === 'cta';
    const isOffer = content.id === SectionId.OFFER;
    const isFinal = content.id === SectionId.FINAL;

    useEffect(() => { if (isInView) onInView(content.id); }, [isInView, content.id, onInView]);

    if (isCta) {
        return (
            <section id={content.id} ref={ref} className="min-h-[60vh] flex flex-col justify-center px-6 py-12 md:px-12 w-full max-w-5xl mx-auto relative z-10">
                <CtaCard headline={content.headline} />
            </section>
        );
    }

    if (isFinal) {
        return (
            <section id={content.id} ref={ref} className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-12 md:px-12 w-full">
                <Reveal className="w-full pt-12 flex flex-col items-center text-center">
                    <div className="relative mb-6 mx-auto">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse"></div>
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h3 className="font-display text-2xl text-paper mb-2">{content.headline}</h3>
                    <Mono className="text-emerald-400">System operational</Mono>
                    <a href="/" className="mt-8 text-steel hover:text-hazard transition-colors text-xs font-mono block">{content.micro}</a>
                </Reveal>
            </section>
        );
    }

    if (isOffer) {
        return (
            <section id={content.id} ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-20 md:px-12 w-full">
                <div className="w-full max-w-5xl mx-auto text-center">
                    <Reveal><Mono className="text-hazard block mb-4">{content.eyebrow}</Mono></Reveal>
                    <Reveal delay={0.05}><h2 className="font-display text-4xl md:text-6xl text-paper max-w-4xl mx-auto">{content.headline}</h2></Reveal>
                    {content.copy?.map((c, i) => (
                        <Reveal key={i} delay={0.1 + i * 0.05}><p className="text-steel text-lg mt-5 max-w-2xl mx-auto">{c}</p></Reveal>
                    ))}
                    <OfferStack />
                    {content.micro && <Reveal delay={0.3}><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mt-6">{content.micro}</p></Reveal>}
                </div>
            </section>
        );
    }

    const visual =
        content.id === SectionId.ROUTE ? <RouteVisual /> :
        content.id === SectionId.REMEMBER ? <RememberVisual /> :
        content.id === SectionId.DO ? <DoVisual /> :
        content.id === SectionId.RUN ? <RunVisual /> : null;

    return (
        <section id={content.id} ref={ref} className="min-h-screen flex flex-col justify-center px-6 py-16 md:px-12 lg:px-24 w-full">
            <div className="space-y-8 max-w-xl">
                {content.eyebrow && (
                    <Reveal><Mono className="text-hazard">{content.eyebrow}</Mono></Reveal>
                )}
                {content.headline && (
                    <Reveal delay={0.05}>
                        <h2 className="font-display text-4xl md:text-6xl text-paper">{content.headline}</h2>
                    </Reveal>
                )}
                {content.subheadline && (
                    <Reveal delay={0.1}>
                        <p className="text-lg md:text-xl text-steel leading-relaxed max-w-lg">{content.subheadline}</p>
                    </Reveal>
                )}
                {content.bullets && (
                    <ul className="space-y-3">
                        {content.bullets.map((b, i) => (
                            <Reveal key={b} delay={0.2 + i * 0.08}>
                                <li className="flex items-center gap-4 text-paper/90 group">
                                    <span className="w-1.5 h-1.5 bg-steel group-hover:bg-hazard transition-colors" />
                                    <span className="text-[16px]">{b}</span>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                )}
                {visual && <Reveal delay={0.25} className="w-full pt-4">{visual}</Reveal>}
                {content.micro && (
                    <Reveal delay={0.35}><Mono className="text-steel">{content.micro}</Mono></Reveal>
                )}
            </div>
        </section>
    );
};
