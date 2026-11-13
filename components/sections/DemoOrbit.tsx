import React, { useEffect, useRef } from 'react';
import { DEMOS, REAL, Showcase } from '../../demos/list';
import { track } from '../../lib/track';
import { useVertical } from '../../lib/vertical';
import { VerticalKey } from '../../types';
import { Device } from '../ui/Lockup';
import { Reveal } from '../ui/Reveal';

const SIZE = 728;
const R_OUT = 274;
const R_IN = 108;
const DEG_PER_MS = 360 / 110000; // one lap of the outer ring takes 110 seconds
const TOP = -90;

// The tile that swings to the top when a visitor picks a vertical in the hero.
const NEAREST: Partial<Record<VerticalKey, string>> = { trades: 'hvac', marketing: 'agency', realestate: 'shang', insurance: 'caelum' };

const go = (slug: string) => () => track('work_card_click', { card: `orbit-${slug}` });
const FOCUS = 'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper';

const Info: React.FC<{ item: Showcase; real?: boolean }> = ({ item, real }) => (
    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[250px] bg-paper text-charcoal p-3.5 text-left opacity-0 translate-y-1 transition duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0" style={{ top: real ? 'calc(100% + 12px)' : 'calc(100% + 24px)' }}>
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-steel-dark">{real ? 'Real build' : 'Demo'} &middot; {item.tag}</span>
        <span className="block text-[17px] font-semibold leading-tight mt-1.5">{real || item.name.startsWith(item.short) ? item.name : `${item.short} - ${item.name}`}</span>
        <span className="block text-[13px] leading-snug text-charcoal/75 mt-1.5">{item.runs}</span>
        <span className="block text-[13px] font-semibold mt-2.5">{real ? 'Open it' : 'Try it'} <span aria-hidden="true">&rarr;</span></span>
    </span>
);

export const DemoOrbit: React.FC = () => {
    const { vertical } = useVertical();
    const near = NEAREST[vertical.key];
    const root = useRef<HTMLDivElement>(null);
    const outer = useRef<(HTMLAnchorElement | null)[]>([]);
    const inner = useRef<(HTMLAnchorElement | null)[]>([]);
    // Ring angles in degrees. `nudge` is what is left of a swing to bring one tile to the top.
    const st = useRef({ out: TOP, inn: TOP + 45, nudgeOut: 0, nudgeIn: 0, hover: false, focus: false, last: 0 });

    const place = () => {
        const s = st.current;
        const put = (els: (HTMLAnchorElement | null)[], base: number, r: number) =>
            els.forEach((el, i) => {
                if (!el) return;
                const a = ((base + (i * 360) / els.length) * Math.PI) / 180;
                // Only the position changes, so the tile itself never rotates and stays readable.
                el.style.transform = `translate3d(calc(${(Math.cos(a) * r).toFixed(2)}px - 50%), calc(${(Math.sin(a) * r).toFixed(2)}px - 50%), 0)`;
            });
        put(outer.current, s.out, R_OUT);
        put(inner.current, s.inn, R_IN);
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
        place();
        return () => {
            stop();
            io.disconnect();
            reduce.removeEventListener('change', sync);
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

    return (
        <section id="demos" className="relative z-10 w-full bg-charcoal border-y border-paper/10 py-24 px-4 sm:px-6 md:px-12 scroll-mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_728px] xl:gap-6 items-center">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">What goes on top</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper max-w-xl">One brain. Every kind of business.</h2>
                    <p className="text-steel text-lg mt-5 max-w-md">
                        Once a business is written down, the software on top can look like anything. Here are five demo dashboards, each for a different kind of business, and four builds that are already running.
                    </p>
                    <ul className="hidden md:grid gap-2.5 mt-7 text-[14px] text-paper/85 list-none p-0">
                        <li className="flex items-center gap-3"><i className="w-7 h-[18px] border border-paper/50 bg-[#202124]" />Outer ring: demos, sample data</li>
                        <li className="flex items-center gap-3"><i className="w-7 h-[18px] bg-paper" />Inner ring: real client and GYST builds</li>
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                        <a href="/demos" onClick={go('all')} className={`inline-flex items-center gap-2 text-paper text-[15px] font-semibold no-underline border-b border-paper/40 pb-0.5 hover:border-paper ${FOCUS}`}>
                            See all five demos <span aria-hidden="true">&rarr;</span>
                        </a>
                        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.14em] text-steel">Hover or tab to a tile to stop it</span>
                    </div>
                </Reveal>

                {/* Tablet and up: the orbit. */}
                <div className="hidden md:block mx-auto mt-14 lg:mt-0 pb-28 lg:pb-0">
                    <div
                        ref={root}
                        data-orbit
                        className="relative"
                        style={{ width: SIZE, height: SIZE }}
                        onPointerEnter={hold('hover', true)}
                        onPointerLeave={hold('hover', false)}
                        onFocus={hold('focus', true)}
                        onBlur={hold('focus', false)}
                    >
                        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
                            <circle cx={SIZE / 2} cy={SIZE / 2} r={R_OUT} fill="none" stroke="#F2F0EB" strokeOpacity=".22" strokeDasharray="2 7" />
                            <circle cx={SIZE / 2} cy={SIZE / 2} r={R_IN} fill="none" stroke="#F2F0EB" strokeOpacity=".3" />
                        </svg>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#202124] border border-paper/40 flex flex-col items-center justify-center gap-2">
                            <Device size={28} className="text-hazard" />
                            <span className="font-mono text-[7px] uppercase tracking-[0.12em] leading-[1.5] text-paper text-center">The Business<br />Brain</span>
                        </div>

                        {DEMOS.map((d, i) => (
                            <a
                                key={d.slug}
                                ref={(el) => { outer.current[i] = el; }}
                                href={d.href}
                                onClick={go(d.slug)}
                                aria-label={`${d.short}, ${d.tag} demo. ${d.runs} Try it.`}
                                className={`group absolute left-1/2 top-1/2 block w-[180px] no-underline will-change-transform z-10 hover:z-30 focus-visible:z-30 ${FOCUS}`}
                            >
                                <span className="block relative aspect-[16/10] overflow-hidden bg-[#111] border border-paper/30 transition duration-300 group-hover:scale-[1.28] group-hover:border-paper group-focus-visible:scale-[1.28] group-focus-visible:border-paper shadow-[0_10px_30px_rgba(0,0,0,.45)]">
                                    <img src={d.thumb} alt="" width={640} height={400} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-left-top" />
                                </span>
                                <span className="absolute left-0 right-0 top-full mt-1.5 flex justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-steel whitespace-nowrap transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0">
                                    <span className="text-paper">{d.short}</span>
                                    <span>{near === d.slug ? 'Closest to you' : 'Demo'}</span>
                                </span>
                                <Info item={d} />
                            </a>
                        ))}

                        {REAL.map((d, i) => (
                            <a
                                key={d.slug}
                                ref={(el) => { inner.current[i] = el; }}
                                href={d.href}
                                onClick={go(d.slug)}
                                aria-label={`${d.name}, real build. ${d.runs} Open it.`}
                                className={`group absolute left-1/2 top-1/2 block w-[88px] no-underline will-change-transform z-20 hover:z-30 focus-visible:z-30 ${FOCUS}`}
                            >
                                <span className="flex flex-col justify-center h-[36px] px-2.5 bg-paper text-charcoal transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
                                    <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-steel-dark leading-none">{near === d.slug ? 'Nearest you' : 'Real build'}</span>
                                    <span className="text-[12px] font-semibold leading-none mt-1 whitespace-nowrap">{d.short}</span>
                                </span>
                                <Info item={d} real />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Phone: an orbit this small cannot be read, so the same nine become a swipeable row. */}
                <div className="md:hidden mt-10 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className="shrink-0 flex items-center gap-2.5 bg-[#202124] border border-paper/40 px-3 h-11">
                            <Device size={20} className="text-hazard" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper">The Business Brain</span>
                        </span>
                        <span className="flex-1 border-t border-dashed border-paper/30" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel">Swipe</span>
                    </div>
                    <ul className="flex gap-3 mt-4 -mx-4 px-4 pb-2 overflow-x-auto snap-x snap-mandatory scroll-px-4 list-none [scrollbar-width:none]" aria-label="Demo dashboards and real builds">
                        {DEMOS.map((d) => (
                            <li key={d.slug} className="snap-start shrink-0 w-[78%] max-w-[320px]">
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
                            <li key={d.slug} className="snap-start shrink-0 w-[62%] max-w-[250px]">
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
