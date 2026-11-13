import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Circle, Pause, Play, Star, X } from 'lucide-react';
import { APPTS, Appt, ApptStatus, DECISIONS, FEED, LAPSED, PROVIDERS, REBOOK, REVENUE, REVIEWS, STATUS } from '../../demos/medspa/data';
import { Count, GystCredit, Sheet, ToastHost, clockLabel, money, useDemoHead, useLiveFeed, useNarrow, useToast, withApprovals } from '../kit';
import { CSS } from './styles';

const FONTS = 'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Figtree:wght@400;500;600';
const START = 11 * 60 + 20;
const OPEN_HOUR = 9;
const HOURS = 8;
type Care = 'rebook' | 'lapsed' | 'reviews';

const at = (h: number) => clockLabel(Math.round(h * 60), false);
const first = (name: string) => name.replace('Dr. ', '').split(' ')[0];

const Mark = () => (
    <svg width="26" height="32" viewBox="0 0 26 32" aria-hidden="true" fill="none" stroke="var(--brass-light)" strokeWidth="1.2">
        <path d="M1 31V13a12 12 0 0 1 24 0v18Z" />
        <path d="M13 1v30M1 16h24M5.5 31V13a7.5 7.5 0 0 1 15 0v18" opacity=".6" />
    </svg>
);

const StatusGlyph: React.FC<{ s: ApptStatus; live: boolean }> = ({ s, live }) => {
    if (s === 'done') return <Check size={12} strokeWidth={2.2} aria-hidden="true" />;
    if (s === 'in') return <i className={`oh-dot ${live ? 'run' : ''}`} style={{ background: 'var(--good)' }} />;
    if (s === 'arrived') return <Circle size={9} strokeWidth={2.6} aria-hidden="true" />;
    return null;
};

const MedspaBPage: React.FC = () => {
    useDemoHead('medspa-b', 'Oriel House Aesthetics - Day book', FONTS, 'oklch(.965 .012 75)');
    const narrow = useNarrow();
    const feed = useLiveFeed(FEED, START, 5, 5600);
    const { toast, show, clear } = useToast();

    const [approved, setApproved] = useState<Record<string, string>>({});
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const [prov, setProv] = useState<number | 'all'>('all');
    const [care, setCare] = useState<Care>('rebook');
    const [openId, setOpenId] = useState<string | null>(null);

    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id)!;
        setApproved((a) => ({ ...a, [id]: clockLabel(feed.now) }));
        setAnchors((a) => ({ ...a, [id]: feed.items[0].key }));
        show(d.done, () => setApproved(({ [id]: _, ...rest }) => rest));
    };
    const closeSheet = useCallback(() => setOpenId(null), []);

    // Approving the waitlist offer fills Jade's 2:30 opening.
    const appts: Appt[] = APPTS.map((a) =>
        a.id === 'b4' && approved.w
            ? { ...a, client: 'Nora Albright', tx: 'Hydrating facial', price: 195, status: 'confirmed', pref: 'From the waitlist. Asked for an afternoon facial this week.', plan: `Took the 2:30 opening at ${approved.w}. Confirmation text sent.` }
            : a
    );
    const visits = appts.filter((a) => a.status !== 'open');
    const booked = visits.reduce((s, a) => s + a.price, 0);
    const inRoom = visits.filter((a) => a.status === 'in').length;
    const week = REVENUE.reduce((s, r) => s + r.amount, 0);
    const rebooked = REBOOK.filter((r) => r.ok).length;
    const waiting = DECISIONS.filter((d) => !approved[d.id]).length;
    const cols = prov === 'all' ? PROVIDERS.map((_, i) => i) : [prov];
    const appt = appts.find((a) => a.id === openId) ?? null;

    const feedItems = withApprovals(
        feed.items,
        DECISIONS.filter((d) => approved[d.id]).map((d) => ({ id: d.id, who: `Camille + ${d.agent}`, text: d.done, time: approved[d.id], after: anchors[d.id] }))
    );

    const label = (a: Appt) => `${a.client}, ${a.tx}, ${at(a.start)} with ${PROVIDERS[a.p].name}, ${STATUS[a.status]}`;
    const tone = (a: Appt) => ({ '--soft': PROVIDERS[a.p].soft, '--ink': PROVIDERS[a.p].ink }) as React.CSSProperties;

    return (
        <div className="oh">
            <style>{CSS}</style>

            <div className="oh-band">
                <div className="oh-wrap">
                    <header className="oh-top">
                        <div className="oh-brand">
                            <Mark />
                            <b>Oriel House</b>
                            <span>Aesthetics</span>
                        </div>
                        <div className="oh-top-right">
                            <span className="oh-demo">Demo. Sample data.</span>
                            <div className="oh-clock">
                                Friday 13 November
                                <b>{clockLabel(feed.now)}</b>
                            </div>
                        </div>
                    </header>
                    <div className="oh-hello oh-in">
                        <div>
                            <h1>
                                Good morning, Camille. <em>{waiting === 0 ? 'Nothing is waiting on you.' : `${waiting === 3 ? 'Three things are' : waiting === 2 ? 'Two things are' : 'One thing is'} waiting on your yes.`}</em>
                            </h1>
                            <p>
                                {visits.length} visits across three providers, {inRoom} in treatment right now{approved.w ? ', and the 2:30 is filled.' : ', and one opening at 2:30.'}
                            </p>
                        </div>
                    </div>
                    <div className="oh-kpis oh-in" style={{ '--i': 1 } as React.CSSProperties}>
                        <div className="oh-kpi">
                            <span className="oh-label">On the book today</span>
                            <div className="oh-kpi-val">
                                <Count value={booked} />
                            </div>
                            <p>{visits.length} visits. Elena, Jade and Noor are all in.</p>
                        </div>
                        <div className="oh-kpi">
                            <span className="oh-label">Treatment revenue, this week</span>
                            <div className="oh-kpi-val">{money(week)}</div>
                            <p>Injectables lead at {money(REVENUE[0].amount)}.</p>
                        </div>
                        <div className="oh-kpi">
                            <span className="oh-label">Rebooked before leaving</span>
                            <div className="oh-kpi-val">
                                {rebooked}
                                <small>of {REBOOK.length} recent visits</small>
                            </div>
                            <p>The Rebooking agent is following up with the other {REBOOK.length - rebooked}.</p>
                        </div>
                        <div className="oh-kpi">
                            <span className="oh-label">Reviews</span>
                            <div className="oh-kpi-val">
                                {REVIEWS.filter((r) => r.stars === 5 && r.when === 'Today').length}
                                <small>five star, today</small>
                            </div>
                            <p>{approved.v ? 'Reply to Hannah K. is posted.' : 'One reply to a 3 star review is drafted.'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="oh-wrap">
                <section className="oh-sec oh-in" style={{ '--i': 2 } as React.CSSProperties} aria-labelledby="oh-desk-h">
                    <div className="oh-sec-head">
                        <h2 id="oh-desk-h">
                            Chief of staff. <em>{waiting === 0 ? 'All clear.' : 'For your yes.'}</em>
                        </h2>
                        <div className="oh-meta">
                            <span className="oh-label">{waiting === 0 ? 'Nothing needs you right now' : `${waiting} of ${DECISIONS.length} waiting`}</span>
                        </div>
                    </div>
                    <div className="oh-desk">
                        {DECISIONS.map((d, i) => {
                            const ok = approved[d.id];
                            return (
                                <article key={d.id} className={`oh-dec ${ok ? 'done' : ''}`}>
                                    <div className="oh-dec-n">
                                        <b>{i + 1}</b>
                                        <span className="oh-label">{d.agent} agent</span>
                                    </div>
                                    <h3>{d.title}</h3>
                                    {ok ? (
                                        <>
                                            <p className="oh-dec-ok">
                                                <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                                                <span>{d.done}</span>
                                            </p>
                                            <span className="oh-stamp">Approved {ok}</span>
                                        </>
                                    ) : (
                                        <>
                                            <p>{d.why}</p>
                                            <div className="oh-dec-foot">
                                                <button type="button" className="oh-btn primary" onClick={() => approve(d.id)}>
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

                <div className="oh-main">
                    <section className="oh-sec oh-in" style={{ '--i': 3 } as React.CSSProperties} aria-labelledby="oh-book-h">
                        <div className="oh-sec-head">
                            <h2 id="oh-book-h">The day book</h2>
                            <div className="oh-meta">
                                <div className="oh-tabs" role="group" aria-label="Show one provider">
                                    <button type="button" aria-pressed={prov === 'all'} onClick={() => setProv('all')}>
                                        All
                                    </button>
                                    {PROVIDERS.map((p, i) => (
                                        <button key={p.name} type="button" aria-pressed={prov === i} onClick={() => setProv(i)}>
                                            <i style={{ background: p.ink }} />
                                            {first(p.name)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {!narrow ? (
                            <div className="oh-book" style={{ '--cols': cols.length } as React.CSSProperties}>
                                <div style={{ borderBottom: '1px solid var(--line)' }} />
                                {cols.map((c) => (
                                    <div className="oh-prov" key={c}>
                                        <b>
                                            <i style={{ background: PROVIDERS[c].ink }} />
                                            {PROVIDERS[c].name}
                                        </b>
                                        <span>
                                            {PROVIDERS[c].role}. {visits.filter((a) => a.p === c).length} visits, {money(visits.filter((a) => a.p === c).reduce((s, a) => s + a.price, 0))}
                                        </span>
                                    </div>
                                ))}
                                <div className="oh-book-body">
                                    <div className="oh-now" style={{ '--p': feed.now / 60 - OPEN_HOUR } as React.CSSProperties} aria-hidden="true">
                                        <span>{clockLabel(feed.now, false)}</span>
                                    </div>
                                    <div className="oh-hours" aria-hidden="true">
                                        {Array.from({ length: HOURS + 1 }, (_, i) => (
                                            <span key={i} style={{ top: `calc(var(--hh) * ${i})` }}>
                                                {at(OPEN_HOUR + i).replace(':00', '')}
                                            </span>
                                        ))}
                                    </div>
                                    {cols.map((c) => (
                                        <div className="oh-col" key={c}>
                                            {appts
                                                .filter((a) => a.p === c)
                                                .map((a) => (
                                                    <button
                                                        key={a.id}
                                                        type="button"
                                                        className={`oh-appt ${a.status} ${a.id === 'b4' && approved.w ? 'fresh' : ''}`}
                                                        style={{ ...tone(a), '--t': a.start - OPEN_HOUR, '--d': a.dur } as React.CSSProperties}
                                                        aria-current={openId === a.id}
                                                        aria-label={label(a)}
                                                        onClick={() => setOpenId(a.id)}
                                                    >
                                                        <b>
                                                            <span>{a.client}</span>
                                                            <span>{at(a.start)}</span>
                                                        </b>
                                                        <small>{a.tx}</small>
                                                        {a.dur >= 0.75 && (
                                                            <span className="oh-st">
                                                                <StatusGlyph s={a.status} live={feed.running} />
                                                                {a.status === 'open' ? 'Waitlist can fill this' : STATUS[a.status]}
                                                                {a.price > 0 && a.dur >= 1 ? ` · ${money(a.price)}` : ''}
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <ol className="oh-agenda">
                                {appts
                                    .filter((a) => prov === 'all' || a.p === prov)
                                    .sort((a, b) => a.start - b.start)
                                    .map((a) => (
                                        <li key={a.id} className={a.status}>
                                            <button type="button" aria-label={label(a)} onClick={() => setOpenId(a.id)}>
                                                <time>{at(a.start)}</time>
                                                <b>
                                                    <i style={{ background: PROVIDERS[a.p].ink }} />
                                                    {a.client}
                                                </b>
                                                <span className="oh-price">{a.price > 0 ? money(a.price) : ''}</span>
                                                <small>
                                                    {a.tx}, {first(PROVIDERS[a.p].name)}
                                                </small>
                                                <span className="oh-st">
                                                    <StatusGlyph s={a.status} live={feed.running} />
                                                    {STATUS[a.status]}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                            </ol>
                        )}
                    </section>

                    <div className="oh-rail">
                        <section className="oh-sec oh-feed oh-in" style={{ '--i': 4 } as React.CSSProperties} aria-labelledby="oh-feed-h">
                            <div className="oh-sec-head">
                                <h2 id="oh-feed-h">House log</h2>
                                <div className="oh-meta">
                                    <span className="oh-fresh">
                                        <i className={`oh-dot ${feed.running ? 'run' : ''}`} />
                                        {feed.running ? 'Live' : feed.paused ? 'Paused' : `As of ${clockLabel(feed.now)}`}
                                    </span>
                                    <button type="button" className="oh-icon" style={{ margin: '-10px -12px -10px 0' }} aria-label={feed.paused ? 'Resume the log' : 'Pause the log'} onClick={() => feed.setPaused(!feed.paused)}>
                                        {feed.paused ? <Play size={15} /> : <Pause size={15} />}
                                    </button>
                                </div>
                            </div>
                            <ol role="log" aria-live="polite" aria-label="Agent activity">
                                <AnimatePresence initial={false}>
                                    {feedItems.slice(0, 7).map((f) => (
                                        <motion.li key={f.key} layout className={f.you ? 'you' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                                            <time>{f.time.replace(/ [AP]M/, '')}</time>
                                            <div>
                                                <b>{f.who}</b>
                                                <p>{f.text}</p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ol>
                        </section>

                        <section className="oh-sec oh-in" style={{ '--i': 5 } as React.CSSProperties} aria-labelledby="oh-rev-h">
                            <div className="oh-sec-head">
                                <h2 id="oh-rev-h">Treatment revenue</h2>
                                <div className="oh-meta">
                                    <span className="oh-label">This week</span>
                                </div>
                            </div>
                            <div className="oh-rev-total">
                                <b>{money(week)}</b>
                                <span>across five lines</span>
                            </div>
                            <div className="oh-rev-bar" aria-hidden="true">
                                {REVENUE.map((r) => (
                                    <span key={r.name} style={{ flex: r.amount, background: r.color }} />
                                ))}
                            </div>
                            <ul className="oh-rev-list" style={{ marginTop: 10 }}>
                                {REVENUE.map((r) => (
                                    <li key={r.name}>
                                        <i style={{ background: r.color }} />
                                        <span>{r.name}</span>
                                        <b>{money(r.amount)}</b>
                                        <small>{Math.round((r.amount / week) * 100)}%</small>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>

                <section className="oh-sec oh-in" style={{ '--i': 6 } as React.CSSProperties} aria-labelledby="oh-care-h">
                    <div className="oh-sec-head">
                        <h2 id="oh-care-h">Client care</h2>
                        <div className="oh-meta">
                            <div className="oh-tabs" role="tablist" aria-label="Client care">
                                {(
                                    [
                                        ['rebook', narrow ? 'Rebooking' : 'Rebooking agent', REBOOK.length],
                                        ['lapsed', narrow ? 'Lapsed' : 'Lapsed clients', LAPSED.length],
                                        ['reviews', 'Reviews', REVIEWS.length],
                                    ] as [Care, string, number][]
                                ).map(([k, name, n]) => (
                                    <button key={k} type="button" role="tab" aria-selected={care === k} onClick={() => setCare(k)}>
                                        {name} <span>{n}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {care === 'rebook' && (
                        <div role="tabpanel">
                            <p className="oh-care-note">
                                <b>
                                    {rebooked} of {REBOOK.length} booked their next visit before leaving.
                                </b>{' '}
                                The agent offers the next date in the room, then follows up by text.
                            </p>
                            {REBOOK.map((r) => (
                                <div className="oh-row three" key={r.id}>
                                    <h3>{r.name}</h3>
                                    <span>{r.last}</span>
                                    <span>Due: {r.due}</span>
                                    <span className={`oh-state ${r.ok ? 'ok' : r.state.startsWith('Replied') ? 'wait' : ''}`}>
                                        {r.ok ? <Check size={14} strokeWidth={2.2} aria-hidden="true" /> : <Circle size={10} strokeWidth={2.4} aria-hidden="true" />}
                                        {r.state}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {care === 'lapsed' && (
                        <div role="tabpanel">
                            <p className="oh-care-note">
                                <b>38 clients have not visited in 5 months or more.</b> Four of them are below. {approved.m ? `Notes go out at 4:00 PM. Approved ${approved.m}.` : 'The notes are written and waiting on your yes above.'}
                            </p>
                            {LAPSED.map((l) => (
                                <div className="oh-row" key={l.id}>
                                    <h3>{l.name}</h3>
                                    <span>{l.note}</span>
                                    <span className="oh-row-num">
                                        {money(l.ltv)} <span style={{ font: '400 13px var(--sans)' }}>lifetime, away {l.away}</span>
                                    </span>
                                    <span className={`oh-state ${approved.m ? 'ok' : 'wait'}`}>
                                        {approved.m ? <Check size={14} strokeWidth={2.2} aria-hidden="true" /> : <Circle size={10} strokeWidth={2.4} aria-hidden="true" />}
                                        {approved.m ? 'Note scheduled for 4:00 PM' : 'Note drafted from her chart'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {care === 'reviews' && (
                        <div role="tabpanel" className="oh-reviews">
                            {REVIEWS.map((r) => (
                                <article className="oh-review" key={r.name}>
                                    <div className="oh-stars" role="img" aria-label={`${r.stars} of 5 stars`}>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <Star key={n} size={14} strokeWidth={1.4} fill={n <= r.stars ? 'currentColor' : 'none'} />
                                        ))}
                                        <small>{r.stars} of 5</small>
                                    </div>
                                    <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
                                    <cite>
                                        {r.name} · {r.when}
                                    </cite>
                                    {r.reply && (
                                        <div className={`oh-reply ${approved.v ? 'posted' : ''}`}>
                                            <span className="oh-label">
                                                {approved.v && <Check size={13} strokeWidth={2.2} aria-hidden="true" />}
                                                {approved.v ? `Reply posted ${approved.v}` : 'Reply drafted, waiting on your yes'}
                                            </span>
                                            {r.reply}
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <footer className="oh-foot">
                    <span>Oriel House Aesthetics. Demo. Sample data, fictional clients.</span>
                    <GystCredit slug="medspa-b" className="oh-credit" />
                </footer>
            </div>

            <Sheet open={!!appt} onClose={closeSheet} label={appt ? `Client card, ${appt.client}` : 'Client card'} className="oh-sheet" scrimClassName="oh-scrim" duration={0.42}>
                {appt && (
                    <>
                        <div className="oh-sheet-head">
                            <i style={{ background: PROVIDERS[appt.p].ink }} />
                            <span className="oh-label">
                                {PROVIDERS[appt.p].name} · {STATUS[appt.status]}
                            </span>
                            <button type="button" className="oh-icon" aria-label="Close client card" onClick={closeSheet}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="oh-sheet-body">
                            <h2>{appt.client}</h2>
                            <p className="oh-sheet-tx">{appt.tx}</p>
                            <dl className="oh-facts">
                                <div>
                                    <dt>Time</dt>
                                    <dd>
                                        {at(appt.start)} <small>to {at(appt.start + appt.dur)}</small>
                                    </dd>
                                </div>
                                <div>
                                    <dt>Today</dt>
                                    <dd>{appt.price > 0 ? money(appt.price) : <small>No charge</small>}</dd>
                                </div>
                                {appt.status !== 'open' && (
                                    <>
                                        <div>
                                            <dt>Visits</dt>
                                            <dd>{appt.visits === 0 ? <small>First visit</small> : appt.visits}</dd>
                                        </div>
                                        <div>
                                            <dt>Lifetime value</dt>
                                            <dd>{appt.ltv > 0 ? money(appt.ltv) : <small>New client</small>}</dd>
                                        </div>
                                    </>
                                )}
                            </dl>
                            {appt.status === 'open' ? (
                                <>
                                    <span className="oh-label">What happens next</span>
                                    <p className="oh-note">Three clients asked for an afternoon facial this week. The Rebooking agent can offer them this hour as soon as you approve it.</p>
                                    <button
                                        type="button"
                                        className="oh-btn primary"
                                        onClick={() => {
                                            approve('w');
                                            closeSheet();
                                        }}
                                    >
                                        Approve the waitlist offer
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="oh-label">What we know</span>
                                    <p className="oh-note quote">{appt.pref}</p>
                                    <span className="oh-label">What happens next</span>
                                    <p className="oh-note">{appt.plan}</p>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Sheet>
            <ToastHost toast={toast} clear={clear} className="oh-toast" />
        </div>
    );
};

export default MedspaBPage;
