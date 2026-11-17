import { FeedLine } from '../shared';

export type Intake = { id: string; name: string; type: string; got: string; score: number; verdict: string; words: string; reasons: string[]; conflict: string; value: string; done: string };
export const INTAKE: Intake[] = [
    { id: 'i1', name: 'Priya Raman', type: 'Wrongful termination', got: 'Last night, 9:48 PM', score: 92, verdict: 'Strong fit', words: 'I was let go nine days after I came back from medical leave. My reviews were good for six years. HR told me my role was eliminated, but they posted it again on Monday.', reasons: ['Timing: terminated 9 days after protected leave ended.', 'Documents: she has six years of reviews and the new job posting.', 'Fits the firm: 14 similar matters since 2021, 11 resolved in the client’s favour.'], conflict: 'Clear. No current or former client is adverse.', value: 'Contingency, est. fee $48,000 - $85,000', done: 'Engagement letter sent to Priya Raman. Consult held for today at 2:00 PM.' },
    { id: 'i2', name: 'Dalton Freight Co.', type: 'Breach of supply contract', got: 'Yesterday, 4:15 PM', score: 86, verdict: 'Strong fit', words: 'Our pallet supplier stopped delivering in September and is holding a $410,000 deposit. We have the signed agreement and every email.', reasons: ['Amount in dispute is $410,000 with a signed written agreement.', 'Hourly matter with a business client that pays on 30 day terms.', 'Referred by an existing client, Halvorsen Cold Storage.'], conflict: 'Clear. Supplier checked against all open and closed matters.', value: 'Hourly, est. $60,000 through mediation', done: 'Engagement letter sent to Dalton Freight. Kickoff call offered for Friday.' },
    { id: 'i3', name: 'Samuel Okonkwo', type: 'Unpaid overtime', got: 'Yesterday, 11:02 AM', score: 78, verdict: 'Worth a call', words: 'They changed our title to “shift lead” and stopped paying overtime. There are fourteen of us at the warehouse and we all work 50 plus hours.', reasons: ['Fourteen workers with the same facts. Possible group claim.', 'He has pay stubs. Schedules still need to be collected.', 'Employer is mid-sized, so collection risk is low.'], conflict: 'Clear.', value: 'Contingency, est. fee $90,000 - $160,000', done: 'Call booked with Samuel Okonkwo. Document checklist sent.' },
    { id: 'i4', name: 'Greta Lindahl', type: 'Non-compete review', got: 'Tuesday, 3:30 PM', score: 64, verdict: 'Flat fee', words: 'I have an offer from a competitor and I need to know if my non-compete will hold before I resign. I have to answer by the 21st.', reasons: ['Simple review that fits the $1,800 flat fee package.', 'Deadline is close: she must answer the offer by 21 November.', 'Low value now, but she is a senior sales director.'], conflict: 'Check needed. Her employer was adverse in a 2022 matter.', value: 'Flat fee, $1,800', done: 'Flat fee agreement sent to Greta Lindahl, pending the conflict check.' },
    { id: 'i5', name: 'Victor Pena', type: 'Security deposit dispute', got: 'Tuesday, 9:12 AM', score: 22, verdict: 'Refer out', words: 'My landlord kept my $2,300 deposit and will not return my calls.', reasons: ['Outside the firm’s practice areas.', 'Amount fits small claims court, where he does not need a lawyer.', 'A polite referral note with two tenant clinics is drafted.'], conflict: 'Not run. Recommended decline.', value: 'None', done: 'Referral note sent to Victor Pena with two tenant clinics.' },
];

export type Draft = { id: string; title: string; matter: string; by: string; pages: number; when: string; flag: string; body: string[]; done: string };
export const DRAFTS: Draft[] = [
    { id: 'd1', title: 'Motion to compel discovery responses', matter: 'Ashby v. Northfield Logistics', by: 'Drafting Clerk', pages: 11, when: 'Drafted 6:20 AM', flag: 'Two citations need a partner’s eye. Both are marked in the margin.', body: ['Plaintiff Renee Ashby moves for an order compelling Defendant to provide full responses to her First Set of Interrogatories and Requests for Production, served on 22 September.', 'Defendant’s responses were due on 22 October. Plaintiff’s counsel wrote on 27 October and again on 4 November. Defendant has produced 41 pages and has not answered Interrogatories 6 through 14.', 'The requests seek scheduling records and manager communications for the eight weeks before the termination. They go to the heart of the claim, and the burden of producing them is small.'], done: 'Motion to compel approved. Docket Clerk will file it today.' },
    { id: 'd2', title: 'Demand letter', matter: 'Tran v. Belmont Hospitality', by: 'Drafting Clerk', pages: 4, when: 'Drafted yesterday', flag: 'Demand figure of $186,400 comes from the damages sheet. Please confirm it.', body: ['We represent Linh Tran in connection with her employment at the Belmont Harbour Hotel and the unpaid wages owed to her and to eleven other banquet staff.', 'Between March 2024 and August 2026 your client collected a 22 percent service charge on banquet events and kept a share of it. Our review of the event ledgers puts the amount at $186,400.', 'We invite your client to resolve this matter before a complaint is filed. This offer remains open for 21 days.'], done: 'Demand letter approved and sent by certified mail and email.' },
    { id: 'd3', title: 'Monthly status letter', matter: 'Halvorsen Cold Storage', by: 'Client Letters', pages: 2, when: 'Drafted yesterday', flag: 'Written from the time entries and the last two call notes.', body: ['Dear Mr. Halvorsen, here is where your matter stands at the end of October.', 'The other side answered our complaint on 14 October and raised no counterclaims. We served our first document requests on 20 October. Their responses are due on 19 November.', 'Fees this month came to $6,235, which is within the budget we set in August. Nothing is needed from you right now.'], done: 'Status letter approved and sent to the client.' },
    { id: 'd4', title: 'Engagement letter', matter: 'Dalton Freight Co.', by: 'Intake Agent', pages: 3, when: 'Drafted yesterday', flag: 'Standard hourly terms. Retainer set at $7,500.', body: ['Thank you for asking Marlowe Tennant LLP to represent Dalton Freight Co. in its dispute with Kessing Pallet Supply.', 'This letter sets out the scope of our work, how we bill and what we will need from you in the first two weeks.', 'Our work will be led by Eleanor Marlowe, with Jonah Whitfield handling day to day matters. An initial retainer of $7,500 is due on signing.'], done: 'Engagement letter approved, ready to go with the intake.' },
];

export const STAGES = ['Pleadings', 'Discovery', 'Motions', 'Settlement', 'Trial prep'] as const;
export type Stage = (typeof STAGES)[number];
export const MATTERS: { name: string; type: string; stage: Stage; lead: string; next: string }[] = [
    { name: 'Dunmore v. Castellan Group', type: 'Retaliation', stage: 'Pleadings', lead: 'EM', next: 'Answer due from the defence, 24 Nov' },
    { name: 'Halvorsen Cold Storage', type: 'Contract', stage: 'Pleadings', lead: 'JW', next: 'Document responses due, 19 Nov' },
    { name: 'Ashby v. Northfield Logistics', type: 'Wrongful termination', stage: 'Discovery', lead: 'EM', next: 'Motion to compel awaiting review' },
    { name: 'Vasquez v. Pell & Hart', type: 'Wage and hour', stage: 'Discovery', lead: 'RT', next: 'Deposition of payroll manager, 18 Nov' },
    { name: 'Brightwell Foods', type: 'Partnership dispute', stage: 'Discovery', lead: 'JW', next: 'Review 2,140 documents, 61% done' },
    { name: 'Ibekwe v. Sterling Arms', type: 'Discrimination', stage: 'Discovery', lead: 'AC', next: 'Expert disclosure, 3 Dec' },
    { name: 'Morrow v. Lakeshore Transit', type: 'Disability', stage: 'Motions', lead: 'EM', next: 'Opposition brief due, 20 Nov' },
    { name: 'Kline Family Bakery', type: 'Lease dispute', stage: 'Motions', lead: 'RT', next: 'Hearing, 2 Dec' },
    { name: 'Tran v. Belmont Hospitality', type: 'Wage and hour', stage: 'Settlement', lead: 'RT', next: 'Demand letter awaiting review' },
    { name: 'Osei v. Garland Motors', type: 'Wrongful termination', stage: 'Settlement', lead: 'AC', next: 'Mediation, 25 Nov' },
    { name: 'Petrov v. Alder Health', type: 'Retaliation', stage: 'Trial prep', lead: 'EM', next: 'Pretrial conference, 9 Dec' },
];

export const DEADLINES = [
    { day: '14', mon: 'Nov', left: 'Tomorrow', matter: 'Ashby', what: 'File motion to compel', basis: 'Scheduling order', state: 'Draft ready', ok: true },
    { day: '18', mon: 'Nov', left: '5 days', matter: 'Vasquez', what: 'Deposition of payroll manager', basis: 'Notice of deposition', state: 'Outline ready', ok: true },
    { day: '20', mon: 'Nov', left: '7 days', matter: 'Morrow', what: 'Opposition to summary judgment', basis: 'Local rule, 21 days', state: 'First draft, 60%', ok: false },
    { day: '25', mon: 'Nov', left: '12 days', matter: 'Osei', what: 'Mediation statement', basis: 'Mediator’s order', state: 'Not started', ok: false },
    { day: '09', mon: 'Dec', left: '26 days', matter: 'Petrov', what: 'Pretrial conference', basis: 'Court notice', state: 'Exhibit list started', ok: true },
];

export const HOURS = [
    { name: 'Eleanor Marlowe', role: 'Partner', h: 31.2, target: 35, found: 3.4 },
    { name: 'Rafael Tennant', role: 'Partner', h: 34.6, target: 35, found: 1.8 },
    { name: 'Jonah Whitfield', role: 'Associate', h: 33.9, target: 40, found: 2.9 },
    { name: 'Amara Cole', role: 'Associate', h: 27.7, target: 40, found: 1.5 },
];

export const DECISIONS = [
    { id: 'm1', agent: 'Intake Agent', title: 'Send the engagement letter to Priya Raman', why: 'Scored 92. She is free today at 2:00 PM and two other firms were contacted last night.', done: 'Engagement letter sent. Consult held for 2:00 PM.' },
    { id: 'm2', agent: 'Timekeeper', title: 'Add 9.6 recovered hours to this week’s time', why: 'Found in sent email, calendar and call logs with no time entry. Worth $4,128 at the blended rate.', done: '9.6 hours added across four timekeepers.' },
    { id: 'm3', agent: 'Docket Clerk', title: 'Ask for a 14 day extension in Morrow', why: 'The opposition brief is 60% drafted and due in 7 days. A short, courteous email to opposing counsel is ready.', done: 'Extension request sent to opposing counsel.' },
];

export const FEED: FeedLine[] = [
    { who: 'Docket Clerk', text: 'Read this morning’s court notice in Petrov and calendared the pretrial conference.' },
    { who: 'Intake Agent', text: 'Ran a conflict check on Dalton Freight against 1,204 past matters. Clear.' },
    { who: 'Drafting Clerk', text: 'Finished the motion to compel in Ashby. Eleven pages, two citations flagged.' },
    { who: 'Timekeeper', text: 'Matched 14 sent emails to matters and proposed 3.4 hours for Eleanor.' },
    { who: 'Client Letters', text: 'Drafted the October status letter for Halvorsen Cold Storage.' },
    { who: 'Intake Agent', text: 'Replied to a web enquiry in 40 seconds and asked four screening questions.' },
    { who: 'Docket Clerk', text: 'Reminded Rafael that the Vasquez deposition outline is due for review.' },
    { who: 'Research Clerk', text: 'Pulled six recent decisions on leave retaliation for the Raman file.' },
    { who: 'Timekeeper', text: 'Flagged a 0.8 hour call in Brightwell Foods that was never billed.' },
    { who: 'Drafting Clerk', text: 'Updated the Morrow opposition brief with the new deposition excerpts.' },
];
