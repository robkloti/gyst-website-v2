import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { SectionId } from '../types';

// Tells the fixed ring background which section is on screen.
export const useSection = (id: SectionId, onInView: (id: SectionId) => void) => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });
    useEffect(() => {
        if (inView) onInView(id);
    }, [inView, id, onInView]);
    return ref;
};
