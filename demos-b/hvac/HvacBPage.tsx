import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, Info, Pause, Play, X } from 'lucide-react';
import { CALLS, DECISIONS, FEED, JOBS, Job, JobStatus, QUOTES, TRUCKS } from '../../demos/hvac/data';
import { Count, GystCredit, Sheet, ToastHost, clockLabel, money, useDemoHead, useLiveFeed, useNarrow, useToast, withApprovals } from '../kit';
import { CSS } from './styles';

const FONTS = 'family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=Azeret+Mono:wght@400;500;600';
const START = 10 * 60 + 31;
const DAY_START = 7;
const DAY_HOURS = 10;

const TONE: Record<JobStatus, { label: string; color: string; tileColor: string }> = {
    done: { label: 'Done', color: 'var(--neutral)', tileColor: 'oklch(.62 .02 245)' },
    onsite: { label: 'On site', color: 'var(--good)', tileColor: 'oklch(.5 .13 155)' },
    enroute: { label: 'En route', color: 'var(--signal)', tileColor: 'oklch(.5 .12 240)' },
    scheduled: { label: 'Scheduled', color: 'var(--text-2)', tileColor: 'oklch(.2 .025 245)' },
};
const ORDER: JobStatus[] = ['done', 'onsite', 'enroute', 'scheduled'];
type Filter = 'all' | JobStatus;
type QuoteTone = 'all' | 'warm' | 'cold' | 'won';

// "1:00 - 3:00" on a 7 to 5 day: anything before 7 is afternoon.
const hour = (s: string) => {
    const [h, m] = s.split(':').map(Number);
    return (h < DAY_START ? h + 12 : h) + m / 60;
};
const span = (win: string) => {
    const [a, b] = win.split(' - ').map(hour);
    return { l: ((a - DAY_START) / DAY_HOURS) * 100, w: ((b - a) / DAY_HOURS) * 100 };
};

// Map label: surname for people, first word for a household or a business.
const pinName = (cust: string) => {
    const w = cust.split(' ');
    return w.length === 2 && w[1] !== 'residence' ? w[1] : w[0];
};

// Status is carried by shape as well as colour: check, square, chevron, ring.
const Glyph: React.FC<{ s: JobStatus | 'shop'; color?: string }> = ({ s, color }) => {
    const c = color ?? (s === 'shop' ? 'var(--accent)' : TONE[s].color);
    return (
        <svg className="cj-glyph" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            {s === 'done' && <path d="M1.5 5.2 4 7.6 8.5 2.4" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
            {s === 'onsite' && <rect x="1.5" y="1.5" width="7" height="7" rx="1" fill={c} />}
            {s === 'enroute' && <path d="M2 1.5 8 5 2 8.5Z" fill={c} />}
            {s === 'scheduled' && <circle cx="5" cy="5" r="3.2" fill="none" stroke={c} strokeWidth="1.4" />}
            {s === 'shop' && <path d="M1.5 8.5v-4L5 1.5l3.5 3v4Z" fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />}
        </svg>
    );
};

const Mark = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <rect x=".5" y=".5" width="29" height="29" rx="5" fill="none" stroke="var(--line-2)" />
        <path d="M8 23V14a7 7 0 0 1 7-7h8" fill="none" stroke="var(--accent)" strokeWidth="4.5" />
        <path d="M5.5 23h5M23 4.5v5" stroke="var(--text-1)" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const HvacBPage: React.FC = () => {
    useDemoHead('hvac-b', 'Copperjack Heating & Air - Dispatch', FONTS, 'oklch(.165 .022 245)');
    const narrow = useNarrow();
    const feed = useLiveFeed(FEED, START, 6);
    const { toast, show, clear } = useToast();

    const [approved, setApproved] = useState<Record<string, string>>({});
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const [view, setView] = useState<'board' | 'map'>('board');
    const [filter, setFilter] = useState<Filter>('all');
    const [qTone, setQTone] = useState<QuoteTone>('all');
    const [openId, setOpenId] = useState<string | null>(null);

    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id)!;
        setApproved((a) => ({ ...a, [id]: clockLabel(feed.now) }));
        setAnchors((a) => ({ ...a, [id]: feed.items[0].key }));
        show(d.done, () => setApproved(({ [id]: _, ...rest }) => rest));
    };
    const closeSheet = useCallback(() => setOpenId(null), []);

    const waiting = DECISIONS.filter((d) => !approved[d.id]).length;
    const sums = useMemo(() => {
        const by = { done: 0, onsite: 0, enroute: 0, scheduled: 0 } as Record<JobStatus, number>;
        JOBS.forEach((j) => (by[j.status] += j.value));
        return by;
    }, []);
    const booked = JOBS.reduce((s, j) => s + j.value, 0);
    const callsBooked = CALLS.filter((c) => c.tone === 'booked');
    const nightValue = JOBS.filter((j) => callsBooked.some((c) => c.who === j.cust)).reduce((s, j) => s + j.value, 0);

    const quotes = useMemo(
        () => [
            ...(approved.d2
                ? [{ id: 'Q-NEW', cust: 'Okafor residence', job: 'Heat pump, three options', amount: 7840, age: 0, touch: `Email 1, ${approved.d2}`, state: 'Sent. Waiting on a reply', tone: 'cold' as const, fresh: true }]
                : []),
            ...QUOTES.map((q) => ({ ...q, fresh: false })),
        ],
        [approved.d2]
    );
    const openQuotes = quotes.filter((q) => q.tone !== 'won');
    const pipeline = openQuotes.reduce((s, q) => s + q.amount, 0);
    const shownQuotes = quotes.filter((q) => qTone === 'all' || q.tone === qTone);

    const feedItems = withApprovals(
        feed.items,
        DECISIONS.filter((d) => approved[d.id]).map((d) => ({ id: d.id, who: `Ray + ${d.agent}`, text: d.done, time: approved[d.id], after: anchors[d.id] }))
    );

    const job = JOBS.find((j) => j.id === openId) ?? null;
    const jobLog = (j: Job): [string, string][] => [
        ...j.log,
        ...(j.id === 'J-4827' && approved.d1 ? [[approved.d1, 'Ray approved the noon start. Customer texted.'] as [string, string]] : []),
        ...(j.id === 'J-4824' && approved.d2 ? [[approved.d2, 'Ray approved the quote. Sent by email with three options.'] as [string, string]] : []),
    ];

    const jobBar = (j: Job, flow = false) => {
        const { l, w } = span(j.win);
        const go = j.id === 'J-4827' && approved.d1;
        return (
            <button
                key={j.id}
                type="button"
                className={`cj-job ${j.status} ${filter !== 'all' && filter !== j.status ? 'dim' : ''} ${go ? 'go' : ''}`}
                style={{ '--l': l, '--w': w, '--tone': TONE[j.status].color } as React.CSSProperties}
                aria-current={openId === j.id}
                aria-label={`${j.cust}, ${j.type}, ${j.win}, ${TONE[j.status].label}, ${money(j.value)}`}
                onClick={() => setOpenId(j.id)}
            >
                <b>
                    <Glyph s={j.status} />
                    <span>{j.cust}</span>
                </b>
                <small>{flow ? `${j.win} · ${j.type}` : j.type}</small>
                <span>{money(j.value)}</span>
            </button>
        );
    };

    const truckHead = (n: number) => {
        const t = TRUCKS.find((x) => x.n === n)!;
        return (
            <div className="cj-truck">
                <div className="cj-truck-top">
                    <Glyph s={t.tone} />
                    <b>T{t.n}</b>
                    <span>{t.tech}</span>
                </div>
                <small>
                    {t.state}. {t.next}.
                </small>
            </div>
        );
    };

    return (
        <div className="cj">
            <style>{CSS}</style>
            <div className="cj-wrap">
                <header className="cj-top">
                    <div className="cj-brand">
                        <Mark />
                        <b>Copperjack</b>
                        <span>Heating &amp; Air</span>
                    </div>
                    <div className="cj-top-right">
                        <span className="cj-demo">Demo. Sample data.</span>
                        <div className="cj-clock" aria-label={`Wednesday, ${clockLabel(feed.now)}`}>
                            <span>Wed</span>
                            <b>{clockLabel(feed.now)}</b>
                        </div>
                    </div>
                </header>

                <div className="cj-hello cj-in">
                    <h1>
                        Morning, Ray. <em>{waiting === 0 ? 'All clear.' : `${waiting} need${waiting === 1 ? 's' : ''} you.`}</em>
                    </h1>
                    <p>Ten jobs on the board, five trucks rolling, and the front desk took six calls while the shop was dark.</p>
                </div>

                <section className="cj-panel cj-mc cj-in" style={{ '--i': 1 } as React.CSSProperties} aria-labelledby="cj-mc-h">
                    <div className="cj-head">
                        <h2 id="cj-mc-h">Mission control</h2>
                        <span className={`cj-count ${waiting === 0 ? 'zero' : ''}`} aria-label={`${waiting} decisions waiting`}>
                            {waiting}
                        </span>
                        <div className="cj-meta">
                            {waiting === 0 ? <span className="cj-clear">All clear. Nothing needs you right now.</span> : <span className="cj-label">Your crew drafted these. One tap each.</span>}
                        </div>
                    </div>
                    <div className="cj-mc-grid">
                        {DECISIONS.map((d) => {
                            const ok = approved[d.id];
                            return (
                                <article key={d.id} className={`cj-dec ${ok ? 'done' : ''}`}>
                                    <div className="cj-dec-agent">
                                        <i className="cj-sev" />
                                        <span className="cj-label">{d.agent}</span>
                                    </div>
                                    <h3>{d.title}</h3>
                                    {ok ? (
                                        <p className="cj-dec-ok">
                                            <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                                            <span>
                                                {d.done} Approved {ok}.
                                            </span>
                                        </p>
                                    ) : (
                                        <>
                                            <p>{d.why}</p>
                                            <div className="cj-dec-foot">
                                                <button type="button" className="cj-btn primary" onClick={() => approve(d.id)}>
                                                    <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                                                    Approve
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="cj-kpis" aria-label="Today at a glance">
                    <div className="cj-lead cj-in" style={{ '--i': 2 } as React.CSSProperties}>
                        <span className="cj-label">Booked revenue today</span>
                        <div className="cj-val">
                            {money(booked)}
                            <small>10 jobs, 5 trucks</small>
                        </div>
                        <div className="cj-split" aria-hidden="true">
                            {ORDER.map((s) => (
                                <span key={s} style={{ flex: sums[s], background: TONE[s].tileColor, opacity: filter === 'all' || filter === s ? 1 : 0.25 }} />
                            ))}
                        </div>
                        <div className="cj-legend">
                            {ORDER.map((s) => (
                                <button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(filter === s ? 'all' : s)} title={`Show ${TONE[s].label.toLowerCase()} jobs on the board`}>
                                    <span>
                                        <Glyph s={s} color={TONE[s].tileColor} />
                                        {TONE[s].label}
                                    </span>
                                    <b>{money(sums[s])}</b>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="cj-panel cj-tile cj-in" style={{ '--i': 3 } as React.CSSProperties}>
                        <span className="cj-label">Front desk overnight</span>
                        <div className="cj-val">
                            {CALLS.length}
                            <small>calls answered</small>
                        </div>
                        <p className="cj-sub">
                            <b>{callsBooked.length} booked</b> worth <b className="cj-num">{money(nightValue)}</b>. One gas smell sent to the on-call tech.
                        </p>
                    </div>
                    <div className="cj-panel cj-tile cj-in" style={{ '--i': 4 } as React.CSSProperties}>
                        <span className="cj-label">Old quotes being chased</span>
                        <div className="cj-val">
                            <Count value={pipeline} />
                        </div>
                        <p className="cj-sub">
                            <b>{openQuotes.length} open.</b> Two replied this week. Sandoval said yes: <b className="cj-num">{money(4150)}</b> won.
                        </p>
                    </div>
                    <div className="cj-panel cj-tile cj-in" style={{ '--i': 5 } as React.CSSProperties}>
                        <span className="cj-label">Trucks</span>
                        <div className="cj-val">
                            {TRUCKS.length}
                            <small>trucks staffed</small>
                        </div>
                        <p className="cj-sub">
                            <b>2 on site</b>, <b>2 en route</b>, 1 loading at the shop. Closed so far: <b className="cj-num">{money(sums.done)}</b>.
                        </p>
                    </div>
                </section>

                <div className="cj-main">
                    <section className="cj-panel cj-in" style={{ '--i': 6 } as React.CSSProperties} aria-labelledby="cj-board-h">
                        <div className="cj-head">
                            <h2 id="cj-board-h">Today&rsquo;s jobs</h2>
                            <div className="cj-seg" role="tablist" aria-label="Board or map">
                                <button type="button" role="tab" aria-selected={view === 'board'} onClick={() => setView('board')}>
                                    Board
                                </button>
                                <button type="button" role="tab" aria-selected={view === 'map'} onClick={() => setView('map')}>
                                    Map
                                </button>
                            </div>
                            <div className="cj-meta">
                                <div className="cj-seg" role="group" aria-label="Filter jobs by status">
                                    <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
                                        All <i>{JOBS.length}</i>
                                    </button>
                                    {ORDER.map((s) => (
                                        <button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(s)}>
                                            <Glyph s={s} />
                                            {TONE[s].label} <i>{JOBS.filter((j) => j.status === s).length}</i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {view === 'board' && !narrow && (
                            <div className="cj-board" role="tabpanel">
                                <div className="cj-axis" aria-hidden="true">
                                    <div />
                                    <div>
                                        {Array.from({ length: DAY_HOURS + 1 }, (_, i) => {
                                            const h = DAY_START + i;
                                            return (
                                                <span key={h} style={{ left: `${(i / DAY_HOURS) * 100}%` }}>
                                                    {h === 12 ? '12p' : h > 12 ? h - 12 : h === DAY_START ? `${h}a` : h}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="cj-lanes">
                                    <div className="cj-now" style={{ '--p': (feed.now / 60 - DAY_START) / DAY_HOURS } as React.CSSProperties} aria-hidden="true">
                                        <span>{clockLabel(feed.now, false)}</span>
                                    </div>
                                    {TRUCKS.map((t) => (
                                        <div className="cj-lane" key={t.n}>
                                            {truckHead(t.n)}
                                            <div className="cj-track">
                                                {JOBS.filter((j) => j.truck === t.n).map((j) => jobBar(j))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {view === 'board' && narrow && (
                            <div className="cj-jlist" role="tabpanel">
                                {TRUCKS.map((t) => {
                                    const mine = JOBS.filter((j) => j.truck === t.n && (filter === 'all' || j.status === filter));
                                    if (!mine.length) return null;
                                    return (
                                        <div className="cj-jgroup" key={t.n}>
                                            {truckHead(t.n)}
                                            {mine.map((j) => jobBar(j, true))}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {view === 'map' && (
                            <div className="cj-map" role="tabpanel">
                                <svg viewBox="0 0 780 420" role="group" aria-label="Service area map with job sites and trucks">
                                    <defs>
                                        <pattern id="cj-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M20 0H0V20" fill="none" stroke="oklch(1 0 0/.04)" />
                                        </pattern>
                                        <pattern id="cj-grid-lg" width="100" height="100" patternUnits="userSpaceOnUse">
                                            <path d="M100 0H0V100" fill="none" stroke="oklch(1 0 0/.07)" />
                                        </pattern>
                                    </defs>
                                    <rect width="780" height="420" fill="url(#cj-grid)" />
                                    <rect width="780" height="420" fill="url(#cj-grid-lg)" />
                                    <g fill="none" stroke="oklch(.4 .03 245)" strokeLinecap="round">
                                        <path d="M0 232C140 214 250 228 372 250S620 262 780 236" strokeWidth="7" />
                                        <path d="M452 0C440 96 462 180 455 250S430 350 438 420" strokeWidth="5" />
                                        <path d="M60 60C150 120 210 150 300 186S400 150 404 148" strokeWidth="2.5" />
                                        <path d="M455 250C520 200 590 150 720 96" strokeWidth="2.5" />
                                        <path d="M232 262C300 320 380 350 508 286S640 300 740 340" strokeWidth="2.5" />
                                    </g>
                                    <text x="78" y="62">CEDAR FORK</text>
                                    <text x="188" y="306">WESTGATE</text>
                                    <text x="360" y="118">OLD TOWN</text>
                                    <text x="560" y="70">HARLAN PARK</text>
                                    <text x="520" y="376">MILLBROOK</text>
                                    <text x="470" y="272" style={{ fill: 'var(--accent)' }}>
                                        SHOP
                                    </text>
                                    <g fill="none" stroke="var(--signal)" strokeWidth="1.5">
                                        <path className={feed.running ? 'cj-route' : ''} strokeDasharray="5 6" d="M176 138 96 176" />
                                        <path className={feed.running ? 'cj-route' : ''} strokeDasharray="5 6" d="M372 276 420 342" />
                                    </g>
                                    {JOBS.map((j) => (
                                        <g
                                            key={j.id}
                                            className={`cj-pin ${filter !== 'all' && filter !== j.status ? 'dim' : ''}`}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${j.cust}, ${j.area}, ${TONE[j.status].label}`}
                                            onClick={() => setOpenId(j.id)}
                                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpenId(j.id))}
                                        >
                                            <circle className="ring" cx={j.x} cy={j.y} r="18" fill="transparent" stroke="transparent" />
                                            <circle cx={j.x} cy={j.y} r="8" fill="oklch(.185 .03 245)" stroke={TONE[j.status].color} strokeWidth="1.5" strokeDasharray={j.status === 'done' ? '2 2.5' : undefined} />
                                            <g transform={`translate(${j.x - 5} ${j.y - 5})`}>
                                                <Glyph s={j.status} />
                                            </g>
                                            <text x={j.x > 640 ? j.x - 13 : j.x + 13} y={j.y + 4} textAnchor={j.x > 640 ? 'end' : 'start'} style={{ fill: 'var(--text-2)', letterSpacing: '.02em', fontSize: 10.5 }}>
                                                {pinName(j.cust)}
                                            </text>
                                        </g>
                                    ))}
                                    {TRUCKS.map((t) => (
                                        <g key={t.n} transform={`translate(${t.x - 3} ${t.y - 26})`}>
                                            <rect width="26" height="18" rx="4" fill="var(--accent)" />
                                            <text x="13" y="13" textAnchor="middle" style={{ fill: 'var(--accent-ink)', fontWeight: 600, fontSize: 10.5, letterSpacing: 0 }}>
                                                T{t.n}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                                <div className="cj-map-key">
                                    {ORDER.map((s) => (
                                        <span key={s}>
                                            <Glyph s={s} />
                                            {TONE[s].label}
                                        </span>
                                    ))}
                                    <span>
                                        <svg width="18" height="12" aria-hidden="true">
                                            <rect width="18" height="12" rx="3" fill="var(--accent)" />
                                        </svg>
                                        Truck
                                    </span>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="cj-panel cj-feed cj-in" style={{ '--i': 7 } as React.CSSProperties} aria-labelledby="cj-feed-h">
                        <div className="cj-head">
                            <h2 id="cj-feed-h">Crew log</h2>
                            <div className="cj-meta">
                                <span className="cj-fresh">
                                    <i className={`cj-dot ${feed.running ? 'run' : ''}`} />
                                    {feed.running ? 'Live' : feed.paused ? 'Paused' : 'As of ' + clockLabel(feed.now)}
                                </span>
                                <button type="button" className="cj-icon" aria-label={feed.paused ? 'Resume the log' : 'Pause the log'} onClick={() => feed.setPaused(!feed.paused)}>
                                    {feed.paused ? <Play size={15} /> : <Pause size={15} />}
                                </button>
                            </div>
                        </div>
                        <ol role="log" aria-live="polite" aria-label="Agent activity">
                            <AnimatePresence initial={false}>
                                {feedItems.slice(0, 9).map((f) => (
                                    <motion.li key={f.key} layout className={f.you ? 'you' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                                        <div>
                                            <b>{f.who}</b>
                                            <time>{f.time}</time>
                                        </div>
                                        <p>{f.text}</p>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ol>
                    </section>
                </div>

                <div className="cj-lower">
                    <section className="cj-panel cj-in" style={{ '--i': 8 } as React.CSSProperties} aria-labelledby="cj-calls-h">
                        <div className="cj-head">
                            <h2 id="cj-calls-h">Overnight calls</h2>
                            <div className="cj-meta">
                                <span className="cj-label">11:38 PM to 6:40 AM</span>
                            </div>
                        </div>
                        <ul className="cj-calls">
                            {CALLS.map((c) => (
                                <li key={c.time} className={`cj-call ${c.tone}`}>
                                    <time>{c.time}</time>
                                    <h3>
                                        {c.who} <span>- {c.why}</span>
                                    </h3>
                                    <p>
                                        {c.tone === 'booked' && <Check size={14} strokeWidth={2.4} aria-hidden="true" />}
                                        {c.tone === 'urgent' && <AlertTriangle size={14} aria-hidden="true" />}
                                        {c.tone === 'info' && <Info size={14} aria-hidden="true" />}
                                        <span>
                                            {c.tone === 'urgent' ? 'Emergency. ' : ''}
                                            {c.outcome}
                                        </span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="cj-panel cj-in" style={{ '--i': 9 } as React.CSSProperties} aria-labelledby="cj-q-h">
                        <div className="cj-head">
                            <h2 id="cj-q-h">Quote chaser</h2>
                            <div className="cj-meta">
                                <div className="cj-seg" role="group" aria-label="Filter quotes">
                                    {(['all', 'warm', 'cold', 'won'] as QuoteTone[]).map((t) => (
                                        <button key={t} type="button" aria-pressed={qTone === t} onClick={() => setQTone(t)}>
                                            {t === 'all' ? 'All' : t === 'warm' ? 'Replied' : t === 'cold' ? 'Quiet' : 'Won'} <i>{quotes.filter((q) => t === 'all' || q.tone === t).length}</i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="cj-quotes">
                            {approved.d3 && (
                                <div className="cj-qnote">
                                    <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                                    $129 tune-up offer queued for 46 customers at 4:00 PM.
                                </div>
                            )}
                            <div className="cj-qrow cj-qhead cj-label" aria-hidden="true">
                                <span>Customer</span>
                                <span style={{ textAlign: 'right' }}>Amount</span>
                                <span>Age</span>
                                <span>Where it stands</span>
                            </div>
                            {shownQuotes.map((q) => (
                                <div key={q.id} className={`cj-qrow ${q.tone} ${q.fresh ? 'new' : ''}`}>
                                    <div style={{ minWidth: 0 }}>
                                        <h3>{q.cust}</h3>
                                        <small>{q.job}</small>
                                    </div>
                                    <span className="cj-qamt">{money(q.amount)}</span>
                                    <span className="cj-qage">
                                        {q.age === 0 ? 'Today' : `${q.age} days`}
                                        <i style={{ '--a': Math.min(100, (q.age / 44) * 100) } as React.CSSProperties} />
                                    </span>
                                    <div className="cj-qstate">
                                        <Glyph s={q.tone === 'won' ? 'done' : q.tone === 'warm' ? 'enroute' : 'scheduled'} color="currentColor" />
                                        <span>
                                            {q.state}
                                            <small>{q.touch}</small>
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {shownQuotes.length === 0 && <p className="cj-empty">No quotes in this group right now.</p>}
                        </div>
                    </section>
                </div>

                <footer className="cj-foot">
                    <span>Copperjack Heating &amp; Air. Demo. Sample data, fictional customers.</span>
                    <GystCredit slug="hvac-b" className="cj-credit" />
                </footer>
            </div>

            <Sheet open={!!job} onClose={closeSheet} label={job ? `Job ${job.id}` : 'Job'} className="cj-sheet" scrimClassName="cj-scrim">
                {job && (
                    <>
                        <div className="cj-sheet-head">
                            <span className="cj-label">{job.id}</span>
                            <span className="cj-status" style={{ '--tone': TONE[job.status].color } as React.CSSProperties}>
                                <Glyph s={job.status} />
                                {TONE[job.status].label}
                            </span>
                            <button type="button" className="cj-icon" aria-label="Close job" onClick={closeSheet}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="cj-sheet-body">
                            <h2>{job.cust}</h2>
                            <p className="cj-sheet-type">{job.type}</p>
                            <dl className="cj-facts">
                                <div>
                                    <dt>Window</dt>
                                    <dd className="cj-num">{job.win}</dd>
                                </div>
                                <div>
                                    <dt>Ticket</dt>
                                    <dd className="cj-num">{money(job.value)}</dd>
                                </div>
                                <div>
                                    <dt>Address</dt>
                                    <dd>
                                        {job.addr}, {job.area}
                                    </dd>
                                </div>
                                <div>
                                    <dt>Truck {job.truck}</dt>
                                    <dd>{TRUCKS.find((t) => t.n === job.truck)!.tech}</dd>
                                </div>
                            </dl>
                            <span className="cj-label">What the shop knows</span>
                            <p className="cj-brain">{job.brain}</p>
                            <span className="cj-label">How it got here</span>
                            <ol className="cj-log" style={{ marginTop: 14 }}>
                                {jobLog(job).map(([t, text]) => (
                                    <li key={t + text}>
                                        <time>{t}</time>
                                        <p>{text}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </>
                )}
            </Sheet>
            <ToastHost toast={toast} clear={clear} className="cj-toast" />
        </div>
    );
};

export default HvacBPage;
