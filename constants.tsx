import { OfferModule, Vertical, WorkCard } from './types';

// Homepage copy. Plain words, short sentences, no prices: every button books a mapping call.

export const BOOK_URL = '/calendar-page.html';
export const BOOK_LABEL = 'Book a mapping call';

export const HERO = {
    line1: 'Get the business',
    line2: 'out of your head.',
    sub: [
        'We write down how your business actually runs - prices, scripts, rules, customers - in a form AI can read. ',
        'That is your operating system.',
        ' Then we build the software on top of it: a lead engine, a front desk, dashboards, and small apps your team uses every day.',
    ],
    caption: 'Client build: the Shang Properties sales console. Shown with permission.',
};

// One object per buyer. The hero, the rooms, the work grid and the offer all read from here.
export const VERTICALS: Vertical[] = [
    {
        key: 'all',
        tab: 'Service business',
        eyebrow: 'AI operating systems for owner-led businesses',
        pack: 'Your prices, scripts, rules and customer history. Whatever is in your head and your group chats today.',
        build: 'A lead engine, a front desk, a console and the small apps your team asks for.',
        modules: ['lead', 'desk', 'content', 'ads', 'console', 'apps'],
    },
    {
        key: 'trades',
        tab: 'Trades / HVAC',
        eyebrow: 'AI operating systems for HVAC and trades shops',
        pack: 'Your price book, service area, dispatch rules, how you quote, and every old quote in the CRM.',
        build: 'A front desk that answers after hours, follow-up on dead quotes, a review chaser, a lead calculator.',
        room: 'hvac',
        proof: 'calculator',
        modules: ['desk', 'lead', 'apps', 'console', 'content', 'ads'],
    },
    {
        key: 'realestate',
        tab: 'Real estate',
        eyebrow: 'AI operating systems for real estate teams',
        pack: 'Your listings and fact sheets, buyer profiles, brand voice and the lines legal will not let you say.',
        build: 'A sales console, script and carousel apps, a review desk, a page for each seller.',
        room: 'shang',
        proof: 'shang-case',
        modules: ['content', 'console', 'apps', 'lead', 'desk', 'ads'],
    },
    {
        key: 'insurance',
        tab: 'Insurance',
        eyebrow: 'AI operating systems for insurance agencies',
        pack: 'Your products, who you prospect, compliance wording and how your advisors open a conversation.',
        build: 'A prospecting desk, opener drafts ready each morning, a carousel maker, a booking page.',
        room: 'caelum',
        proof: 'caelum',
        modules: ['lead', 'content', 'console', 'apps', 'desk', 'ads'],
    },
    {
        key: 'marketing',
        tab: 'Marketing team',
        eyebrow: 'AI operating systems for marketing teams',
        pack: 'Your brand rules, offers, past winners, and the ad accounts and folders you already have.',
        build: 'A content engine, an ads engine, a voice check, a console for approvals.',
        room: 'marketing',
        proof: 'hq',
        modules: ['content', 'ads', 'console', 'lead', 'apps', 'desk'],
    },
    {
        key: 'studio',
        tab: 'Studio',
        eyebrow: 'AI operating systems for studios',
        pack: 'Your class schedule, pay rules, enrolment steps and the plan for the next campaign.',
        build: 'A trial booker, an enrolment chaser, a campaign sequencer, a payout counter.',
        room: 'ggc',
        proof: 'ggc',
        modules: ['desk', 'content', 'apps', 'console', 'lead', 'ads'],
    },
];

export const HOW_TREE: [string, string][] = [
    ['sales/', 'prices, scripts'],
    ['service/', 'how jobs run'],
    ['customers/', 'who buys, who left'],
    ['voice.md', 'how you talk'],
];

// The four harness ideas, one line each.
export const HOW_BRAIN: [string, string][] = [
    ['Route', 'Sends each job to the right room.'],
    ['Remember', 'Keeps what it learned last week.'],
    ['Do', 'Has a written skill for each task.'],
    ['Run', 'Works on a schedule, not on request.'],
];

export const HOW_APPS: [string, string][] = [
    ['Lead engine', 'finds and books'],
    ['Front desk', 'answers and follows up'],
    ['Console', 'shows what ran today'],
    ['Micro apps', 'one screen, one job'],
];

// Order set by Rob, 2026-11-13. Do not reorder.
export const WORK: WorkCard[] = [
    { id: 'shang-console', tag: 'Real estate', kind: 'Console', title: 'Shang Agentic OS console', line: 'The sales team’s home screen: an orb of micro apps, what needs review, this month’s numbers.', cta: 'Watch it run', href: '#hero-console', image: '/hero/shang-console.jpg', span: 'wide' },
    { id: 'shang-case', tag: 'Real estate', kind: 'Case study', title: 'Shang case study and demo', line: 'Thirteen desks, two of them people. Pick a path and watch a carousel get made.', cta: 'Try the demo', href: '/work/shang', image: '/work/home/shang-room.jpg', span: 'narrow' },
    { id: 'hq', tag: 'GYST', kind: 'Console', title: 'GYST HQ', line: 'How GYST runs itself. Mission Control, outbound, content and builds.', cta: 'Open HQ', href: '/hq', image: '/work/home/gyst-hq.jpg', span: 'narrow' },
    { id: 'caelum', tag: 'Insurance', kind: 'Case study', title: 'Caelum', line: 'Ten agents and one prospector. Leads found and openers drafted before the day starts.', cta: 'Read the case study', href: '/work/caelum', image: '/work/home/caelum-room.jpg', span: 'narrow' },
    { id: 'calculator', tag: 'HVAC', kind: 'Micro app', title: 'HVAC lead calculator', line: 'Four questions, four minutes, and a dollar figure for the leads a shop is losing.', cta: 'Try it', href: '/find-leaks', image: '/work/home/find-leaks.jpg', span: 'narrow' },
    { id: 'engine', tag: 'GYST', kind: 'In build', title: 'Pipeline Engine', line: 'All your GTM on one board. Signals in, booked calls out. The full dashboard is in build, so this opens the outbound board in HQ.', cta: 'See the outbound board', href: '/hq?view=outbound', span: 'wide' },
    { id: 'ggc', tag: 'Dance studio', kind: 'Manila', title: 'Good Girls Club', line: 'A studio’s front desk, campaigns and payouts, run from one room.', cta: 'Walk the room', href: '#rooms', image: '/work/home/ggc-room.jpg', span: 'narrow' },
];

// Numbers on the engine card are sample data and are labelled that way on the card.
export const ENGINE_FLOW: { label: string; n: string }[] = [
    { label: 'Signals', n: '212' },
    { label: 'Score', n: '61' },
    { label: 'Tiers', n: '14 / 47' },
    { label: 'Loom', n: '14' },
    { label: 'Email', n: '47' },
    { label: 'Setter', n: '2' },
    { label: 'Booked', n: '1' },
];

export const OFFER_BRAIN = {
    name: 'The Business Brain',
    line: 'Your business, written down once, in files you own. Every module reads it.',
    inside: [
        ['The business map', 'Offers, prices, scripts, rules and customers, one room each.'],
        ['Your voice file', 'Built from recordings of how you really talk.'],
        ['Skills', 'A written playbook for each task. New ones get added as it works.'],
        ['Memory', 'It keeps what it learned. Month two is easier than month one.'],
        ['Talk to it from your phone', 'Voice notes in Telegram become work.'],
        ['You own all of it', 'Plain files in your own accounts. No platform to rent.'],
    ] as [string, string][],
};

export const OFFER_MODULES: OfferModule[] = [
    { id: 'lead', name: 'Lead Engine', line: 'Finds businesses with a reason to buy, scores them, writes to them, routes the replies.' },
    { id: 'desk', name: 'Front Desk', line: 'Answers calls and texts, books the job, works the old quotes.' },
    { id: 'content', name: 'Content Engine', line: 'Scripts, carousels and video in your voice, queued for your yes.' },
    { id: 'ads', name: 'Ads Engine', line: 'Makes ad creative, tests it, keeps the winners.' },
    { id: 'console', name: 'Console', line: 'Your dashboard. What ran today and what needs you.' },
    { id: 'apps', name: 'Micro Apps', line: 'Small tools for one job: a quote builder, a calculator, a payout counter.' },
];

export const OFFER_STACKS: { name: string; parts: string[]; line: string }[] = [
    { name: 'Trades stack', parts: ['Front Desk', 'Lead Engine', 'Quote builder app'], line: 'For HVAC and trades shops that lose jobs to missed calls and old quotes.' },
    { name: 'Marketing stack', parts: ['Content Engine', 'Ads Engine', 'Console'], line: 'For marketing teams that want content and ads shipping without a babysitter.' },
];

export const FAQ: [string, string][] = [
    ['Do I own it?', 'Yes. It is plain files and folders in your own accounts, kept in git. If GYST disappeared tomorrow, your system would still run.'],
    ['What do you need from me?', 'A mapping call, access to what you already have (price sheets, scripts, your CRM), and a few recordings of how you talk. We do the writing.'],
    ['How long does it take?', 'The Business Brain is installed and running in 14 days. Modules go on after that, one at a time.'],
    ['What if it breaks?', 'Every change is saved as a snapshot first, so anything can be rolled back. We also sit down each quarter and go through what ran, what broke and what to cut.'],
    ['How do you charge?', 'It depends on which modules you need, so the price is set on the mapping call. There is no price list on this site.'],
    ['What happens on a mapping call?', 'It takes 30 minutes. We go through how the business runs today and where work gets stuck, then pick the first thing worth building.'],
];
