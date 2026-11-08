import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { track, trackBookClick } from '../../lib/track';

// Shang luxury skin from the shared dashboard design system (shang-properties #21).
const K = {
    bg: '#F7F3EA',
    s1: '#FBF8F2',
    s2: '#EFE8DA',
    line: '#D9D0BE',
    t1: '#2B2620',
    t2: '#625B51',
    t3: '#857E73',
    green: '#1F4A3D',
    brass: '#8C6A2E',
    bad: '#8F3B22',
};

type StepId = 'start' | 'm-queue' | 'm-flag' | 'm-review' | 'm-month' | 's-today' | 's-video' | 's-share' | 'end-m' | 'end-s';
const STEPS: StepId[] = ['start', 'm-queue', 'm-flag', 'm-review', 'm-month', 's-today', 's-video', 's-share', 'end-m', 'end-s'];
const LABEL: Record<StepId, string> = {
    start: 'Pick a seat',
    'm-queue': 'Needs you',
    'm-flag': 'Compliance catch',
    'm-review': 'Review',
    'm-month': 'Month approval',
    's-today': 'Today',
    's-video': 'Create a video',
    's-share': 'Content to share',
    'end-m': 'Done',
    'end-s': 'Done',
};

const reasons = (i: number) => `/work/shang/reasons-${i}.webp`;
const mornings = (i: number) => `/work/shang/mornings-${i}.webp`;

const Btn: React.FC<{ onClick: () => void; primary?: boolean; disabled?: boolean; children: React.ReactNode }> = ({ onClick, primary, disabled, children }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="font-jost uppercase tracking-[0.14em] text-[11px] px-4 py-3 border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={primary ? { background: K.green, borderColor: K.green, color: K.bg } : { background: 'transparent', borderColor: K.t1, color: K.t1 }}
    >
        {children}
    </button>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="font-jost uppercase tracking-[0.18em] text-[10.5px]" style={{ color: K.t2 }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="font-cormorant font-light text-[34px] md:text-[42px] leading-[1.02] mt-2" style={{ color: K.t1 }}>{children}</h3>
);

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`border ${className}`} style={{ borderColor: K.line, background: K.s1 }}>{children}</div>
);

const Rule: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-jost text-[10px] uppercase tracking-[0.14em] px-2 py-1 border" style={{ borderColor: K.line, color: K.t2 }}>{children}</span>
);

const readStep = (): StepId => {
    const s = new URLSearchParams(window.location.search).get('demo') as StepId | null;
    return s && STEPS.includes(s) ? s : 'start';
};

export const ShangDemo: React.FC = () => {
    const [step, setStep] = useState<StepId>(readStep);
    const [trail, setTrail] = useState<StepId[]>([]);
    const [applied, setApplied] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [project, setProject] = useState<'Haraya' | 'Shang Summit'>('Shang Summit');
    const [mode, setMode] = useState<'re-edit' | 'ai'>('ai');
    const [copied, setCopied] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);
    const first = useRef(true);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (step === 'start') url.searchParams.delete('demo');
        else url.searchParams.set('demo', step);
        window.history.replaceState(null, '', url);
        track('cyoa_step', { case_study: 'shang', step });
        if (first.current) {
            first.current = false;
            return;
        }
        const top = topRef.current?.getBoundingClientRect().top ?? 0;
        if (top < 0) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [step]);

    const go = (to: StepId) => {
        setTrail((t) => [...t, step]);
        setStep(to);
    };
    const back = () => {
        setStep(trail[trail.length - 1] ?? 'start');
        setTrail(trail.slice(0, -1));
    };
    const restart = (to: StepId = 'start') => {
        setTrail([]);
        setApplied(false);
        setFixed(false);
        setCopied(false);
        setStep(to);
    };

    const seat = step.startsWith('m-') || step === 'end-m' ? 'Marketing lead' : step.startsWith('s-') || step === 'end-s' ? 'Seller' : null;

    return (
        <div ref={topRef} className="scroll-mt-24 border border-paper/15" style={{ background: K.bg, color: K.t1 }}>
            <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b" style={{ borderColor: K.line }}>
                <span className="w-7 h-7 rounded-full border flex items-center justify-center font-cormorant text-[15px]" style={{ borderColor: K.brass, color: K.brass }}>S</span>
                <div className="font-jost text-[12px] tracking-[0.14em] uppercase truncate" style={{ color: K.t1 }}>Shang console</div>
                {seat && <div className="font-jost text-[12px] truncate hidden sm:block" style={{ color: K.t3 }}>· signed in as {seat}</div>}
                <div className="ml-auto font-jost text-[10px] uppercase tracking-[0.16em] px-2 py-1 border shrink-0" style={{ borderColor: K.line, color: K.t2 }}>Demo · sample data</div>
            </div>

            <div className="flex items-center gap-2 px-4 md:px-6 py-2 border-b overflow-x-auto font-jost text-[11px]" style={{ borderColor: K.line, color: K.t3 }}>
                {[...trail, step].map((s, i, arr) => (
                    <React.Fragment key={`${s}-${i}`}>
                        <span className="whitespace-nowrap" style={{ color: i === arr.length - 1 ? K.t1 : K.t3 }}>{LABEL[s]}</span>
                        {i < arr.length - 1 && <span>/</span>}
                    </React.Fragment>
                ))}
                <div className="ml-auto flex gap-3 shrink-0 pl-4">
                    {trail.length > 0 && <button type="button" onClick={back} className="underline underline-offset-4">Back</button>}
                    {step !== 'start' && <button type="button" onClick={() => restart()} className="underline underline-offset-4">Start over</button>}
                </div>
            </div>

            <div className="p-5 md:p-8 min-h-[520px]">
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                        {step === 'start' && (
                            <div>
                                <Label>Good morning</Label>
                                <Title>Who are you at Shang?</Title>
                                <p className="font-jost mt-3 max-w-xl" style={{ color: K.t2 }}>Same engine, two seats. Pick one and click through a real day.</p>
                                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        { to: 'm-queue' as StepId, t: 'Marketing lead', d: 'You approve everything that goes out. The agents bring you work that already follows the rules.' },
                                        { to: 's-today' as StepId, t: 'Seller', d: 'You sell. The engine tells you who to call, and hands you content you’re allowed to share.' },
                                    ].map((o) => (
                                        <button key={o.to} type="button" onClick={() => go(o.to)} className="text-left border p-6 transition-colors hover:bg-[#EFE8DA]" style={{ borderColor: K.line, background: K.s1 }}>
                                            <div className="font-cormorant text-[30px] leading-none" style={{ color: K.t1 }}>{o.t}</div>
                                            <p className="font-jost text-[14px] mt-3" style={{ color: K.t2 }}>{o.d}</p>
                                            <div className="font-jost uppercase tracking-[0.14em] text-[11px] mt-5" style={{ color: K.green }}>Take this seat →</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 'm-queue' && (
                            <div>
                                <Label>Needs you · 3</Label>
                                <Title>The agents worked overnight. Here&rsquo;s what&rsquo;s waiting.</Title>
                                <Panel className="mt-6 divide-y" >
                                    {[
                                        { k: 'Carousel · Haraya', t: 'Three reasons families abroad choose Haraya for their parents', s: 'Passed compliance', ok: true },
                                        { k: 'Draft · Haraya', t: 'Slide 6 was blocked before it reached you', s: 'Compliance flag', ok: false },
                                        { k: 'Reel · Shang Summit', t: '7-shot walkthrough requested by a seller', s: 'In the video bay', ok: true },
                                    ].map((r) => (
                                        <div key={r.t} className="flex items-center gap-4 px-4 py-4" style={{ borderColor: K.line }}>
                                            <div className="min-w-0 flex-1">
                                                <Label>{r.k}</Label>
                                                <div className="font-jost text-[15px] mt-1" style={{ color: K.t1 }}>{r.t}</div>
                                            </div>
                                            <span className="font-jost text-[11px] shrink-0" style={{ color: r.ok ? K.green : K.bad }}>{r.s}</span>
                                        </div>
                                    ))}
                                </Panel>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Btn primary onClick={() => go('m-review')}>Review the carousel</Btn>
                                    <Btn onClick={() => go('m-flag')}>See what was blocked</Btn>
                                </div>
                            </div>
                        )}

                        {step === 'm-flag' && (
                            <div>
                                <Label>Compliance · caught before you saw it</Label>
                                <Title>Rule 1: no prices. Ever.</Title>
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <Panel className="p-5">
                                        <Label>Writer&rsquo;s draft · slide 6</Label>
                                        <p className="font-cormorant text-[24px] leading-snug mt-3" style={{ color: K.t1 }}>
                                            Two-bedroom units <mark className="px-1" style={{ background: '#F1D9CF', color: K.bad }}>at a launch price. Ask before it changes.</mark>
                                        </p>
                                        <p className="font-jost text-[13px] mt-4" style={{ color: K.bad }}>Blocked: price and urgency language. Sellers can&rsquo;t publish pricing under Shang&rsquo;s guardrails.</p>
                                    </Panel>
                                    <Panel className="p-5">
                                        <Label>Agent&rsquo;s fix</Label>
                                        <p className="font-cormorant text-[24px] leading-snug mt-3" style={{ color: K.t1 }}>A walkthrough, at an hour that suits you.</p>
                                        <p className="font-jost text-[13px] mt-4" style={{ color: K.green }}>{fixed ? 'Accepted. Back in your queue.' : 'Passes all five rules.'}</p>
                                    </Panel>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {['No price', 'No AI voiceover', 'No models', 'Logo never animated', 'One project per post'].map((r) => <Rule key={r}>{r}</Rule>)}
                                </div>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {!fixed ? <Btn primary onClick={() => setFixed(true)}>Accept the fix</Btn> : <Btn primary onClick={() => go('m-review')}>Review the carousel</Btn>}
                                </div>
                            </div>
                        )}

                        {step === 'm-review' && (
                            <div>
                                <Label>Review · carousel · Haraya</Label>
                                <Title>Card by card. Comment like you would on paper.</Title>
                                <div className="flex gap-3 overflow-x-auto pb-3 mt-6 -mx-1 px-1">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <div key={i} className="relative shrink-0 w-[150px] md:w-[170px]">
                                            <img src={reasons(i)} alt={`Haraya carousel slide ${i}`} loading="lazy" className="w-full block border" style={{ borderColor: K.line }} />
                                            {(i === 3 || i === 7) && (
                                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center font-jost text-[11px]" style={{ background: applied ? K.green : K.brass, color: K.bg }}>
                                                    {applied ? '✓' : i === 3 ? '1' : '2'}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    {[
                                        { n: 1, c: 'Slide 3: lead with the answer. Families shouldn’t read the worry first.', b: 'How do we know the building is really going up?', a: 'Families abroad watch it rise, month by month.' },
                                        { n: 2, c: 'Slide 7: make the invite warmer.', b: 'A walkthrough, at an hour that suits you', a: 'A walkthrough, whenever suits your family.' },
                                    ].map((x) => (
                                        <Panel key={x.n} className="p-4">
                                            <Label>Your comment {x.n}</Label>
                                            <p className="font-jost text-[14px] mt-2" style={{ color: K.t1 }}>{x.c}</p>
                                            {applied && (
                                                <div className="mt-3 pt-3 border-t font-jost text-[13px]" style={{ borderColor: K.line }}>
                                                    <div className="line-through" style={{ color: K.t3 }}>{x.b}</div>
                                                    <div style={{ color: K.green }}>{x.a}</div>
                                                </div>
                                            )}
                                        </Panel>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {!applied ? (
                                        <Btn primary onClick={() => setApplied(true)}>Apply all comments</Btn>
                                    ) : (
                                        <Btn primary onClick={() => go('m-month')}>Approve, add to the month</Btn>
                                    )}
                                </div>
                                <p className="font-jost text-[12px] mt-3" style={{ color: K.t3 }}>Slides above are real engine output for Haraya. Comments and revisions are illustrative.</p>
                            </div>
                        )}

                        {step === 'm-month' && (
                            <div>
                                <Label>December · 16 posts</Label>
                                <Title>The whole month. One sitting.</Title>
                                <p className="font-jost mt-3 max-w-xl" style={{ color: K.t2 }}>No more approving post by post in a chat thread. Every piece already passed the rules. You skim, spot-check, approve.</p>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-6">
                                    {Array.from({ length: 16 }, (_, i) => (
                                        <div key={i} className="relative aspect-[4/5] border overflow-hidden" style={{ borderColor: K.line, background: K.s2 }}>
                                            <img src={i % 2 ? mornings((i % 7) + 1) : reasons((i % 7) + 1)} alt="" loading="lazy" className="w-full h-full object-cover" />
                                            <span className="absolute bottom-0 inset-x-0 font-jost text-[9px] uppercase tracking-[0.1em] px-1 py-0.5" style={{ background: 'rgba(247,243,234,0.9)', color: K.t2 }}>
                                                Dec {i * 2 + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Btn primary onClick={() => go('end-m')}>Approve the month</Btn>
                                </div>
                            </div>
                        )}

                        {step === 's-today' && (
                            <div>
                                <Label>Today · Manila 10:40 AM</Label>
                                <Title>Three buyers abroad. Call them in their morning.</Title>
                                <Panel className="mt-6 divide-y">
                                    {[
                                        { w: 'Family in Singapore', p: 'Haraya · 2BR for their parents', t: '10:40 AM there', a: 'Call now', hot: true },
                                        { w: 'Couple in Dubai', p: 'Shang Summit · asked for a walkthrough', t: '6:40 AM there', a: 'Call at 9:00', hot: false },
                                        { w: 'Nurse in Toronto', p: 'Haraya · replied to a carousel', t: '9:40 PM there', a: 'Message tonight', hot: false },
                                    ].map((r) => (
                                        <div key={r.w} className="flex items-center gap-4 px-4 py-4" style={{ borderColor: K.line }}>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-jost text-[15px]" style={{ color: K.t1 }}>{r.w}</div>
                                                <div className="font-jost text-[13px]" style={{ color: K.t2 }}>{r.p}</div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="font-cormorant text-[20px] leading-none" style={{ color: K.t1 }}>{r.t}</div>
                                                <div className="font-jost text-[11px] uppercase tracking-[0.12em] mt-1" style={{ color: r.hot ? K.green : K.t3 }}>{r.a}</div>
                                            </div>
                                        </div>
                                    ))}
                                </Panel>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Btn primary onClick={() => go('s-video')}>Make a video for the Dubai couple</Btn>
                                    <Btn onClick={() => go('s-share')}>Get something to share</Btn>
                                </div>
                            </div>
                        )}

                        {step === 's-video' && (
                            <div>
                                <Label>Create a video</Label>
                                <Title>A walkthrough for one buyer, without breaking a rule.</Title>
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <Panel className="p-4">
                                        <Label>Project</Label>
                                        <div className="flex gap-2 mt-2">
                                            {(['Haraya', 'Shang Summit'] as const).map((p) => (
                                                <button key={p} type="button" onClick={() => setProject(p)} className="font-jost text-[13px] px-3 py-2 border" style={{ borderColor: project === p ? K.green : K.line, background: project === p ? K.green : 'transparent', color: project === p ? K.bg : K.t1 }}>{p}</button>
                                            ))}
                                        </div>
                                        <div className="mt-4"><Label>Source</Label></div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {([['ai', 'AI reel from renders'], ['re-edit', 'Re-cut approved footage']] as const).map(([m, l]) => (
                                                <button key={m} type="button" onClick={() => setMode(m)} className="font-jost text-[13px] px-3 py-2 border" style={{ borderColor: mode === m ? K.green : K.line, background: mode === m ? K.green : 'transparent', color: mode === m ? K.bg : K.t1 }}>{l}</button>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {['No people', 'No voiceover', 'Logo static', 'One project'].map((r) => <Rule key={r}>{r}</Rule>)}
                                        </div>
                                    </Panel>
                                    <Panel className="p-4">
                                        <Label>Storyboard · 7 shots · {project}</Label>
                                        <ol className="mt-2 space-y-1.5 font-jost text-[13px]" style={{ color: K.t1 }}>
                                            {[
                                                'Arrival: the drive in morning light',
                                                'Lobby: stone and timber, slow push-in',
                                                project === 'Haraya' ? 'Garden deck, six floors up' : 'Amenity deck at golden hour',
                                                'Living room: window light across the floor',
                                                'Kitchen: finishes, close and quiet',
                                                'Terrace at dusk',
                                                'End card: project name, "Ask your seller"',
                                            ].map((s, i) => (
                                                <li key={s} className="flex gap-3"><span style={{ color: K.t3 }}>{i + 1}</span>{s}</li>
                                            ))}
                                        </ol>
                                        <p className="font-jost text-[12px] mt-3" style={{ color: K.t3 }}>{mode === 'ai' ? 'Renders get a realism pass, then become clips, then an edit.' : 'Cut only from footage Marketing has already approved.'}</p>
                                    </Panel>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Btn primary onClick={() => go('end-s')}>Send to Marketing review</Btn>
                                </div>
                            </div>
                        )}

                        {step === 's-share' && (
                            <div>
                                <Label>Approved this week · ready to share</Label>
                                <Title>Content you&rsquo;re allowed to post. Every day.</Title>
                                <div className="flex gap-3 overflow-x-auto pb-3 mt-6 -mx-1 px-1">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <img key={i} src={mornings(i)} alt={`Five mornings at Haraya, slide ${i}`} loading="lazy" className="shrink-0 w-[150px] md:w-[170px] block border" style={{ borderColor: K.line }} />
                                    ))}
                                </div>
                                <p className="font-jost text-[12px] mt-1" style={{ color: K.t3 }}>Real engine output for Haraya.</p>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {!copied ? <Btn primary onClick={() => setCopied(true)}>Copy caption + post</Btn> : <Btn primary onClick={() => go('end-s')}>Done for today</Btn>}
                                </div>
                                {copied && <p className="font-jost text-[13px] mt-3" style={{ color: K.green }}>Copied. Posted under your seller handle, in the approved format.</p>}
                            </div>
                        )}

                        {(step === 'end-m' || step === 'end-s') && (
                            <div>
                                <Label>{step === 'end-m' ? 'Approved in one sitting' : 'Sent to Marketing'}</Label>
                                <Title>{step === 'end-m' ? 'That was your whole month of approvals.' : 'That’s a seller’s day with the engine.'}</Title>
                                <p className="font-jost mt-3 max-w-xl" style={{ color: K.t2 }}>
                                    {step === 'end-m'
                                        ? 'The agents did the research, the writing, the rule checks and the rendering. You did the part that needs a person: judgment.'
                                        : 'You called the right buyer at the right hour, and the video request is already in Marketing’s queue. Nobody broke a rule.'}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-8">
                                    <Btn primary onClick={() => restart(step === 'end-m' ? 's-today' : 'm-queue')}>{step === 'end-m' ? 'Now try the seller seat' : 'Now try the Marketing seat'}</Btn>
                                    <a
                                        href="/calendar-page.html"
                                        onClick={() => trackBookClick('shang_demo_end')}
                                        className="font-jost uppercase tracking-[0.14em] text-[11px] px-4 py-3 border no-underline"
                                        style={{ borderColor: K.t1, color: K.t1 }}
                                    >
                                        Get this for your team
                                    </a>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
