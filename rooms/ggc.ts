import { RoomData } from './types';

// GGC dance studio. Recital campaign + page are shipped; payouts and offer creator are planned.
export const GGC_ROOM: RoomData = {
    slug: 'ggc',
    title: 'GGC - dance studio',
    wallTitle: 'GGC studio',
    floor: { w: 16, h: 12 },
    zones: [
        { id: 'front', label: 'Front desk', x: 0.6, y: 0.6, w: 8.2, h: 4 },
        { id: 'campaign', label: 'Recital campaign', x: 9.4, y: 0.6, w: 6, h: 4 },
        { id: 'content', label: 'Content', x: 0.6, y: 5.6, w: 5.6, h: 5.8 },
        { id: 'studio', label: 'Studio', x: 6.8, y: 5.6, w: 4.4, h: 5.8 },
        { id: 'finance', label: 'Finance', x: 11.8, y: 5.6, w: 3.6, h: 5.8 },
    ],
    agents: [
        {
            id: 'replier', name: 'Inquiry replier', role: 'Answers parents fast', zone: 'front', x: 1.2, y: 1.6,
            does: 'Answers class, age and schedule questions in minutes, in the studio’s voice.',
            tools: ['Class schedule', 'Studio voice file'],
            today: ['Answered 9 parent messages'],
        },
        {
            id: 'trial', name: 'Trial booker', role: 'Books the first class', zone: 'front', x: 3.8, y: 1.6,
            does: 'Offers the right trial class for the child’s age and books it.',
            tools: ['Booking calendar'],
            today: ['Booked 3 trial classes'],
        },
        {
            id: 'enrol', name: 'Enrolment chaser', role: 'Turns trials into students', zone: 'front', x: 6.4, y: 1.6,
            does: 'Follows up after each trial class while the excitement is still there.',
            tools: ['Follow-up sequence'],
            today: ['Sent post-trial follow-ups'],
        },
        {
            id: 'sequencer', name: 'Campaign sequencer', role: 'Runs the recital push', zone: 'campaign', x: 9.8, y: 1.6,
            does: 'Runs the recital campaign in order: tease, enrol, countdown.',
            tools: ['GoHighLevel', 'Campaign calendar'],
            today: ['Sent the 14-day countdown email'],
        },
        {
            id: 'recitalpage', name: 'Recital page', role: 'Sells the seats', zone: 'campaign', x: 12.4, y: 1.6,
            does: 'The recital landing page, with a QR code on the LED screen that points straight to it.',
            tools: ['Landing page', 'QR redirect with tracking'],
            today: ['Logged 41 QR scans'],
        },
        {
            id: 'carousel', name: 'Carousel maker', role: 'Shows the studio', zone: 'content', x: 1.4, y: 6.6,
            does: 'Turns rehearsal moments into posts in the studio’s own look.',
            tools: ['Carousel skill', 'Studio brand file'],
            today: ['Made a rehearsal carousel'],
        },
        {
            id: 'offers', name: 'Offer creator', role: 'Workshops and merch', zone: 'content', x: 3.6, y: 8.8, status: 'in-build',
            does: 'Turns studio ideas into offers: workshops, intensives, merch. Planned.',
            tools: ['Offer framework'],
            today: ['Planned'],
        },
        {
            id: 'director', name: 'Studio director', role: 'Person: runs the studio', zone: 'studio', x: 7.6, y: 7, human: true,
            does: 'A person. Approves campaigns and offers, and gets the numbers without chasing them.',
            tools: ['Morning report'],
            today: ['Approved the countdown email'],
        },
        {
            id: 'teachers', name: 'Teachers', role: 'People: teach', zone: 'studio', x: 9.6, y: 9.2, human: true,
            does: 'People. Teach the classes. The agents keep the admin off their plate.',
            tools: ['Class roster'],
            today: ['Taught 14 classes'],
        },
        {
            id: 'payouts', name: 'Payout counter', role: 'Pays per class taught', zone: 'finance', x: 12.6, y: 7.4, status: 'in-build',
            does: 'Counts classes taught per teacher and drafts payouts, so payroll stops being a weekend spreadsheet. Planned.',
            tools: ['Class roster', 'Payout rules'],
            today: ['Planned'],
        },
    ],
    counters: [
        { id: 'replies', label: 'Parents answered', start: 0 },
        { id: 'trials', label: 'Trials booked', start: 0 },
        { id: 'scans', label: 'QR scans', start: 0 },
        { id: 'posts', label: 'Posts ready', start: 1 },
    ],
    script: [
        { from: 'replier', to: 'trial', text: 'Parent asks: ballet for a 6-year-old, weekends?', counter: 'replies:1' },
        { from: 'trial', to: 'enrol', text: 'Booked Saturday 10 AM trial.', counter: 'trials:1' },
        { from: 'sequencer', to: 'director', text: 'Countdown email ready: 14 days to the recital.' },
        { from: 'director', to: 'sequencer', text: 'Approved. Send it.' },
        { from: 'recitalpage', to: 'sequencer', text: '41 scans from the LED screen QR tonight.', counter: 'scans:41' },
        { from: 'carousel', to: 'director', text: 'Rehearsal carousel ready for approval.', counter: 'posts:1' },
        { from: 'enrol', to: 'director', text: 'Two trial families enrolled for next term.' },
        { from: 'teachers', to: 'payouts', text: 'This week’s classes logged.' },
    ],
};
