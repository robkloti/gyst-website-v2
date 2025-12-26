import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { SectionContent, SectionId } from '../../types';
import { Icon, IconName } from '../ui/Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ProblemSectionProps {
  content: SectionContent;
  onInView: (id: SectionId) => void;
}

const cards = [
  {
    icon: "Activity",
    title: "Context Blindness",
    text: "They skip context that should be standardized.",
    subtext: "Most automations execute steps but miss the 'why'.",
  },
  {
    icon: "ZapOff",
    title: "Misaligned Pipelines",
    text: "They push users through pipelines without alignment.",
    subtext: "Action happens before understanding is confirmed.",
  },
  {
    icon: "XCircle",
    title: "No Verification",
    text: "They act without verifying whether the outcome actually mattered.",
    subtext: "Did it work? The system doesn't know.",
  },
  {
    icon: "AlertTriangle",
    title: "Silent Degradation",
    text: "No feedback. No testing. No loop to correct what quietly breaks over time.",
    subtext: "This doesn't scale. It degrades.",
  }
];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ content, onInView }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  
  // State for the status badge mainly
  const [isFinished, setIsFinished] = useState(false);

  // Notify parent of visibility for the visualizer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(content.id);
        }
      },
      { threshold: 0.1 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [onInView, content.id]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial set up: Hide cards 1, 2, 3 (move them down and fade them out)
      cardsRef.current.forEach((card, i) => {
        if (i === 0) return; // First card is visible
        if (card) {
             gsap.set(card, { y: 150, opacity: 0, scale: 0.95 });
        }
      });

      // The Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,   // LOCK the section in place
          start: "top top",
          end: "+=3000", // Scroll distance: 3000px of "scrolling" happens while pinned
          scrub: 1,    // Smooth scrubbing
          onUpdate: (self) => {
            // Update state for UI changes near the end
            if (self.progress > 0.85 && !isFinished) setIsFinished(true);
            if (self.progress <= 0.85 && isFinished) setIsFinished(false);

            // Manually update the text percentage to avoid React re-renders during scroll
            if (percentageRef.current) {
                const p = Math.min(Math.floor(self.progress * 100), 100);
                percentageRef.current.innerText = `${p}%`;
            }
          }
        }
      });

      // Animate Progress Bar 
      if (progressBarRef.current) {
        tl.to(progressBarRef.current, { scaleX: 1, ease: "none", duration: 10 }, 0);
      }

      // --- CARD ANIMATION SEQUENCE ---
      
      // Card 1 Enters
      if (cardsRef.current[1] && cardsRef.current[0]) {
          tl.to(cardsRef.current[1], { y: 0, opacity: 1, scale: 1, duration: 2 }, 1);
          // Card 0 Retreats
          tl.to(cardsRef.current[0], { scale: 0.92, opacity: 0.4, y: -20, duration: 2 }, 1);
      }

      // Card 2 Enters
      if (cardsRef.current[2] && cardsRef.current[1]) {
          tl.to(cardsRef.current[2], { y: 0, opacity: 1, scale: 1, duration: 2 }, 4);
          // Card 1 Retreats
          tl.to(cardsRef.current[1], { scale: 0.92, opacity: 0.4, y: -20, duration: 2 }, 4);
      }

      // Card 3 Enters (Final)
      if (cardsRef.current[3] && cardsRef.current[2]) {
          tl.to(cardsRef.current[3], { y: 0, opacity: 1, scale: 1, duration: 2 }, 7);
          // Card 2 Retreats
          tl.to(cardsRef.current[2], { scale: 0.92, opacity: 0.4, y: -20, duration: 2 }, 7);
      }

      // Hold slightly at the end
      tl.to({}, { duration: 1 });

    }, componentRef);

    return () => ctx.revert();
  }, [isFinished]);

  return (
    <div ref={componentRef} id="problem-section" className="relative bg-[#050505] z-20">
      <section ref={triggerRef} className="h-screen flex items-center justify-center overflow-hidden">
        
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full">
          
          {/* Static Header Left */}
          <div className="flex flex-col justify-center z-10 h-full max-h-[600px] w-full items-center lg:items-end">
            <div className="flex flex-col h-full justify-center w-full max-w-2xl">
                
                {/* Status Badge */}
                <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md mb-6 transition-colors duration-500 ${isFinished ? 'border-red-500/20 bg-red-500/10' : 'border-neutral-700 bg-neutral-800/30'}`}>
                        {isFinished ? (
                             <Icon name="AlertTriangle" size={12} className="text-red-500" />
                        ) : (
                             <Icon name="Activity" size={12} className="text-neutral-400" />
                        )}
                        <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${isFinished ? 'text-red-400' : 'text-neutral-400'}`}>
                            {isFinished ? "System Failure Confirmed" : "Scanning System..."}
                        </span>
                    </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-[1.1] mb-6">
                  {content.headline}
                </h2>
                
                <div className="space-y-6 text-xl text-neutral-400 leading-relaxed font-light mb-12">
                   <p>Most automations execute steps. <br />Very few operate from an agreed understanding of <span className="text-white italic">why</span> those steps exist.</p>
                   <p>This doesn't scale. It degrades.</p>
                </div>

                {/* Progress Indicator */}
                <div className="mt-auto w-full">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Diagnosis Progress</span>
                        {/* Direct DOM manipulation for percentage to avoid re-renders */}
                        <span ref={percentageRef} className={`text-xs font-mono ml-auto transition-colors duration-300 ${isFinished ? 'text-red-500 font-bold' : 'text-neutral-400'}`}>
                            0%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5 relative">
                         <div className="absolute inset-0 bg-neutral-800/30" />
                         {/* GSAP Target for scaleX */}
                        <div 
                            ref={progressBarRef}
                            className={`h-full origin-left scale-x-0 transition-colors duration-300 ${isFinished ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white'}`}
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* Stacked Cards Right */}
          <div className="w-full flex items-center justify-center lg:justify-start lg:pl-12">
             <div className="relative w-full max-w-[420px] aspect-[4/5] lg:aspect-square perspective-1000">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        ref={(el) => { cardsRef.current[i] = el; }}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{ zIndex: i }}
                    >
                        <div className="w-full h-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                            
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                            
                            {/* Top Icon Area */}
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="h-12 w-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white">
                                    <Icon name={card.icon as IconName} size={20} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-full">
                                        0{i + 1} / 0{cards.length}
                                    </span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="relative z-10 my-auto">
                                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 leading-tight tracking-tight">
                                    "{card.text}"
                                </h3>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-wider">
                                    {card.title}
                                </p>
                            </div>

                            {/* Bottom Decoration */}
                            <div className="relative z-10 pt-6 border-t border-white/5 flex items-center gap-3">
                                <div className={`h-1.5 w-1.5 rounded-full ${i === cards.length - 1 ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'}`} />
                                <span className="text-xs text-neutral-500">
                                    {i === cards.length - 1 ? "System Failure Detected" : "Analyzing workflow step..."}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};