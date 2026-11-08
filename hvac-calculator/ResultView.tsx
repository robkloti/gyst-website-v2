import React, { useEffect, useRef, useState } from 'react';
import { Clock, FileText, BarChart3 } from 'lucide-react';
import { CalculationResult } from './types';
import { formatCurrency } from './calculations';
import { ACCENT_HEX } from './constants';

interface ResultViewProps {
  result: CalculationResult;
}

const ANIMATION_MS = 1200;

function useCountUp(target: number, durationMs: number): number {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = value;
    startRef.current = null;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromRef.current + (target - fromRef.current) * eased);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export const ResultView: React.FC<ResultViewProps> = ({ result }) => {
  const animated = useCountUp(result.totalMonthlyLeak, ANIMATION_MS);
  const sectionRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);

  // Fire calculator_completed GA4 event when the section first becomes visible.
  useEffect(() => {
    if (firedRef.current || !sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            if (
              typeof window !== 'undefined' &&
              typeof (window as any).gtag === 'function'
            ) {
              (window as any).gtag('event', 'calculator_completed', {
                event_category: 'engagement',
                event_label: 'hvac_calculator',
                value: result.totalMonthlyLeak,
              });
            }
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // intentionally empty deps — fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = [
    {
      icon: <Clock size={20} />,
      label: 'After-hours leads going to voicemail',
      value: result.afterHoursLeak,
    },
    {
      icon: <FileText size={20} />,
      label: 'Dead quotes never followed up',
      value: result.deadQuoteLeak,
    },
    {
      icon: <BarChart3 size={20} />,
      label: 'Ad spend going to untracked campaigns',
      value: result.adTrackingLeak,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-3xl mx-auto px-5 py-12 md:py-20 border-t border-white/5"
    >
      <p className="text-neutral-400 text-sm md:text-base text-center mb-3 font-light">
        Your business is losing approximately
      </p>
      <h2
        className="text-center font-bold tracking-tighter mb-8 leading-none"
        style={{
          color: ACCENT_HEX,
          fontVariantNumeric: 'tabular-nums',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
        }}
      >
        {formatCurrency(animated)}
      </h2>
      <p className="text-center text-neutral-300 text-base md:text-lg mb-10">
        per month.
      </p>

      <p className="text-neutral-400 text-sm md:text-base text-center mb-6 font-light">
        Here's where that number is coming from.
      </p>

      <div className="space-y-3 mb-8">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 bg-[#202124] border border-white/10 rounded-xl p-4 md:p-5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${ACCENT_HEX}15`,
                  color: ACCENT_HEX,
                }}
              >
                {row.icon}
              </span>
              <span className="text-white text-sm md:text-base">
                {row.label}
              </span>
            </div>
            <span
              className="text-white font-semibold text-base md:text-lg tabular-nums whitespace-nowrap"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {formatCurrency(row.value)}
              <span className="text-neutral-500 text-xs ml-1">/ month</span>
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#202124] border border-white/5 rounded-xl p-5 text-neutral-400 text-xs md:text-sm italic leading-relaxed">
        "This is a calculator estimate based on industry benchmarks and your
        inputs. Real number will vary. We'll get to the actual number on the
        call. But this is the floor — it's not lower than this."
      </div>
    </section>
  );
};
