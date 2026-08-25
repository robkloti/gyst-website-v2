import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HERO_TERMINAL } from '../../constants';

// Code block as receipt (voice.md pattern 6). Types itself out once it scrolls into view.
export const TerminalMockup: React.FC<{ id?: string }> = ({ id }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-15% 0px' });
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(reduce ? HERO_TERMINAL.length : 0);

    useEffect(() => {
        if (!inView || reduce) return;
        if (shown >= HERO_TERMINAL.length) return;
        const delay = shown === 1 ? 700 : shown === 4 ? 650 : 260;
        const t = setTimeout(() => setShown(s => s + 1), delay);
        return () => clearTimeout(t);
    }, [inView, shown, reduce]);

    return (
        <motion.div
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl mx-auto mt-16 bg-[#141416] border border-paper/10 rounded-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] font-mono text-[12px] md:text-[13px] leading-[1.75] text-[#CFCAC0] p-5 md:p-6 text-left overflow-x-auto"
        >
            <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="min-h-[13em]">
                {HERO_TERMINAL.slice(0, shown).map((line, i) => (
                    <div key={i} className="whitespace-pre">
                        {line.kind === 'cmd' && <><span className="text-hazard font-bold">$</span> <span className="text-paper">{line.text}</span></>}
                        {line.kind === 'prompt' && <><span className="text-hazard font-bold">›</span> <span className="text-paper">{line.text}</span></>}
                        {line.kind === 'dim' && <span className="text-steel">  {line.text}</span>}
                        {line.kind === 'ok' && <><span className="text-emerald-400">  ✓</span> <span className="text-[#CFCAC0]">{line.text}</span></>}
                    </div>
                ))}
                {shown >= HERO_TERMINAL.length && (
                    <div><span className="text-hazard font-bold">›</span> <span className="inline-block w-[7px] h-[13px] bg-hazard align-[-2px] animate-pulse" /></div>
                )}
            </div>
        </motion.div>
    );
};
