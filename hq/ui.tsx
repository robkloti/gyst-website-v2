import React from 'react';
import { DEPTS, HQ_ROOM } from './data';

export type FeedItem = { from: string; to?: string; text: string; key: string };
export const byId = Object.fromEntries(HQ_ROOM.agents.map((a) => [a.id, a]));

export const Avatar: React.FC<{ id: string; size?: number }> = ({ id, size = 26 }) => {
    const a = byId[id];
    const dot = DEPTS.find((d) => d.zone === a?.zone)?.dot ?? '#1A1B1D';
    return a?.human ? (
        <span className="inline-flex items-center justify-center rounded-full shrink-0 bg-[#C48D61] text-white font-archivo font-semibold" style={{ width: size, height: size, fontSize: size * 0.42 }}>
            {a.name[0]}
        </span>
    ) : (
        <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: size, height: size, background: `${dot}22` }}>
            <span className="relative block bg-white border border-charcoal rounded-[4px]" style={{ width: size * 0.56, height: size * 0.46 }}>
                <span className="absolute left-[18%] right-[18%] top-[34%] bottom-[30%] rounded-full bg-charcoal" />
            </span>
        </span>
    );
};

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
    <div className={`bg-white/80 border border-charcoal/10 rounded-lg ${className}`}>{children}</div>
);

export const Stat: React.FC<{ n: string; l: string }> = ({ n, l }) => (
    <Card className="px-4 py-2.5 min-w-[110px]">
        <div className="font-archivo font-semibold text-[22px] leading-tight">{n}</div>
        <div className="text-[12px] text-steel-dark">{l}</div>
    </Card>
);

export const ViewHead: React.FC<{ title: string; sub: string; stats?: [string, string][] }> = ({ title, sub, stats }) => (
    <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-xl">
            <h1 className="font-archivo font-semibold text-[30px] md:text-[34px] tracking-tight leading-tight">{title}</h1>
            <p className="text-charcoal/70 mt-1.5 leading-relaxed">{sub}</p>
        </div>
        {stats && (
            <div className="flex flex-wrap gap-2">
                {stats.map(([n, l]) => <Stat key={l} n={n} l={l} />)}
            </div>
        )}
    </div>
);

