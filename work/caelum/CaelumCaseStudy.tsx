import React from 'react';
import { WorkerRoom } from '../../rooms/WorkerRoom';
import { CAELUM_ROOM } from '../../rooms/caelum';
import { BookButton, CaseLayout, Eyebrow, H2, Stats } from '../CaseLayout';

const NUMBERS = [
    ['90 days', 'job-change window it watches', 'new job, new gaps in cover'],
    ['7 / 14', 'day follow-up rhythm', 'nobody forgotten, nobody spammed'],
    ['15+', 'carousels generated', 'English and Taglish'],
    ['1 hour', 'a day to run it', 'one person, one console'],
];

const BUILT = [
    ['Life-event lead finder', 'Spots professionals who just changed jobs, the moment their cover is most likely to have a gap.'],
    ['Personal openers', 'Claude reads each profile and writes a first line about the new role. A person decides what gets sent.'],
    ['Content engine', 'Carousels on the money questions people actually ask, checked by a voice filter before anyone sees them.'],
    ['Two-step booking page', 'Insurance or investment? One question routes each visitor to the right calendar.'],
    ['A console for one person', 'Today’s openers, today’s post, the scoreboard. Built so the prospector runs the day in about an hour.'],
    ['Costs and privacy, first', 'A per-job cost ledger, and the Data Privacy Act paperwork drafted before the first profile was ever scraped.'],
];

export const CaelumCaseStudy: React.FC = () => (
    <CaseLayout slug="caelum" title="Caelum case study | GYST" nav={[['#room', 'The room']]}>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16">
            <Eyebrow>Case study 02 · Caelum Financial Solutions · Philippines</Eyebrow>
            <h1 className="font-anton uppercase text-[44px] sm:text-[64px] md:text-[84px] leading-[0.95] tracking-[0.005em] mt-5 max-w-5xl">
                I built an insurance agency&rsquo;s lead engine. They gave me a seat at the table.
            </h1>
            <p className="text-[18px] md:text-[20px] text-paper/80 leading-relaxed mt-7 max-w-3xl">
                Caelum sells insurance and financial planning. Prospecting was one person with one hour a day. I built the engine that finds people at the moment they need cover, writes the first message, and keeps the content coming.
                It worked well enough that the agency brought me into its leadership.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-9">
                <a href="#room" className="inline-flex items-center gap-2 bg-paper text-charcoal font-semibold text-[15px] px-6 py-3.5 no-underline hover:bg-white">
                    Walk the room <span aria-hidden="true">&darr;</span>
                </a>
            </div>
            <Stats items={NUMBERS} note="Carousel count measured from the content log. The other figures are how the engine is set up." />
        </section>

        <section id="room" className="border-t border-paper/10 scroll-mt-16">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                <Eyebrow>The room</Eyebrow>
                <H2 className="max-w-3xl">Ten agents. One person runs the day.</H2>
                <p className="text-paper/75 text-[17px] leading-relaxed mt-5 max-w-3xl">
                    Think of the console as the prospector&rsquo;s morning briefing. The agents work overnight. By the time the prospector sits down, the leads are found, the openers are drafted and the post is ready. The prospector decides what goes out.
                </p>
                <div className="mt-10">
                    <WorkerRoom room={CAELUM_ROOM} />
                </div>
            </div>
        </section>

        <section className="border-t border-paper/10">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                <Eyebrow>What I built</Eyebrow>
                <H2>Six parts. Same harness as Shang.</H2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-10">
                    {BUILT.map(([t, d]) => (
                        <div key={t} className="bg-charcoal p-6">
                            <div className="text-[19px] font-semibold">{t}</div>
                            <p className="text-paper/70 text-[15px] leading-relaxed mt-2">{d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="border-t border-paper/10">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 items-start">
                <div>
                    <Eyebrow>The lesson</Eyebrow>
                    <H2>The machine was never the bottleneck.</H2>
                </div>
                <div>
                    <blockquote className="text-[24px] md:text-[28px] leading-snug text-paper border-l-2 border-paper pl-6">
                        &ldquo;My AI stopped making content in June and I thought it broke. It hadn&rsquo;t. It was waiting for me to post.&rdquo;
                    </blockquote>
                    <p className="text-paper/75 text-[17px] leading-relaxed mt-6">
                        The engine made carousels faster than anyone posted them. So the fix wasn&rsquo;t more AI. It was a console that puts the post in front of the right person at the right time, and a scoreboard that shows when it didn&rsquo;t go out.
                    </p>
                </div>
            </div>
        </section>

        <section className="border-t border-paper/10">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
                <h2 className="font-anton uppercase text-[40px] md:text-[64px] leading-[0.95] tracking-[0.005em] max-w-4xl mx-auto">One person. A whole team&rsquo;s output.</h2>
                <p className="text-paper/75 text-[18px] leading-relaxed mt-6 max-w-2xl mx-auto">
                    If your best person spends their day on research and first drafts, I build the room that does it overnight. Thirty minutes, and you&rsquo;ll leave with a map of your own floor.
                </p>
                <div className="mt-9">
                    <BookButton location="caelum_footer_cta">Book a 30-minute call</BookButton>
                </div>
            </div>
        </section>
    </CaseLayout>
);

export default CaelumCaseStudy;
