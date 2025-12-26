import React from 'react';
import { CASE_STUDIES } from '../../constants';
import { Reveal } from '../ui/Reveal';

export const CaseStudiesSection = () => {
    return (
        <section className="relative z-50 w-full py-24 bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                        Proven outcomes across <span className="text-[#FFB224]">industries</span>
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((item, index) => (
                        <Reveal key={index} delay={index * 0.2}>
                            <div className="h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-colors duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-medium">{item.tag}</span>
                                    {item.featured && <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">Featured</span>}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-neutral-500 mb-6">{item.duration}</p>

                                <div className="mb-6 space-y-4">
                                    <div>
                                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Challenge:</span>
                                        <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{item.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Solution:</span>
                                        <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{item.solution}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">Results:</span>
                                    <div className="grid grid-cols-2 gap-3">
                                        {item.metrics.map((m, i) => (
                                            <div key={i} className="bg-neutral-900/50 rounded-lg p-3 border border-white/5">
                                                <div className="text-xl font-bold text-blue-400 mb-1">{m.value}</div>
                                                <div className="text-[10px] text-neutral-500 leading-tight">{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-neutral-400">{tag}</span>
                                    ))}
                                </div>

                                <div className="mt-auto pl-4 border-l-2 border-blue-500">
                                    <p className="italic text-sm text-neutral-300 mb-2">"{item.quote}"</p>
                                    <p className="text-xs font-bold text-white">{item.author}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};