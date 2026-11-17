import React from 'react';
import { Button } from '../ui/Button';
import { Lockup } from '../ui/Lockup';
import { trackBookClick } from '../../lib/track';
import { BOOK_LABEL, BOOK_URL } from '../../constants';

const HOME_LINKS: [string, string][] = [['#work', 'The work'], ['#offer', 'The offer']];

// The landing pages pass their own anchors, a logo link that stays on the page, and a booking link that carries their UTM tags.
export const Navbar: React.FC<{ links?: [string, string][]; homeHref?: string; bookHref?: string; bookLocation?: string }> = ({ links = HOME_LINKS, homeHref = '/', bookHref = BOOK_URL, bookLocation = 'home_nav' }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent">
            <div className="pointer-events-auto">
                <Lockup size={22} href={homeHref} />
            </div>
            <div className="pointer-events-auto flex items-center gap-3">
                {links.map(([href, label]) => (
                    <a key={href} href={href} className="hidden md:block font-mono text-[10px] uppercase tracking-[0.16em] text-steel hover:text-paper no-underline px-2">
                        {label}
                    </a>
                ))}
                <a href={bookHref} onClick={() => trackBookClick(bookLocation)}>
                    <Button variant="secondary" className="!px-5 !py-2 !text-[10px] backdrop-blur-md bg-charcoal/40">
                        {BOOK_LABEL}
                    </Button>
                </a>
            </div>
        </nav>
    );
};
