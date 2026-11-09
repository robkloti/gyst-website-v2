import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RoomAgent, RoomData } from './types';
import { track } from '../lib/track';

const S = 34;
const WALL = 3.2;
const DESK = { w: 1.5, d: 0.8, z: 0.45 };
const STEP_MS = 2800;

const C = {
    floor: '#202124',
    wallL: '#232427',
    wallR: '#1E1F22',
    line: 'rgba(242,240,235,0.16)',
    lineSoft: 'rgba(242,240,235,0.06)',
    paper: '#F2F0EB',
    steel: '#8A9099',
    hazard: '#F0B429',
    deskTop: '#2B2D31',
    deskSide: '#24262A',
    deskFront: '#1C1D20',
};

type Pt = [number, number];
const iso = (x: number, y: number, z = 0): Pt => [(x - y) * S * 0.866, (x + y) * S * 0.5 - z * S];
const poly = (pts: Pt[]) => pts.map((p) => p.join(',')).join(' ');
const wrapLabel = (label: string): string[] => {
    const rows: string[] = [];
    for (const word of label.toUpperCase().split(' ')) {
        const last = rows[rows.length - 1];
        if (last && `${last} ${word}`.length <= 10) rows[rows.length - 1] = `${last} ${word}`;
        else rows.push(word);
    }
    return rows;
};
const head = (a: RoomAgent): Pt => iso(a.x + DESK.w / 2, a.y + DESK.d + 0.45, 1.05);

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const on = () => setReduced(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return reduced;
};

const Desk: React.FC<{ a: RoomAgent; active: boolean; target: boolean; onOpen: () => void }> = ({ a, active, target, onOpen }) => {
    const { x, y } = a;
    const { w, d, z } = DESK;
    const top = poly([iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)]);
    const right = poly([iso(x + w, y, 0), iso(x + w, y + d, 0), iso(x + w, y + d, z), iso(x + w, y, z)]);
    const front = poly([iso(x, y + d, 0), iso(x + w, y + d, 0), iso(x + w, y + d, z), iso(x, y + d, z)]);
    const screen = poly([iso(x + 0.3, y + 0.15, z), iso(x + 1.2, y + 0.15, z), iso(x + 1.2, y + 0.15, z + 0.5), iso(x + 0.3, y + 0.15, z + 0.5)]);
    const cx = x + w / 2;
    const cy = y + d + 0.45;
    const [bx, by] = iso(cx, cy, 0.55);
    const [hx, hy] = iso(cx, cy, 1.05);
    const [fx, fy] = iso(cx, cy, 0);
    const building = a.status === 'in-build';
    const lit = active || target;

    return (
        <g
            role="button"
            tabIndex={0}
            aria-label={`${a.name}, ${a.role}. Open details`}
            onClick={onOpen}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
            className="cursor-pointer outline-none group"
            style={{ opacity: building ? 0.55 : 1 }}
        >
            {active && (
                <ellipse cx={fx} cy={fy} rx={26} ry={13} fill="none" stroke={C.hazard} strokeWidth={1.5} className="room-pulse" />
            )}
            <polygon points={right} fill={C.deskSide} stroke={C.line} strokeDasharray={building ? '3 3' : undefined} />
            <polygon points={front} fill={C.deskFront} stroke={C.line} strokeDasharray={building ? '3 3' : undefined} />
            <polygon points={top} fill={C.deskTop} stroke={C.line} strokeDasharray={building ? '3 3' : undefined} className="group-hover:stroke-[#F2F0EB] group-focus-visible:stroke-[#F2F0EB]" />
            <polygon points={screen} fill={lit ? 'rgba(242,240,235,0.22)' : '#141517'} stroke={C.line} />
            <ellipse cx={fx} cy={fy} rx={11} ry={5.5} fill="rgba(0,0,0,0.35)" />
            {a.human ? (
                <>
                    <ellipse cx={bx} cy={by} rx={7.5} ry={9.5} fill={C.floor} stroke={C.paper} strokeWidth={1.3} />
                    <circle cx={hx} cy={hy} r={6.2} fill={C.floor} stroke={C.paper} strokeWidth={1.3} />
                </>
            ) : (
                <>
                    <ellipse cx={bx} cy={by} rx={7.5} ry={9.5} fill={C.steel} />
                    <circle cx={hx} cy={hy} r={6.2} fill={active ? C.hazard : C.paper} />
                </>
            )}
            <rect x={hx - 40} y={hy - 34} width={80} height={44} fill="transparent" />
        </g>
    );
};

export const WorkerRoom: React.FC<{ room: RoomData }> = ({ room }) => {
    const { w, h } = room.floor;
    const reduced = usePrefersReducedMotion();
    const [step, setStep] = useState(-1);
    const [playing, setPlaying] = useState(true);
    const [visible, setVisible] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const panRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = panRef.current;
        if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, []);

    const byId = useMemo(() => Object.fromEntries(room.agents.map((a) => [a.id, a])), [room.agents]);
    const agentsSorted = useMemo(() => [...room.agents].sort((a, b) => a.x + a.y - (b.x + b.y)), [room.agents]);

    const [minX, minY, vbW, vbH] = useMemo(() => {
        const xs = [iso(0, h)[0], iso(w, 0)[0]];
        const top = iso(0, 0, WALL)[1];
        const bottom = iso(w, h)[1];
        return [xs[0] - 24, top - 24, xs[1] - xs[0] + 48, bottom - top + 48];
    }, [w, h]);

    useEffect(() => {
        if (reduced) setPlaying(false);
    }, [reduced]);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!playing || !visible || openId) return;
        const t = window.setTimeout(() => setStep((s) => (s + 1) % room.script.length), step < 0 ? 600 : STEP_MS);
        return () => window.clearTimeout(t);
    }, [playing, visible, openId, step, room.script.length]);

    useEffect(() => {
        if (!openId) return;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openId]);

    const counters = useMemo(() => {
        const vals: Record<string, number> = Object.fromEntries(room.counters.map((c) => [c.id, c.start]));
        for (let i = 0; i <= step; i++) {
            const c = room.script[i]?.counter;
            if (!c) continue;
            const [id, n] = c.split(':');
            vals[id] += Number(n);
        }
        return vals;
    }, [step, room]);

    const current = step >= 0 ? room.script[step] : null;
    const from = current ? byId[current.from] : null;
    const to = current ? byId[current.to] : null;
    const feed = step >= 0 ? room.script.slice(0, step + 1).reverse().slice(0, 6) : [];
    const pct = (p: Pt) => ({ left: `${((p[0] - minX) / vbW) * 100}%`, top: `${((p[1] - minY) / vbH) * 100}%` });

    const open = (a: RoomAgent) => {
        setOpenId(a.id);
        track('room_agent_open', { room: room.slug, agent: a.id });
    };
    const opened = openId ? byId[openId] : null;
    const handsTo = opened ? [...new Set(room.script.filter((s) => s.from === opened.id).map((s) => s.to))] : [];
    const getsFrom = opened ? [...new Set(room.script.filter((s) => s.to === opened.id).map((s) => s.from))] : [];

    // Wall screen lives on the back-right wall (y = 0).
    const scr = { x0: 4.4, x1: 12.4, z0: 0.85, z1: 2.85 };
    const colW = (scr.x1 - scr.x0 - 0.5) / room.counters.length;
    const wallText = (x: number, z: number) => {
        const [px, py] = iso(x, 0, z);
        return `matrix(0.866 0.5 0 1 ${px} ${py})`;
    };
    const floorText = (x: number, y: number) => {
        const [px, py] = iso(x, y);
        return `matrix(0.866 0.5 -0.866 0.5 ${px} ${py})`;
    };

    return (
        <div ref={wrapRef} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-px bg-paper/10 border border-paper/10">
            <div className="relative bg-charcoal min-w-0">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-paper/10">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel truncate">{room.title}</div>
                    <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-paper border border-paper/25 px-3 py-1.5 hover:bg-paper/10"
                    >
                        {playing ? 'Pause the room' : 'Play the room'}
                    </button>
                </div>
                <div ref={panRef} className="overflow-x-auto overscroll-x-contain">
                <div className="relative min-w-[700px] sm:min-w-0">
                    <svg viewBox={`${minX} ${minY} ${vbW} ${vbH}`} className="block w-full h-auto" role="img" aria-label={`Isometric office for ${room.title}. Each desk is an agent; click one to see what it does.`}>
                        <polygon points={poly([iso(0, 0), iso(w, 0), iso(w, 0, WALL), iso(0, 0, WALL)])} fill={C.wallR} stroke={C.line} />
                        <polygon points={poly([iso(0, 0), iso(0, h), iso(0, h, WALL), iso(0, 0, WALL)])} fill={C.wallL} stroke={C.line} />
                        {[2, 5, 8].map((y) => (
                            <polygon key={y} points={poly([iso(0, y, 0.9), iso(0, y + 2, 0.9), iso(0, y + 2, 2.7), iso(0, y, 2.7)])} fill="rgba(242,240,235,0.05)" stroke={C.line} />
                        ))}
                        <polygon points={poly([iso(scr.x0, 0, scr.z0), iso(scr.x1, 0, scr.z0), iso(scr.x1, 0, scr.z1), iso(scr.x0, 0, scr.z1)])} fill="#121315" stroke={C.line} />
                        <text transform={wallText(scr.x0 + 0.3, scr.z1 - 0.38)} fill={C.steel} fontFamily="JetBrains Mono" fontSize={8} letterSpacing={1.4}>
                            {room.wallTitle.toUpperCase()} · TODAY
                        </text>
                        {room.counters.map((c, i) => (
                            <g key={c.id}>
                                <text transform={wallText(scr.x0 + 0.3 + i * colW, scr.z0 + 0.75)} fill={C.paper} fontFamily="Archivo" fontWeight={600} fontSize={20}>
                                    {counters[c.id].toLocaleString()}
                                </text>
                                {wrapLabel(c.label).map((row, r) => (
                                    <text key={row} transform={wallText(scr.x0 + 0.3 + i * colW, scr.z0 + 0.42 - r * 0.24)} fill={C.steel} fontFamily="JetBrains Mono" fontSize={6.5} letterSpacing={0.6}>
                                        {row}
                                    </text>
                                ))}
                            </g>
                        ))}

                        <polygon points={poly([iso(0, 0), iso(w, 0), iso(w, h), iso(0, h)])} fill={C.floor} stroke={C.line} />
                        {Array.from({ length: w - 1 }, (_, i) => i + 1).map((x) => (
                            <line key={`gx${x}`} x1={iso(x, 0)[0]} y1={iso(x, 0)[1]} x2={iso(x, h)[0]} y2={iso(x, h)[1]} stroke={C.lineSoft} />
                        ))}
                        {Array.from({ length: h - 1 }, (_, i) => i + 1).map((y) => (
                            <line key={`gy${y}`} x1={iso(0, y)[0]} y1={iso(0, y)[1]} x2={iso(w, y)[0]} y2={iso(w, y)[1]} stroke={C.lineSoft} />
                        ))}
                        {room.zones.map((z) => (
                            <g key={z.id}>
                                <polygon points={poly([iso(z.x, z.y), iso(z.x + z.w, z.y), iso(z.x + z.w, z.y + z.h), iso(z.x, z.y + z.h)])} fill="rgba(242,240,235,0.025)" stroke="rgba(242,240,235,0.22)" strokeDasharray="4 4" />
                                <text transform={floorText(z.x + 0.25, z.y + z.h - 0.3)} fill={C.steel} fontFamily="JetBrains Mono" fontSize={9} letterSpacing={1.8}>
                                    {z.label.toUpperCase()}
                                </text>
                            </g>
                        ))}

                        {agentsSorted.map((a) => (
                            <Desk key={a.id} a={a} active={from?.id === a.id} target={to?.id === a.id} onOpen={() => open(a)} />
                        ))}

                        {from && to && (
                            <g key={step} pointerEvents="none">
                                <line x1={head(from)[0]} y1={head(from)[1]} x2={head(to)[0]} y2={head(to)[1]} stroke={C.hazard} strokeWidth={1.4} strokeDasharray="5 5" className="room-dash" />
                                <motion.circle
                                    r={3.5}
                                    fill={C.hazard}
                                    initial={{ cx: head(from)[0], cy: head(from)[1] }}
                                    animate={{ cx: head(to)[0], cy: head(to)[1] }}
                                    transition={{ duration: reduced ? 0 : 1.2, ease: 'easeInOut' }}
                                />
                            </g>
                        )}
                    </svg>

                    <AnimatePresence>
                        {from && current && (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0 } }}
                                transition={{ duration: 0.25 }}
                                className="absolute pointer-events-none"
                                style={pct(head(from))}
                            >
                                <div className="-translate-x-1/2 -translate-y-[calc(100%+18px)] w-max max-w-[240px] bg-paper text-charcoal px-3 py-2 shadow-lg">
                                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel-dark">{from.name}</div>
                                    <div className="text-[13px] leading-snug font-archivo">{current.text}</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 border-t border-paper/10 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                    <span className="flex items-center gap-2"><i className="inline-block w-2.5 h-2.5 rounded-full bg-hazard" /> Working right now</span>
                    <span className="flex items-center gap-2"><i className="inline-block w-2.5 h-2.5 rounded-full bg-paper" /> Agent</span>
                    <span className="flex items-center gap-2"><i className="inline-block w-2.5 h-2.5 rounded-full border border-paper" /> Person</span>
                    <span className="ml-auto normal-case tracking-normal text-[11px]"><span className="sm:hidden">Swipe to pan. Tap</span><span className="hidden sm:inline">Click</span> any desk. Demo, sample activity.</span>
                </div>
            </div>

            <div className="bg-charcoal min-w-0 flex flex-col">
                <div className="px-4 py-3 border-b border-paper/10 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">What the agents just did</div>
                <ol className="flex-1 divide-y divide-paper/10 min-h-[120px] lg:min-h-[220px]" aria-live="polite">
                    {feed.length === 0 && <li className="px-4 py-4 text-sm text-steel">The room is starting up.</li>}
                    {feed.map((e, i) => (
                        <li key={`${step}-${i}`} className={`px-4 py-3 ${i === 0 ? 'bg-paper/[0.04]' : ''}`}>
                            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
                                <button type="button" className="hover:text-paper" onClick={() => open(byId[e.from])}>{byId[e.from].name}</button>
                                {' → '}
                                <button type="button" className="hover:text-paper" onClick={() => open(byId[e.to])}>{byId[e.to].name}</button>
                                <span className="float-right normal-case tracking-normal">{i === 0 ? 'just now' : `${i * 3} min ago`}</span>
                            </div>
                            <div className={`text-sm mt-1 leading-snug ${i === 0 ? 'text-paper' : 'text-paper/60'}`}>{e.text}</div>
                        </li>
                    ))}
                </ol>
            </div>

            <AnimatePresence>
                {opened && (
                    <motion.div className="fixed inset-0 z-[200] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button type="button" aria-label="Close" className="absolute inset-0 bg-black/60" onClick={() => setOpenId(null)} />
                        <motion.aside
                            role="dialog"
                            aria-modal="true"
                            aria-label={opened.name}
                            initial={{ x: 40 }}
                            animate={{ x: 0 }}
                            exit={{ x: 40 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-[400px] h-full overflow-y-auto bg-charcoal border-l border-paper/15 p-6 font-archivo"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
                                        {opened.human ? 'Person' : opened.status === 'in-build' ? 'Agent · in build' : 'Agent'} · {room.zones.find((z) => z.id === opened.zone)?.label}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-paper mt-2">{opened.name}</h3>
                                    <div className="text-steel">{opened.role}</div>
                                </div>
                                <button ref={closeRef} type="button" onClick={() => setOpenId(null)} className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper border border-paper/25 px-3 py-1.5 hover:bg-paper/10">
                                    Close
                                </button>
                            </div>
                            <p className="text-paper/85 mt-5 leading-relaxed">{opened.does}</p>
                            {opened.measured && (
                                <div className="mt-5 border border-paper/20 p-4">
                                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">Measured</div>
                                    <div className="text-paper mt-1 leading-snug">{opened.measured}</div>
                                </div>
                            )}
                            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">Tools</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {opened.tools.map((t) => (
                                    <span key={t} className="text-[13px] text-paper border border-paper/20 px-2 py-1">{t}</span>
                                ))}
                            </div>
                            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">Today (demo)</div>
                            <ul className="mt-2 space-y-2">
                                {opened.today.map((t) => (
                                    <li key={t} className="text-paper/85 text-[15px] flex gap-3"><span className="text-steel">-</span>{t}</li>
                                ))}
                            </ul>
                            {(getsFrom.length > 0 || handsTo.length > 0) && (
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {[['Gets work from', getsFrom], ['Hands off to', handsTo]].map(([label, ids]) => (
                                        <div key={label as string}>
                                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">{label as string}</div>
                                            <div className="flex flex-col items-start gap-1 mt-2">
                                                {(ids as string[]).map((id) => (
                                                    <button key={id} type="button" onClick={() => open(byId[id])} className="text-[14px] text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                                                        {byId[id].name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
