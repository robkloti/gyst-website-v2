import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '../../types';

interface LoopVisualizerProps {
    activeSection: SectionId;
}

export const LoopVisualizer: React.FC<LoopVisualizerProps> = ({ activeSection }) => {
    const [showWhy, setShowWhy] = useState(false);

    useEffect(() => {
        if (activeSection === SectionId.WHY) {
            const t1 = setTimeout(() => setShowWhy(true), 300);
            return () => { clearTimeout(t1); setShowWhy(false); };
        } else {
            setShowWhy(false);
        }
    }, [activeSection]);

    const circleRadius = 120;
    const strokeWidth = 1.5;
    const center = 200;
    const circumference = 2 * Math.PI * circleRadius;

    const containerVariants = {
        [SectionId.HERO]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.PROBLEM]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.WHY]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.INTENT]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.DIAGNOSIS]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.MEMORY]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.PLANNING]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.EXECUTION]: { opacity: 1, scale: 1, rotate: 360, transition: { repeat: Infinity, duration: 12, ease: "linear" } },
        [SectionId.VERIFICATION]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.ITERATION]: { opacity: 1, scale: 1, rotate: 360, transition: { repeat: Infinity, duration: 6, ease: "linear" } },
        [SectionId.OFFER]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.FINAL]: { opacity: 0.5, scale: 0.9, rotate: 0 },
        [SectionId.CTA]: { opacity: 1, scale: 1, rotate: 0 },
        [SectionId.TECH_STACK]: { opacity: 1, scale: 1, rotate: 0 }
    };

    const getDashArray = () => {
        switch (activeSection) {
            case SectionId.PROBLEM: return "10, 40";
            case SectionId.WHY: return "0, 1000"; // Empty ring
            case SectionId.INTENT: return "2, 800"; // Tiny starting dot
            case SectionId.DIAGNOSIS: return "180, 580";
            case SectionId.MEMORY: return "360, 400";
            case SectionId.PLANNING: return "540, 220";
            case SectionId.EXECUTION:
            case SectionId.ITERATION:
            case SectionId.VERIFICATION:
            case SectionId.OFFER:
            case SectionId.FINAL:
            case SectionId.CTA:
                return `${circumference}, 0`;
            default: return "0, 1000";
        }
    };

    const showVerification = activeSection === SectionId.VERIFICATION;
    const showDot = activeSection !== SectionId.HERO && activeSection !== SectionId.FINAL && activeSection !== SectionId.WHY;
    const isBroken = activeSection === SectionId.PROBLEM;
    const isHero = activeSection === SectionId.HERO;

    return (
        <div className="relative w-[400px] h-[400px] flex items-center justify-center pointer-events-none select-none">
            {isHero && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[240px] h-[240px] rounded-full border border-white/20 animate-sonar" />
                    <div className="absolute w-[240px] h-[240px] rounded-full border border-white/20 animate-sonar-delay" />
                </div>
            )}

            <AnimatePresence>
                {activeSection === SectionId.WHY && showWhy && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.4 }}
                        className="absolute z-50 text-white font-bold text-4xl tracking-tighter mix-blend-difference"
                    >
                        WHY?
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                initial={false}
                animate={activeSection}
                variants={containerVariants}
                className="overflow-visible"
                style={{ originX: "50%", originY: "50%" }}
            >
                <circle cx={center} cy={center} r={circleRadius - 40} fill="none" stroke="#222" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx={center} cy={center} r={circleRadius + 20} fill="none" stroke="#151515" strokeWidth="1" />

                {isHero && (
                    <g opacity="0.4">
                        <path d={`M ${center - circleRadius - 20} ${center} L 0 ${center}`} stroke="#333" strokeWidth="1" />
                        <path d={`M ${center + (circleRadius * 0.7)} ${center - (circleRadius * 0.7)} L 400 0`} stroke="#333" strokeWidth="1" />
                    </g>
                )}

                <motion.circle cx={center} cy={center} r={circleRadius} fill="none" stroke="#262626" strokeWidth="1" />

                <motion.circle
                    cx={center}
                    cy={center}
                    r={circleRadius}
                    fill="none"
                    stroke={activeSection === SectionId.PROBLEM ? "#ef4444" : "#fff"}
                    strokeWidth={strokeWidth}
                    strokeLinecap={isBroken ? "butt" : "round"}
                    initial={false}
                    animate={{
                        strokeDasharray: getDashArray(),
                        opacity: 1,
                        rotate: -90,
                        x: isBroken ? [0, -1, 1, 0] : 0,
                        stroke: activeSection === SectionId.PROBLEM ? "#ef4444" : "#ffffff"
                    }}
                    transition={{
                        strokeDasharray: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
                        x: { duration: 0.1, repeat: isBroken ? Infinity : 0, repeatType: "reverse" },
                        stroke: { duration: 0.3 }
                    }}
                    style={{ originX: "50%", originY: "50%" }}
                    className={activeSection !== SectionId.PROBLEM ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}
                />

                <AnimatePresence>
                    {activeSection === SectionId.DIAGNOSIS && (
                        <>
                            <motion.circle
                                initial={{ opacity: 0, r: circleRadius }}
                                animate={{ opacity: 0.5, r: circleRadius - 15 }}
                                exit={{ opacity: 0 }}
                                cx={center} cy={center}
                                fill="none" stroke="#666" strokeWidth="0.5"
                            />
                            <motion.circle
                                initial={{ opacity: 0, r: circleRadius }}
                                animate={{ opacity: 0.3, r: circleRadius - 30 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                cx={center} cy={center}
                                fill="none" stroke="#666" strokeWidth="0.5"
                            />
                        </>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {activeSection === SectionId.PLANNING && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                        >
                            <path d={`M ${center} ${center - circleRadius} Q ${center + 40} ${center - circleRadius + 20} ${center + 60} ${center - circleRadius + 80}`} fill="none" stroke="#666" strokeWidth="1" strokeDasharray="2 2" />
                            <path d={`M ${center} ${center - circleRadius} Q ${center - 40} ${center - circleRadius + 20} ${center - 60} ${center - circleRadius + 80}`} fill="none" stroke="#666" strokeWidth="1" strokeDasharray="2 2" />
                        </motion.g>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showVerification && (
                        <motion.path
                            d={`M ${center} ${center - circleRadius + 15} L ${center} ${center - circleRadius - 15}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                        />
                    )}
                </AnimatePresence>

                {showDot && (
                    <motion.circle
                        cx={center}
                        cy={center - circleRadius}
                        r={3}
                        fill={activeSection === SectionId.PROBLEM ? "#ef4444" : "#fff"}
                        initial={false}
                        animate={activeSection}
                        variants={{
                            [SectionId.PROBLEM]: { opacity: 0.5, scale: 1 },
                            [SectionId.INTENT]: { opacity: 1 },
                            [SectionId.DIAGNOSIS]: { opacity: 1 },
                            [SectionId.MEMORY]: { opacity: 1 },
                            [SectionId.PLANNING]: { opacity: 1 },
                            [SectionId.EXECUTION]: { opacity: 1 },
                            [SectionId.VERIFICATION]: { opacity: 1, scale: 0 },
                            [SectionId.ITERATION]: { opacity: 1 },
                            [SectionId.OFFER]: { opacity: 1 },
                        }}
                        style={{ originX: "50%", originY: "200px" }}
                    />
                )}
            </motion.svg>
        </div>
    );
};