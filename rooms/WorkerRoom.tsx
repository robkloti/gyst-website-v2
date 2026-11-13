import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RoomAgent, RoomData, RoomProp } from './types';
import { track } from '../lib/track';

const S = 34;
const WALL = 3.2;
const WT = 0.22;
const DESK = { w: 1.5, d: 0.8, z: 0.45 };
const STEP_MS = 2800;

const C = {
    ink: '#1A1B1D',
    hazard: '#F0B429',
    hazardDeep: '#C98A0B',
    floor: '#E2CDA8',
    plank: 'rgba(122,86,40,0.13)',
    wallL: '#EFE9DC',
    wallR: '#E6DECD',
    wallCap: '#F8F5EE',
    wallEdge: '#D7CDB8',
    base: '#CDBFA4',
    glass: '#C7D7DE',
    glassHi: '#DCE8EC',
    frame: '#FBFAF6',
    deskTop: '#D3B183',
    deskSide: '#B9956A',
    deskFront: '#A88459',
    leg: '#F4F1EA',
    monitor: '#2A2C30',
    screenIdle: '#3A4047',
    screenLit: '#FCE7A6',
    chair: '#3B3E44',
    chairSeat: '#4A4E55',
    potA: '#C97E5B',
    potB: '#EEEAE2',
    leaf: ['#5E8E55', '#73A566', '#89B97A'],
    human: '#3D4B60',
    robot: '#FBFAF7',
};

const RUGS = [
    { fill: '#CFDDC6', edge: '#A9C29B', text: '#4F6B44' },
    { fill: '#CCD9E4', edge: '#9FB4C8', text: '#46617A' },
    { fill: '#EDD3C4', edge: '#D7AC93', text: '#87533C' },
    { fill: '#ECE0BC', edge: '#D2BE86', text: '#76632B' },
    { fill: '#DCD4E6', edge: '#B8AACB', text: '#62527C' },
];
const SKIN = ['#E9C6A2', '#C48D61', '#8E5C3D', '#F2D4B8'];
const HAIR = ['#2B2522', '#4A3426', '#1E1B1A', '#6B4A2F'];

type Pt = [number, number];
const iso = (x: number, y: number, z = 0): Pt => [(x - y) * S * 0.866, (x + y) * S * 0.5 - z * S];
const poly = (pts: Pt[]) => pts.map((p) => p.join(',')).join(' ');
const quad = (x: number, y: number, w: number, d: number, z = 0) => poly([iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)]);
const wrapLabel = (label: string): string[] => {
    const rows: string[] = [];
    for (const word of label.toUpperCase().split(' ')) {
        const last = rows[rows.length - 1];
        if (last && `${last} ${word}`.length <= 10) rows[rows.length - 1] = `${last} ${word}`;
        else rows.push(word);
    }
    return rows;
};
const seat = (a: RoomAgent) => ({ cx: a.x + DESK.w / 2, cy: a.y + DESK.d + 0.45 });
const head = (a: RoomAgent): Pt => {
    const { cx, cy } = seat(a);
    return iso(cx, cy, 1.08);
};

const Box: React.FC<{ x: number; y: number; z?: number; w: number; d: number; h: number; top: string; side: string; front: string; stroke?: string; dash?: boolean }> = ({
    x, y, z = 0, w, d, h, top, side, front, stroke = 'rgba(26,27,29,0.18)', dash,
}) => {
    const sd = dash ? '3 3' : undefined;
    return (
        <>
            <polygon points={poly([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)])} fill={side} stroke={stroke} strokeWidth={0.6} strokeDasharray={sd} />
            <polygon points={poly([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)])} fill={front} stroke={stroke} strokeWidth={0.6} strokeDasharray={sd} />
            <polygon points={quad(x, y, w, d, z + h)} fill={top} stroke={stroke} strokeWidth={0.6} strokeDasharray={sd} />
        </>
    );
};

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

const Plant: React.FC<{ x: number; y: number; kind: 'tall' | 'big' | 'small'; delay: number }> = ({ x, y, kind, delay }) => {
    const p = kind === 'small' ? 0.3 : 0.4;
    const ph = kind === 'small' ? 0.3 : 0.42;
    const [cx, cy] = iso(x + p / 2, y + p / 2, ph);
    const r = kind === 'tall' ? 14 : kind === 'big' ? 17 : 11.5;
    const lift = kind === 'tall' ? 40 : kind === 'big' ? 15 : 10;
    const blobs: [number, number, number, number][] =
        kind === 'tall'
            ? [[-9, -lift + 5, r, 0], [9, -lift + 3, r, 1], [0, -lift - 10, r, 2], [-5, -lift - 21, r * 0.8, 1], [6, -lift - 17, r * 0.75, 2]]
            : [[-r * 0.6, -lift, r * 0.85, 0], [r * 0.6, -lift + 1, r * 0.8, 1], [0, -lift - r * 0.6, r * 0.9, 2], [0, -lift + 3, r * 0.6, 0]];
    return (
        <g pointerEvents="none">
            <ellipse cx={iso(x + p / 2, y + p / 2)[0]} cy={iso(x + p / 2, y + p / 2)[1]} rx={p * S * 0.95} ry={p * S * 0.5} fill="rgba(60,40,15,0.14)" />
            <Box x={x} y={y} w={p} d={p} h={ph} top="#7A5A3A" side={kind === 'small' ? C.potB : C.potA} front={kind === 'small' ? '#E2DDD2' : '#B66E4D'} />
            {kind === 'tall' && <line x1={cx} y1={cy} x2={cx} y2={cy - lift} stroke="#6B4E33" strokeWidth={2} />}
            <g className="room-sway" style={{ animationDelay: `${delay}s` }}>
                {blobs.map(([dx, dy, rr, t], i) => (
                    <circle key={i} cx={cx + dx} cy={cy + dy} r={rr} fill={C.leaf[t]} />
                ))}
            </g>
        </g>
    );
};

const Sofa: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <g pointerEvents="none">
        <ellipse cx={iso(x + 1, y + 0.5)[0]} cy={iso(x + 1, y + 0.5)[1]} rx={46} ry={20} fill="rgba(60,40,15,0.12)" />
        <Box x={x} y={y} w={2.2} d={0.3} h={0.8} top="#A7A39B" side="#8F8B83" front="#9C988F" />
        <Box x={x} y={y + 0.3} w={2.2} d={0.7} h={0.38} top="#B9B5AC" side="#8F8B83" front="#A29E95" />
        <Box x={x} y={y + 0.3} w={0.25} d={0.7} h={0.58} top="#A7A39B" side="#8F8B83" front="#9C988F" />
        <Box x={x + 1.95} y={y + 0.3} w={0.25} d={0.7} h={0.58} top="#A7A39B" side="#8F8B83" front="#9C988F" />
    </g>
);

const Table: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <g pointerEvents="none">
        <Box x={x} y={y} w={1.2} d={0.7} h={0.28} top={C.deskTop} side={C.deskSide} front={C.deskFront} />
        <polygon points={quad(x + 0.3, y + 0.2, 0.35, 0.25, 0.28)} fill="#F1EEE8" />
        <ellipse cx={iso(x + 0.85, y + 0.35, 0.28)[0]} cy={iso(x + 0.85, y + 0.35, 0.28)[1] - 3} rx={3.5} ry={2} fill="#FBFAF6" stroke={C.ink} strokeWidth={0.8} />
    </g>
);

const PLANTS: RoomProp[] = [
    { x: 0.15, y: 0.15, kind: 'tall' },
    { x: 15.45, y: 0.15, kind: 'tall' },
    { x: 0.12, y: 4.9, kind: 'small' },
    { x: 15.5, y: 4.92, kind: 'small' },
    { x: 6.3, y: 8.0, kind: 'big' },
    { x: 11.3, y: 7.4, kind: 'small' },
    { x: 15.5, y: 8.2, kind: 'small' },
    { x: 0.12, y: 11.5, kind: 'small' },
];

const Agent: React.FC<{ a: RoomAgent; idx: number; rug: (typeof RUGS)[number]; active: boolean; target: boolean; onOpen: () => void }> = ({ a, idx, rug, active, target, onOpen }) => {
    const { x, y } = a;
    const { w, d, z } = DESK;
    const { cx, cy } = seat(a);
    const [fx, fy] = iso(cx, cy, 0);
    const [bx, by] = iso(cx, cy, 0.62);
    const [hx, hy] = iso(cx, cy, 1.08);
    const building = a.status === 'in-build';
    const lit = active || target;
    const scr0 = iso(x + 0.32, y + 0.2, z + 0.12);
    const scr1 = iso(x + 1.18, y + 0.2, z + 0.12);

    return (
        <g
            role="button"
            tabIndex={0}
            aria-label={`${a.name}, ${a.role}. Open details`}
            onClick={onOpen}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
            className="cursor-pointer outline-none group"
            style={{ opacity: building ? 0.6 : 1 }}
        >
            {active && <ellipse cx={fx} cy={fy} rx={30} ry={15} fill="none" stroke={C.hazardDeep} strokeWidth={1.6} className="room-pulse" />}
            <ellipse cx={iso(x + w / 2, y + d / 2)[0]} cy={iso(x + w / 2, y + d / 2)[1]} rx={30} ry={14} fill="rgba(60,40,15,0.12)" />
            {[[x + 0.06, y + 0.06], [x + w - 0.1, y + 0.06], [x + 0.06, y + d - 0.1], [x + w - 0.1, y + d - 0.1]].map(([lx, ly], i) => (
                <line key={i} x1={iso(lx, ly, 0)[0]} y1={iso(lx, ly, 0)[1]} x2={iso(lx, ly, z)[0]} y2={iso(lx, ly, z)[1]} stroke="#9C9A94" strokeWidth={1.4} />
            ))}
            <Box x={x} y={y} z={z - 0.06} w={w} d={d} h={0.06} top={C.deskTop} side={C.deskSide} front={C.deskFront} dash={building} />
            <polygon points={quad(x, y, w, d, z)} fill="transparent" stroke="transparent" strokeWidth={2} className="group-hover:stroke-[#1A1B1D] group-focus-visible:stroke-[#1A1B1D]" />
            <polygon points={quad(x + 0.45, y + 0.5, 0.6, 0.18, z)} fill="#F1EEE8" stroke="rgba(26,27,29,0.25)" strokeWidth={0.5} />
            <line x1={iso(x + 0.75, y + 0.22, z)[0]} y1={iso(x + 0.75, y + 0.22, z)[1]} x2={iso(x + 0.75, y + 0.22, z + 0.14)[0]} y2={iso(x + 0.75, y + 0.22, z + 0.14)[1]} stroke={C.monitor} strokeWidth={2} />
            <Box x={x + 0.3} y={y + 0.12} z={z + 0.12} w={0.9} d={0.07} h={0.52} top={C.monitor} side={C.monitor} front={C.monitor} stroke={C.monitor} />
            <polygon
                points={poly([iso(x + 0.36, y + 0.2, z + 0.17), iso(x + 1.14, y + 0.2, z + 0.17), iso(x + 1.14, y + 0.2, z + 0.6), iso(x + 0.36, y + 0.2, z + 0.6)])}
                fill={lit ? C.screenLit : C.screenIdle}
            />
            {[0.48, 0.38, 0.28].map((zz, i) => (
                <line key={zz} x1={scr0[0] + 4} y1={iso(x + 0.36, y + 0.2, z + zz)[1] + 2} x2={scr0[0] + 4 + (scr1[0] - scr0[0]) * [0.55, 0.75, 0.4][i]} y2={iso(x + 0.36 + 0.78 * [0.55, 0.75, 0.4][i], y + 0.2, z + zz)[1] + 2} stroke={lit ? 'rgba(26,27,29,0.35)' : 'rgba(255,255,255,0.18)'} strokeWidth={1.2} />
            ))}

            <ellipse cx={fx} cy={fy} rx={12} ry={6} fill="rgba(60,40,15,0.18)" />
            <line x1={fx} y1={fy} x2={iso(cx, cy, 0.38)[0]} y2={iso(cx, cy, 0.38)[1]} stroke={C.chair} strokeWidth={2} />
            <polygon points={quad(cx - 0.28, cy - 0.28, 0.56, 0.56, 0.4)} fill={C.chairSeat} />

            <g className={active ? 'room-busy' : 'room-bob'} style={{ animationDelay: `${(idx % 7) * 0.45}s` }}>
                {a.human ? (
                    <>
                        <ellipse cx={bx} cy={by} rx={8} ry={10} fill={C.human} />
                        <circle cx={hx} cy={hy} r={6.6} fill={SKIN[idx % SKIN.length]} />
                        <path d={`M ${hx - 6.6} ${hy - 0.5} A 6.6 6.6 0 0 1 ${hx + 6.6} ${hy - 0.5} L ${hx + 6.6} ${hy + 2.5} Q ${hx} ${hy - 1} ${hx - 6.6} ${hy + 2.5} Z`} fill={HAIR[idx % HAIR.length]} />
                    </>
                ) : (
                    <>
                        <ellipse cx={bx} cy={by} rx={8} ry={10} fill={rug.text} />
                        <line x1={hx} y1={hy - 6} x2={hx} y2={hy - 12} stroke={C.ink} strokeWidth={1.2} />
                        <circle cx={hx} cy={hy - 13} r={2.4} fill={active ? C.hazard : rug.edge} stroke={C.ink} strokeWidth={0.8} className={active ? 'room-blink' : undefined} />
                        <rect x={hx - 7.5} y={hy - 6.5} width={15} height={12.5} rx={4.5} fill={C.robot} stroke={C.ink} strokeWidth={1} />
                        <rect x={hx - 5.2} y={hy - 2.6} width={10.4} height={4.4} rx={2.2} fill={active ? C.hazard : C.ink} />
                    </>
                )}
            </g>
            <polygon points={poly([iso(cx - 0.3, cy + 0.26, 0.42), iso(cx + 0.3, cy + 0.26, 0.42), iso(cx + 0.3, cy + 0.26, 0.74), iso(cx - 0.3, cy + 0.26, 0.74)])} fill={C.chair} />
            <rect x={hx - 40} y={hy - 34} width={80} height={44} fill="transparent" />
        </g>
    );
};

export const WorkerRoom: React.FC<{ room: RoomData; step?: number; bare?: boolean }> = ({ room, step: stepProp, bare }) => {
    const { w, h } = room.floor;
    const reduced = usePrefersReducedMotion();
    const [innerStep, setStep] = useState(-1);
    const controlled = stepProp !== undefined;
    const step = controlled ? stepProp : innerStep;
    const [playing, setPlaying] = useState(true);
    const [visible, setVisible] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);
    const [now, setNow] = useState(() => new Date());
    const wrapRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const panRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = panRef.current;
        if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, []);

    useEffect(() => {
        if (!visible) return;
        const t = window.setInterval(() => setNow(new Date()), 15000);
        return () => window.clearInterval(t);
    }, [visible]);

    const byId = useMemo(() => Object.fromEntries(room.agents.map((a) => [a.id, a])), [room.agents]);
    const rugOf = useMemo(() => Object.fromEntries(room.zones.map((z, i) => [z.id, RUGS[i % RUGS.length]])), [room.zones]);
    const working = room.agents.filter((a) => !a.human && a.status !== 'in-build').length;

    const [minX, minY, vbW, vbH] = useMemo(() => {
        const xs = [iso(-WT, h)[0], iso(w, -WT)[0]];
        const top = iso(-WT, -WT, WALL)[1];
        const bottom = iso(w, h)[1];
        return [xs[0] - 20, top - 20, xs[1] - xs[0] + 40, bottom - top + 40];
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
        if (controlled || !playing || !visible || openId) return;
        const t = window.setTimeout(() => setStep((s) => (s + 1) % room.script.length), step < 0 ? 600 : STEP_MS);
        return () => window.clearTimeout(t);
    }, [controlled, playing, visible, openId, step, room.script.length]);

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

    const items = useMemo(() => {
        const list: { depth: number; node: React.ReactNode }[] = (room.props ?? PLANTS).map((p, i) => ({
            depth: p.x + p.y + (p.kind === 'sofa' ? 1.5 : p.kind === 'table' ? 1 : 0.4),
            node:
                p.kind === 'sofa' ? <Sofa key={`p${i}`} x={p.x} y={p.y} /> : p.kind === 'table' ? <Table key={`p${i}`} x={p.x} y={p.y} /> : <Plant key={`p${i}`} x={p.x} y={p.y} kind={p.kind} delay={i * 0.8} />,
        }));
        room.agents.forEach((a, i) => {
            const { cx, cy } = seat(a);
            list.push({
                depth: cx + cy,
                node: <Agent key={a.id} a={a} idx={i} rug={rugOf[a.zone] ?? RUGS[0]} active={from?.id === a.id} target={to?.id === a.id} onOpen={() => open(a)} />,
            });
        });
        return list.sort((p, q) => p.depth - q.depth).map((i) => i.node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room.agents, room.props, rugOf, from?.id, to?.id]);

    // Wall screen lives on the back-right wall (y = 0).
    const scr = { x0: w * 0.275, x1: w * 0.775, z0: 0.85, z1: 2.85 };
    const colW = (scr.x1 - scr.x0 - 0.5) / room.counters.length;
    const wallText = (x: number, z: number) => {
        const [px, py] = iso(x, 0, z);
        return `matrix(0.866 0.5 0 1 ${px} ${py})`;
    };
    const floorText = (x: number, y: number) => {
        const [px, py] = iso(x, y);
        return `matrix(0.866 0.5 -0.866 0.5 ${px} ${py})`;
    };
    const leftWall = (y: number, z: number) => {
        const [px, py] = iso(0, y, z);
        return `matrix(0.866 -0.5 0 1 ${px} ${py})`;
    };
    const windowsL = Array.from({ length: Math.floor((h - 0.6) / 3.7) }, (_, i) => 1.2 + i * 3.7);
    const windowsR = [0.9, w - 3];
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const hourDeg = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;
    const minDeg = now.getMinutes() * 6;

    return (
        <div ref={wrapRef} className={bare ? "relative text-charcoal" : "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-px bg-charcoal/10 border border-paper/10 text-charcoal"}>
            <div className={bare ? "relative min-w-0" : "relative bg-paper min-w-0"}>
                {!bare && (
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-charcoal/10">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-dark truncate">{room.title}</div>
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:flex items-center gap-2 font-archivo text-[13px] font-semibold border border-charcoal/15 bg-white/70 rounded-full px-3 py-1">
                            <i className={`inline-block w-2 h-2 rounded-full bg-hazard ${playing ? 'room-blink' : ''}`} />
                            {working} agents working
                        </span>
                        <span className="hidden md:inline font-mono text-[11px] text-steel-dark">{time}</span>
                        <button
                            type="button"
                            onClick={() => setPlaying((p) => !p)}
                            className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal border border-charcoal/25 px-3 py-1.5 hover:bg-charcoal/5"
                        >
                            {playing ? 'Pause the room' : 'Play the room'}
                        </button>
                    </div>
                </div>
                )}
                <div ref={panRef} className="overflow-x-auto overscroll-x-contain">
                    <div className="relative min-w-[700px] sm:min-w-0">
                        <svg viewBox={`${minX} ${minY} ${vbW} ${vbH}`} className="block w-full h-auto" role="img" aria-label={`Isometric office for ${room.title}. Each desk is an agent; click one to see what it does.`}>
                            {/* Walls */}
                            <polygon points={poly([iso(0, 0), iso(w, 0), iso(w, 0, WALL), iso(0, 0, WALL)])} fill={C.wallR} />
                            <polygon points={poly([iso(0, 0), iso(0, h), iso(0, h, WALL), iso(0, 0, WALL)])} fill={C.wallL} />
                            <polygon points={poly([iso(0, 0, 0.14), iso(w, 0, 0.14), iso(w, 0), iso(0, 0)])} fill={C.base} />
                            <polygon points={poly([iso(0, 0, 0.14), iso(0, h, 0.14), iso(0, h), iso(0, 0)])} fill={C.base} />
                            <line x1={iso(0, 0)[0]} y1={iso(0, 0)[1]} x2={iso(0, 0, WALL)[0]} y2={iso(0, 0, WALL)[1]} stroke="rgba(26,27,29,0.08)" />
                            {windowsL.map((y) => (
                                <g key={`wl${y}`}>
                                    <polygon points={poly([iso(0, y, 0.85), iso(0, y + 2.2, 0.85), iso(0, y + 2.2, 2.75), iso(0, y, 2.75)])} fill={C.frame} />
                                    <polygon points={poly([iso(0, y + 0.1, 0.95), iso(0, y + 2.1, 0.95), iso(0, y + 2.1, 2.65), iso(0, y + 0.1, 2.65)])} fill={C.glass} />
                                    <polygon points={poly([iso(0, y + 0.1, 2.0), iso(0, y + 0.9, 2.65), iso(0, y + 1.3, 2.65), iso(0, y + 0.1, 1.6)])} fill={C.glassHi} />
                                    <line x1={iso(0, y + 1.1, 0.95)[0]} y1={iso(0, y + 1.1, 0.95)[1]} x2={iso(0, y + 1.1, 2.65)[0]} y2={iso(0, y + 1.1, 2.65)[1]} stroke={C.frame} strokeWidth={2.5} />
                                    <line x1={iso(0, y + 0.1, 1.8)[0]} y1={iso(0, y + 0.1, 1.8)[1]} x2={iso(0, y + 2.1, 1.8)[0]} y2={iso(0, y + 2.1, 1.8)[1]} stroke={C.frame} strokeWidth={2.5} />
                                </g>
                            ))}
                            {windowsR.map((x) => (
                                <g key={`wr${x}`}>
                                    <polygon points={poly([iso(x, 0, 0.85), iso(x + 2.3, 0, 0.85), iso(x + 2.3, 0, 2.75), iso(x, 0, 2.75)])} fill={C.frame} />
                                    <polygon points={poly([iso(x + 0.1, 0, 0.95), iso(x + 2.2, 0, 0.95), iso(x + 2.2, 0, 2.65), iso(x + 0.1, 0, 2.65)])} fill={C.glass} />
                                    <polygon points={poly([iso(x + 0.1, 0, 1.7), iso(x + 0.9, 0, 2.65), iso(x + 1.3, 0, 2.65), iso(x + 0.1, 0, 1.25)])} fill={C.glassHi} />
                                    <line x1={iso(x + 1.15, 0, 0.95)[0]} y1={iso(x + 1.15, 0, 0.95)[1]} x2={iso(x + 1.15, 0, 2.65)[0]} y2={iso(x + 1.15, 0, 2.65)[1]} stroke={C.frame} strokeWidth={2.5} />
                                </g>
                            ))}
                            <g transform={leftWall(windowsL[1] ? windowsL[1] - 0.85 : 4.05, 2.3)}>
                                <circle r={11} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.4} />
                                <line x1={0} y1={0} x2={0} y2={-5.5} stroke={C.ink} strokeWidth={1.6} strokeLinecap="round" transform={`rotate(${hourDeg})`} />
                                <line x1={0} y1={0} x2={0} y2={-8.5} stroke={C.ink} strokeWidth={1} strokeLinecap="round" transform={`rotate(${minDeg})`} />
                            </g>
                            <polygon points={poly([iso(scr.x0, 0, scr.z0), iso(scr.x1, 0, scr.z0), iso(scr.x1, 0, scr.z1), iso(scr.x0, 0, scr.z1)])} fill="#1F2023" stroke="#0E0F10" strokeWidth={2} />
                            <text transform={wallText(scr.x0 + 0.3, scr.z1 - 0.38)} fill="#A9AFB7" fontFamily="JetBrains Mono" fontSize={8} letterSpacing={1.4}>
                                {room.wallTitle.toUpperCase()} · TODAY
                            </text>
                            <circle transform={wallText(scr.x1 - 0.45, scr.z1 - 0.45)} r={2.6} fill={C.hazard} className={playing ? 'room-blink' : undefined} />
                            {room.counters.map((c, i) => (
                                <g key={c.id}>
                                    <text transform={wallText(scr.x0 + 0.3 + i * colW, scr.z0 + 0.75)} fill="#F2F0EB" fontFamily="Archivo" fontWeight={600} fontSize={20}>
                                        {counters[c.id].toLocaleString()}
                                    </text>
                                    {wrapLabel(c.label).map((row, r) => (
                                        <text key={row} transform={wallText(scr.x0 + 0.3 + i * colW, scr.z0 + 0.42 - r * 0.24)} fill="#A9AFB7" fontFamily="JetBrains Mono" fontSize={6.5} letterSpacing={0.6}>
                                            {row}
                                        </text>
                                    ))}
                                </g>
                            ))}
                            {/* Wall caps */}
                            <polygon points={poly([iso(-WT, -WT, WALL), iso(w, -WT, WALL), iso(w, 0, WALL), iso(0, 0, WALL), iso(0, h, WALL), iso(-WT, h, WALL)])} fill={C.wallCap} stroke={C.wallEdge} strokeWidth={0.8} />
                            <polygon points={poly([iso(-WT, h, 0), iso(0, h, 0), iso(0, h, WALL), iso(-WT, h, WALL)])} fill={C.wallEdge} />
                            <polygon points={poly([iso(w, -WT, 0), iso(w, 0, 0), iso(w, 0, WALL), iso(w, -WT, WALL)])} fill={C.wallEdge} />

                            {/* Floor */}
                            <polygon points={quad(0, 0, w, h)} fill={C.floor} />
                            {Array.from({ length: h * 2 - 1 }, (_, i) => (i + 1) / 2).map((y) => (
                                <line key={`pl${y}`} x1={iso(0, y)[0]} y1={iso(0, y)[1]} x2={iso(w, y)[0]} y2={iso(w, y)[1]} stroke={C.plank} />
                            ))}
                            {windowsL.map((y) => (
                                <polygon key={`sun${y}`} points={poly([iso(0, y + 0.1), iso(0, y + 2.1), iso(2.6, y + 3.0), iso(2.6, y + 1.0)])} fill="rgba(255,250,235,0.32)" />
                            ))}
                            {room.zones.map((z, i) => {
                                const rug = RUGS[i % RUGS.length];
                                return (
                                    <g key={z.id}>
                                        <polygon points={quad(z.x + 0.1, z.y + 0.1, z.w - 0.2, z.h - 0.2)} fill={rug.fill} stroke={rug.edge} strokeWidth={1.2} />
                                        <polygon points={quad(z.x + 0.32, z.y + 0.32, z.w - 0.64, z.h - 0.64)} fill="none" stroke={rug.edge} strokeWidth={0.8} strokeDasharray="1 3" />
                                        <text transform={floorText(z.x + 0.45, z.y + z.h - 0.45)} fill={rug.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={9} letterSpacing={1.8}>
                                            {z.label.toUpperCase()}
                                        </text>
                                    </g>
                                );
                            })}

                            {items}

                            {from && to && (
                                <g key={step} pointerEvents="none">
                                    <line x1={head(from)[0]} y1={head(from)[1]} x2={head(to)[0]} y2={head(to)[1]} stroke={C.hazardDeep} strokeWidth={2} strokeDasharray="5 5" className="room-dash" />
                                    <motion.circle
                                        r={4.5}
                                        fill={C.hazard}
                                        stroke={C.ink}
                                        strokeWidth={1.2}
                                        initial={{ cx: head(from)[0], cy: head(from)[1] }}
                                        animate={{ cx: head(to)[0], cy: head(to)[1] }}
                                        transition={{ duration: reduced ? 0 : 1.2, ease: 'easeInOut' }}
                                    />
                                </g>
                            )}
                        </svg>

                        {room.agents.map((a) =>
                            a.id === from?.id ? null : (
                                <button
                                    key={a.id}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => open(a)}
                                    className="absolute -translate-x-1/2 -translate-y-[calc(100%+20px)] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 border border-charcoal/10 shadow-sm pl-1.5 pr-2 py-[3px] font-archivo text-[10.5px] font-semibold leading-none text-charcoal hover:border-charcoal/40"
                                    style={pct(head(a))}
                                >
                                    <i
                                        className="inline-block w-1.5 h-1.5 rounded-full"
                                        style={a.human ? { boxShadow: 'inset 0 0 0 1.2px #1A1B1D' } : { background: a.id === to?.id ? C.hazard : (rugOf[a.zone] ?? RUGS[0]).text }}
                                    />
                                    {a.name}
                                    {a.status === 'in-build' && <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-steel-dark">in build</span>}
                                </button>
                            ),
                        )}

                        <AnimatePresence>
                            {from && current && (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, transition: { duration: 0 } }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute pointer-events-none z-10"
                                    style={pct(head(from))}
                                >
                                    <div className="-translate-x-1/2 -translate-y-[calc(100%+20px)] w-max max-w-[240px] bg-white text-charcoal border border-charcoal/10 rounded-lg px-3 py-2 shadow-[0_8px_24px_rgba(26,27,29,0.14)]">
                                        <div className="flex items-center gap-1.5 font-archivo text-[11px] font-semibold">
                                            <i className="inline-block w-1.5 h-1.5 rounded-full bg-hazard" />
                                            {from.name}
                                        </div>
                                        <div className="text-[13px] leading-snug font-archivo mt-0.5">{current.text}</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {!bare && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 border-t border-charcoal/10 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-dark">
                    <span className="flex items-center gap-2"><i className="inline-block w-2.5 h-2.5 rounded-full bg-hazard border border-charcoal" /> Working right now</span>
                    <span className="flex items-center gap-2"><i className="inline-block w-3 h-2.5 rounded-[3px] bg-white border border-charcoal" /> Agent</span>
                    <span className="flex items-center gap-2"><i className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: SKIN[1] }} /> Person</span>
                    <span className="ml-auto normal-case tracking-normal text-[11px]"><span className="sm:hidden">Swipe to pan. Tap</span><span className="hidden sm:inline">Click</span> anyone in the room. Demo, sample activity.</span>
                </div>
                )}
            </div>

            {!bare && (
            <div className="bg-paper min-w-0 flex flex-col">
                <div className="px-4 py-3 border-b border-charcoal/10 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-dark flex items-center justify-between">
                    What the agents just did
                    <span className="flex items-center gap-1.5 normal-case tracking-normal font-archivo text-[12px] font-semibold text-charcoal">
                        <i className={`inline-block w-1.5 h-1.5 rounded-full bg-hazard ${playing ? 'room-blink' : ''}`} /> Live
                    </span>
                </div>
                <ol className="flex-1 divide-y divide-charcoal/10 min-h-[120px] lg:min-h-[220px]" aria-live="polite">
                    {feed.length === 0 && <li className="px-4 py-4 text-sm text-steel-dark">The room is starting up.</li>}
                    {feed.map((e, i) => (
                        <li key={`${step}-${i}`} className={`px-4 py-3 ${i === 0 ? 'bg-white/70' : ''}`}>
                            <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-steel-dark">
                                <span className="min-w-0">
                                    <button type="button" className="hover:text-charcoal" onClick={() => open(byId[e.from])}>{byId[e.from].name}</button>
                                    {' → '}
                                    <button type="button" className="hover:text-charcoal" onClick={() => open(byId[e.to])}>{byId[e.to].name}</button>
                                </span>
                                <span className="shrink-0 normal-case tracking-normal">{i === 0 ? 'just now' : `${i * 3} min ago`}</span>
                            </div>
                            <div className={`text-sm mt-1 leading-snug ${i === 0 ? 'text-charcoal' : 'text-charcoal/55'}`}>{e.text}</div>
                        </li>
                    ))}
                </ol>
            </div>
            )}

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
