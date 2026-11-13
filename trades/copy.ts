// /trades copy. Owner words, no prices, no client results: GYST has no HVAC client story yet, so proof is the build.

export const TRADES_HERO = {
    eyebrow: 'For owner-run HVAC and trades shops',
    line1: 'Every call answered.',
    line2: 'Every quote chased.',
    sub: 'Nights, weekends, techs on the road - the phone still gets picked up and the job goes on the board. The old quotes sitting in your CRM get a call back. We write down how your shop runs, then build the front desk and the follow-up on top of it.',
};

// Lines lifted from the HVAC room script (rooms/hvac.ts) so the hero and the room tell the same story.
export const NIGHT_LOG: { time: string; who: string; text: string }[] = [
    { time: '11:40 PM', who: 'Call answered', text: 'No heat, two kids at home.' },
    { time: '11:41 PM', who: 'Questions asked', text: 'Urgent. Furnace is 14 years old. In your service area.' },
    { time: '11:43 PM', who: 'Job booked', text: 'First slot, 7:30 AM. Notes attached for the tech.' },
    { time: '11:44 PM', who: 'Text sent', text: 'Homeowner gets a confirmation. Nobody got woken up.' },
    { time: '7:00 AM', who: 'Morning report', text: 'One emergency booked overnight. One April quote said yes.' },
];

export const LEAKS: { title: string; pain: string; fix: string }[] = [
    {
        title: 'The 9pm call',
        pain: 'No AC at 9pm on a Saturday. The homeowner calls three companies in ten minutes. The first one to pick up books the job. Yours went to voicemail, because you were asleep or under a house.',
        fix: 'A front desk that picks up nights and weekends, asks what a good dispatcher would ask, and puts the job on the board.',
    },
    {
        title: 'The old quotes',
        pain: 'There is a year of quotes sitting in the CRM. Most of them never said no. Nobody called them back, because everybody was on a job.',
        fix: 'Follow-up that works the list by text and phone on a schedule, not when someone remembers.',
    },
    {
        title: 'The review nobody asked for',
        pain: 'The job went well. The customer was happy. The tech is already on the road to the next one, and the review never gets asked for.',
        fix: 'A review ask that goes out after every finished job, with a QR code the tech can hand over at the door.',
    },
];

// Real phrases from the language bank (public trades forums). Not GYST clients, and labelled that way on the page.
export const OWNER_WORDS = [
    'None of it was a system. It was just me knowing what needed to happen and doing it.',
    'Everything depended on me being present at every step.',
];

export const STACK: { name: string; line: string }[] = [
    { name: 'Front Desk', line: 'Answers calls and texts around the clock, in your shop’s voice. Flags emergencies, screens out jobs outside your area, books the rest.' },
    { name: 'Quote follow-up', line: 'Works through the quotes that never went ahead. A text, then a call, at the right time of year.' },
    { name: 'Quote builder', line: 'A small tool on your website. The homeowner gets a ballpark, you get a lead with the answers already filled in.' },
    { name: 'Review chaser', line: 'Asks for the review after every finished job, so the count climbs without anyone chasing it.' },
];

export const STEPS: { when: string; what: string }[] = [
    { when: 'Mapping call', what: '30 minutes. We go through how the shop runs today and where jobs get lost.' },
    { when: 'Day 14', what: 'Your shop is written down, and the system that reads it is installed and running.' },
    { when: 'After that', what: 'The front desk and the rest go on top, one at a time.' },
    { when: 'Every quarter', what: 'We sit down and go through what ran, what broke and what to cut.' },
];

export const PROOF: { tag: string; title: string; line: string; cta: string; href: string; image: string; alt: string }[] = [
    {
        tag: 'Try it · 4 minutes',
        title: 'The lead calculator',
        line: 'Four questions about your shop, and a dollar figure for what missed calls and old quotes are costing you. We built it. It runs on your numbers.',
        cta: 'Find your leaks',
        href: '/find-leaks',
        image: '/work/home/find-leaks.jpg',
        alt: 'The HVAC lead calculator',
    },
    {
        tag: 'Demo · sample data',
        title: 'Copperjack Dispatch',
        line: 'A made-up HVAC shop with a working dashboard: calls, bookings, quotes chased. Every number in it is sample data.',
        cta: 'Open the demo',
        href: '/demos/hvac',
        image: '/trades/copperjack-demo.jpg',
        alt: 'The Copperjack Dispatch demo dashboard, showing sample data',
    },
    {
        tag: 'Real build · real estate',
        title: 'Shang Properties',
        line: 'A real system for a property developer in Manila. Different trade, same parts underneath: the business written down, and agents with one job each.',
        cta: 'Read the case study',
        href: '/work/shang',
        image: '/work/home/shang-room.jpg',
        alt: 'The worker room built for Shang Properties',
    },
];

export const TRADES_FAQ: [string, string][] = [
    ['Does it work with ServiceTitan, Jobber or Housecall Pro?', 'It is built to book into the field-service calendar you already use, not to replace it. We check your exact setup on the mapping call before we promise anything.'],
    ['Who answers the phone?', 'An AI voice agent that has read your price book, your service area and how you quote. It picks up nights and weekends, asks the questions a good dispatcher would ask, and books the job. When a call needs a person, it hands it to one.'],
    ['Will it sound like a robot?', 'It is built from recordings of how you really talk, and every text is checked against your own list of words you would never say. We go through the first 50 calls with you and fix what sounds off.'],
    ['What do you need from my office manager?', 'Access to what you already have: the price book, the scripts, an export of the CRM. Plus a few recordings of how you talk on the phone. We do the writing.'],
    ['Does this replace my dispatcher?', 'No. Your dispatcher starts the day with the board already full and the urgent jobs on top. People still run the trucks and make the calls that need an owner.'],
    ['Do I own it?', 'Yes. It is plain files and folders in your own accounts. If GYST disappeared tomorrow, your system would still run.'],
    ['How do you charge?', 'It depends on what your shop needs, so the price is set on the mapping call. There is no price list on this site.'],
];

export const TRADES_FINAL = {
    title: 'Stop losing the 9pm call.',
    sub: 'One 30-minute call to map how your shop runs today and pick the first leak worth fixing.',
};
