import React, { useRef } from 'react';
import { CalculatorInputs, QuestionConfig } from './types';
import { QUESTIONS, ACCENT_HEX } from './constants';

interface CalculatorProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

function formatDisplay(value: number, q: QuestionConfig): string {
  if (q.format === 'currency') return `$${value.toLocaleString('en-AU')}`;
  if (q.format === 'percent') return `${value}%`;
  return value.toLocaleString('en-AU');
}

export const Calculator: React.FC<CalculatorProps> = ({ inputs, onChange }) => {
  const hasInteractedRef = useRef(false);

  const handleSliderChange = (q: QuestionConfig, sliderValue: number) => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      // Fire GA4 event once on first interaction
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'calculator_started', {
          event_category: 'engagement',
          event_label: 'hvac_calculator_au',
        });
      }
    }
    // For the percent question, the slider value is whole-number percent.
    // Store conversionRate internally as a decimal (e.g. 20 → 0.20).
    const stored = q.format === 'percent' ? sliderValue / 100 : sliderValue;
    onChange({ ...inputs, [q.id]: stored });
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-5 py-10 md:py-14">
      <header className="mb-10 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-3">
          Find out exactly how many leads your air conditioning business is losing this month.
        </h1>
        <p className="text-neutral-400 text-sm md:text-base font-light">
          Four questions. Four minutes. A real number in dollars by the time
          you're done.
        </p>
      </header>

      <div className="space-y-8">
        {QUESTIONS.map((q) => {
          const rawStored = inputs[q.id];
          const displayValue =
            q.format === 'percent' ? Math.round(rawStored * 100) : rawStored;
          return (
            <div
              key={q.id}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <label
                  htmlFor={`q-${q.id}`}
                  className="text-white text-sm md:text-base font-medium leading-snug"
                >
                  {q.label}
                </label>
                <span
                  className="text-2xl md:text-3xl font-bold tracking-tight tabular-nums whitespace-nowrap"
                  style={{ color: ACCENT_HEX, fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatDisplay(displayValue, q)}
                </span>
              </div>
              <input
                id={`q-${q.id}`}
                type="range"
                min={q.min}
                max={q.max}
                step={q.step}
                value={displayValue}
                onChange={(e) =>
                  handleSliderChange(q, Number(e.target.value))
                }
                className="hvac-slider w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_HEX} 0%, ${ACCENT_HEX} ${
                    ((displayValue - q.min) / (q.max - q.min)) * 100
                  }%, #262626 ${
                    ((displayValue - q.min) / (q.max - q.min)) * 100
                  }%, #262626 100%)`,
                }}
                aria-label={q.label}
              />
              <p className="text-neutral-500 text-xs md:text-sm mt-3 leading-relaxed">
                {q.helper}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
