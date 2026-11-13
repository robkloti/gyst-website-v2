import { FeedLine } from '../shared';

export const PROVIDERS = [
    { name: 'Dr. Elena Marsh', role: 'Injector', soft: '#F8E4DF', ink: '#A65F56' },
    { name: 'Jade Sorensen', role: 'Aesthetician', soft: '#E4EEE1', ink: '#58795A' },
    { name: 'Noor Haddad', role: 'Laser', soft: '#ECE6F4', ink: '#72608F' },
];

export type ApptStatus = 'done' | 'in' | 'arrived' | 'confirmed' | 'open';
export const STATUS: Record<ApptStatus, string> = { done: 'Complete', in: 'In treatment', arrived: 'Arrived', confirmed: 'Confirmed', open: 'Open' };

export type Appt = { id: string; p: number; start: number; dur: number; client: string; tx: string; price: number; status: ApptStatus; visits: number; ltv: number; pref: string; plan: string };
export const APPTS: Appt[] = [
    { id: 'a1', p: 0, start: 9, dur: 0.5, client: 'Margaux Bell', tx: 'Neurotoxin, 40 units', price: 520, status: 'done', visits: 11, ltv: 6840, pref: 'Likes the first slot of the day. Prefers a text over a call.', plan: 'Next visit is due the week of 9 February. A reminder goes out on 26 January with her usual Friday 9:00.' },
    { id: 'a2', p: 0, start: 9.75, dur: 1, client: 'Sienna Park', tx: 'Lip filler, 1 syringe', price: 750, status: 'done', visits: 3, ltv: 1890, pref: 'Nervous with needles. Numbing cream 20 minutes ahead.', plan: 'Two week check-in booked for 27 November. Aftercare sent at checkout.' },
    { id: 'a3', p: 0, start: 11, dur: 0.75, client: 'Olivia Hart', tx: 'Neurotoxin, 52 units', price: 676, status: 'in', visits: 8, ltv: 5120, pref: 'Member. Asks about skincare every visit and buys the vitamin C serum.', plan: 'Rebooking Agent will offer 12 February before she leaves the room.' },
    { id: 'a4', p: 0, start: 12.5, dur: 0.5, client: 'Tessa Nguyen', tx: 'New client consultation', price: 0, status: 'confirmed', visits: 0, ltv: 0, pref: 'Found the clinic through a friend, Imani Brooks. Interested in under-eye filler.', plan: 'Intake form is complete. Referral credit for Imani is ready if Tessa books.' },
    { id: 'a5', p: 0, start: 14, dur: 1, client: 'Imani Brooks', tx: 'Cheek filler, 2 syringes', price: 1500, status: 'confirmed', visits: 6, ltv: 7450, pref: 'Books around school pickup. Out by 3:10 at the latest.', plan: 'Reminder confirmed this morning. Photos from the May visit are on the chart.' },
    { id: 'a6', p: 0, start: 15.5, dur: 0.5, client: 'Paige Lowell', tx: 'Neurotoxin touch-up', price: 180, status: 'confirmed', visits: 4, ltv: 2260, pref: 'Two week follow-up from 30 October.', plan: 'If no touch-up is needed, the visit closes with no charge.' },
    { id: 'b1', p: 1, start: 9.5, dur: 1, client: 'Ruth Adeyemi', tx: 'Hydrating facial', price: 195, status: 'done', visits: 14, ltv: 3310, pref: 'Monthly member. Unscented products only.', plan: 'December facial is already booked for the 11th.' },
    { id: 'b2', p: 1, start: 11, dur: 1, client: 'Carmen Vidal', tx: 'Microneedling, session 2 of 3', price: 350, status: 'in', visits: 5, ltv: 2080, pref: 'Package of three. Getting married on 17 January.', plan: 'Session 3 is held for 11 December, so her skin has five weeks before the wedding.' },
    { id: 'b3', p: 1, start: 13, dur: 0.75, client: 'Lena Fischer', tx: 'Dermaplaning', price: 140, status: 'confirmed', visits: 2, ltv: 335, pref: 'Second visit. Asked about a membership last time.', plan: 'Front desk has the membership card ready to walk through.' },
    { id: 'b4', p: 1, start: 14.5, dur: 1, client: 'Open slot', tx: 'Cancelled at 10:52', price: 0, status: 'open', visits: 0, ltv: 0, pref: '', plan: '' },
    { id: 'b5', p: 1, start: 16, dur: 1, client: 'Yara Mansour', tx: 'Chemical peel', price: 225, status: 'confirmed', visits: 7, ltv: 2940, pref: 'Sensitive skin. Patch test on file from March.', plan: 'Aftercare kit is packed and on the shelf with her name.' },
    { id: 'c1', p: 2, start: 10, dur: 0.5, client: 'Bea Collins', tx: 'Laser hair removal, underarm', price: 120, status: 'done', visits: 4, ltv: 720, pref: 'Session 4 of 6.', plan: 'Session 5 booked for 18 December.' },
    { id: 'c2', p: 2, start: 10.75, dur: 1, client: 'Hannah Kessler', tx: 'IPL photofacial', price: 380, status: 'in', visits: 3, ltv: 1140, pref: 'Left a 3 star review after a long wait in October.', plan: 'Seen 5 minutes early today. A reply to her review is waiting on you.' },
    { id: 'c3', p: 2, start: 12, dur: 0.75, client: 'Dani Rossi', tx: 'Laser hair removal, lower leg', price: 260, status: 'arrived', visits: 2, ltv: 520, pref: 'Arrives early. Likes the mint tea.', plan: 'Checked in at 11:14 from the text link.' },
    { id: 'c4', p: 2, start: 13.5, dur: 1, client: 'Mei Tanaka', tx: 'Skin resurfacing', price: 640, status: 'confirmed', visits: 9, ltv: 6210, pref: 'Drives 40 minutes. Never book her before 1:00.', plan: 'Numbing instructions were texted at 9:00.' },
    { id: 'c5', p: 2, start: 15, dur: 0.75, client: 'Aria Petrovic', tx: 'Laser hair removal, bikini', price: 180, status: 'confirmed', visits: 5, ltv: 900, pref: 'Session 5 of 6.', plan: 'Rebooking Agent will offer the last session before she leaves.' },
];

export const REBOOK = [
    { id: 'r1', name: 'Margaux Bell', last: 'Neurotoxin, today', due: 'Week of 9 Feb', state: 'Booked Fri 13 Feb, 9:00', ok: true },
    { id: 'r2', name: 'Sienna Park', last: 'Lip filler, today', due: '27 Nov check-in', state: 'Booked Fri 27 Nov, 10:15', ok: true },
    { id: 'r3', name: 'Joelle Abrams', last: 'Chemical peel, Tuesday', due: 'Early December', state: 'Left without booking', ok: false },
    { id: 'r4', name: 'Kirsten Vance', last: 'Neurotoxin, Monday', due: 'Mid February', state: 'Left without booking', ok: false },
    { id: 'r5', name: 'Priscilla Okoye', last: 'Microneedling, Monday', due: 'Session 2, 8 Dec', state: 'Replied: “any Saturdays?”', ok: false },
];

export const LAPSED = [
    { id: 'l1', name: 'Dana Whitcombe', away: '7 months', ltv: 4980, note: 'Used to come every 12 weeks for neurotoxin.' },
    { id: 'l2', name: 'Fiona Castellanos', away: '6 months', ltv: 3420, note: 'Two of three laser sessions used. One is still paid for.' },
    { id: 'l3', name: 'Rachel Lindqvist', away: '9 months', ltv: 2760, note: 'Moved offices. Asked for evening slots last time.' },
    { id: 'l4', name: 'Amelia Stroud', away: '5 months', ltv: 2150, note: 'Membership paused in June.' },
];

export const REVENUE = [
    { name: 'Injectables', amount: 14820, color: '#B8736A' },
    { name: 'Laser', amount: 8460, color: '#8E7BAA' },
    { name: 'Facials and peels', amount: 5310, color: '#8FA58C' },
    { name: 'Skincare retail', amount: 3190, color: '#C9A877' },
    { name: 'Memberships', amount: 2640, color: '#D9B9B2' },
];

export const REVIEWS = [
    { name: 'Ruth A.', stars: 5, text: 'Jade remembers everything about my skin. I have not found that anywhere else.', when: 'Today' },
    { name: 'Margaux B.', stars: 5, text: 'In and out in half an hour and the reminder texts are actually helpful.', when: 'Today' },
    { name: 'Hannah K.', stars: 3, text: 'Lovely results, but I waited 25 minutes past my appointment time.', when: '28 Oct', reply: 'Hannah, thank you for telling us, and I am sorry about the wait. That is not the visit we want for you. We have added a buffer before every laser appointment since then. I hope today felt different. Camille' },
];

export const DECISIONS = [
    { id: 'w', agent: 'Rebooking', title: 'Offer Jade’s 2:30 opening to the waitlist', why: 'Three clients asked for an afternoon facial this week. The first to say yes gets it.', done: 'Nora Albright took the 2:30. Hydrating facial, $195.' },
    { id: 'm', agent: 'Reactivation', title: 'Send the “we miss you” note to 38 clients', why: 'None have visited in 5 months or more. The note offers a complimentary skin scan, with no discount. About $9,400 if one in four returns.', done: '38 notes scheduled for 4:00 PM, each one written from her chart.' },
    { id: 'v', agent: 'Reviews', title: 'Post the reply to Hannah K.’s 3 star review', why: 'She is in the clinic right now and was seen 5 minutes early. The reply is drafted in your voice.', done: 'Reply posted to Hannah K.’s review.' },
];

export const FEED: FeedLine[] = [
    { who: 'Front Desk', text: 'Checked in Dani Rossi from the text link, 46 minutes early.' },
    { who: 'Rebooking', text: 'Sienna Park booked her two week check-in before leaving.' },
    { who: 'Reminders', text: 'Imani Brooks confirmed her 2:00 with a thumbs up.' },
    { who: 'Reviews', text: 'Asked Ruth Adeyemi for a review. She left five stars.' },
    { who: 'Front Desk', text: 'Answered a pricing question about lip filler on chat in 20 seconds.' },
    { who: 'Reactivation', text: 'Fiona Castellanos opened her note and asked about Thursday.' },
    { who: 'Rebooking', text: 'Held 11 December for Carmen Vidal’s third microneedling session.' },
    { who: 'Inventory', text: 'Vitamin C serum is down to four. Added six to Friday’s order.' },
    { who: 'Reminders', text: 'Sent numbing instructions to tomorrow’s three filler clients.' },
    { who: 'Front Desk', text: 'Booked a new client consultation for Tuesday at 12:30.' },
];
