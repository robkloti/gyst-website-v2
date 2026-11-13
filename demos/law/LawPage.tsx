import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { FeedList, FeedRow, GystBadge, useDemoPage, useLiveFeed } from '../shared';
import { DEADLINES, DECISIONS, DRAFTS, FEED, HOURS, INTAKE, MATTERS, STAGES, Stage } from './data';

const FONTS = 'family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600';
const CSS = `
html, body { background: #F7F4EC; }
::-webkit-scrollbar-track { background: #F7F4EC; }
::-webkit-scrollbar-thumb { background: #CFC7B4; }
.lw { font-family: "Hanken Grotesk", system-ui, sans-serif; }
.lw-s { font-family: "EB Garamond", Georgia, serif; }
.lw-c { font-family: "Hanken Grotesk", system-ui, sans-serif; text-transform: uppercase; letter-spacing: .14em; font-size: 10.5px; font-weight: 600; }
`;

const OX = '#7A2331';
const scoreTone = (n: number) => (n >= 80 ? '#2F6B4F' : n >= 50 ? '#9A7B3F' : '#8A8F9A');

const Head: React.FC<{ title: string; right?: React.ReactNode }> = ({ title, right }) => (
    <div className="flex items-baseline justify-between gap-3 pb-2.5 border-b border-[#1B2432]">
        <h2 className="lw-s text-[24px] font-medium leading-none">{title}</h2>
        {right}
    </div>
);

const LawPage: React.FC = () => {
    useDemoPage('law', 'Chambers | Marlowe Tennant LLP | Demo dashboard by GYST', FONTS);
    const [tab, setTab] = useState<'intake' | 'drafts'>('intake');
    const [sel, setSel] = useState('i1');
    const [stage, setStage] = useState<Stage | 'All'>('All');
    const [resolved, setResolved] = useState<Record<string, string>>({});
    const [feed, log] = useLiveFeed(FEED, '8:14');
    const pane = useRef<HTMLDivElement>(null);

    const intake = INTAKE.find((x) => x.id === sel);
    const draft = DRAFTS.find((x) => x.id === sel);
    const pendingDecisions = DECISIONS.filter((d) => !resolved[d.id]);
    const found = resolved.m2 ? 9.6 : 0;
    const total = HOURS.reduce((s, h) => s + h.h, 0) + found;
    const left = { intake: INTAKE.filter((x) => !resolved[x.id]).length, drafts: DRAFTS.filter((x) => !resolved[x.id]).length };

    const pick = (id: string) => {
        setSel(id);
        if (window.innerWidth < 1024) pane.current?.scrollIntoView({ block: 'start' });
    };
    const swap = (t: 'intake' | 'drafts') => { setTab(t); setSel(t === 'intake' ? 'i1' : 'd1'); };
    const resolve = (id: string, text: string) => {
        setResolved((r) => ({ ...r, [id]: text }));
        log('Eleanor', text);
        // The first decision and the first intake are the same call.
        if (id === 'm1') setResolved((r) => ({ ...r, i1: INTAKE[0].done }));
        if (id === 'i1') setResolved((r) => ({ ...r, m1: DECISIONS[0].done }));
    };
    const matters = MATTERS.filter((m) => stage === 'All' || m.stage === stage);

    return (
        <div className="lw min-h-screen bg-[#F7F4EC] text-[#1B2432] text-[14px] pb-20">
            <style>{CSS}</style>
            <div className="border-b border-[#DDD6C6] bg-[#FFFEFB]">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-8 h-[68px] flex items-center gap-6">
                    <div className="shrink-0">
                        <div className="lw-s text-[23px] font-medium leading-none tracking-[.01em]">Marlowe Tennant <span className="text-[15px] italic text-[#6E7280]">LLP</span></div>
                        <div className="lw-c text-[#9A7B3F] mt-1.5 !text-[9.5px]">Chambers</div>
                    </div>
                    <nav className="hidden lg:flex items-center gap-7 mx-auto text-[14px]" aria-label="Sections">
                        {[['#desk', 'Desk'], ['#matters', 'Matters'], ['#deadlines', 'Deadlines'], ['#time', 'Time']].map(([h, l], i) => (
                            <a key={h} href={h} className={`no-underline py-1 border-b ${i === 0 ? 'border-[#7A2331] text-[#1B2432]' : 'border-transparent text-[#6E7280] hover:text-[#1B2432]'}`}>{l}</a>
                        ))}
                    </nav>
                    <div className="ml-auto lg:ml-0 flex items-center gap-4">
                        <span className="lw-c text-[#6E7280] border border-[#DDD6C6] px-2 py-1 !text-[9.5px] whitespace-nowrap">Demo. Sample data.</span>
                        <span className="hidden md:inline lw-s italic text-[16px] text-[#6E7280]">Friday, 13 November</span>
                        <span className="hidden sm:grid place-items-center w-9 h-9 rounded-full border border-[#1B2432] lw-s text-[15px]">EM</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
                <section className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end py-9 md:py-12">
                    <div>
                        <div className="lw-c text-[#7A2331]">Morning memorandum, 8:14 AM</div>
                        <h1 className="lw-s text-[40px] md:text-[54px] font-normal leading-[1.05] tracking-[-.01em] mt-3">Good morning, Eleanor.</h1>
                        <p className="lw-s text-[20px] md:text-[23px] leading-[1.45] text-[#3A4250] mt-4 max-w-[760px]">
                            Five people wrote to the firm since Tuesday and two are strong fits. The motion to compel in <i>Ashby</i> is drafted and due tomorrow. The team has logged {total.toFixed(1)} hours this week{found ? ', including the 9.6 the Timekeeper recovered' : ', and the Timekeeper found 9.6 more that nobody recorded'}.
                        </p>
                    </div>
                    <dl className="grid grid-cols-3 lg:grid-cols-1 gap-x-6 gap-y-3 lg:text-right lg:border-l lg:border-[#DDD6C6] lg:pl-8">
                        {[[`${left.intake}`, 'enquiries to decide'], [`${left.drafts}`, 'drafts awaiting you'], [`${pendingDecisions.length}`, 'decisions held']].map(([n, l]) => (
                            <div key={l}>
                                <dt className="lw-s text-[34px] leading-none">{n}</dt>
                                <dd className="text-[12.5px] text-[#6E7280] mt-1">{l}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-10 gap-y-12">
                    <section id="desk" className="xl:col-span-8 scroll-mt-6">
                        <div className="flex items-end justify-between gap-3 border-b border-[#1B2432]" role="tablist">
                            <div className="flex gap-7">
                                {([['intake', 'Intake queue'], ['drafts', 'Drafts for review']] as const).map(([id, l]) => (
                                    <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => swap(id)} className={`lw-s text-[24px] font-medium leading-none pb-2.5 border-b-2 -mb-px ${tab === id ? 'border-[#7A2331] text-[#1B2432]' : 'border-transparent text-[#9A9DA6] hover:text-[#1B2432]'}`}>
                                        {l} <sup className="lw text-[11px] font-semibold text-[#7A2331]">{left[id]}</sup>
                                    </button>
                                ))}
                            </div>
                            <span className="hidden sm:block text-[12.5px] text-[#6E7280] pb-2.5">{tab === 'intake' ? 'Scored by the Intake Agent' : 'Written by the firm’s agents'}</span>
                        </div>
                        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] bg-[#FFFEFB] border border-t-0 border-[#DDD6C6]">
                            <ul className="lg:border-r border-b lg:border-b-0 border-[#DDD6C6] divide-y divide-[#EAE4D6]">
                                {tab === 'intake' && INTAKE.map((x) => (
                                    <li key={x.id}>
                                        <button type="button" onClick={() => pick(x.id)} aria-current={sel === x.id} className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 ${sel === x.id ? 'bg-[#F7F4EC]' : 'hover:bg-[#FBF9F3]'}`}>
                                            <span className="lw-s text-[28px] leading-none w-9 text-center shrink-0" style={{ color: scoreTone(x.score) }}>{x.score}</span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-[14.5px] font-semibold truncate">{x.name}</span>
                                                <span className="block text-[13px] text-[#6E7280] truncate">{x.type}</span>
                                            </span>
                                            {resolved[x.id] ? <Check size={15} className="text-[#2F6B4F] shrink-0" /> : sel === x.id && <span className="w-1.5 h-1.5 rounded-full bg-[#7A2331] shrink-0" />}
                                        </button>
                                    </li>
                                ))}
                                {tab === 'drafts' && DRAFTS.map((x) => (
                                    <li key={x.id}>
                                        <button type="button" onClick={() => pick(x.id)} aria-current={sel === x.id} className={`w-full text-left flex items-center gap-3 px-4 py-3.5 ${sel === x.id ? 'bg-[#F7F4EC]' : 'hover:bg-[#FBF9F3]'}`}>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-[14.5px] font-semibold truncate">{x.title}</span>
                                                <span className="block lw-s italic text-[15px] text-[#6E7280] truncate">{x.matter}</span>
                                                <span className="block text-[12px] text-[#9A9DA6] mt-0.5">{x.pages} pages · {x.when}</span>
                                            </span>
                                            {resolved[x.id] ? <Check size={15} className="text-[#2F6B4F] shrink-0" /> : sel === x.id && <span className="w-1.5 h-1.5 rounded-full bg-[#7A2331] shrink-0" />}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div ref={pane} className="p-5 sm:p-7 min-h-[430px] scroll-mt-4">
                                {intake && (
                                    <>
                                        <div className="flex items-start justify-between gap-5">
                                            <div>
                                                <div className="lw-c text-[#6E7280]">{intake.got}</div>
                                                <h3 className="lw-s text-[32px] leading-tight mt-1.5">{intake.name}</h3>
                                                <div className="text-[14.5px] text-[#6E7280]">{intake.type} · {intake.value}</div>
                                            </div>
                                            <div className="text-center shrink-0">
                                                <div className="lw-s text-[52px] leading-none" style={{ color: scoreTone(intake.score) }}>{intake.score}</div>
                                                <div className="lw-c mt-1" style={{ color: scoreTone(intake.score) }}>{intake.verdict}</div>
                                            </div>
                                        </div>
                                        <blockquote className="lw-s italic text-[19px] leading-[1.5] text-[#3A4250] border-l-2 border-[#9A7B3F] pl-4 mt-5">&ldquo;{intake.words}&rdquo;</blockquote>
                                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-6">
                                            <div>
                                                <div className="lw-c text-[#6E7280]">Why it scored {intake.score}</div>
                                                <ol className="mt-2 grid gap-1.5 text-[14px] leading-relaxed list-none p-0">
                                                    {intake.reasons.map((r, i) => <li key={r} className="grid grid-cols-[18px_1fr]"><span className="lw-s italic text-[#9A7B3F]">{i + 1}.</span>{r}</li>)}
                                                </ol>
                                            </div>
                                            <div>
                                                <div className="lw-c text-[#6E7280]">Conflict check</div>
                                                <p className={`mt-2 text-[14px] leading-relaxed ${intake.conflict.startsWith('Clear') ? '' : 'text-[#7A2331]'}`}>{intake.conflict}</p>
                                            </div>
                                        </div>
                                        <div className="mt-7 pt-5 border-t border-[#EAE4D6]">
                                            {resolved[intake.id] ? (
                                                <div className="flex items-start gap-2 text-[14.5px] text-[#2F6B4F]"><Check size={17} className="shrink-0 mt-0.5" />{resolved[intake.id]}</div>
                                            ) : (
                                                <div className="flex flex-wrap gap-2.5">
                                                    <button type="button" onClick={() => resolve(intake.id, intake.done)} className="h-10 px-5 bg-[#1B2432] text-[#FFFEFB] text-[14px] font-medium hover:bg-[#2A3546]">{intake.score < 50 ? 'Approve the referral note' : 'Approve and send the letter'}</button>
                                                    <button type="button" onClick={() => resolve(intake.id, `Held ${intake.name} for the Monday intake meeting.`)} className="h-10 px-5 border border-[#1B2432] text-[14px] font-medium hover:bg-[#F7F4EC]">Hold for Monday</button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                {draft && (
                                    <>
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <div className="lw-c text-[#6E7280]">{draft.by} · {draft.when} · {draft.pages} pages</div>
                                            <div className="lw-c text-[#9A7B3F]">Page 1 of {draft.pages}</div>
                                        </div>
                                        <div className="mt-4 bg-white border border-[#EAE4D6] shadow-[0_1px_0_#EAE4D6,0_14px_30px_-22px_rgba(27,36,50,.35)] px-6 sm:px-10 py-8">
                                            <div className="lw-s text-center text-[13px] tracking-[.18em] uppercase text-[#6E7280]">{draft.matter}</div>
                                            <h3 className="lw-s text-center text-[25px] font-medium leading-tight mt-2">{draft.title}</h3>
                                            <div className="w-10 h-px bg-[#9A7B3F] mx-auto my-5" />
                                            {draft.body.map((p) => <p key={p} className="lw-s text-[17.5px] leading-[1.6] text-[#2A3340] mt-3 first:mt-0 indent-6">{p}</p>)}
                                        </div>
                                        <p className="mt-4 text-[14px] text-[#3A4250]"><span className="lw-c text-[#7A2331] mr-2">Note</span>{draft.flag}</p>
                                        <div className="mt-5 pt-5 border-t border-[#EAE4D6]">
                                            {resolved[draft.id] ? (
                                                <div className="flex items-start gap-2 text-[14.5px] text-[#2F6B4F]"><Check size={17} className="shrink-0 mt-0.5" />{resolved[draft.id]}</div>
                                            ) : (
                                                <div className="flex flex-wrap gap-2.5">
                                                    <button type="button" onClick={() => resolve(draft.id, draft.done)} className="h-10 px-5 bg-[#1B2432] text-[#FFFEFB] text-[14px] font-medium hover:bg-[#2A3546]">Approve</button>
                                                    <button type="button" onClick={() => resolve(draft.id, `Returned “${draft.title}” to the ${draft.by} with notes.`)} className="h-10 px-5 border border-[#1B2432] text-[14px] font-medium hover:bg-[#F7F4EC]">Return with notes</button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="xl:col-span-4">
                        <Head title="From your chief of staff" right={<span className="lw-c text-[#7A2331]">{pendingDecisions.length} held</span>} />
                        <p className="lw-s text-[18px] leading-[1.5] text-[#3A4250] mt-4">
                            Overnight the agents answered two enquiries, ran three conflict checks, finished one motion and read this morning&rsquo;s court notices. These three are yours to decide.
                        </p>
                        <ul className="mt-4 divide-y divide-[#DDD6C6] border-y border-[#DDD6C6]">
                            {DECISIONS.map((d, i) => (
                                <li key={d.id} className="grid grid-cols-[26px_minmax(0,1fr)] py-4">
                                    <span className="lw-s italic text-[20px] text-[#9A7B3F] leading-tight">{i + 1}.</span>
                                    <div>
                                        <div className={`text-[15px] font-semibold leading-snug ${resolved[d.id] ? 'text-[#6E7280]' : ''}`}>{d.title}</div>
                                        {resolved[d.id] ? (
                                            <div className="flex items-start gap-1.5 text-[13.5px] text-[#2F6B4F] mt-1.5"><Check size={15} className="shrink-0 mt-0.5" />{resolved[d.id]}</div>
                                        ) : (
                                            <>
                                                <p className="text-[13.5px] text-[#6E7280] leading-relaxed mt-1">{d.why}</p>
                                                <div className="flex items-center gap-4 mt-2.5">
                                                    <button type="button" onClick={() => resolve(d.id, d.done)} className="h-8 px-4 text-[13.5px] font-medium text-[#FFFEFB] hover:opacity-90" style={{ background: OX }}>Approve</button>
                                                    <span className="lw-c text-[#9A9DA6]">{d.agent}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="matters" className="xl:col-span-8 scroll-mt-6">
                        <Head title="Matters by stage" right={<span className="text-[12.5px] text-[#6E7280]">{MATTERS.length} open</span>} />
                        <div className="grid grid-cols-3 sm:grid-cols-6 border-b border-[#DDD6C6]" role="group" aria-label="Filter matters by stage">
                            {(['All', ...STAGES] as const).map((s) => {
                                const n = s === 'All' ? MATTERS.length : MATTERS.filter((m) => m.stage === s).length;
                                return (
                                    <button key={s} type="button" onClick={() => setStage(s)} aria-pressed={stage === s} className={`text-left px-3 py-3 border-b-2 -mb-px ${stage === s ? 'border-[#7A2331] bg-[#FFFEFB]' : 'border-transparent hover:bg-[#FFFEFB]'}`}>
                                        <span className="block lw-s text-[28px] leading-none">{n}</span>
                                        <span className={`block text-[12.5px] mt-1 ${stage === s ? 'text-[#7A2331] font-semibold' : 'text-[#6E7280]'}`}>{s}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <ul className="divide-y divide-[#EAE4D6]">
                            {matters.map((m) => (
                                <li key={m.name} className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1.2fr)_110px_minmax(0,1fr)_32px] items-baseline gap-x-5 py-2.5">
                                    <span className="min-w-0"><span className="lw-s italic text-[18px]">{m.name}</span> <span className="text-[13px] text-[#6E7280] whitespace-nowrap">{m.type}</span></span>
                                    <span className="lw-c text-[#9A7B3F] text-right md:text-left">{m.stage}</span>
                                    <span className="text-[13.5px] text-[#3A4250] col-span-2 md:col-span-1">{m.next}</span>
                                    <span className="hidden md:block lw-c text-[#6E7280] text-right">{m.lead}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="deadlines" className="xl:col-span-4 scroll-mt-6">
                        <Head title="Deadlines" right={<span className="text-[12.5px] text-[#6E7280]">Kept by the Docket Clerk</span>} />
                        <ul className="divide-y divide-[#EAE4D6]">
                            {DEADLINES.map((d) => (
                                <li key={d.matter} className="grid grid-cols-[46px_minmax(0,1fr)_auto] gap-x-4 py-3.5 items-start">
                                    <div className="text-center border border-[#DDD6C6] bg-[#FFFEFB] py-1">
                                        <div className="lw-s text-[22px] leading-none">{d.day}</div>
                                        <div className="lw-c !text-[9px] text-[#7A2331] mt-0.5">{d.mon}</div>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[14.5px] font-semibold leading-snug"><i className="lw-s text-[17px] font-normal">{d.matter}</i>: {d.what}</div>
                                        <div className="text-[12.5px] text-[#6E7280] mt-0.5">{d.basis}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[13px] font-semibold whitespace-nowrap">{d.left}</div>
                                        <div className={`text-[12.5px] whitespace-nowrap ${d.ok ? 'text-[#2F6B4F]' : 'text-[#7A2331]'}`}>{resolved.m3 && d.matter === 'Morrow' ? 'Extension asked' : resolved.d1 && d.matter === 'Ashby' ? 'Approved to file' : d.state}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="time" className="xl:col-span-8 scroll-mt-6">
                        <Head title="Billable hours, this week" right={<span className="text-[12.5px] text-[#6E7280]"><b className="lw-s text-[19px] font-medium text-[#1B2432]">{total.toFixed(1)}</b> of 150 hours</span>} />
                        <ul className="divide-y divide-[#EAE4D6]">
                            {HOURS.map((h) => {
                                const hrs = h.h + (found ? h.found : 0);
                                return (
                                    <li key={h.name} className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[210px_minmax(0,1fr)_150px] items-center gap-x-6 gap-y-2 py-3.5">
                                        <div>
                                            <div className="text-[14.5px] font-semibold">{h.name}</div>
                                            <div className="text-[12.5px] text-[#6E7280]">{h.role}</div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1 md:order-none order-last relative h-[7px] bg-[#EAE4D6]" role="img" aria-label={`${hrs.toFixed(1)} of ${h.target} hours`}>
                                            <div className="absolute inset-y-0 left-0 bg-[#1B2432]" style={{ width: `${Math.min(100, (h.h / h.target) * 100)}%` }} />
                                            <div className="absolute inset-y-0 transition-all duration-500" style={{ left: `${(h.h / h.target) * 100}%`, width: `${Math.min(100 - (h.h / h.target) * 100, (h.found / h.target) * 100)}%`, background: found ? '#9A7B3F' : 'repeating-linear-gradient(135deg,#9A7B3F 0 2px,transparent 2px 5px)' }} />
                                        </div>
                                        <div className="text-right">
                                            <span className="lw-s text-[22px]">{hrs.toFixed(1)}</span><span className="text-[12.5px] text-[#6E7280]"> / {h.target}</span>
                                            <div className="text-[12px] text-[#9A7B3F]">{found ? `includes ${h.found} recovered` : `${h.found} found, not yet added`}</div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="xl:col-span-4">
                        <Head title="The record" right={<span className="flex items-center gap-1.5 text-[12.5px] text-[#2F6B4F]"><i className="w-1.5 h-1.5 rounded-full bg-[#2F6B4F]" />Six agents at work</span>} />
                        <FeedList className="divide-y divide-[#EAE4D6]">
                            {feed.slice(0, 6).map((f) => (
                                <FeedRow key={f.key} className="py-3">
                                    <div className="flex items-baseline justify-between gap-3">
                                        <span className="lw-c text-[#7A2331]">{f.who}</span>
                                        <span className="lw-s italic text-[14px] text-[#9A9DA6]">{f.time}</span>
                                    </div>
                                    <p className="text-[13.5px] leading-relaxed text-[#3A4250] mt-0.5">{f.text}</p>
                                </FeedRow>
                            ))}
                        </FeedList>
                    </section>
                </div>

                <p className="text-[12.5px] text-[#9A9DA6] mt-14 max-w-xl">Marlowe Tennant LLP is a made-up firm. Every client, matter and number on this page is sample data.</p>
            </div>
            <GystBadge slug="law" />
        </div>
    );
};

export default LawPage;
