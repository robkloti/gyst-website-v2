import React from 'react';
import { Reveal } from '../ui/Reveal';
import { CASE_STUDIES } from '../../constants';
import { track } from '../../lib/track';

const FEATURED = [
    {
        href: '/work/shang',
        tag: 'Real estate · Manila',
        name: 'Shang Properties',
        line: 'A luxury developer’s content team, run by agents that know the rules.',
        proof: 'Topic to compliant carousel in 14 minutes',
        cta: 'Walk the room + try the demo',
    },
    {
        href: '/work/caelum',
        tag: 'Insurance · Philippines',
        name: 'Caelum',
        line: 'The builds that earned me a seat at the leadership table.',
        proof: 'Prospecting and content, run in an hour a day',
        cta: 'See what I built',
    },
];

export const ClientWork = () => (
    <section id="work" className="relative w-full py-24 px-6 md:px-12 z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
            <Reveal>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">Client work</div>
                <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">Walk the floor.</h2>
                <p className="text-steel text-lg mt-5 max-w-2xl">Every client gets a room of agents built around their rules. Click into one and watch it work.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10 border border-paper/10 mt-12">
                {FEATURED.map((f, i) => (
                    <Reveal key={f.name} delay={0.1 * i} className="bg-charcoal">
                        <a
                            href={f.href}
                            onClick={() => track('case_study_click', { case_study: f.href.split('/').pop() ?? '', from: 'home' })}
                            className="group block h-full p-7 md:p-9 no-underline hover:bg-paper/[0.03] transition-colors"
                        >
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">{f.tag}</div>
                            <div className="font-display text-4xl md:text-5xl text-paper mt-4">{f.name}</div>
                            <p className="text-paper/85 text-lg leading-snug mt-4 max-w-md">{f.line}</p>
                            <div className="text-steel text-sm mt-4">{f.proof}</div>
                            <div className="text-paper text-[15px] font-semibold mt-8 flex items-center gap-2">
                                {f.cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            </div>
                        </a>
                    </Reveal>
                ))}
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mt-16 mb-4">Earlier engagements</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
                {CASE_STUDIES.map((c, i) => (
                    <Reveal key={c.title} delay={0.08 * i} className="bg-charcoal">
                        <div className="p-6 h-full flex flex-col">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">{c.tag}</div>
                            <div className="text-paper text-2xl font-semibold mt-2">{c.title}</div>
                            <p className="text-steel text-[14px] leading-relaxed mt-3">{c.solution}</p>
                            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                                {c.metrics.slice(0, 2).map((m) => (
                                    <div key={m.label}>
                                        <div className="text-paper text-3xl font-semibold tracking-tight">{m.value}</div>
                                        <div className="text-steel text-[12px] leading-snug mt-1">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                            <blockquote className="mt-auto pt-5 border-t border-paper/10 text-paper/80 text-[14px] leading-relaxed">
                                &ldquo;{c.quote}&rdquo;
                                <footer className="text-steel text-[12px] mt-2 not-italic">{c.author}</footer>
                            </blockquote>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
