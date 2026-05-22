import React from 'react';
import { StatusPill } from './primitives/StatusPill';
import './tokens.css';
import './MissionControlSurface.css';

/*
 * Page 2 §7 showroom — ATELIER edition.
 * Matches the slide-system.html mockup: Newsreader serif headline, amber accent,
 * and the real Mission Control screenshot (public/mission-control-dashboard.png)
 * in a styled panel. This intentionally overrides the deep-orange CSS-dashboard
 * spec for this section (Rob's call, 2026-05-21) — the real dashboard reads richer.
 * The screenshot is a credibility texture; copy stays as live, responsive text.
 */

const MECHANISMS: ReadonlyArray<{ n: string; name: string; desc: string }> = [
  {
    n: '01',
    name: 'Voice setter',
    desc: 'Answers your after-hours calls. Books the job before they hang up.',
  },
  {
    n: '02',
    name: 'Reactivation engine',
    desc: 'Works your dead quote list every Tuesday. 15–25% re-engage.',
  },
  {
    n: '03',
    name: 'Live dashboard',
    desc: 'Every dollar tied back to the ad that produced it. No guessing.',
  },
];

export const MissionControlSurface: React.FC = () => (
  <section
    className="gyst-surface mc-atelier"
    role="region"
    aria-label="Live preview of the GYST Mission Control dashboard, showing example pipeline data."
  >
    <div className="mc-atelier__top">
      <span className="mc-atelier__crumb">
        ~/system<span className="slash">/</span>mission-control<span className="slash">/</span>
        <span className="last">live</span>
      </span>
      <StatusPill />
    </div>

    <h1 className="mc-atelier__headline">
      The system is <span className="it">real.</span>
    </h1>

    <div className="mc-atelier__body">
      <div className="mc-atelier__rows">
        {MECHANISMS.map((m) => (
          <div className="mc-atelier__row" key={m.n}>
            <span className="mc-atelier__num">{m.n}</span>
            <div>
              <div className="mc-atelier__name">{m.name}</div>
              <div className="mc-atelier__desc">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mc-atelier__panel">
        <div className="mc-atelier__panel-head">
          <span className="mc-atelier__panel-title">Mission Control</span>
          <span className="mc-atelier__panel-tag">v0.18 · ATELIER</span>
        </div>
        <div className="mc-atelier__shot">
          <img
            src="/mission-control-dashboard.png"
            alt="GYST Mission Control dashboard showing live pipeline, service health, campaign volume, and recent runs across Rob's businesses."
            loading="lazy"
          />
        </div>
        <p className="mc-atelier__cap">
          This runs <b>3 of my own businesses</b> right now. Not a mockup.
        </p>
      </div>
    </div>
  </section>
);
