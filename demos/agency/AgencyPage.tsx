import React, { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { Drawer, FeedList, FeedRow, GystBadge, useDemoPage, useLiveFeed } from '../shared';
import { CHANNELS, CLIENTS, Channel, DAYS, DECISIONS, FEED, POSTS, QUEUE, STAGES } from './data';

const FONTS = 'family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700';
const CSS = `
html, body { background: #FFFFFF; }
::-webkit-scrollbar-track { background: #FFFFFF; }
::-webkit-scrollbar-thumb { background: #0B0B0C; border-radius: 0; }
.ag { font-family: "Bricolage Grotesque", system-ui, sans-serif; }
.ag-h { font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 800; letter-spacing: -.035em; line-height: .92; }
.ag-s { font-family: "Instrument Serif", Georgia, serif; }
.ag-m { font-family: "Space Mono", ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; font-size: 11px; }
`;

const BLUE = '#2437FF';
const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const name = (id: string) => CLIENTS.find((c) => c.id === id)!.name;

const Kicker: React.FC<{ n: string; title: string; right?: React.ReactNode }> = ({ n, title, right }) => (
    <div className="flex items-end justify-between gap-4 border-t-[5px] border-[#0B0B0C] pt-2.5 mb-4">
        <h2 className="ag-h text-[30px] sm:text-[38px]"><span className="ag-s font-normal italic tracking-normal text-[#2437FF] mr-2.5">{n}</span>{title}</h2>
        {right}
    </div>
);

const AgencyPage: React.FC = () => {
    useDemoPage('agency', 'The Desk | Half Column | Demo dashboard by GYST', FONTS);
    const [client, setClient] = useState<string | null>(null);
    const [channel, setChannel] = useState<Channel | 'All'>('All');
    const [openId, setOpenId] = useState<string | null>(null);
    const [approved, setApproved] = useState<string[]>([]);
    const [feed, log] = useLiveFeed(FEED, '9:05');

    const state = (p: (typeof POSTS)[number]) => (p.state === 'Needs you' && approved.includes(p.id) ? 'Scheduled' : p.state);
    const posts = POSTS.filter((p) => (!client || p.client === client) && (channel === 'All' || p.channel === channel));
    const queue = QUEUE.filter((q) => !client || q.client === client);
    const open = POSTS.find((p) => p.id === openId);
    const waiting = DECISIONS.filter((d) => !approved.includes(d.id)).length + POSTS.filter((p) => state(p) === 'Needs you' && p.id !== 'p11').length;
    const maxBack = Math.max(...CLIENTS.map((c) => c.back));
    const spend = CLIENTS.reduce((s, c) => s + c.spend, 0);
    const back = CLIENTS.reduce((s, c) => s + c.back, 0);

    const approve = (id: string, text: string) => {
        // The gift guide is both a decision and a calendar item.
        setApproved((a) => [...a, id, ...(id === 'd2' ? ['p11'] : id === 'p11' ? ['d2'] : [])]);
        log('Nadia', `Signed off. ${text}`);
    };

    return (
        <div className="ag min-h-screen bg-white text-[#0B0B0C] text-[14.5px] pb-20">
            <style>{CSS}</style>
            <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between gap-3 h-10 ag-m border-b border-[#0B0B0C]">
                    <span>Vol. 4 <span className="hidden sm:inline">· No. 317</span></span>
                    <span className="hidden md:inline">Friday 13 November 2026 · 9:05 AM</span>
                    <span className="bg-[#D6FF3F] px-2 py-0.5">Demo. Sample data.</span>
                </div>

                <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 pt-5 pb-4">
                    <div className="ag-h text-[64px] sm:text-[112px] lg:text-[148px] -ml-1 sm:-ml-2">Half Column</div>
                    <div className="lg:text-right pb-1 lg:pb-4">
                        <div className="ag-s italic text-[30px] sm:text-[38px] leading-none">The Desk</div>
                        <div className="ag-m text-[#6B6B70] mt-2">6 accounts · 9 agents · 1 editor in chief</div>
                    </div>
                </header>

                <nav className="flex items-center gap-x-6 gap-y-1 flex-wrap border-y-[3px] border-[#0B0B0C] py-2.5 ag-m" aria-label="Sections">
                    {[['#front', 'Front page'], ['#accounts', 'Accounts'], ['#calendar', 'Calendar'], ['#paid', 'Paid'], ['#production', 'Production']].map(([h, l]) => <a key={h} href={h} className="text-[#0B0B0C] no-underline hover:text-[#2437FF] font-bold">{l}</a>)}
                    <span className="ml-auto flex items-center gap-2">
                        {client ? (
                            <button type="button" onClick={() => setClient(null)} className="ag-m flex items-center gap-1.5 bg-[#2437FF] text-white px-2 py-0.5">{name(client)}<X size={12} /></button>
                        ) : <span className="text-[#6B6B70]">All accounts</span>}
                    </span>
                </nav>

                <section id="front" className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 py-8 lg:py-10 scroll-mt-4">
                    <div className="lg:col-span-7">
                        <div className="ag-m text-[#2437FF] font-bold">The morning edition</div>
                        <h1 className="ag-h text-[44px] sm:text-[68px] lg:text-[84px] mt-3">Fourteen pieces shipped. One account needs you before lunch.</h1>
                        <p className="ag-s text-[24px] sm:text-[29px] leading-[1.22] mt-6 max-w-[640px]">
                            Good morning, Nadia. The engine published across all six accounts this week and <em>every</em> one went out on time. Northbank&rsquo;s search ads got expensive overnight, and the Media Buyer has a fix.
                        </p>
                        <div className="ag-m text-[#6B6B70] mt-5">By your Chief of Staff · Filed 6:40 AM</div>
                        <dl className="grid grid-cols-3 border-t border-[#0B0B0C] mt-8">
                            {[['14', 'pieces published this week'], [`$${(back / spend).toFixed(2)}`, 'back for every $1 of ad spend'], [`${waiting}`, 'approvals waiting on you']].map(([n, l], i) => (
                                <div key={l} className={`pt-3 pr-3 ${i ? 'pl-3 sm:pl-5 border-l border-[#0B0B0C]' : ''}`}>
                                    <dt className="ag-h text-[38px] sm:text-[60px]">{n}</dt>
                                    <dd className="text-[13px] sm:text-[14px] text-[#6B6B70] mt-1.5 leading-snug">{l}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="lg:col-span-5 lg:border-l lg:border-[#0B0B0C] lg:pl-10">
                        <div className="flex items-center justify-between gap-3 bg-[#0B0B0C] text-white px-4 py-2.5">
                            <h2 className="ag-h text-[22px] tracking-[-.02em]">Awaiting your signature</h2>
                            <span className="ag-m text-[#D6FF3F]">{DECISIONS.filter((d) => !approved.includes(d.id)).length} open</span>
                        </div>
                        <ol className="list-none p-0 m-0">
                            {DECISIONS.map((d, i) => {
                                const ok = approved.includes(d.id);
                                return (
                                    <li key={d.id} className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-2 py-4 border-b border-[#0B0B0C]">
                                        <span className={`ag-h text-[40px] ${ok ? 'text-[#C9C9C4]' : 'text-[#2437FF]'}`}>{String(i + 1).padStart(2, '0')}</span>
                                        <div>
                                            <div className="ag-m text-[#6B6B70]">{d.agent} · {name(d.client)}</div>
                                            <div className={`text-[18px] font-bold leading-snug tracking-[-.01em] mt-1 ${ok ? 'text-[#6B6B70]' : ''}`}>{d.title}</div>
                                            {ok ? (
                                                <div className="flex items-start gap-1.5 text-[14px] mt-1.5"><Check size={16} className="shrink-0 mt-0.5 text-[#2437FF]" strokeWidth={3} />{d.done}</div>
                                            ) : (
                                                <>
                                                    <p className="text-[14px] text-[#44444A] leading-relaxed mt-1">{d.why}</p>
                                                    <button type="button" onClick={() => approve(d.id, d.done)} className="ag-m font-bold mt-3 h-9 px-5 bg-[#2437FF] text-white hover:bg-[#0B0B0C]">Approve</button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
                    <section id="accounts" className="lg:col-span-7 scroll-mt-4">
                        <Kicker n="A" title="Accounts" right={<span className="ag-m text-[#6B6B70] pb-1">Click one to follow it</span>} />
                        <ul className="list-none p-0 m-0">
                            {CLIENTS.map((c) => {
                                const on = client === c.id;
                                return (
                                    <li key={c.id}>
                                        <button type="button" onClick={() => setClient(on ? null : c.id)} aria-pressed={on} className={`w-full text-left grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_86px_84px] items-center gap-x-4 px-2.5 py-3 border-b border-[#0B0B0C] ${on ? 'bg-[#2437FF] text-white' : client ? 'opacity-45 hover:opacity-100' : 'hover:bg-[#F4F4F0]'}`}>
                                            <span className="min-w-0">
                                                <span className="block text-[19px] font-bold tracking-[-.02em] leading-tight truncate">{c.name}</span>
                                                <span className={`block text-[13px] truncate ${on ? 'text-white/75' : 'text-[#6B6B70]'}`}>{c.what}</span>
                                            </span>
                                            <span className={`hidden sm:block ag-s italic text-[17px] leading-tight ${on ? 'text-white' : 'text-[#44444A]'}`}>{c.note}</span>
                                            <span className="hidden sm:block ag-m text-right">{money(c.retainer)}<span className={on ? 'text-white/70' : 'text-[#6B6B70]'}>/mo</span></span>
                                            <span className={`ag-m font-bold text-center px-2 py-1 ${c.health === 'Watch' ? (on ? 'bg-white text-[#2437FF]' : 'bg-[#0B0B0C] text-white') : c.health === 'Thriving' ? 'bg-[#D6FF3F] text-[#0B0B0C]' : on ? 'border border-white' : 'border border-[#0B0B0C]'}`}>{c.health}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section id="paid" className="lg:col-span-5 scroll-mt-4">
                        <Kicker n="B" title="Spend vs. return" right={<span className="ag-m text-[#6B6B70] pb-1">November to date</span>} />
                        <div className="flex gap-5 ag-m mb-4">
                            <span className="flex items-center gap-1.5"><i className="w-3 h-3 bg-[#0B0B0C]" />Spent {money(spend)}</span>
                            <span className="flex items-center gap-1.5"><i className="w-3 h-3 bg-[#2437FF]" />Back {money(back)}</span>
                        </div>
                        <ul className="list-none p-0 m-0 grid gap-3.5">
                            {CLIENTS.map((c) => (
                                <li key={c.id} className={`grid grid-cols-[minmax(0,1fr)_64px] items-end gap-x-4 transition-opacity ${client && client !== c.id ? 'opacity-30' : ''}`}>
                                    <div>
                                        <div className="flex justify-between text-[13.5px] font-semibold mb-1"><span>{c.name}</span><span className="ag-m text-[#6B6B70] font-normal">{money(c.spend)} / {money(c.back)}</span></div>
                                        <div className="h-[7px] bg-[#0B0B0C]" style={{ width: `${(c.spend / maxBack) * 100}%` }} />
                                        <div className="h-[15px] mt-[3px]" style={{ width: `${(c.back / maxBack) * 100}%`, background: BLUE }} />
                                    </div>
                                    <div className="text-right">
                                        <div className={`ag-h text-[28px] ${c.back / c.spend < 2.5 ? 'text-[#0B0B0C] bg-[#D6FF3F] inline-block px-1' : ''}`}>{(c.back / c.spend).toFixed(1)}x</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="calendar" className="lg:col-span-12 scroll-mt-4 min-w-0">
                        <Kicker n="C" title="This week’s calendar" right={
                            <div className="flex flex-wrap justify-end gap-1 pb-1" role="group" aria-label="Filter by channel">
                                {(['All', ...CHANNELS] as const).map((c) => (
                                    <button key={c} type="button" onClick={() => setChannel(c)} aria-pressed={channel === c} className={`ag-m font-bold px-2.5 h-7 border border-[#0B0B0C] ${channel === c ? 'bg-[#0B0B0C] text-white' : 'hover:bg-[#F4F4F0]'}`}>{c}</button>
                                ))}
                            </div>
                        } />
                        <div className="grid grid-cols-1 md:grid-cols-5 md:border-l border-[#0B0B0C]">
                            {DAYS.map((d, i) => {
                                const items = posts.filter((p) => p.day === i);
                                return (
                                    <div key={d} className={`md:border-r border-[#0B0B0C] md:px-3 pb-4 ${i === 4 ? 'md:bg-[#F4F4F0]' : ''}`}>
                                        <div className="flex items-baseline justify-between border-b border-[#0B0B0C] py-2 md:pt-0">
                                            <span className="ag-h text-[24px]">{d}</span>
                                            <span className="ag-m text-[#6B6B70]">{i === 4 ? 'Today' : `${items.length} out`}</span>
                                        </div>
                                        {items.length === 0 && <p className="ag-s italic text-[16px] text-[#9A9A9E] py-3">Nothing for this filter.</p>}
                                        {items.map((p) => {
                                            const st = state(p);
                                            return (
                                                <button key={p.id} type="button" onClick={() => setOpenId(p.id)} className="group w-full text-left py-3 border-b border-[#D9D9D4] last:border-0">
                                                    <div className="flex items-center justify-between gap-2 ag-m">
                                                        <span><b>{p.channel}</b> <span className="text-[#6B6B70]">{p.time}</span></span>
                                                        {st === 'Needs you' ? <span className="bg-[#2437FF] text-white px-1.5">Needs you</span> : st === 'Scheduled' ? <span className="text-[#6B6B70]">Queued</span> : <Check size={14} strokeWidth={3} />}
                                                    </div>
                                                    <div className="text-[17px] font-bold leading-[1.15] tracking-[-.015em] mt-1.5 group-hover:text-[#2437FF]">{p.title}</div>
                                                    <div className="ag-s italic text-[15.5px] text-[#44444A] mt-0.5">{name(p.client)}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section id="production" className="lg:col-span-8 scroll-mt-4">
                        <Kicker n="D" title="The content engine" right={<span className="ag-m text-[#6B6B70] pb-1">{queue.length} in production</span>} />
                        <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_260px_110px] gap-x-5 ag-m text-[#6B6B70] pb-2 border-b border-[#0B0B0C]">
                            <span>Piece</span>
                            <span className="grid grid-cols-5 text-center">{STAGES.map((s) => <span key={s} className="truncate">{s.slice(0, 5)}</span>)}</span>
                            <span className="text-right">Next</span>
                        </div>
                        <ul className="list-none p-0 m-0">
                            {queue.map((q) => (
                                <li key={q.title} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_260px_110px] items-center gap-x-5 gap-y-2 py-3 border-b border-[#D9D9D4]">
                                    <div className="min-w-0">
                                        <div className="text-[16.5px] font-bold tracking-[-.01em] leading-tight">{q.title}</div>
                                        <div className="text-[13px] text-[#6B6B70]"><span className="ag-s italic text-[15.5px] text-[#44444A]">{name(q.client)}</span> · with the {q.agent}</div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1" role="img" aria-label={`Stage: ${STAGES[q.stage]}`}>
                                        {STAGES.map((s, i) => <span key={s} className="h-[14px]" style={{ background: i < q.stage ? '#0B0B0C' : i === q.stage ? BLUE : '#E9E9E4' }} />)}
                                    </div>
                                    <div className="ag-m sm:text-right">{q.eta}</div>
                                </li>
                            ))}
                            {queue.length === 0 && <li className="ag-s italic text-[17px] text-[#9A9A9E] py-4">Nothing in production for this account today.</li>}
                        </ul>
                    </section>

                    <section className="lg:col-span-4 bg-[#0B0B0C] text-white p-5 self-start">
                        <div className="flex items-center justify-between border-b border-white/30 pb-2.5">
                            <h2 className="ag-h text-[30px]">The wire</h2>
                            <span className="ag-m text-[#D6FF3F] flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#D6FF3F]" />Live</span>
                        </div>
                        <FeedList className="list-none p-0 m-0">
                            {feed.slice(0, 6).map((f) => (
                                <FeedRow key={f.key} className="py-3 border-b border-white/15 last:border-0">
                                    <div className="ag-m text-white/60"><b className="text-[#D6FF3F]">{f.who}</b> · {f.time}</div>
                                    <p className="text-[14.5px] leading-snug mt-1">{f.text}</p>
                                </FeedRow>
                            ))}
                        </FeedList>
                    </section>
                </div>

                <p className="ag-m text-[#9A9A9E] mt-14 border-t border-[#0B0B0C] pt-3">Half Column is a made-up agency. Every account, post and number here is sample data.</p>
            </div>

            <Drawer open={!!open} onClose={() => setOpenId(null)} label="Post" className="ag bg-white text-[#0B0B0C] border-l-[5px] border-[#0B0B0C]">
                {open && (
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="ag-m"><b>{open.channel}</b> · {DAYS[open.day]} · {open.time}</div>
                            <button type="button" onClick={() => setOpenId(null)} aria-label="Close" className="grid place-items-center w-8 h-8 border border-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-white"><X size={16} /></button>
                        </div>
                        <h3 className="ag-h text-[40px] mt-4">{open.title}</h3>
                        <div className="ag-s italic text-[22px] mt-2">for {name(open.client)}</div>
                        <div className="border-y border-[#0B0B0C] py-5 mt-5">
                            <div className="ag-m text-[#6B6B70]">The copy</div>
                            <p className="ag-s text-[23px] leading-[1.3] mt-2">{open.copy}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div><div className="ag-m text-[#6B6B70]">Status</div><div className="text-[16px] font-bold mt-1">{state(open) === 'Needs you' ? 'Waiting on you' : state(open)}</div></div>
                            <div><div className="ag-m text-[#6B6B70]">{open.state === 'Published' ? 'Result so far' : 'Note'}</div><div className="text-[16px] font-bold mt-1">{open.stat}</div></div>
                        </div>
                        {open.state === 'Needs you' && (
                            state(open) === 'Needs you'
                                ? <button type="button" onClick={() => approve(open.id, `“${open.title}” is scheduled for ${open.time}.`)} className="ag-m font-bold w-full h-11 mt-7 bg-[#2437FF] text-white hover:bg-[#0B0B0C] flex items-center justify-center gap-2">Approve and schedule<ArrowUpRight size={15} /></button>
                                : <div className="ag-m font-bold h-11 mt-7 bg-[#D6FF3F] flex items-center justify-center gap-2"><Check size={15} strokeWidth={3} />Approved and scheduled</div>
                        )}
                    </div>
                )}
            </Drawer>
            <GystBadge slug="agency" />
        </div>
    );
};

export default AgencyPage;
