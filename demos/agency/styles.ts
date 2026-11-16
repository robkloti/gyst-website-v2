// Half Column, The Desk. Reference: a two-colour riso print pinned over an editor's desk
// (bright paper, ink outlines, cobalt as the working colour, one coral spot, soft client swatches). Scoped to .hc.
export const CSS = `
.hc{
  --bg:oklch(.985 .005 95);--s1:oklch(1 0 0);--s2:oklch(.957 .007 95);--s3:oklch(.925 .009 95);
  --ink:oklch(.21 .025 270);--text-2:oklch(.4 .022 270);--text-3:oklch(.5 .02 270);
  --line:oklch(.885 .008 270);--line-2:oklch(.76 .012 270);
  --accent:oklch(.47 .24 266);--accent-2:oklch(.41 .23 266);--accent-soft:oklch(.945 .035 266);--accent-ink:oklch(.985 .005 95);
  --spot:oklch(.72 .18 22);--spot-deep:oklch(.5 .17 25);--spot-soft:oklch(.95 .035 25);
  --good:oklch(.47 .12 155);--good-soft:oklch(.94 .05 155);
  --display:"Instrument Serif",Georgia,serif;--sans:"Schibsted Grotesk",system-ui,sans-serif;--mono:"DM Mono",ui-monospace,monospace;
  --r:18px;--r-in:11px;--ease:cubic-bezier(.22,1,.36,1);
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--ink);
  font:400 15px/1.5 var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;
}
.hc *,.hc *::before,.hc *::after{box-sizing:border-box}
.hc :where(h1,h2,h3,p,ul,ol,dl,dd,blockquote){margin:0;padding:0}
.hc :where(ul,ol){list-style:none}
.hc button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.hc :focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--accent)}
.hc::before{content:"";position:absolute;right:0;top:0;width:min(560px,60vw);height:420px;pointer-events:none;
  background-image:radial-gradient(oklch(.47 .24 266/.2) 1.3px,transparent 1.6px);background-size:11px 11px;
  -webkit-mask-image:radial-gradient(closest-side at 70% 30%,#000,transparent);mask-image:radial-gradient(closest-side at 70% 30%,#000,transparent)}
::-webkit-scrollbar-track{background:oklch(.957 .007 95)}
::-webkit-scrollbar-thumb{background:oklch(.76 .012 270)}
.hc-wrap{position:relative;max-width:1360px;margin:0 auto;padding:0 28px}
.hc-label{font:500 11px/1.3 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-3)}
.hc-num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.hc-in{animation:hc-in .5s var(--ease) both;animation-delay:calc(var(--i,0) * 45ms)}
@keyframes hc-in{from{opacity:0;transform:translateY(10px)}}

.hc-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:18px 0}
.hc-brand{display:flex;align-items:center;gap:10px}
.hc-brand b{font:400 30px/1 var(--display);letter-spacing:-.01em}
.hc-pill{display:inline-flex;align-items:center;gap:7px;min-height:28px;padding:0 11px;border-radius:99px;border:1.5px solid var(--ink);font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.hc-pill.solid{background:var(--ink);color:var(--bg)}
.hc-top-right{margin-left:auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.hc-clock{font:400 13px/1 var(--mono);color:var(--text-2)}
.hc-clock b{font-weight:500;color:var(--ink);margin-left:8px}

.hc-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:28px 56px;align-items:end;padding:26px 0 34px}
.hc-hero h1{font:400 clamp(48px,7.6vw,112px)/.92 var(--display);letter-spacing:-.025em}
.hc-hero h1 em{font-style:italic;color:var(--accent)}
.hc-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 22px;border-top:1.5px solid var(--ink)}
.hc-stats div{padding-top:14px;min-width:0}
.hc-stats b{display:block;font:400 42px/1 var(--display);letter-spacing:-.02em;margin:8px 0 6px;font-variant-numeric:lining-nums tabular-nums}
.hc-stats p{font-size:13.5px;line-height:1.4;color:var(--text-2)}
.is-changed{animation:hc-flash .8s ease-out}
@keyframes hc-flash{from{background-color:oklch(.72 .18 22/.45)}to{background-color:transparent}}

.hc-sec{padding-top:36px}
.hc-head{display:flex;align-items:center;gap:10px 16px;flex-wrap:wrap;padding-bottom:14px}
.hc-head h2{font:400 34px/1 var(--display);letter-spacing:-.015em}
.hc-head h2 em{font-style:italic;color:var(--accent)}
.hc-meta{margin-left:auto;display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap}

.hc-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:0 18px;border:1.5px solid var(--ink);border-radius:99px;background:var(--s1);font:600 14px/1 var(--sans);white-space:nowrap;transition:background-color .16s,border-color .16s,transform .12s var(--ease)}
.hc-btn:active{transform:scale(.97)}
.hc-btn.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.hc-icon{width:40px;height:40px;display:inline-grid;place-items:center;border:0;border-radius:99px;background:none;color:var(--text-2);transition:background-color .16s,color .16s}
@media (hover:hover){
  .hc-btn:hover{background:var(--s2)}
  .hc-btn.primary:hover{background:var(--accent-2);border-color:var(--accent-2)}
  .hc-icon:hover{background:var(--s3);color:var(--ink)}
}
.hc-chips{display:flex;gap:6px;flex-wrap:wrap}
.hc-chips button{display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 13px;border:1.5px solid var(--line-2);border-radius:99px;background:var(--s1);font:500 13.5px/1 var(--sans);white-space:nowrap;transition:background-color .16s,border-color .16s,color .16s}
.hc-chips button[aria-pressed="true"],.hc-chips button[aria-selected="true"]{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.hc-chips button i{width:9px;height:9px;border-radius:50%;flex:none}
@media (hover:hover){.hc-chips button:not([aria-pressed="true"]):not([aria-selected="true"]):hover{border-color:var(--ink)}}
.hc-swatch{display:inline-flex;align-items:center;gap:7px;padding:4px 10px 4px 8px;border-radius:99px;background:var(--soft);font:500 12.5px/1.2 var(--sans);white-space:nowrap;max-width:100%}
.hc-swatch i{width:8px;height:8px;border-radius:50%;background:var(--dot);flex:none}
.hc-swatch span{overflow:hidden;text-overflow:ellipsis}

/* yes pile */
.hc-yes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.hc-dec{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:16px 18px 18px;min-height:268px;background:var(--s1);border:1.5px solid var(--ink);border-radius:var(--r)}
.hc-dec h3{font:400 25px/1.1 var(--display);letter-spacing:-.01em;text-wrap:balance}
.hc-dec p{font-size:14px;line-height:1.5;color:var(--text-2)}
.hc-dec-foot{margin-top:auto;padding-top:4px}
.hc-dec.done{background:var(--good-soft);border-color:var(--good)}
.hc-ok{display:flex;gap:8px;align-items:flex-start;color:var(--good)!important;font-weight:500}
.hc-ok svg{flex:none;margin-top:3px}
.hc-stamp{margin-top:auto;font:500 11px/1.3 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--good)}

.hc-main{display:grid;grid-template-columns:minmax(0,1fr) 332px;gap:28px;align-items:start}

/* week */
.hc-filters{display:flex;flex-direction:column;gap:8px;padding-bottom:14px}
.hc-week{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border:1.5px solid var(--ink);border-radius:var(--r);overflow:hidden;background:var(--s1)}
.hc-day{min-width:0;border-left:1px solid var(--line)}
.hc-day:first-child{border-left:0}
.hc-day-head{display:flex;align-items:baseline;justify-content:space-between;gap:6px;padding:10px 12px;border-bottom:1px solid var(--line);font:500 12px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--text-2)}
.hc-day.today .hc-day-head{background:var(--accent);color:var(--accent-ink);border-bottom-color:var(--accent)}
.hc-day-body{display:flex;flex-direction:column;gap:8px;padding:10px;min-height:356px}
.hc-day.today .hc-day-body{background:var(--accent-soft)}
.hc-post{display:flex;flex-direction:column;align-items:flex-start;gap:6px;width:100%;padding:10px 11px 11px;text-align:left;background:var(--soft);border:1.5px solid transparent;border-radius:var(--r-in);transition:border-color .16s,opacity .2s,transform .12s var(--ease)}
.hc-post:active{transform:scale(.985)}
.hc-post-top{display:flex;align-items:center;gap:6px;width:100%;font:500 11.5px/1 var(--mono);color:var(--text-2)}
.hc-post-top svg{flex:none}
.hc-post-top em{margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-style:normal;white-space:nowrap}
.hc-post b{font:600 14.5px/1.25 var(--sans);letter-spacing:-.005em}
.hc-post small{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--text-2)}
.hc-post small i{width:8px;height:8px;border-radius:50%;background:var(--dot);flex:none}
.hc-post.needs{background:var(--s1);border-color:var(--spot-deep);border-style:dashed}
.hc-post.needs .hc-post-top em{color:var(--spot-deep)}
.hc-post.dim{opacity:.2}
.hc-post[aria-current="true"]{border-color:var(--ink);border-style:solid}
@media (hover:hover){.hc-post:hover{border-color:var(--ink);border-style:solid}}
.hc-day-empty{color:var(--text-3);font-size:13.5px;padding:6px 2px}

/* wire */
.hc-wire{background:var(--ink);color:var(--bg);border-radius:var(--r);padding:16px 18px 6px}
.hc-wire-head{display:flex;align-items:center;gap:8px;padding-bottom:10px}
.hc-wire-head h2{font:400 28px/1 var(--display)}
.hc-fresh{margin-left:auto;display:flex;align-items:center;gap:7px;font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:oklch(.8 .012 270)}
.hc-dot{width:8px;height:8px;border-radius:50%;background:oklch(.62 .015 270);position:relative;flex:none;display:inline-block}
.hc-dot.run{background:var(--spot)}
.hc-dot.run::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--spot);animation:hc-ping 1.9s var(--ease) infinite}
@keyframes hc-ping{0%{transform:scale(1);opacity:.6}80%,100%{transform:scale(2.6);opacity:0}}
.hc-wire .hc-icon{color:oklch(.86 .01 270);margin-right:-8px}
.hc-wire .hc-icon:hover{background:oklch(.32 .03 270);color:var(--bg)}
.hc-wire :focus-visible{box-shadow:0 0 0 2px var(--ink),0 0 0 4px var(--spot)}
.hc-wire ol{height:466px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 84%,transparent);mask-image:linear-gradient(#000 84%,transparent)}
.hc-wire li{padding:12px 0;border-top:1px solid oklch(1 0 0/.14)}
.hc-wire li>div{display:flex;align-items:baseline;gap:8px;margin-bottom:3px}
.hc-wire li b{font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:oklch(.82 .1 266)}
.hc-wire li.you b{color:oklch(.85 .13 155)}
.hc-wire li time{margin-left:auto;font:400 11.5px/1 var(--mono);color:oklch(.74 .012 270)}
.hc-wire li p{font-size:14.5px;line-height:1.45}

.hc-lower{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:36px}
.hc-client{display:grid;grid-template-columns:minmax(0,1.25fr) 104px 86px minmax(0,1.2fr);gap:14px;align-items:center;width:100%;padding:13px 12px;text-align:left;background:none;border:0;border-top:1px solid var(--line);border-radius:0;transition:background-color .16s}
.hc-client[aria-pressed="true"]{background:var(--soft)}
@media (hover:hover){.hc-client:hover{background:var(--s2)}.hc-client[aria-pressed="true"]:hover{background:var(--soft)}}
.hc-client h3{display:flex;align-items:center;gap:9px;font:600 15.5px/1.25 var(--sans)}
.hc-client h3 i{width:11px;height:11px;border-radius:50%;background:var(--dot);flex:none}
.hc-client h3+small{display:block;padding-left:20px;font-size:13px;color:var(--text-2)}
.hc-health{display:inline-flex;align-items:center;gap:6px;font:500 12.5px/1 var(--sans);padding:6px 10px;border-radius:99px;background:var(--s2);justify-self:start;white-space:nowrap}
.hc-health.Thriving{background:var(--good-soft);color:var(--good)}
.hc-health.Watch{background:var(--spot-soft);color:var(--spot-deep)}
.hc-ret b{display:block;font:500 15px/1.1 var(--mono);font-variant-numeric:tabular-nums}
.hc-ret small{font-size:12px;color:var(--text-3)}
.hc-client>span:last-child{font-size:13.5px;line-height:1.4;color:var(--text-2)}
.hc-client>span.sent{color:var(--good)}
.hc-queue li{padding:13px 0;border-top:1px solid var(--line)}
.hc-queue-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.hc-queue h3{font:600 15px/1.3 var(--sans)}
.hc-stage{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;margin:10px 0 6px}
.hc-stage i{height:6px;border-radius:3px;background:var(--s3)}
.hc-stage i.on{background:var(--ink)}
.hc-stage i.now{background:var(--accent)}
.hc-queue small{display:flex;justify-content:space-between;gap:10px;font:400 12px/1.3 var(--mono);color:var(--text-2)}
.hc-queue small b{font-weight:500;color:var(--accent)}

.hc-scrim{position:fixed;inset:0;z-index:70;background:oklch(.21 .025 270/.45)}
.hc-sheet{position:fixed;top:10px;right:10px;bottom:10px;z-index:71;width:min(450px,calc(100vw - 20px));background:var(--s1);border:1.5px solid var(--ink);border-radius:22px;overflow-y:auto;overscroll-behavior:contain;outline:none;color:var(--ink);font:400 15px/1.5 var(--sans)}
.hc-sheet-head{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:8px;padding:10px 10px 10px 20px;background:var(--s1);border-bottom:1px solid var(--line)}
.hc-sheet-head .hc-icon{margin-left:auto;width:44px;height:44px}
.hc-sheet-body{padding:22px 22px 26px}
.hc-sheet h2{font:400 40px/1 var(--display);letter-spacing:-.02em;margin:14px 0 6px}
.hc-sheet-when{font:400 13px/1.4 var(--mono);color:var(--text-2)}
.hc-proof{margin:20px 0;padding:18px 18px 20px;border-radius:var(--r);background:var(--soft);font:400 21px/1.32 var(--display)}
.hc-proof .hc-label{display:block;margin-bottom:10px;color:var(--text-2)}
.hc-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
.hc-facts div{padding:12px 14px;border:1px solid var(--line-2);border-radius:var(--r-in)}
.hc-facts dt{font:500 11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:8px}
.hc-facts dd{font:600 15px/1.3 var(--sans)}
.hc-sheet-note{font-size:14.5px;color:var(--text-2);margin-top:12px}

.hc-toast-host{position:fixed;left:0;right:0;bottom:20px;z-index:80;display:flex;justify-content:center;padding:0 16px;pointer-events:none}
.hc-toast{pointer-events:auto;display:flex;align-items:center;gap:14px;max-width:560px;padding:8px 8px 8px 18px;background:var(--ink);color:var(--bg);border-radius:99px;font:400 14.5px/1.35 var(--sans)}
.hc-toast button{min-height:38px;padding:0 16px;border:1.5px solid oklch(1 0 0/.5);border-radius:99px;background:none;color:var(--bg);font:600 13.5px/1 var(--sans)}

.hc-foot{display:flex;justify-content:space-between;align-items:center;gap:10px 24px;flex-wrap:wrap;margin-top:48px;padding:18px 0 26px;border-top:1.5px solid var(--ink);color:var(--text-3);font-size:13.5px}
.hc-credit{color:var(--text-2);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px;padding:10px 0}
@media (hover:hover){.hc-credit:hover{color:var(--ink)}}

@media (max-width:1180px){
  .hc-hero{grid-template-columns:minmax(0,1fr)}
  .hc-yes{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hc-dec{min-height:0}
  .hc-main{grid-template-columns:minmax(0,1fr)}
  .hc-wire ol{height:330px}
  .hc-lower{grid-template-columns:minmax(0,1fr);gap:0}
}
@media (max-width:760px){
  .hc-wrap{padding:0 16px}
  .hc-top{padding:14px 0}
  .hc-top .hc-pill:not(.solid){display:none}
  .hc-hero{padding:16px 0 26px}
  .hc-stats{grid-template-columns:minmax(0,1fr);border-top:0}
  .hc-stats div{border-top:1.5px solid var(--ink);padding:12px 0 14px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 14px;align-items:baseline}
  .hc-stats .hc-label{grid-column:1/-1}
  .hc-stats b{font-size:36px;margin:6px 0 0}
  .hc-yes{grid-template-columns:minmax(0,1fr)}
  .hc-btn{min-height:46px}
  .hc-chips button{min-height:42px}
  .hc-head .hc-meta{margin-left:0}
  .hc-head h2{font-size:30px}
  .hc-week{grid-template-columns:minmax(0,1fr)}
  .hc-day-body{min-height:0}
  .hc-client{grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;padding:14px 4px}
  .hc-client .hc-ret{grid-column:1;padding-left:20px}
  .hc-client .hc-ret b{display:inline}
  .hc-client>span:last-child{grid-column:1/-1;padding-left:20px}
  .hc-foot{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){
  .hc-in,.is-changed{animation:none}
  .hc-dot.run::after{animation:none}
  .hc *{transition-duration:.01ms!important}
}
`;
