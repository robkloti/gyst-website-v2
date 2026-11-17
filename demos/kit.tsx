import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { track, trackBookClick } from '../lib/track';

export type FeedLine = { who: string; text: string };
export type FeedItem = FeedLine & { key: string; time: string };

// Tab title, the dashboard's own fonts, and the page ground behind the app shell.
export const useDemoHead = (slug: string, title: string, fonts: string, ground: string) => {
    useEffect(() => {
        const prevTitle = document.title;
        const prevBg = document.body.style.background;
        document.title = title;
        document.body.style.background = ground;
        track('demo_view', { demo: slug });
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;
        document.head.appendChild(link);
        return () => {
            link.remove();
            document.title = prevTitle;
            document.body.style.background = prevBg;
        };
    }, [slug, title, fonts, ground]);
};

export const useNarrow = (px = 760) => {
    const query = `(max-width: ${px}px)`;
    const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const on = () => setNarrow(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, [query]);
    return narrow;
};

// 631 -> "10:31 AM"
export const clockLabel = (minutes: number, suffix = true) => {
    const h24 = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    const h = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h}:${String(m).padStart(2, '0')}${suffix ? (h24 < 12 ? ' AM' : ' PM') : ''}`;
};

// The demo runs on its own clock so the feed, the header and the "now" line always agree.
// Seed lines are already on screen. The rest arrive one at a time, each nudging the clock a minute forward
// (up to `drift` minutes, so the day's statuses stay believable). Nothing arrives under reduced motion or while paused.
export const useLiveFeed = (script: FeedLine[], startMinutes: number, seed = 4, ms = 5200, drift = 8) => {
    const reduce = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const [arrived, setArrived] = useState(0);
    const [items, setItems] = useState<FeedItem[]>(() =>
        script
            .slice(0, seed)
            .map((line, i) => ({ ...line, key: `s${i}`, time: clockLabel(startMinutes - [0, 2, 4, 5, 6, 19][seed - 1 - i]) }))
            .reverse()
    );
    const now = startMinutes + Math.min(arrived, drift);
    const running = !reduce && !paused;

    useEffect(() => {
        if (!running) return;
        const id = window.setTimeout(
            () => {
                const n = arrived + 1;
                const line = script[(seed + arrived) % script.length];
                const time = clockLabel(startMinutes + Math.min(n, drift));
                setItems((prev) => [{ ...line, key: `a${n}`, time }, ...prev].slice(0, 30));
                setArrived(n);
            },
            arrived === 0 ? 2600 : ms
        );
        return () => window.clearTimeout(id);
    }, [running, arrived, script, seed, ms, drift, startMinutes]);

    return { items, now, running, paused, setPaused };
};

// Slots the owner's approvals into the log at the moment they happened.
export const withApprovals = (items: FeedItem[], lines: { id: string; who: string; text: string; time: string; after: string }[]) =>
    items.flatMap((it) => [
        ...lines.filter((l) => l.after === it.key).map((l) => ({ key: `you-${l.id}`, who: l.who, text: l.text, time: l.time, you: true })),
        { ...it, you: false },
    ]);

// Right-hand detail sheet. Slides along the path it leaves on; opacity only under reduced motion.
export const Sheet: React.FC<{
    open: boolean;
    onClose: () => void;
    label: string;
    className: string;
    scrimClassName: string;
    duration?: number;
    children: React.ReactNode;
}> = ({ open, onClose, label, className, scrimClassName, duration = 0.28, children }) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const opener = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;
        opener.current = document.activeElement as HTMLElement | null;
        ref.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            opener.current?.focus?.();
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className={scrimClassName}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: duration * 0.7 }}
                    />
                    <motion.aside
                        ref={ref}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label={label}
                        className={className}
                        initial={reduce ? { opacity: 0 } : { x: '100%' }}
                        animate={reduce ? { opacity: 1 } : { x: 0 }}
                        exit={reduce ? { opacity: 0 } : { x: '100%', transition: { duration: duration * 0.7, ease: [0.32, 0.72, 0, 1] } }}
                        transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
                    >
                        {children}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

// One toast at a time, with Undo. The 5s timer pauses while the pointer is over it.
export type Toast = { id: number; text: string; undo: () => void };
export const useToast = () => {
    const [toast, setToast] = useState<Toast | null>(null);
    const n = useRef(0);
    const show = useCallback((text: string, undo: () => void) => setToast({ id: ++n.current, text, undo }), []);
    const clear = useCallback(() => setToast(null), []);
    return { toast, show, clear };
};

export const ToastHost: React.FC<{ toast: Toast | null; clear: () => void; className: string }> = ({ toast, clear, className }) => {
    const reduce = useReducedMotion();
    const [hover, setHover] = useState(false);
    useEffect(() => {
        if (!toast || hover) return;
        const id = window.setTimeout(clear, 5000);
        return () => window.clearTimeout(id);
    }, [toast, hover, clear]);
    return (
        <div aria-live="polite" className={`${className}-host`}>
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key={toast.id}
                        className={className}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduce ? 0 : 5, transition: { duration: 0.14 } }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <span>{toast.text}</span>
                        <button
                            type="button"
                            onClick={() => {
                                toast.undo();
                                clear();
                            }}
                        >
                            Undo
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Sits in the page footer, in the flow. Never floats over the dashboard.
export const GystCredit: React.FC<{ slug: string; className: string }> = ({ slug, className }) => (
    <a className={className} href="/calendar-page.html" onClick={() => trackBookClick(`demo-${slug}`)}>
        Built by GYST - book a mapping call
    </a>
);

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;

// Value that tweens to its new figure and flashes its background once. Swaps instantly under reduced motion.
export const Count: React.FC<{ value: number; format?: (n: number) => string; className?: string }> = ({ value, format = money, className = '' }) => {
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(value);
    const [flash, setFlash] = useState(0);
    const from = useRef(value);
    useEffect(() => {
        if (from.current === value) return;
        const start = from.current;
        from.current = value;
        setFlash((f) => f + 1);
        if (reduce) {
            setShown(value);
            return;
        }
        const t0 = performance.now();
        let raf = 0;
        const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 360);
            setShown(Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [value, reduce]);
    return (
        <span key={flash} className={`${className} ${flash ? 'is-changed' : ''}`}>
            {format(shown)}
        </span>
    );
};
