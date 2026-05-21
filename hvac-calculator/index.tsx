import React, { useMemo, useState } from 'react';
import { Calculator } from './Calculator';
import { ResultView } from './ResultView';
import { EmailCapture } from './EmailCapture';
import { calculate } from './calculations';
import { DEFAULT_INPUTS, ACCENT_HEX } from './constants';
import { CalculatorInputs } from './types';
import './styles.css';

const Page2Placeholder: React.FC = () => (
  <section className="w-full max-w-3xl mx-auto px-5 py-16 border-t border-white/5">
    <div className="bg-[#0A0A0A] border border-dashed border-white/15 rounded-2xl p-8 text-center">
      <p className="text-neutral-400 text-sm leading-relaxed">
        Page 2 content placeholder — see HVAC_FUNNEL_COPY_V2_0.md sections 2–10.
        Build with follow-up PRP.
      </p>
    </div>
  </section>
);

const HvacCalculatorPage: React.FC = () => {
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
            HVAC Lead Loss Calculator
          </span>
        </a>
      </header>
      <main className="flex flex-col w-full">
        <Calculator inputs={inputs} onChange={setInputs} />
        <ResultView result={result} />
        <EmailCapture result={result} />
        <Page2Placeholder />
      </main>
      <footer className="w-full px-5 py-6 border-t border-white/5 text-center text-neutral-600 text-xs">
        © GYST AI 2026 · <a href="#" className="hover:text-neutral-400">Privacy</a> ·{' '}
        <a href="#" className="hover:text-neutral-400">Terms</a>
      </footer>
    </div>
  );
};

export default HvacCalculatorPage;
