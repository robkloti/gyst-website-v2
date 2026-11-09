import { RoomData } from './types';

// Example room built from the 14-Day Marketing Ops Install (constants OFFER_STACK). Not a client.
export const MARKETING_ROOM: RoomData = {
    slug: 'marketing',
    title: 'Example room - marketing team',
    wallTitle: 'Marketing ops',
    floor: { w: 16, h: 12 },
    zones: [
        { id: 'reception', label: 'Reception', x: 0.6, y: 0.6, w: 3.6, h: 4 },
        { id: 'content', label: 'Content room', x: 4.8, y: 0.6, w: 10.6, h: 4 },
        { id: 'ads', label: 'Ads room', x: 0.6, y: 5.6, w: 5.6, h: 5.8 },
        { id: 'team', label: 'Your team', x: 6.8, y: 5.6, w: 4.4, h: 5.8 },
        { id: 'memory', label: 'Memory', x: 11.8, y: 5.6, w: 3.6, h: 5.8 },
    ],
    agents: [
        {
            id: 'router', name: 'Router', role: 'The reception desk', zone: 'reception', x: 1.2, y: 1.6,
            does: 'Think of it as the reception desk. Every request walks in, gets pointed to the right room, and nothing else loads.',
            tools: ['CLAUDE.md routing table', 'Daily cron'],
            today: ['Started the 6 AM run', 'Sent jobs to content and ads'],
        },
        {
            id: 'scout', name: 'Scout', role: 'Finds the angle', zone: 'content', x: 5.4, y: 1.6,
            does: 'Watches your niche for what’s getting traction and brings back angles worth a post.',
            tools: ['Research skill', 'Your ICP file'],
            today: ['Brought back 3 angles'],
        },
        {
            id: 'shorts', name: 'Shorts writer', role: 'Writes the scripts', zone: 'content', x: 7.9, y: 1.6,
            does: 'Turns one angle into a batch of short-form scripts in your brand voice.',
            tools: ['spawn-shorts skill', 'voice.md'],
            today: ['Wrote 7 shorts before lunch'],
        },
        {
            id: 'repurpose', name: 'Repurposer', role: 'One idea, every format', zone: 'content', x: 10.4, y: 1.6,
            does: 'Takes what worked and reshapes it into carousels, threads and email.',
            tools: ['repurpose skill', 'carousel-build skill'],
            today: ['Turned a winning short into a carousel'],
        },
        {
            id: 'lint', name: 'Lint', role: 'Catches the AI tells', zone: 'content', x: 12.9, y: 1.6,
            does: 'Every line goes through humanizer, then stop-slop, before a person sees it.',
            tools: ['humanizer', 'stop-slop'],
            today: ['0 flags on the morning batch'],
        },
        {
            id: 'adsplanner', name: 'Ads planner', role: 'Plans the cycle', zone: 'ads', x: 1.4, y: 6.6,
            does: 'Researches competitors and plans the next ad cycle: angles, audiences, budget.',
            tools: ['meta-ads-research', 'meta-ads-planner'],
            today: ['Planned a 3-angle cycle'],
        },
        {
            id: 'creative', name: 'Creative maker', role: 'Makes the variants', zone: 'ads', x: 3.6, y: 8.8,
            does: 'Produces the full set of ad variants from the plan, copy and images, inside your brand rules.',
            tools: ['meta-ads-creative', 'Image generation'],
            today: ['Rendered 100 variants'],
        },
        {
            id: 'evaluator', name: 'Evaluator', role: 'Validates before spend', zone: 'ads', x: 1.4, y: 9.6,
            does: 'Lints every variant against your rules and past winners before a cent is spent.',
            tools: ['meta-ads-eval'],
            today: ['Passed 12 of 100'],
        },
        {
            id: 'lead', name: 'Marketing lead', role: 'Person: approves', zone: 'team', x: 7.6, y: 7, human: true,
            does: 'A person. Reviews the log, not the process. Approves what ships.',
            tools: ['Morning drafts', 'Results log'],
            today: ['Approved 7 shorts and 12 ads'],
        },
        {
            id: 'designer', name: 'Designer', role: 'Person: final polish', zone: 'team', x: 9.6, y: 9.2, human: true,
            does: 'A person. Spends time on the hero pieces instead of resizing the same graphic ten times.',
            tools: ['Brand file'],
            today: ['Polished the launch carousel'],
        },
        {
            id: 'memory', name: 'Memory keeper', role: 'Remembers what worked', zone: 'memory', x: 12.6, y: 7.4,
            does: 'Logs what worked after every task and consolidates it weekly, so nothing starts from zero twice.',
            tools: ['results/ logs', 'Weekly consolidation'],
            today: ['Logged the morning’s winners'],
        },
    ],
    counters: [
        { id: 'shorts', label: 'Shorts written', start: 0 },
        { id: 'variants', label: 'Ad variants', start: 0 },
        { id: 'flags', label: 'Lint flags', start: 0 },
        { id: 'shipped', label: 'Approved', start: 4 },
    ],
    script: [
        { from: 'router', to: 'scout', text: '6:00 AM run. Content first, then ads.' },
        { from: 'scout', to: 'shorts', text: 'Angle: the one file that keeps every output on brand.' },
        { from: 'shorts', to: 'lint', text: '7 shorts drafted.', counter: 'shorts:7' },
        { from: 'lint', to: 'lead', text: 'Humanizer, then stop-slop. 0 flags. Ready for you.' },
        { from: 'router', to: 'adsplanner', text: 'Ads cycle due. Last week’s winner attached.' },
        { from: 'adsplanner', to: 'creative', text: 'Plan locked: 3 angles, 2 audiences.' },
        { from: 'creative', to: 'evaluator', text: '100 variants rendered.', counter: 'variants:100' },
        { from: 'evaluator', to: 'lead', text: '12 pass every rule. 88 held back.' },
        { from: 'lead', to: 'memory', text: 'Approved 7 shorts and 12 ads.', counter: 'shipped:19' },
        { from: 'repurpose', to: 'designer', text: 'Yesterday’s best short is now a carousel. Needs your polish.' },
        { from: 'memory', to: 'router', text: 'Winners logged. Tomorrow starts from here.' },
    ],
};
