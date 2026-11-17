import React from 'react';
import { Button } from '../ui/Button';
import { Lockup } from '../ui/Lockup';
import { trackBookClick } from '../../lib/track';
import { BOOK_LABEL, BOOK_URL } from '../../constants';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent">
            <div className="pointer-events-auto">
                <Lockup size={22} />
            </div>
            <div className="pointer-events-auto flex items-center gap-3">
                <a href="#work" className="hidden md:block font-mono text-[10px] uppercase tracking-[0.16em] text-steel hover:text-paper no-underline px-2">
                    The work
                </a>
                <a href="#offer" className="hidden md:block font-mono text-[10px] uppercase tracking-[0.16em] text-steel hover:text-paper no-underline px-2">
                    The offer
                </a>
                <a href={BOOK_URL} onClick={() => trackBookClick('home_nav')}>
                    <Button variant="secondary" className="!px-5 !py-2 !text-[10px] backdrop-blur-md bg-charcoal/40">
                        {BOOK_LABEL}
                    </Button>
                </a>
            </div>
        </nav>
    );
};
