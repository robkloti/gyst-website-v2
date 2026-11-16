import React, { useEffect, useRef, useState } from 'react';
import { DEMOS, REAL, Showcase } from '../../demos/list';
import { track } from '../../lib/track';
import { useVertical } from '../../lib/vertical';
import { VerticalKey } from '../../types';
import { Device } from '../ui/Lockup';
import { Reveal } from '../ui/Reveal';

// The stage is drawn at this size and scaled down as one piece to fit the window.
const W = 1100;
const H = 766;
const CX = W / 2;
const CY = 373.5;
const OUT = { rx: 410, ry: 286, w: 280, h: 175, label: 22 }; // demo tiles, with their caption underneath
const INN = { rx: 130, ry: 94, w: 88, h: 36 }; // real-build plates
const CORE = 72;
const GROW = 1.08;
const REAL_CARD = 190;
const DEG_PER_MS = 360 / 110000; // one lap of the outer ring takes 110 seconds
const TOP = -90;

// The tile that swings to the top when a visitor picks a vertical in the hero.
const NEAREST: Partial<Record<VerticalKey, string>> = { trades: 'hvac', marketing: 'agency', realestate: 'shang', insurance: 'caelum' };

// `card` is set for a real-build plate: where its card opens, in stage coordinates.
type Active = { slug: string; card?: React.CSSProperties };

const go = (slug: string) => () => track('work_card_click', { card: `orbit-${slug}` });
const FOCUS = 'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper';
const centre = (base: number, i: number, n: number, rx: number, ry: number) => {
    const a = ((base + (i * 360) / n) * Math.PI) / 180;
    return [Math.cos(a) * rx, Math.sin(a) * ry];
};

export const DemoOrbit: React.FC = () => {
    const { vertical } = useVertical();
    const near = NEAREST[vertical.key];
    const wrap = useRef<HTMLDivElement>(null);
    const root = useRef<HTMLDivElement>(null);
    const outer = useRef<(HTMLAnchorElement | null)[]>([]);
    const inner = useRef<(HTMLAnchorElement | null)[]>([]);
    // Ring angles in degrees. `nudge` is what is left of a swing to bring one tile to the top.
    const st = useRef({ out: TOP, inn: TOP + 45, nudgeOut: 0, nudgeIn: 0, hover: false, focus: false, last: 0 });
    const [k, setK] = useState(1);
    const [active, setActive] = useState<Active | null>(null);

    const place = () => {
        const s = st.current;
        const put = (els: (HTMLAnchorElement | null)[], base: number, rx: number, ry: number) =>
            els.forEach((el, i) => {
                if (!el) return;
                const [x, y] = centre(base, i, els.length, rx, ry);
                // Only the position changes, so the tile itself never rotates and stays readable.
                el.style.transform = `translate3d(calc(${x.toFixed(2)}px - 50%), calc(${y.toFixed(2)}px - 50%), 0)`;
            });
        put(outer.current, s.out, OUT.rx, OUT.ry);
        put(inner.current, s.inn, INN.rx, INN.ry);
        if (root.current) root.current.dataset.paused = String(s.hover || s.focus);
    };

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        let raf = 0;
        let visible = false;
        const frame = (t: number) => {
            const s = st.current;
            const dt = Math.min(64, t - (s.last || t));
            s.last = t;
            if (!s.hover && !s.focus) {
                s.out += dt * DEG_PER_MS;
                s.inn -= dt * DEG_PER_MS * 0.7;
            }
            const ease = Math.min(1, dt * 0.004);
            s.out += s.nudgeOut * ease;
            s.nudgeOut -= s.nudgeOut * ease;
            s.inn += s.nudgeIn * ease;
            s.nudgeIn -= s.nudgeIn * ease;
            place();
            raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };
        const sync = () => {
            stop();
            if (reduce.matches) {
                // Static arrangement: finish any swing at once and draw a single frame.
                const s = st.current;
                s.out += s.nudgeOut;
                s.inn += s.nudgeIn;
                s.nudgeOut = s.nudgeIn = 0;
                place();
            } else if (visible) {
                st.current.last = 0;
                raf = requestAnimationFrame(frame);
            }
        };
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            sync();
        });
        if (root.current) io.observe(root.current);
        reduce.addEventListener('change', sync);
        // Fit the stage to the column, and to the window height so the whole orbit can be seen at once.
        const fit = () => wrap.current && setK(Math.max(0.7, Math.min(1, wrap.current.clientWidth / W, (window.innerHeight - 96) / H)));
        fit();
        window.addEventListener('resize', fit);
        place();
        return () => {
            stop();
            io.disconnect();
            reduce.removeEventListener('change', sync);
            window.removeEventListener('resize', fit);
        };
    }, []);

    useEffect(() => {
        if (!near) return;
        const s = st.current;
        const swing = (list: Showcase[], base: number) => {
            const i = list.findIndex((x) => x.slug === near);
            if (i < 0) return null;
            const now = base + (i * 360) / list.length;
            return ((((TOP - now) % 360) + 540) % 360) - 180;
        };
        const o = swing(DEMOS, s.out);
        const n = swing(REAL, s.inn);
        if (o !== null) s.nudgeOut = o;
        if (n !== null) s.nudgeIn = n;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            s.out += s.nudgeOut;
            s.inn += s.nudgeIn;
            s.nudgeOut = s.nudgeIn = 0;
            place();
        }
    }, [near]);

    const hold = (key: 'hover' | 'focus', on: boolean) => () => {
        st.current[key] = on;
        if (root.current) root.current.dataset.paused = String(st.current.hover || st.current.focus);
    };

    // A demo tile carries its own card: it slides up over the bottom of the tile, so it cannot cover anything else.
    const openDemo = (slug: string) => () => setActive({ slug });
    // A real-build plate is too small for that. Its card opens towards the centre, and the core and the other
    // plates step back while it is open. It never reaches the demo tiles.
    const openReal = (slug: string, i: number) => () => {
        const [x, y] = centre(st.current.inn, i, REAL.length, INN.rx, INN.ry);
        const gap = 10;
        const side = Math.abs(x) > 80;
        const card: React.CSSProperties = side
            ? { top: CY + y, transform: 'translateY(-50%)', ...(x > 0 ? { right: W - (CX + x - INN.w / 2 - gap) } : { left: CX + x + INN.w / 2 + gap }) }
            : { left: CX + x - REAL_CARD / 2, ...(y < 0 ? { top: CY + y + INN.h / 2 + gap } : { bottom: H - (CY + y - INN.h / 2 - gap) }) };
        setActive({ slug, card });
    };
    const close = () => setActive(null);
    const fade = (slug: string, hub: boolean) => (!active || active.slug === slug ? '' : hub && active.card ? 'opacity-0' : 'opacity-40');
    const shown = active?.card ? REAL.find((x) => x.slug === active.slug) : undefined;

    return (
        <section id="demos" className="relative z-10 w-full bg-charcoal border-y border-paper/10 py-20 px-4 sm:px-6 md:px-12 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <Reveal className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-x-12 gap-y-6 items-end">
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">What goes on top</div>
                        <h2 className="font-display text-4xl md:text-6xl text-paper">One brain. Every kind of business.</h2>
                    </div>
                    <div>
                        <p className="text-steel text-lg max-w-md">
                            Once a business is written down, the software on top can look like anything. Here are five demo dashboards, each for a different kind of business, and four builds that are already running.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-5">
                            <a href="/demos" onClick={go('all')} className={`inline-flex items-center gap-2 text-paper text-[15px] font-semibold no-underline border-b border-paper/40 pb-0.5 hover:border-paper ${FOCUS}`}>
                                See all five demos <span aria-hidden="true">&rarr;</span>
                            </a>
                            <span className="hidden lg:flex items-center gap-2 text-[13px] text-paper/80"><i className="w-6 h-4 border border-paper/50 bg-[#202124]" />Demo</span>
                            <span className="hidden lg:flex items-center gap-2 text-[13px] text-paper/80"><i className="w-6 h-4 bg-paper" />Real build</span>
                        </div>
                    </div>
                </Reveal>

                {/* Desktop: the orbit. */}
                <div ref={wrap} className="hidden lg:block relative mt-12" style={{ height: H * k }}>
                    <div
                        ref={root}
                        data-orbit
                        className="absolute left-1/2 top-0"
                        style={{ width: W, height: H, marginLeft: -W / 2, transform: `scale(${k})`, transformOrigin: 'top center' }}
                        onPointerEnter={hold('hover', true)}
                        onPointerLeave={hold('hover', false)}
                        onFocus={hold('focus', true)}
                        onBlur={hold('focus', false)}
                    >
                        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
                            <ellipse cx={CX} cy={CY} rx={OUT.rx} ry={OUT.ry} fill="none" stroke="#F2F0EB" strokeOpacity=".22" strokeDasharray="2 7" />
                            <ellipse cx={CX} cy={CY} rx={INN.rx} ry={INN.ry} fill="none" stroke="#F2F0EB" strokeOpacity=".3" />
                        </svg>

                        <div data-key="core" className={`absolute -translate-x-1/2 -translate-y-1/2 bg-[#202124] border border-paper/40 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-200 ${fade('core', true)}`} style={{ left: CX, top: CY, width: CORE, height: CORE }}>
                            <Device size={26} className="text-hazard" />
                            <span className="font-mono text-[6.5px] uppercase tracking-[0.12em] leading-[1.5] text-paper text-center">The Business<br />Brain</span>
                        </div>

                        {DEMOS.map((d, i) => {
                            const on = active?.slug === d.slug;
                            return (
                                <a
                                    key={d.slug}
                                    ref={(el) => { outer.current[i] = el; }}
                                    data-key={d.slug}
                                    href={d.href}
                                    onClick={go(d.slug)}
                                    onPointerEnter={openDemo(d.slug)}
                                    onPointerLeave={close}
                                    onFocus={openDemo(d.slug)}
                                    onBlur={close}
                                    aria-label={`${d.short}, ${d.tag} demo. ${d.runs} Try it.`}
                                    className={`absolute block no-underline will-change-transform transition-opacity duration-200 ${on ? 'z-30' : 'z-10'} ${fade(d.slug, false)} ${FOCUS}`}
                                    style={{ left: CX, top: CY, width: OUT.w }}
                                >
                                    <span className="block relative transition-transform duration-300" style={{ transform: on ? `scale(${GROW})` : undefined }}>
                                        <span className={`block relative overflow-hidden bg-[#111] border shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-colors ${on ? 'border-paper' : 'border-paper/30'}`} style={{ height: OUT.h }}>
                                            <img src={d.thumb} alt="" width={640} height={400} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-left-top" />
                                        </span>
                                        {on && (
                                        <span data-card className="absolute left-0 right-0 bg-paper text-charcoal text-left" style={{ bottom: -OUT.label, padding: '10px 12px 11px' }}>
                                            <span className="flex justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-steel-dark whitespace-nowrap">
                                                <span>Demo &middot; {d.tag}</span>
                                                <span className="text-charcoal font-medium">Try it &rarr;</span>
                                            </span>
                                            <span className="block text-[16px] font-semibold leading-tight mt-1.5">{d.name.startsWith(d.short) ? d.name : `${d.short} - ${d.name}`}</span>
                                            <span className="block text-[12.5px] leading-snug text-charcoal/75 mt-1">{d.runs}</span>
                                        </span>
                                        )}
                                    </span>
                                    <span className={`absolute left-0 right-0 top-full mt-1.5 flex justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-steel whitespace-nowrap transition-opacity ${on ? 'opacity-0' : ''}`}>
                                        <span className="text-paper">{d.short} <span className="text-steel">&middot; {d.tag}</span></span>
                                        <span>{near === d.slug ? 'Closest to you' : 'Demo'}</span>
                                    </span>
                                </a>
                            );
                        })}

                        {REAL.map((d, i) => (
                            <a
                                key={d.slug}
                                ref={(el) => { inner.current[i] = el; }}
                                data-key={d.slug}
                                href={d.href}
                                onClick={go(d.slug)}
                                onPointerEnter={openReal(d.slug, i)}
                                onPointerLeave={close}
                                onFocus={openReal(d.slug, i)}
                                onBlur={close}
                                aria-label={`${d.name}, real build. ${d.runs} Open it.`}
                                className={`group absolute block no-underline will-change-transform transition-opacity duration-200 ${active?.slug === d.slug ? 'z-50' : 'z-20'} ${fade(d.slug, true)} ${FOCUS}`}
                                style={{ left: CX, top: CY, width: INN.w }}
                            >
                                <span className="flex flex-col justify-center px-2.5 bg-paper text-charcoal transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105" style={{ height: INN.h }}>
                                    <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-steel-dark leading-none">{near === d.slug ? 'Nearest you' : 'Real build'}</span>
                                    <span className="text-[12px] font-semibold leading-none mt-1 whitespace-nowrap">{d.short}</span>
                                </span>
                            </a>
                        ))}

                        {active?.card && shown && (
                            <div data-card className="pointer-events-none absolute z-40 bg-paper text-charcoal shadow-[0_14px_40px_rgba(0,0,0,.5)]" style={{ ...active.card, width: REAL_CARD, padding: '11px 12px 12px' }}>
                                <div className="flex justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-steel-dark whitespace-nowrap">
                                    <span>Real build</span>
                                    <span className="text-charcoal font-medium">Open it &rarr;</span>
                                </div>
                                <div className="text-[15px] font-semibold leading-tight mt-1.5">{shown.name}</div>
                                <div className="text-[12.5px] leading-snug text-charcoal/75 mt-1">{shown.runs}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Phone and tablet: an orbit this small cannot be read, so the same nine become a swipeable row. */}
                <div className="lg:hidden mt-10 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className="shrink-0 flex items-center gap-2.5 bg-[#202124] border border-paper/40 px-3 h-11">
                            <Device size={20} className="text-hazard" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper">The Business Brain</span>
                        </span>
                        <span className="flex-1 border-t border-dashed border-paper/30" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel">Swipe</span>
                    </div>
                    <ul className="flex gap-3 mt-4 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12 pb-2 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 md:scroll-px-12 list-none [scrollbar-width:none]" aria-label="Demo dashboards and real builds">
                        {DEMOS.map((d) => (
                            <li key={d.slug} className="snap-start shrink-0 w-[78%] max-w-[340px]">
                                <a href={d.href} onClick={go(d.slug)} className={`flex flex-col h-full no-underline bg-[#202124] border border-paper/20 ${FOCUS}`}>
                                    <span className="block relative aspect-[16/10] overflow-hidden bg-[#111] border-b border-paper/10">
                                        <img src={d.thumb} alt="" width={640} height={400} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-left-top" />
                                    </span>
                                    <span className="flex flex-col flex-1 p-4">
                                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-steel">Demo &middot; {d.tag}</span>
                                        <span className="text-paper text-[18px] font-semibold leading-tight mt-1.5">{d.short}</span>
                                        <span className="text-steel text-[14px] leading-snug mt-1.5">{d.runs}</span>
                                        <span className="mt-auto pt-3 text-paper text-[14px] font-semibold">Try it <span aria-hidden="true">&rarr;</span></span>
                                    </span>
                                </a>
                            </li>
                        ))}
                        {REAL.map((d) => (
                            <li key={d.slug} className="snap-start shrink-0 w-[62%] max-w-[260px]">
                                <a href={d.href} onClick={go(d.slug)} className={`flex flex-col h-full no-underline bg-paper text-charcoal p-4 ${FOCUS}`}>
                                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-steel-dark">Real build &middot; {d.tag}</span>
                                    <span className="text-[20px] font-semibold leading-tight mt-2">{d.name}</span>
                                    <span className="text-[14px] leading-snug text-charcoal/75 mt-2">{d.runs}</span>
                                    <span className="mt-auto pt-4 text-[14px] font-semibold">Open it <span aria-hidden="true">&rarr;</span></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
