import React, { useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionContent } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';
import { TerminalMockup } from '../visuals/TerminalMockup';

interface HeroSectionProps {
    content: SectionContent;
    onInView: (id: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, onInView }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        if (isInView) onInView(content.id);
    }, [isInView, content.id, onInView]);

    const scrollToTerminal = () => {
        document.getElementById('hero-terminal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const [line1, line2] = (content.headline || '').split('. ').map((s, i) => (i === 0 ? s + '.' : s));

    return (
        <section ref={ref} id={content.id} className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-start px-6 md:px-12 relative z-10 w-full overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-7 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-hazard"
                >
                    <span className="block w-6 h-[2px] bg-hazard" />
                    {content.eyebrow}
                    <span className="block w-6 h-[2px] bg-hazard" />
                </motion.div>

                <h1 className="font-display text-[54px] sm:text-7xl md:text-8xl lg:text-[112px] text-paper max-w-5xl">
                    {line1}<br />
                    <span className="text-hazard">{line2}</span>
                </h1>

                <p className="text-base md:text-lg text-steel leading-relaxed max-w-2xl">
                    {content.subheadline}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a href="/calendar-page.html">
                        <Button variant="primary">{content.cta}</Button>
                    </a>
                    <Button variant="secondary" onClick={scrollToTerminal} className="pl-6 pr-4">
                        Watch it run <Icon name="ArrowRight" size={14} className="ml-2 rotate-90" />
                    </Button>
                </div>
            </div>

            <TerminalMockup id="hero-terminal" />
        </section>
    );
};
