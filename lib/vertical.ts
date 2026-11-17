import { createContext, useContext } from 'react';
import { VERTICALS } from '../constants';
import { Vertical, VerticalKey } from '../types';

export const verticalByKey = (key: string | null): Vertical =>
    VERTICALS.find((v) => v.key === key) ?? VERTICALS[0];

// ?v=trades opens the page already switched, so an email or a Loom can link to the right version.
export const initialVertical = (): VerticalKey =>
    verticalByKey(new URLSearchParams(window.location.search).get('v')).key;

export const VerticalContext = createContext<{ vertical: Vertical; setVertical: (key: VerticalKey) => void }>({
    vertical: VERTICALS[0],
    setVertical: () => {},
});

export const useVertical = () => useContext(VerticalContext);
