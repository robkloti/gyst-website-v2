import { FeedLine } from '../shared';

export type Client = { id: string; name: string; what: string; retainer: number; health: 'Thriving' | 'Steady' | 'Watch'; spend: number; back: number; note: string };
export const CLIENTS: Client[] = [
    { id: 'pilot', name: 'Pilot Light Coffee', what: 'Coffee roaster, online and two cafes', retainer: 6500, health: 'Thriving', spend: 8200, back: 41300, note: 'Holiday gift guide is ready to send' },
    { id: 'fenwright', name: 'Fenwright Outdoor', what: 'Outdoor gear, five shops', retainer: 9000, health: 'Steady', spend: 14600, back: 52800, note: 'October report is ready to send' },
    { id: 'kettlebrook', name: 'Kettlebrook Dental', what: 'Dental group, four clinics', retainer: 4800, health: 'Thriving', spend: 5400, back: 19900, note: 'New patient bookings up 22%' },
    { id: 'northbank', name: 'Northbank Solar', what: 'Home solar installer', retainer: 7200, health: 'Watch', spend: 11900, back: 24100, note: 'Search cost per lead climbed to $212' },
    { id: 'juno', name: 'Juno & Reed Realty', what: 'Boutique estate agents', retainer: 3500, health: 'Steady', spend: 2800, back: 9400, note: 'Three listing videos in production' },
    { id: 'mossfield', name: 'Mossfield Veterinary', what: 'Vet practice, two sites', retainer: 3200, health: 'Thriving', spend: 1900, back: 8700, note: 'Winter wellness series starts Monday' },
];

export const CHANNELS = ['Social', 'Email', 'Blog', 'Video', 'Paid'] as const;
export type Channel = (typeof CHANNELS)[number];
export type Post = { id: string; day: number; time: string; client: string; channel: Channel; title: string; state: 'Published' | 'Scheduled' | 'Needs you'; copy: string; stat: string };
export const DAYS = ['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13'];
export const POSTS: Post[] = [
    { id: 'p1', day: 0, time: '8:00', client: 'pilot', channel: 'Email', title: 'New roast: Ember No. 4', state: 'Published', copy: 'Dark cherry, cocoa, a little smoke. Ember No. 4 is back for winter, and the first 200 bags ship with a free tin.', stat: '46% opened, $6,240 in orders' },
    { id: 'p2', day: 0, time: '12:30', client: 'kettlebrook', channel: 'Social', title: 'Meet Dr. Anand, Riverside clinic', state: 'Published', copy: 'Dr. Anand has joined our Riverside clinic. She sees children from age two and still keeps a sticker drawer.', stat: '312 reactions, 9 booking clicks' },
    { id: 'p3', day: 0, time: '4:00', client: 'fenwright', channel: 'Paid', title: 'Winter boots, carousel ad', state: 'Published', copy: 'Five boots, tested on wet rock and frozen mud. Find the pair that fits how you actually walk.', stat: '$4.10 back per $1' },
    { id: 'p4', day: 1, time: '9:00', client: 'northbank', channel: 'Blog', title: 'What a home battery really saves', state: 'Published', copy: 'We ran the numbers on 140 of our own installs. Here is what a battery saved a typical home last year, and when it does not pay off.', stat: '1,840 reads, 14 quote requests' },
    { id: 'p5', day: 1, time: '1:00', client: 'mossfield', channel: 'Social', title: 'Is your dog cold? Four signs', state: 'Published', copy: 'Shivering is the obvious one. The other three are easier to miss. Save this for the first frosty walk.', stat: '2,104 saves' },
    { id: 'p6', day: 2, time: '8:30', client: 'juno', channel: 'Video', title: 'Walkthrough: 14 Alder Row', state: 'Published', copy: 'A 60 second walk through 14 Alder Row, from the garden gate to the loft room. Viewings open on Saturday.', stat: '9,300 views, 6 viewing requests' },
    { id: 'p7', day: 2, time: '11:00', client: 'pilot', channel: 'Social', title: 'Behind the roaster, part 3', state: 'Published', copy: 'It is 5:40 in the morning and Marta is on her second batch. This is what first crack sounds like.', stat: '18,200 plays' },
    { id: 'p8', day: 2, time: '3:00', client: 'fenwright', channel: 'Email', title: 'Staff picks under $50', state: 'Published', copy: 'Eleven things our shop staff bought with their own money this year, all under fifty dollars.', stat: '38% opened, $9,120 in orders' },
    { id: 'p9', day: 3, time: '9:00', client: 'kettlebrook', channel: 'Paid', title: 'New patient offer, search ad', state: 'Published', copy: 'New patient exam and clean for $89. Four clinics, evening and Saturday appointments.', stat: '31 bookings at $38 each' },
    { id: 'p10', day: 3, time: '2:00', client: 'northbank', channel: 'Video', title: 'Customer story: the Abara family', state: 'Published', copy: 'The Abaras put panels on a north-facing roof and were told it would never work. Twelve months on, here are their bills.', stat: '$74 per lead' },
    { id: 'p11', day: 4, time: '10:00', client: 'pilot', channel: 'Email', title: 'Holiday gift guide', state: 'Needs you', copy: 'Six gifts for the coffee person in your life, from a $14 stocking filler to the full brew kit. Order by 15 December for delivery in time.', stat: 'Goes to 18,400 subscribers' },
    { id: 'p12', day: 4, time: '12:00', client: 'mossfield', channel: 'Blog', title: 'Winter wellness checklist', state: 'Scheduled', copy: 'Seven things to check before the cold sets in, from paws and joints to the antifreeze in your garage.', stat: 'Publishes at noon' },
    { id: 'p13', day: 4, time: '2:30', client: 'juno', channel: 'Social', title: 'Just listed: Marlpit Lane', state: 'Needs you', copy: 'Three bedrooms, a walled garden and a kitchen that gets the evening sun. Marlpit Lane has just come to market.', stat: 'Client asked to see it first' },
    { id: 'p14', day: 4, time: '5:00', client: 'fenwright', channel: 'Social', title: 'Weekend trail report', state: 'Scheduled', copy: 'Snow above 600 metres and firm ground below it. Here are three walks our Keswick team rates for this weekend.', stat: 'Publishes at 5:00' },
];

export const STAGES = ['Brief', 'Draft', 'Design', 'Review', 'Scheduled'];
export const QUEUE = [
    { title: 'Black Friday email series, 4 parts', client: 'fenwright', stage: 3, agent: 'Editor', eta: 'Review today' },
    { title: 'Listing video: Marlpit Lane', client: 'juno', stage: 2, agent: 'Video Cutter', eta: 'Cut ready 11:30' },
    { title: 'Solar myths carousel', client: 'northbank', stage: 2, agent: 'Designer', eta: 'Today 2:00' },
    { title: 'Gift card landing page copy', client: 'pilot', stage: 1, agent: 'Writer', eta: 'Draft by 1:00' },
    { title: 'Whitening offer, ad set of 6', client: 'kettlebrook', stage: 1, agent: 'Writer', eta: 'Draft by 3:00' },
    { title: 'Senior pets month plan', client: 'mossfield', stage: 0, agent: 'Strategist', eta: 'Brief Monday' },
    { title: 'Staff picks, part 2', client: 'fenwright', stage: 4, agent: 'Scheduler', eta: 'Goes out Tue 17' },
];

export const DECISIONS = [
    { id: 'd1', agent: 'Media Buyer', client: 'northbank', title: 'Move $1,400 from Northbank’s search ads to its video ad', why: 'Search is costing $212 a lead this week. The Abara family video is bringing them in at $74.', done: 'Budget moved. Search capped at $60 a day.' },
    { id: 'd2', agent: 'Editor', client: 'pilot', title: 'Send Pilot Light’s holiday gift guide', why: 'Goes to 18,400 subscribers at 10:00. Last year’s guide brought in $11,800.', done: 'Gift guide scheduled for 10:00.' },
    { id: 'd3', agent: 'Account Lead', client: 'fenwright', title: 'Send Fenwright their October report', why: 'Two pages, written from the numbers. $52,800 back on $14,600 spent, and one honest paragraph on what flopped.', done: 'October report sent to Fenwright.' },
    { id: 'd4', agent: 'Strategist', client: 'kettlebrook', title: 'Pitch Kettlebrook a fifth clinic launch plan', why: 'They announced a new clinic on Tuesday. A one page plan at $2,400 a month is drafted.', done: 'Launch plan sent to Kettlebrook.' },
];

export const FEED: FeedLine[] = [
    { who: 'Scheduler', text: 'Queued Mossfield’s winter checklist for noon.' },
    { who: 'Media Buyer', text: 'Paused two Fenwright ads that fell under $2 back per $1.' },
    { who: 'Writer', text: 'Drafted six subject lines for the gift guide. Picked the one that tested best last year.' },
    { who: 'Analyst', text: 'Kettlebrook’s new patient ad booked its 31st appointment.' },
    { who: 'Video Cutter', text: 'Cut the Marlpit Lane walkthrough to 58 seconds.' },
    { who: 'Editor', text: 'Sent the Black Friday series back to the Writer. Part 3 was too long.' },
    { who: 'Community', text: 'Answered 14 comments on Pilot Light’s roaster video.' },
    { who: 'Analyst', text: 'Found $2,140 of Northbank spend going to searches outside the service area.' },
    { who: 'Designer', text: 'Resized the solar myths carousel for three placements.' },
    { who: 'Account Lead', text: 'Wrote Monday’s agenda for the Juno & Reed call.' },
];
