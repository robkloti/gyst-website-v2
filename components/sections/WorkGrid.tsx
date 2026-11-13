import React from 'react';
import { SectionId, WorkCard } from '../../types';
import { ENGINE_FLOW, WORK } from '../../constants';
import { track } from '../../lib/track';
import { useSection } from '../../lib/useSection';
import { useVertical } from '../../lib/vertical';
import { Reveal } from '../ui/Reveal';

const RUG = ['#DCE8D5', '#DCE8D5', '#F0E6C4', '#F0D9D0', '#D5E0EA', '#DDD6E8'];

// Small picture of the pipeline in the warm room colours. Numbers are sample data.
const EngineFlow = () => (
    <div className="absolute inset-0 bg-[#EFE2C6] text-charcoal flex flex-col justify-between p-4 md:p-7">
        <div className="flex items-start justify-between gap-3">
            <div className="text-[17px] md:text-[26px] font-semibold tracking-tight leading-none">All your GTM. One board.</div>
            <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-charcoal/70 border border-charcoal/30 px-1.5 py-0.5">Sample data</span>
        </div>
        <div className="relative">
            <span aria-hidden="true" className="hidden md:block absolute left-3 right-3 top-1/2 border-t-2 border-dashed border-charcoal/50" />
            <ol className="relative grid grid-cols-4 md:grid-cols-7 gap-1.5 md:gap-3 m-0 p-0 list-none">
                {ENGINE_FLOW.map((s, i) => {
                    const last = i === ENGINE_FLOW.length - 1;
                    return (
                        <li key={s.label} className={`rounded-md px-2 py-2 md:px-3 md:py-5 border ${last ? 'bg-charcoal border-charcoal text-paper' : 'border-charcoal/15'}`} style={last ? undefined : { background: RUG[i] }}>
                            <div className={`font-mono text-[8.5px] md:text-[9.5px] uppercase tracking-[0.12em] ${last ? 'text-steel' : 'text-charcoal/60'}`}>{s.label}</div>
                            <div className="text-[14px] md:text-[24px] font-semibold leading-tight mt-1 whitespace-nowrap">{s.n}</div>
                        </li>
                    );
                })}
            </ol>
        </div>
        <div className="text-[11.5px] md:text-[13px] text-charcoal/70">Shops with a reason to buy this week, scored, sorted and contacted.</div>
    </div>
);

// GGC runs as BADSIDE and keeps its own look: ink, cream and oxblood, serif italic. No GYST tokens in here.
const GgcCard: React.FC<{ card: WorkCard; onGo: (e: React.MouseEvent) => void; n: string }> = ({ card, onGo, n }) => (
    <a href={card.href} onClick={onGo} className="group relative flex flex-col h-full overflow-hidden no-underline bg-[#0B0B0B] border border-[#2A2A2A] text-[#E9E1D0]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[240px] overflow-hidden bg-black border-b border-[#2A2A2A]">
            <img src={card.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 brightness-[.55]" />
            <span className="absolute left-4 bottom-3 font-['Newsreader',serif] italic font-semibold text-[44px] leading-none tracking-tight text-[#E9E1D0]">BADSIDE</span>
            <span className="absolute right-0 top-4 bg-[#7A1418] text-[#E9E1D0] font-jost text-[10px] uppercase tracking-[0.22em] px-3 py-1">Manila</span>
        </div>
        <div className="p-5 flex flex-col gap-2">
            <div className="font-jost text-[11px] uppercase tracking-[0.2em] text-[#9A9385]">{n} / {card.tag}</div>
            <h3 className="font-['Newsreader',serif] italic font-medium text-[28px] leading-tight text-[#E9E1D0]">{card.title}</h3>
            <p className="font-jost text-[14.5px] leading-relaxed text-[#B3AB9B]">{card.line}</p>
            <span className="self-start mt-3 font-jost text-[11px] uppercase tracking-[0.2em] bg-[#E9E1D0] text-[#0B0B0B] px-4 py-2.5 group-hover:bg-white transition-colors">{card.cta}</span>
        </div>
    </a>
);

export const WorkGrid: React.FC<{ onInView: (id: SectionId) => void }> = ({ onInView }) => {
    const ref = useSection(SectionId.REMEMBER, onInView);
    const { vertical, setVertical } = useVertical();

    const go = (card: WorkCard) => (e: React.MouseEvent) => {
        track('work_card_click', { card: card.id, vertical: vertical.key });
        if (card.id === 'ggc') {
            e.preventDefault();
            setVertical('studio');
            document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={ref} id="work" className="relative w-full py-24 px-4 sm:px-6 md:px-12 z-10 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-4">The work</div>
                    <h2 className="font-display text-4xl md:text-6xl text-paper max-w-3xl">Seven builds. Open any of them.</h2>
                    <p className="text-steel text-lg mt-5 max-w-2xl">Each one started as a business written down. Then the software went on top.</p>
                    <a href="/demos" onClick={() => track('work_card_click', { card: 'demos', vertical: vertical.key })} className="inline-flex items-center gap-2 mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-steel hover:text-paper no-underline border-b border-paper/25 pb-0.5">
                        More demo dashboards <span aria-hidden="true">&rarr;</span>
                    </a>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-12">
                    {WORK.map((card, i) => {
                        const n = String(i + 1).padStart(2, '0');
                        const span = card.span === 'wide' ? 'lg:col-span-8' : 'lg:col-span-4';
                        if (card.id === 'ggc') {
                            return <div key={card.id} className={span}><GgcCard card={card} onGo={go(card)} n={n} /></div>;
                        }
                        const yours = vertical.proof === card.id;
                        // A narrow card next to a wide one stretches its picture to match the row.
                        const tall = card.id === 'shang-case';
                        return (
                            <a key={card.id} href={card.href} onClick={go(card)} className={`${span} group flex flex-col no-underline bg-[#202124] border transition-colors ${yours ? 'border-paper' : 'border-paper/20 hover:border-paper/50'}`}>
                                <div className={`relative overflow-hidden bg-[#111] border-b border-paper/10 ${card.span === 'wide' ? 'aspect-[16/10] lg:aspect-[16/8.4]' : tall ? 'aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[240px]' : 'aspect-[16/10]'}`}>
                                    {card.image
                                        ? <img src={card.image} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${tall ? 'object-center' : 'object-top'}`} />
                                        : <EngineFlow />}
                                </div>
                                <div className="p-5 flex flex-col gap-2 lg:min-h-[168px]">
                                    <div className="flex justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                                        <span>{n} &middot; {card.tag}</span>
                                        <span>{yours ? 'Closest to you' : card.kind}</span>
                                    </div>
                                    <h3 className="text-paper text-[20px] font-semibold leading-tight">{card.title}</h3>
                                    <p className="text-steel text-[14.5px] leading-relaxed">{card.line}</p>
                                    <span className="mt-auto pt-3 text-paper text-[14.5px] font-semibold flex items-center gap-2">
                                        {card.cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
