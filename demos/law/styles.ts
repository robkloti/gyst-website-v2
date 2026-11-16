// Marlowe Tennant Chambers. Reference: a partner's desk under a banker's lamp
// (green-black leather, brass hairlines, parchment pleading paper with a red margin rule). Scoped to .mt.
export const CSS = `
.mt{
  --bg:oklch(.185 .024 165);--s1:oklch(.22 .027 165);--s2:oklch(.26 .03 165);--s3:oklch(.31 .032 165);
  --line:oklch(.86 .06 88/.16);--line-2:oklch(.86 .06 88/.32);
  --text-1:oklch(.94 .016 90);--text-2:oklch(.82 .02 95);--text-3:oklch(.7 .026 100);
  --brass:oklch(.81 .09 85);--brass-ink:oklch(.22 .03 85);
  --good:oklch(.82 .11 150);--bad:oklch(.76 .13 35);
  --paper:oklch(.957 .018 90);--paper-2:oklch(.92 .022 88);--paper-line:oklch(.82 .025 85);
  --ink:oklch(.24 .02 80);--ink-2:oklch(.41 .02 80);--ink-3:oklch(.49 .02 80);--rule:oklch(.56 .16 25);
  --p-good:oklch(.42 .09 155);--p-bad:oklch(.47 .14 30);--p-brass:oklch(.47 .08 75);
  --serif:"Source Serif 4",Georgia,serif;--sans:"IBM Plex Sans",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,monospace;
  --ease:cubic-bezier(.23,1,.32,1);
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text-1);
  font:400 15px/1.55 var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;
}
.mt *,.mt *::before,.mt *::after{box-sizing:border-box}
.mt :where(h1,h2,h3,h4,p,ul,ol,dl,dd,blockquote){margin:0;padding:0}
.mt :where(ul,ol){list-style:none}
.mt button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.mt :focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--brass)}
.mt::before{content:"";position:absolute;inset:0 0 auto 0;height:640px;pointer-events:none;background:radial-gradient(720px 420px at 64% -6%,oklch(.81 .09 85/.11),transparent 70%)}
.mt::after{content:"";position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
::-webkit-scrollbar-track{background:oklch(.185 .024 165)}
::-webkit-scrollbar-thumb{background:oklch(.36 .032 165)}
.mt-label{font:500 11px/1.3 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--text-3)}
.mt-num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.mt-in{animation:mt-in .6s var(--ease) both;animation-delay:calc(var(--i,0) * 55ms)}
@keyframes mt-in{from{opacity:0;transform:translateY(6px)}}

.mt-shell{position:relative;z-index:1;display:grid;grid-template-columns:292px minmax(0,1fr);grid-template-areas:"side main" "log main" "foot foot";grid-template-rows:auto 1fr auto;max-width:1420px;margin:0 auto}
.mt-side{grid-area:side;padding:28px 26px 8px 30px;border-right:1px solid var(--line)}
.mt-logcol{grid-area:log;padding:20px 26px 30px 30px;border-right:1px solid var(--line)}
.mt-main{grid-area:main;padding:28px 34px 0 38px;min-width:0}

.mt-brand b{display:block;font:400 27px/1.05 var(--serif);letter-spacing:-.01em}
.mt-brand span{display:block;margin-top:8px;font:500 11px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--brass)}
.mt-demo{display:inline-block;margin-top:18px;font:500 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--text-2);border:1px solid var(--line-2);padding:7px 10px}
.mt-date{margin-top:16px;font:400 14px/1.4 var(--sans);color:var(--text-2)}
.mt-date b{font:500 14px/1 var(--mono);color:var(--text-1);margin-left:6px}
.mt-brief{margin-top:26px;border-top:1px solid var(--line-2)}
.mt-brief li{padding:15px 0 14px;border-bottom:1px solid var(--line)}
.mt-brief b{display:flex;align-items:baseline;gap:8px;margin-top:8px;font:300 36px/1 var(--serif);letter-spacing:-.02em;font-variant-numeric:lining-nums tabular-nums}
.mt-brief b small{font:400 13.5px/1.2 var(--sans);letter-spacing:0;color:var(--text-2)}
.mt-brief p{margin-top:5px;font-size:13.5px;line-height:1.45;color:var(--text-2)}
.is-changed{animation:mt-flash .8s ease-out}
@keyframes mt-flash{from{background-color:oklch(.81 .09 85/.35)}to{background-color:transparent}}

.mt-logstick{position:sticky;top:20px}
.mt-loghead{display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--line-2)}
.mt-loghead h2{font:400 21px/1 var(--serif)}
.mt-fresh{margin-left:auto;display:flex;align-items:center;gap:7px;font:500 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--text-3)}
.mt-dot{width:7px;height:7px;border-radius:50%;background:var(--text-3);position:relative;flex:none;display:inline-block}
.mt-dot.run{background:var(--brass)}
.mt-dot.run::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--brass);animation:mt-ping 2.2s var(--ease) infinite}
@keyframes mt-ping{0%{transform:scale(1);opacity:.55}80%,100%{transform:scale(2.5);opacity:0}}
.mt-log{height:520px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 84%,transparent);mask-image:linear-gradient(#000 84%,transparent)}
.mt-log li{padding:12px 0;border-bottom:1px solid var(--line)}
.mt-log li>div{display:flex;align-items:baseline;gap:8px;margin-bottom:3px}
.mt-log li b{font:500 11px/1.2 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--brass)}
.mt-log li.you b{color:var(--good)}
.mt-log li time{margin-left:auto;font:400 11.5px/1 var(--mono);color:var(--text-3)}
.mt-log li p{font-size:14px;line-height:1.5;color:var(--text-1)}

.mt-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:0 18px;border:1px solid var(--line-2);border-radius:3px;background:transparent;font:500 14px/1 var(--sans);white-space:nowrap;transition:background-color .16s,border-color .16s,transform .12s var(--ease)}
.mt-btn:active{transform:scale(.98)}
.mt-btn.primary{background:var(--brass);border-color:var(--brass);color:var(--brass-ink);font-weight:600}
.mt-icon{width:40px;height:40px;display:inline-grid;place-items:center;border:0;border-radius:3px;background:none;color:var(--text-2);transition:background-color .16s,color .16s}
@media (hover:hover){
  .mt-btn:hover{background:var(--s2)}
  .mt-btn.primary:hover{background:oklch(.86 .09 86)}
  .mt-icon:hover{background:var(--s2);color:var(--text-1)}
}
.mt-tabs{display:inline-flex;gap:0;border:1px solid var(--line-2);border-radius:3px;max-width:100%;flex-wrap:wrap}
.mt-tabs button{display:inline-flex;align-items:center;gap:8px;min-height:36px;padding:0 14px;border:0;background:none;color:var(--text-2);font:500 13.5px/1 var(--sans);white-space:nowrap;transition:background-color .16s,color .16s}
.mt-tabs button+button{border-left:1px solid var(--line)}
.mt-tabs button[aria-selected="true"],.mt-tabs button[aria-pressed="true"]{background:var(--s3);color:var(--text-1)}
.mt-tabs button i{font:400 12px/1 var(--mono);font-style:normal;color:var(--brass)}
@media (hover:hover){.mt-tabs button:hover{color:var(--text-1)}}

.mt-hello h1{font:300 clamp(34px,4.1vw,58px)/1.06 var(--serif);letter-spacing:-.02em;text-wrap:balance;max-width:27ch}
.mt-hello h1 em{font-style:italic;color:var(--brass)}
.mt-sec{padding-top:38px}
.mt-head{display:flex;align-items:flex-end;gap:10px 18px;flex-wrap:wrap;padding-bottom:12px;border-bottom:1px solid var(--line-2)}
.mt-head h2{font:400 26px/1.05 var(--serif);letter-spacing:-.01em}
.mt-meta{margin-left:auto;display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap}

/* for signature */
.mt-sign{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:6px 18px;align-items:center;padding:20px 0;border-bottom:1px solid var(--line)}
.mt-sign>i{font:italic 300 30px/1 var(--serif);color:var(--brass);align-self:start;padding-top:2px}
.mt-sign h3{font:400 22px/1.25 var(--serif);letter-spacing:-.005em;margin:5px 0 4px}
.mt-sign p{color:var(--text-2);font-size:14.5px;max-width:72ch}
.mt-sign.done h3{color:var(--text-2)}
.mt-sign.done>i{color:var(--good)}
.mt-ok{display:flex;gap:9px;align-items:flex-start;color:var(--good)!important}
.mt-ok svg{flex:none;margin-top:4px}
.mt-stamp{font:500 11px/1.3 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--good);text-align:right}

/* reading room */
.mt-room{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:26px;padding-top:18px;align-items:start}
.mt-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 14px;width:100%;padding:14px 14px 14px 16px;text-align:left;background:none;border:0;border-bottom:1px solid var(--line);border-left:2px solid transparent;transition:background-color .16s,border-color .16s}
.mt-item h3{font:400 19px/1.25 var(--serif)}
.mt-item small{grid-column:1;font-size:13.5px;line-height:1.4;color:var(--text-2)}
.mt-item .mt-when{font:400 12px/1.4 var(--mono);color:var(--text-3)}
.mt-item[aria-current="true"]{background:var(--s1);border-left-color:var(--brass)}
@media (hover:hover){.mt-item:hover{background:var(--s1)}}
.mt-score{grid-row:1/span 3;grid-column:2;align-self:center;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;font:500 15px/1 var(--mono);
  background:conic-gradient(var(--tone) calc(var(--v) * 1%),oklch(.86 .06 88/.14) 0);position:relative;color:var(--text-1)}
.mt-score::before{content:"";position:absolute;inset:3px;border-radius:50%;background:var(--bg)}
.mt-item[aria-current="true"] .mt-score::before{background:var(--s1)}
.mt-score span{position:relative}
.mt-tick{grid-row:1/span 3;grid-column:2;align-self:center;color:var(--good);display:flex;align-items:center;gap:6px;font:500 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase}
.mt-pages{grid-row:1/span 3;grid-column:2;align-self:center;font:400 12px/1 var(--mono);color:var(--text-3);border:1px solid var(--line-2);padding:6px 7px}

/* paper */
.mt-paper{position:relative;background:var(--paper);color:var(--ink);font:400 16px/28px var(--serif);border-radius:2px;box-shadow:0 1px 1px oklch(.1 .02 165/.5),0 6px 14px oklch(.1 .02 165/.4),0 22px 44px oklch(.1 .02 165/.35);overflow:hidden}
.mt-paper-in{position:relative;padding:28px 34px 28px 74px;min-height:588px}
.mt-paper-in::before{content:"";position:absolute;left:54px;top:0;bottom:0;width:4px;border-left:1px solid var(--rule);border-right:1px solid var(--rule);opacity:.7}
.mt-gutter{position:absolute;left:0;top:28px;bottom:0;width:46px;overflow:hidden;text-align:right;font:400 11px/28px var(--mono);color:var(--ink-3);user-select:none}
.mt-gutter span{display:block}
.mt-paper .mt-label{color:var(--ink-3);line-height:28px;display:block}
.mt-paper h3{font:400 30px/28px var(--serif);letter-spacing:-.015em;padding:14px 0;line-height:28px}
.mt-paper h4{font:500 11px/28px var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin-top:28px}
.mt-paper p,.mt-paper li{font-size:16px;line-height:28px}
.mt-paper blockquote{font-style:italic;font-size:18px;line-height:28px;color:var(--ink)}
.mt-reasons{counter-reset:r}
.mt-reasons li{counter-increment:r;display:grid;grid-template-columns:22px minmax(0,1fr)}
.mt-reasons li::before{content:counter(r) ".";font-family:var(--mono);font-size:12px;color:var(--ink-3)}
.mt-verdict{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;line-height:28px}
.mt-verdict b{font:300 56px/56px var(--serif);letter-spacing:-.03em;font-variant-numeric:lining-nums}
.mt-verdict span{font:500 11px/28px var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--tone)}
.mt-check{display:flex;gap:9px;align-items:flex-start}
.mt-check svg{flex:none;margin-top:8px}
.mt-check.ok{color:var(--p-good)}
.mt-check.warn{color:var(--p-bad)}
.mt-caption{text-align:center;font:500 12px/28px var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-2)}
.mt-doc-title{text-align:center;font:600 19px/28px var(--serif)!important;text-transform:uppercase;letter-spacing:.04em!important;padding:0!important;margin-bottom:28px}
.mt-doc p{text-indent:2.2em;margin-bottom:28px}
.mt-margin{margin:0 0 28px;padding:13px 16px 14px;background:var(--paper-2);border-left:2px solid var(--p-brass);font:400 14.5px/21px var(--sans);color:var(--ink-2)}
.mt-margin b{display:block;font:500 11px/21px var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--p-brass)}
.mt-paper-foot{display:flex;align-items:center;gap:12px 16px;flex-wrap:wrap;padding:16px 34px 18px 74px;border-top:1px solid var(--paper-line);background:var(--paper-2);font:400 14.5px/1.45 var(--sans);color:var(--ink-2)}
.mt-paper-foot .mt-btn{border-color:var(--ink);color:var(--paper);background:var(--ink);font-weight:500}
.mt-paper-foot .mt-ok{color:var(--p-good)!important}
.mt-paper-foot .mt-ok svg{margin-top:3px}
@media (hover:hover){.mt-paper-foot .mt-btn:hover{background:oklch(.33 .03 165)}}
.mt-paper :focus-visible{box-shadow:0 0 0 2px var(--paper),0 0 0 4px var(--ink)}

/* docket */
.mt-row{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,.9fr) 40px 132px minmax(0,1.5fr);gap:16px;align-items:center;padding:13px 0;border-bottom:1px solid var(--line)}
.mt-row h3{font:400 18.5px/1.25 var(--serif)}
.mt-row span{font-size:14px;color:var(--text-2)}
.mt-lead{display:grid;place-items:center;width:32px;height:32px;border:1px solid var(--line-2);border-radius:50%;font:500 11px/1 var(--mono);color:var(--text-1)!important}
.mt-track{display:flex;flex-direction:column;gap:5px}
.mt-track div{display:flex;gap:3px}
.mt-track i{flex:1;height:4px;background:oklch(.86 .06 88/.16)}
.mt-track i.on{background:var(--brass)}
.mt-track small{font:500 11px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--text-3)}
.mt-rowhead{padding:10px 0}
.mt-empty{padding:22px 0;color:var(--text-2)}

.mt-pair{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:40px}
.mt-dl{display:grid;grid-template-columns:58px minmax(0,1fr) auto;gap:2px 16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}
.mt-dl-date{grid-row:1/span 2;text-align:center;border-right:1px solid var(--line-2);padding-right:14px}
.mt-dl-date b{display:block;font:300 32px/1 var(--serif);font-variant-numeric:lining-nums tabular-nums}
.mt-dl-date span{font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--brass)}
.mt-dl h3{font:400 18px/1.3 var(--serif)}
.mt-dl small{grid-column:2;font-size:13.5px;color:var(--text-2)}
.mt-dl-state{grid-row:1/span 2;grid-column:3;display:flex;align-items:center;gap:7px;font-size:13.5px;text-align:right;color:var(--good)}
.mt-dl-state.no{color:var(--bad)}
.mt-dl-state.req{color:var(--brass)}
.mt-hr{padding:14px 0;border-bottom:1px solid var(--line)}
.mt-hr-top{display:flex;align-items:baseline;gap:8px}
.mt-hr-top h3{font:400 18px/1.2 var(--serif)}
.mt-hr-top span{font-size:13px;color:var(--text-3)}
.mt-hr-top b{margin-left:auto;font:400 14px/1 var(--mono);font-variant-numeric:tabular-nums}
.mt-hr-top b small{font-size:12px;color:var(--text-3)}
.mt-bar{position:relative;display:flex;height:8px;margin:10px 0 7px;background:oklch(.86 .06 88/.12)}
.mt-bar i{height:100%;background:var(--text-1)}
.mt-bar i.found{background:repeating-linear-gradient(135deg,var(--brass) 0 3px,transparent 3px 6px)}
.mt-bar i.found.in{background:var(--brass)}
.mt-hr p{font-size:13.5px;color:var(--text-2)}
.mt-hr p b{font-weight:500;color:var(--brass)}

.mt-scrim{position:fixed;inset:0;z-index:70;background:oklch(.1 .02 165/.65)}
.mt-sheet{position:fixed;top:0;right:0;bottom:0;z-index:71;width:min(560px,100vw);background:var(--paper);overflow-y:auto;overscroll-behavior:contain;outline:none}
.mt-sheet .mt-paper{box-shadow:none;border-radius:0;min-height:100%}
.mt-sheet-close{position:sticky;top:0;z-index:2;display:flex;justify-content:flex-end;height:0}
.mt-sheet-close button{width:44px;height:44px;margin:6px;display:grid;place-items:center;border:1px solid var(--paper-line);border-radius:3px;background:var(--paper);color:var(--ink)}

.mt-toast-host{position:fixed;left:0;right:0;bottom:20px;z-index:80;display:flex;justify-content:center;padding:0 16px;pointer-events:none}
.mt-toast{pointer-events:auto;display:flex;align-items:center;gap:14px;max-width:560px;padding:9px 9px 9px 16px;background:var(--paper);color:var(--ink);border-radius:3px;box-shadow:0 8px 24px oklch(.08 .02 165/.5);font:400 14.5px/1.4 var(--sans)}
.mt-toast button{min-height:38px;padding:0 14px;border:1px solid var(--ink-3);border-radius:3px;background:none;color:var(--ink);font:500 13.5px/1 var(--sans)}

.mt-foot{grid-area:foot;display:flex;justify-content:space-between;align-items:center;gap:10px 24px;flex-wrap:wrap;margin:48px 34px 0 30px;padding:18px 0 26px;border-top:1px solid var(--line-2);color:var(--text-3);font-size:13.5px}
.mt-credit{color:var(--text-2);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px;padding:10px 0}
@media (hover:hover){.mt-credit:hover{color:var(--text-1)}}

@media (max-width:1100px){
  .mt-shell{grid-template-columns:minmax(0,1fr);grid-template-areas:"side" "main" "log" "foot";grid-template-rows:auto}
  .mt-side,.mt-logcol{border-right:0;padding:22px 28px 0}
  .mt-logcol{padding-bottom:8px}
  .mt-main{padding:28px 28px 0}
  .mt-side{display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 28px;align-items:start}
  .mt-brief{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0 20px;margin-top:20px}
  .mt-brief li{border-bottom:0}
  .mt-side-meta{text-align:right}
  .mt-demo{margin-top:0}
  .mt-log{height:330px}
  .mt-room{grid-template-columns:minmax(0,1fr)}
  .mt-pair{grid-template-columns:minmax(0,1fr);gap:0}
  .mt-foot{margin:28px 28px 0}
}
@media (max-width:760px){
  .mt-side,.mt-logcol,.mt-main{padding-left:16px;padding-right:16px}
  .mt-side{grid-template-columns:minmax(0,1fr)}
  .mt-side-meta{text-align:left;margin-top:14px}
  .mt-brief{grid-template-columns:repeat(2,minmax(0,1fr))}
  .mt-brief b{font-size:30px}
  .mt-sign{grid-template-columns:30px minmax(0,1fr)}
  .mt-sign>div:last-child{grid-column:2;justify-self:start;margin-top:8px}
  .mt-stamp{text-align:left}
  .mt-btn{min-height:46px}
  .mt-tabs button{min-height:42px}
  .mt-head .mt-meta{margin-left:0}
  .mt-row{grid-template-columns:minmax(0,1fr) 40px;gap:4px 12px}
  .mt-row>span:nth-child(2){grid-column:1}
  .mt-row .mt-lead{grid-row:1;grid-column:2}
  .mt-row .mt-track,.mt-row>span:last-child{grid-column:1/-1}
  .mt-row .mt-track{max-width:180px;margin-top:4px}
  .mt-rowhead{display:none}
  .mt-dl{grid-template-columns:58px minmax(0,1fr)}
  .mt-dl-state{grid-row:auto;grid-column:2;text-align:left}
  .mt-dl-date{grid-row:1/span 3}
  .mt-paper-in{padding:28px 20px 28px 58px}
  .mt-paper-in::before{left:42px}
  .mt-gutter{width:36px}
  .mt-paper-foot{padding:16px 20px 18px}
  .mt-foot{margin:28px 16px 0;flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){
  .mt-in,.is-changed{animation:none}
  .mt-dot.run::after{animation:none}
  .mt *{transition-duration:.01ms!important}
}
`;
