// The demo dashboards and the real builds, shared by the /demos index and the homepage orbit.
export type Showcase = { slug: string; href: string; name: string; tag: string; line: string; look?: string; image?: string; thumb?: string; short: string; runs: string };

export const DEMOS: Showcase[] = [
    { slug: 'hvac', short: 'Copperjack', runs: 'Dispatch, the after-hours front desk and quote follow-up.', thumb: '/demo-shots/hvac-sm.jpg', href: '/demos/hvac', tag: 'Home services', name: 'Copperjack Dispatch', line: 'A heating and air shop’s dispatch board. Today’s jobs on a map, five trucks, the calls the AI front desk took overnight and the old quotes it is chasing.', look: 'Dark console, three columns', image: '/demo-shots/hvac.jpg' },
    { slug: 'roofing', short: 'Slatewing', runs: 'Storm leads, insurance claims, crews and material orders.', thumb: '/demo-shots/roofing-sm.jpg', href: '/demos/roofing', tag: 'Roofing', name: 'Slatewing Storm Desk', line: 'Three days after a hail storm. Leads coming in, insurance claims moving across a board, crews on roofs and materials on order.', look: 'Claims board with an icon rail', image: '/demo-shots/roofing.jpg' },
    { slug: 'law', short: 'Marlowe Tennant', runs: 'Intake scoring, drafts, deadlines and billable hours.', thumb: '/demo-shots/law-sm.jpg', href: '/demos/law', tag: 'Law firm', name: 'Chambers', line: 'A litigation firm’s morning desk. Enquiries scored by the intake agent, drafts waiting for a partner, deadlines and billable hours.', look: 'Serif, split reading pane', image: '/demo-shots/law.jpg' },
    { slug: 'medspa', short: 'Oriel House', runs: 'Appointments, rebooking, win-backs and reviews.', thumb: '/demo-shots/medspa-sm.jpg', href: '/demos/medspa', tag: 'Med spa', name: 'Oriel House Concierge', line: 'An aesthetics clinic’s day. Three providers’ appointments, the rebooking agent, lapsed clients to win back, revenue and reviews.', look: 'Soft sidebar app, day calendar', image: '/demo-shots/medspa.jpg' },
    { slug: 'agency', short: 'Half Column', runs: 'Accounts, the content calendar, ad spend and approvals.', thumb: '/demo-shots/agency-sm.jpg', href: '/demos/agency', tag: 'Marketing agency', name: 'The Desk', line: 'A content agency laid out like a front page. Six accounts, the week’s calendar, ad spend against return and the content engine’s queue.', look: 'Magazine front page', image: '/demo-shots/agency.jpg' },
];

export const REAL: Showcase[] = [
    { slug: 'shang', short: 'Shang', runs: 'A real estate sales team’s console and content desk.', href: '/work/shang', tag: 'Real estate', name: 'Shang case study and demo', line: 'Real estate. Thirteen desks, two of them people.' },
    { slug: 'caelum', short: 'Caelum', runs: 'An insurance agency’s lead engine.', href: '/work/caelum', tag: 'Insurance', name: 'Caelum', line: 'Insurance. Leads found and openers drafted before the day starts.' },
    { slug: 'hq', short: 'GYST HQ', runs: 'How GYST runs itself, on the same kind of console.', href: '/hq', tag: 'GYST', name: 'GYST HQ', line: 'How GYST runs itself, on the same kind of console.' },
    { slug: 'calculator', short: 'Calculator', runs: 'Shows an HVAC shop the leads it is losing.', href: '/find-leaks', tag: 'HVAC', name: 'HVAC lead calculator', line: 'Four questions and a dollar figure for the leads a shop is losing.' },
];
