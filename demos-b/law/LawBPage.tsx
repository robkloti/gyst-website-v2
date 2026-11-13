import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, Pause, Play, X } from 'lucide-react';
import { DEADLINES, DECISIONS, DRAFTS, FEED, HOURS, INTAKE, MATTERS, STAGES, Stage } from '../../demos/law/data';
import { Count, GystCredit, Sheet, ToastHost, clockLabel, useDemoHead, useLiveFeed, useNarrow, useToast, withApprovals } from '../kit';
import { CSS } from './styles';

const FONTS = 'family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500';
const START = 8 * 60 + 5;
const ROMAN = ['i', 'ii', 'iii'];
const LEADS: Record<string, string> = { EM: 'Eleanor Marlowe', RT: 'Rafael Tennant', JW: 'Jonah Whitfield', AC: 'Amara Cole' };

// The Raman intake and the first chief-of-staff decision are the same act, so they share one approval.
const keyOf = (id: string) => (id === 'i1' ? 'm1' : id);
const tone = (score: number, paper = false) => (score >= 80 ? (paper ? 'var(--p-good)' : 'var(--good)') : score >= 40 ? (paper ? 'var(--p-brass)' : 'var(--brass)') : paper ? 'var(--p-bad)' : 'var(--bad)');
const hrs = (tenths: number) => (tenths / 10).toFixed(1);

const LawBPage: React.FC = () => {
    useDemoHead('law-b', 'Marlowe Tennant LLP - Chambers', FONTS, 'oklch(.185 .024 165)');
    const narrow = useNarrow(1100);
    const feed = useLiveFeed(FEED, START, 6, 5400);
    const { toast, show, clear } = useToast();

    const [approved, setApproved] = useState<Record<string, string>>({});
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const [tab, setTab] = useState<'intake' | 'drafts'>('intake');
    const [sel, setSel] = useState('i1');
    const [sheet, setSheet] = useState(false);
    const [stage, setStage] = useState<Stage | 'all'>('all');

    const doneText = (key: string) => DECISIONS.find((d) => d.id === key)?.done ?? INTAKE.find((i) => i.id === key)?.done ?? DRAFTS.find((d) => d.id === key)!.done;
    const approve = (id: string) => {
        const key = keyOf(id);
        setApproved((a) => ({ ...a, [key]: clockLabel(feed.now) }));
        setAnchors((a) => ({ ...a, [key]: feed.items[0].key }));
        show(doneText(key), () => setApproved(({ [key]: _, ...rest }) => rest));
    };
    const closeSheet = useCallback(() => setSheet(false), []);
    const pick = (id: string) => {
        setSel(id);
        if (narrow) setSheet(true);
    };

    const waiting = DECISIONS.filter((d) => !approved[d.id]).length;
    const draftsLeft = DRAFTS.filter((d) => !approved[d.id]).length;
    const billed = HOURS.reduce((s, h) => s + Math.round(h.h * 10) + (approved.m2 ? Math.round(h.found * 10) : 0), 0);
    const target = HOURS.reduce((s, h) => s + h.target, 0);
    const matters = MATTERS.filter((m) => stage === 'all' || m.stage === stage);

    const agentOf = (key: string) => DECISIONS.find((d) => d.id === key)?.agent ?? (key.startsWith('i') ? 'Intake Agent' : DRAFTS.find((d) => d.id === key)!.by);
    const feedItems = withApprovals(
        feed.items,
        Object.keys(approved).map((key) => ({ id: key, who: `Eleanor + ${agentOf(key)}`, text: doneText(key), time: approved[key], after: anchors[key] }))
    );

    const foot = (id: string, label: string) => {
        const ok = approved[keyOf(id)];
        return (
            <div className="mt-paper-foot">
                {ok ? (
                    <p className="mt-ok">
                        <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                        <span>
                            {doneText(keyOf(id))} Approved {ok}.
                        </span>
                    </p>
                ) : (
                    <>
                        <button type="button" className="mt-btn" onClick={() => approve(id)}>
                            {label}
                        </button>
                        <span>Nothing leaves chambers until you approve it.</span>
                    </>
                )}
            </div>
        );
    };

    const gutter = (
        <div className="mt-gutter" aria-hidden="true">
            {Array.from({ length: 60 }, (_, i) => (
                <span key={i}>{i + 1}</span>
            ))}
        </div>
    );

    const pane = () => {
        const intake = INTAKE.find((i) => i.id === sel);
        const draft = DRAFTS.find((d) => d.id === sel);
        if (intake)
            return (
                <article className="mt-paper" aria-label={`Intake memo, ${intake.name}`}>
                    <div className="mt-paper-in">
                        {gutter}
                        <span className="mt-label">
                            Intake memo · {intake.type} · {intake.got}
                        </span>
                        <h3>{intake.name}</h3>
                        <div className="mt-verdict" style={{ '--tone': tone(intake.score, true) } as React.CSSProperties}>
                            <b>{intake.score}</b>
                            <span>{intake.verdict}</span>
                        </div>
                        <h4>In their words</h4>
                        <blockquote>&ldquo;{intake.words}&rdquo;</blockquote>
                        <h4>Why it scored {intake.score}</h4>
                        <ol className="mt-reasons">
                            {intake.reasons.map((r) => (
                                <li key={r}>
                                    <span>{r}</span>
                                </li>
                            ))}
                        </ol>
                        <h4>Conflict check</h4>
                        <p className={`mt-check ${intake.conflict.startsWith('Clear') ? 'ok' : 'warn'}`}>
                            {intake.conflict.startsWith('Clear') ? <Check size={15} strokeWidth={2.4} aria-hidden="true" /> : <AlertTriangle size={15} aria-hidden="true" />}
                            <span>{intake.conflict}</span>
                        </p>
                        <h4>Fee</h4>
                        <p>{intake.value}</p>
                    </div>
                    {foot(intake.id, intake.score < 40 ? 'Approve the referral note' : 'Approve the next step')}
                </article>
            );
        if (draft)
            return (
                <article className="mt-paper mt-doc" aria-label={`${draft.title}, ${draft.matter}`}>
                    <div className="mt-paper-in">
                        {gutter}
                        <div className="mt-margin">
                            <b>
                                {draft.by} · {draft.pages} pages · {draft.when}
                            </b>
                            {draft.flag}
                        </div>
                        <div className="mt-caption">{draft.matter}</div>
                        <h3 className="mt-doc-title">{draft.title}</h3>
                        {draft.body.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>
                    {foot(draft.id, 'Approve this draft')}
                </article>
            );
        return null;
    };

    return (
        <div className="mt">
            <style>{CSS}</style>
            <div className="mt-shell">
                <aside className="mt-side">
                    <div className="mt-brand">
                        <b>Marlowe Tennant</b>
                        <span>LLP · Chambers</span>
                    </div>
                    <div className="mt-side-meta">
                        <span className="mt-demo">Demo. Sample data.</span>
                        <p className="mt-date">
                            Friday 13 November<b>{clockLabel(feed.now)}</b>
                        </p>
                    </div>
                    <ul className="mt-brief" aria-label="The day in brief">
                        <li>
                            <span className="mt-label">Enquiries screened</span>
                            <b>
                                {INTAKE.length}
                                <small>since Tuesday</small>
                            </b>
                            <p>Two strong fits. One to refer out.</p>
                        </li>
                        <li>
                            <span className="mt-label">Drafts for your eye</span>
                            <b>
                                <Count value={draftsLeft} format={String} />
                                <small>of {DRAFTS.length}</small>
                            </b>
                            <p>{draftsLeft === 0 ? 'All four are approved.' : 'A motion, a demand and two letters.'}</p>
                        </li>
                        <li>
                            <span className="mt-label">Next deadline</span>
                            <b>
                                {DEADLINES[0].day}
                                <small>
                                    {DEADLINES[0].mon}, {DEADLINES[0].left.toLowerCase()}
                                </small>
                            </b>
                            <p>
                                {DEADLINES[0].matter}: {DEADLINES[0].what.toLowerCase()}.
                            </p>
                        </li>
                        <li>
                            <span className="mt-label">Billed this week</span>
                            <b>
                                <Count value={billed} format={hrs} />
                                <small>of {target} h</small>
                            </b>
                            <p>{approved.m2 ? '9.6 recovered hours are in.' : '9.6 more hours found, not yet entered.'}</p>
                        </li>
                    </ul>
                </aside>

                <main className="mt-main">
                    <div className="mt-hello mt-in">
                        <h1>
                            Good morning, Eleanor. <em>{waiting === 0 ? 'Your desk is clear.' : `${waiting === 3 ? 'Three matters need' : waiting === 2 ? 'Two matters need' : 'One matter needs'} your signature.`}</em>
                        </h1>
                    </div>

                    <section className="mt-sec mt-in" style={{ '--i': 1 } as React.CSSProperties} aria-labelledby="mt-sign-h">
                        <div className="mt-head">
                            <h2 id="mt-sign-h">For signature</h2>
                            <div className="mt-meta">
                                <span className="mt-label">{waiting === 0 ? 'Chief of staff. All clear' : `Chief of staff. ${waiting} of ${DECISIONS.length} waiting`}</span>
                            </div>
                        </div>
                        {DECISIONS.map((d, i) => {
                            const ok = approved[d.id];
                            return (
                                <article key={d.id} className={`mt-sign ${ok ? 'done' : ''}`}>
                                    <i aria-hidden="true">{ROMAN[i]}.</i>
                                    <div>
                                        <span className="mt-label">{d.agent}</span>
                                        <h3>{d.title}</h3>
                                        {ok ? (
                                            <p className="mt-ok">
                                                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                                                <span>{d.done}</span>
                                            </p>
                                        ) : (
                                            <p>{d.why}</p>
                                        )}
                                    </div>
                                    <div>
                                        {ok ? (
                                            <span className="mt-stamp">Approved {ok}</span>
                                        ) : (
                                            <button type="button" className="mt-btn primary" onClick={() => approve(d.id)}>
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    <section className="mt-sec mt-in" style={{ '--i': 2 } as React.CSSProperties} aria-labelledby="mt-room-h">
                        <div className="mt-head">
                            <h2 id="mt-room-h">Reading room</h2>
                            <div className="mt-meta">
                                <div className="mt-tabs" role="tablist" aria-label="Intake or drafts">
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={tab === 'intake'}
                                        onClick={() => {
                                            setTab('intake');
                                            setSel(INTAKE[0].id);
                                        }}
                                    >
                                        New enquiries <i>{INTAKE.length}</i>
                                    </button>
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={tab === 'drafts'}
                                        onClick={() => {
                                            setTab('drafts');
                                            setSel(DRAFTS[0].id);
                                        }}
                                    >
                                        Drafts to review <i>{DRAFTS.length}</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-room" role="tabpanel">
                            <div>
                                {tab === 'intake'
                                    ? INTAKE.map((it) => (
                                          <button key={it.id} type="button" className="mt-item" aria-current={sel === it.id} aria-label={`${it.name}, ${it.type}, score ${it.score}, ${it.verdict}`} onClick={() => pick(it.id)}>
                                              <h3>{it.name}</h3>
                                              <small>
                                                  {it.type}. {it.verdict}.
                                              </small>
                                              <small className="mt-when">{it.got}</small>
                                              {approved[keyOf(it.id)] ? (
                                                  <span className="mt-tick">
                                                      <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                                                      Sent
                                                  </span>
                                              ) : (
                                                  <span className="mt-score" style={{ '--v': it.score, '--tone': tone(it.score) } as React.CSSProperties}>
                                                      <span>{it.score}</span>
                                                  </span>
                                              )}
                                          </button>
                                      ))
                                    : DRAFTS.map((d) => (
                                          <button key={d.id} type="button" className="mt-item" aria-current={sel === d.id} aria-label={`${d.title}, ${d.matter}`} onClick={() => pick(d.id)}>
                                              <h3>{d.title}</h3>
                                              <small>{d.matter}</small>
                                              <small className="mt-when">
                                                  {d.by} · {d.when}
                                              </small>
                                              {approved[d.id] ? (
                                                  <span className="mt-tick">
                                                      <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                                                      Approved
                                                  </span>
                                              ) : (
                                                  <span className="mt-pages">{d.pages} pp</span>
                                              )}
                                          </button>
                                      ))}
                            </div>
                            {!narrow && pane()}
                        </div>
                    </section>

                    <section className="mt-sec mt-in" style={{ '--i': 3 } as React.CSSProperties} aria-labelledby="mt-docket-h">
                        <div className="mt-head">
                            <h2 id="mt-docket-h">The docket</h2>
                            <div className="mt-meta">
                                <div className="mt-tabs" role="group" aria-label="Filter matters by stage">
                                    <button type="button" aria-pressed={stage === 'all'} onClick={() => setStage('all')}>
                                        All <i>{MATTERS.length}</i>
                                    </button>
                                    {STAGES.map((s) => (
                                        <button key={s} type="button" aria-pressed={stage === s} onClick={() => setStage(s)}>
                                            {s} <i>{MATTERS.filter((m) => m.stage === s).length}</i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-row mt-rowhead mt-label" aria-hidden="true">
                            <span>Matter</span>
                            <span>Type</span>
                            <span>Lead</span>
                            <span>Stage</span>
                            <span>Next</span>
                        </div>
                        {matters.map((m) => {
                            const at = STAGES.indexOf(m.stage);
                            return (
                                <div className="mt-row" key={m.name}>
                                    <h3>{m.name}</h3>
                                    <span>{m.type}</span>
                                    <span className="mt-lead" title={LEADS[m.lead]} aria-label={`Lead: ${LEADS[m.lead]}`}>
                                        {m.lead}
                                    </span>
                                    <div className="mt-track">
                                        <div aria-hidden="true">
                                            {STAGES.map((s, i) => (
                                                <i key={s} className={i <= at ? 'on' : ''} />
                                            ))}
                                        </div>
                                        <small>{m.stage}</small>
                                    </div>
                                    <span>{m.name.startsWith('Morrow') && approved.m3 ? 'Extension requested. Opposition brief was due 20 Nov' : m.next}</span>
                                </div>
                            );
                        })}
                    </section>

                    <div className="mt-pair">
                        <section className="mt-sec mt-in" style={{ '--i': 4 } as React.CSSProperties} aria-labelledby="mt-dl-h">
                            <div className="mt-head">
                                <h2 id="mt-dl-h">Deadlines</h2>
                                <div className="mt-meta">
                                    <span className="mt-label">Next 30 days</span>
                                </div>
                            </div>
                            {DEADLINES.map((d) => {
                                const req = d.matter === 'Morrow' && approved.m3;
                                return (
                                    <div className="mt-dl" key={d.matter}>
                                        <div className="mt-dl-date">
                                            <b>{d.day}</b>
                                            <span>{d.mon}</span>
                                        </div>
                                        <h3>
                                            {d.matter}: {d.what}
                                        </h3>
                                        <small>
                                            {d.left}. {d.basis}.
                                        </small>
                                        <span className={`mt-dl-state ${req ? 'req' : d.ok ? '' : 'no'}`}>
                                            {req || d.ok ? <Check size={14} strokeWidth={2.4} aria-hidden="true" /> : <AlertTriangle size={14} aria-hidden="true" />}
                                            {req ? 'Extension requested' : d.state}
                                        </span>
                                    </div>
                                );
                            })}
                        </section>

                        <section className="mt-sec mt-in" style={{ '--i': 5 } as React.CSSProperties} aria-labelledby="mt-hr-h">
                            <div className="mt-head">
                                <h2 id="mt-hr-h">Hours this week</h2>
                                <div className="mt-meta">
                                    <span className="mt-label">{approved.m2 ? 'Recovered hours entered' : 'Striped: found, not entered'}</span>
                                </div>
                            </div>
                            {HOURS.map((h) => {
                                const shown = approved.m2 ? h.h + h.found : h.h;
                                return (
                                    <div className="mt-hr" key={h.name}>
                                        <div className="mt-hr-top">
                                            <h3>{h.name}</h3>
                                            <span>{h.role}</span>
                                            <b>
                                                {shown.toFixed(1)} <small>/ {h.target}</small>
                                            </b>
                                        </div>
                                        <div className="mt-bar" role="img" aria-label={`${shown.toFixed(1)} of ${h.target} hours, ${h.found} found by the Timekeeper`}>
                                            <i style={{ width: `${(h.h / h.target) * 100}%` }} />
                                            <i className={`found ${approved.m2 ? 'in' : ''}`} style={{ width: `${(h.found / h.target) * 100}%` }} />
                                        </div>
                                        <p>
                                            Timekeeper found <b>{h.found} h</b> with no time entry.
                                        </p>
                                    </div>
                                );
                            })}
                        </section>
                    </div>
                </main>

                <section className="mt-logcol" aria-labelledby="mt-log-h">
                  <div className="mt-logstick">
                    <div className="mt-loghead">
                        <h2 id="mt-log-h">Clerks&rsquo; log</h2>
                        <span className="mt-fresh">
                            <i className={`mt-dot ${feed.running ? 'run' : ''}`} />
                            {feed.running ? 'Live' : feed.paused ? 'Paused' : `As of ${clockLabel(feed.now)}`}
                        </span>
                        <button type="button" className="mt-icon" style={{ margin: '-8px -10px -8px 0' }} aria-label={feed.paused ? 'Resume the log' : 'Pause the log'} onClick={() => feed.setPaused(!feed.paused)}>
                            {feed.paused ? <Play size={15} /> : <Pause size={15} />}
                        </button>
                    </div>
                    <ol className="mt-log" role="log" aria-live="polite" aria-label="Agent activity">
                        <AnimatePresence initial={false}>
                            {feedItems.slice(0, 8).map((f) => (
                                <motion.li key={f.key} layout className={f.you ? 'you' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}>
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

                <footer className="mt-foot">
                    <span>Marlowe Tennant LLP. Demo. Sample data, fictional clients and matters.</span>
                    <GystCredit slug="law-b" className="mt-credit" />
                </footer>
            </div>

            <Sheet open={narrow && sheet} onClose={closeSheet} label="Document" className="mt-sheet" scrimClassName="mt-scrim" duration={0.36}>
                <div className="mt-sheet-close">
                    <button type="button" aria-label="Close document" onClick={closeSheet}>
                        <X size={18} />
                    </button>
                </div>
                {pane()}
            </Sheet>
            <ToastHost toast={toast} clear={clear} className="mt-toast" />
        </div>
    );
};

export default LawBPage;
