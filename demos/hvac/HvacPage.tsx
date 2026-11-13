import React, { useState } from 'react';
import { Check, ChevronRight, Moon, Phone, Snowflake, Truck as TruckIcon, X } from 'lucide-react';
import { Drawer, FeedList, FeedRow, GystBadge, useDemoPage, useLiveFeed } from '../shared';
import { CALLS, DECISIONS, FEED, JOBS, Job, JobStatus, QUOTES, STATUS, TRUCKS } from './data';

const FONTS = 'family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500';
const CSS = `
html, body { background: #0E1216; }
::-webkit-scrollbar-track { background: #0E1216; }
.hv { font-family: Barlow, system-ui, sans-serif; }
.hv-d { font-family: "Barlow Condensed", "Arial Narrow", sans-serif; text-transform: uppercase; letter-spacing: .04em; }
.hv-m { font-family: "IBM Plex Mono", ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.hv-ping { transform-box: fill-box; transform-origin: center; animation: hvPing 1.8s ease-out infinite; }
.hv-dash { animation: hvDash 1.2s linear infinite; }
@keyframes hvPing { 0% { opacity: .7; transform: scale(.6); } 100% { opacity: 0; transform: scale(2.2); } }
@keyframes hvDash { to { stroke-dashoffset: -18; } }
@media (prefers-reduced-motion: reduce) { .hv-ping, .hv-dash { animation: none; } }
`;

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const FILTERS: ('all' | JobStatus)[] = ['all', 'onsite', 'enroute', 'scheduled', 'done'];
const TABS = [['trucks', 'Trucks'], ['calls', 'Overnight calls'], ['quotes', 'Quote chase']] as const;
type Tab = (typeof TABS)[number][0];
const TRUCK_TONE = { ...Object.fromEntries(Object.entries(STATUS).map(([k, v]) => [k, v.color])), shop: '#FF6A1A' } as Record<string, string>;

const Pill: React.FC<{ status: JobStatus }> = ({ status }) => (
    <span className="hv-d inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-1.5 py-px border" style={{ color: STATUS[status].color, borderColor: `${STATUS[status].color}55` }}>
        <i className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[status].color }} />
        {STATUS[status].label}
    </span>
);

const Panel: React.FC<{ title: string; right?: React.ReactNode; className?: string; children: React.ReactNode; id?: string }> = ({ title, right, className = '', children, id }) => (
    <section id={id} className={`bg-[#151B21] border border-[#26303A] scroll-mt-16 ${className}`}>
        <header className="flex items-center justify-between gap-3 h-10 px-3.5 border-b border-[#26303A]">
            <h2 className="hv-d text-[14px] font-semibold text-[#E8EDF0]">{title}</h2>
            {right}
        </header>
        {children}
    </section>
);

const MapView: React.FC<{ jobs: Job[]; sel: string | null; onPick: (id: string) => void }> = ({ jobs, sel, onPick }) => (
    <svg viewBox="0 0 800 440" className="block w-full h-auto" role="img" aria-label="Service area map with today's jobs and trucks">
        <rect width="800" height="440" fill="#10161B" />
        <path d="M0 392 C140 372 250 418 392 398 S640 352 800 380 V440 H0Z" fill="#0F1C27" />
        <path d="M0 392 C140 372 250 418 392 398 S640 352 800 380" fill="none" stroke="#16293A" strokeWidth="2" />
        <rect x="520" y="40" width="96" height="58" fill="#12201B" />
        <rect x="40" y="290" width="120" height="64" fill="#12201B" />
        {[60, 120, 180, 300, 360, 480, 540, 660, 720].map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="440" stroke="#19232C" strokeWidth="1.5" />)}
        {[50, 100, 200, 250, 350].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#19232C" strokeWidth="1.5" />)}
        <line x1="0" y1="150" x2="800" y2="150" stroke="#1F2933" strokeWidth="7" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#1F2933" strokeWidth="7" />
        <line x1="240" y1="0" x2="240" y2="440" stroke="#1F2933" strokeWidth="7" />
        <line x1="420" y1="0" x2="420" y2="440" stroke="#1F2933" strokeWidth="7" />
        <line x1="600" y1="0" x2="600" y2="440" stroke="#1F2933" strokeWidth="7" />
        <path d="M0 40 L800 250" stroke="#243140" strokeWidth="10" fill="none" />
        <path d="M0 40 L800 250" stroke="#10161B" strokeWidth="1" strokeDasharray="10 10" fill="none" />
        {[['Cedar Fork', 70, 34], ['Old Town', 330, 122], ['Harlan Park', 640, 136], ['Westgate', 262, 226], ['Millbrook', 452, 330]].map(([t, x, y]) => (
            <text key={t} x={x} y={y} className="hv-d" fontSize="12" fontWeight="600" fill="#465564" letterSpacing="2">{t}</text>
        ))}
        <g>
            <rect x="436" y="216" width="38" height="14" fill="#FF6A1A" />
            <text x="455" y="226.5" textAnchor="middle" className="hv-d" fontSize="10" fontWeight="700" fill="#0E1216">SHOP</text>
        </g>
        {TRUCKS.map((t) => {
            const j = JOBS.find((x) => x.truck === t.n && x.status === 'enroute');
            return j ? <line key={t.n} x1={t.x} y1={t.y} x2={j.x} y2={j.y} stroke="#4DA3FF" strokeWidth="2" strokeDasharray="5 4" className="hv-dash" /> : null;
        })}
        {jobs.map((j) => {
            const c = STATUS[j.status].color;
            const on = sel === j.id;
            return (
                <g key={j.id} onClick={() => onPick(j.id)} className="cursor-pointer" role="button" aria-label={`${j.cust}, ${STATUS[j.status].label}`}>
                    <circle cx={j.x} cy={j.y} r="16" fill="transparent" />
                    {on && <circle cx={j.x} cy={j.y} r="13" fill="none" stroke="#FF6A1A" strokeWidth="2" />}
                    <circle cx={j.x} cy={j.y} r="6.5" fill={j.status === 'done' ? '#10161B' : c} stroke={c} strokeWidth="2" />
                    {j.status === 'done' && <path d={`M${j.x - 3} ${j.y} l2.2 2.2 l3.8 -4.2`} stroke={c} strokeWidth="1.6" fill="none" />}
                </g>
            );
        })}
        {TRUCKS.map((t) => (
            <g key={t.n}>
                {t.tone === 'enroute' && <circle cx={t.x} cy={t.y} r="12" fill="#4DA3FF" className="hv-ping" />}
                <rect x={t.x - 13} y={t.y - 10} width="26" height="20" rx="3" fill="#E8EDF0" stroke="#0E1216" strokeWidth="1.5" />
                <rect x={t.x - 13} y={t.y + 6} width="26" height="4" fill={TRUCK_TONE[t.tone]} />
                <text x={t.x} y={t.y + 3} textAnchor="middle" className="hv-d" fontSize="13" fontWeight="700" fill="#0E1216">T{t.n}</text>
            </g>
        ))}
    </svg>
);

const HvacPage: React.FC = () => {
    useDemoPage('hvac', 'Copperjack Dispatch | Demo dashboard by GYST', FONTS);
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
    const [tab, setTab] = useState<Tab>('trucks');
    const [openId, setOpenId] = useState<string | null>(null);
    const [sel, setSel] = useState<string | null>(null);
    const [approved, setApproved] = useState<string[]>([]);
    const [texted, setTexted] = useState<string[]>([]);
    const [feed, log] = useLiveFeed(FEED, '10:31');

    const jobs = JOBS.filter((j) => filter === 'all' || j.status === filter);
    const open = JOBS.find((j) => j.id === openId);
    const booked = JOBS.filter((j) => j.id !== 'J-4824' && (j.id !== 'J-4827' || approved.includes('d1'))).reduce((s, j) => s + j.value, 0);
    const pending = DECISIONS.filter((d) => !approved.includes(d.id));
    const pick = (id: string) => { setSel(id); setOpenId(id); };
    const look = (id: string) => {
        if (id === 'd3') {
            setTab('quotes');
            document.getElementById('fleet')?.scrollIntoView({ block: 'center' });
        } else pick(id === 'd1' ? 'J-4827' : 'J-4824');
    };
    const approve = (id: string) => {
        const d = DECISIONS.find((x) => x.id === id)!;
        setApproved((a) => [...a, id]);
        log('Ray', `Approved. ${d.done}`);
    };

    const KPIS = [
        ['Booked today', money(booked), approved.includes('d1') ? 'Hendricks install added' : 'Goal $18,000'],
        ['Jobs on the board', `${JOBS.length}`, '2 done, 4 rolling, 4 to go'],
        ['Calls answered overnight', '11', '8 booked, 0 missed'],
        ['Old quotes in play', money(QUOTES.filter((q) => q.tone !== 'won').reduce((s, q) => s + q.amount, 0)), '2 customers replied'],
        ['First response', '38 sec', 'Was 4 hr 10 min in March'],
    ];

    return (
        <div className="hv min-h-screen bg-[#0E1216] text-[#C9D2D9] text-[14px] pb-16">
            <style>{CSS}</style>
            <header className="sticky top-0 z-40 bg-[#0E1216]/95 backdrop-blur border-b border-[#26303A]">
                <div className="flex items-center gap-4 h-14 px-3 sm:px-5">
                    <div className="flex items-center gap-2.5 shrink-0">
                        <span className="grid place-items-center w-8 h-8 bg-[#FF6A1A] text-[#0E1216]"><Snowflake size={18} strokeWidth={2.5} /></span>
                        <div className="leading-none">
                            <div className="hv-d text-[19px] font-bold text-[#E8EDF0] tracking-[.06em]">Copperjack</div>
                            <div className="hv-m text-[9.5px] text-[#8795A1] mt-0.5 uppercase tracking-[.16em]">Dispatch</div>
                        </div>
                    </div>
                    <nav className="hidden lg:flex items-center h-14 ml-4" aria-label="Sections">
                        {[['#board', 'Board'], ['#map', 'Map'], ['#fleet', 'Fleet + calls'], ['#chief', 'Chief of staff']].map(([h, l], i) => (
                            <a key={h} href={h} className={`hv-d flex items-center h-14 px-3.5 text-[15px] font-semibold no-underline border-b-2 ${i === 0 ? 'border-[#FF6A1A] text-[#E8EDF0]' : 'border-transparent text-[#8795A1] hover:text-[#E8EDF0]'}`}>{l}</a>
                        ))}
                    </nav>
                    <div className="ml-auto flex items-center gap-3 min-w-0">
                        <span className="hv-m hidden sm:inline text-[10px] uppercase tracking-[.14em] text-[#8795A1] border border-[#26303A] px-2 py-1">Demo. Sample data.</span>
                        <span className="hidden md:flex items-center gap-2 text-[13px] text-[#8795A1]"><i className="w-2 h-2 rounded-full bg-[#3DDC84]" />7 agents on shift</span>
                        <span className="hv-m hidden md:inline text-[12px] text-[#8795A1]">Wed 10:31 AM · 27°F</span>
                        <span className="grid place-items-center w-8 h-8 rounded-full bg-[#26303A] hv-d text-[13px] font-bold text-[#E8EDF0]">RD</span>
                    </div>
                </div>
            </header>

            <div className="sm:hidden px-3 pt-3"><span className="hv-m text-[10px] uppercase tracking-[.14em] text-[#8795A1] border border-[#26303A] px-2 py-1">Demo. Sample data.</span></div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-px bg-[#26303A] border-b border-[#26303A] mt-3 sm:mt-0">
                {KPIS.map(([l, n, s], i) => (
                    <div key={l} className={`bg-[#0E1216] px-3 sm:px-5 py-3.5 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                        <div className="hv-d text-[12px] font-semibold text-[#8795A1]">{l}</div>
                        <div className={`hv-d text-[34px] font-bold leading-none mt-1.5 ${i === 0 ? 'text-[#FF6A1A]' : 'text-[#E8EDF0]'}`}>{n}</div>
                        <div className="text-[12.5px] text-[#8795A1] mt-1.5">{s}</div>
                    </div>
                ))}
            </div>

            <main className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)_360px] gap-3 p-3 sm:p-4 items-start">
                <Panel id="board" title="Today’s board" right={<span className="hv-m text-[11px] text-[#8795A1]">{jobs.length} of {JOBS.length}</span>}>
                    <div className="flex flex-wrap gap-1.5 p-3 border-b border-[#26303A]" role="group" aria-label="Filter jobs by status">
                        {FILTERS.map((f) => (
                            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`hv-d text-[13px] font-semibold px-2.5 h-7 border ${filter === f ? 'bg-[#FF6A1A] border-[#FF6A1A] text-[#0E1216]' : 'border-[#26303A] text-[#8795A1] hover:text-[#E8EDF0] hover:border-[#3A4753]'}`}>
                                {f === 'all' ? 'All' : STATUS[f].label}
                            </button>
                        ))}
                    </div>
                    <ul className="divide-y divide-[#26303A] xl:max-h-[760px] xl:overflow-y-auto">
                        {jobs.map((j) => (
                            <li key={j.id}>
                                <button type="button" onClick={() => pick(j.id)} onMouseEnter={() => setSel(j.id)} className={`w-full text-left px-3.5 py-3 border-l-[3px] hover:bg-[#1A2129] ${sel === j.id ? 'bg-[#1A2129] border-[#FF6A1A]' : 'border-transparent'}`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="hv-m text-[12px] text-[#8795A1]">{j.win}</span>
                                        <Pill status={j.status} />
                                    </div>
                                    <div className={`text-[15px] font-semibold mt-1 ${j.status === 'done' ? 'text-[#8795A1]' : 'text-[#E8EDF0]'}`}>{j.cust}</div>
                                    <div className="text-[13px] text-[#8795A1] truncate">{j.type}</div>
                                    <div className="flex items-center justify-between gap-2 mt-1.5 text-[12.5px] text-[#8795A1]">
                                        <span className="flex items-center gap-1.5 min-w-0"><TruckIcon size={13} className="shrink-0" /><span className="truncate">T{j.truck} · {j.area}</span></span>
                                        <span className="hv-m text-[#C9D2D9]">{money(j.value)}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </Panel>

                <div className="grid gap-3 min-w-0">
                    <Panel id="map" title="Service area" right={
                        <div className="flex items-center gap-3 text-[11.5px] text-[#8795A1]">
                            {(['onsite', 'enroute', 'scheduled'] as JobStatus[]).map((s) => <span key={s} className="hidden sm:flex items-center gap-1.5"><i className="w-2 h-2 rounded-full" style={{ background: STATUS[s].color }} />{STATUS[s].label}</span>)}
                        </div>
                    }>
                        <MapView jobs={jobs} sel={sel} onPick={pick} />
                    </Panel>

                    <Panel id="fleet" title="Fleet and front desk" className="min-w-0">
                        <div className="flex border-b border-[#26303A] overflow-x-auto" role="tablist">
                            {TABS.map(([id, l]) => (
                                <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`hv-d shrink-0 text-[14px] font-semibold px-4 h-10 border-b-2 -mb-px ${tab === id ? 'border-[#FF6A1A] text-[#E8EDF0]' : 'border-transparent text-[#8795A1] hover:text-[#E8EDF0]'}`}>
                                    {l}
                                    {id === 'calls' && <span className="hv-m ml-2 text-[11px] text-[#FF6A1A]">11</span>}
                                </button>
                            ))}
                        </div>
                        {tab === 'trucks' && (
                            <ul className="divide-y divide-[#26303A]">
                                {TRUCKS.map((t) => (
                                    <li key={t.n} className="flex items-center gap-3 px-3.5 py-2.5">
                                        <span className="hv-d grid place-items-center w-9 h-7 bg-[#E8EDF0] text-[#0E1216] text-[14px] font-bold border-b-[3px]" style={{ borderColor: TRUCK_TONE[t.tone] }}>T{t.n}</span>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[14px] font-semibold text-[#E8EDF0]">{t.tech}</div>
                                            <div className="text-[13px] text-[#8795A1] truncate">{t.state}</div>
                                        </div>
                                        <span className="hv-m text-[12px] text-right shrink-0" style={{ color: TRUCK_TONE[t.tone] }}>{t.next}</span>
                                    </li>
                                ))}
                                <li className="flex items-center gap-3 px-3.5 py-2.5 text-[#55626E]">
                                    <span className="hv-d grid place-items-center w-9 h-7 border border-[#26303A] text-[14px] font-bold">T6</span>
                                    <span className="text-[13px]">Out of service. Transmission, back Friday.</span>
                                </li>
                            </ul>
                        )}
                        {tab === 'calls' && (
                            <>
                                <div className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-[#8795A1] border-b border-[#26303A]"><Moon size={14} className="text-[#FF6A1A]" />The AI front desk covered 6:00 PM to 7:00 AM. 11 calls, average pickup 2 rings.</div>
                                <ul className="divide-y divide-[#26303A]">
                                    {CALLS.map((c) => (
                                        <li key={c.time} className="grid grid-cols-[70px_minmax(0,1fr)] sm:grid-cols-[76px_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 px-3.5 py-2.5">
                                            <span className="hv-m text-[12px] text-[#8795A1] pt-0.5">{c.time}</span>
                                            <div className="min-w-0">
                                                <div className="text-[14px] font-semibold text-[#E8EDF0] flex items-center gap-1.5"><Phone size={12} className="text-[#8795A1]" />{c.who}</div>
                                                <div className="text-[13px] text-[#8795A1]">{c.why}</div>
                                            </div>
                                            <div className={`col-start-2 sm:col-start-3 text-[13px] sm:text-right ${c.tone === 'urgent' ? 'text-[#FF6B6B]' : c.tone === 'booked' ? 'text-[#3DDC84]' : 'text-[#C9D2D9]'}`}>{c.outcome}</div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {tab === 'quotes' && (
                            <ul className="divide-y divide-[#26303A]">
                                {QUOTES.map((q) => (
                                    <li key={q.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 px-3.5 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[14px] font-semibold text-[#E8EDF0]">{q.cust} <span className="font-normal text-[#8795A1]">· {q.job}</span></div>
                                            <div className={`text-[13px] ${q.tone === 'won' ? 'text-[#3DDC84]' : q.tone === 'warm' ? 'text-[#FF6A1A]' : 'text-[#8795A1]'}`}>{q.state}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="hv-m text-[13px] text-[#E8EDF0]">{money(q.amount)}</div>
                                            <div className="hv-m text-[11px] text-[#8795A1]">{q.age} days · {q.touch}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Panel>
                </div>

                <div id="chief" className="order-first xl:order-none grid gap-3 lg:col-span-2 xl:col-span-1 lg:grid-cols-2 xl:grid-cols-1 items-start scroll-mt-16">
                    <Panel title="Chief of staff" right={<span className="hv-m text-[11px] text-[#FF6A1A]">{pending.length} waiting on you</span>}>
                        <div className="p-3.5 border-b border-[#26303A]">
                            <div className="hv-d text-[12px] font-semibold text-[#8795A1]">While you were out</div>
                            <p className="text-[14.5px] leading-relaxed text-[#E8EDF0] mt-1.5">
                                Morning, Ray. The front desk took <b className="text-[#FF6A1A]">11 calls</b> overnight and booked 8 of them. One gas smell was sent to the utility and the on-call tech. Quote Chaser turned a 23 day old quote into a <b className="text-[#FF6A1A]">$4,150</b> job. Three things need a yes from you.
                            </p>
                        </div>
                        <ul className="divide-y divide-[#26303A]">
                            {DECISIONS.map((d) => {
                                const ok = approved.includes(d.id);
                                return (
                                    <li key={d.id} className="p-3.5">
                                        <div className="hv-d text-[12px] font-semibold text-[#8795A1]">{d.agent}</div>
                                        <div className={`text-[15px] font-semibold mt-0.5 ${ok ? 'text-[#8795A1]' : 'text-[#E8EDF0]'}`}>{d.title}</div>
                                        {ok ? (
                                            <div className="flex items-start gap-1.5 text-[13px] text-[#3DDC84] mt-1.5"><Check size={15} className="shrink-0 mt-px" />{d.done}</div>
                                        ) : (
                                            <>
                                                <p className="text-[13px] text-[#8795A1] leading-relaxed mt-1">{d.why}</p>
                                                <div className="flex gap-2 mt-2.5">
                                                    <button type="button" onClick={() => approve(d.id)} className="hv-d text-[14px] font-bold px-4 h-8 bg-[#FF6A1A] text-[#0E1216] hover:bg-[#FF8240]">Approve</button>
                                                    <button type="button" onClick={() => look(d.id)} className="hv-d text-[14px] font-semibold px-3 h-8 border border-[#26303A] text-[#C9D2D9] hover:border-[#3A4753]">Look first</button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </Panel>

                    <Panel title="Activity" right={<span className="flex items-center gap-1.5 hv-m text-[11px] text-[#3DDC84]"><i className="w-1.5 h-1.5 rounded-full bg-[#3DDC84]" />Live</span>}>
                        <FeedList className="divide-y divide-[#26303A]">
                            {feed.map((f) => (
                                <FeedRow key={f.key} className="grid grid-cols-[62px_minmax(0,1fr)] gap-2 px-3.5 py-2.5">
                                    <span className="hv-m text-[11.5px] text-[#8795A1] pt-0.5">{f.time}</span>
                                    <span className="text-[13.5px] leading-snug"><b className="hv-d text-[13px] font-semibold text-[#FF6A1A] mr-1.5">{f.who}</b>{f.text}</span>
                                </FeedRow>
                            ))}
                        </FeedList>
                    </Panel>
                </div>
            </main>

            <Drawer open={!!open} onClose={() => setOpenId(null)} label="Job detail" className="hv bg-[#151B21] border-l border-[#26303A] text-[#C9D2D9]">
                {open && (
                    <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="hv-m text-[12px] text-[#8795A1]">{open.id} · {open.win}</div>
                                <h3 className="hv-d text-[28px] font-bold text-[#E8EDF0] leading-tight mt-1">{open.cust}</h3>
                                <div className="text-[14px] text-[#8795A1]">{open.addr}, {open.area}</div>
                            </div>
                            <button type="button" onClick={() => setOpenId(null)} aria-label="Close" className="grid place-items-center w-8 h-8 border border-[#26303A] text-[#8795A1] hover:text-[#E8EDF0]"><X size={16} /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-px bg-[#26303A] border border-[#26303A] mt-4">
                            {[['Status', <Pill key="p" status={open.status} />], ['Truck', `T${open.truck} · ${TRUCKS.find((t) => t.n === open.truck)?.tech.split(' ')[0]}`], ['Ticket', money(open.value)]].map(([l, v]) => (
                                <div key={l as string} className="bg-[#151B21] p-3">
                                    <div className="hv-d text-[11.5px] font-semibold text-[#8795A1]">{l}</div>
                                    <div className="text-[14px] text-[#E8EDF0] mt-1">{v}</div>
                                </div>
                            ))}
                        </div>
                        <div className="hv-d text-[12px] font-semibold text-[#8795A1] mt-5">The job</div>
                        <div className="text-[15px] text-[#E8EDF0] mt-1">{open.type}</div>
                        <div className="hv-d text-[12px] font-semibold text-[#8795A1] mt-5">What the business knows</div>
                        <p className="text-[14px] leading-relaxed mt-1 border-l-2 border-[#FF6A1A] pl-3">{open.brain}</p>
                        <div className="hv-d text-[12px] font-semibold text-[#8795A1] mt-5">What the agents did</div>
                        <ol className="mt-2 grid gap-2.5">
                            {open.log.map(([t, x]) => (
                                <li key={x} className="grid grid-cols-[86px_minmax(0,1fr)] gap-2 text-[13.5px]">
                                    <span className="hv-m text-[11.5px] text-[#8795A1] pt-0.5">{t}</span>
                                    <span>{x}</span>
                                </li>
                            ))}
                        </ol>
                        <button
                            type="button"
                            disabled={texted.includes(open.id) || open.status === 'done'}
                            onClick={() => { setTexted((t) => [...t, open.id]); log('Dispatcher', `Texted ${open.cust} a fresh arrival time.`); }}
                            className="hv-d w-full flex items-center justify-center gap-2 text-[15px] font-bold h-10 mt-6 bg-[#FF6A1A] text-[#0E1216] hover:bg-[#FF8240] disabled:bg-transparent disabled:border disabled:border-[#26303A] disabled:text-[#8795A1]"
                        >
                            {open.status === 'done' ? 'Job closed' : texted.includes(open.id) ? <><Check size={16} />Arrival text sent</> : <>Text the customer an arrival time<ChevronRight size={16} /></>}
                        </button>
                    </div>
                )}
            </Drawer>
            <GystBadge slug="hvac" />
        </div>
    );
};

export default HvacPage;
