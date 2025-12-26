import React from 'react';
import { Icon } from '../ui/Icons';
import { Button } from '../ui/Button';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 text-white pointer-events-auto cursor-pointer mix-blend-difference">
                <Icon name="GystLogo" size={24} />
                <span className="font-bold tracking-tighter text-lg hidden sm:block">GYST</span>
            </div>
            <div className="pointer-events-auto">
                <a href="/calendar-page.html">
                    <Button variant="secondary" className="!px-5 !py-2 !text-[10px] uppercase tracking-widest backdrop-blur-md bg-black/20">
                        Let's Chat
                    </Button>
                </a>
            </div>
        </nav>
    );
};