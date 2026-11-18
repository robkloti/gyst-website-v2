import { BrainFileId, ModuleId, ModuleTree, OfferModule, Vertical } from './types';

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
        modules: ['desk', 'lead', 'apps', 'console', 'content', 'ads'],
    },
    {
        key: 'realestate',
        tab: 'Real estate',
        eyebrow: 'AI operating systems for real estate teams',
        pack: 'Your listings and fact sheets, buyer profiles, brand voice and the lines legal will not let you say.',
        build: 'A sales console, script and carousel apps, a review desk, a page for each seller.',
        room: 'shang',
        modules: ['content', 'console', 'apps', 'lead', 'desk', 'ads'],
    },
    {
        key: 'insurance',
        tab: 'Insurance',
        eyebrow: 'AI operating systems for insurance agencies',
        pack: 'Your products, who you prospect, compliance wording and how your advisors open a conversation.',
        build: 'A prospecting desk, opener drafts ready each morning, a carousel maker, a booking page.',
        room: 'caelum',
        modules: ['lead', 'content', 'console', 'apps', 'desk', 'ads'],
    },
    {
        key: 'marketing',
        tab: 'Marketing team',
        eyebrow: 'AI operating systems for marketing teams',
        pack: 'Your brand rules, offers, past winners, and the ad accounts and folders you already have.',
        build: 'A content engine, an ads engine, a voice check, a console for approvals.',
        room: 'marketing',
        modules: ['content', 'ads', 'console', 'lead', 'apps', 'desk'],
    },
    {
        key: 'studio',
        tab: 'Studio',
        eyebrow: 'AI operating systems for studios',
        pack: 'Your class schedule, pay rules, enrolment steps and the plan for the next campaign.',
        build: 'A trial booker, an enrolment chaser, a campaign sequencer, a payout counter.',
        room: 'ggc',
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

// The skill tree in the offer section. Each module reads some of the brain's files and is made of skills,
// one folder per job, the way Claude Code skills are laid out.
export const BRAIN_FILES: { id: BrainFileId; path: string; note: string }[] = [
    { id: 'map', path: 'business-map/', note: 'Offers, prices and services, one room each.' },
    { id: 'voice', path: 'voice.md', note: 'How you really talk, built from recordings.' },
    { id: 'rules', path: 'rules.md', note: 'What never ships. The things your best person just knows.' },
    { id: 'customers', path: 'customers/', note: 'History, past jobs, old quotes.' },
    { id: 'skills', path: 'skills/', note: 'A written playbook for each task. New ones get added as it works.' },
    { id: 'memory', path: 'memory/', note: 'What it learned. Month two is easier than month one.' },
];

export const MODULE_TREES: Record<ModuleId, ModuleTree> = {
    lead: {
        reads: ['map', 'customers', 'voice', 'memory'],
        skills: [
            ['signal-scout', 'Finds businesses with a reason to buy this week: hiring, new reviews, a new location.'],
            ['icp-score', 'Scores and tiers each one against who you actually sell to.'],
            ['video-cut', 'Records a short personal video on their own website.'],
            ['opener-write', 'Writes the first email in your voice.'],
            ['reply-route', 'Sorts the replies and puts the yeses on your calendar.'],
        ],
        out: 'Booked calls on your calendar',
        live: ['Caelum runs one', '/work/caelum'],
    },
    desk: {
        reads: ['map', 'customers', 'rules', 'voice'],
        skills: [
            ['answer', 'Picks up calls and texts, nights and weekends.'],
            ['intake', 'Asks what a good dispatcher would ask.'],
            ['book', 'Puts the job on the board in the right slot.'],
            ['quote-chase', 'Calls back the old quotes sitting in your CRM.'],
            ['review-ask', 'Asks for a review once the job is done.'],
        ],
        out: 'Jobs on the board, nobody woken up',
        live: ['See it in the Copperjack demo', '/demos/hvac'],
    },
    content: {
        reads: ['voice', 'rules', 'map', 'memory'],
        skills: [
            ['topic-rank', 'Picks what is working from the posts it collects.'],
            ['script-write', 'Writes reel scripts and hooks in your voice.'],
            ['carousel-build', 'Lays out carousels in your brand.'],
            ['rules-check', 'Checks every rule before a person sees it.'],
            ['video-cut', 'Turns renders and raw footage into reels.'],
        ],
        out: 'A month of posts, approved in one sitting',
        live: ['Shang runs one', '/work/shang'],
    },
    ads: {
        reads: ['map', 'voice', 'rules', 'memory'],
        skills: [
            ['ad-research', 'Reads what competitors run and what is working.'],
            ['ad-plan', 'Locks the angles and variants before anything is made.'],
            ['ad-make', 'Makes the images, video and copy.'],
            ['ad-check', 'Checks headline length, banned words and honesty.'],
            ['winner-loop', 'Keeps the winners and retires the rest each week.'],
        ],
        out: 'Ads tested, winners kept',
    },
    console: {
        reads: ['map', 'customers', 'memory'],
        skills: [
            ['morning-brief', 'What ran overnight, in one paragraph.'],
            ['needs-you', 'The few things waiting on your yes.'],
            ['numbers', 'This month against target.'],
            ['app-dock', 'Every micro app one click away.'],
        ],
        out: 'One screen each morning',
        live: ['Open GYST HQ', '/hq'],
    },
    apps: {
        reads: ['map', 'customers'],
        skills: [
            ['lead-calculator', 'Shows a shop the leads it is losing.'],
            ['quote-builder', 'Builds a quote from your price book.'],
            ['payout-counter', 'Works out who gets paid what.'],
            ['teleprompter', 'Puts the script on screen on recording day.'],
        ],
        out: 'Small tools your team actually opens',
        live: ['Try the calculator', '/find-leaks'],
    },
};

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
