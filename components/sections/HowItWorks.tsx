import React from 'react';
import { SectionId } from '../../types';
import { HOW_APPS, HOW_BRAIN, HOW_TREE } from '../../constants';
import { useSection } from '../../lib/useSection';
import { Reveal } from '../ui/Reveal';

const Step: React.FC<{ n: string; title: string; copy: string; children: React.ReactNode }> = ({ n, title, copy, children }) => (
    <div className="bg-charcoal p-6 md:p-7 flex flex-col">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">Step {n}</div>
        <h3 className="font-display text-4xl text-paper mt-3">{title}</h3>
        <p className="text-steel text-[15px] leading-relaxed mt-3 mb-5">{copy}</p>
        <div className="mt-auto">{children}</div>
    </div>
);

// Replaces the four harness sections. Route, remember, do and run sit inside step two.
export const HowItWorks: React.FC<{ onInView: (id: SectionId) => void }> = ({ onInView }) => {
    const ref = useSection(SectionId.ROUTE, onInView);
    return (
        <section ref={ref} id="how" className="relative w-full py-24 px-4 sm:px-6 md:px-12 z-10 scroll-mt-20 border-t border-paper/10">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">How it works</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">Write it down. Give it a brain. Build on it.</h2>
                </Reveal>
                <Reveal>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-12">
                        <Step n="01" title="Package" copy="We interview you and read what you already have: price sheets, scripts, group chats, the CRM. It becomes plain files in folders, one room per part of the business.">
                            <div className="bg-paper/[0.04] px-4 py-3 font-mono text-[11.5px] leading-[1.8] text-steel overflow-hidden">
                                <div className="text-paper">your-business/</div>
                                {HOW_TREE.map(([name, note], i) => (
                                    <div key={name} className="flex gap-2 whitespace-nowrap">
                                        <span aria-hidden="true">{i === HOW_TREE.length - 1 ? '└─' : '├─'}</span>
                                        <span className="text-paper w-[84px] shrink-0">{name}</span>
                                        <span className="truncate">{note}</span>
                                    </div>
                                ))}
                            </div>
                        </Step>
                        <Step n="02" title="Brain" copy="The operating system reads those files before every job, so it never starts from zero and never guesses your prices.">
                            <div className="grid grid-cols-2 gap-px bg-paper/10 border border-paper/10">
                                {HOW_BRAIN.map(([name, note]) => (
                                    <div key={name} className="bg-[#202124] px-3 py-2.5">
                                        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper">{name}</div>
                                        <div className="text-steel text-[12.5px] leading-snug mt-1">{note}</div>
                                    </div>
                                ))}
                            </div>
                        </Step>
                        <Step n="03" title="Build" copy="Software goes on top. Every app reads the same brain, so the front desk quotes the same price as the website.">
                            <div className="grid grid-cols-2 gap-2">
                                {HOW_APPS.map(([name, note]) => (
                                    <div key={name} className="border border-paper/20 px-3 py-2.5">
                                        <div className="text-paper text-[13.5px]">{name}</div>
                                        <div className="text-steel text-[11.5px]">{note}</div>
                                    </div>
                                ))}
                            </div>
                        </Step>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
