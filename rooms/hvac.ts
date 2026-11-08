import { RoomData } from './types';

// Example room built from the 90-Day HVAC Lead Engine (hvac-calculator/SalesPage.tsx). Not a client.
export const HVAC_ROOM: RoomData = {
    slug: 'hvac',
    title: 'Example room - HVAC company',
    wallTitle: 'HVAC lead engine',
    floor: { w: 16, h: 12 },
    zones: [
        { id: 'phones', label: 'Phones', x: 0.6, y: 0.6, w: 8.2, h: 4 },
        { id: 'revival', label: 'Quote revival', x: 9.4, y: 0.6, w: 6, h: 4 },
        { id: 'marketing', label: 'Marketing', x: 0.6, y: 5.6, w: 5.6, h: 5.8 },
        { id: 'dispatch', label: 'Dispatch', x: 6.8, y: 5.6, w: 4.4, h: 5.8 },
        { id: 'office', label: 'Back office', x: 11.8, y: 5.6, w: 3.6, h: 5.8 },
    ],
    agents: [
        {
            id: 'setter', name: 'Voice setter', role: 'Answers every call', zone: 'phones', x: 1.2, y: 1.6,
            does: 'Picks up 24/7 in your company’s voice. Nights and weekends included, which is when most emergencies happen.',
            tools: ['Vapi or Retell', 'Your voice file', 'Service area rules'],
            today: ['Answered 6 after-hours calls', 'Booked 2 emergency visits'],
        },
        {
            id: 'qualifier', name: 'Qualifier', role: 'Asks the right questions', zone: 'phones', x: 3.8, y: 1.6,
            does: 'Gets system age, symptoms and address, flags emergencies, and screens out jobs outside your area.',
            tools: ['Qualifying script', 'Claude'],
            today: ['Tagged a no-heat call as urgent', 'Screened out one out-of-area lead'],
        },
        {
            id: 'booker', name: 'Booker', role: 'Puts it on the board', zone: 'phones', x: 6.4, y: 1.6,
            does: 'Books the job straight into your field-service calendar with the notes a tech needs.',
            tools: ['ServiceTitan or Housecall Pro', 'Calendar rules'],
            today: ['Booked 4 jobs', 'Sent confirmations by text'],
        },
        {
            id: 'chaser', name: 'Quote chaser', role: 'Revives dead quotes', zone: 'revival', x: 9.8, y: 1.6,
            does: 'Works through old quotes that never went ahead, with a message and a call at the right time of year.',
            tools: ['CRM export', 'Text + voice follow-up'],
            today: ['Reopened 3 quotes from spring', 'Booked one replacement estimate'],
        },
        {
            id: 'reminder', name: 'Season reminder', role: 'Fills the slow weeks', zone: 'revival', x: 12.4, y: 1.6,
            does: 'Reminds past customers about tune-ups before the season turns, so slow weeks fill themselves.',
            tools: ['Customer list', 'Seasonal triggers'],
            today: ['Queued fall tune-up reminders'],
        },
        {
            id: 'quotebuilder', name: 'Quote builder', role: 'Captures web leads', zone: 'marketing', x: 1.4, y: 6.6,
            does: 'An instant quote tool on your website. Homeowners get a ballpark; you get a pre-qualified lead.',
            tools: ['Website widget', 'Pricing bands'],
            today: ['Captured 3 web leads overnight'],
        },
        {
            id: 'adtracker', name: 'Ad tracker', role: 'Follows the money', zone: 'marketing', x: 3.6, y: 8.8,
            does: 'Matches every booked job back to the ad that brought it in, and flags the ad sets that only bring clicks.',
            tools: ['Meta + Google Ads', 'Booked-job data'],
            today: ['Flagged an ad set with zero booked jobs'],
        },
        {
            id: 'dispatcher', name: 'Dispatcher', role: 'Person: runs the trucks', zone: 'dispatch', x: 7.6, y: 7, human: true,
            does: 'A person. Starts the day with the board already full and the urgent jobs on top.',
            tools: ['Field-service calendar'],
            today: ['Moved an emergency to the first slot'],
        },
        {
            id: 'owner', name: 'Owner', role: 'Person: makes the calls', zone: 'dispatch', x: 9.6, y: 9.2, human: true,
            does: 'A person. Gets one short morning report and only the decisions that need an owner.',
            tools: ['Morning report'],
            today: ['Paused an ad set the tracker flagged'],
        },
        {
            id: 'skills', name: 'Skills writer', role: 'Gets better every week', zone: 'office', x: 12.6, y: 6.6,
            does: 'Notices questions the agents keep getting and writes a new skill for them. Month two costs less than month one.',
            tools: ['Skill files', 'Call transcripts'],
            today: ['Wrote a skill for warranty questions'],
        },
        {
            id: 'voicefile', name: 'Voice keeper', role: 'Keeps it sounding like you', zone: 'office', x: 12.6, y: 9.2,
            does: 'Maintains your voice file and banned-word list, and lints every message before it goes out.',
            tools: ['Voice file', 'Lint stack'],
            today: ['Blocked a text that sounded like a robot'],
        },
    ],
    counters: [
        { id: 'calls', label: 'After-hours calls', start: 0 },
        { id: 'jobs', label: 'Jobs booked', start: 3 },
        { id: 'quotes', label: 'Quotes revived', start: 0 },
        { id: 'paused', label: 'Ad sets paused', start: 0 },
    ],
    script: [
        { from: 'setter', to: 'qualifier', text: '11:40 PM. No heat, two kids at home.', counter: 'calls:1' },
        { from: 'qualifier', to: 'booker', text: 'Urgent. Furnace is 14 years old. In service area.' },
        { from: 'booker', to: 'dispatcher', text: 'Booked first slot, 7:30 AM. Notes attached.', counter: 'jobs:1' },
        { from: 'quotebuilder', to: 'qualifier', text: 'Web lead: AC replacement ballpark, 3-bed house.' },
        { from: 'chaser', to: 'booker', text: 'April quote said yes on the second call. Estimate booked.', counter: 'quotes:1' },
        { from: 'adtracker', to: 'owner', text: 'Ad set "Summer AC" spent $410 this week. Zero booked jobs.' },
        { from: 'owner', to: 'adtracker', text: 'Pause it.', counter: 'paused:1' },
        { from: 'reminder', to: 'voicefile', text: 'Fall tune-up texts drafted for 220 past customers.' },
        { from: 'voicefile', to: 'reminder', text: 'Two lines rewritten. Sounds like you now.' },
        { from: 'skills', to: 'setter', text: 'New skill: answering warranty questions.' },
    ],
};
