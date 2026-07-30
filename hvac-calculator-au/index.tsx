import React, { useMemo, useState } from 'react';
import { Calculator } from './Calculator';
import { ResultView } from './ResultView';
import { EmailCapture } from './EmailCapture';
import { SalesPage } from './SalesPage';
import { calculate } from './calculations';
import { DEFAULT_INPUTS, ACCENT_HEX } from './constants';
import { CalculatorInputs } from './types';
import './styles.css';

const HvacCalculatorPageAU: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculate(inputs), [inputs]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-neutral-200 overflow-x-hidden">
      <header className="w-full px-5 py-4 border-b border-white/5">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-bold tracking-tight text-white"
        >
          <span style={{ color: ACCENT_HEX }}>GYST</span>
          <span className="text-neutral-500 text-xs font-normal hidden sm:inline">
            Air-Con Lead Loss Calculator
          </span>
        </a>
      </header>
      <main className="flex flex-col w-full">
        <Calculator inputs={inputs} onChange={setInputs} />
        <ResultView result={result} />
        <EmailCapture result={result} />
        <SalesPage />
      </main>
      <footer className="w-full px-5 py-6 border-t border-white/5 text-center text-neutral-600 text-xs">
        © GYST AI 2026 · <a href="#" className="hover:text-neutral-400">Privacy</a> ·{' '}
        <a href="#" className="hover:text-neutral-400">Terms</a>
      </footer>
    </div>
  );
};

export default HvacCalculatorPageAU;
