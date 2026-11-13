import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CircleDot, Clock, FileText, Mail, Megaphone, Minus, Pause, Play, Share2, TrendingUp, TriangleAlert, Video, X } from 'lucide-react';
import { CHANNELS, CLIENTS, Channel, DAYS, DECISIONS, FEED, POSTS, Post, QUEUE, STAGES } from '../../demos/agency/data';
import { Count, GystCredit, Sheet, ToastHost, clockLabel, money, useDemoHead, useLiveFeed, useNarrow, useToast, withApprovals } from '../kit';
import { CSS } from './styles';

const FONTS = 'family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500';
const START = 9 * 60 + 24;
const TODAY = 4;

// One hue per client, same lightness and chroma, so no client shouts over another.
const HUE: Record<string, number> = { pilot: 40, fenwright: 150, kettlebrook: 215, northbank: 88, juno: 345, mossfield: 305 };
const swatch = (id: string) => ({ '--soft': `oklch(.945 .04 ${HUE[id]})`, '--dot': `oklch(.6 .15 ${HUE[id]})` }) as React.CSSProperties;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)!.name;
const ICON: Record<Channel, React.FC<{ size?: number; 'aria-hidden'?: boolean }>> = { Social: Share2, Email: Mail, Blog: FileText, Video: Video, Paid: Megaphone };
const NOTE: Record<string, string> = { d1: 'Budget moved to the video ad', d2: 'Gift guide scheduled for 10:00', d3: 'October report sent', d4: 'Fifth clinic launch plan sent' };

const Mark = () => (
    <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
        <rect x=".75" y=".75" width="24.5" height="28.5" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="4.5" y="4.5" width="7" height="21" rx="1" fill="var(--accent)" />
        <rect x="14.5" y="4.5" width="7" height="10" rx="1" fill="var(--ink)" />
    </svg>
);

const Swatch: React.FC<{ id: string }> = ({ id }) => (
    <span className="hc-swatch" style={swatch(id)}>
        <i />
        <span>{clientName(id)}</span>
    </span>
);

const AgencyBPage: React.FC = () => {
    useDemoHead('agency-b', 'Half Column - The Desk', FONTS, 'oklch(.985 .005 95)');
    const narrow = useNarrow(980);
    const feed = useLiveFeed(FEED, START, 6, 5000);
    const { toast, show, clear } = useToast();

    const [approved, setApproved] = useState<Record<string, string>>({});
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const [client, setClient] = useState<string>('all');
    const [channel, setChannel] = useState<Channel | 'all'>('all');
    const [day, setDay] = useState(TODAY);
    const [openId, setOpenId] = useState<string | null>(null);

    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id)!;
        setApproved((a) => ({ ...a, [id]: clockLabel(feed.now) }));
        setAnchors((a) => ({ ...a, [id]: feed.items[0].key }));
        show(d.done, () => setApproved(({ [id]: _, ...rest }) => rest));
    };
    const closeSheet = useCallback(() => setOpenId(null), []);

    // Approving the gift guide moves it from "Needs you" to "Scheduled" on the calendar.
    const posts: Post[] = POSTS.map((p) => (p.id === 'p11' && approved.d2 ? { ...p, state: 'Scheduled', stat: 'Goes to 18,400 subscribers at 10:00' } : p));
    const waiting = DECISIONS.filter((d) => !approved[d.id]).length;
    const needs = posts.filter((p) => p.state === 'Needs you').length;
    const spend = CLIENTS.reduce((s, c) => s + c.spend, 0);
    const back = CLIENTS.reduce((s, c) => s + c.back, 0);
    const retainers = CLIENTS.reduce((s, c) => s + c.retainer, 0);
    const match = (p: Post) => (client === 'all' || p.client === client) && (channel === 'all' || p.channel === channel);
    const post = posts.find((p) => p.id === openId) ?? null;
    const noteFor = (id: string) => DECISIONS.find((d) => d.client === id && approved[d.id]);
    const words = ['Nothing wants', 'One thing wants', 'Two things want', 'Three things want', 'Four things want'];

    const feedItems = withApprovals(
        feed.items,
        DECISIONS.filter((d) => approved[d.id]).map((d) => ({ id: d.id, who: `You + ${d.agent}`, text: d.done, time: approved[d.id], after: anchors[d.id] }))
    );

    const stateEl = (p: Post) => (
        <em>
            {p.state === 'Published' && <Check size={12} strokeWidth={2.6} aria-hidden="true" />}
            {p.state === 'Scheduled' && <Clock size={12} aria-hidden="true" />}
            {p.state === 'Needs you' && <CircleDot size={12} aria-hidden="true" />}
            {p.state}
        </em>
    );

    const postEl = (p: Post) => {
        const Icon = ICON[p.channel];
        return (
            <button
                key={p.id}
                type="button"
                className={`hc-post ${p.state === 'Needs you' ? 'needs' : ''} ${!match(p) ? 'dim' : ''}`}
                style={swatch(p.client)}
                aria-current={openId === p.id}
                aria-label={`${p.title}, ${clientName(p.client)}, ${p.channel}, ${DAYS[p.day]} ${p.time}, ${p.state}`}
                onClick={() => setOpenId(p.id)}
            >
                <span className="hc-post-top">
                    <Icon size={13} aria-hidden />
                    {p.time}
                    {stateEl(p)}
                </span>
                <b>{p.title}</b>
                <small>
                    <i />
                    {clientName(p.client)} · {p.channel}
                </small>
            </button>
        );
    };

    const days = narrow ? [day] : DAYS.map((_, i) => i);

    return (
        <div className="hc">
            <style>{CSS}</style>
            <div className="hc-wrap">
                <header className="hc-top">
                    <div className="hc-brand">
                        <Mark />
                        <b>Half Column</b>
                    </div>
                    <span className="hc-pill">The Desk</span>
                    <div className="hc-top-right">
                        <span className="hc-pill solid">Demo. Sample data.</span>
                        <span className="hc-clock">
                            Fri 13 Nov<b>{clockLabel(feed.now)}</b>
                        </span>
                    </div>
                </header>

                <div className="hc-hero">
                    <h1 className="hc-in">
                        Friday. <em>{words[waiting]}</em> a yes.
                    </h1>
                    <div className="hc-stats hc-in" style={{ '--i': 1 } as React.CSSProperties}>
                        <div>
                            <span className="hc-label">Back for clients</span>
                            <b>{money(back)}</b>
                            <p>
                                on {money(spend)} of ad spend. ${(back / spend).toFixed(2)} back per $1.
                            </p>
                        </div>
                        <div>
                            <span className="hc-label">Monthly retainers</span>
                            <b>{money(retainers)}</b>
                            <p>Six clients. Three thriving, one to watch.</p>
                        </div>
                        <div>
                            <span className="hc-label">Published or scheduled</span>
                            <b>
                                <Count value={posts.length - needs} format={String} />
                                <span style={{ font: '400 15px var(--sans)', color: 'var(--text-2)', letterSpacing: 0, marginLeft: 8 }}>of {posts.length}</span>
                            </b>
                            <p>{needs === 1 ? 'One piece is still waiting on a yes.' : `${needs} pieces are still waiting on a yes.`}</p>
                        </div>
                    </div>
                </div>

                <section className="hc-in" style={{ '--i': 2 } as React.CSSProperties} aria-labelledby="hc-yes-h">
                    <div className="hc-head">
                        <h2 id="hc-yes-h">
                            Chief of staff. <em>{waiting === 0 ? 'All clear.' : 'The yes pile.'}</em>
                        </h2>
                        <div className="hc-meta">
                            <span className="hc-label">{waiting === 0 ? 'Nothing needs you right now' : `${waiting} of ${DECISIONS.length} waiting`}</span>
                        </div>
                    </div>
                    <div className="hc-yes">
                        {DECISIONS.map((d) => {
                            const ok = approved[d.id];
                            return (
                                <article key={d.id} className={`hc-dec ${ok ? 'done' : ''}`}>
                                    <Swatch id={d.client} />
                                    <span className="hc-label">{d.agent}</span>
                                    <h3>{d.title}</h3>
                                    {ok ? (
                                        <>
                                            <p className="hc-ok">
                                                <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                                                <span>{d.done}</span>
                                            </p>
                                            <span className="hc-stamp">Approved {ok}</span>
                                        </>
                                    ) : (
                                        <>
                                            <p>{d.why}</p>
                                            <div className="hc-dec-foot">
                                                <button type="button" className="hc-btn primary" onClick={() => approve(d.id)}>
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

                <div className="hc-main">
                    <section className="hc-sec hc-in" style={{ '--i': 3 } as React.CSSProperties} aria-labelledby="hc-week-h">
                        <div className="hc-head">
                            <h2 id="hc-week-h">This week, going out</h2>
                            <div className="hc-meta">
                                <span className="hc-label">
                                    {posts.filter(match).length} of {posts.length} shown
                                </span>
                            </div>
                        </div>
                        <div className="hc-filters">
                            <div className="hc-chips" role="group" aria-label="Filter by client">
                                <button type="button" aria-pressed={client === 'all'} onClick={() => setClient('all')}>
                                    All clients
                                </button>
                                {CLIENTS.map((c) => (
                                    <button key={c.id} type="button" aria-pressed={client === c.id} onClick={() => setClient(c.id)}>
                                        <i style={{ background: `oklch(.6 .15 ${HUE[c.id]})` }} />
                                        {c.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                            <div className="hc-chips" role="group" aria-label="Filter by channel">
                                <button type="button" aria-pressed={channel === 'all'} onClick={() => setChannel('all')}>
                                    All channels
                                </button>
                                {CHANNELS.map((ch) => {
                                    const Icon = ICON[ch];
                                    return (
                                        <button key={ch} type="button" aria-pressed={channel === ch} onClick={() => setChannel(ch)}>
                                            <Icon size={13} aria-hidden />
                                            {ch}
                                        </button>
                                    );
                                })}
                            </div>
                            {narrow && (
                                <div className="hc-chips" role="tablist" aria-label="Day">
                                    {DAYS.map((d, i) => (
                                        <button key={d} type="button" role="tab" aria-selected={day === i} onClick={() => setDay(i)}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="hc-week">
                            {days.map((i) => {
                                const list = posts.filter((p) => p.day === i);
                                return (
                                    <div key={i} className={`hc-day ${i === TODAY ? 'today' : ''}`}>
                                        <div className="hc-day-head">
                                            <span>{DAYS[i]}</span>
                                            <span>{i === TODAY ? 'Today' : `${list.length} out`}</span>
                                        </div>
                                        <div className="hc-day-body">{list.map(postEl)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="hc-sec hc-in" style={{ '--i': 4 } as React.CSSProperties} aria-labelledby="hc-wire-h">
                        <div className="hc-wire">
                            <div className="hc-wire-head">
                                <h2 id="hc-wire-h">The wire</h2>
                                <span className="hc-fresh">
                                    <i className={`hc-dot ${feed.running ? 'run' : ''}`} />
                                    {feed.running ? 'Live' : feed.paused ? 'Paused' : `As of ${clockLabel(feed.now)}`}
                                </span>
                                <button type="button" className="hc-icon" aria-label={feed.paused ? 'Resume the wire' : 'Pause the wire'} onClick={() => feed.setPaused(!feed.paused)}>
                                    {feed.paused ? <Play size={15} /> : <Pause size={15} />}
                                </button>
                            </div>
                            <ol role="log" aria-live="polite" aria-label="Agent activity">
                                <AnimatePresence initial={false}>
                                    {feedItems.slice(0, 8).map((f) => (
                                        <motion.li key={f.key} layout className={f.you ? 'you' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                                            <div>
                                                <b>{f.who}</b>
                                                <time>{f.time}</time>
                                            </div>
                                            <p>{f.text}</p>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ol>
                        </div>
                    </section>
                </div>

                <div className="hc-lower">
                    <section className="hc-sec hc-in" style={{ '--i': 5 } as React.CSSProperties} aria-labelledby="hc-cl-h">
                        <div className="hc-head">
                            <h2 id="hc-cl-h">Clients</h2>
                            <div className="hc-meta">
                                <span className="hc-label">Tap one to filter the week</span>
                            </div>
                        </div>
                        {CLIENTS.map((c) => {
                            const sent = noteFor(c.id);
                            return (
                                <button key={c.id} type="button" className="hc-client" style={swatch(c.id)} aria-pressed={client === c.id} onClick={() => setClient(client === c.id ? 'all' : c.id)}>
                                    <div>
                                        <h3>
                                            <i />
                                            {c.name}
                                        </h3>
                                        <small>{c.what}</small>
                                    </div>
                                    <span className={`hc-health ${c.health}`}>
                                        {c.health === 'Thriving' ? <TrendingUp size={13} aria-hidden="true" /> : c.health === 'Watch' ? <TriangleAlert size={13} aria-hidden="true" /> : <Minus size={13} aria-hidden="true" />}
                                        {c.health}
                                    </span>
                                    <span className="hc-ret">
                                        <b>${(c.back / c.spend).toFixed(2)}</b> <small>back per $1</small>
                                    </span>
                                    <span className={sent ? 'sent' : ''}>{sent ? `${NOTE[sent.id]}.` : `${c.note}.`}</span>
                                </button>
                            );
                        })}
                    </section>

                    <section className="hc-sec hc-in" style={{ '--i': 6 } as React.CSSProperties} aria-labelledby="hc-q-h">
                        <div className="hc-head">
                            <h2 id="hc-q-h">In production</h2>
                            <div className="hc-meta">
                                <span className="hc-label">{STAGES.join(' / ')}</span>
                            </div>
                        </div>
                        <ul className="hc-queue">
                            {QUEUE.map((q) => (
                                <li key={q.title}>
                                    <div className="hc-queue-top">
                                        <h3>{q.title}</h3>
                                        <Swatch id={q.client} />
                                    </div>
                                    <div className="hc-stage" role="img" aria-label={`Stage ${q.stage + 1} of 5, ${STAGES[q.stage]}`}>
                                        {STAGES.map((s, i) => (
                                            <i key={s} className={i < q.stage ? 'on' : i === q.stage ? 'now' : ''} />
                                        ))}
                                    </div>
                                    <small>
                                        <span>
                                            <b>{STAGES[q.stage]}</b> · {q.agent}
                                        </span>
                                        <span>{q.eta}</span>
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <footer className="hc-foot">
                    <span>Half Column. Demo. Sample data, fictional clients.</span>
                    <GystCredit slug="agency-b" className="hc-credit" />
                </footer>
            </div>

            <Sheet open={!!post} onClose={closeSheet} label={post ? post.title : 'Post'} className="hc-sheet" scrimClassName="hc-scrim" duration={0.3}>
                {post && (
                    <>
                        <div className="hc-sheet-head">
                            <Swatch id={post.client} />
                            <button type="button" className="hc-icon" aria-label="Close post" onClick={closeSheet}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="hc-sheet-body">
                            <span className="hc-label">
                                {post.channel} · {DAYS[post.day]} at {post.time}
                            </span>
                            <h2>{post.title}</h2>
                            <div className="hc-proof" style={swatch(post.client)}>
                                <span className="hc-label">The copy</span>
                                {post.copy}
                            </div>
                            <dl className="hc-facts">
                                <div>
                                    <dt>Status</dt>
                                    <dd>{post.state}</dd>
                                </div>
                                <div>
                                    <dt>{post.state === 'Published' ? 'Result' : 'Note'}</dt>
                                    <dd>{post.stat}</dd>
                                </div>
                            </dl>
                            {post.id === 'p11' && post.state === 'Needs you' && (
                                <button
                                    type="button"
                                    className="hc-btn primary"
                                    onClick={() => {
                                        approve('d2');
                                        closeSheet();
                                    }}
                                >
                                    Approve and schedule
                                </button>
                            )}
                            {post.id === 'p13' && <p className="hc-sheet-note">Held until Juno &amp; Reed have seen it. Nothing goes out before then.</p>}
                        </div>
                    </>
                )}
            </Sheet>
            <ToastHost toast={toast} clear={clear} className="hc-toast" />
        </div>
    );
};

export default AgencyBPage;
