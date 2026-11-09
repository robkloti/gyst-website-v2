import React, { useEffect } from 'react';
import { Lockup } from '../components/ui/Lockup';
import { track, trackBookClick } from '../lib/track';

export const BOOK_URL = '/calendar-page.html';

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{children}</div>
);

export const H2: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <h2 className={`text-[32px] md:text-[40px] font-semibold leading-[1.08] tracking-tight mt-4 ${className}`}>{children}</h2>
);

export const BookButton: React.FC<{ location: string; children: React.ReactNode }> = ({ location, children }) => (
    <a
        href={BOOK_URL}
        onClick={() => trackBookClick(location)}
        className="inline-flex items-center gap-2 bg-hazard text-charcoal font-archivo font-semibold text-[15px] px-6 py-3.5 no-underline hover:brightness-105"
    >
        {children} <span aria-hidden="true">&rarr;</span>
    </a>
);

export const Stats: React.FC<{ items: string[][]; note: string }> = ({ items, note }) => (
    <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 border border-paper/10 mt-14">
            {items.map(([n, l, s]) => (
                <div key={l} className="bg-charcoal p-5 md:p-6">
                    <div className="font-archivo font-semibold text-[34px] md:text-[42px] leading-none tracking-tight">{n}</div>
                    <div className="text-paper/85 mt-3 text-[15px] leading-snug">{l}</div>
                    <div className="text-steel text-[13px] mt-1">{s}</div>
                </div>
            ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel mt-3">{note}</p>
    </>
);

export const CaseLayout: React.FC<{ slug: string; title: string; nav: [string, string][]; children: React.ReactNode }> = ({ slug, title, nav, children }) => {
    useEffect(() => {
        document.title = title;
        track('case_study_view', { case_study: slug });
    }, [slug, title]);

    return (
        <div className="min-h-screen w-full bg-charcoal text-paper font-archivo overflow-x-hidden selection:bg-hazard/30">
            <header className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur border-b border-paper/10">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
                    <Lockup size={26} />
                    <nav className="flex items-center gap-5 text-[14px]">
                        {nav.map(([href, label]) => (
                            <a key={href} href={href} className="hidden sm:inline text-steel hover:text-paper no-underline">{label}</a>
                        ))}
                        <a href="/#work" className="hidden md:inline text-steel hover:text-paper no-underline">All work</a>
                        <a href={BOOK_URL} onClick={() => trackBookClick(`${slug}_nav`)} className="text-paper border border-paper/30 px-3 py-1.5 no-underline hover:bg-paper/10">
                            Book a call
                        </a>
                    </nav>
                </div>
            </header>
            <main>{children}</main>
            <footer className="border-t border-paper/10">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-[13px] text-steel">
                    <Lockup size={20} />
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em]">rob@gyst-ai.com · Built by @robtheops</div>
                </div>
            </footer>
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }} />
        </div>
    );
};
