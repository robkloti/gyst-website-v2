import React, { useEffect } from 'react';
import { Lockup } from '../../components/ui/Lockup';
import { WorkerRoom } from '../../rooms/WorkerRoom';
import { SHANG_ROOM } from '../../rooms/shang';
import { ShangDemo } from './ShangDemo';
import { track, trackBookClick } from '../../lib/track';

const BOOK_URL = '/calendar-page.html';

const RULES = [
    ['01', 'No prices', 'Not in a caption, not on a slide, not implied.'],
    ['02', 'No AI voiceover', 'Every reel runs on approved music or silence.'],
    ['03', 'No models', 'No faces, no hands, no people in generated imagery.'],
    ['04', 'Logo never animated', 'The mark sits still, every time.'],
    ['05', 'One project per post', 'Haraya or Shang Summit. Never both.'],
];

const MEASURED = [
    ['899', 'posts collected from 12 sources', 'in about 7 minutes'],
    ['14 min', 'topic to finished carousel', 'compliance check included'],
    ['$3.64', 'compute per carousel', 'at list price'],
    ['18 / 27', 'build tickets shipped', 'the rest are go-live work'],
];

const BUILT = [
    ['Content engine', 'Collects what’s working, picks topics, writes scripts and carousels in Shang’s voice, then checks every rule before a person sees it.'],
    ['Property video skill', 'Turns renders and brochures into reels: a realism pass, then clips, then an edit. Or re-cuts footage Marketing already approved.'],
    ['Shang console', 'One sign-in for the team. Marketing gets a review queue. Sellers get scripts, a call list and a "create a video" button.'],
    ['One-sitting approval', 'The whole month lands on one page. Marketing approves it in one sitting instead of post by post in a chat thread.'],
    ['Two design skins', 'The console wears Shang’s own luxury skin. Same components underneath as every GYST dashboard.'],
    ['Seller pages', 'A personal two-step enquiry page per seller. Specced and in build.'],
];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{children}</div>
);

const BookButton: React.FC<{ location: string; children: React.ReactNode }> = ({ location, children }) => (
    <a
        href={BOOK_URL}
        onClick={() => trackBookClick(location)}
        className="inline-flex items-center gap-2 bg-hazard text-charcoal font-archivo font-semibold text-[15px] px-6 py-3.5 no-underline hover:brightness-105"
    >
        {children} <span aria-hidden="true">&rarr;</span>
    </a>
);

export const ShangCaseStudy: React.FC = () => {
    useEffect(() => {
        document.title = 'Shang Properties case study | GYST';
        track('case_study_view', { case_study: 'shang' });
    }, []);

    return (
        <div className="min-h-screen w-full bg-charcoal text-paper font-archivo overflow-x-hidden selection:bg-hazard/30">
            <header className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur border-b border-paper/10">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
                    <Lockup size={26} />
                    <nav className="flex items-center gap-5 text-[14px]">
                        <a href="#room" className="hidden sm:inline text-steel hover:text-paper no-underline">The room</a>
                        <a href="#demo" className="hidden sm:inline text-steel hover:text-paper no-underline">Try it</a>
                        <a href={BOOK_URL} onClick={() => trackBookClick('shang_nav')} className="text-paper border border-paper/30 px-3 py-1.5 no-underline hover:bg-paper/10">
                            Book a call
                        </a>
                    </nav>
                </div>
            </header>

            <main>
                <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16">
                    <Eyebrow>Case study 01 · Shang Properties · Manila</Eyebrow>
                    <h1 className="font-anton uppercase text-[44px] sm:text-[64px] md:text-[84px] leading-[0.95] tracking-[0.005em] mt-5 max-w-5xl">
                        A luxury developer&rsquo;s content team, run by agents that know the rules.
                    </h1>
                    <p className="text-[18px] md:text-[20px] text-paper/80 leading-relaxed mt-7 max-w-3xl">
                        Shang Properties builds luxury homes in Manila. Every post its sellers publish has to clear Corporate Marketing. So approvals were the bottleneck, not ideas.
                        I built the engine that writes in Shang&rsquo;s voice, checks every rule before a human sees it, and puts the whole month in front of Marketing in one sitting.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-9">
                        <a href="#demo" className="inline-flex items-center gap-2 bg-paper text-charcoal font-semibold text-[15px] px-6 py-3.5 no-underline hover:bg-white">
                            Take a seat in the demo <span aria-hidden="true">&darr;</span>
                        </a>
                        <a href="#room" className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">Walk the floor first</a>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 border border-paper/10 mt-14">
                        {MEASURED.map(([n, l, s]) => (
                            <div key={l} className="bg-charcoal p-5 md:p-6">
                                <div className="font-archivo font-semibold text-[34px] md:text-[42px] leading-none tracking-tight">{n}</div>
                                <div className="text-paper/85 mt-3 text-[15px] leading-snug">{l}</div>
                                <div className="text-steel text-[13px] mt-1">{s}</div>
                            </div>
                        ))}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel mt-3">
                        Measured on one internal test run, October 2026. Status: built and tested, going live with the selling team next.
                    </p>
                </section>

                <section className="border-t border-paper/10">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10">
                        <div>
                            <Eyebrow>The constraint</Eyebrow>
                            <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.08] tracking-tight mt-4">Five rules. Break one and the post never ships.</h2>
                            <p className="text-paper/75 text-[17px] leading-relaxed mt-5">
                                Most AI content tools would break these on day one. They write a price because prices convert. They add a voiceover because reels need sound.
                            </p>
                            <p className="text-paper/75 text-[17px] leading-relaxed mt-4">
                                Think of the rules file as the house style a magazine editor keeps pinned above the desk. Every agent reads it. One agent does nothing but enforce it.
                            </p>
                        </div>
                        <ol className="grid gap-px bg-paper/10 border border-paper/10 self-start">
                            {RULES.map(([n, t, d]) => (
                                <li key={n} className="bg-charcoal grid grid-cols-[56px_minmax(0,1fr)] items-baseline gap-4 px-5 py-4">
                                    <span className="font-mono text-[12px] text-steel">RULE {n}</span>
                                    <div>
                                        <div className="text-[18px] font-semibold">{t}</div>
                                        <div className="text-steel text-[15px]">{d}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section id="room" className="border-t border-paper/10 scroll-mt-16">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                        <Eyebrow>The room</Eyebrow>
                        <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.08] tracking-tight mt-4 max-w-3xl">Thirteen desks. Two of them are people.</h2>
                        <p className="text-paper/75 text-[17px] leading-relaxed mt-5 max-w-3xl">
                            Every agent has one job and hands its work to the next desk. Marketing and the sellers only step in where judgment matters. Watch a carousel go from a scraped post to an approved slide, then click any desk to see what it does.
                        </p>
                        <div className="mt-10">
                            <WorkerRoom room={SHANG_ROOM} />
                        </div>
                    </div>
                </section>

                <section id="demo" className="border-t border-paper/10 scroll-mt-16">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                        <Eyebrow>Try it</Eyebrow>
                        <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.08] tracking-tight mt-4 max-w-3xl">Take a seat at Shang.</h2>
                        <p className="text-paper/75 text-[17px] leading-relaxed mt-5 max-w-3xl">
                            This is the console the team signs into, in Shang&rsquo;s own skin. Pick Marketing or Seller and click through a day. The slides are real engine output. The people and numbers are sample data.
                        </p>
                        <div className="mt-10">
                            <ShangDemo />
                        </div>
                    </div>
                </section>

                <section className="border-t border-paper/10">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                        <Eyebrow>What I built</Eyebrow>
                        <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.08] tracking-tight mt-4">Six parts. One harness.</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 border border-paper/10 mt-10">
                            {BUILT.map(([t, d]) => (
                                <div key={t} className="bg-charcoal p-6">
                                    <div className="text-[19px] font-semibold">{t}</div>
                                    <p className="text-paper/70 text-[15px] leading-relaxed mt-2">{d}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-steel text-[15px] mt-6 max-w-3xl">
                            Underneath it&rsquo;s the same pattern I install for every team: Claude Code as the harness, a routing file that sends each job to the right room, a voice file, a rules file, and skills that do the work.
                        </p>
                    </div>
                </section>

                <section className="border-t border-paper/10">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
                        <h2 className="font-anton uppercase text-[40px] md:text-[64px] leading-[0.95] tracking-[0.005em] max-w-4xl mx-auto">Your team has rules too.</h2>
                        <p className="text-paper/75 text-[18px] leading-relaxed mt-6 max-w-2xl mx-auto">
                            Brand rules, legal rules, the things your best person just knows. I build the room around them. Thirty minutes, and you&rsquo;ll leave with a map of your own floor.
                        </p>
                        <div className="mt-9">
                            <BookButton location="shang_footer_cta">Book a 30-minute call</BookButton>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-paper/10">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-[13px] text-steel">
                    <Lockup size={20} />
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em]">rob@gyst-ai.com · Built by @robtheops</div>
                </div>
            </footer>
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }} />
        </div>
    );
};

export default ShangCaseStudy;
