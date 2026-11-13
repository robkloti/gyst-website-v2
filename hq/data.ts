import { RoomData } from '../rooms/types';

// GYST HQ demo. Agent roles mirror how GYST actually runs (gyst-ops workstreams).
// Activity, prospects and counts are sample data, labelled as such on the page.

export type DeptId = 'sales' | 'content' | 'builds' | 'ops';

export const DEPTS: { id: DeptId; label: string; zone: string; blurb: string; dot: string }[] = [
    { id: 'sales', label: 'Sales', zone: 'sales', dot: '#46617A', blurb: 'Finds HVAC shops with a reason to buy this week, writes the first email in Rob’s voice, and books the call.' },
    { id: 'content', label: 'Content', zone: 'content', dot: '#76632B', blurb: 'Turns what Rob builds into posts, carousels and videos, and cuts every AI tell before anything ships.' },
    { id: 'builds', label: 'Builds', zone: 'builds', dot: '#62527C', blurb: 'Builds and ships client systems. Every change is reviewed before it reaches a client console.' },
    { id: 'ops', label: 'Ops', zone: 'ops', dot: '#87533C', blurb: 'Keeps the tracker true, counts every dollar of compute, and guards Rob’s calendar.' },
];

export const HQ_ROOM: RoomData = {
    slug: 'gyst-hq',
    title: 'GYST HQ',
    wallTitle: 'GYST · Agents since 2025',
    floor: { w: 22, h: 14 },
    zones: [
        { id: 'mission', label: 'Mission control', x: 0.6, y: 0.6, w: 5, h: 4.6 },
        { id: 'sales', label: 'Sales', x: 6.2, y: 0.6, w: 9.2, h: 4.6 },
        { id: 'ops', label: 'Ops', x: 16, y: 0.6, w: 5.4, h: 4.6 },
        { id: 'content', label: 'Content', x: 0.6, y: 6, w: 8, h: 7.4 },
        { id: 'builds', label: 'Builds', x: 9.2, y: 6, w: 6.2, h: 7.4 },
    ],
    props: [
        { x: 0.15, y: 0.15, kind: 'tall' },
        { x: 21.45, y: 0.15, kind: 'tall' },
        { x: 0.12, y: 5.4, kind: 'small' },
        { x: 5.75, y: 5.45, kind: 'big' },
        { x: 15.55, y: 5.45, kind: 'small' },
        { x: 21.5, y: 5.45, kind: 'small' },
        { x: 8.75, y: 9.4, kind: 'small' },
        { x: 0.12, y: 13.5, kind: 'small' },
        { x: 17.2, y: 7.2, kind: 'sofa' },
        { x: 17.7, y: 9.0, kind: 'table' },
        { x: 16.2, y: 6.4, kind: 'big' },
        { x: 21.2, y: 6.4, kind: 'tall' },
        { x: 21.4, y: 12.6, kind: 'big' },
        { x: 16.3, y: 12.4, kind: 'small' },
    ],
    agents: [
        {
            id: 'mission', name: 'Mission Control', role: 'Chief of staff', zone: 'mission', x: 1.2, y: 1.5,
            does: 'Watches every other agent, keeps the tracker true, and brings Rob only the decisions that need him.',
            tools: ['Workstream tracker', 'Every agent’s log', 'Daily digest'],
            today: ['Read all 8 workstreams', 'Queued 4 decisions for Rob', 'Logged a milestone W3 forgot to log'],
        },
        {
            id: 'rob', name: 'Rob', role: 'Person: decides', zone: 'mission', x: 3.5, y: 2.6, human: true,
            does: 'A person. Approves send blocks, merges, posts and anything that costs money. Nothing goes out without his yes.',
            tools: ['GYST console', 'Phone'],
            today: ['Approved the send block', 'Took 2 calls'],
        },
        {
            id: 'scout', name: 'Signal Scout', role: 'Finds a reason to call', zone: 'sales', x: 6.8, y: 1.3,
            does: 'Scans job boards, reviews and ad libraries for HVAC shops showing a buying signal: hiring a dispatcher, bad reviews about callbacks, new ads.',
            tools: ['Apify scrapers', 'Job boards', 'Google reviews'],
            today: ['Found 212 shops with a signal', 'Dropped 40 already contacted'],
        },
        {
            id: 'scorer', name: 'ICP Scorer', role: 'Ranks who fits', zone: 'sales', x: 9.0, y: 1.3,
            does: 'Scores every shop against GYST’s ideal client: size, signal strength, owner-run, already spending on ads. Tiers A, B, C.',
            tools: ['ICP rubric', 'Claude'],
            today: ['Scored 212 shops', 'Tier A: 14'],
        },
        {
            id: 'writer', name: 'Email Writer', role: 'Writes the opener', zone: 'sales', x: 11.2, y: 1.3,
            does: 'Writes a first email that names the shop’s signal and leads with the Shang build. Rob’s voice, no pitch in line one.',
            tools: ['VOICE.md', 'Shang case study', 'cold-email skill'],
            today: ['Drafted 14 Tier A openers', 'Rewrote 3 after Voice Lint'],
        },
        {
            id: 'sender', name: 'Sender', role: 'Sends on schedule', zone: 'sales', x: 13.4, y: 1.3,
            does: 'Sends approved sequences at the right local time, warms inboxes, and stops the moment someone replies.',
            tools: ['Instantly', 'Warm inboxes'],
            today: ['Held tonight’s block for Rob', 'Paused 1 inbox for warm-up'],
        },
        {
            id: 'texter', name: 'Text Setter', role: 'Follows up by text', zone: 'sales', x: 7.9, y: 3.2, status: 'in-build',
            does: 'Texts shops that opened but did not reply. Built and tested; Rob holds the switch until A2P registration clears.',
            tools: ['Twilio', 'GoHighLevel'],
            today: ['In build: waiting on A2P approval'],
        },
        {
            id: 'router', name: 'Reply Router', role: 'Sorts the replies', zone: 'sales', x: 10.1, y: 3.2,
            does: 'Reads every reply, tags it (interested, price, not now, stop) and sends warm ones to the setter within minutes.',
            tools: ['Inbox', 'GoHighLevel', 'Claude'],
            today: ['Sorted 9 replies', 'Sent 3 warm ones to the setter'],
        },
        {
            id: 'setter', name: 'Setter', role: 'Person: books calls', zone: 'sales', x: 12.3, y: 3.2, human: true,
            does: 'A person. Calls the warm replies and books the discovery call on Rob’s calendar.',
            tools: ['GoHighLevel', 'Call script'],
            today: ['Booked 2 calls'],
        },
        {
            id: 'tracker', name: 'Tracker', role: 'Keeps score', zone: 'ops', x: 16.6, y: 1.3,
            does: 'Holds every workstream’s status, finish line and ongoing number. Flags anything waiting on Rob.',
            tools: ['intention.db', 'GYST console'],
            today: ['Marked W3 done', 'Flagged 5 items waiting on Rob'],
        },
        {
            id: 'ledger', name: 'Cost Ledger', role: 'Counts every dollar', zone: 'ops', x: 18.9, y: 1.3,
            does: 'Logs the compute cost of every job per client, so a build’s margin is known, not guessed.',
            tools: ['Usage logs', 'Per-client ledger'],
            today: ['Logged $41 of compute across 3 clients'],
        },
        {
            id: 'calendar', name: 'Calendar Keeper', role: 'Guards the calendar', zone: 'ops', x: 17.7, y: 3.2,
            does: 'Protects Rob’s build blocks, confirms booked calls and sends the prep notes the morning of.',
            tools: ['Google Calendar', 'Call prep template'],
            today: ['Confirmed 2 calls', 'Sent prep notes for Thursday'],
        },
        {
            id: 'researcher', name: 'Researcher', role: 'Finds the questions', zone: 'content', x: 1.3, y: 6.8,
            does: 'Collects the questions owners actually ask about AI, from comments, calls and forums, and ranks them.',
            tools: ['Call transcripts', 'Comment scrapes', 'Knowledge base'],
            today: ['Top question: will AI replace my dispatcher?'],
        },
        {
            id: 'drafter', name: 'Drafter', role: 'Writes in Rob’s voice', zone: 'content', x: 3.8, y: 6.8,
            does: 'Turns a question into a post or carousel in Rob’s voice: short sentences, a real number, a build he shipped.',
            tools: ['VOICE.md', 'content-chain skill'],
            today: ['Drafted a 7-slide carousel', 'Applied Voice Lint’s cuts'],
        },
        {
            id: 'lint', name: 'Voice Lint', role: 'Cuts the AI tells', zone: 'content', x: 6.3, y: 6.8,
            does: 'Checks every draft for AI tells and banned words before Rob sees it. Blocks and explains.',
            tools: ['humanizer', 'stop-slop', 'Banned word list'],
            today: ['Cut 3 AI tells', 'Removed 2 em dashes'],
        },
        {
            id: 'carousel', name: 'Carousel Maker', role: 'Renders the slides', zone: 'content', x: 1.3, y: 9.6,
            does: 'Lays approved copy into GYST’s slide templates: charcoal, paper, one hazard yellow accent.',
            tools: ['carousel-build skill', 'BRAND.md', 'PNG export'],
            today: ['Rendered 7 slides'],
        },
        {
            id: 'editor', name: 'Video Editor', role: 'Cuts the videos', zone: 'content', x: 3.8, y: 9.6, status: 'in-build',
            does: 'Edits Rob’s raw footage into ads and shorts. Being built now with Rob’s human editor.',
            tools: ['HyperFrames', 'Shot pipeline'],
            today: ['In build'],
        },
        {
            id: 'scheduler', name: 'Scheduler', role: 'Posts on time', zone: 'content', x: 6.3, y: 9.6,
            does: 'Holds the content queue, staged top, middle and bottom of funnel, and posts what Rob approves.',
            tools: ['Content queue', 'Post metrics log'],
            today: ['Queued the carousel for 7 AM'],
        },
        {
            id: 'builder', name: 'Builder', role: 'Builds client systems', zone: 'builds', x: 9.8, y: 6.8,
            does: 'Writes the code for client builds in Claude Code: consoles, agents, case-study pages. Opens a pull request for every change.',
            tools: ['Claude Code', 'GitHub'],
            today: ['Opened the Shang seller-page PR', 'Fixed 2 review notes'],
        },
        {
            id: 'reviewer', name: 'Reviewer', role: 'Nothing ships unchecked', zone: 'builds', x: 12.5, y: 6.8,
            does: 'Runs review, tests and lint on every pull request. Sends it back with reasons when it is not ready.',
            tools: ['no-mistakes pipeline', 'Playwright'],
            today: ['Sent back 1 PR with 2 issues', 'Passed the fix'],
        },
        {
            id: 'console', name: 'Console Keeper', role: 'Runs client consoles', zone: 'builds', x: 9.8, y: 9.6,
            does: 'Deploys merged work to each client’s console and checks it still loads for them.',
            tools: ['client-os', 'Vercel'],
            today: ['Updated the Shang console'],
        },
        {
            id: 'reporter', name: 'Reporter', role: 'Writes the digest', zone: 'builds', x: 12.5, y: 9.6,
            does: 'Writes Rob’s 6 PM digest: calls booked, ships, posts, cost, and what is stuck.',
            tools: ['Every agent’s log'],
            today: ['Sent the 6 PM digest'],
        },
    ],
    counters: [
        { id: 'signals', label: 'Signals found', start: 0 },
        { id: 'drafts', label: 'Emails drafted', start: 0 },
        { id: 'calls', label: 'Calls booked', start: 1 },
        { id: 'ships', label: 'Ships', start: 2 },
    ],
    script: [
        { from: 'scout', to: 'scorer', text: 'Found 212 HVAC shops hiring a dispatcher this week.', counter: 'signals:212' },
        { from: 'scorer', to: 'writer', text: '61 fit the ICP. Tier A: 14 owner-run shops.' },
        { from: 'researcher', to: 'drafter', text: 'Top question this week: will AI replace my dispatcher?' },
        { from: 'writer', to: 'sender', text: '14 openers drafted. Each one leads with the Shang build.', counter: 'drafts:14' },
        { from: 'drafter', to: 'lint', text: 'Draft ready: 7-slide carousel on the dispatcher question.' },
        { from: 'sender', to: 'mission', text: 'Tonight’s send block is ready. Needs Rob’s yes.' },
        { from: 'lint', to: 'drafter', text: 'Cut 3 AI tells and 2 em dashes. Try again.' },
        { from: 'builder', to: 'reviewer', text: 'Shang seller page: pull request open.' },
        { from: 'mission', to: 'rob', text: 'Four decisions are waiting on you.' },
        { from: 'router', to: 'setter', text: 'Reply from a Phoenix shop: "How much?" Warm. Yours.' },
        { from: 'reviewer', to: 'builder', text: 'Two issues. Mobile overflow and a missing alt tag.' },
        { from: 'rob', to: 'sender', text: 'Approved. Send the block at 7 AM their time.' },
        { from: 'drafter', to: 'carousel', text: 'Clean now. Render it.' },
        { from: 'setter', to: 'calendar', text: 'Call booked: Thursday 10 AM with Desert Air.', counter: 'calls:1' },
        { from: 'builder', to: 'console', text: 'Fixed and merged. Ship the seller page.', counter: 'ships:1' },
        { from: 'carousel', to: 'scheduler', text: '7 slides rendered in GYST brand. Queued for 7 AM.' },
        { from: 'ledger', to: 'mission', text: 'Compute this week: $41 across 3 clients.' },
        { from: 'calendar', to: 'rob', text: 'Prep notes for Thursday’s call are in your inbox.' },
        { from: 'tracker', to: 'mission', text: 'W3 website marked done. 5 items waiting on Rob.' },
        { from: 'reporter', to: 'rob', text: '6 PM digest: 2 calls booked, 1 ship, 1 post queued, $41 spent.' },
    ],
};

export type Decision = { id: string; agent: string; title: string; detail?: string; impact?: string };
export const DECISIONS: Decision[] = [
    {
        id: 'block', agent: 'sender', title: 'Send tonight’s block: 14 Tier A shops',
        detail: 'Owner-run HVAC shops hiring a dispatcher. One email each, leading with the Shang build. Replies go straight to the setter.',
        impact: 'Past blocks booked about 1 call per 7 sends',
    },
    { id: 'post', agent: 'scheduler', title: 'Post the dispatcher carousel at 7 AM' },
    { id: 'merge', agent: 'reviewer', title: 'Merge the Shang seller page' },
    { id: 'sms', agent: 'texter', title: 'Turn on texting once A2P clears' },
];

export type Stage = 'contacted' | 'replied' | 'booked' | 'client';
export type Prospect = { id: string; name: string; city: string; signal: string; value: string; stage: Stage; agent: string; note: string; when: string };
export const PROSPECTS: Prospect[] = [
    { id: 'p1', name: 'Desert Air Heating', city: 'Phoenix, AZ', signal: 'Hiring a dispatcher', value: '$4,500', stage: 'booked', agent: 'calendar', note: 'Thursday 10 AM, prep notes sent', when: '12 min' },
    { id: 'p2', name: 'North Ridge Comfort', city: 'Denver, CO', signal: '14 reviews mention callbacks', value: '$4,500', stage: 'replied', agent: 'router', note: 'Asked "how much?" Sent to setter', when: '25 min' },
    { id: 'p3', name: 'Bayou Cool Services', city: 'Baton Rouge, LA', signal: 'New Meta ads this week', value: '$3,000', stage: 'contacted', agent: 'sender', note: 'Opener sent, opened twice', when: '1 h' },
    { id: 'p4', name: 'Lakeshore HVAC', city: 'Milwaukee, WI', signal: 'Hiring a CSR', value: '$4,500', stage: 'contacted', agent: 'sender', note: 'Opener sent 7:02 AM local', when: '2 h' },
    { id: 'p5', name: 'Summit Mechanical', city: 'Salt Lake City, UT', signal: 'After-hours calls going to voicemail', value: '$6,000', stage: 'replied', agent: 'router', note: 'Wants to see the Shang build', when: '40 min' },
    { id: 'p6', name: 'Gulf Breeze Air', city: 'Tampa, FL', signal: 'Hiring a dispatcher', value: '$4,500', stage: 'booked', agent: 'calendar', note: 'Friday 2 PM confirmed', when: 'Yesterday' },
    { id: 'p7', name: 'Prairie Climate Co.', city: 'Wichita, KS', signal: '3 new locations', value: '$9,000', stage: 'client', agent: 'builder', note: 'Kickoff done, building the phone desk', when: 'Mon' },
    { id: 'p8', name: 'Cascade Heat & Air', city: 'Spokane, WA', signal: 'Owner posting about missed calls', value: '$3,000', stage: 'contacted', agent: 'sender', note: 'Follow-up 2 of 3 scheduled', when: '3 h' },
];

export const FUNNEL = [
    { label: 'Signals found', value: 4210 },
    { label: 'Fit the ICP', value: 1180 },
    { label: 'Emailed', value: 960 },
    { label: 'Replied', value: 86 },
    { label: 'Calls booked', value: 31 },
    { label: 'Clients', value: 4 },
];

export type Client = { id: string; name: string; type: string; agents: number; inBuild: number; lastShip: string; watch: string; status: 'live' | 'building' | 'slipping'; href?: string; notes: string[] };
export const CLIENTS: Client[] = [
    {
        id: 'shang', name: 'Shang Properties', type: 'Real estate, Philippines', agents: 11, inBuild: 1, lastShip: 'Today', watch: 'Reviewer, Console Keeper', status: 'live', href: '/work/shang',
        notes: ['Seller page merged today. Console updated.', 'Month pack for December ready for Marketing.', 'Compute this week: $18.'],
    },
    {
        id: 'caelum', name: 'Caelum', type: 'Insurance agency', agents: 10, inBuild: 1, lastShip: '2 days ago', watch: 'Builder, Cost Ledger', status: 'live', href: '/work/caelum',
        notes: ['Video cutter in build.', 'Carousel queue is ahead of posting. The fix is the console, not more AI.', 'Compute this week: $14.'],
    },
    {
        id: 'ggc', name: 'GGC', type: 'Dance studio', agents: 6, inBuild: 2, lastShip: 'Last week', watch: 'Tracker', status: 'slipping',
        notes: ['Payout counter waiting on class data from Rob.', 'Recital page live, QR on the LED screen.', 'Compute this week: $9.'],
    },
    {
        id: 'hvac', name: 'HVAC lead engine', type: 'Productised install', agents: 9, inBuild: 0, lastShip: 'Yesterday', watch: 'Reporter', status: 'building', href: '/find-leaks/start',
        notes: ['Phone desk template ready for the next shop.', 'Quote revival tested on sample data.', 'Next install: Prairie Climate Co.'],
    },
];

export type Shelf = { id: string; label: string; file: string; count: number; readers: string[] };
export const SHELVES: Shelf[] = [
    { id: 'voice', label: 'Rob’s voice', file: 'VOICE.md', count: 312, readers: ['writer', 'drafter', 'lint', 'router', 'reporter', 'mission'] },
    { id: 'opinions', label: 'Rob’s opinions', file: 'OPINIONS.md', count: 148, readers: ['drafter', 'mission', 'researcher'] },
    { id: 'brand', label: 'Brand', file: 'BRAND.md', count: 64, readers: ['carousel', 'editor', 'builder'] },
    { id: 'skills', label: 'Skills', file: 'skills-index', count: 120, readers: ['builder', 'reviewer', 'drafter', 'carousel', 'scout', 'writer'] },
    { id: 'clients', label: 'Client notes', file: 'clients/', count: 890, readers: ['builder', 'console', 'reporter', 'ledger', 'mission'] },
    { id: 'decisions', label: 'Decisions', file: 'intention.db', count: 1412, readers: ['mission', 'tracker', 'calendar', 'sender', 'scorer'] },
];

export const VOICE_RULES = [
    { rule: 'Every sentence earns its place. A name, a number, a reframe or an implication.', src: 'VOICE.md, May 2026' },
    { rule: 'Name what a tool is the first time you mention it. One clause, then use it.', src: 'VOICE.md, May 2026' },
    { rule: 'Short sentences. Punch hard. No throat-clearing.', src: 'VOICE.md' },
    { rule: 'Never use an em dash. Plain dash only.', src: 'Global agent rules' },
    { rule: 'English only in anything that ships.', src: 'VOICE.md, May 2026' },
];

export const WORKSTREAMS = [
    { id: 'W0', name: 'Mission control', status: 'active', finish: 'Tracker live in the console, every tab reporting daily' },
    { id: 'W1', name: 'Pipeline engine', status: 'waiting', finish: 'Outbound sends daily on its own, Shang sequence live' },
    { id: 'W2r', name: 'Harness research', status: 'done', finish: 'Deep-dive doc loaded into the content machine' },
    { id: 'W2b', name: 'Content machine', status: 'done', finish: '30 pieces staged: 15 top, 10 middle, 5 bottom of funnel' },
    { id: 'W3', name: 'Website + case studies', status: 'done', finish: 'Site live with Shang, Caelum and the worker rooms' },
    { id: 'W5', name: 'GGC OS', status: 'waiting', finish: 'One real pay period calculated and matching manual numbers' },
    { id: 'W6', name: 'Video micro-apps', status: 'waiting', finish: 'One ad and one post edited end to end, editor signs off' },
    { id: 'W7', name: 'SMS engine', status: 'waiting', finish: 'Texting built and tested, about 1,000 a day once Rob flips it on' },
];

export const CONTENT_QUEUE = [
    { stage: 'Top of funnel', items: [['Will AI replace my dispatcher?', 'Queued 7 AM'], ['The one file that keeps every output on brand', 'Drafting'], ['I gave 11 agents one job each', 'Posted']] },
    { stage: 'Middle', items: [['How Shang approves a month of posts in one sitting', 'In Voice Lint'], ['What a $3.64 carousel looks like', 'Drafting']] },
    { stage: 'Bottom', items: [['Walk the Shang room', 'Posted'], ['Book a 30-minute floor map', 'Scheduled Fri']] },
];

export const BUILD_LOG = [
    ['Worker rooms: lit office look', 'gyst-website-v2', 'Reviewing'],
    ['Remove link to missing /index.css', 'gyst-website-v2', 'Waiting on Rob'],
    ['Shang seller page', 'shang-properties', 'Merged'],
    ['Caelum cost ledger per job', 'caelum-ops', 'Merged'],
    ['GGC payout rules', 'ggc-ops', 'Waiting on data'],
];

export const REPLIES = [
    {
        id: 'r1', who: 'Mike, North Ridge Comfort', tag: 'Price question',
        thread: [
            ['agent', 'Mike, saw 14 of your reviews mention waiting on a callback. I built a phone desk for a real-estate team that answers in under a minute, day or night. Worth a look?'],
            ['them', 'Maybe. How much?'],
        ],
        summary: 'Warm. Asked price on the first reply. Setter calls today; Rob’s answer: depends on call volume, 30 minutes to map it.',
    },
    {
        id: 'r2', who: 'Dana, Summit Mechanical', tag: 'Wants proof',
        thread: [
            ['agent', 'Dana, your after-hours line goes to voicemail. Shang Properties runs 11 agents behind one console. I can show you the room.'],
            ['them', 'Send me the Shang thing.'],
        ],
        summary: 'Sent /work/shang. Setter follows up tomorrow 9 AM her time.',
    },
    {
        id: 'r3', who: 'Front desk, Bayou Cool', tag: 'Not now',
        thread: [
            ['agent', 'Saw your new Meta ads this week. Who answers when those leads call at 9 PM?'],
            ['them', 'Busy season. Try us in January.'],
        ],
        summary: 'Not now. Reply Router set a January 6 follow-up and thanked them.',
    },
];

export const CHAT: Record<string, string> = {
    'What needs me today?': 'Four things. Tonight’s send block to 14 Tier A shops, the dispatcher carousel for 7 AM, merging the Shang seller page, and texting, which waits on A2P. All four are one click on the right.',
    'How did last night go?': 'The block went to 14 shops. 9 replies came in overnight, 3 warm. The setter booked 2 calls: Desert Air on Thursday and Gulf Breeze on Friday.',
    'How is Shang doing?': 'Live and healthy. The seller page shipped today, the December month pack is ready for Marketing, and compute this week was $18.',
    'What is stuck?': 'GGC payouts. The payout counter needs one real pay period of class data. That one is on you.',
};
