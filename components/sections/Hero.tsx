import React, { useEffect } from 'react';
import { SectionContent } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';
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

    const scrollToProblemSection = () => {
        const problemSection = document.getElementById('problem-section');
        if (problemSection) {
            problemSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section ref={ref} id={content.id} className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-start px-6 md:px-12 relative z-10 w-full overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 relative z-20">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] max-w-4xl">
                    Turn Business Intent <br />
                    <span className="group relative inline-block cursor-default md:whitespace-nowrap">
                        <span className="relative z-10 transition-all duration-300 group-hover:text-[#FFB224] group-hover:drop-shadow-[0_0_15px_rgba(255,178,36,0.5)]">
                            Into Verified Outcomes
                        </span>
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                    At GYST we design fully autonomous systems that understand your goals, plan your strategy, execute with the right tools and verify results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button variant="primary" onClick={scrollToProblemSection}>See how the system works</Button>
                    <a href="/voice-agent-page.html">
                        <Button variant="secondary" className="pl-6 pr-4">
                            Try an agent <Icon name="ArrowRight" size={14} className="ml-2" />
                        </Button>
                    </a>
                </div>

            </div>

        </section>
    );
};