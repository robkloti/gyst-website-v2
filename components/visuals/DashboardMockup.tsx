import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../ui/Icons';

const UptimeBars = ({ delay = 0 }: { delay?: number }) => (
    <div className="flex gap-[2px] h-6 items-end">
        {[...Array(40)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ height: "20%", opacity: 0.2 }}
                animate={{ height: ["20%", `${Math.random() * 60 + 40}%`, "20%"], opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.02 + delay, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                className="w-[3px] bg-emerald-500/80 rounded-[1px]"
            />
        ))}
    </div>
);

export const DashboardMockup = () => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const monitors = [
        { name: "Website", url: "acme.com", status: 100, latency: 24, id: 1 },
        { name: "App", url: "app.acme.com", status: 99.9, latency: 153, id: 2 },
        { name: "API", url: "api.acme.com", status: 100, latency: 45, id: 3 },
        { name: "Cloudfront", url: "acme.cloudfront.net", status: 99.8, latency: 89, id: 4 },
        { name: "Login Flow", url: "auth.acme.com", status: 100, latency: 220, id: 5 },
    ];

    return (
        <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[600px] perspective-2000 mt-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FFB224] opacity-[0.03] blur-[100px] rounded-full" />
            <motion.div
                initial={{ opacity: 0, rotateX: 10, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                <div className="w-64 border-r border-white/5 hidden md:flex flex-col bg-[#080808]">
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">A</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-white">Acme Corp</span>
                                <span className="text-[10px] text-neutral-500">Pro Plan</span>
                            </div>
                            <Icon name="MoreHorizontal" size={12} className="ml-auto text-neutral-500" />
                        </div>
                    </div>
                    <div className="flex-1 py-4 space-y-1 px-3">
                        {['Monitors', 'Status Pages', 'Components', 'Incidents', 'Maintenance', 'Teammates'].map((item, i) => (
                            <div key={item} className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}>
                                <Icon name={['Activity', 'Globe', 'Server', 'AlertTriangle', 'Zap', 'ShieldCheck'][i] as any} size={14} />
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-neutral-500 text-xs hover:text-white cursor-pointer transition-colors">
                            <Icon name="ZapOff" size={14} /> Integrations
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0A0A0A]/50 backdrop-blur-sm sticky top-0 z-10">
                        <h3 className="text-sm font-medium text-neutral-300">All 6 systems are up and running</h3>
                        <div className="flex gap-3">
                            <div className="hidden md:block relative">
                                <Icon name="Search" size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500" />
                                <input type="text" placeholder="Find monitor" className="bg-[#111] border border-white/10 rounded-md py-1.5 pl-9 pr-3 text-xs text-neutral-300 w-48 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors" />
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">New monitor</button>
                        </div>
                    </div>

                    <div className="p-6 space-y-1 overflow-y-auto">
                        {monitors.map((m) => (
                            <div
                                key={m.id}
                                onMouseEnter={() => setHoveredRow(m.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className="group relative flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-white font-medium flex items-center gap-2">{m.name} <Icon name="ChevronRight" size={12} className="text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                                        <div className="text-xs text-neutral-500 font-mono mt-0.5">{m.url}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="hidden lg:block w-32 h-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <UptimeBars delay={m.id} />
                                    </div>
                                    <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/5">
                                        <Icon name="Lock" size={10} className="text-emerald-500" />
                                        <span className="text-[10px] text-emerald-500 font-semibold tracking-wider">SSL</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};