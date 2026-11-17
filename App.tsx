import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { SectionId, VerticalKey } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoopVisualizer } from './components/visuals/LoopVisualizer';
import { HeroSection } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { WorkGrid } from './components/sections/WorkGrid';
import { DemoOrbit } from './components/sections/DemoOrbit';
import { Rooms } from './components/sections/Rooms';
import { Offer } from './components/sections/Offer';
import { Faq } from './components/sections/Faq';
import { VerticalContext, initialVertical, verticalByKey } from './lib/vertical';
import { track } from './lib/track';
import HvacCalculatorPage from './hvac-calculator';
import SqueezePage from './hvac-calculator/SqueezePage';

const currentPath = () =>
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';

// Lightweight path routing, no router dep. Static HTML pages in /public
// handle every other "route"; these branches cover the SPA-served funnel.
// Page 1 (squeeze) → /find-leaks/start; Page 2 (calculator + sales) → /find-leaks.
const isSqueezeRoute = () => currentPath() === '/find-leaks/start';
const isHvacCalculatorRoute = () => currentPath() === '/find-leaks';
const CASE_STUDIES_BY_PATH: Record<string, React.LazyExoticComponent<React.FC>> = {
    '/work/shang': lazy(() => import('./work/shang/ShangCaseStudy')),
    '/work/caelum': lazy(() => import('./work/caelum/CaelumCaseStudy')),
    '/hq': lazy(() => import('./hq/HQPage')),
    '/demos': lazy(() => import('./demos/DemosIndex')),
    '/demos/hvac': lazy(() => import('./demos/hvac/HvacPage')),
    '/demos/law': lazy(() => import('./demos/law/LawPage')),
    '/demos/medspa': lazy(() => import('./demos/medspa/MedspaPage')),
    '/demos/agency': lazy(() => import('./demos/agency/AgencyPage')),
    '/demos/roofing': lazy(() => import('./demos/roofing/RoofingPage')),
};

const MainApp = () => {
    const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
    const [verticalKey, setVerticalKey] = useState<VerticalKey>(initialVertical);

    const setVertical = useCallback((key: VerticalKey) => {
        setVerticalKey(key);
        const url = new URL(window.location.href);
        if (key === 'all') url.searchParams.delete('v');
        else url.searchParams.set('v', key);
        url.searchParams.delete('room');
        window.history.replaceState(null, '', url);
        track('vertical_switch', { vertical: key });
    }, []);

    const verticalValue = useMemo(() => ({ vertical: verticalByKey(verticalKey), setVertical }), [verticalKey, setVertical]);

    return (
        <VerticalContext.Provider value={verticalValue}>
            <div className="min-h-screen w-full bg-charcoal text-paper selection:bg-hazard/30 selection:text-hazard overflow-x-hidden font-sans">
                <Navbar />

                {/* Fixed ring background */}
                <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full max-w-[800px] max-h-[800px] opacity-[0.15] lg:opacity-100 lg:translate-x-[25%] transition-all duration-700">
                        <LoopVisualizer activeSection={activeSection} />
                    </div>
                </div>

                <main className="relative z-10 flex flex-col w-full">
                    <HeroSection onInView={setActiveSection} />
                    <HowItWorks onInView={setActiveSection} />
                    <WorkGrid onInView={setActiveSection} />
                    <DemoOrbit />
                    <Rooms />
                    <Offer onInView={setActiveSection} />
                    <Faq onInView={setActiveSection} />
                    <Footer />
                </main>

                {/* Noise grain overlay */}
                <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }}></div>
            </div>
        </VerticalContext.Provider>
    );
};

const App = () =>
    isSqueezeRoute() ? (
        <SqueezePage />
    ) : isHvacCalculatorRoute() ? (
        <HvacCalculatorPage />
    ) : CASE_STUDIES_BY_PATH[currentPath()] ? (
        <Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
            {React.createElement(CASE_STUDIES_BY_PATH[currentPath()])}
        </Suspense>
    ) : (
        <MainApp />
    );

export default App;