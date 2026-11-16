// Slatewing Storm Desk. Reference: a Swiss weather bulletin pinned to a site office wall
// (glacier grey paper, slate ink, heavy grotesque, one vermilion warning colour, thick rules). Scoped to .sw.
export const CSS = `
.sw{
  --bg:oklch(.945 .008 235);--s1:oklch(.992 .003 235);--s2:oklch(.905 .012 235);--s3:oklch(.86 .014 235);
  --ink:oklch(.23 .03 250);--text-2:oklch(.4 .025 250);--text-3:oklch(.49 .022 250);
  --line:oklch(.82 .014 240);--line-2:oklch(.68 .02 245);
  --sig:oklch(.66 .2 36);--sig-deep:oklch(.49 .185 33);--sig-soft:oklch(.94 .045 45);
  --good:oklch(.45 .12 155);--good-soft:oklch(.93 .05 155);--wait:oklch(.46 .09 75);
  --display:"Bricolage Grotesque","Arial Narrow",sans-serif;--sans:"Bricolage Grotesque",system-ui,sans-serif;--mono:"Spline Sans Mono",ui-monospace,monospace;
  --ease:cubic-bezier(.19,1,.22,1);
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--ink);
  font:400 15px/1.5 var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;
}
.sw *,.sw *::before,.sw *::after{box-sizing:border-box}
.sw :where(h1,h2,h3,p,ul,ol,dl,dd){margin:0;padding:0}
.sw :where(ul,ol){list-style:none}
.sw button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.sw :focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--sig-deep)}
::-webkit-scrollbar-track{background:oklch(.905 .012 235)}
::-webkit-scrollbar-thumb{background:oklch(.68 .02 245)}
.sw-wrap{max-width:1380px;margin:0 auto;padding:0 28px}
.sw-label{font:500 11px/1.2 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--text-3)}
.sw-num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.sw-in{animation:sw-in .38s var(--ease) both;animation-delay:calc(var(--i,0) * 40ms)}
@keyframes sw-in{from{opacity:0;transform:translateY(8px)}}

/* masthead */
.sw-top{background:var(--ink);color:var(--s1)}
.sw-top .sw-wrap{display:flex;align-items:center;gap:14px;flex-wrap:wrap;min-height:56px;padding-top:8px;padding-bottom:8px}
.sw-brand{display:flex;align-items:center;gap:10px}
.sw-brand b{font:800 20px/1 var(--display);letter-spacing:-.01em}
.sw-brand span{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:oklch(.82 .014 240);padding:5px 8px;border:1px solid oklch(.5 .02 245)}
.sw-top-right{margin-left:auto;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.sw-demo{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;background:var(--s1);color:var(--ink);padding:6px 9px}
.sw-clock{font:500 12px/1 var(--mono);color:oklch(.86 .014 235)}
.sw-clock b{font-weight:500;color:var(--s1);margin-left:8px}

/* bulletin */
.sw-hero{border-bottom:2px solid var(--ink);background-image:repeating-linear-gradient(105deg,oklch(.23 .03 250/.045) 0 1px,transparent 1px 10px)}
.sw-hero .sw-wrap{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px 56px;align-items:end;padding-top:40px;padding-bottom:30px}
.sw-hero h1{font:800 clamp(40px,6.4vw,92px)/.9 var(--display);letter-spacing:-.03em;word-spacing:.08em;text-wrap:balance}
.sw-hero h1 em{font-style:normal;color:var(--sig-deep)}
.sw-hero p{margin-top:16px;max-width:60ch;color:var(--text-2);font-size:16px}
.sw-storm{display:grid;grid-template-columns:auto auto;gap:4px 22px;align-items:end;padding:14px 16px;background:var(--s1);border:2px solid var(--ink)}
.sw-storm .sw-label{grid-column:1/-1}
.sw-storm b{font:800 54px/.9 var(--display);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.sw-bars{display:flex;align-items:flex-end;gap:8px;height:74px}
.sw-bars div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;width:34px}
.sw-bars i{display:block;width:100%;background:var(--ink)}
.sw-bars div:last-child i{background:var(--sig)}
.sw-bars span{font:500 10.5px/1 var(--mono);color:var(--text-3)}
.sw-bars em{font:500 11px/1 var(--mono);font-style:normal}

/* section heads */
.sw-sec{padding-top:34px}
.sw-head{display:flex;align-items:center;gap:10px 16px;flex-wrap:wrap;padding-bottom:12px;border-bottom:2px solid var(--ink)}
.sw-head h2{font:800 24px/1 var(--display);letter-spacing:-.02em}
.sw-head .sw-idx{font:500 11px/1 var(--mono);color:var(--s1);background:var(--ink);padding:5px 6px}
.sw-meta{margin-left:auto;display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap}

.sw-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:0 16px;border:2px solid var(--ink);border-radius:0;background:var(--s1);font:600 14px/1 var(--sans);white-space:nowrap;transition:background-color .14s,color .14s,transform .1s var(--ease)}
.sw-btn:active{transform:translateY(1px)}
.sw-btn.primary{background:var(--ink);color:var(--s1)}
.sw-icon{width:40px;height:40px;display:inline-grid;place-items:center;border:0;background:none;color:var(--text-2);transition:background-color .14s,color .14s}
@media (hover:hover){
  .sw-btn:hover{background:var(--s2)}
  .sw-btn.primary:hover{background:var(--sig-deep);border-color:var(--sig-deep)}
  .sw-icon:hover{background:var(--s2);color:var(--ink)}
}
.sw-chips{display:flex;gap:6px;flex-wrap:wrap}
.sw-chips button{display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 12px;border:1px solid var(--line-2);background:transparent;font:500 13.5px/1 var(--sans);white-space:nowrap;transition:background-color .14s,color .14s,border-color .14s}
.sw-chips button[aria-pressed="true"],.sw-chips button[aria-selected="true"]{background:var(--ink);border-color:var(--ink);color:var(--s1)}
.sw-chips button i{font:500 11px/1 var(--mono);font-style:normal;opacity:.75}
@media (hover:hover){.sw-chips button:not([aria-pressed="true"]):not([aria-selected="true"]):hover{background:var(--s2)}}

/* calls (mission control) */
.sw-calls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding-top:14px}
.sw-call{display:flex;flex-direction:column;gap:10px;padding:16px 18px 18px;min-height:214px;background:var(--s1);border:1px solid var(--ink);border-top:6px solid var(--sig)}
.sw-call h3{font:700 21px/1.15 var(--display);letter-spacing:-.015em;text-wrap:balance}
.sw-call p{color:var(--text-2);font-size:14.5px;line-height:1.5}
.sw-call-foot{margin-top:auto;padding-top:4px}
.sw-call.done{border-top-color:var(--good);background:transparent}
.sw-call.done h3{color:var(--text-2)}
.sw-ok{display:flex;gap:9px;align-items:flex-start;color:var(--good)!important;font-weight:500}
.sw-ok svg{flex:none;margin-top:3px}
.sw-count{display:inline-grid;place-items:center;min-width:26px;height:26px;padding:0 7px;background:var(--sig);color:var(--ink);font:600 13px/1 var(--mono)}
.sw-count.zero{background:var(--good-soft);color:var(--good)}

/* figures */
.sw-figs{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:14px;padding-top:14px}
.sw-fig{padding:16px 18px;background:var(--s1);border:1px solid var(--line-2);min-width:0;display:flex;flex-direction:column}
.sw-fig-val{font:800 46px/1 var(--display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;margin:10px 0 6px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.sw-fig-val small{font:400 14px/1.2 var(--sans);letter-spacing:0;color:var(--text-2)}
.sw-fig>p{color:var(--text-2);font-size:14px}
.sw-fig.lead{background:var(--ink);color:var(--s1);border-color:var(--ink)}
.sw-fig.lead .sw-label{color:oklch(.8 .014 240)}
.sw-fig.lead small{color:oklch(.84 .014 240)}
.sw-fig.lead .sw-fig-val{font-size:60px}
.sw-stagebar{display:flex;gap:3px;margin-top:auto;padding-top:12px}
.sw-stagebar div{min-width:0}
.sw-stagebar i{display:block;height:8px;background:oklch(.99 .003 235/.3)}
.sw-stagebar div:nth-child(n+4) i{background:var(--sig)}
.sw-stagebar span{display:block;margin-top:6px;font:500 10.5px/1.25 var(--mono);color:oklch(.84 .014 240)}
.sw-src{margin-top:10px}
.sw-src li{display:grid;grid-template-columns:104px minmax(0,1fr) 28px;gap:10px;align-items:center;padding:5px 0;font-size:14px}
.sw-src i{display:block;height:10px;background:var(--ink);width:calc(var(--v) * 1%)}
.sw-src b{font:500 13px/1 var(--mono);text-align:right}
.is-changed{animation:sw-flash .7s ease-out}
@keyframes sw-flash{from{background-color:oklch(.66 .2 36/.45)}to{background-color:transparent}}

/* claim board */
.sw-board{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;padding-top:14px;align-items:start}
.sw-col-head{display:flex;align-items:baseline;gap:8px;padding:0 2px 8px;border-bottom:1px solid var(--ink);margin-bottom:10px}
.sw-col-head b{font:700 15.5px/1.1 var(--display);letter-spacing:-.01em}
.sw-col-head span{font:500 11px/1 var(--mono);color:var(--text-3)}
.sw-col-head em{margin-left:auto;font:500 12px/1 var(--mono);font-style:normal}
.sw-card{display:flex;flex-direction:column;gap:3px;width:100%;padding:11px 12px 10px;margin-bottom:8px;text-align:left;background:var(--s1);border:1px solid var(--line-2);border-radius:0;transition:border-color .14s,opacity .2s,transform .1s var(--ease)}
.sw-card:active{transform:translateY(1px)}
.sw-card b{font:600 15.5px/1.2 var(--sans);letter-spacing:-.005em}
.sw-card small{font-size:13px;line-height:1.3;color:var(--text-2)}
.sw-card-row{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-top:7px;font:500 12px/1.2 var(--mono);color:var(--text-2)}
.sw-card-row strong{font:600 14px/1 var(--mono);color:var(--ink)}
.sw-flag{display:flex;align-items:center;gap:6px;margin:-11px -12px 8px;padding:6px 12px;background:var(--sig-soft);color:var(--sig-deep);font:500 11.5px/1.25 var(--mono);letter-spacing:.02em;border-bottom:1px solid var(--sig)}
.sw-flag.ok{background:var(--good-soft);color:var(--good);border-bottom-color:var(--good)}
.sw-flag svg{flex:none}
.sw-card.dim{opacity:.25}
.sw-card[aria-current="true"]{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink)}
@media (hover:hover){.sw-card:hover{border-color:var(--ink)}}
.sw-col-empty{padding:14px 2px;color:var(--text-3);font-size:13.5px}

/* lower */
.sw-lower{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr) minmax(0,.95fr);gap:28px}
.sw-crew{padding:14px 0;border-bottom:1px solid var(--line)}
.sw-crew-top{display:flex;align-items:baseline;gap:8px}
.sw-crew-top b{font:700 17px/1 var(--display)}
.sw-crew-top span{font-size:13.5px;color:var(--text-2)}
.sw-crew-top em{margin-left:auto;font:500 12.5px/1 var(--mono);font-style:normal}
.sw-crew p{font-size:14px;color:var(--text-2);margin:5px 0 9px}
.sw-meter{height:10px;background:var(--s3);position:relative}
.sw-meter i{position:absolute;inset:0 auto 0 0;width:calc(var(--v) * 1%);background:var(--ink)}
.sw-meter.full i{background:var(--good)}
.sw-order{display:grid;grid-template-columns:14px minmax(0,1fr);gap:2px 10px;padding:13px 0;border-bottom:1px solid var(--line)}
.sw-order svg{margin-top:4px}
.sw-order h3{font:500 15px/1.35 var(--sans)}
.sw-order p{grid-column:2;font-size:13.5px;color:var(--text-2)}
.sw-order p b{font-weight:500}
.sw-order.ok svg,.sw-order.ok p b{color:var(--good)}
.sw-order.wait svg,.sw-order.wait p b{color:var(--wait)}
.sw-order.bad svg,.sw-order.bad p b{color:var(--sig-deep)}
.sw-feed ol{height:444px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 82%,transparent);mask-image:linear-gradient(#000 82%,transparent)}
.sw-feed li{padding:12px 0;border-bottom:1px solid var(--line)}
.sw-feed li>div{display:flex;align-items:center;gap:8px;margin-bottom:3px}
.sw-feed li b{font:500 11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink);background:var(--s2);padding:4px 6px}
.sw-feed li.you b{background:var(--good-soft);color:var(--good)}
.sw-feed li time{margin-left:auto;font:500 11.5px/1 var(--mono);color:var(--text-3)}
.sw-feed li p{font-size:14.5px;line-height:1.45}
.sw-fresh{display:flex;align-items:center;gap:8px;font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--text-3)}
.sw-dot{width:8px;height:8px;background:var(--text-3);position:relative;flex:none;display:inline-block}
.sw-dot.run{background:var(--sig)}
.sw-dot.run::after{content:"";position:absolute;inset:0;background:var(--sig);animation:sw-ping 1.8s var(--ease) infinite}
@keyframes sw-ping{0%{transform:scale(1);opacity:.6}80%,100%{transform:scale(2.6);opacity:0}}

/* sheet */
.sw-scrim{position:fixed;inset:0;z-index:70;background:oklch(.23 .03 250/.5)}
.sw-sheet{position:fixed;top:0;right:0;bottom:0;z-index:71;width:min(460px,100vw);background:var(--s1);border-left:2px solid var(--ink);overflow-y:auto;overscroll-behavior:contain;outline:none;color:var(--ink);font:400 15px/1.5 var(--sans)}
.sw-sheet-head{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 24px;background:var(--ink);color:var(--s1)}
.sw-sheet-head .sw-label{color:oklch(.86 .014 235)}
.sw-sheet-head .sw-icon{margin-left:auto;width:44px;height:44px;color:var(--s1)}
.sw-sheet-head .sw-icon:hover{background:oklch(.35 .03 250);color:var(--s1)}
.sw-sheet-body{padding:24px}
.sw-sheet h2{font:800 36px/.98 var(--display);letter-spacing:-.03em;margin-bottom:6px}
.sw-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;margin:22px 0 8px}
.sw-steps li{font:500 10.5px/1.25 var(--mono);color:var(--text-3)}
.sw-steps li::before{content:"";display:block;height:8px;margin-bottom:7px;background:var(--s3)}
.sw-steps li.on::before{background:var(--ink)}
.sw-steps li.now{color:var(--ink)}
.sw-steps li.now::before{background:var(--sig)}
.sw-facts{display:grid;grid-template-columns:1fr 1fr;border-top:2px solid var(--ink);margin:20px 0}
.sw-facts div{padding:12px 0;border-bottom:1px solid var(--line)}
.sw-facts div:nth-child(even){padding-left:16px;border-left:1px solid var(--line)}
.sw-facts dt{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);margin-bottom:7px}
.sw-facts dd{font:600 17px/1.25 var(--sans)}
.sw-note{font-size:16px;line-height:1.55;margin-top:8px}
.sw-sheet .sw-flag{margin:0 0 16px;border:1px solid var(--sig);font-size:12.5px;padding:9px 12px}
.sw-sheet .sw-flag.ok{border-color:var(--good)}

/* toast */
.sw-toast-host{position:fixed;left:0;right:0;bottom:20px;z-index:80;display:flex;justify-content:center;padding:0 16px;pointer-events:none}
.sw-toast{pointer-events:auto;display:flex;align-items:center;gap:14px;max-width:560px;padding:8px 8px 8px 16px;background:var(--ink);color:var(--s1);font:400 14.5px/1.4 var(--sans)}
.sw-toast button{min-height:38px;padding:0 14px;border:1px solid oklch(.99 .003 235/.5);background:none;color:var(--s1);font:600 13.5px/1 var(--sans)}

.sw-foot{display:flex;justify-content:space-between;align-items:center;gap:10px 24px;flex-wrap:wrap;margin-top:44px;padding:18px 0 26px;border-top:2px solid var(--ink);color:var(--text-3);font-size:13.5px}
.sw-credit{color:var(--text-2);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px;padding:10px 0}
@media (hover:hover){.sw-credit:hover{color:var(--ink)}}

@media (max-width:1100px){
  .sw-hero .sw-wrap{grid-template-columns:minmax(0,1fr)}
  .sw-storm{justify-self:start}
  .sw-calls{grid-template-columns:minmax(0,1fr)}
  .sw-call{min-height:0}
  .sw-figs{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .sw-fig.lead{grid-column:1/-1}
  .sw-board{grid-template-columns:minmax(0,1fr)}
  .sw-lower{grid-template-columns:minmax(0,1fr);gap:0}
  .sw-feed ol{height:340px}
}
@media (max-width:760px){
  .sw-wrap{padding:0 16px}
  .sw-brand span{display:none}
  .sw-hero .sw-wrap{padding-top:28px;padding-bottom:24px}
  .sw-figs{grid-template-columns:minmax(0,1fr)}
  .sw-fig.lead .sw-fig-val{font-size:48px}
  .sw-btn{min-height:46px}
  .sw-chips button{min-height:42px}
  .sw-head .sw-meta{margin-left:0}
  .sw-sec{padding-top:28px}
  .sw-foot{flex-direction:column;align-items:flex-start}
  .sw-sheet-body{padding:20px 18px}
}
@media (prefers-reduced-motion:reduce){
  .sw-in,.is-changed{animation:none}
  .sw-dot.run::after{animation:none}
  .sw *{transition-duration:.01ms!important}
}
`;
