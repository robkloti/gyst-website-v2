import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BOOK_LABEL, BOOK_URL, BRAIN_FILES, MODULE_TREES, OFFER_BRAIN } from '../../constants';
import { track, trackBookClick } from '../../lib/track';
import { BrainFileId, ModuleId, OfferModule } from '../../types';

const LABEL = 'font-mono text-[10px] uppercase tracking-[0.14em]';
const FOCUS = 'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard';
const CYCLE_MS = 4200;

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

// Layout position inside the tree, read from offsets so the reveal animation's transform cannot skew it.
const at = (el: HTMLElement, root: HTMLElement) => {
    let x = 0;
    let y = 0;
    for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) {
        x += n.offsetLeft;
        y += n.offsetTop;
    }
    return { left: x, top: y, right: x + el.offsetWidth, mid: y + el.offsetHeight / 2 };
};

// The brain on the left, the modules in the middle, the picked module's skill folders on the right.
// Picking a module lights the brain files it reads, and lines on wide screens show the wiring.
type Props = {
    modules: OfferModule[];
    // A landing page passes its own brain line and tracked booking link, and can keep visitors on the page.
    brainLine?: string;
    bookHref?: string;
    bookLocation?: string;
    showLive?: boolean;
};

export const SkillTree: React.FC<Props> = ({ modules, brainLine = `Your AI operating system. ${OFFER_BRAIN.line}`, bookHref = BOOK_URL, bookLocation = 'home_offer', showLive = true }) => {
    // Held by id: the hero's business picker reorders the modules, and the pick should stay put.
    const [selId, setSelId] = useState<ModuleId>(modules[0].id);
    const [touched, setTouched] = useState(false);
    const [paths, setPaths] = useState<string[]>([]);
    const box = useRef<HTMLDivElement>(null);
    const files = useRef<Partial<Record<BrainFileId, HTMLLIElement | null>>>({});
    const mods = useRef<(HTMLButtonElement | null)[]>([]);
    const panel = useRef<HTMLDivElement>(null);
    const brain = useRef<HTMLDivElement>(null);

    const sel = Math.max(0, modules.findIndex((x) => x.id === selId));
    const m = modules[sel];
    const tree = MODULE_TREES[m.id];
    // Every module's skills live in the brain's skills folder, so that file is always lit.
    const lit = new Set<BrainFileId>([...tree.reads, 'skills']);

    // Walk through the modules on its own until someone picks one.
    useEffect(() => {
        if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let visible = false;
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
        if (box.current) io.observe(box.current);
        const t = window.setInterval(() => visible && setSelId(modules[(sel + 1) % modules.length].id), CYCLE_MS);
        return () => { window.clearInterval(t); io.disconnect(); };
    }, [touched, modules, sel]);

    useLayoutEffect(() => {
        const draw = () => {
            const root = box.current;
            const modEl = mods.current[sel];
            if (!root || !modEl || !panel.current || !brain.current || window.innerWidth < 1024) return setPaths([]);
            const mod = at(modEl, root);
            const pan = at(panel.current, root);
            const br = at(brain.current, root);
            const curve = (x1: number, y1: number, x2: number, y2: number) => {
                const mid = (x1 + x2) / 2;
                return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`;
            };
            const out = [...lit].flatMap((id) => {
                const f = files.current[id];
                // Each wire leaves the brain's edge level with its file and lands on the module.
                return f ? [curve(br.right, at(f, root).mid, mod.left, mod.mid)] : [];
            });
            out.push(curve(mod.right, mod.mid, pan.left, pan.top + 20));
            setPaths(out);
        };
        draw();
        const ro = new ResizeObserver(draw);
        if (box.current) ro.observe(box.current);
        return () => ro.disconnect();
        // `lit` follows the picked module, so the module and its place in the list are all there is to watch.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selId, sel]);

    const pick = (i: number) => () => {
        setTouched(true);
        setSelId(modules[i].id);
        track('skill_tree_pick', { module: modules[i].id });
    };

    return (
        <div ref={box} className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_minmax(0,220px)_minmax(0,1fr)] gap-y-4 lg:gap-x-20 mt-12">
            <svg aria-hidden="true" className="hidden lg:block absolute inset-0 z-10 w-full h-full pointer-events-none overflow-visible">
                {paths.map((d, i) => (
                    <path key={`${selId}-${sel}-${i}`} d={d} fill="none" stroke="#F0B429" strokeOpacity={i === paths.length - 1 ? 0.95 : 0.7} strokeWidth="1.5" className="animate-[skillwire_.5s_ease-out_both]" />
                ))}
            </svg>

            {/* The brain. */}
            <div ref={brain} className="order-3 lg:order-1 bg-paper text-charcoal p-6 flex flex-col">
                <span className={`self-start bg-charcoal text-paper ${LABEL} tracking-[0.16em] px-2 py-1`}>The flagship &middot; start here</span>
                <h3 className="font-display text-[44px] lg:text-[50px] text-charcoal mt-4">{OFFER_BRAIN.name}</h3>
                <p className="text-[#4A4D54] text-[14.5px] leading-relaxed mt-2">{brainLine}</p>
                <ul className="list-none m-0 p-0 mt-5 border-t border-charcoal/15">
                    {BRAIN_FILES.map((f) => {
                        const on = lit.has(f.id);
                        return (
                            <li
                                key={f.id}
                                ref={(el) => { files.current[f.id] = el; }}
                                className={`border-b px-3 py-2.5 transition-colors duration-300 ${on ? 'bg-charcoal text-paper border-paper/15' : 'border-charcoal/15'}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-mono text-[12.5px]">{f.path}</span>
                                    <span className={`${LABEL} text-[9px] transition-opacity ${on ? 'text-hazard opacity-100' : 'opacity-0'}`}>{f.id === 'skills' ? 'Holds them' : 'Read'}</span>
                                </div>
                                <div className={`text-[12.5px] leading-snug mt-0.5 ${on ? 'text-paper/70' : 'text-[#5C6068]'}`}>{f.note}</div>
                            </li>
                        );
                    })}
                </ul>
                <a href={bookHref} onClick={() => trackBookClick(bookLocation)} className="self-start inline-flex mt-6 no-underline border border-charcoal bg-charcoal text-paper hover:bg-transparent hover:text-charcoal transition-colors font-mono font-bold text-[11px] uppercase tracking-[0.12em] px-7 py-3.5 rounded-sm">
                    {BOOK_LABEL}
                </a>
            </div>

            {/* The modules. */}
            <div className="order-1 lg:order-2 min-w-0 lg:self-center">
                <div className={`${LABEL} text-steel mb-3`}>Six modules &middot; pick one</div>
                <div role="tablist" aria-label="Modules" className="flex lg:flex-col gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-1 lg:pb-0 [scrollbar-width:none]">
                    {modules.map((mod, i) => {
                        const on = i === sel;
                        return (
                            <button
                                key={mod.id}
                                ref={(el) => { mods.current[i] = el; }}
                                role="tab"
                                aria-selected={on}
                                aria-controls="skill-panel"
                                onClick={pick(i)}
                                onMouseEnter={touched ? pick(i) : undefined}
                                className={`shrink-0 text-left px-4 py-3 border transition-colors ${on ? 'border-hazard bg-[#26241D]' : 'border-paper/20 bg-[#202124] hover:border-paper/50'} ${FOCUS}`}
                            >
                                <span className={`block ${LABEL} ${on ? 'text-hazard' : 'text-steel'}`}>Module {String(i + 1).padStart(2, '0')}</span>
                                <span className="block text-paper text-[16px] font-semibold leading-tight mt-1 whitespace-nowrap">{mod.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* The picked module's skills. */}
            <div ref={panel} id="skill-panel" role="tabpanel" className="order-2 lg:order-3 min-w-0 border border-paper/20 bg-[#17181A] self-start">
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-paper/10">
                    <span className="font-mono text-[12.5px] text-paper truncate">skills/{slug(m.name)}/</span>
                    <span className={`${LABEL} text-steel shrink-0`}>{tree.skills.length} skills</span>
                </div>
                <div key={m.id} className="px-5 pt-4 pb-5 animate-[skillin_.35s_ease-out_both]">
                    <h3 className="text-paper text-[22px] font-semibold leading-tight">{m.name}</h3>
                    <p className="text-steel text-[14.5px] leading-snug mt-1.5">{m.line}</p>
                    <ul className="list-none m-0 p-0 mt-4 font-mono text-[12.5px]">
                        {tree.skills.map(([name, does], i) => {
                            const last = i === tree.skills.length - 1;
                            return (
                                <li key={name} className="grid grid-cols-[22px_minmax(0,1fr)] animate-[skillin_.35s_ease-out_both]" style={{ animationDelay: `${60 + i * 55}ms` }}>
                                    <span aria-hidden="true" className="relative">
                                        <span className={`absolute left-[6px] top-0 w-px bg-paper/25 ${last ? 'h-[15px]' : 'h-full'}`} />
                                        <span className="absolute left-[6px] top-[14px] w-[11px] h-px bg-paper/25" />
                                    </span>
                                    <span className="py-1.5 min-w-0">
                                        <span className="text-paper">{name}/</span>
                                        <span className="text-steel"> SKILL.md</span>
                                        <span className="block font-sans text-[13.5px] text-paper/70 leading-snug mt-0.5">{does}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-paper/10 border border-paper/10 mt-5">
                        <div className="bg-[#17181A] px-4 py-3">
                            <div className={`${LABEL} text-steel`}>Reads from the brain</div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {tree.reads.map((id) => (
                                    <span key={id} className="font-mono text-[11px] text-paper border border-paper/25 px-1.5 py-0.5">{BRAIN_FILES.find((f) => f.id === id)!.path}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#17181A] px-4 py-3">
                            <div className={`${LABEL} text-steel`}>What comes out</div>
                            <div className="text-hazard text-[15px] font-semibold leading-snug mt-2">{tree.out}</div>
                        </div>
                    </div>
                    {showLive && tree.live && (
                        <a href={tree.live[1]} onClick={() => track('skill_tree_live', { module: m.id })} className="inline-flex items-center gap-2 mt-4 text-paper text-[14.5px] font-semibold no-underline border-b border-paper/40 pb-0.5 hover:border-paper">
                            {tree.live[0]} <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
