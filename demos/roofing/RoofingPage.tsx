import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Check, ClipboardList, CloudHail, HardHat, Home, Package, X } from 'lucide-react';
import { Drawer, FeedList, FeedRow, GystBadge, useDemoPage, useLiveFeed } from '../shared';
import { CLAIMS, CREWS, DECISIONS, FEED, LEADS, ORDERS, STAGES } from './data';

const FONTS = 'family=Red+Hat+Display:wght@600;700;900&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500';
const CSS = `
html, body { background: #E8ECEE; }
::-webkit-scrollbar-track { background: #E8ECEE; }
::-webkit-scrollbar-thumb { background: #B4BEC5; }
.rf { font-family: "Red Hat Text", system-ui, sans-serif; }
.rf-d { font-family: "Red Hat Display", system-ui, sans-serif; letter-spacing: -.02em; }
.rf-m { font-family: "Red Hat Mono", ui-monospace, monospace; }
.rf-card { background: #fff; border: 1px solid #D5DCE1; border-radius: 10px; }
`;

const GREEN = '#1B7F5A';
const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const RAIL = [[Home, 'Storm desk', '#storm'], [ClipboardList, 'Claims', '#claims'], [HardHat, 'Crews', '#crews'], [Package, 'Materials', '#materials']] as const;
const FILTERS = ['All', 'Needs attention', 'Cole', 'Jess', 'Priya'];

const RoofingPage: React.FC = () => {
    useDemoPage('roofing', 'Slatewing Storm Desk | Demo dashboard by GYST', FONTS);
    const [filter, setFilter] = useState('All');
    const [openId, setOpenId] = useState<string | null>(null);
    const [moved, setMoved] = useState<Record<string, number>>({});
    const [approved, setApproved] = useState<string[]>([]);
    const [feed, log] = useLiveFeed(FEED, '7:40');

    const claims = CLAIMS.map((c) => ({
        ...c,
        stage: moved[c.id] ?? c.stage,
        flag: (c.id === 'c1' && approved.includes('r1')) || (c.id === 'c2' && approved.includes('r2')) ? undefined : c.flag,
        amount: c.id === 'c2' && approved.includes('r2') ? c.amount + 2318 : c.amount,
    }));
    const shown = claims.filter((c) => filter === 'All' || (filter === 'Needs attention' ? !!c.flag : c.rep === filter));
    const open = claims.find((c) => c.id === openId);
    const pending = DECISIONS.filter((d) => !approved.includes(d.id));
    const estOut = 64 + (approved.includes('r3') ? 9 : 0);
    const leadMax = Math.max(...LEADS.days.map((d) => d[1]));
    const leadTotal = LEADS.days.reduce((s, d) => s + d[1], 0);

    const approve = (id: string) => {
        setApproved((a) => [...a, id]);
        log('Tess', `Approved. ${DECISIONS.find((d) => d.id === id)!.done}`);
    };
    const advance = (id: string) => {
        const c = claims.find((x) => x.id === id)!;
        setMoved((m) => ({ ...m, [id]: c.stage + 1 }));
        log('Claims', `${c.name} moved to ${STAGES[c.stage + 1]}.`);
    };

    return (
        <div className="rf min-h-screen bg-[#E8ECEE] text-[#15222C] text-[14px] lg:pl-[68px] pb-20">
            <style>{CSS}</style>

            <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[68px] flex-col items-center py-4 bg-[#15222C]">
                <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-[#1B7F5A] text-white" aria-label="Slatewing">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13 12 4l10 9" /><path d="M6 14.5 12 9l6 5.5" /><path d="M12 15v5" /></svg>
                </span>
                <nav className="grid gap-2 mt-8" aria-label="Sections">
                    {RAIL.map(([Icon, l, h], i) => (
                        <a key={h} href={h} title={l} aria-label={l} className={`grid place-items-center w-11 h-11 rounded-[10px] ${i === 0 ? 'bg-white/12 text-white' : 'text-[#8FA0AC] hover:text-white hover:bg-white/5'}`}><Icon size={20} strokeWidth={1.8} /></a>
                    ))}
                </nav>
                <span className="mt-auto grid place-items-center w-10 h-10 rounded-full bg-[#2B3B47] text-white rf-d text-[13px] font-bold">TA</span>
            </aside>

            <header className="flex items-center justify-between gap-3 px-4 sm:px-7 h-[60px] bg-white border-b border-[#D5DCE1]">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="lg:hidden grid place-items-center w-9 h-9 rounded-[9px] bg-[#1B7F5A] text-white shrink-0"><Home size={18} /></span>
                    <div className="min-w-0">
                        <div className="rf-d text-[19px] font-black leading-none truncate">Slatewing<span className="hidden sm:inline"> Roofing</span></div>
                        <div className="text-[12px] text-[#5F7180] mt-1">Storm Desk</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden md:flex items-center gap-2 text-[13px] text-[#5F7180]"><i className="w-2 h-2 rounded-full bg-[#1B7F5A]" />8 agents working</span>
                    <span className="hidden sm:inline rf-m text-[12px] text-[#5F7180]">Fri 13 Nov · 7:40 AM</span>
                    <span className="rf-m text-[10.5px] uppercase tracking-[.08em] text-[#5F7180] bg-[#E8ECEE] rounded-full px-2.5 py-1 whitespace-nowrap">Demo. Sample data.</span>
                </div>
            </header>

            <div className="px-4 sm:px-7 py-5 max-w-[1560px] mx-auto">
                <section id="storm" className="rounded-[14px] bg-[#15222C] text-white p-5 sm:p-7 grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-8 scroll-mt-4">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#7A5AF8]/20 text-[#C3B5FD] text-[12.5px] font-semibold px-3 py-1"><CloudHail size={15} />Hail event · Tuesday 10 Nov · stones up to 1.75 in</div>
                        <h1 className="rf-d text-[30px] sm:text-[40px] font-black leading-[1.05] mt-4">Day three after the storm, Tess. {leadTotal} leads in and every one has been answered.</h1>
                        <p className="text-[15.5px] leading-relaxed text-[#B8C4CD] mt-3 max-w-[620px]">1,284 roofs were in the path across three zip codes. The phone desk booked 14 inspections overnight, and four crews are on roofs today.</p>
                        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-6">
                            {[[`${leadTotal}`, 'storm leads'], ['87', 'inspections booked'], ['41', 'claims filed'], ['$684K', 'signed since Tuesday']].map(([n, l]) => (
                                <div key={l} className="border-l-2 border-[#1B7F5A] pl-3">
                                    <dt className="rf-d text-[30px] font-black leading-none">{n}</dt>
                                    <dd className="text-[12.5px] text-[#8FA0AC] mt-1.5">{l}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:border-l xl:border-white/10 xl:pl-8">
                        <div>
                            <div className="text-[12.5px] font-semibold text-[#8FA0AC]">Leads per day</div>
                            <div className="flex items-end gap-3 h-[150px] mt-3" role="img" aria-label="Leads per day since the storm">
                                {LEADS.days.map(([d, n], i) => (
                                    <div key={d} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
                                        <span className="rf-m text-[12px]">{n}</span>
                                        <span className="w-full rounded-t-[5px]" style={{ height: `${(n / leadMax) * 100}%`, background: i === 3 ? 'repeating-linear-gradient(135deg,#7A5AF8 0 5px,#6347D9 5px 10px)' : '#7A5AF8' }} />
                                        <span className="text-[12px] text-[#8FA0AC]">{d}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[12px] text-[#8FA0AC] mt-2">Friday so far, as of 7:40 AM</div>
                        </div>
                        <div>
                            <div className="text-[12.5px] font-semibold text-[#8FA0AC]">Where they came from</div>
                            <ul className="grid gap-3 mt-3">
                                {LEADS.sources.map(([s, n]) => (
                                    <li key={s}>
                                        <div className="flex justify-between text-[13.5px]"><span>{s}</span><span className="rf-m">{n}</span></div>
                                        <div className="h-1.5 rounded-full bg-white/10 mt-1.5"><div className="h-full rounded-full bg-[#3FBF8F]" style={{ width: `${(n / 71) * 100}%` }} /></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_350px] gap-4 mt-4 items-start">
                    <section id="claims" className="min-w-0 scroll-mt-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <h2 className="rf-d text-[22px] font-black">Insurance claims by stage</h2>
                            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter claims">
                                {FILTERS.map((f) => (
                                    <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`h-8 px-3 rounded-full text-[13px] font-medium border ${filter === f ? 'bg-[#15222C] border-[#15222C] text-white' : 'bg-white border-[#D5DCE1] text-[#3D4E5B] hover:border-[#9AA9B4]'}`}>
                                        {f}{f === 'Needs attention' && <span className="rf-m ml-1.5 text-[11px] opacity-70">{claims.filter((c) => c.flag).length}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                            <div className="grid grid-cols-[repeat(5,minmax(176px,1fr))] gap-3 min-w-max xl:min-w-0">
                                {STAGES.map((s, i) => {
                                    const col = shown.filter((c) => c.stage === i);
                                    return (
                                        <div key={s} className="rounded-[12px] bg-[#DCE2E6] p-2">
                                            <div className="px-1.5 pt-1 pb-2">
                                                <span className="block rf-d text-[14px] font-bold leading-tight">{s}</span>
                                                <span className="rf-m text-[11.5px] text-[#5F7180]">{col.length ? `${col.length} · $${(col.reduce((t, c) => t + c.amount, 0) / 1000).toFixed(1)}K` : 'None'}</span>
                                            </div>
                                            <div className="grid gap-2">
                                                {col.map((c) => (
                                                    <button key={c.id} type="button" onClick={() => setOpenId(c.id)} className="rf-card text-left p-3 hover:border-[#1B7F5A] hover:shadow-[0_6px_14px_-8px_rgba(21,34,44,.4)] transition-shadow">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <span className="text-[14.5px] font-semibold leading-tight">{c.name}</span>
                                                            <span className="grid place-items-center w-6 h-6 rounded-full bg-[#E8ECEE] rf-d text-[10.5px] font-bold shrink-0" title={`Rep: ${c.rep}`}>{c.rep[0]}</span>
                                                        </div>
                                                        <div className="text-[12.5px] text-[#5F7180] mt-0.5">{c.addr}</div>
                                                        <div className="text-[12px] text-[#5F7180]">{c.carrier}</div>
                                                        <div className="flex items-center justify-between gap-2 mt-2">
                                                            <span className="rf-m text-[13px] font-medium">{money(c.amount)}</span>
                                                            <span className="rf-m text-[11.5px] text-[#5F7180]">{c.squares} sq</span>
                                                        </div>
                                                        {c.flag && <div className="flex items-center gap-1.5 mt-2.5 rounded-[6px] bg-[#FDECE7] text-[#B23A1E] text-[12px] font-semibold px-2 py-1"><AlertTriangle size={12} className="shrink-0" />{c.flag}</div>}
                                                    </button>
                                                ))}
                                                {col.length === 0 && <div className="rounded-[10px] border border-dashed border-[#B4BEC5] text-[12.5px] text-[#5F7180] text-center py-5">None for this filter</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3">
                            <section id="crews" className="rf-card p-5 scroll-mt-4">
                                <h2 className="rf-d text-[18px] font-black">Crews on roofs today</h2>
                                <ul className="grid gap-4 mt-4">
                                    {CREWS.map((c) => (
                                        <li key={c.name}>
                                            <div className="flex items-baseline justify-between gap-2">
                                                <span className="text-[14.5px] font-semibold">{c.name} <span className="font-normal text-[#5F7180]">· {c.job}</span></span>
                                                <span className="rf-m text-[12px] text-[#5F7180] whitespace-nowrap">{c.done}/{c.of} sq</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#E8ECEE] mt-2"><div className="h-full rounded-full" style={{ width: `${(c.done / c.of) * 100}%`, background: GREEN }} /></div>
                                            <div className="text-[12.5px] text-[#5F7180] mt-1.5">{c.lead} · {c.task}</div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section id="materials" className="rf-card p-5 scroll-mt-4">
                                <h2 className="rf-d text-[18px] font-black">Material orders</h2>
                                <ul className="mt-2 divide-y divide-[#E8ECEE]">
                                    {ORDERS.map((o) => (
                                        <li key={o.what} className="py-2.5">
                                            <div className="text-[14px] font-medium leading-snug">{o.what}</div>
                                            <div className="flex items-center justify-between gap-3 mt-0.5 text-[12.5px]">
                                                <span className="text-[#5F7180]">{o.job}</span>
                                                <span className={`text-right font-medium ${o.tone === 'ok' ? 'text-[#1B7F5A]' : o.tone === 'bad' ? 'text-[#B23A1E]' : 'text-[#5F7180]'}`}>{o.state}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="rf-card p-5 md:col-span-2 2xl:col-span-1">
                                <h2 className="rf-d text-[18px] font-black">Estimates out vs. signed</h2>
                                <div className="grid gap-3 mt-4">
                                    {[['Sent', estOut, estOut, '$1.42M', '#B4BEC5'], ['Opened', 51, estOut, `${Math.round((51 / estOut) * 100)}%`, '#7A5AF8'], ['Signed', 23, estOut, '$684,300', GREEN]].map(([l, n, of, s, c]) => (
                                        <div key={l as string} className="grid grid-cols-[62px_minmax(0,1fr)] items-center gap-3">
                                            <span className="text-[13.5px] text-[#5F7180]">{l}</span>
                                            <div className="relative h-9 rounded-[7px] bg-[#F1F4F5] overflow-hidden">
                                                <div className="absolute inset-y-0 left-0 rounded-[7px] transition-all duration-500" style={{ width: `${((n as number) / (of as number)) * 100}%`, background: c as string }} />
                                                <div className="absolute inset-0 flex items-center justify-between px-3"><span className="rf-d text-[17px] font-black" style={{ color: l === 'Sent' ? '#15222C' : '#fff' }}>{n}</span><span className="rf-m text-[11.5px] text-[#3D4E5B]">{s}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[12.5px] text-[#5F7180] mt-4">Homeowners sign 2.6 days after the estimate on average. Follow-up texts go out at 48 hours.</p>
                            </section>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 items-start order-first xl:order-none">
                        <section className="rf-card overflow-hidden">
                            <div className="flex items-center justify-between px-5 h-12 bg-[#1B7F5A] text-white">
                                <h2 className="rf-d text-[16px] font-bold">Mission Control</h2>
                                <span className="rf-m text-[11.5px] bg-white/20 rounded-full px-2.5 py-0.5">{pending.length} waiting on you</span>
                            </div>
                            <p className="px-5 pt-4 text-[14px] leading-relaxed text-[#3D4E5B]">Overnight the agents answered 23 calls, filed 4 claims, measured 9 roofs from drone photos and caught one short-paid estimate.</p>
                            <ul className="divide-y divide-[#E8ECEE] mt-2">
                                {DECISIONS.map((d) => {
                                    const ok = approved.includes(d.id);
                                    return (
                                        <li key={d.id} className="px-5 py-4">
                                            <div className="rf-m text-[11px] uppercase tracking-[.08em] text-[#5F7180]">{d.agent}</div>
                                            <div className={`text-[15px] font-semibold leading-snug mt-1 ${ok ? 'text-[#5F7180]' : ''}`}>{d.title}</div>
                                            {ok ? (
                                                <div className="flex items-start gap-1.5 text-[13px] text-[#1B7F5A] font-medium mt-1.5"><Check size={15} className="shrink-0 mt-0.5" />{d.done}</div>
                                            ) : (
                                                <>
                                                    <p className="text-[13px] text-[#5F7180] leading-relaxed mt-1">{d.why}</p>
                                                    <button type="button" onClick={() => approve(d.id)} className="mt-3 h-9 px-5 rounded-[8px] bg-[#15222C] text-white text-[13.5px] font-semibold hover:bg-[#1B7F5A]">Approve</button>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                        <section className="rf-card p-5">
                            <div className="flex items-center justify-between">
                                <h2 className="rf-d text-[16px] font-bold">Agent activity</h2>
                                <span className="flex items-center gap-1.5 rf-m text-[11.5px] text-[#1B7F5A]"><i className="w-1.5 h-1.5 rounded-full bg-[#1B7F5A]" />Live</span>
                            </div>
                            <FeedList className="mt-2 divide-y divide-[#E8ECEE]">
                                {feed.slice(0, 6).map((f) => (
                                    <FeedRow key={f.key} className="py-2.5">
                                        <div className="flex justify-between gap-2 rf-m text-[11.5px]"><span className="font-medium text-[#7A5AF8]">{f.who}</span><span className="text-[#8FA0AC]">{f.time}</span></div>
                                        <p className="text-[13.5px] leading-snug mt-0.5">{f.text}</p>
                                    </FeedRow>
                                ))}
                            </FeedList>
                        </section>
                    </div>
                </div>
            </div>

            <Drawer open={!!open} onClose={() => setOpenId(null)} label="Claim detail" scrim="rgba(21,34,44,.45)" className="rf bg-white text-[#15222C]">
                {open && (
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="rf-m text-[11.5px] uppercase tracking-[.08em] text-[#5F7180]">{open.carrier} · rep {open.rep}</div>
                                <h3 className="rf-d text-[28px] font-black leading-tight mt-1">{open.name}</h3>
                                <div className="text-[14px] text-[#5F7180]">{open.addr}</div>
                            </div>
                            <button type="button" onClick={() => setOpenId(null)} aria-label="Close" className="grid place-items-center w-9 h-9 rounded-[8px] border border-[#D5DCE1] text-[#5F7180] hover:text-[#15222C]"><X size={16} /></button>
                        </div>
                        <ol className="grid grid-cols-5 gap-1 mt-6">
                            {STAGES.map((s, i) => (
                                <li key={s}>
                                    <div className="h-1.5 rounded-full" style={{ background: i <= open.stage ? GREEN : '#E8ECEE' }} />
                                    <div className={`text-[11px] leading-tight mt-1.5 ${i === open.stage ? 'font-semibold' : 'text-[#8FA0AC]'}`}>{s}</div>
                                </li>
                            ))}
                        </ol>
                        <div className="grid grid-cols-3 gap-3 mt-6">
                            {[['Claim', money(open.amount)], ['Roof', `${open.squares} squares`], ['In stage', open.days ? `${open.days} day${open.days > 1 ? 's' : ''}` : 'Today']].map(([l, v]) => (
                                <div key={l} className="rounded-[10px] bg-[#F1F4F5] p-3"><div className="text-[11.5px] text-[#5F7180]">{l}</div><div className="rf-d text-[17px] font-bold mt-0.5">{v}</div></div>
                            ))}
                        </div>
                        {open.flag && <div className="flex items-center gap-2 mt-4 rounded-[8px] bg-[#FDECE7] text-[#B23A1E] text-[13.5px] font-semibold px-3 py-2"><AlertTriangle size={15} />{open.flag}</div>}
                        <div className="rf-m text-[11px] uppercase tracking-[.08em] text-[#5F7180] mt-6">Where it stands</div>
                        <p className="text-[14.5px] leading-relaxed mt-1.5">{open.note}</p>
                        {open.stage < 4 ? (
                            <button type="button" onClick={() => advance(open.id)} className="w-full h-11 mt-7 rounded-[8px] bg-[#1B7F5A] text-white text-[14px] font-semibold hover:bg-[#166B4B] flex items-center justify-center gap-2">Move to {STAGES[open.stage + 1]}<ArrowRight size={16} /></button>
                        ) : (
                            <div className="h-11 mt-7 rounded-[8px] bg-[#E3F3EC] text-[#1B7F5A] text-[14px] font-semibold flex items-center justify-center gap-2"><Check size={16} />On the build calendar</div>
                        )}
                    </div>
                )}
            </Drawer>
            <GystBadge slug="roofing" />
        </div>
    );
};

export default RoofingPage;
