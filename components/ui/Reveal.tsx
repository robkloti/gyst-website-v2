import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};