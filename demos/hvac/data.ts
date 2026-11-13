import { FeedLine } from '../shared';

export type JobStatus = 'done' | 'onsite' | 'enroute' | 'scheduled';
export type Job = {
    id: string;
    win: string;
    cust: string;
    addr: string;
    area: string;
    type: string;
    truck: number;
    status: JobStatus;
    value: number;
    x: number;
    y: number;
    brain: string;
    log: [string, string][];
};

export const STATUS: Record<JobStatus, { label: string; color: string }> = {
    onsite: { label: 'On site', color: '#3DDC84' },
    enroute: { label: 'En route', color: '#4DA3FF' },
    scheduled: { label: 'Scheduled', color: '#8795A1' },
    done: { label: 'Done', color: '#55626E' },
};

export const JOBS: Job[] = [
    { id: 'J-4821', win: '7:30 - 9:30', cust: 'Darlene Whitaker', addr: '4418 Juniper Ridge Rd', area: 'Cedar Fork', type: 'No heat - furnace ignitor', truck: 1, status: 'done', value: 389, x: 148, y: 96, brain: 'Comfort Club member since 2019. Dog in the yard, text before arrival. 16 year old 80k BTU gas furnace.', log: [['5:12 AM', 'Front Desk took the call. Furnace clicking, no flame.'], ['5:14 AM', 'Booked into the first window and texted a confirmation.'], ['9:02 AM', 'Marcus closed the job. Invoice paid by card.']] },
    { id: 'J-4822', win: '8:00 - 10:00', cust: 'Tom Sandoval', addr: '907 Old Mill Ct', area: 'Harlan Park', type: 'Duct sealing - upstairs zone', truck: 3, status: 'done', value: 4150, x: 596, y: 118, brain: 'Quoted 23 days ago and went quiet. Quote Chaser sent two texts. He said yes on Tuesday.', log: [['Tue 6:40 PM', 'Quote Chaser got a yes by text.'], ['Tue 6:41 PM', 'Dispatcher held Truck 3 for a full morning.'], ['10:48 AM', 'Dana finished. Before and after static pressure saved to the file.']] },
    { id: 'J-4823', win: '9:00 - 11:00', cust: 'Angela Brooks', addr: '2261 Sycamore Bend', area: 'Westgate', type: 'No heat - inducer motor', truck: 2, status: 'onsite', value: 612, x: 232, y: 262, brain: 'Second no-heat call this season. System is 19 years old. Flag for a replacement quote.', log: [['11:38 PM', 'Front Desk answered on the second ring and booked the 9:00 window.'], ['7:10 AM', 'Parts Runner confirmed the inducer motor is on Truck 2.'], ['9:21 AM', 'Luis arrived. Customer got an on-my-way text at 9:05.']] },
    { id: 'J-4824', win: '9:30 - 11:30', cust: 'Okafor residence', addr: '318 Lantern Hill Dr', area: 'Harlan Park', type: 'Heat pump estimate', truck: 4, status: 'onsite', value: 7840, x: 652, y: 208, brain: 'Asked for options at three price points. Prefers email over phone. Power company rebate applies.', log: [['Mon 2:15 PM', 'Front Desk booked the estimate from a web form.'], ['8:50 AM', 'Estimator pulled the load calc from the 2021 visit.'], ['10:04 AM', 'Bobby is measuring. Draft quote is waiting on you.']] },
    { id: 'J-4825', win: '10:00 - 12:00', cust: 'Pinecrest Animal Clinic', addr: '1500 Route 9', area: 'Millbrook', type: 'Rooftop unit - quarterly PM', truck: 5, status: 'enroute', value: 540, x: 420, y: 342, brain: 'Commercial contract, four visits a year. Roof hatch key is at the front desk. Invoice goes to the practice manager.', log: [['Fri 9:00 AM', 'Scheduler placed the quarterly visit.'], ['10:12 AM', 'Dispatcher routed Truck 5 around the bridge closure. Saves 14 minutes.']] },
    { id: 'J-4826', win: '11:00 - 1:00', cust: 'Wes Hartigan', addr: '77 Quarry Lane', area: 'Cedar Fork', type: 'Thermostat swap + wiring', truck: 1, status: 'enroute', value: 285, x: 96, y: 176, brain: 'New build, first visit. Bought a smart thermostat online and needs a C-wire run.', log: [['6:12 AM', 'Front Desk booked it from a missed call it returned by text.'], ['10:31 AM', 'Marcus is 9 minutes out.']] },
    { id: 'J-4827', win: '12:00 - 2:00', cust: 'Hendricks residence', addr: '5120 Barlow Station Rd', area: 'Millbrook', type: 'Furnace + AC install, day 1', truck: 3, status: 'scheduled', value: 11260, x: 508, y: 286, brain: 'Equipment arrived a day early. Two-person crew. Financing approved for 60 months.', log: [['Yesterday', 'Supplier confirmed delivery. Parts Runner checked the order line by line.'], ['7:02 AM', 'Dispatcher proposed starting today. Waiting on you.']] },
    { id: 'J-4828', win: '1:00 - 3:00', cust: 'Marisol Ibarra', addr: '640 Fenner Ave', area: 'Westgate', type: 'Tune-up - Comfort Club', truck: 2, status: 'scheduled', value: 129, x: 300, y: 186, brain: 'Third year as a member. Filter size 16x25x4. Always asks for Luis.', log: [['Mon 8:00 AM', 'Member Agent sent the yearly reminder. She picked today.']] },
    { id: 'J-4829', win: '2:00 - 4:00', cust: 'Greer & Sons Hardware', addr: '12 Depot St', area: 'Old Town', type: 'Unit heater not firing', truck: 5, status: 'scheduled', value: 475, x: 404, y: 148, brain: 'Shop floor heater, 20 ft ceiling. Bring the tall ladder. Net 15 terms.', log: [['4:47 AM', 'Front Desk took the call from the owner opening up.'], ['4:49 AM', 'Booked the afternoon after he passed on the emergency rate.']] },
    { id: 'J-4830', win: '3:00 - 5:00', cust: 'Renee Castellano', addr: '2909 Wren Hollow', area: 'Harlan Park', type: 'Humidifier install', truck: 4, status: 'scheduled', value: 890, x: 700, y: 316, brain: 'Added on after last week’s tune-up. Tech noted dry air and static shocks.', log: [['Last Thu', 'Luis flagged it on the tune-up checklist.'], ['Last Thu', 'Quote sent before he left the driveway. Signed that night.']] },
];

export type Truck = { n: number; tech: string; x: number; y: number; state: string; tone: JobStatus | 'shop'; next: string };
export const TRUCKS: Truck[] = [
    { n: 1, tech: 'Marcus Tate', x: 176, y: 138, state: 'En route to Quarry Lane', tone: 'enroute', next: '9 min out' },
    { n: 2, tech: 'Luis Ortega', x: 244, y: 250, state: 'On site, Sycamore Bend', tone: 'onsite', next: '48 min on the clock' },
    { n: 3, tech: 'Dana Kowalczyk', x: 455, y: 250, state: 'At the shop, loading the Hendricks install', tone: 'shop', next: 'Rolls at 11:40' },
    { n: 4, tech: 'Bobby Reyes', x: 664, y: 198, state: 'On site, Lantern Hill Dr', tone: 'onsite', next: 'Estimate in progress' },
    { n: 5, tech: 'Priya Nair', x: 372, y: 276, state: 'En route to Pinecrest Animal Clinic', tone: 'enroute', next: '6 min out' },
];

export const CALLS: { time: string; who: string; why: string; outcome: string; tone: 'booked' | 'urgent' | 'info' }[] = [
    { time: '11:38 PM', who: 'Angela Brooks', why: 'No heat, house at 58 degrees', outcome: 'Booked 9:00 - 11:00', tone: 'booked' },
    { time: '1:07 AM', who: 'Unknown caller', why: 'Smell of gas near the furnace', outcome: 'Told to leave the house and call the gas utility. On-call tech paged.', tone: 'urgent' },
    { time: '4:47 AM', who: 'Greer & Sons Hardware', why: 'Shop heater not firing', outcome: 'Booked 2:00 - 4:00', tone: 'booked' },
    { time: '5:12 AM', who: 'Darlene Whitaker', why: 'Furnace clicks, no flame', outcome: 'Booked 7:30 - 9:30', tone: 'booked' },
    { time: '6:12 AM', who: 'Wes Hartigan', why: 'Missed call, returned by text', outcome: 'Booked 11:00 - 1:00', tone: 'booked' },
    { time: '6:40 AM', who: 'Paul Dearborn', why: 'Asked what a tune-up costs', outcome: 'Quoted $129, sent the Comfort Club link', tone: 'info' },
];

export const QUOTES: { id: string; cust: string; job: string; amount: number; age: number; touch: string; state: string; tone: 'won' | 'warm' | 'cold' }[] = [
    { id: 'Q-1182', cust: 'Tom Sandoval', job: 'Duct sealing', amount: 4150, age: 23, touch: 'Text 2, Tuesday', state: 'Won, on the board today', tone: 'won' },
    { id: 'Q-1190', cust: 'Yolanda Pruitt', job: 'Full system replacement', amount: 12480, age: 17, touch: 'Text 2, yesterday', state: 'Replied: wants the financing numbers', tone: 'warm' },
    { id: 'Q-1176', cust: 'Kessler Dental', job: 'Mini split, server closet', amount: 5300, age: 31, touch: 'Email 3, Monday', state: 'Opened twice, no reply', tone: 'cold' },
    { id: 'Q-1201', cust: 'Ben Achterberg', job: 'Whole-home humidifier', amount: 890, age: 9, touch: 'Text 1, today', state: 'Replied: can you do Friday?', tone: 'warm' },
    { id: 'Q-1169', cust: 'Lorraine Fitch', job: 'Heat pump + air handler', amount: 14900, age: 44, touch: 'Call script, last week', state: 'No reply. One more try, then park it', tone: 'cold' },
];

export const DECISIONS = [
    { id: 'd1', agent: 'Dispatcher', title: 'Start the Hendricks install today at noon', why: 'The equipment landed a day early and Truck 3 is free after the duct job. Finishes Thursday, not Friday.', done: 'Hendricks install moved to today. Customer texted.' },
    { id: 'd2', agent: 'Estimator', title: 'Send the Okafor heat pump quote: $7,840', why: 'Three options built from Bobby’s measurements. Middle option carries a 41% margin and the power company rebate.', done: 'Okafor quote sent by email with three options.' },
    { id: 'd3', agent: 'Quote Chaser', title: 'Text the $129 tune-up offer to 46 older systems', why: 'First hard freeze is Thursday night. These customers have furnaces over 12 years old and no visit this year.', done: 'Tune-up offer queued for 46 customers at 4:00 PM.' },
];

export const FEED: FeedLine[] = [
    { who: 'Dispatcher', text: 'Routed Truck 5 around the bridge closure. Saves 14 minutes.' },
    { who: 'Front Desk', text: 'Answered in two rings. Thermostat question, no truck needed.' },
    { who: 'Invoicer', text: 'Sent invoice 20418 to Tom Sandoval for $4,150.' },
    { who: 'Review Agent', text: 'Asked Darlene Whitaker for a review. She left five stars.' },
    { who: 'Front Desk', text: 'Booked a no-heat call for tomorrow, 8:00 - 10:00, in Westgate.' },
    { who: 'Parts Runner', text: 'Ordered two flame sensors. Truck 2 stock was down to one.' },
    { who: 'Quote Chaser', text: 'Ben Achterberg replied. Holding Friday 1:00 - 3:00 for him.' },
    { who: 'Dispatcher', text: 'Texted Wes Hartigan: Marcus is 9 minutes out.' },
    { who: 'Member Agent', text: 'Renewed three Comfort Club plans that were due this week.' },
    { who: 'Front Desk', text: 'Took a message for Ray from the supply house rep.' },
    { who: 'Invoicer', text: 'Card on file charged for Pinecrest Animal Clinic, $540.' },
];
