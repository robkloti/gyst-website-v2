import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../constants';
import { Reveal } from '../ui/Reveal';

export const Testimonials = () => {
    return (
        <section className="relative z-50 w-full pt-24 pb-12 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <Reveal>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4">
                        Loved by high-velocity <span className="font-serif-italic text-[#FFB224]">founders</span>
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        See what leaders are saying about <span className="text-[#FFB224]">GYST</span>.
                    </p>
                </Reveal>
            </div>

            <div className="flex flex-col gap-6">
                <div className="relative w-full overflow-hidden flex">
                    <motion.div 
                        className="flex gap-6 min-w-full"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <div key={i} className="w-[300px] md:w-[400px] shrink-0 p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-neutral-800 object-cover" />
                                    <div>
                                        <div className="text-sm font-bold text-white">{t.name}</div>
                                        <div className="text-xs text-neutral-500">{t.role}</div>
                                    </div>
                                </div>
                                <p className="text-neutral-300 text-sm leading-relaxed">"{t.quote}"</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>
        </section>
    );
};