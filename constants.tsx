import { SectionId, SectionContent, ShowroomBrand, OfferVehicle, CaseStudy } from './types';

// Copy rules: references/voice.md (gyst-ops). Short sentences. Name the tool.
// Every number here traces to references/offer.md or a synth delta in voice.md.

export const SECTIONS: SectionContent[] = [
    {
        id: SectionId.HERO,
        eyebrow: "The same harness I run three brands on",
        headline: "Stop prompting. Start running.",
        subheadline: "Every prompt starts from zero. Every brand rule gets re-typed. So I install Claude Code on your marketing team's own folders. A workshop, not a chatbot. I wire it to run your content engine, ads engine, brand-voice lint and memory. Day 1 your folders aren't empty. Day 14 it's shipping work. No babysitter.",
        cta: "Book the install call"
    },
    {
        id: SectionId.PROBLEM,
        headline: "Ad-hoc AI doesn't compound. It resets.",
        copy: [
            "Most teams use AI all day. Almost none of it is remembered.",
            "This doesn't scale. It resets."
        ]
    },
    {
        id: SectionId.ROUTE,
        eyebrow: "01 · Route",
        headline: "One file tells Claude where everything is.",
        subheadline: "Think of CLAUDE.md as the reception desk. Every request walks in, gets pointed to the right room, and nothing else loads.",
        bullets: [
            "Strip CLAUDE.md to a routing table",
            "Gate what gets read per task",
            "Keep the token bill flat as the folder grows"
        ],
        micro: "Map, not encyclopedia."
    },
    {
        id: SectionId.REMEMBER,
        eyebrow: "02 · Remember",
        headline: "Every room keeps its own memory.",
        subheadline: "Think of CONTEXT.md files as drawer labels. Claude opens the drawer the task needs (process, voice, current state) and leaves the rest shut.",
        bullets: [
            "Seed voice.md from your team's real transcripts",
            "Log what worked in results/ after every task",
            "Let month two run cheaper than month one"
        ],
        micro: "Nothing starts from zero twice."
    },
    {
        id: SectionId.DO,
        eyebrow: "03 · Do",
        headline: "Skills do the work. Wired where the work happens.",
        subheadline: "Think of skills as the tools on the workshop wall. Each room has its own set. Say the job; the chain runs.",
        bullets: [
            "Spawn 7 shorts before lunch",
            "Ship 100 ad variants through one validation chain",
            "Lint every line with humanizer, then stop-slop, before it ships"
        ],
        micro: "Say it once. It runs the chain."
    },
    {
        id: SectionId.RUN,
        eyebrow: "04 · Run",
        headline: "Hooks run it while you sleep.",
        subheadline: "Cron for the loop. Scheduled tasks and file watchers fire the skills, log the results, and hand you drafts in the morning.",
        bullets: [
            "Wake up to the day's drafts",
            "Watch a folder; trigger the chain",
            "Review the log, not the process"
        ],
        micro: "Ad-hoc AI becomes a loop."
    },
    {
        id: SectionId.CTA,
        type: 'cta',
        headline: "Book the install call.",
        copy: [],
        bullets: []
    },
    {
        id: SectionId.OFFER,
        eyebrow: "The offer",
        headline: "The 14-Day Zero-Babysit Marketing Ops Install.",
        copy: [
            "Same harness I run GYST, BADSIDE and GGC on. Installed on your folders, in your voice, wired to your tools. Running by day 14."
        ],
        micro: "File-first. Markdown and git. If GYST disappears tomorrow, your system still runs."
    },
    {
        id: SectionId.FINAL,
        headline: "System stable. Monitoring continues.",
        micro: "gyst-ai.com"
    }
];

// Terminal shown in the hero. Illustrative run of the content room.
export const HERO_TERMINAL: { kind: 'cmd' | 'prompt' | 'dim' | 'ok'; text: string }[] = [
    { kind: 'cmd', text: 'claude' },
    { kind: 'prompt', text: 'spawn 7 shorts on the design.md thread' },
    { kind: 'dim', text: 'read CLAUDE.md → content room' },
    { kind: 'dim', text: 'load content/CONTEXT.md · references/voice.md' },
    { kind: 'dim', text: 'spawning 7 sub-agents…' },
    { kind: 'ok', text: 'content/queue/2026-08-19-design-md/01-hook.md … 07-cta.md' },
    { kind: 'ok', text: 'lint humanizer → stop-slop · 0 flags' },
];

// Harness strip under the hero — the framing voice.md prescribes.
export const HARNESS_STRIP = [
    { label: "The harness", value: "Claude Code", detail: "runs the loop" },
    { label: "The memory", value: "Folders", detail: "CLAUDE.md → CONTEXT.md" },
    { label: "The executors", value: "Skills", detail: "wired per room" },
    { label: "The cron", value: "Hooks", detail: "runs while you sleep" },
];
export const ALSO_WIRED = ["n8n", "Supabase", "Apify", "Claude API"];

// Showroom — replaces the old case studies. Real receipts only, all dated in gyst-ops.
export const SHOWROOM: ShowroomBrand[] = [
    {
        name: "GYST",
        role: "The operator's own shop",
        room: "~/projects/gyst-ops",
        receipts: [
            "119+ short scripts queued through spawn-shorts",
            "100-ad Meta cycles through a four-stage research → plan → creative → eval chain",
            "Cold outreach at 5.3% human-classified reply (PM Video, 243 leads)"
        ]
    },
    {
        name: "BADSIDE",
        role: "Brand-collab outreach, Manila",
        room: "gyst-ops · outreach room, BADSIDE tenant",
        receipts: [
            "12.5% human-classified reply, Manila wellness studios, 48 leads",
            "Five sub-verticals ranked in one cycle, all above 4%",
            "Same voice-lint stack, different CONTEXT.md"
        ]
    },
    {
        name: "GGC",
        role: "Dance studio + UNLEASHED recital",
        room: "gyst-ops · /ggc",
        receipts: [
            "Recital campaign sequenced tease → enrol → countdown, run through GHL",
            "Recital landing page + QR redirect shipped from this repo",
            "Its own aesthetic, its own room. Brand isolation lives in a folder"
        ]
    }
];

// Offer B stack — values from references/offer.md §3.
export const OFFER_STACK: OfferVehicle[] = [
    { name: "Workspace-Architect hero install", detail: "CLAUDE.md, rooms, voice.md, ICP, format catalog, seeded day 1", value: "$5,000" },
    { name: "Content engine", detail: "spawn-shorts · spawn-long-form · repurpose · carousel-build · lint stack · daily cron", value: "$6,000" },
    { name: "Ads engine (Meta, multi-tenant)", detail: "research → plan → 100 creatives → eval, four-stage chain", value: "$7,500" },
    { name: "Self-evolving skills layer", detail: "agents write SKILL.md; Curator stales at 30d, archives at 90d", value: "$4,000" },
    { name: "Memory + Hive Mind layer", detail: "SQLite + embeddings, weekly consolidation, auto-injected context", value: "$3,000" },
];
export const OFFER_STACK_TOTAL = "$25,500";
// Q4 default (2026-08-19). One place to change or blank out.
export const OFFER_PRICE = "$2,500 install + $247/mo";

export const OFFER_GUARANTEE = [
    { when: "Days 1–14", what: "Full refund on the install fee. No questions." },
    { when: "Day 30", what: "Not using it daily? Next month's on me. Repeats until you are." },
    { when: "Past day 14", what: "Install fee stays. The system's on your machine. You own it." },
];

// Earlier client engagements (confirmed real by Rob, 2026-11-08).
export const CASE_STUDIES: CaseStudy[] = [
    {
        tag: "Property Management",
        featured: true,
        title: "Galaxy Housing",
        duration: "8 weeks • 4 specialists",
        challenge: "Manual property management processes and inefficient lead qualification resulted in slow response times and missed opportunities in a competitive real estate market.",
        solution: "End-to-end sales AI implementation with RAG database for property listings, automated lead qualification, and multi-channel voice marketing system.",
        metrics: [
            { value: "300%", label: "Increase in qualified leads" },
            { value: "85%", label: "Reduction in average response time" },
            { value: "40%", label: "Improvement in lead-to-client conversion" },
            { value: "60%", label: "Reduction in manual tasks" }
        ],
        tags: ["RAG Solutions", "Lead Generation AI", "AI Chatbots", "+1"],
        quote: "GYST transformed our entire lead management process. We're now handling 3x more qualified leads with the same team size.",
        author: "Sarah Mitchell, Operations Director, Galaxy Housing"
    },
    {
        tag: "Marketing Agency",
        featured: true,
        title: "Force at Work",
        duration: "10 weeks • 5 specialists",
        challenge: "Scaling personalized marketing campaigns across Japanese markets while maintaining cultural authenticity and engagement quality.",
        solution: "AI avatars for culturally-aware content creation, social media automation bots, and intelligent lead generation system tailored for Japanese business culture.",
        metrics: [
            { value: "500%", label: "Increase in social engagement" },
            { value: "70%", label: "Reduction in content costs" },
            { value: "200%", label: "Improvement in marketing ROI" },
            { value: "250%", label: "Expansion in target reach" }
        ],
        tags: ["AI Avatars", "Social Media Automation", "Lead Generation AI", "+1"],
        quote: "The AI avatars perfectly captured Japanese business culture nuances. Our clients can't tell the difference from human-created content.",
        author: "Hiroshi Tanaka, Creative Director, Force at Work"
    },
    {
        tag: "Crypto Finance",
        featured: true,
        title: "RC Wallet",
        duration: "12 weeks • 6 specialists",
        challenge: "Identifying high-value crypto investors (whales) from on-chain data and providing automated, intelligent customer support for complex financial queries.",
        solution: "On-chain analysis system with automated whale identification, intelligent lead generation, and RAG-powered customer support system for crypto-specific queries.",
        metrics: [
            { value: "1,000+", label: "High-value crypto investors identified" },
            { value: "90%", label: "Reduction in customer support workload" },
            { value: "$2M", label: "Value of new opportunities" },
            { value: "95%", label: "Customer satisfaction score" }
        ],
        tags: ["On-chain Analysis", "Lead Generation AI", "RAG Solutions", "+1"],
        quote: "GYST's on-chain analysis identified prospects we never would have found manually. The ROI has been exceptional.",
        author: "David Chen, CEO, RC Wallet"
    }
];
