import { trackBookClick } from '../../lib/track';
import React from 'react';
import { Icon } from '../ui/Icons';
import { Lockup } from '../ui/Lockup';

export const Footer = () => {
    return (
        <footer className="relative z-50 pt-20 pb-10 bg-charcoal border-t border-paper/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <Lockup size={30} />
                        <p className="text-steel text-sm leading-relaxed max-w-xs">
                            I install Claude Code on your team's own folders and keep it running.
                        </p>
                        <div className="flex flex-col gap-4 text-sm text-steel mt-2">
                            <div className="flex items-center gap-3">
                                <Icon name="Mail" size={16} />
                                <a href="mailto:rob@gyst-ai.com" className="hover:text-paper transition-colors">rob@gyst-ai.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="MapPin" size={16} />
                                <span className="text-steel/80 text-xs leading-relaxed">30 N Gould St, STE R<br />Sheridan, WY 82801, USA</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-hazard mb-6">Start here</h4>
                        <ul className="space-y-4 text-sm text-steel">
                            <li><a href="/calendar-page.html" onClick={() => trackBookClick('home_footer')} className="hover:text-paper transition-colors">Book the install call</a></li>
                            <li><a href="/lead-magnet.html" className="hover:text-paper transition-colors">Build your workspace — free, 6 questions</a></li>
                            <li><a href="/find-leaks" className="hover:text-paper transition-colors">HVAC operators: find your lead leaks</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-hazard mb-6">Rob, in public</h4>
                        <ul className="space-y-4 text-sm text-steel">
                            <li><a href="https://www.tiktok.com/@robtheops" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">TikTok — @robtheops</a></li>
                            <li><a href="https://x.com/robtheops" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">X — @robtheops</a></li>
                            <li><a href="https://www.instagram.com/robgyst.ai" target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">Instagram — @robgyst.ai</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-steel/70 text-xs font-mono">© 2026 GYST AI. Do, then share.</p>
                    <p className="text-steel/70 text-xs font-mono">System stable. Monitoring continues.</p>
                </div>
            </div>
        </footer>
    );
};
