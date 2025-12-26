import { SectionId, SectionContent, Testimonial, CaseStudy } from './types';

export const SECTIONS: SectionContent[] = [
    {
        id: SectionId.HERO,
        headline: "Turn Business Intent",
        subheadline: "At GYST we design fully autonomous systems that understand your goals, plan your strategy, execute with the right tools and verify results — before reiterating and doing it again.",
        micro: "Not Tools, Not Demos, systems that run",
        cta: "See how the system works"
    },
    {
        id: SectionId.PROBLEM,
        headline: "Automation fails without shared context.",
        copy: [
            "Most automations execute steps. Very few operate from an agreed understanding of why those steps exist.",
            "They skip context that should be standardized. They push users through pipelines without alignment. They act without verifying whether the outcome actually mattered.",
            "There’s no feedback. No testing. No loop to correct what quietly breaks over time.",
            "This doesn't scale. It degrades."
        ]
    },
     {
        id: SectionId.WHY,
        headline: "Every GYST system begins by clarifying one thing:",
        subheadline: "Why?",
        copy: [
            "Before a message is sent.",
            "Before a call is booked.",
            "Before any action is taken.",
            "What needs to happen — and for whom?",
            "No intent. No automation."
        ],
        micro: "(This is where the loop begins.)"
    },
    {
        id: SectionId.INTENT,
        headline: "Everything starts with intent.",
        subheadline: "The sequencing mirrors real discovery: Stop. Ask why. Define outcome. Then act.",
        copy: [
            "What needs to happen — and for whom? becomes the answer to Why, not a bolt-on."
        ]
    },
    {
        id: SectionId.DIAGNOSIS,
        headline: "Good systems ask better questions.",
        copy: ["Agents don’t move people through funnels. They slow down to understand:"],
        bullets: ["Situation", "Friction", "Constraints", "Readiness"],
        micro: "Only when the problem is clear action make sense."
    },
    {
        id: SectionId.MEMORY,
        headline: "Intelligence requires memory.",
        copy: ["Every decision is shaped by what the system remembers:"],
        bullets: ["Past conversations", "Business rules", "Knowledge bases", "Live data"],
        micro: "GYST agents don’t start from zero. They build on context."
    },
    {
        id: SectionId.PLANNING,
        headline: "Plans before actions.",
        copy: ["Once intent and context are clear, agents decide:"],
        bullets: ["What steps are required", "Which tools to use", "What should happen automatically", "Where humans should step in"],
        micro: "Execution is never blind. It’s deliberate."
    },
    {
        id: SectionId.EXECUTION,
        headline: "Autonomy, with boundaries.",
        copy: ["Actions happen automatically — within clearly defined limits."],
        bullets: ["Booking", "Follow-ups", "Routing", "Updates", "Notifications"],
        micro: "Nothing improvises. Nothing overreaches."
    },
    {
        id: SectionId.VERIFICATION,
        headline: "Outcomes are checked — not assumed.",
        copy: [
            "After execution, the system asks: Did this fulfill the original intent?",
            "If yes → proceed.",
            "If no → adjust, retry, or escalate.",
            "This is what makes it an agent — not a script."
        ]
    },
    {
        id: SectionId.CTA,
        type: 'cta',
        headline: "Ready to create your most capable system?",
        copy: [],
        bullets: []
    },
    {
        id: SectionId.ITERATION,
        headline: "Systems improve. Humans stay in control.",
        copy: [
            "When confidence is high, autonomy increases.",
            "When uncertainty appears, humans step in.",
            "The system learns. The business stays safe."
        ]
    },
    {
        id: SectionId.OFFER,
        headline: "What we design.",
        bullets: ["Autonomous intake systems", "Context-aware decision agents", "Memory-backed operations", "Verified execution loops", "Modular architectures that scale"],
        copy: ["Each system is custom. Each outcome is measurable."],
        micro: "Automation without understanding is just noise."
    },
    {
        id: SectionId.FINAL,
        headline: "System stable. Monitoring continues.",
        micro: "gyst-ai.com"
    }
];

export const TESTIMONIALS: Testimonial[] = [
    { name: "Marcus Davis", role: "Product Lead at Acme", quote: "The automated insights have saved us from burnout multiple times. It's like having a nervous system for your engineering team.", avatar: "https://picsum.photos/100/100?random=1" },
    { name: "Elena Rodriguez", role: "CTO at Hyperbase", quote: "We've reduced our cycle time by 40% since adopting GYST. The CLI integration allows our devs to stay in flow state.", avatar: "https://picsum.photos/100/100?random=2" },
    { name: "Sarah Jenkins", role: "VP of Eng at Starlight", quote: "GYST has completely changed how we plan our quarterly goals. It bridges the gap between strategy and execution.", avatar: "https://picsum.photos/100/100?random=3" },
    { name: "James O'Connor", role: "Director of Eng at Flux", quote: "Implementation was seamless. The context-aware approach meant we didn't have to rewrite our entire stack.", avatar: "https://picsum.photos/100/100?random=4" },
    { name: "Sophie Turner", role: "Senior PM at Apex", quote: "I love how the deep context search works. I can find why a decision was made six months ago instantly.", avatar: "https://picsum.photos/100/100?random=5" },
    { name: "David Kim", role: "Staff Engineer at Nexus", quote: "The verification loops are not just eye candy—they actually prevent shipping broken code to production.", avatar: "https://picsum.photos/100/100?random=6" },
];

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
            { value: "2$M", label: "Value of new opportunities" },
            { value: "95%", label: "Customer satisfaction score" }
        ],
        tags: ["On-chain Analysis", "Lead Generation AI", "RAG Solutions", "+1"],
        quote: "GYST's on-chain analysis identified prospects we never would have found manually. The ROI has been exceptional.",
        author: "David Chen, CEO, RC Wallet"
    }
];