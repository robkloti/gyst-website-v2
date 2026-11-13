import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Device } from '../components/ui/Lockup';
import { track, trackBookClick } from '../lib/track';

// Sets the tab title, loads the dashboard's own Google Fonts and logs the view.
export const useDemoPage = (slug: string, title: string, fonts: string) => {
    useEffect(() => {
        document.title = title;
        track('demo_view', { demo: slug });
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;
        document.head.appendChild(link);
        return () => link.remove();
    }, [slug, title, fonts]);
};

export type FeedLine = { who: string; text: string };
export type FeedItem = FeedLine & { key: number; time: string };

const clock = (ms: number) => new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

// Activity feed that keeps ticking. The first `seed` lines are already there; the rest arrive one at a time.
// With reduced motion on, nothing arrives by itself.
// `at` is the demo's own clock ("10:31"), so the feed agrees with the time shown in the header.
export const useLiveFeed = (script: FeedLine[], at: string, seed = 4, ms = 4600, max = 7): [FeedItem[], (who: string, text: string) => void] => {
    const next = useRef(seed);
    const key = useRef(seed);
    const [offset] = useState(() => {
        const [h, m] = at.split(':').map(Number);
        return new Date().setHours(h, m, 0, 0) - Date.now();
    });
    const [items, setItems] = useState<FeedItem[]>(() =>
        script.slice(0, seed).map((s, i) => ({ ...s, key: seed - 1 - i, time: clock(Date.now() + offset - (i * 7 + 2) * 60000) })),
    );
    const add = (line: FeedLine) => setItems((xs) => [{ ...line, key: key.current++, time: clock(Date.now() + offset) }, ...xs].slice(0, max));
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const t = window.setInterval(() => add(script[next.current++ % script.length]), ms);
        return () => window.clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [script, ms]);
    return [items, (who, text) => add({ who, text })];
};

// Feed row that slides in when it is new.
export const FeedRow: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <motion.li layout="position" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={className}>
        {children}
    </motion.li>
);
export const FeedList: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <ul className={className} aria-live="off">
        <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ul>
);

// Right-hand detail drawer. Closes on Escape or a click on the backdrop.
export const Drawer: React.FC<{ open: boolean; onClose: () => void; label: string; className?: string; scrim?: string; children: React.ReactNode }> = ({ open, onClose, label, className = '', scrim = 'rgba(0,0,0,.45)', children }) => {
    const reduce = useReducedMotion();
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-[60] flex justify-end" style={{ background: scrim }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onClose}>
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label={label}
                        data-drawer
                        className={`relative h-full w-full max-w-[460px] overflow-y-auto ${className}`}
                        initial={reduce ? false : { x: 40 }}
                        animate={{ x: 0 }}
                        exit={reduce ? undefined : { x: 40 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// The only GYST-styled thing inside a demo dashboard. It sits in the page flow, above the client's header and
// again after the last section, so it never covers the dashboard.
export const GystBadge: React.FC<{ slug: string; foot?: boolean }> = ({ slug, foot }) => (
    <div data-gyst-strip className={`flex items-center justify-between gap-3 h-9 px-3 sm:px-5 bg-[#1A1B1D] text-[#F2F0EB] ${foot ? 'mt-14' : ''}`} style={{ fontFamily: 'Archivo, system-ui, sans-serif' }}>
        <a href="/demos" className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#8A9099] hover:text-[#F2F0EB] no-underline whitespace-nowrap" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            <span aria-hidden="true">&larr;</span> All demos
        </a>
        <a href="/calendar-page.html" onClick={() => trackBookClick(`demo-${slug}${foot ? '-foot' : ''}`)} className="flex items-center gap-2 text-[12.5px] font-medium text-[#F2F0EB] no-underline hover:underline underline-offset-4 whitespace-nowrap">
            <Device size={11} className="text-[#F0B429] shrink-0" />
            Built by GYST - book a mapping call
            <span aria-hidden="true">&rarr;</span>
        </a>
    </div>
);
