import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionContent, SectionId } from '../../types';
import { Reveal } from '../ui/Reveal';
import { Icon } from '../ui/Icons';

interface FeatureSectionProps {
    content: SectionContent;
    onInView: (id: any) => void;
}

const AnimatedCounter = ({ value, duration = 1.5 }: { value: string, duration?: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const end = parseFloat(value);
        if (count === end) return;
        const t = setTimeout(() => setCount(end), 100);
        return () => clearTimeout(t);
    }, [value, duration]);

    return <span>{value}</span>;
}

const CtaCard = () => {
    return (
        <Reveal className="w-full pt-16 pb-8 relative z-20">
            <div className="relative w-full bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
                 <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
                 
                 <div className="relative px-8 py-20 md:px-16 md:py-24 flex flex-col items-center justify-center text-center z-10">
                    <div className="absolute top-0 left-0 flex flex-col">
                        <div className="w-4 h-20 bg-[#FFB224] shadow-[0_0_20px_rgba(255,178,36,0.4)]"></div>
                        <div className="w-4 h-16 bg-[#FFD573]/20 backdrop-blur-sm"></div>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-10 leading-[1.1] relative z-20">
                        Ready to create your<br />
                        most capable system?
                    </h2>

                    <a href="/calendar-page.html" className="group relative flex items-center bg-white text-black pl-5 pr-2 py-2 rounded-sm shadow-[0_0_20px_rgba(255,178,36,0.3)] hover:shadow-[0_0_35px_rgba(255,178,36,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden">
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mr-4 relative z-10">Claim a Free Audit</span>
                        <div className="h-6 w-[1px] bg-neutral-200 mx-2 relative z-10"></div>
                        <div className="w-8 h-8 flex items-center justify-center relative z-10 group-hover:translate-x-0.5 transition-transform">
                           <Icon name="ArrowRight" size={16} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </a>

                     <div className="absolute bottom-0 right-0 flex items-end">
                          <div className="w-32 h-32 bg-[#FFB224] blur-[80px] opacity-40 absolute right-0 bottom-0 pointer-events-none"></div>
                          <div className="w-20 h-20 bg-[#FFD573]/10 backdrop-blur-sm border-l border-t border-white/5"></div>
                          <div className="w-20 h-20 bg-gradient-to-br from-[#FFB224] to-[#B45309]"></div>
                     </div>
                 </div>
            </div>
        </Reveal>
    );
};

export const FeatureSection: React.FC<FeatureSectionProps> = ({ content, onInView }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    const isWhySection = content.id === SectionId.WHY;
    const isIntentSection = content.id === SectionId.INTENT;
    const isDiagnosisSection = content.id === SectionId.DIAGNOSIS;
    const isMemorySection = content.id === SectionId.MEMORY;
    const isPlanningSection = content.id === SectionId.PLANNING;
    const isVerificationSection = content.id === SectionId.VERIFICATION;
    const isCtaSection = content.type === 'cta';
    const isIterationSection = content.id === SectionId.ITERATION;
    const isOfferSection = content.id === SectionId.OFFER;
    const isFinalSection = content.id === SectionId.FINAL;

    // Centering Logic
    const shouldCenterSection = isOfferSection || isFinalSection;
    const shouldCenterText = isOfferSection;

    useEffect(() => { if (isInView) onInView(content.id); }, [isInView, content.id, onInView]);

    if (isCtaSection) {
        return (
            <section id={content.id} ref={ref} className="min-h-[60vh] flex flex-col justify-center px-6 py-12 md:px-12 w-full max-w-5xl mx-auto relative z-10">
                <CtaCard />
            </section>
        );
    }

    return (
        <section 
            id={content.id} 
            ref={ref} 
            className={`min-h-screen flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 w-full ${shouldCenterSection ? 'items-center' : ''}`}
        >
            <div className={`space-y-10 max-w-xl ${shouldCenterText ? 'text-center mx-auto' : ''}`}>
                
                {/* Standard Content - Hidden for Final Section to prevent duplication with visual block */}
                {!isFinalSection && (
                    <>
                        {content.headline && (
                            <Reveal>
                                <h2 className="font-semibold tracking-tight text-white text-4xl md:text-5xl leading-[1.2] group cursor-default">
                                    <span className="relative z-10 transition-all duration-300 group-hover:text-[#FFB224] group-hover:drop-shadow-[0_0_15px_rgba(255,178,36,0.5)]">
                                        {content.headline}
                                    </span>
                                </h2>
                            </Reveal>
                        )}
                        {content.subheadline && (
                            <Reveal delay={0.1}>
                                <p className={isWhySection 
                                        ? "text-7xl md:text-8xl font-bold text-[#FFB224] tracking-tighter my-4 drop-shadow-[0_0_30px_rgba(255,178,36,0.3)]" 
                                        : "text-xl md:text-2xl text-neutral-400 font-normal leading-relaxed max-w-lg tracking-tight"
                                    }
                                >
                                    {content.subheadline}
                                </p>
                            </Reveal>
                        )}

                        {content.copy && (
                            <div className="space-y-6 text-xl text-neutral-400 leading-relaxed font-light">
                                {content.copy.map((paragraph, idx) => (
                                    <Reveal key={idx} delay={0.2 + (idx * 0.1)}>
                                        <p>{paragraph}</p>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                        {content.bullets && (
                            <ul className={`space-y-4 mt-6 ${shouldCenterText ? 'flex flex-col items-center' : ''}`}>
                                {content.bullets.map((bullet, idx) => (
                                    <Reveal key={idx} delay={0.3 + (idx * 0.1)}>
                                        <li className="flex items-center gap-4 text-neutral-300 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white transition-colors duration-500" />
                                            <span className="text-lg tracking-wide font-light">{bullet}</span>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {/* --- VISUALS --- */}
                {/* Visuals embedded conditionally based on section ID */}
                
                {isIntentSection && (
                    <Reveal delay={0.3} className="w-full pt-6">
                        <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-1 flex flex-col sm:flex-row gap-1 shadow-2xl overflow-hidden">
                            <div className="w-full sm:w-48 bg-[#0F0F0F] rounded-lg p-3 flex flex-col gap-1 shrink-0">
                                <div className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-white/5 rounded-md shadow-sm">
                                    <div className="w-0.5 h-3 bg-emerald-500 rounded-full"></div>
                                    <Icon name="FileText" size={14} className="text-white opacity-80" />
                                    <span className="text-xs font-medium text-white">Collaborative documents</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-default group">
                                    <Icon name="MessageSquare" size={14} className="group-hover:text-neutral-400 transition-colors" />
                                    <span className="text-xs font-medium">Inline comments</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-[#0F0F0F] rounded-lg border border-white/5 relative overflow-hidden flex flex-col min-h-[300px]">
                                <div className="h-8 border-b border-white/5 flex items-center px-4 justify-between bg-[#111]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-60"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-60"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-60"></div>
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-600">specs_v2.md</span>
                                    <div className="w-4"></div>
                                </div>
                                <div className="p-6 font-mono">
                                    <span className="text-[10px] font-semibold text-emerald-500 tracking-wider uppercase mb-2 block">Draft</span>
                                    <h4 className="text-lg font-semibold text-white mb-4">Product Specifications 2.0</h4>
                                    <div className="space-y-4 text-xs md:text-sm text-neutral-400 leading-relaxed">
                                        <p>The new sync engine should handle <span className="bg-[#242424] text-white px-1.5 py-0.5 rounded border border-white/10">offline states</span> gracefully without data loss.</p>
                                        <p className="relative inline-block">We need to ensure that the <span className="text-white">conflict resolution</span> strategy prioritizes user intent over server timestamp.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {isDiagnosisSection && (
                    <Reveal delay={0.2} className="w-full pt-12 relative perspective-1000">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
                        <div className="relative w-full h-[320px]">
                            <motion.div 
                                className="absolute right-0 top-0 w-80 p-5 rounded-xl border border-white/5 bg-[#080808] opacity-40 shadow-xl"
                                initial={{ rotateY: -10, rotateX: 5, z: -50, y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                            >
                                <div className="text-[10px] text-neutral-600 font-mono mb-2">ENG-1018</div>
                                <div className="flex items-start gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full border border-neutral-600 mt-1"></div>
                                    <span className="text-neutral-400 font-medium text-sm">Implement AES-256 Encryption</span>
                                </div>
                                <div className="inline-flex items-center px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-neutral-500">
                                    ! Security improvements
                                </div>
                            </motion.div>

                            <motion.div 
                                className="absolute left-4 top-12 w-[340px] p-6 rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl z-10"
                                initial={{ rotateY: -5, rotateX: 2, y: 10, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div className="text-[10px] text-neutral-500 font-mono">ENG-1025</div>
                                    <div className="text-[10px] text-amber-500 font-medium">High Priority</div>
                                </div>
                                <div className="flex items-start gap-3 mb-6">
                                    <div className="w-4 h-4 rounded-full border-[3px] border-amber-500/80 border-t-transparent mt-0.5 animate-spin"></div>
                                    <span className="text-white font-semibold text-lg tracking-tight">Introduce smart pipelines</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#1A1A1A] border border-white/5 text-[10px] text-neutral-400">
                                        <Icon name="Activity" size={10} />
                                        <span className="font-medium">Linear</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#1A1A1A] border border-white/5 text-[10px] text-[#FFB224]">
                                        <Icon name="Sparkles" size={10} />
                                        <span className="font-medium">UI Refresh</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Reveal>
                )}

                {isMemorySection && (
                    <Reveal delay={0.2} className="w-full pt-10">
                        <div className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            
                            <div className="h-10 border-b border-white/5 bg-[#111] flex items-center px-4 justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                    <Icon name="Database" size={14} className="text-emerald-500" />
                                    <span className="text-xs font-semibold text-white tracking-wide">Context Retrieval</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-mono text-emerald-500">CONNECTED</span>
                                </div>
                            </div>

                            <div className="p-6 relative z-10">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[#050505]">
                                        <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-white text-[10px] font-bold">Q</div>
                                        <div className="text-sm text-neutral-300 font-mono">"What is the user's current pricing tier?"</div>
                                    </div>

                                    <div className="flex justify-center -my-2 relative h-8">
                                        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 to-emerald-500/50"></div>
                                    </div>

                                    <div className="grid gap-3">
                                        {[
                                            { source: "Stripe", icon: "CreditCard", title: "Subscription: Enterprise Yearly", conf: "98%" },
                                            { source: "Intercom", icon: "MessageSquare", title: "Ticket #942: Upgrade Request", conf: "85%" },
                                            { source: "Postgres", icon: "Database", title: "User Table: id_9281", conf: "100%" }
                                        ].map((item, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + (i * 0.15) }}
                                                className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-md bg-[#151515] border border-white/5 flex items-center justify-center">
                                                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">{item.source}</span>
                                                        <span className="text-[10px] font-mono text-emerald-500">{item.conf} Match</span>
                                                    </div>
                                                    <div className="text-xs text-neutral-200 font-medium truncate">{item.title}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {isPlanningSection && (
                    <Reveal delay={0.2} className="w-full pt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20"><Icon name="GitBranch" size={14}/></div>
                                        <span className="text-sm font-medium text-white">Execution Plan</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Automated cycle checkpoints.</p>
                                </div>
                                
                                <div className="space-y-3">
                                    {[
                                        { text: 'Analyze Intent', status: 'done' },
                                        { text: 'Check Policy Rules', status: 'loading' },
                                        { text: 'Select Tool Chain', status: 'pending' }
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#111] borderborder-white/5">
                                            <span className={`text-xs font-medium ${task.status === 'done' ? 'text-neutral-300' : 'text-neutral-500'}`}>{task.text}</span>
                                            {task.status === 'done' ? <Icon name="CheckCircle2" size={14} className="text-emerald-500" /> : 
                                             task.status === 'loading' ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"/> :
                                             <Icon name="Circle" size={14} className="text-neutral-700" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                                <div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 block">Selected Tools</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['OpenAI', 'Linear', 'Slack'].map((tool, i) => (
                                            <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5">
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="text-neutral-500">Est. Cost</span>
                                        <span className="text-white font-mono">$0.004</span>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {content.id === SectionId.EXECUTION && (
                    <Reveal delay={0.2} className="w-full pt-6">
                        <div className="w-full bg-[#080808] rounded-xl border border-white/10 overflow-hidden font-mono text-xs shadow-2xl">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                                </div>
                                <span className="text-neutral-500 ml-2">agent_executor.py</span>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="flex gap-2">
                                    <span className="text-emerald-500">➜</span>
                                    <span className="text-white">Connecting to CRM... <span className="text-emerald-500">Success</span></span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-emerald-500">➜</span>
                                    <span className="text-white">Fetching contact details for "Acme Corp"</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-emerald-500">➜</span>
                                    <span className="text-white">Drafting email based on <span className="text-amber-500">template_v2</span></span>
                                </div>
                                <div className="flex gap-2 opacity-50">
                                    <span className="text-neutral-500">➜</span>
                                    <span className="text-neutral-400">Scheduling follow-up task...</span>
                                </div>
                                <motion.div 
                                    className="w-3 h-4 bg-white/50 inline-block align-middle ml-4"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </Reveal>
                )}

                {isVerificationSection && (
                    <Reveal delay={0.2} className="w-full pt-8">
                        <div className="relative w-full p-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl border border-emerald-500/20">
                            <div className="bg-[#0A0A0A] rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Icon name="ShieldCheck" size={64} className="text-emerald-500" />
                                </div>
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Icon name="Check" size={20} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">Outcome Verified</div>
                                        <div className="text-xs text-neutral-500">Confidence Score: 98%</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs text-neutral-400">
                                        <span>Intent Match</span>
                                        <span className="text-white">High</span>
                                    </div>
                                    <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[98%]"></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-xs text-neutral-400">
                                        <span>Policy Check</span>
                                        <span className="text-white">Pass</span>
                                    </div>
                                    <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[100%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {isIterationSection && (
                    <Reveal delay={0.2} className="w-full pt-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#FFB224] blur-[60px] opacity-10 rounded-full"></div>
                            <div className="relative w-48 h-48 rounded-full border border-white/10 bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-4 shadow-2xl">
                                <div className="mb-2 p-2 rounded-full bg-[#FFB224]/10 text-[#FFB224]">
                                    <Icon name="BarChart3" size={24} />
                                </div>
                                <div className="text-2xl font-bold text-white mb-1"><AnimatedCounter value="99.9" />%</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-500">System Accuracy</div>
                            </div>
                            <motion.div 
                                className="absolute top-0 left-1/2 -ml-3 -mt-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                animate={{ rotate: 360 }}
                                style={{ originX: "12px", originY: "108px" }} // center of circle + radius
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <Icon name="Zap" size={12} />
                            </motion.div>
                        </div>
                    </Reveal>
                )}

                {isOfferSection && (
                    <Reveal delay={0.2} className="w-full pt-6">
                        <div className="grid grid-cols-2 gap-3">
                            {['Custom Architecture', 'Full Implementation', 'Team Training', 'SLA Support'].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl border border-white/10 bg-[#0A0A0A] hover:bg-white/5 transition-colors flex flex-col items-center text-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-300">
                                        <Icon name="Check" size={14} />
                                    </div>
                                    <span className="text-xs font-medium text-neutral-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                )}

                {isFinalSection && (
                    <Reveal delay={0.2} className="w-full pt-12 flex flex-col items-center text-center">
                        <div className="relative mb-6 mx-auto">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse"></div>
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                        </div>
                        <h3 className="text-xl font-medium text-white tracking-tight mb-2">{content.headline}</h3>
                        <p className="text-sm font-mono text-emerald-500 tracking-widest uppercase">System Operational</p>
                        <a href="#" className="mt-8 text-neutral-500 hover:text-[#FFB224] transition-colors text-xs font-mono block">{content.micro}</a>
                    </Reveal>
                )}
            </div>
        </section>
    );
};