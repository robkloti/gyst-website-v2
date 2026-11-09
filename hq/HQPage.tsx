import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lockup } from '../components/ui/Lockup';
import { track, trackBookClick } from '../lib/track';
import { CHAT, DECISIONS, DEPTS, DeptId, HQ_ROOM } from './data';
import { BrainView, ClientsView, DeptView, OutboundView, WarRoomView } from './views';
import { Avatar, byId, Card, FeedItem } from './ui';

const STEP_MS = 3200;
const VIEWS = [
    ['war', 'War room'],
    ['outbound', 'Outbound'],
    ['clients', 'Clients'],
    ['brain', 'The Brain'],
] as const;
type ViewId = (typeof VIEWS)[number][0] | DeptId;
const isView = (v: string | null): v is ViewId => !!v && ([...VIEWS.map((x) => x[0]), ...DEPTS.map((d) => d.id)] as string[]).includes(v);

const HQPage: React.FC = () => {
    const [view, setView] = useState<ViewId>(() => {
        const v = new URLSearchParams(window.location.search).get('view');
        return isView(v) ? v : 'war';
    });
    const [step, setStep] = useState(-1);
    const [playing, setPlaying] = useState(true);
    const [extra, setExtra] = useState<FeedItem[]>([]);
    const [done, setDone] = useState<Set<string>>(new Set());
    const [chatOpen, setChatOpen] = useState(false);
    const [chat, setChat] = useState<[string, string][]>([]);
    const [draft, setDraft] = useState('');
    const [now, setNow] = useState(() => new Date());
    const chatEnd = useRef<HTMLDivElement>(null);
    const script = HQ_ROOM.script;

    useEffect(() => {
        document.title = 'GYST HQ | How GYST runs on agents';
        track('case_study_view', { case_study: 'hq' });
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
        const t = window.setInterval(() => setNow(new Date()), 15000);
        return () => window.clearInterval(t);
    }, []);

    useEffect(() => {
        if (!playing) return;
        const t = window.setTimeout(() => setStep((s) => (s + 1) % script.length), step < 0 ? 700 : STEP_MS);
        return () => window.clearTimeout(t);
    }, [playing, step, script.length]);

    useEffect(() => {
        chatEnd.current?.scrollIntoView({ block: 'end' });
    }, [chat]);

    useEffect(() => {
        if (!chatOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setChatOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [chatOpen]);

    const go = (v: ViewId) => {
        setView(v);
        const url = new URL(window.location.href);
        url.searchParams.set('view', v);
        window.history.replaceState(null, '', url);
        window.scrollTo({ top: 0 });
        track('room_switch', { room: `hq-${v}` });
    };

    const feed = useMemo(() => {
        const fromScript: FeedItem[] = step >= 0 ? script.slice(0, step + 1).reverse().map((s, i) => ({ ...s, key: `s${step - i}` })) : [];
        return [...extra, ...fromScript].slice(0, 8);
    }, [step, extra, script]);

    const seq = useRef(0);
    const log = (from: string, text: string) => setExtra((e) => [{ from, text, key: `x${++seq.current}` }, ...e].slice(0, 4));

    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id);
        if (!d || done.has(id)) return;
        setDone((s) => new Set(s).add(id));
        log('rob', `Approved: ${d.title}.`);
    };

    const ask = (q: string) => {
        const answer = CHAT[q] ?? 'In the real console I route that to the right agent and answer from the Brain. In this demo, try one of the questions below.';
        setChatOpen(true);
        setChat((c) => [...c, ['me', q], ['mc', answer]]);
        setDraft('');
        track('cyoa_step', { case_study: 'hq', step: q.slice(0, 40) });
    };

    const working = HQ_ROOM.agents.filter((a) => !a.human && a.status !== 'in-build').length;
    const pending = DECISIONS.filter((d) => !done.has(d.id));
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const dept = DEPTS.find((d) => d.id === view);

    return (
        <div className="min-h-screen bg-paper text-charcoal font-archivo">
            <header className="sticky top-0 z-50 bg-charcoal text-paper border-b border-paper/10">
                <div className="flex items-center gap-4 lg:gap-6 px-4 lg:px-6 h-14">
                    <div className="flex items-end gap-2 shrink-0">
                        <Lockup size={22} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel pb-px">HQ</span>
                    </div>
                    <nav className="flex-1 min-w-0 overflow-x-auto [scrollbar-width:none]" aria-label="HQ views">
                        <div className="flex items-center gap-1 w-max">
                            {VIEWS.map(([id, label]) => (
                                <button key={id} type="button" onClick={() => go(id)} aria-current={view === id ? 'page' : undefined} className={`px-3 h-14 text-[14px] border-b-2 ${view === id ? 'border-hazard text-paper' : 'border-transparent text-steel hover:text-paper'}`}>
                                    {label}
                                </button>
                            ))}
                            <span className="w-px h-5 bg-paper/15 mx-2" />
                            {DEPTS.map((d) => (
                                <button key={d.id} type="button" onClick={() => go(d.id)} aria-current={view === d.id ? 'page' : undefined} className={`flex items-center gap-2 px-3 h-14 text-[14px] border-b-2 ${view === d.id ? 'border-hazard text-paper' : 'border-transparent text-steel hover:text-paper'}`}>
                                    <i className="w-2 h-2 rounded-full" style={{ background: d.dot }} />
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </nav>
                    <span className="hidden xl:flex items-center gap-2 text-[13px] border border-paper/20 rounded-full px-3 py-1 shrink-0">
                        <i className={`w-2 h-2 rounded-full bg-hazard ${playing ? 'room-blink' : ''}`} />
                        {working} agents working
                    </span>
                    <span className="hidden xl:inline font-mono text-[11px] text-steel shrink-0">{time}</span>
                    <button type="button" onClick={() => setChatOpen(true)} className="hidden md:flex items-center gap-2 shrink-0 text-[13px] border border-paper/25 rounded-full pl-1 pr-3 py-1 hover:bg-paper/10">
                        <Avatar id="mission" size={22} /> Mission Control
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
                <main className="min-w-0 px-4 lg:px-6 py-6 lg:py-7">
                    {view === 'war' && <WarRoomView step={step} feed={feed} onBrief={() => ask('What needs me today?')} playing={playing} onTogglePlay={() => setPlaying((p) => !p)} pending={pending.length} onDept={go} />}
                    {view === 'outbound' && <OutboundView onLog={log} />}
                    {view === 'clients' && <ClientsView onLog={log} />}
                    {view === 'brain' && <BrainView onLog={log} />}
                    {dept && <DeptView key={dept.id} dept={dept} feed={feed} onLog={log} />}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/10 pt-5 text-[13px] text-steel-dark">
                        <span>Demo with sample activity. The agents, roles and rules are how GYST actually runs.</span>
                        <a href="/calendar-page.html" onClick={() => trackBookClick('hq_footer')} className="font-semibold text-charcoal underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal">
                            Want one of these for your business? Book a 30-minute call
                        </a>
                    </div>
                </main>

                <aside className="border-t lg:border-t-0 lg:border-l border-charcoal/10 bg-[#ECE9E2] lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] flex flex-col min-h-0">
                    <div className="p-4 border-b border-charcoal/10">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <Avatar id="mission" size={30} />
                                <div>
                                    <div className="font-semibold text-[15px] leading-tight">Mission Control asks</div>
                                    <div className="text-[12px] text-steel-dark">{pending.length ? `${pending.length} decision${pending.length > 1 ? 's' : ''} waiting on Rob` : 'Nothing waiting on Rob'}</div>
                                </div>
                            </div>
                            {pending.length > 1 && (
                                <button type="button" onClick={() => pending.forEach((d) => approve(d.id))} className="shrink-0 bg-charcoal text-paper text-[13px] font-semibold rounded-md px-3 py-1.5 hover:bg-black">
                                    Approve all {pending.length}
                                </button>
                            )}
                        </div>
                        <div className="mt-3 space-y-2">
                            <AnimatePresence initial={false}>
                                {pending.map((d, i) => (
                                    <motion.div key={d.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.2 }}>
                                        <Card className="p-3">
                                            {i === 0 && d.detail ? (
                                                <>
                                                    <div className="flex items-center gap-2 text-[12px] text-steel-dark"><Avatar id={d.agent} size={18} /> <b className="text-charcoal font-semibold">{byId[d.agent].name}</b> · {DEPTS.find((x) => x.zone === byId[d.agent].zone)?.label}</div>
                                                    <div className="font-semibold mt-1.5 leading-snug">{d.title}</div>
                                                    <p className="text-[13px] text-charcoal/70 mt-1 leading-snug">{d.detail}</p>
                                                    {d.impact && <div className="text-[12px] font-semibold mt-1.5">{d.impact}</div>}
                                                    <div className="flex gap-2 mt-2.5">
                                                        <button type="button" onClick={() => approve(d.id)} className="bg-charcoal text-paper text-[13px] font-semibold rounded-md px-3 py-1.5">Approve</button>
                                                        <button type="button" onClick={() => setDone((s) => new Set(s).add(d.id))} className="border border-charcoal/20 text-[13px] font-semibold rounded-md px-3 py-1.5 hover:bg-charcoal/5">Hold</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex items-center gap-2.5">
                                                    <Avatar id={d.agent} size={22} />
                                                    <div className="flex-1 text-[13.5px] font-semibold leading-snug">{d.title}</div>
                                                    <button type="button" onClick={() => approve(d.id)} className="shrink-0 border border-charcoal/20 text-[12.5px] font-semibold rounded-md px-2.5 py-1 hover:bg-charcoal/5">Approve</button>
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 pt-3 pb-1">
                        <div className="font-semibold text-[15px]">What the agents just did</div>
                        <button type="button" onClick={() => setPlaying((p) => !p)} className="flex items-center gap-1.5 text-[12px] font-semibold">
                            <i className={`w-1.5 h-1.5 rounded-full ${playing ? 'bg-hazard room-blink' : 'bg-steel'}`} /> {playing ? 'Live' : 'Paused'}
                        </button>
                    </div>
                    <ol className="flex-1 min-h-[200px] overflow-y-auto px-2 pb-2" aria-live="polite">
                        {feed.length === 0 && <li className="px-2 py-3 text-[13px] text-steel-dark">The office is starting up.</li>}
                        {feed.map((f, i) => (
                            <li key={f.key} className={`flex gap-2.5 px-2 py-2.5 rounded-md ${i === 0 ? 'bg-white/70' : ''}`}>
                                <Avatar id={f.from} size={24} />
                                <div className="min-w-0">
                                    <div className={`text-[13.5px] leading-snug ${i === 0 ? '' : 'text-charcoal/70'}`}>{f.text}</div>
                                    <div className="text-[11.5px] text-steel-dark mt-0.5">
                                        {byId[f.from].name}
                                        {f.to ? ` to ${byId[f.to].name}` : ''}, {i === 0 ? 'just now' : `${i * 2} min ago`}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <form
                        className="p-3 border-t border-charcoal/10"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (draft.trim()) ask(draft.trim());
                        }}
                    >
                        <div className="flex items-center gap-2 bg-white border border-charcoal/15 rounded-full pl-1.5 pr-1.5 py-1.5">
                            <Avatar id="mission" size={24} />
                            <input value={draft} onChange={(e) => setDraft(e.target.value)} onFocus={() => setChatOpen(true)} placeholder="Ask Mission Control anything" className="flex-1 min-w-0 bg-transparent text-[14px] outline-none placeholder:text-steel-dark" />
                            <button type="submit" aria-label="Send" className="w-7 h-7 rounded-full bg-charcoal text-paper text-[14px] leading-none">&uarr;</button>
                        </div>
                    </form>
                </aside>
            </div>

            <AnimatePresence>
                {chatOpen && (
                    <motion.div className="fixed inset-0 z-[200] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button type="button" aria-label="Close" className="absolute inset-0 bg-black/30" onClick={() => setChatOpen(false)} />
                        <motion.aside role="dialog" aria-modal="true" aria-label="Mission Control" initial={{ x: 40 }} animate={{ x: 0 }} exit={{ x: 40 }} transition={{ duration: 0.2 }} className="relative w-full max-w-[440px] h-full bg-paper border-l border-charcoal/15 flex flex-col">
                            <div className="flex items-center justify-between gap-3 p-4 border-b border-charcoal/10">
                                <div className="flex items-center gap-3">
                                    <Avatar id="mission" size={38} />
                                    <div>
                                        <div className="font-semibold text-[18px] leading-tight">Mission Control</div>
                                        <div className="text-[12.5px] text-steel-dark">Routes your question to the right agent</div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setChatOpen(false)} className="font-mono text-[10px] uppercase tracking-[0.16em] border border-charcoal/25 px-3 py-1.5 hover:bg-charcoal/5">Close</button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                <div className="flex gap-2.5"><Avatar id="mission" size={26} /><div className="bg-white border border-charcoal/10 rounded-lg px-3.5 py-2.5 text-[14px] leading-relaxed max-w-[85%]">Morning, Rob. {pending.length ? `${pending.length} decision${pending.length > 1 ? 's are' : ' is'} waiting on the right.` : 'Nothing is waiting on you.'} What do you want to know?</div></div>
                                {chat.map(([who, text], i) =>
                                    who === 'me' ? (
                                        <div key={i} className="flex justify-end"><div className="bg-charcoal text-paper rounded-lg px-3.5 py-2.5 text-[14px] max-w-[85%]">{text}</div></div>
                                    ) : (
                                        <div key={i} className="flex gap-2.5"><Avatar id="mission" size={26} /><div className="bg-white border border-charcoal/10 rounded-lg px-3.5 py-2.5 text-[14px] leading-relaxed max-w-[85%]">{text}</div></div>
                                    ),
                                )}
                                <div ref={chatEnd} />
                            </div>
                            <div className="p-3 border-t border-charcoal/10">
                                <div className="flex flex-wrap gap-2 mb-2.5">
                                    {Object.keys(CHAT).map((q) => (
                                        <button key={q} type="button" onClick={() => ask(q)} className="text-[13px] border border-charcoal/20 bg-white rounded-full px-3 py-1 hover:border-charcoal/50">{q}</button>
                                    ))}
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); if (draft.trim()) ask(draft.trim()); }} className="flex items-center gap-2 bg-white border border-charcoal/15 rounded-full pl-4 pr-1.5 py-1.5">
                                    <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask about leads, clients, content or cost" className="flex-1 min-w-0 bg-transparent text-[14px] outline-none placeholder:text-steel-dark" />
                                    <button type="submit" aria-label="Send" className="w-7 h-7 rounded-full bg-charcoal text-paper text-[14px] leading-none">&uarr;</button>
                                </form>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HQPage;
