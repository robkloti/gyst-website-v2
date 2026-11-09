import React, { useMemo, useState } from 'react';
import { WorkerRoom } from '../rooms/WorkerRoom';
import { BUILD_LOG, CLIENTS, CONTENT_QUEUE, DEPTS, DeptId, FUNNEL, HQ_ROOM, PROSPECTS, Prospect, REPLIES, SHELVES, Stage, VOICE_RULES, WORKSTREAMS } from './data';
import { Avatar, byId, Card, FeedItem, ViewHead } from './ui';

type Log = (from: string, text: string) => void;
const btn = 'inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-md px-3 py-1.5';
const dark = `${btn} bg-charcoal text-paper hover:bg-black`;
const ghost = `${btn} border border-charcoal/20 hover:bg-charcoal/5`;

/* ---------------- War room ---------------- */

export const WarRoomView: React.FC<{ step: number; feed: FeedItem[]; onBrief: () => void; playing: boolean; onTogglePlay: () => void; pending: number; onDept: (d: DeptId) => void }> = ({
    step, onBrief, playing, onTogglePlay, pending, onDept,
}) => {
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const counts = useMemo(() => {
        const v: Record<string, number> = Object.fromEntries(HQ_ROOM.counters.map((c) => [c.id, c.start]));
        for (let i = 0; i <= step; i++) {
            const c = HQ_ROOM.script[i]?.counter;
            if (c) v[c.split(':')[0]] += Number(c.split(':')[1]);
        }
        return v;
    }, [step]);
    const date = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:pointer-events-none [&>*]:pointer-events-auto">
                <div className="max-w-md lg:max-w-[360px]">
                    <div className="text-[13px] text-steel-dark">{date}</div>
                    <h1 className="font-archivo font-semibold text-[30px] md:text-[34px] tracking-tight leading-tight mt-0.5">{greet}, Rob.</h1>
                    <p className="text-[15.5px] text-charcoal/80 leading-relaxed mt-1.5">
                        Since midnight your agents found <b>{counts.signals}</b> shops with a reason to buy and booked <b>{counts.calls}</b> call{counts.calls === 1 ? '' : 's'}. Mission Control has <b>{pending || 'no'}</b> decision{pending === 1 ? '' : 's'} for you.
                    </p>
                    <button type="button" onClick={onBrief} className={`${dark} mt-3.5 px-4 py-2`}>Brief me</button>
                </div>
                <Card className="flex items-center gap-2.5 px-3.5 py-2 text-[13.5px]">
                    <i className="w-2 h-2 rounded-full bg-hazard" />
                    <span>Next call: <b className="font-semibold">Thursday 10 AM</b>, Desert Air Heating</span>
                </Card>
            </div>

            <div className="relative mt-2 -mx-4 lg:mx-0 lg:mt-0 lg:pt-24">
                <WorkerRoom room={HQ_ROOM} step={step} bare />
            </div>

            <div className="grid sm:grid-cols-[minmax(0,1fr)_auto] gap-3 mt-2 items-end lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:pointer-events-none [&>*]:pointer-events-auto">
                <Card className="p-3 max-w-[300px] bg-white/90">
                    {DEPTS.map((d) => {
                        const all = HQ_ROOM.agents.filter((a) => a.zone === d.zone && !a.human);
                        const live = all.filter((a) => a.status !== 'in-build');
                        return (
                            <button key={d.id} type="button" onClick={() => onDept(d.id)} className="w-full flex items-center gap-3 px-1.5 py-1.5 rounded hover:bg-charcoal/5 text-left">
                                <i className="w-3 h-3 rounded-[3px]" style={{ background: d.dot }} />
                                <span className="flex-1 text-[14px]">{d.label}</span>
                                <span className="text-[13px] font-semibold">{live.length} of {all.length} live</span>
                                <span className="text-steel-dark">&rsaquo;</span>
                            </button>
                        );
                    })}
                    <div className="text-[12px] text-steel-dark mt-1.5 px-1.5">Click a desk or a department. Demo, sample activity.</div>
                </Card>
                <Card className="flex items-center gap-4 px-4 py-2.5 bg-white/90">
                    <div>
                        <div className="text-[12px] text-steel-dark">Handoffs today</div>
                        <div className="font-semibold text-[22px] leading-tight">{(312 + Math.max(step, 0) * 3).toLocaleString()}</div>
                    </div>
                    <button type="button" onClick={onTogglePlay} className={ghost}>{playing ? 'Pause the room' : 'Play the room'}</button>
                </Card>
            </div>
        </div>
    );
};

/* ---------------- Outbound ---------------- */

const STAGES: { id: Stage; label: string; action?: string; next?: Stage }[] = [
    { id: 'contacted', label: 'Contacted', action: 'Mark as replied', next: 'replied' },
    { id: 'replied', label: 'Replied', action: 'Book the call', next: 'booked' },
    { id: 'booked', label: 'Call booked', action: 'Mark as client', next: 'client' },
    { id: 'client', label: 'Client' },
];

export const OutboundView: React.FC<{ onLog: Log }> = ({ onLog }) => {
    const [list, setList] = useState<Prospect[]>(PROSPECTS);
    const [blockSent, setBlockSent] = useState(false);
    const max = FUNNEL[0].value;
    const move = (p: Prospect, next: Stage) => {
        setList((l) => l.map((x) => (x.id === p.id ? { ...x, stage: next, agent: 'rob', note: 'Moved by you just now', when: 'now' } : x)));
        onLog('rob', `Moved ${p.name} to ${STAGES.find((s) => s.id === next)?.label.toLowerCase()}.`);
    };
    return (
        <div>
            <ViewHead title="Outbound" sub="HVAC shops with a reason to buy this week, found overnight and emailed in Rob’s voice. Every first email leads with the Shang build." stats={[['960', 'Emailed, 30 days'], ['86', 'Replied'], ['31', 'Calls booked']]} />
            <div className="grid xl:grid-cols-[minmax(0,1fr)_300px] gap-4 mt-6">
                <Card className="p-5">
                    <div className="flex items-baseline justify-between">
                        <div className="font-semibold">The funnel, last 30 days</div>
                        <div className="text-[12px] text-steel-dark">Sample numbers</div>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {FUNNEL.map((f, i) => (
                            <div key={f.label} className="grid grid-cols-[110px_minmax(0,1fr)_56px] items-center gap-3">
                                <div className="text-[13px] text-charcoal/75">{f.label}</div>
                                <div className="h-6 bg-charcoal/[0.05] rounded">
                                    <div className="h-full rounded" style={{ width: `${Math.max((f.value / max) * 100, 1.2)}%`, background: i === FUNNEL.length - 1 ? '#F0B429' : `rgba(70,97,122,${0.35 + i * 0.12})` }} />
                                </div>
                                <div className="text-right font-semibold text-[14px]">{f.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-5 flex flex-col">
                    <div className="font-semibold">Tonight’s send block</div>
                    <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed"><b className="text-charcoal">14 Tier A shops</b>, owner-run, hiring a dispatcher. One email each at 7 AM their time.</p>
                    <div className="bg-charcoal/[0.04] rounded-md p-3 mt-3 text-[13px] text-charcoal/75">Last block: 14 sent, 9 replies, <b className="text-charcoal">2 calls booked</b></div>
                    <div className="flex-1" />
                    <button type="button" disabled={blockSent} onClick={() => { setBlockSent(true); onLog('rob', 'Approved tonight’s send block: 14 shops.'); }} className={`${dark} mt-4 py-2.5 disabled:bg-charcoal/40`}>
                        {blockSent ? 'Approved. Sender has it.' : 'Approve tonight’s block'}
                    </button>
                </Card>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
                {STAGES.map((s) => {
                    const items = list.filter((p) => p.stage === s.id);
                    return (
                        <div key={s.id} className="bg-charcoal/[0.04] rounded-lg p-2.5">
                            <div className="flex items-baseline justify-between px-1.5 py-1">
                                <div className="font-semibold text-[14px]">{s.label}</div>
                                <div className="text-[12px] text-steel-dark">{items.length} shown</div>
                            </div>
                            <div className="space-y-2 mt-1">
                                {items.map((p) => (
                                    <Card key={p.id} className="p-3 bg-white">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <div className="font-semibold text-[14px] truncate">{p.name}</div>
                                            <div className="text-[13px] font-semibold shrink-0">{p.value}</div>
                                        </div>
                                        <div className="text-[12px] text-steel-dark">{p.city}</div>
                                        <div className="text-[13px] mt-1.5">{p.signal}</div>
                                        <div className="flex items-start gap-2 bg-charcoal/[0.04] rounded p-2 mt-2 text-[12.5px]">
                                            <Avatar id={p.agent} size={18} />
                                            <span className="flex-1"><b className="font-semibold">{byId[p.agent].name}:</b> {p.note}</span>
                                            <span className="text-steel-dark shrink-0">{p.when}</span>
                                        </div>
                                        {s.next && <button type="button" onClick={() => move(p, s.next!)} className={`${ghost} w-full mt-2`}>{s.action}</button>}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ---------------- Clients ---------------- */

const STATUS: Record<string, [string, string]> = {
    live: ['Healthy', 'bg-[#CFDDC6] text-[#3E5A35]'],
    building: ['Building', 'bg-[#ECE0BC] text-[#6B5A22]'],
    slipping: ['Waiting on Rob', 'bg-[#EDD3C4] text-[#87533C]'],
};

export const ClientsView: React.FC<{ onLog: Log }> = ({ onLog }) => {
    const [sel, setSel] = useState('ggc');
    const c = CLIENTS.find((x) => x.id === sel)!;
    const rows: [string, (x: (typeof CLIENTS)[number]) => React.ReactNode][] = [
        ['Business', (x) => x.type],
        ['Agents live', (x) => x.agents - x.inBuild],
        ['In build', (x) => x.inBuild],
        ['Last ship', (x) => x.lastShip],
        ['Watched by', (x) => x.watch],
    ];
    return (
        <div>
            <ViewHead title="Clients" sub="Every client system GYST runs, watched by the Builds and Ops agents. Click a client to see what the agents see." stats={[['4', 'Systems live'], ['32', 'Agents working'], ['$41', 'Compute this week']]} />
            <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-4 mt-6">
                <Card className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-[14px]">
                        <thead>
                            <tr>
                                <th className="w-[130px]" />
                                {CLIENTS.map((x) => (
                                    <th key={x.id} className={`p-0 align-bottom ${sel === x.id ? 'bg-[#F6EBC8]' : ''}`}>
                                        <button type="button" onClick={() => setSel(x.id)} className="w-full text-left px-3 pt-4 pb-3">
                                            <span className={`inline-block text-[11px] font-semibold rounded-full px-2 py-0.5 ${STATUS[x.status][1]}`}>{STATUS[x.status][0]}</span>
                                            <span className="block font-semibold text-[16px] mt-2 leading-tight">{x.name}</span>
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(([label, get]) => (
                                <tr key={label} className="border-t border-charcoal/10">
                                    <td className="px-4 py-3 text-charcoal/70">{label}</td>
                                    {CLIENTS.map((x) => (
                                        <td key={x.id} onClick={() => setSel(x.id)} className={`px-3 py-3 cursor-pointer ${sel === x.id ? 'bg-[#F6EBC8]' : ''}`}>{get(x)}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="border-t border-charcoal/10">
                                <td className="px-4 py-3 text-charcoal/70">See it</td>
                                {CLIENTS.map((x) => (
                                    <td key={x.id} className={`px-3 py-3 ${sel === x.id ? 'bg-[#F6EBC8]' : ''}`}>
                                        {x.href ? <a href={x.href} className="font-semibold underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal">Open &rarr;</a> : <span className="text-steel-dark">Private</span>}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <Card className="p-5 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="font-semibold text-[20px] leading-tight">{c.name}</div>
                            <div className="text-[13px] text-steel-dark mt-0.5">{c.type}</div>
                        </div>
                        <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span>
                    </div>
                    <div className="text-[13px] font-semibold mt-5">What the agents see here</div>
                    <div className="space-y-2 mt-2">
                        {c.notes.map((n) => (
                            <div key={n} className="text-[13.5px] bg-charcoal/[0.04] rounded-md px-3 py-2 leading-snug">{n}</div>
                        ))}
                    </div>
                    <div className="flex-1 min-h-4" />
                    <button type="button" onClick={() => onLog('reporter', `Sent Rob a status page for ${c.name}.`)} className={`${dark} mt-4 py-2.5`}>Send me a status page</button>
                    {c.href && <a href={c.href} className={`${ghost} mt-2 py-2.5 no-underline text-charcoal`}>Open the {c.id === 'hvac' ? 'funnel' : 'case study'}</a>}
                </Card>
            </div>
        </div>
    );
};

/* ---------------- The Brain ---------------- */

export const BrainView: React.FC<{ onLog: Log }> = ({ onLog }) => {
    const readers = useMemo(() => HQ_ROOM.agents.filter((a) => SHELVES.some((s) => s.readers.includes(a.id))), []);
    const [agent, setAgent] = useState<string | null>(null);
    const [shelf, setShelf] = useState<string>('voice');
    const [taught, setTaught] = useState<string[]>([]);
    const [draft, setDraft] = useState('');
    const ROW = 30;
    const H = readers.length * ROW;
    const shelfY = (i: number) => (H / SHELVES.length) * (i + 0.5);
    const agentY = (i: number) => ROW * (i + 0.5);
    const lit = (a: string, s: string) => (agent ? agent === a : shelf === s);

    return (
        <div>
            <ViewHead title="The Brain" sub="One shared memory for the whole office. Every agent reads it before it acts, and every decision Rob makes is written back into it." stats={[['2,946', 'Memories'], ['120', 'Skills'], ['312', 'Voice samples']]} />
            <div className="grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-4 mt-6">
                <Card className="p-5 overflow-x-auto">
                    <div className="flex items-baseline justify-between">
                        <div className="font-semibold">Who reads what</div>
                        <div className="text-[12px] text-steel-dark">Click an agent or a shelf</div>
                    </div>
                    <div className="grid grid-cols-[132px_minmax(80px,1fr)_180px] mt-4 min-w-[440px]" style={{ height: H }}>
                        <div>
                            {readers.map((a) => (
                                <button key={a.id} type="button" onClick={() => setAgent(agent === a.id ? null : a.id)} className={`w-full flex items-center justify-end gap-2 text-[13px] ${agent === a.id ? 'font-semibold' : ''}`} style={{ height: ROW }}>
                                    {a.name} <Avatar id={a.id} size={20} />
                                </button>
                            ))}
                        </div>
                        <svg viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" className="w-full h-full">
                            {SHELVES.flatMap((s, si) =>
                                s.readers.map((r) => {
                                    const ai = readers.findIndex((a) => a.id === r);
                                    const on = lit(r, s.id);
                                    return (
                                        <path key={`${s.id}-${r}`} d={`M0 ${agentY(ai)} C50 ${agentY(ai)} 50 ${shelfY(si)} 100 ${shelfY(si)}`} fill="none" stroke={on ? '#1A1B1D' : 'rgba(26,27,29,0.13)'} strokeWidth={on ? 1.6 : 1} vectorEffect="non-scaling-stroke" />
                                    );
                                }),
                            )}
                        </svg>
                        <div className="relative">
                            {SHELVES.map((s, i) => (
                                <button key={s.id} type="button" onClick={() => { setShelf(s.id); setAgent(null); }} className={`absolute left-0 right-0 -translate-y-1/2 text-left rounded-md border px-3 py-2 ${shelf === s.id && !agent ? 'bg-charcoal text-paper border-charcoal' : 'bg-white border-charcoal/15 hover:border-charcoal/40'}`} style={{ top: shelfY(i) }}>
                                    <div className="font-semibold text-[13.5px] leading-tight">{s.label}</div>
                                    <div className={`text-[11.5px] font-mono ${shelf === s.id && !agent ? 'text-paper/60' : 'text-steel-dark'}`}>{s.file} · {s.count.toLocaleString()}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card className="p-5 flex flex-col">
                    <div className="flex items-baseline justify-between">
                        <div className="font-semibold">Rob’s voice</div>
                        <div className="text-[12px] text-steel-dark">Real rules from VOICE.md</div>
                    </div>
                    <div className="space-y-2 mt-3">
                        {[...taught.map((t) => ({ rule: t, src: 'Taught just now' })), ...VOICE_RULES].map((v) => (
                            <div key={v.rule} className="border border-charcoal/10 rounded-md px-3.5 py-2.5 bg-white">
                                <div className="text-[14px] leading-snug">{v.rule}</div>
                                <div className="text-[11.5px] text-steel-dark mt-1">{v.src}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 min-h-4" />
                    <form
                        className="mt-4 bg-charcoal/[0.04] rounded-md p-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!draft.trim()) return;
                            setTaught((t) => [draft.trim(), ...t]);
                            onLog('mission', `New memory on the voice shelf: "${draft.trim().slice(0, 60)}"`);
                            setDraft('');
                        }}
                    >
                        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Teach the agents something. For example: never pitch in line one." className="w-full bg-transparent text-[14px] outline-none placeholder:text-steel-dark" />
                        <div className="flex justify-end mt-2"><button type="submit" className={dark}>Add memory</button></div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

/* ---------------- Departments ---------------- */

const DEPT_STATS: Record<DeptId, [string, string][]> = {
    sales: [['212', 'Signals this week'], ['14', 'Tier A today'], ['2', 'Calls booked']],
    content: [['30', 'Pieces staged'], ['3', 'AI tells cut today'], ['7 AM', 'Next post']],
    builds: [['4', 'Client systems'], ['1', 'Ship today'], ['0', 'Unreviewed merges']],
    ops: [['8', 'Workstreams'], ['5', 'Waiting on Rob'], ['$41', 'Compute this week']],
};

const WS: Record<string, [string, string]> = {
    active: ['Active', 'bg-[#ECE0BC] text-[#6B5A22]'],
    done: ['Done', 'bg-[#CFDDC6] text-[#3E5A35]'],
    waiting: ['Waiting on Rob', 'bg-[#EDD3C4] text-[#87533C]'],
};

const Feature: React.FC<{ dept: DeptId; onLog: Log }> = ({ dept, onLog }) => {
    const [sel, setSel] = useState(REPLIES[0].id);
    const [sent, setSent] = useState<Set<string>>(new Set());
    if (dept === 'sales') {
        const r = REPLIES.find((x) => x.id === sel)!;
        return (
            <Card className="p-5">
                <div className="flex items-baseline justify-between">
                    <div className="font-semibold">Reply inbox</div>
                    <div className="text-[12px] text-steel-dark">Every reply is read and tagged by Reply Router</div>
                </div>
                <div className="grid md:grid-cols-[240px_minmax(0,1fr)] gap-3 mt-4">
                    <div className="space-y-1.5">
                        {REPLIES.map((x) => (
                            <button key={x.id} type="button" onClick={() => setSel(x.id)} className={`w-full text-left rounded-md px-3 py-2.5 ${sel === x.id ? 'bg-charcoal text-paper' : 'hover:bg-charcoal/5'}`}>
                                <div className="font-semibold text-[14px]">{x.who}</div>
                                <div className={`text-[12px] ${sel === x.id ? 'text-paper/65' : 'text-steel-dark'}`}>{x.tag}</div>
                            </button>
                        ))}
                    </div>
                    <div className="bg-charcoal/[0.04] rounded-md p-4">
                        <div className="space-y-2.5">
                            {r.thread.map(([who, text], i) =>
                                who === 'agent' ? (
                                    <div key={i} className="flex gap-2"><Avatar id="writer" size={22} /><div className="bg-white border border-charcoal/10 rounded-lg px-3 py-2 text-[13.5px] max-w-[85%]">{text}</div></div>
                                ) : (
                                    <div key={i} className="flex justify-end"><div className="bg-[#DCE5EC] rounded-lg px-3 py-2 text-[13.5px] max-w-[85%]">{text}</div></div>
                                ),
                            )}
                        </div>
                        <div className="bg-white border border-charcoal/10 rounded-md px-3 py-2.5 mt-3 text-[13px]"><b className="font-semibold">Summary in GoHighLevel.</b> {r.summary}</div>
                        <button type="button" disabled={sent.has(r.id)} onClick={() => { setSent((s) => new Set(s).add(r.id)); onLog('router', `Follow-up sent to ${r.who.split(',')[1]?.trim() ?? r.who}.`); }} className={`${dark} mt-3 disabled:bg-charcoal/40`}>
                            {sent.has(r.id) ? 'Follow-up sent' : 'Send the follow-up'}
                        </button>
                    </div>
                </div>
            </Card>
        );
    }
    if (dept === 'content') {
        return (
            <Card className="p-5">
                <div className="font-semibold">Content queue</div>
                <div className="grid md:grid-cols-3 gap-3 mt-4">
                    {CONTENT_QUEUE.map((col) => (
                        <div key={col.stage} className="bg-charcoal/[0.04] rounded-md p-2.5">
                            <div className="font-semibold text-[13.5px] px-1 pb-1.5">{col.stage}</div>
                            <div className="space-y-2">
                                {col.items.map(([t, s]) => (
                                    <div key={t} className="bg-white border border-charcoal/10 rounded-md px-3 py-2.5">
                                        <div className="text-[13.5px] leading-snug">{t}</div>
                                        <div className="text-[11.5px] text-steel-dark mt-1">{s}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }
    if (dept === 'builds') {
        return (
            <Card className="p-5">
                <div className="flex items-baseline justify-between">
                    <div className="font-semibold">Build log</div>
                    <div className="text-[12px] text-steel-dark">Every change is a reviewed pull request</div>
                </div>
                <div className="divide-y divide-charcoal/10 mt-3">
                    {BUILD_LOG.map(([t, repo, s]) => (
                        <div key={t} className="flex items-center gap-3 py-2.5">
                            <Avatar id={s === 'Merged' ? 'console' : 'reviewer'} size={22} />
                            <div className="flex-1 min-w-0">
                                <div className="text-[14px] truncate">{t}</div>
                                <div className="text-[12px] font-mono text-steel-dark">{repo}</div>
                            </div>
                            <span className="text-[12px] font-semibold shrink-0">{s}</span>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }
    return (
        <Card className="p-5 overflow-x-auto">
            <div className="flex items-baseline justify-between">
                <div className="font-semibold">Workstream tracker</div>
                <div className="text-[12px] text-steel-dark">Real statuses from Rob’s tracker</div>
            </div>
            <table className="w-full min-w-[560px] text-[14px] mt-3">
                <tbody className="divide-y divide-charcoal/10">
                    {WORKSTREAMS.map((w) => (
                        <tr key={w.id}>
                            <td className="py-2.5 pr-3 font-mono text-[12px] text-steel-dark">{w.id}</td>
                            <td className="py-2.5 pr-3 font-semibold whitespace-nowrap">{w.name}</td>
                            <td className="py-2.5 pr-3 text-charcoal/75">{w.finish}</td>
                            <td className="py-2.5 text-right"><span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 whitespace-nowrap ${WS[w.status][1]}`}>{WS[w.status][0]}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export const DeptView: React.FC<{ dept: (typeof DEPTS)[number]; feed: FeedItem[]; onLog: Log }> = ({ dept, onLog }) => {
    const agents = HQ_ROOM.agents.filter((a) => a.zone === dept.zone);
    const [running, setRunning] = useState<string | null>(null);
    const [runs, setRuns] = useState<Record<string, number>>({});
    const run = (id: string) => {
        setRunning(id);
        window.setTimeout(() => {
            setRunning(null);
            setRuns((r) => ({ ...r, [id]: (r[id] ?? 0) + 1 }));
            const a = byId[id];
            onLog(id, a.today[(runs[id] ?? 0) % a.today.length] + '.');
        }, 1100);
    };
    return (
        <div>
            <ViewHead title={dept.label} sub={dept.blurb} stats={DEPT_STATS[dept.id]} />
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
                {agents.map((a) => {
                    const building = a.status === 'in-build';
                    return (
                        <Card key={a.id} className={`p-4 flex flex-col ${building ? 'border-dashed' : ''}`}>
                            <div className="flex items-start gap-2.5">
                                <Avatar id={a.id} size={30} />
                                <div className="min-w-0">
                                    <div className="font-semibold leading-tight">{a.name}</div>
                                    <div className="text-[12.5px] text-steel-dark leading-snug">{a.role}</div>
                                </div>
                            </div>
                            <div className="bg-charcoal/[0.04] rounded-md px-3 py-2 mt-3 text-[13px] leading-snug flex-1">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-steel-dark mb-0.5">{building ? 'In build' : a.human ? 'Today' : 'Right now'}</div>
                                {running === a.id ? 'Running...' : a.today[0]}
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-3">
                                <span className="text-[12px] text-steel-dark">{a.human ? 'Person' : building ? 'Not live yet' : `${(runs[a.id] ?? 0) + a.today.length * 9 + a.name.length * 4} tasks today`}</span>
                                {!a.human && !building && (
                                    <button type="button" disabled={running === a.id} onClick={() => run(a.id)} className={`${dark} disabled:bg-charcoal/40`}>Run now</button>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
            <div className="mt-4">
                <Feature dept={dept.id} onLog={onLog} />
            </div>
        </div>
    );
};
