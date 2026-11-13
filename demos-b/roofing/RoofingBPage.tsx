import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, Clock, Pause, Play, X } from 'lucide-react';
import { CLAIMS, CREWS, Claim, DECISIONS, FEED, LEADS, ORDERS, STAGES } from '../../demos/roofing/data';
import { Count, GystCredit, Sheet, ToastHost, clockLabel, money, useDemoHead, useLiveFeed, useNarrow, useToast, withApprovals } from '../kit';
import { CSS } from './styles';

const FONTS = 'family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Spline+Sans+Mono:wght@400;500;600';
const START = 8 * 60 + 42;
const REPS = ['Cole', 'Jess', 'Priya'];
type Shown = Claim & { cleared?: boolean };

const Mark = () => (
    <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true" fill="none">
        <path d="M1 20 15 3l14 17" stroke="currentColor" strokeWidth="3" />
        <path d="M8 20l7-8.5 7 8.5" stroke="var(--sig)" strokeWidth="3" />
    </svg>
);

const RoofingBPage: React.FC = () => {
    useDemoHead('roofing-b', 'Slatewing Roofing - Storm Desk', FONTS, 'oklch(.945 .008 235)');
    const narrow = useNarrow(1100);
    const feed = useLiveFeed(FEED, START, 6, 5000);
    const { toast, show, clear } = useToast();

    const [approved, setApproved] = useState<Record<string, string>>({});
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const [rep, setRep] = useState<string>('all');
    const [flagged, setFlagged] = useState(false);
    const [stageTab, setStageTab] = useState(2);
    const [openId, setOpenId] = useState<string | null>(null);

    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id)!;
        setApproved((a) => ({ ...a, [id]: clockLabel(feed.now) }));
        setAnchors((a) => ({ ...a, [id]: feed.items[0].key }));
        show(d.done, () => setApproved(({ [id]: _, ...rest }) => rest));
    };
    const closeSheet = useCallback(() => setOpenId(null), []);

    // Approvals change the board: the rain flag clears, the supplement lands on the claim, the estimates go out.
    const claims: Shown[] = CLAIMS.map((c) => {
        if (c.id === 'c1' && approved.r1) return { ...c, flag: 'Moved to Tuesday', cleared: true, note: 'Tear-off moved to Tuesday with the same crew. The dumpster stays and Rosa has been texted.' };
        if (c.id === 'c2' && approved.r2) return { ...c, amount: c.amount + 2318, flag: 'Supplement sent', cleared: true };
        if ((c.id === 'c11' || c.id === 'c12') && approved.r3) return { ...c, flag: 'Estimate sent', cleared: true, note: c.note.replace('Estimate is in the batch waiting on you.', 'Estimate sent. Follow-up is set for 48 hours.') };
        return c;
    });
    const total = claims.reduce((s, c) => s + c.amount, 0);
    const byStage = STAGES.map((_, i) => claims.filter((c) => c.stage === i));
    const approvedValue = claims.filter((c) => c.stage >= 3).reduce((s, c) => s + c.amount, 0);
    const open = claims.filter((c) => c.flag && !c.cleared).length;
    const waiting = DECISIONS.filter((d) => !approved[d.id]).length;
    const leads = LEADS.days.reduce((s, [, n]) => s + n, 0);
    const peak = Math.max(...LEADS.days.map(([, n]) => n));
    const match = (c: Shown) => (rep === 'all' || c.rep === rep) && (!flagged || (!!c.flag && !c.cleared));
    const claim = claims.find((c) => c.id === openId) ?? null;
    const sqDone = CREWS.reduce((s, c) => s + c.done, 0);
    const sqAll = CREWS.reduce((s, c) => s + c.of, 0);

    const feedItems = withApprovals(
        feed.items,
        DECISIONS.filter((d) => approved[d.id]).map((d) => ({ id: d.id, who: `You + ${d.agent}`, text: d.done, time: approved[d.id], after: anchors[d.id] }))
    );

    const flagEl = (c: Shown) =>
        c.flag && (
            <span className={`sw-flag ${c.cleared ? 'ok' : ''}`}>
                {c.cleared ? <Check size={12} strokeWidth={2.6} aria-hidden="true" /> : <AlertTriangle size={12} strokeWidth={2.2} aria-hidden="true" />}
                {c.flag}
            </span>
        );

    const card = (c: Shown) => (
        <button
            key={c.id}
            type="button"
            className={`sw-card ${!narrow && !match(c) ? 'dim' : ''}`}
            aria-current={openId === c.id}
            aria-label={`${c.name}, ${c.addr}, ${STAGES[c.stage]}, ${money(c.amount)}${c.flag ? `, ${c.flag}` : ''}`}
            onClick={() => setOpenId(c.id)}
        >
            {flagEl(c)}
            <b>{c.name}</b>
            <small>{c.addr}</small>
            <small>
                {c.carrier} · {c.squares} sq
            </small>
            <span className="sw-card-row">
                <span>
                    {c.rep} · {c.days === 0 ? 'today' : `${c.days}d here`}
                </span>
                <strong>{money(c.amount)}</strong>
            </span>
        </button>
    );

    return (
        <div className="sw">
            <style>{CSS}</style>

            <header className="sw-top">
                <div className="sw-wrap">
                    <div className="sw-brand">
                        <Mark />
                        <b>Slatewing Roofing</b>
                        <span>Storm Desk</span>
                    </div>
                    <div className="sw-top-right">
                        <span className="sw-demo">Demo. Sample data.</span>
                        <span className="sw-clock">
                            Fri<b>{clockLabel(feed.now)}</b>
                        </span>
                    </div>
                </div>
            </header>

            <div className="sw-hero">
                <div className="sw-wrap">
                    <div className="sw-in">
                        <h1>
                            Hail week, day four. <em>{waiting === 0 ? 'Nothing is waiting on you.' : `${waiting} call${waiting === 1 ? ' is' : 's are'} yours.`}</em>
                        </h1>
                        <p>
                            {CLAIMS.length} claims are moving, four crews are on roofs, and {open === 0 ? 'every flag on the board is cleared.' : `${open} claims on the board carry a flag.`}
                        </p>
                    </div>
                    <div className="sw-storm sw-in" style={{ '--i': 1 } as React.CSSProperties}>
                        <span className="sw-label">Leads since Tuesday&rsquo;s hail</span>
                        <b>{leads}</b>
                        <div className="sw-bars" role="img" aria-label={LEADS.days.map(([d, n]) => `${d} ${n}`).join(', ')}>
                            {LEADS.days.map(([d, n]) => (
                                <div key={d}>
                                    <em>{n}</em>
                                    <i style={{ height: `${(n / peak) * 44}px` }} />
                                    <span>{d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sw-wrap">
                <section className="sw-sec sw-in" style={{ '--i': 2 } as React.CSSProperties} aria-labelledby="sw-mc-h">
                    <div className="sw-head">
                        <span className="sw-idx">01</span>
                        <h2 id="sw-mc-h">Your calls</h2>
                        <span className={`sw-count ${waiting === 0 ? 'zero' : ''}`} aria-label={`${waiting} decisions waiting`}>
                            {waiting}
                        </span>
                        <div className="sw-meta">
                            <span className="sw-label">{waiting === 0 ? 'All clear. The desk has it from here.' : 'Chief of staff. Drafted by the desk, waiting on a yes.'}</span>
                        </div>
                    </div>
                    <div className="sw-calls">
                        {DECISIONS.map((d) => {
                            const ok = approved[d.id];
                            return (
                                <article key={d.id} className={`sw-call ${ok ? 'done' : ''}`}>
                                    <span className="sw-label">{d.agent}</span>
                                    <h3>{d.title}</h3>
                                    {ok ? (
                                        <p className="sw-ok">
                                            <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                                            <span>
                                                {d.done} Approved {ok}.
                                            </span>
                                        </p>
                                    ) : (
                                        <>
                                            <p>{d.why}</p>
                                            <div className="sw-call-foot">
                                                <button type="button" className="sw-btn primary" onClick={() => approve(d.id)}>
                                                    Approve
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                    <div className="sw-figs">
                        <div className="sw-fig lead">
                            <span className="sw-label">Claims in motion</span>
                            <div className="sw-fig-val">
                                <Count value={total} />
                                <small>{CLAIMS.length} roofs, three carriers</small>
                            </div>
                            <div className="sw-stagebar" aria-hidden="true">
                                {STAGES.map((s, i) => (
                                    <div key={s} style={{ flex: byStage[i].reduce((a, c) => a + c.amount, 0) }}>
                                        <i />
                                        <span>
                                            0{i + 1} · {byStage[i].length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sw-fig">
                            <span className="sw-label">Approved by carriers</span>
                            <div className="sw-fig-val">
                                <Count value={approvedValue} />
                            </div>
                            <p>Four roofs approved, two of them already on the build calendar.</p>
                        </div>
                        <div className="sw-fig">
                            <span className="sw-label">Where the leads came from</span>
                            <ul className="sw-src">
                                {LEADS.sources.map(([name, n]) => (
                                    <li key={name}>
                                        <span>{name}</span>
                                        <i style={{ '--v': (n / LEADS.sources[0][1]) * 100 } as React.CSSProperties} />
                                        <b>{n}</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="sw-sec sw-in" style={{ '--i': 3 } as React.CSSProperties} aria-labelledby="sw-board-h">
                    <div className="sw-head">
                        <span className="sw-idx">02</span>
                        <h2 id="sw-board-h">Claim board</h2>
                        <div className="sw-meta">
                            <div className="sw-chips" role="group" aria-label="Filter by rep">
                                <button type="button" aria-pressed={rep === 'all'} onClick={() => setRep('all')}>
                                    All reps
                                </button>
                                {REPS.map((r) => (
                                    <button key={r} type="button" aria-pressed={rep === r} onClick={() => setRep(r)}>
                                        {r} <i>{CLAIMS.filter((c) => c.rep === r).length}</i>
                                    </button>
                                ))}
                                <button type="button" aria-pressed={flagged} onClick={() => setFlagged(!flagged)}>
                                    <AlertTriangle size={13} aria-hidden="true" />
                                    Flagged <i>{open}</i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {narrow ? (
                        <>
                            <div className="sw-chips" role="tablist" aria-label="Stage" style={{ paddingTop: 12 }}>
                                {STAGES.map((s, i) => (
                                    <button key={s} type="button" role="tab" aria-selected={stageTab === i} onClick={() => setStageTab(i)}>
                                        {s} <i>{byStage[i].filter(match).length}</i>
                                    </button>
                                ))}
                            </div>
                            <div className="sw-board" role="tabpanel">
                                <div>
                                    {byStage[stageTab].filter(match).map(card)}
                                    {byStage[stageTab].filter(match).length === 0 && <p className="sw-col-empty">No claims at this stage match the filter.</p>}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="sw-board">
                            {STAGES.map((s, i) => (
                                <div key={s}>
                                    <div className="sw-col-head">
                                        <span>0{i + 1}</span>
                                        <b>{s}</b>
                                        <em>{money(byStage[i].reduce((a, c) => a + c.amount, 0))}</em>
                                    </div>
                                    {byStage[i].map(card)}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="sw-lower">
                    <section className="sw-sec sw-in" style={{ '--i': 4 } as React.CSSProperties} aria-labelledby="sw-crew-h">
                        <div className="sw-head">
                            <span className="sw-idx">03</span>
                            <h2 id="sw-crew-h">Crews</h2>
                            <div className="sw-meta">
                                <span className="sw-label">
                                    {sqDone} of {sqAll} squares
                                </span>
                            </div>
                        </div>
                        {CREWS.map((c) => (
                            <div className="sw-crew" key={c.name}>
                                <div className="sw-crew-top">
                                    <b>{c.name}</b>
                                    <span>
                                        {c.lead} · {c.job}
                                    </span>
                                    <em>
                                        {c.done}/{c.of}
                                    </em>
                                </div>
                                <p>{c.task}</p>
                                <div className={`sw-meter ${c.done === c.of ? 'full' : ''}`} role="img" aria-label={`${c.done} of ${c.of} squares`}>
                                    <i style={{ '--v': (c.done / c.of) * 100 } as React.CSSProperties} />
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="sw-sec sw-in" style={{ '--i': 5 } as React.CSSProperties} aria-labelledby="sw-ord-h">
                        <div className="sw-head">
                            <span className="sw-idx">04</span>
                            <h2 id="sw-ord-h">Materials</h2>
                            <div className="sw-meta">
                                <span className="sw-label">1 backordered</span>
                            </div>
                        </div>
                        <ul>
                            {ORDERS.map((o) => (
                                <li key={o.what} className={`sw-order ${o.tone}`}>
                                    {o.tone === 'ok' ? <Check size={14} strokeWidth={2.6} aria-hidden="true" /> : o.tone === 'wait' ? <Clock size={14} aria-hidden="true" /> : <AlertTriangle size={14} aria-hidden="true" />}
                                    <h3>{o.what}</h3>
                                    <p>
                                        {o.job}. <b>{o.state}.</b>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="sw-sec sw-feed sw-in" style={{ '--i': 6 } as React.CSSProperties} aria-labelledby="sw-feed-h">
                        <div className="sw-head">
                            <span className="sw-idx">05</span>
                            <h2 id="sw-feed-h">Desk log</h2>
                            <div className="sw-meta">
                                <span className="sw-fresh">
                                    <i className={`sw-dot ${feed.running ? 'run' : ''}`} />
                                    {feed.running ? 'Live' : feed.paused ? 'Paused' : `As of ${clockLabel(feed.now)}`}
                                </span>
                                <button type="button" className="sw-icon" style={{ margin: '-8px -8px -8px 0' }} aria-label={feed.paused ? 'Resume the log' : 'Pause the log'} onClick={() => feed.setPaused(!feed.paused)}>
                                    {feed.paused ? <Play size={15} /> : <Pause size={15} />}
                                </button>
                            </div>
                        </div>
                        <ol role="log" aria-live="polite" aria-label="Agent activity">
                            <AnimatePresence initial={false}>
                                {feedItems.slice(0, 8).map((f) => (
                                    <motion.li key={f.key} layout className={f.you ? 'you' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}>
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

                <footer className="sw-foot">
                    <span>Slatewing Roofing. Demo. Sample data, fictional homeowners and carriers.</span>
                    <GystCredit slug="roofing-b" className="sw-credit" />
                </footer>
            </div>

            <Sheet open={!!claim} onClose={closeSheet} label={claim ? `Claim, ${claim.name}` : 'Claim'} className="sw-sheet" scrimClassName="sw-scrim" duration={0.26}>
                {claim && (
                    <>
                        <div className="sw-sheet-head">
                            <span className="sw-label">Claim file · {claim.carrier}</span>
                            <button type="button" className="sw-icon" aria-label="Close claim" onClick={closeSheet}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="sw-sheet-body">
                            {flagEl(claim)}
                            <h2>{claim.name}</h2>
                            <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{claim.addr}</p>
                            <ol className="sw-steps" aria-label={`Stage ${claim.stage + 1} of 5, ${STAGES[claim.stage]}`}>
                                {STAGES.map((s, i) => (
                                    <li key={s} className={i < claim.stage ? 'on' : i === claim.stage ? 'now' : ''}>
                                        {s}
                                    </li>
                                ))}
                            </ol>
                            <dl className="sw-facts">
                                <div>
                                    <dt>Claim value</dt>
                                    <dd className="sw-num">{money(claim.amount)}</dd>
                                </div>
                                <div>
                                    <dt>Roof size</dt>
                                    <dd>{claim.squares} squares</dd>
                                </div>
                                <div>
                                    <dt>Rep</dt>
                                    <dd>{claim.rep}</dd>
                                </div>
                                <div>
                                    <dt>At this stage</dt>
                                    <dd>{claim.days === 0 ? 'Since today' : `${claim.days} day${claim.days === 1 ? '' : 's'}`}</dd>
                                </div>
                            </dl>
                            <span className="sw-label">Where it stands</span>
                            <p className="sw-note">{claim.note}</p>
                        </div>
                    </>
                )}
            </Sheet>
            <ToastHost toast={toast} clear={clear} className="sw-toast" />
        </div>
    );
};

export default RoofingBPage;
