import React from 'react';
import { Clock, FileText, BarChart3 } from 'lucide-react';
import { CalculatorPreviewSurface } from '../components/surfaces/CalculatorPreviewSurface';
import { ACCENT_HEX } from './constants';
import './styles.css';

/*
 * Page 1 — the squeeze. Cold Meta traffic lands here. One promise, one action:
 * start the calculator (→ /find-leaks). Three viewport heights max, no nav.
 * Copy is the linted funnel doc (ads/funnels/hvac-lead-engine/v2.md, Page 1).
 */
const CALC_URL = '/find-leaks';

const fireStartClick = () => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'start_calculator_clicked', {
      event_category: 'engagement',
      event_label: 'hvac_squeeze',
    });
  }
};

const StartButton: React.FC = () => (
  <a
    href={CALC_URL}
    onClick={fireStartClick}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90"
    style={{ backgroundColor: ACCENT_HEX, color: '#fff' }}
  >
    Start the calculator &rarr;
  </a>
);

const LEAKS = [
  {
    icon: <Clock size={20} />,
    title: 'After-hours leads.',
    body: 'Forty percent of homeowner emergencies happen on nights and weekends. The calculator estimates how many of yours go to voicemail.',
  },
  {
    icon: <FileText size={20} />,
    title: 'Dead quotes in your CRM.',
    body: 'Hundreds of old quotes from people who got a price six months ago and never went forward. The calculator estimates the dollar value.',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Ad spend you can’t trace.',
    body: 'Clicks are not booked jobs. The calculator estimates how much of your ad budget is going to ad sets that don’t actually produce revenue.',
  },
];

const SqueezePage: React.FC = () => (
  <div className="min-h-screen w-full bg-[#050505] text-neutral-200 overflow-x-hidden">
    <header className="w-full px-5 py-4">
      <span className="inline-flex items-center gap-2 font-bold tracking-tight text-white">
        <span style={{ color: ACCENT_HEX }}>GYST</span>
      </span>
    </header>

    <main className="flex flex-col w-full">
      {/* §1 — HERO */}
      <section className="w-full max-w-6xl mx-auto px-5 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="text-white font-bold tracking-tight leading-[1.05] mb-5 text-3xl md:text-5xl">
              Find out exactly how many leads your HVAC business is losing this month.
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl mb-8 leading-relaxed">
              Four questions. Four minutes. A real number in dollars by the time you&rsquo;re done.
            </p>
            <StartButton />
            <p className="text-neutral-500 text-xs md:text-sm mt-4">
              No email required to see the result. 4 minutes. Yours to download.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CalculatorPreviewSurface />
          </div>
        </div>
      </section>

      {/* §2 — THE THREE LEAKS */}
      <section className="w-full max-w-5xl mx-auto px-5 py-12 md:py-16 border-t border-white/5">
        <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl leading-tight mb-8 text-center">
          Most HVAC operators are losing leads in three places. The calculator finds yours.
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {LEAKS.map((leak) => (
            <div key={leak.title} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 md:p-6">
              <span
                className="flex w-10 h-10 rounded-lg items-center justify-center mb-4"
                style={{ backgroundColor: `${ACCENT_HEX}15`, color: ACCENT_HEX }}
              >
                {leak.icon}
              </span>
              <p className="text-white font-semibold mb-2">{leak.title}</p>
              <p className="text-neutral-400 text-sm leading-relaxed">{leak.body}</p>
            </div>
          ))}
        </div>
        <p className="text-neutral-500 text-xs md:text-sm text-center mt-6">
          The calculator uses your inputs and industry benchmarks. Sources cited. Math shown. No
          black box.
        </p>
      </section>

      {/* §3 — SECOND CTA */}
      <section className="w-full max-w-3xl mx-auto px-5 py-12 md:py-20 border-t border-white/5 text-center">
        <h2 className="text-white font-bold tracking-tight text-2xl md:text-4xl mb-8">
          Four questions. Four minutes. Your number.
        </h2>
        <StartButton />
      </section>
    </main>

    <footer className="w-full px-5 py-6 border-t border-white/5 text-center text-neutral-600 text-xs">
      <a href="#" className="hover:text-neutral-400">Privacy</a> ·{' '}
      <a href="#" className="hover:text-neutral-400">Terms</a> · © GYST AI 2026
    </footer>
  </div>
);

export default SqueezePage;
