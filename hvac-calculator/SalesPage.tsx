import React from 'react';
import { MissionControlSurface } from '../components/surfaces/MissionControlSurface';
import { ACCENT_HEX } from './constants';

/*
 * Page 2 sales page — everything below the calculator result on /find-leaks.
 * Copy is the linted funnel doc (ads/funnels/hvac-lead-engine/v2.md, §2–§10).
 * Deep-orange #D45D00 system to match the calculator above. The §7 showroom
 * embeds the amber ATELIER MissionControlSurface (intentional palette break).
 *
 * CTAs point at the site's own calendar page (public/calendar-page.html), the same
 * GoHighLevel booking page the main site's nav/footer link to.
 */
const BOOKING_URL = '/calendar-page.html';

const fireBookClick = () => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'book_call_clicked', {
      event_category: 'conversion',
      event_label: 'hvac_funnel',
    });
  }
};

const Section: React.FC<{ children: React.ReactNode; wide?: boolean; className?: string }> = ({
  children,
  wide,
  className,
}) => (
  <section
    className={`w-full ${wide ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-5 py-12 md:py-20 border-t border-white/5 ${className ?? ''}`}
  >
    {children}
  </section>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-white font-bold tracking-tight text-2xl md:text-4xl leading-tight mb-6">
    {children}
  </h2>
);

const BookButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a
    href={BOOKING_URL}
    onClick={fireBookClick}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90"
    style={{ backgroundColor: ACCENT_HEX, color: '#fff' }}
  >
    {children}
  </a>
);

const MECHANISM = [
  {
    n: '1',
    title: 'The Voice Setter (Vapi or Retell).',
    body: 'A voice agent that answers calls 24/7 in your voice. Books appointments, qualifies leads, reactivates dead quotes. Voice quality is good enough that homeowners don’t realize they’re talking to AI.',
  },
  {
    n: '2',
    title: 'The Dead Quote Reactivation Engine.',
    body: 'Wakes up every Tuesday. Works through old CRM quotes via SMS, voice, and email in a sequence written in your voice. The first run usually surfaces revenue that’s been sitting there for months.',
  },
  {
    n: '3',
    title: 'The Ad Performance Tracker.',
    body: 'Ties ad spend to booked jobs, not clicks. Single weekly page every Monday. Scale the winners. Kill the losers.',
  },
  {
    n: '4',
    title: 'The Quote-Builder Lead Magnet.',
    body: 'A 4-question interactive tool on your website that captures leads pre-qualified. Same idea as the calculator you just ran, configured for your homeowners.',
  },
  {
    n: '5',
    title: 'The Compounding Skills Layer.',
    body: 'Every problem the system solves gets written down. Documented. Transferable. Readable by whoever’s at the keyboard tomorrow. After 60 days you have 20-30 skills custom to your business, and none of them need you in the room to run. Month two costs less to operate than month one.',
  },
];

const OFFER_STACK = [
  { name: 'The Interactive Quote-Builder Lead Magnet', desc: 'A quote builder on your website that captures leads pre-qualified.', value: '$2,500' },
  { name: 'The 24/7 Voice Setter (Vapi or Retell)', desc: 'Voice agent that books appointments and reactivates dead quotes 24/7.', value: '$5,000' },
  { name: 'The Video Cold-Email Pipeline', desc: 'Per-prospect personalized video cold-email at scale.', value: '$3,500' },
  { name: 'The Done-For-You 30-Day Install', desc: 'We build, deploy, and onboard. Day 14 it’s running.', value: '$4,000' },
  { name: 'The Compounding Skills Layer', desc: 'System writes its own skills. Month two costs less than month one.', value: '$3,000' },
];

const BONUSES = [
  { name: 'Voice Vault (lifetime).', desc: 'Your business’s voice file, lint stack, and banned-word list, maintained for life.', value: '$1,500' },
  { name: 'Skill-Drop Subscription (year 1 free).', desc: 'Every new HVAC-relevant skill we install in our workspace drops into yours within 7 days.', value: '$2,400' },
  { name: 'Quarterly Architecture Review.', desc: 'Every 90 days Rob personally reviews your workspace. 90 minutes, on a calendar, not a maybe.', value: '$2,000' },
  { name: 'Founder DM Line (90 days).', desc: 'Direct Telegram line to Rob for 90 days post-install. Up to 30 messages/week.', value: '$3,000' },
];

const GUARANTEES = [
  {
    title: '1. The 14-Day Unconditional Refund.',
    body: 'Install fee fully refundable in the first 14 days. No questions. No "show us your effort." If the system isn’t running on your hardware on day 14, you get your money back.',
  },
  {
    title: '2. The 25-Booked-Appointment Performance Guarantee.',
    body: 'If the system doesn’t book 25 new appointments in the first 90 days, the monthly run-retainer is waived until it does. We keep operating it free until the result lands.',
  },
  {
    title: '3. The Asset-Handoff Anti-Guarantee.',
    body: 'Past day 14, the install fee is non-refundable, because by then the system is on your hardware. You own the files. You can read every line. Refunding the fee would mean asking you to delete an asset you own, and you won’t because it’s running. If results don’t land, Guarantee 2 covers you.',
  },
];

const FAQ = [
  {
    q: 'We already have a marketing agency. Do we need this?',
    a: 'A marketing agency handles the front of the funnel: getting leads to your door. GYST handles the back, what happens after the lead comes in. Most of our installs run alongside an existing agency. Often the agency’s leads suddenly convert better because the back end stopped dropping them.',
  },
  {
    q: 'I tried AI before. It was a disaster.',
    a: 'What you tried was probably a chatbot or a generic voice agent that couldn’t hold a real conversation. The voice setter in this install is Vapi or Retell, trained on your business, not on a model’s defaults. The difference shows up on the first call. We demo it on the follow-up.',
  },
  {
    q: 'How is this different from ServiceTitan or Housecall Pro?',
    a: 'ServiceTitan and Housecall Pro are CRM and field-service software. They store data, dispatch techs, run invoicing. They don’t make calls, follow up on dead quotes, or tell you which ads are working. GYST sits on top of them. We integrate with the CRM you already have.',
  },
  {
    q: 'We’re too small for this.',
    a: 'The system was built for 3–15 tech operations. Below 3 techs, you usually have a sales problem, not an ops problem. We’ll tell you that on the call rather than sell you something that won’t fit.',
  },
  {
    q: 'What’s the actual price?',
    a: 'Calibrated to your operation size. We don’t quote without seeing your inputs. Quoting blind sets up a bad relationship. What we’ll commit to before any number: if the system doesn’t book 25 new appointments in 90 days, we keep operating it free until it does.',
  },
  {
    q: 'Why hasn’t another HVAC operator done this yet?',
    a: 'Some have. Operators with in-house dev teams have built versions. What we do is package the same system as an install you don’t have to build. Most operators don’t have a dev team. We are the dev team for the 60 days the install takes.',
  },
];

export const SalesPage: React.FC = () => (
  <>
    {/* §2 — THE PIVOT */}
    <Section>
      <H2>Here&rsquo;s what you do about it.</H2>
      <blockquote
        className="text-neutral-200 italic text-lg md:text-xl leading-relaxed pl-5 mb-8"
        style={{ borderLeft: `3px solid ${ACCENT_HEX}` }}
      >
        &ldquo;None of it was a system. It was just me knowing what needed to happen and doing it.
        Nothing was documented, nothing was transferable. Everything depended on me being present at
        every step.&rdquo;
      </blockquote>
      <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-5">
        You just put a number on the leak. Plugging it is the harder part, and right now it all runs
        through you. Every callback, every quote, every follow-up waits for you to be there. Most
        HVAC operators have never put a dollar on that. The ones who have usually hired three people,
        switched CRMs, and trusted an agency that promised results and disappeared in 60 days.
      </p>
      <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
        We built a system for this. It installs on your machine in 14 days. It runs alongside your
        CRM, not instead of it. Nothing depends on you being present at every step. And if it
        doesn&rsquo;t book you 25 new appointments in the first 90 days, we keep operating it free
        until it does.
      </p>
    </Section>

    {/* §3 — THE MECHANISM */}
    <Section>
      <H2>
        The 90-Day HVAC Lead Engine. Five parts. Installed on your hardware. Yours to keep.
      </H2>
      <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8">
        This isn&rsquo;t a chatbot, a SaaS subscription, or a marketing agency. It&rsquo;s a system
        that gets installed on your machine. You own every file. You can read every line. If we
        disappeared tomorrow, the system would keep running.
      </p>
      <div className="space-y-3">
        {MECHANISM.map((m) => (
          <div key={m.n} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 md:p-6 flex gap-4">
            <span
              className="flex-shrink-0 font-mono text-lg font-semibold"
              style={{ color: ACCENT_HEX }}
            >
              {m.n}
            </span>
            <div>
              <p className="text-white font-semibold mb-1">{m.title}</p>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{m.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-neutral-400 text-sm md:text-base mt-6">
        These five things, installed and running in 14 days. Read every file. Modify anything.
        Yours to keep.
      </p>
    </Section>

    {/* §4 — THE OFFER STACK */}
    <Section>
      <H2>Here&rsquo;s what&rsquo;s included.</H2>
      <div className="space-y-3">
        {OFFER_STACK.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-4 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 md:p-5"
          >
            <div className="min-w-0">
              <p className="text-white font-medium text-sm md:text-base">{row.name}</p>
              <p className="text-neutral-500 text-xs md:text-sm">{row.desc}</p>
            </div>
            <span
              className="font-semibold text-sm md:text-base whitespace-nowrap tabular-nums"
              style={{ color: ACCENT_HEX, fontVariantNumeric: 'tabular-nums' }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-white font-bold text-xl md:text-2xl mt-8">
        Total stacked value: <span style={{ color: ACCENT_HEX }}>$18,000</span>
      </p>
    </Section>

    {/* §5 — THE BONUSES */}
    <Section>
      <H2>Plus four bonuses, included.</H2>
      <div className="space-y-3">
        {BONUSES.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-4 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 md:p-5"
          >
            <div className="min-w-0">
              <p className="text-white font-medium text-sm md:text-base">{row.name}</p>
              <p className="text-neutral-500 text-xs md:text-sm">{row.desc}</p>
            </div>
            <span
              className="font-semibold text-sm md:text-base whitespace-nowrap tabular-nums"
              style={{ color: ACCENT_HEX, fontVariantNumeric: 'tabular-nums' }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-neutral-300 text-lg mt-8">Bonus value: $8,900</p>
      <p className="text-center text-white font-bold text-2xl md:text-3xl mt-2">
        Total stacked value: <span style={{ color: ACCENT_HEX }}>$26,900</span>
      </p>
    </Section>

    {/* §6 — THE GUARANTEES */}
    <Section>
      <H2>Three guarantees. Stacked. Not one.</H2>
      <div className="space-y-3 mb-8">
        {GUARANTEES.map((g) => (
          <div key={g.title} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 md:p-6">
            <p className="text-white font-semibold mb-2">{g.title}</p>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{g.body}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 text-neutral-300 text-sm md:text-base">
        <ul className="space-y-1.5">
          <li>Days 1&ndash;14: Full refund, no questions.</li>
          <li>Days 15&ndash;90: Performance-based &mdash; we work free until the result lands.</li>
          <li>Past day 14: Install fee non-refundable because the system is now yours.</li>
        </ul>
      </div>
    </Section>

    {/* §7 — THE SHOWROOM (amber ATELIER surface, intentional palette break) */}
    <Section wide>
      <MissionControlSurface />
      <div className="grid sm:grid-cols-3 gap-4 mt-12">
        {[
          { t: 'Public Mission Control demo on the follow-up call.', d: 'Live screen-share. No demo environment.' },
          { t: 'Public content engine output.', d: 'Scroll @robtheops on Instagram or LinkedIn. That’s the engine running, publicly, dated.' },
          { t: 'Open skills catalog.', d: 'The skills installed in your business are published publicly before you buy. No black box.' },
        ].map((b) => (
          <div key={b.t} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
            <p className="text-white font-medium text-sm mb-1">{b.t}</p>
            <p className="text-neutral-500 text-xs leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* §8 — THE CALL CTA */}
    <Section className="text-center">
      <H2>Book a 30-minute call.</H2>
      <div className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto space-y-3 text-left">
        <p>
          <span className="text-white font-semibold">1. We screen-share the live Mission Control demo.</span>{' '}
          You see the actual system running.
        </p>
        <p>
          <span className="text-white font-semibold">2. We walk through your calculator result together.</span>{' '}
          Real number, not the calculator estimate.
        </p>
        <p>
          <span className="text-white font-semibold">3. We talk about whether this is a fit.</span>{' '}
          If it&rsquo;s not, we&rsquo;ll tell you. If it is, we book the install.
        </p>
      </div>
      <p className="text-neutral-400 text-sm md:text-base mb-8 max-w-2xl mx-auto">
        No pitch on the call. No surprise upsell. If you&rsquo;re not the right fit, we&rsquo;ll say
        so and recommend what is.
      </p>
      <BookButton>Book your 30-minute call &rarr;</BookButton>
      <p className="text-neutral-500 text-xs mt-4">
        30 minutes. Calendar booking. No prep required. Just bring your calculator result.
      </p>
    </Section>

    {/* §9 — FAQ */}
    <Section>
      <H2>Questions other HVAC operators have asked.</H2>
      <div className="space-y-4">
        {FAQ.map((item) => (
          <div key={item.q} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 md:p-6">
            <p className="text-white font-semibold mb-2">{item.q}</p>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* §10 — FINAL CTA */}
    <Section className="text-center">
      <H2>Ready when you are.</H2>
      <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Your number is on this page. The system that plugs it is everything below your number. The
        call shows you it&rsquo;s real.
      </p>
      <BookButton>Book your 30-minute call &rarr;</BookButton>
    </Section>
  </>
);
