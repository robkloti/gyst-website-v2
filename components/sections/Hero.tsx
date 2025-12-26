import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionContent } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';
import { DashboardMockup } from '../visuals/DashboardMockup';
import { useInView } from 'framer-motion';

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

    return (
        <section ref={ref} id={content.id} className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-start px-6 md:px-12 relative z-10 w-full overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
                >
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-[9px] font-bold text-white uppercase tracking-wider">New</span>
                    <span className="text-[11px] text-neutral-300 group-hover:text-white transition-colors">Intercom Integration - Automate Status Updates!</span>
                    <Icon name="ChevronRight" size={12} className="text-neutral-500 group-hover:text-white" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] max-w-4xl">
                    Turn Business Intent <br />
                    <span className="group relative inline-block cursor-default whitespace-nowrap">
                        <span className="relative z-10 transition-all duration-300 group-hover:text-[#FFB224] group-hover:drop-shadow-[0_0_15px_rgba(255,178,36,0.5)]">
                            Into Verified Outcomes
                        </span>
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                    At GYST we design fully autonomous systems that understand your goals, plan your strategy, execute with the right tools and verify results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button variant="primary">See how the system works</Button>
                    <a href="/voice-agent-page.html">
                        <Button variant="secondary" className="pl-6 pr-4">
                            Try an agent <Icon name="ArrowRight" size={14} className="ml-2" />
                        </Button>
                    </a>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium tracking-wide pt-2">
                    <div className="flex text-[#FFB224]">
                        <Icon name="Zap" size={12} fill="currentColor" />
                        <Icon name="Zap" size={12} fill="currentColor" />
                        <Icon name="Zap" size={12} fill="currentColor" />
                        <Icon name="Zap" size={12} fill="currentColor" />
                        <Icon name="Zap" size={12} fill="currentColor" />
                    </div>
                    <span className="ml-2">Trusted by 30+ fast-growing startups</span>
                </div>
            </div>

            <DashboardMockup />
        </section>
    );
};