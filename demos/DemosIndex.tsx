import React from 'react';
import { track } from '../lib/track';
import { BookButton, CaseLayout, Eyebrow } from '../work/CaseLayout';

const DEMOS = [
    { slug: 'hvac', tag: 'Home services', name: 'Copperjack Dispatch', line: 'A heating and air shop’s dispatch board. Today’s jobs on a map, five trucks, the calls the AI front desk took overnight and the old quotes it is chasing.', look: 'Dark console, three columns' },
    { slug: 'roofing', tag: 'Roofing', name: 'Slatewing Storm Desk', line: 'Three days after a hail storm. Leads coming in, insurance claims moving across a board, crews on roofs and materials on order.', look: 'Claims board with an icon rail' },
    { slug: 'law', tag: 'Law firm', name: 'Chambers', line: 'A litigation firm’s morning desk. Enquiries scored by the intake agent, drafts waiting for a partner, deadlines and billable hours.', look: 'Serif, split reading pane' },
    { slug: 'medspa', tag: 'Med spa', name: 'Oriel House Concierge', line: 'An aesthetics clinic’s day. Three providers’ appointments, the rebooking agent, lapsed clients to win back, revenue and reviews.', look: 'Soft sidebar app, day calendar' },
    { slug: 'agency', tag: 'Marketing agency', name: 'The Desk', line: 'A content agency laid out like a front page. Six accounts, the week’s calendar, ad spend against return and the content engine’s queue.', look: 'Magazine front page' },
];

const REAL = [
    ['/work/shang', 'Shang case study and demo', 'Real estate. Thirteen desks, two of them people.'],
    ['/work/caelum', 'Caelum', 'Insurance. Leads found and openers drafted before the day starts.'],
    ['/hq', 'GYST HQ', 'How GYST runs itself, on the same kind of console.'],
    ['/find-leaks', 'HVAC lead calculator', 'Four questions and a dollar figure for the leads a shop is losing.'],
];

const DemosIndex: React.FC = () => (
    <CaseLayout slug="demos" title="Demo dashboards | GYST" nav={[['#demos', 'Demos'], ['#real', 'Real builds']]}>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-hazard">Demo dashboards</div>
            <h1 className="font-anton uppercase text-[44px] sm:text-[64px] md:text-[84px] leading-[0.95] tracking-[0.005em] mt-5 max-w-5xl">Five businesses. Five operating systems.</h1>
            <p className="text-[18px] md:text-[20px] text-paper/80 leading-relaxed mt-7 max-w-3xl">
                GYST packages a business into an AI operating system, then builds the software on top. Here is what that software can look like for five different kinds of business. Every company is made up and every number is sample data. Click around.
            </p>
        </section>

        <section id="demos" className="max-w-6xl mx-auto px-4 md:px-6 pb-20 scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {DEMOS.map((d, i) => (
                    <a key={d.slug} href={`/demos/${d.slug}`} onClick={() => track('work_card_click', { card: `demo-${d.slug}` })} className={`group flex flex-col no-underline bg-[#202124] border border-paper/20 hover:border-paper/50 transition-colors ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${i === 4 ? 'md:col-span-2' : ''}`}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#111] border-b border-paper/10">
                            <img src={`/demo-shots/${d.slug}.jpg`} alt={`${d.name} dashboard`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-left-top" />
                        </div>
                        <div className="p-5 flex flex-col gap-2 flex-1">
                            <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                                <span className="whitespace-nowrap">{String(i + 1).padStart(2, '0')} &middot; {d.tag}</span>
                                <span className="whitespace-nowrap">{d.look}</span>
                            </div>
                            <h2 className="text-paper text-[22px] font-semibold leading-tight">{d.name}</h2>
                            <p className="text-steel text-[14.5px] leading-relaxed">{d.line}</p>
                            <span className="mt-auto pt-3 text-paper text-[14.5px] font-semibold flex items-center gap-2">
                                Try it <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            </span>
                        </div>
                    </a>
                ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel mt-4">Demos. Sample data. No real companies or people.</p>
        </section>

        <section id="real" className="bg-paper text-charcoal scroll-mt-16">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10">
                <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-dark">Real builds</div>
                    <h2 className="font-anton uppercase text-[40px] md:text-[56px] leading-[0.95] mt-4">Then open the ones that are running.</h2>
                    <p className="text-[17px] text-charcoal/75 leading-relaxed mt-5 max-w-md">The demos show range. These four are real work for real businesses, including our own.</p>
                </div>
                <ul className="border-t border-charcoal/20">
                    {REAL.map(([href, title, line]) => (
                        <li key={href}>
                            <a href={href} onClick={() => track('work_card_click', { card: `demos-real-${href}` })} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 border-b border-charcoal/20 no-underline text-charcoal">
                                <span>
                                    <span className="block text-[20px] font-semibold leading-tight">{title}</span>
                                    <span className="block text-[14.5px] text-charcoal/70 mt-1">{line}</span>
                                </span>
                                <span aria-hidden="true" className="text-[20px] transition-transform group-hover:translate-x-1">&rarr;</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
            <Eyebrow>Your business next</Eyebrow>
            <h2 className="font-anton uppercase text-[40px] md:text-[60px] leading-[0.95] mt-4 max-w-3xl">Want to see yours?</h2>
            <p className="text-[18px] text-paper/80 leading-relaxed mt-5 max-w-2xl">A mapping call is where we write down how your business runs. That map decides what your dashboard shows and which agents sit behind it.</p>
            <div className="mt-8"><BookButton location="demos_index">Book a mapping call</BookButton></div>
        </section>
    </CaseLayout>
);

export default DemosIndex;
