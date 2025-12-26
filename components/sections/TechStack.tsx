import React from 'react';
import { motion } from 'framer-motion';
import { Icon, IconName } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';

export const TechStackSection = () => {
    const techs = [
        { name: "Pydantic", icon: "Code" },
        { name: "OpenAI", icon: "BrainCircuit" },
        { name: "Claude", icon: "MessageSquare" },
        { name: "Hugging Face", icon: "Smile" },
        { name: "Pinecone", icon: "Database" },
        { name: "Supabase", icon: "Zap" },
        { name: "Docker", icon: "Box" },
        { name: "n8n", icon: "Workflow" },
        { name: "AWS", icon: "Cloud" },
        { name: "LangGraph", icon: "GitBranch" },
        { name: "Vercel", icon: "Command" },
    ];

    return (
        <section className="relative w-full py-8 bg-[#050505] overflow-hidden z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
                 <Reveal>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">Orchestrated with Modern Autonomous Stack</span>
                </Reveal>
            </div>
            
            <div className="relative w-full overflow-hidden flex mask-image-gradient">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
                
                <motion.div 
                    className="flex items-center gap-12 min-w-full pl-4"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                >
                    {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
                        <div key={i} className="flex items-center gap-3 shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                            <Icon name={tech.icon as IconName} size={18} className="text-neutral-400" />
                            <span className="text-sm font-semibold text-neutral-300 whitespace-nowrap">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};