import { FeedLine } from '../shared';

export const STAGES = ['Inspected', 'Claim filed', 'Adjuster meeting', 'Approved', 'Build scheduled'];
export type Claim = { id: string; name: string; addr: string; carrier: string; amount: number; stage: number; days: number; rep: string; squares: number; flag?: string; note: string };
export const CLAIMS: Claim[] = [
    { id: 'c1', name: 'Rosa Delgado', addr: '2207 Pinecrest Ct', carrier: 'Tallgrass Mutual', amount: 18400, stage: 4, days: 1, rep: 'Cole', squares: 31, flag: 'Rain on build day', note: 'Tear-off is set for Monday. Forecast is 80% rain. Scheduler has a Tuesday slot with the same crew.' },
    { id: 'c2', name: 'Gary Whitlow', addr: '418 Larkspur Ln', carrier: 'Harborline', amount: 14950, stage: 3, days: 2, rep: 'Jess', squares: 26, flag: 'Supplement: +$2,318', note: 'The adjuster’s estimate left out drip edge and two pipe boots. Photos and the line items are attached to a supplement.' },
    { id: 'c3', name: 'Anita Bhatt', addr: '96 Dunmore Rd', carrier: 'Tallgrass Mutual', amount: 22100, stage: 3, days: 1, rep: 'Cole', squares: 38, note: 'Approved in full on the first pass. She picked the weathered slate colour from the sample board.' },
    { id: 'c4', name: 'Marcus Lund', addr: '730 Hazel Run', carrier: 'Summit & Vale', amount: 16800, stage: 4, days: 0, rep: 'Jess', squares: 29, note: 'Materials landed at 6:50 this morning. Crew Delta starts at 9:00.' },
    { id: 'c5', name: 'Joy Okafor', addr: '1512 Marrow Creek Dr', carrier: 'Harborline', amount: 19700, stage: 2, days: 3, rep: 'Cole', squares: 34, flag: 'Adjuster today, 2:00', note: 'Cole will be on the roof with the adjuster. The photo report and test square counts are printed in the truck.' },
    { id: 'c6', name: 'Derek Sands', addr: '88 Tannery Row', carrier: 'Summit & Vale', amount: 12300, stage: 2, days: 6, rep: 'Priya', squares: 21, flag: 'Stuck 6 days', note: 'The adjuster has not confirmed a date. Claims Agent has called twice and emailed the desk supervisor.' },
    { id: 'c7', name: 'Helen Voss', addr: '3041 Quill St', carrier: 'Tallgrass Mutual', amount: 24600, stage: 2, days: 2, rep: 'Jess', squares: 42, note: 'Adjuster meeting is Monday at 10:00. Steep pitch, so two people are booked.' },
    { id: 'c8', name: 'Sam Castillo', addr: '655 Alder Bend', carrier: 'Harborline', amount: 15200, stage: 1, days: 1, rep: 'Priya', squares: 27, note: 'Claim filed from the driveway with the homeowner on the phone. Claim number came back in 11 minutes.' },
    { id: 'c9', name: 'Lorraine Petty', addr: '17 Fox Hollow', carrier: 'Tallgrass Mutual', amount: 17900, stage: 1, days: 2, rep: 'Cole', squares: 30, note: 'Waiting for the carrier to assign an adjuster. Claims Agent checks the portal every morning.' },
    { id: 'c10', name: 'Ian Brewer', addr: '920 Stonegate Ave', carrier: 'Summit & Vale', amount: 13600, stage: 1, days: 4, rep: 'Priya', squares: 23, flag: 'Carrier asked for photos', note: 'The carrier asked for close-ups of the ridge. Drone photos were sent at 7:12 this morning.' },
    { id: 'c11', name: 'Tanya Morrow', addr: '1290 Wicker Park Rd', carrier: 'Harborline', amount: 20300, stage: 0, days: 0, rep: 'Jess', squares: 35, note: 'Inspected yesterday. 11 hits in the test square and cracked ridge caps. Estimate is in the batch waiting on you.' },
    { id: 'c12', name: 'Paul Ennis', addr: '44 Cedar Loop', carrier: 'Tallgrass Mutual', amount: 11800, stage: 0, days: 0, rep: 'Cole', squares: 19, note: 'Inspected yesterday. Damage on the north slope only. Estimate is in the batch waiting on you.' },
    { id: 'c13', name: 'Mei-Lin Zhao', addr: '508 Birchfield Way', carrier: 'Summit & Vale', amount: 26400, stage: 0, days: 1, rep: 'Priya', squares: 44, flag: 'Solar on roof', note: 'Panels need to come off and go back on. The solar company’s quote has been requested for the claim.' },
];

export const CREWS = [
    { name: 'Alpha', lead: 'Hector R.', job: '2207 Pinecrest Ct', task: 'Decking repair, then underlayment', done: 18, of: 31 },
    { name: 'Bravo', lead: 'Dwayne P.', job: '418 Larkspur Ln', task: 'Shingles, last two slopes', done: 22, of: 26 },
    { name: 'Charlie', lead: 'Tomasz K.', job: '96 Dunmore Rd', task: 'Gutters and magnet sweep', done: 38, of: 38 },
    { name: 'Delta', lead: 'Andre W.', job: '730 Hazel Run', task: 'Starts at 9:00. Materials on site', done: 0, of: 29 },
];

export const ORDERS = [
    { what: '29 sq architectural shingles, charcoal', job: '730 Hazel Run', state: 'Delivered 6:50 AM', tone: 'ok' },
    { what: '38 sq architectural shingles, weathered slate', job: '96 Dunmore Rd', state: 'On the truck, due Monday 7:00', tone: 'ok' },
    { what: 'Ridge vent, 120 ft', job: '418 Larkspur Ln', state: 'Delivered yesterday', tone: 'ok' },
    { what: 'Synthetic underlayment, 14 rolls', job: 'Shop stock', state: 'Ordered, arrives Tuesday', tone: 'wait' },
    { what: '42 sq designer shingles, driftwood', job: '3041 Quill St', state: 'Backordered 9 days. A match is in stock', tone: 'bad' },
];

export const LEADS = { days: [['Tue', 38], ['Wed', 74], ['Thu', 61], ['Fri', 39]] as [string, number][], sources: [['Door knocks', 71], ['Website', 58], ['AI phone desk', 49], ['Referrals', 34]] as [string, number][] };

export const DECISIONS = [
    { id: 'r1', agent: 'Scheduler', title: 'Move the Delgado tear-off to Tuesday', why: 'Monday is 80% rain. Crew Alpha is free on Tuesday and the dumpster can stay. Rosa prefers a text.', done: 'Delgado build moved to Tuesday. Rosa has been texted.' },
    { id: 'r2', agent: 'Claims', title: 'Send the Whitlow supplement: +$2,318', why: 'The adjuster missed drip edge and two pipe boots. Photos and line items are attached.', done: 'Supplement sent to Harborline with 6 photos.' },
    { id: 'r3', agent: 'Estimator', title: 'Send 9 estimates from yesterday’s inspections', why: 'Measured from drone photos and checked against the price book. $148,600 in total.', done: '9 estimates sent. Follow-up is set for 48 hours.' },
];

export const FEED: FeedLine[] = [
    { who: 'Claims', text: 'Sent ridge close-ups to Summit & Vale for the Brewer claim.' },
    { who: 'Front Desk', text: 'Booked an inspection on Fox Hollow for Saturday at 10:30.' },
    { who: 'Parts', text: 'Confirmed the Hazel Run delivery landed at 6:50.' },
    { who: 'Storm Scout', text: 'Built three door-knock routes through the 6-block area hit hardest.' },
    { who: 'Estimator', text: 'Measured 508 Birchfield Way: 44 squares, 8/12 pitch.' },
    { who: 'Front Desk', text: 'Answered a call in two rings. Leak over a garage, inspection booked for 1:00.' },
    { who: 'Follow-up', text: 'Texted Paul Ennis a financing option with his estimate.' },
    { who: 'Claims', text: 'Harborline assigned an adjuster to the Castillo claim.' },
    { who: 'Scheduler', text: 'Asked the dumpster company to hold the Pinecrest bin until Wednesday.' },
    { who: 'Reviews', text: 'Asked Anita Bhatt for a review after her colour pick. She said yes.' },
];
