import React, { useState } from 'react';
import { CalendarHeart, Check, Flower2, Gem, HeartHandshake, Sparkles, Star, Users, X } from 'lucide-react';
import { Drawer, FeedList, FeedRow, GystBadge, useDemoPage, useLiveFeed } from '../shared';
import { APPTS, Appt, DECISIONS, FEED, LAPSED, PROVIDERS, REBOOK, REVENUE, REVIEWS, STATUS } from './data';

const FONTS = 'family=Marcellus&family=DM+Sans:wght@400;500;600';
const CSS = `
html, body { background: #FAF4F0; }
::-webkit-scrollbar-track { background: #FAF4F0; }
::-webkit-scrollbar-thumb { background: #E3D2CB; }
.ms { font-family: "DM Sans", system-ui, sans-serif; }
.ms-d { font-family: Marcellus, Georgia, serif; }
.ms-card { background: #fff; border-radius: 22px; box-shadow: 0 1px 2px rgba(124,84,76,.05), 0 12px 32px -18px rgba(124,84,76,.22); }
`;

const HOUR = 76;
const DAY_START = 9;
const NOW = 11 + 20 / 60;
const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const hm = (t: number) => `${Math.floor(t) > 12 ? Math.floor(t) - 12 : Math.floor(t)}:${String(Math.round((t % 1) * 60)).padStart(2, '0')}`;
const NAV = [['#today', 'Today', CalendarHeart], ['#concierge', 'Concierge', Sparkles], ['#clients', 'Clients', Users], ['#revenue', 'Revenue', Gem], ['#reviews', 'Reviews', Star]] as const;

const Stars: React.FC<{ n: number }> = ({ n }) => (
    <span className="inline-flex gap-0.5" aria-label={`${n} of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} fill={i <= n ? '#C9A877' : 'none'} stroke={i <= n ? '#C9A877' : '#E3D2CB'} />)}
    </span>
);

const MedspaPage: React.FC = () => {
    useDemoPage('medspa', 'Oriel House Concierge | Demo dashboard by GYST', FONTS);
    const [who, setWho] = useState(-1);
    const [tab, setTab] = useState<'rebook' | 'lapsed'>('rebook');
    const [openId, setOpenId] = useState<string | null>(null);
    const [approved, setApproved] = useState<string[]>([]);
    const [nudged, setNudged] = useState<string[]>([]);
    const [arrived, setArrived] = useState<string[]>([]);
    const [feed, log] = useLiveFeed(FEED, '11:20');

    const appts: Appt[] = APPTS.map((a) =>
        a.id === 'b4' && approved.includes('w') ? { ...a, client: 'Nora Albright', tx: 'Hydrating facial', price: 195, status: 'confirmed', visits: 6, ltv: 1410, pref: 'On the waitlist for any weekday afternoon.', plan: 'Took the opening 4 minutes after the offer went out.' }
            : arrived.includes(a.id) ? { ...a, status: 'arrived' } : a,
    );
    const open = appts.find((a) => a.id === openId);
    const cols = PROVIDERS.map((p, i) => ({ ...p, i })).filter((p) => who < 0 || p.i === who);
    const booked = appts.reduce((s, a) => s + a.price, 0);
    const collected = appts.filter((a) => a.status === 'done').reduce((s, a) => s + a.price, 0);
    const pending = DECISIONS.filter((d) => !approved.includes(d.id));
    const approve = (id: string) => {
        setApproved((a) => [...a, id]);
        log('Camille', `Approved. ${DECISIONS.find((d) => d.id === id)!.done}`);
    };
    const nudge = (id: string, name: string) => {
        setNudged((n) => [...n, id]);
        log(tab === 'rebook' ? 'Rebooking' : 'Reactivation', `Sent ${name} a personal note with two times to choose from.`);
    };
    const week = REVENUE.reduce((s, r) => s + r.amount, 0);

    const STATS = [
        ['Treatment revenue today', money(booked), `${money(collected)} collected so far`],
        ['Rebooked before leaving', '71%', 'Was 44% in the spring'],
        ['Clients won back this month', '23', `${money(9870)} in treatments`],
        ['Rating', '4.9', '312 reviews, 9 new this week'],
    ];

    const Block: React.FC<{ a: Appt }> = ({ a }) => {
        const p = PROVIDERS[a.p];
        const isOpen = a.status === 'open';
        return (
            <button
                type="button"
                onClick={() => !isOpen && setOpenId(a.id)}
                disabled={isOpen}
                className={`absolute left-1.5 right-1.5 text-left rounded-[14px] px-3 py-1.5 overflow-hidden transition-shadow ${isOpen ? 'border border-dashed border-[#D9B9B2] bg-[#FFFBF9]' : 'hover:shadow-[0_6px_16px_-8px_rgba(124,84,76,.5)]'}`}
                style={{ top: (a.start - DAY_START) * HOUR + 2, height: a.dur * HOUR - 4, background: isOpen ? undefined : p.soft }}
            >
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-semibold truncate" style={{ color: isOpen ? '#B8736A' : a.status === 'done' ? '#9B878A' : '#3B2B30' }}>{a.client}</span>
                    {a.status === 'in' && <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: p.ink }} />}
                    {a.status === 'arrived' && <span className="shrink-0 text-[10.5px] font-semibold px-1.5 rounded-full bg-white" style={{ color: p.ink }}>Arrived</span>}
                    {a.status === 'done' && <Check size={13} className="shrink-0" style={{ color: p.ink }} />}
                </div>
                {a.dur > 0.5 && <div className="text-[12px] truncate" style={{ color: isOpen ? '#9B878A' : p.ink }}>{a.tx}</div>}
                {a.dur >= 1 && <div className="text-[11.5px] text-[#9B878A] mt-0.5">{isOpen ? 'Waiting on your yes' : `${hm(a.start)} · ${a.price ? money(a.price) : 'Complimentary'}`}</div>}
            </button>
        );
    };

    return (
        <div className="ms min-h-screen bg-[#FAF4F0] text-[#3B2B30] text-[14px] lg:pl-[224px] pb-20">
            <style>{CSS}</style>

            <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[224px] flex-col p-5 bg-[#FFFBF9] border-r border-[#F0E4DE]">
                <div className="flex items-center gap-2.5">
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-[#F8E4DF] text-[#B8736A]"><Flower2 size={20} strokeWidth={1.5} /></span>
                    <div>
                        <div className="ms-d text-[21px] leading-none">Oriel House</div>
                        <div className="text-[10.5px] uppercase tracking-[.2em] text-[#9B878A] mt-1">Aesthetics</div>
                    </div>
                </div>
                <nav className="grid gap-1 mt-9" aria-label="Sections">
                    {NAV.map(([h, l, Icon], i) => (
                        <a key={h} href={h} className={`flex items-center gap-3 px-3.5 h-11 rounded-full text-[14.5px] no-underline ${i === 0 ? 'bg-[#F8E4DF] text-[#8C4F47] font-semibold' : 'text-[#7A6669] hover:bg-[#FAF4F0]'}`}>
                            <Icon size={17} strokeWidth={1.6} />{l}
                        </a>
                    ))}
                </nav>
                <div className="mt-auto rounded-[18px] bg-[#E4EEE1] p-4">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#48674A]"><HeartHandshake size={16} strokeWidth={1.6} />Six agents on today</div>
                    <p className="text-[12.5px] leading-relaxed text-[#58795A] mt-1.5">Front desk, reminders, rebooking, reactivation, reviews and inventory.</p>
                </div>
            </aside>

            <header className="lg:hidden sticky top-0 z-40 bg-[#FFFBF9]/95 backdrop-blur border-b border-[#F0E4DE]">
                <div className="flex items-center justify-between gap-3 px-4 h-14">
                    <div className="flex items-center gap-2"><span className="grid place-items-center w-8 h-8 rounded-full bg-[#F8E4DF] text-[#B8736A]"><Flower2 size={17} strokeWidth={1.5} /></span><span className="ms-d text-[19px]">Oriel House</span></div>
                    <span className="text-[10px] uppercase tracking-[.14em] text-[#9B878A] border border-[#EBDAD3] rounded-full px-2.5 py-1">Demo. Sample data.</span>
                </div>
                <nav className="flex gap-1.5 px-4 pb-2.5 overflow-x-auto [scrollbar-width:none]" aria-label="Sections">
                    {NAV.map(([h, l], i) => <a key={h} href={h} className={`shrink-0 px-3.5 h-8 grid place-items-center rounded-full text-[13px] no-underline ${i === 0 ? 'bg-[#F8E4DF] text-[#8C4F47] font-semibold' : 'bg-white text-[#7A6669]'}`}>{l}</a>)}
                </nav>
            </header>

            <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-7 lg:pt-9">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="text-[12px] uppercase tracking-[.2em] text-[#B8736A]">Friday 13 November · 11:20 AM</div>
                        <h1 className="ms-d text-[34px] sm:text-[42px] leading-tight mt-1.5">Good morning, Camille</h1>
                        <p className="text-[15.5px] text-[#7A6669] mt-1.5 max-w-xl leading-relaxed">Sixteen appointments today and three rooms running. One cancellation came in at 10:52 and the waitlist is ready for it.</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[.14em] text-[#9B878A] border border-[#EBDAD3] rounded-full px-3 py-1.5">Demo. Sample data.</span>
                        <span className="grid place-items-center w-10 h-10 rounded-full bg-[#3B2B30] text-[#FAF4F0] ms-d text-[15px]">CD</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mt-7">
                    {STATS.map(([l, n, s], i) => (
                        <div key={l} className="ms-card p-4 sm:p-5">
                            <div className="text-[12.5px] text-[#9B878A] leading-snug">{l}</div>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="ms-d text-[30px] sm:text-[36px] leading-none">{n}</span>
                                {i === 3 && <Stars n={5} />}
                            </div>
                            <div className="text-[12.5px] text-[#8FA58C] font-medium mt-2 leading-snug">{s}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_370px] gap-4 mt-4 items-start">
                    <section id="today" className="ms-card p-4 sm:p-6 scroll-mt-28 lg:scroll-mt-6 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="ms-d text-[24px]">Today&rsquo;s appointments</h2>
                            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by provider">
                                {[{ name: 'Everyone', i: -1, ink: '#3B2B30' }, ...PROVIDERS.map((p, i) => ({ ...p, i }))].map((p) => (
                                    <button key={p.name} type="button" onClick={() => setWho(p.i)} aria-pressed={who === p.i} className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[13px] border ${who === p.i ? 'bg-[#3B2B30] border-[#3B2B30] text-white' : 'border-[#EBDAD3] text-[#7A6669] hover:border-[#D9B9B2]'}`}>
                                        {p.i >= 0 && <i className="w-2 h-2 rounded-full" style={{ background: p.ink }} />}
                                        {p.name.replace('Dr. ', '').split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block mt-5">
                            <div className="grid" style={{ gridTemplateColumns: `52px repeat(${cols.length}, minmax(0,1fr))` }}>
                                <span />
                                {cols.map((p) => (
                                    <div key={p.name} className="px-2 pb-3">
                                        <div className="text-[14px] font-semibold">{p.name}</div>
                                        <div className="text-[12px]" style={{ color: p.ink }}>{p.role}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative grid" style={{ gridTemplateColumns: `52px repeat(${cols.length}, minmax(0,1fr))`, height: 8 * HOUR }}>
                                <div className="relative">
                                    {Array.from({ length: 8 }, (_, h) => <span key={h} className="absolute left-0 -translate-y-1/2 text-[11.5px] text-[#B5A3A5] bg-white pr-1" style={{ top: h * HOUR }}>{h === 0 ? '' : `${h + 9 > 12 ? h - 3 : h + 9} ${h + 9 >= 12 ? 'pm' : 'am'}`}</span>)}
                                </div>
                                {cols.map((p) => (
                                    <div key={p.name} className="relative border-l border-[#F3E9E4]" style={{ backgroundImage: `repeating-linear-gradient(to bottom, #F3E9E4 0 1px, transparent 1px ${HOUR}px)` }}>
                                        {appts.filter((a) => a.p === p.i).map((a) => <Block key={a.id} a={a} />)}
                                    </div>
                                ))}
                                <div className="absolute left-[44px] right-0 flex items-center pointer-events-none" style={{ top: (NOW - DAY_START) * HOUR }}>
                                    <span className="text-[10.5px] font-semibold text-white bg-[#B8736A] rounded-full px-1.5 -ml-9">11:20</span>
                                    <span className="flex-1 h-px bg-[#B8736A]" />
                                </div>
                            </div>
                        </div>

                        <ul className="md:hidden mt-4 grid gap-2">
                            {appts.filter((a) => who < 0 || a.p === who).sort((x, y) => x.start - y.start).map((a) => (
                                <li key={a.id}>
                                    <button type="button" disabled={a.status === 'open'} onClick={() => setOpenId(a.id)} className={`w-full text-left grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[16px] px-3.5 py-2.5 ${a.status === 'done' ? 'opacity-60' : ''}`} style={{ background: a.status === 'open' ? '#FFFBF9' : PROVIDERS[a.p].soft, border: a.status === 'open' ? '1px dashed #D9B9B2' : undefined }}>
                                        <span className="text-[13px] font-semibold">{hm(a.start)}</span>
                                        <span className="min-w-0"><span className="block text-[14px] font-semibold truncate">{a.client}</span><span className="block text-[12.5px] truncate" style={{ color: PROVIDERS[a.p].ink }}>{a.tx}</span></span>
                                        <span className="text-[11.5px] text-[#7A6669]">{STATUS[a.status]}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div>
                        <section id="concierge" className="ms-card overflow-hidden scroll-mt-28 lg:scroll-mt-6">
                            <div className="p-5 bg-gradient-to-br from-[#F8E4DF] to-[#F3E7D6]">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-[12px] uppercase tracking-[.18em] text-[#8C4F47]"><Sparkles size={15} strokeWidth={1.6} />Concierge</div>
                                    <span className="text-[12px] font-semibold text-[#8C4F47] bg-white/70 rounded-full px-2.5 py-0.5">{pending.length} for you</span>
                                </div>
                                <p className="ms-d text-[19px] leading-[1.4] mt-3">Overnight I confirmed 14 of today&rsquo;s 16 visits, answered 9 messages and rebooked 6 clients. Three small things need you.</p>
                            </div>
                            <ul className="divide-y divide-[#F3E9E4]">
                                {DECISIONS.map((d) => {
                                    const ok = approved.includes(d.id);
                                    return (
                                        <li key={d.id} className="p-5">
                                            <div className="text-[11.5px] uppercase tracking-[.16em] text-[#B8736A]">{d.agent}</div>
                                            <div className={`text-[15px] font-semibold leading-snug mt-1 ${ok ? 'text-[#9B878A]' : ''}`}>{d.title}</div>
                                            {ok ? (
                                                <div className="flex items-start gap-1.5 text-[13.5px] text-[#58795A] mt-2"><Check size={15} className="shrink-0 mt-0.5" />{d.done}</div>
                                            ) : (
                                                <>
                                                    <p className="text-[13.5px] text-[#7A6669] leading-relaxed mt-1">{d.why}</p>
                                                    <button type="button" onClick={() => approve(d.id)} className="mt-3 h-9 px-5 rounded-full bg-[#B8736A] text-white text-[13.5px] font-semibold hover:bg-[#A6635A]">Approve</button>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 mt-4 items-start">
                    <section id="clients" className="ms-card p-5 sm:p-6 scroll-mt-28 lg:scroll-mt-6 lg:col-span-2 xl:col-span-1">
                        <div className="inline-flex p-1 rounded-full bg-[#FAF4F0]" role="tablist">
                            {([['rebook', 'Rebooking'], ['lapsed', 'Lapsed clients']] as const).map(([id, l]) => (
                                <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`h-9 px-4 rounded-full text-[13.5px] ${tab === id ? 'bg-white shadow-sm font-semibold text-[#3B2B30]' : 'text-[#7A6669]'}`}>{l}</button>
                            ))}
                        </div>
                        <p className="text-[13.5px] text-[#7A6669] mt-3">{tab === 'rebook' ? 'Everyone seen this week, and whether the next visit is on the books.' : 'Clients who have gone quiet, ranked by what they used to spend.'}</p>
                        <ul className="mt-2 divide-y divide-[#F3E9E4]">
                            {tab === 'rebook' && REBOOK.map((r) => (
                                <li key={r.id} className="flex items-center gap-3 py-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[14.5px] font-semibold">{r.name}</div>
                                        <div className="text-[12.5px] text-[#9B878A] truncate">{r.last} · due {r.due}</div>
                                    </div>
                                    {r.ok ? <span className="text-[12.5px] text-[#58795A] text-right">{r.state}</span>
                                        : nudged.includes(r.id) ? <span className="flex items-center gap-1 text-[12.5px] text-[#58795A]"><Check size={14} />Note sent</span>
                                        : <button type="button" onClick={() => nudge(r.id, r.name)} className="shrink-0 h-8 px-3.5 rounded-full border border-[#D9B9B2] text-[12.5px] font-semibold text-[#8C4F47] hover:bg-[#F8E4DF]">Send a note</button>}
                                </li>
                            ))}
                            {tab === 'lapsed' && LAPSED.map((r) => (
                                <li key={r.id} className="flex items-center gap-3 py-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[14.5px] font-semibold">{r.name} <span className="font-normal text-[12.5px] text-[#9B878A]">· {r.away} · {money(r.ltv)} lifetime</span></div>
                                        <div className="text-[12.5px] text-[#9B878A]">{r.note}</div>
                                    </div>
                                    {nudged.includes(r.id) || approved.includes('m') ? <span className="shrink-0 flex items-center gap-1 text-[12.5px] text-[#58795A]"><Check size={14} />{approved.includes('m') && !nudged.includes(r.id) ? 'Scheduled' : 'Note sent'}</span>
                                        : <button type="button" onClick={() => nudge(r.id, r.name)} className="shrink-0 h-8 px-3.5 rounded-full border border-[#D9B9B2] text-[12.5px] font-semibold text-[#8C4F47] hover:bg-[#F8E4DF]">Send a note</button>}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="grid grid-cols-1 gap-4 min-w-0">
                    <section id="revenue" className="ms-card p-5 sm:p-6 scroll-mt-28 lg:scroll-mt-6">
                        <h2 className="ms-d text-[20px]">Treatment revenue</h2>
                        <div className="flex items-baseline gap-2 mt-2"><span className="ms-d text-[32px] leading-none">{money(week)}</span><span className="text-[12.5px] text-[#58795A] font-medium">this week, up 12%</span></div>
                        <div className="flex h-3 rounded-full overflow-hidden mt-4 gap-0.5" aria-hidden="true">
                            {REVENUE.map((r) => <span key={r.name} style={{ width: `${(r.amount / week) * 100}%`, background: r.color }} />)}
                        </div>
                        <ul className="mt-4 grid gap-2.5">
                            {REVENUE.map((r) => (
                                <li key={r.name} className="flex items-center gap-2.5 text-[13.5px]">
                                    <i className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                                    <span className="flex-1 text-[#7A6669]">{r.name}</span>
                                    <span className="font-semibold">{money(r.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                        <section className="ms-card p-5 sm:p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="ms-d text-[20px]">Happening now</h2>
                                <span className="flex items-center gap-1.5 text-[12px] text-[#58795A]"><i className="w-1.5 h-1.5 rounded-full bg-[#8FA58C]" />Live</span>
                            </div>
                            <FeedList className="mt-3 grid gap-3">
                                {feed.slice(0, 5).map((f) => (
                                    <FeedRow key={f.key} className="grid grid-cols-[8px_minmax(0,1fr)] gap-3">
                                        <i className="w-2 h-2 rounded-full bg-[#E3C4BD] mt-1.5" />
                                        <div>
                                            <p className="text-[13.5px] leading-snug">{f.text}</p>
                                            <div className="text-[12px] text-[#B5A3A5] mt-0.5">{f.who} · {f.time}</div>
                                        </div>
                                    </FeedRow>
                                ))}
                            </FeedList>
                        </section>
                    </div>

                    <section id="reviews" className="ms-card p-5 sm:p-6 scroll-mt-28 lg:scroll-mt-6">
                        <h2 className="ms-d text-[20px]">Reviews</h2>
                        <ul className="mt-2 divide-y divide-[#F3E9E4]">
                            {REVIEWS.map((r) => (
                                <li key={r.name} className="py-3">
                                    <div className="flex items-center justify-between gap-2"><span className="text-[13.5px] font-semibold">{r.name}</span><Stars n={r.stars} /></div>
                                    <p className="text-[13.5px] text-[#7A6669] leading-relaxed mt-1">{r.text}</p>
                                    {r.reply && (
                                        <div className="mt-2 rounded-[14px] bg-[#FAF4F0] p-3 text-[13px] leading-relaxed">
                                            <div className="text-[11px] uppercase tracking-[.14em] text-[#B8736A] mb-1">{approved.includes('v') ? 'Reply posted' : 'Reply drafted, waiting on you'}</div>
                                            {r.reply}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <Drawer open={!!open} onClose={() => setOpenId(null)} label="Appointment" scrim="rgba(59,43,48,.28)" className="ms bg-[#FFFBF9] text-[#3B2B30] sm:rounded-l-[28px]">
                {open && (
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3.5">
                                <span className="grid place-items-center w-14 h-14 rounded-full ms-d text-[20px]" style={{ background: PROVIDERS[open.p].soft, color: PROVIDERS[open.p].ink }}>{open.client.split(' ').map((w) => w[0]).join('')}</span>
                                <div>
                                    <h3 className="ms-d text-[26px] leading-tight">{open.client}</h3>
                                    <div className="text-[13.5px] text-[#9B878A]">{open.visits ? `${open.visits} visits · ${money(open.ltv)} lifetime` : 'First visit'}</div>
                                </div>
                            </div>
                            <button type="button" onClick={() => setOpenId(null)} aria-label="Close" className="grid place-items-center w-9 h-9 rounded-full bg-white border border-[#F0E4DE] text-[#9B878A] hover:text-[#3B2B30]"><X size={16} /></button>
                        </div>
                        <div className="ms-card p-4 mt-5 grid grid-cols-2 gap-y-3 text-[13.5px]">
                            {[['Treatment', open.tx], ['Time', `${hm(open.start)} with ${PROVIDERS[open.p].name}`], ['Price', open.price ? money(open.price) : 'Complimentary'], ['Status', STATUS[open.status]]].map(([l, v]) => (
                                <div key={l}><div className="text-[11.5px] uppercase tracking-[.14em] text-[#B5A3A5]">{l}</div><div className="mt-0.5 font-medium">{v}</div></div>
                            ))}
                        </div>
                        <div className="text-[11.5px] uppercase tracking-[.16em] text-[#B8736A] mt-6">What we know about her</div>
                        <p className="text-[14.5px] leading-relaxed mt-1.5">{open.pref}</p>
                        <div className="text-[11.5px] uppercase tracking-[.16em] text-[#B8736A] mt-5">The plan</div>
                        <p className="text-[14.5px] leading-relaxed mt-1.5">{open.plan}</p>
                        {open.status === 'confirmed' && (
                            <button type="button" onClick={() => { setArrived((a) => [...a, open.id]); log('Front Desk', `${open.client} checked in for ${hm(open.start)}.`); }} className="w-full h-11 mt-7 rounded-full bg-[#3B2B30] text-white text-[14px] font-semibold hover:bg-[#523D43]">Check her in</button>
                        )}
                        {open.status === 'arrived' && <div className="flex items-center justify-center gap-2 h-11 mt-7 rounded-full bg-[#E4EEE1] text-[#48674A] text-[14px] font-semibold"><Check size={16} />Checked in. {PROVIDERS[open.p].name.split(' ')[0] === 'Dr.' ? 'Dr. Marsh' : PROVIDERS[open.p].name.split(' ')[0]} has been told.</div>}
                    </div>
                )}
            </Drawer>
            <GystBadge slug="medspa" />
        </div>
    );
};

export default MedspaPage;
