import React, { useState } from 'react';
import { SECTIONS } from './constants';
import { SectionId } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoopVisualizer } from './components/visuals/LoopVisualizer';
import { HeroSection } from './components/sections/Hero';
import { ProblemSection } from './components/sections/Problem';
import { TechStackSection } from './components/sections/TechStack';
import { FeatureSection } from './components/sections/FeatureSection';
import { CaseStudiesSection } from './components/sections/CaseStudies';
import { Testimonials } from './components/sections/Testimonials';

const App = () => {
    const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);

    const handleInView = (id: SectionId) => {
        setActiveSection(id);
    };

    return (
        <div className="min-h-screen w-full bg-[#050505] text-neutral-200 selection:bg-[#FFB224]/30 selection:text-[#FFB224] overflow-x-hidden">
            <Navbar />

            {/* Fixed Background Visualizer */}
            <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full max-w-[800px] max-h-[800px] opacity-[0.15] lg:opacity-100 lg:translate-x-[25%] transition-all duration-700">
                    <LoopVisualizer activeSection={activeSection} />
                </div>
            </div>

            <main className="relative z-10 flex flex-col w-full">
                {SECTIONS.map((section) => {
                    // 1. HERO
                    if (section.id === SectionId.HERO) {
                        return (
                            <React.Fragment key={section.id}>
                                <HeroSection content={section} onInView={handleInView} />
                                <TechStackSection />
                            </React.Fragment>
                        );
                    }

                    // 2. PROBLEM (Scrollytelling specialized section)
                    if (section.id === SectionId.PROBLEM) {
                        return (
                            <ProblemSection key={section.id} content={section} onInView={handleInView} />
                        );
                    }

                    // 3. CTA & SOCIAL PROOF INSERTION
                    if (section.id === SectionId.OFFER) {
                        return (
                            <React.Fragment key="social-proof-wrapper">
                                <CaseStudiesSection />
                                <Testimonials />
                                <FeatureSection key={section.id} content={section} onInView={handleInView} />
                            </React.Fragment>
                        );
                    }

                    // 4. STANDARD SECTIONS
                    return (
                        <FeatureSection key={section.id} content={section} onInView={handleInView} />
                    );
                })}

                <Footer />
            </main>

            {/* Noise Grain Overlay */}
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        </div>
    );
};

export default App;