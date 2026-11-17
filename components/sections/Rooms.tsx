import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { WorkerRoom } from '../../rooms/WorkerRoom';
import { RoomData } from '../../rooms/types';
import { SHANG_ROOM } from '../../rooms/shang';
import { CAELUM_ROOM } from '../../rooms/caelum';
import { HVAC_ROOM } from '../../rooms/hvac';
import { MARKETING_ROOM } from '../../rooms/marketing';
import { GGC_ROOM } from '../../rooms/ggc';
import { track } from '../../lib/track';
import { useVertical } from '../../lib/vertical';

const ROOMS: { label: string; room: RoomData; note: string; link?: [string, string] }[] = [
    { label: 'Real estate', room: SHANG_ROOM, note: 'Built for Shang Properties.', link: ['/work/shang', 'Read the case study + try the demo'] },
    { label: 'Insurance', room: CAELUM_ROOM, note: 'Built for Caelum.', link: ['/work/caelum', 'Read the case study'] },
    { label: 'HVAC', room: HVAC_ROOM, note: 'Example room, built from the HVAC install.', link: ['/find-leaks/start', 'See what your leads are worth'] },
    { label: 'Marketing team', room: MARKETING_ROOM, note: 'Example room, built from the Marketing stack.' },
    { label: 'Dance studio', room: GGC_ROOM, note: 'Good Girls Club. Dashed desks are planned.' },
];

// A ?room= link wins on first load, then the room that matches ?v=, then the first room.
const initial = (verticalRoom?: string) => {
    const slug = new URLSearchParams(window.location.search).get('room') ?? verticalRoom;
    const i = ROOMS.findIndex((r) => r.room.slug === slug);
    return i < 0 ? 0 : i;
};

export const Rooms = () => {
    const { vertical } = useVertical();
    const [active, setActive] = useState(() => initial(vertical.room));
    const seen = useRef(vertical.room);

    // The hero switcher opens the matching room.
    useEffect(() => {
        if (seen.current === vertical.room) return;
        seen.current = vertical.room;
        const i = ROOMS.findIndex((r) => r.room.slug === vertical.room);
        if (i >= 0) setActive(i);
    }, [vertical.room]);
    const current = ROOMS[active];

    const pick = (i: number) => {
        setActive(i);
        const url = new URL(window.location.href);
        url.searchParams.set('room', ROOMS[i].room.slug);
        window.history.replaceState(null, '', url);
        track('room_switch', { room: ROOMS[i].room.slug });
        document.getElementById(`room-tab-${ROOMS[i].room.slug}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const next = (active + (e.key === 'ArrowRight' ? 1 : ROOMS.length - 1)) % ROOMS.length;
        pick(next);
        document.getElementById(`room-tab-${ROOMS[next].room.slug}`)?.focus();
    };

    return (
        <section id="rooms" className="relative w-full py-24 px-4 md:px-12 z-10 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">The rooms</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">Pick your business. Watch the room.</h2>
                    <p className="text-steel text-lg mt-5 max-w-2xl">Same brain, different rooms. Every desk is an agent with one job. Click any desk to see what it does.</p>
                </Reveal>

                <div role="tablist" aria-label="Business type" className="flex gap-px bg-paper/10 border border-paper/10 mt-10 overflow-x-auto" onKeyDown={onKey}>
                    {ROOMS.map((r, i) => (
                        <button
                            key={r.room.slug}
                            id={`room-tab-${r.room.slug}`}
                            role="tab"
                            type="button"
                            aria-selected={i === active}
                            aria-controls="room-panel"
                            tabIndex={i === active ? 0 : -1}
                            onClick={() => pick(i)}
                            className={`flex-1 min-w-[132px] px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${i === active ? 'bg-paper text-charcoal' : 'bg-charcoal text-steel hover:text-paper'}`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>

                <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${current.room.slug}`} className="mt-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                        <p className="text-steel text-[15px]">{current.note}</p>
                        {current.link && (
                            <a href={current.link[0]} className="text-paper text-[15px] font-semibold no-underline hover:underline underline-offset-4">
                                {current.link[1]} <span aria-hidden="true">&rarr;</span>
                            </a>
                        )}
                    </div>
                    <WorkerRoom key={current.room.slug} room={current.room} />
                </div>
            </div>
        </section>
    );
};
