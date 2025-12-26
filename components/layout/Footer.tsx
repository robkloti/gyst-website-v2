import React from 'react';
import { Icon } from '../ui/Icons';

export const Footer = () => {
    return (
        <footer className="relative z-50 pt-20 pb-10 bg-[#050505] border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Branding Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-[#FFB224]">
                            <Icon name="GystLogo" size={36} />
                            <span className="font-bold tracking-tighter text-2xl">GYST</span>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-medium">
                            Premium AI Agency transforming enterprise operations with custom AI solutions
                        </p>
                        <div className="flex flex-col gap-4 text-sm text-neutral-400 mt-2">
                            <div className="flex items-center gap-3">
                                <Icon name="Mail" size={16} />
                                <span className="hover:text-white transition-colors cursor-pointer">hello@gyst.ai</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="Phone" size={16} />
                                <span className="hover:text-white transition-colors cursor-pointer">+1 (555) GYST-AI</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="MapPin" size={16} />
                                <span className="hover:text-white transition-colors cursor-pointer">Enterprise AI Solutions, Global</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-sm">Product</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/voice-agent-page.html" className="hover:text-white transition-colors">Voice Agent</a></li>
                            <li><a href="/caelum-landing-page.html" className="hover:text-white transition-colors">Finance</a></li>
                            <li><a href="/calendar-page.html" className="hover:text-white transition-colors">Book a Call</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-sm">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-sm">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-600 text-xs">© 2024 GYST Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Icon name="Twitter" size={18} /></a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Icon name="Linkedin" size={18} /></a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Icon name="Github" size={18} /></a>
                    </div>
                    <div className="flex gap-8 text-xs text-neutral-600">
                        <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};