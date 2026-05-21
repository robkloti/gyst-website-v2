import React from 'react';
import { SurfaceCard } from './primitives/SurfaceCard';
import { StatusPill } from './primitives/StatusPill';
import { TerminalPath } from './primitives/TerminalPath';
import { CountUpNumber } from './primitives/CountUpNumber';
import './tokens.css';
import './CalculatorPreviewSurface.css';

/*
 * Static, non-interactive preview of the calculator's result. Page 1 hero.
 *
 * NOTE ON NUMBERS: these are the spec's locked illustrative values. They do NOT
 * reconcile with the live hvac-calculator/calculations.ts at any single input set
 * (that formula returns higher figures). The caption disclaims this ("Run the real
 * one to see your number"), so the card is illustrative only. If you want the preview
 * to mirror live math, regenerate these from calculations.ts and update here.
 */
const TOTAL_LEAK = 47213;
const ROWS: ReadonlyArray<{ n: string; label: string; amount: string }> = [
  { n: '01', label: 'After-hours leads', amount: '$23,040 / mo' },
  { n: '02', label: 'Dead quotes', amount: '$19,440 / mo' },
  { n: '03', label: 'Ad spend leak', amount: '$4,733 / mo' },
];

const formatDollars = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

export const CalculatorPreviewSurface: React.FC = () => (
  <SurfaceCard
    className="gyst-surface calc-preview"
    role="img"
    aria-label="Sample HVAC lead-loss calculator result preview showing approximately $47,213 monthly leak across after-hours leads, dead quotes, and untracked ad spend."
  >
    <div className="calc-preview__top">
      <TerminalPath path="~/calculator / hvac / live" />
      <StatusPill />
    </div>

    <p className="calc-preview__label">Your monthly leak</p>
    <CountUpNumber
      value={TOTAL_LEAK}
      format={formatDollars}
      className="calc-preview__number surface-tnum"
    />

    <hr className="calc-preview__divider" />

    <div className="calc-preview__rows">
      {ROWS.map((row) => (
        <div className="calc-preview__row" key={row.n}>
          <span className="calc-preview__row-num">{row.n}</span>
          <span className="calc-preview__row-label">{row.label}</span>
          <span className="calc-preview__row-amt surface-tnum">{row.amount}</span>
        </div>
      ))}
    </div>

    <hr className="calc-preview__divider" />

    <p className="calc-preview__caption">
      <span>Sample calculation using industry-average inputs.</span>
      <span>Run the real one to see your number.</span>
    </p>
  </SurfaceCard>
);
