import { RoomData } from './types';

// Mirrors what was built for Caelum (caelum-ops map #1). Activity text is a scripted demo.
export const CAELUM_ROOM: RoomData = {
    slug: 'caelum',
    title: 'Caelum - prospecting + content',
    wallTitle: 'Caelum Financial',
    floor: { w: 16, h: 12 },
    zones: [
        { id: 'leads', label: 'Lead desk', x: 0.6, y: 0.6, w: 8.2, h: 4 },
        { id: 'content', label: 'Content room', x: 9.4, y: 0.6, w: 6, h: 4 },
        { id: 'funnel', label: 'Booking', x: 0.6, y: 5.6, w: 5.6, h: 5.8 },
        { id: 'floor', label: 'Prospector', x: 6.8, y: 5.6, w: 4.4, h: 5.8 },
        { id: 'ops', label: 'Back office', x: 11.8, y: 5.6, w: 3.6, h: 5.8 },
    ],
    agents: [
        {
            id: 'scout', name: 'Signal scout', role: 'Spots the moment', zone: 'leads', x: 1.2, y: 1.6,
            does: 'Watches for professionals who changed jobs in the last 90 days. A new job often means new benefits, and gaps in cover.',
            tools: ['Apify', 'LinkedIn job-change signals', 'Dedup against past leads'],
            today: ['Found the overnight batch of job changers', 'Dropped anyone already contacted'],
        },
        {
            id: 'reader', name: 'Profile reader', role: 'Writes the first line', zone: 'leads', x: 3.8, y: 1.6,
            does: 'Reads each profile and writes a short, personal opener that mentions the new role. No templates, no pitch in line one.',
            tools: ['Claude', 'Opener rules', 'Voice file'],
            today: ['Drafted openers for the new batch', 'Flagged two profiles as wrong fit'],
        },
        {
            id: 'followup', name: 'Follow-up', role: 'Keeps the rhythm', zone: 'leads', x: 6.4, y: 1.6,
            does: 'Schedules the second and third touch at 7 and 14 days, so nobody gets forgotten and nobody gets spammed.',
            tools: ['Jobs ledger', '7 / 14-day rhythm'],
            today: ['Queued day-7 nudges', 'Closed out three silent threads'],
        },
        {
            id: 'carousel', name: 'Carousel maker', role: 'Makes the posts', zone: 'content', x: 9.8, y: 1.6,
            does: 'Turns a money question people actually ask into a carousel, in English or Taglish for the local audience.',
            tools: ['Carousel pipeline', 'Image generation', 'Market presets'],
            today: ['Made a carousel on life cover after a job change'],
            measured: '15+ carousels generated so far',
        },
        {
            id: 'lint', name: 'Voice check', role: 'Kills the AI tells', zone: 'content', x: 11.8, y: 1.6,
            does: 'Runs every caption through a humanizer and a slop filter before it reaches a person.',
            tools: ['humanizer', 'stop-slop'],
            today: ['Rewrote two captions that sounded like a brochure'],
        },
        {
            id: 'video', name: 'Video cutter', role: 'Assembles short videos', zone: 'content', x: 13.8, y: 1.6, status: 'in-build',
            does: 'Assembles captioned short videos from a hook, a body and a call to action. Being built now.',
            tools: ['HyperFrames'],
            today: ['In build'],
        },
        {
            id: 'landing', name: 'Landing page', role: 'Routes the interest', zone: 'funnel', x: 1.4, y: 6.6,
            does: 'A two-step page: insurance or investment? Each answer routes to the right booking calendar.',
            tools: ['Two-step form', 'iClosed booking'],
            today: ['Routed a visitor to the insurance calendar'],
        },
        {
            id: 'booker', name: 'Booker', role: 'Confirms the call', zone: 'funnel', x: 3.6, y: 8.8,
            does: 'Confirms booked calls and hands the advisor a one-paragraph brief on who they’re about to talk to.',
            tools: ['iClosed', 'Lead record'],
            today: ['Sent the advisor a brief for a 3 PM call'],
        },
        {
            id: 'prospector', name: 'Prospector', role: 'Person: an hour a day', zone: 'floor', x: 7.6, y: 7, human: true,
            does: 'A person. Opens the console, sends the openers that look right, posts the day’s content. About an hour a day.',
            tools: ['Caelum console'],
            today: ['Sent 12 openers', 'Posted the carousel'],
        },
        {
            id: 'advisor', name: 'Advisor', role: 'Person: takes the calls', zone: 'floor', x: 9.6, y: 9.2, human: true,
            does: 'A person. Takes the booked calls. The agents never give financial advice; they only start conversations.',
            tools: ['Call brief'],
            today: ['Took a 3 PM call with a new engineer'],
        },
        {
            id: 'worker', name: 'Worker', role: 'Runs the jobs', zone: 'ops', x: 12.6, y: 6.6,
            does: 'Picks jobs off a queue and runs them with Claude Code on a Mac, headless. Built so the API can swap in later.',
            tools: ['Supabase job queue', 'Claude Code headless'],
            today: ['Ran 40 jobs overnight'],
        },
        {
            id: 'ledger', name: 'Cost ledger', role: 'Counts every peso', zone: 'ops', x: 12.6, y: 9.2,
            does: 'Records what every job cost, per tenant, so the engine’s bill is never a surprise.',
            tools: ['Jobs ledger', 'Per-tenant costs'],
            today: ['Logged last night’s spend'],
        },
    ],
    counters: [
        { id: 'leads', label: 'Job changers found', start: 0 },
        { id: 'openers', label: 'Openers drafted', start: 0 },
        { id: 'posts', label: 'Posts ready', start: 1 },
        { id: 'calls', label: 'Calls booked', start: 2 },
    ],
    script: [
        { from: 'worker', to: 'scout', text: 'Morning run started. 40 jobs queued.' },
        { from: 'scout', to: 'reader', text: '23 people changed jobs this week. 4 already contacted, dropped.', counter: 'leads:23' },
        { from: 'reader', to: 'prospector', text: '19 openers ready. Each one names the new role.', counter: 'openers:19' },
        { from: 'carousel', to: 'lint', text: 'Carousel draft: what happens to your cover when you switch jobs.' },
        { from: 'lint', to: 'prospector', text: 'Two captions rewritten. Ready to post.', counter: 'posts:1' },
        { from: 'prospector', to: 'followup', text: 'Sent 12 openers. Skipped 7 that felt off.' },
        { from: 'followup', to: 'worker', text: 'Day-7 nudges scheduled for last week’s batch.' },
        { from: 'landing', to: 'booker', text: 'Visitor chose insurance. Booked for 3 PM.', counter: 'calls:1' },
        { from: 'booker', to: 'advisor', text: 'Brief: new engineer, changed jobs in October, no cover outside work.' },
        { from: 'worker', to: 'ledger', text: 'Overnight run logged.' },
    ],
};
