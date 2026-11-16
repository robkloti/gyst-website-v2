// Copperjack dispatch console. Reference: mechanical drawing set (blueprint ground, drafting vellum, copper pipe).
// Tokens follow the shared dashboard token names; everything is OKLCH and scoped to .cj.
export const CSS = `
.cj{
  --bg:oklch(.165 .022 245);--s1:oklch(.205 .024 245);--s2:oklch(.245 .026 245);--s3:oklch(.29 .028 245);
  --line:oklch(1 0 0 / .075);--line-2:oklch(1 0 0 / .15);--rule:oklch(.46 .03 245);
  --text-1:oklch(.94 .008 245);--text-2:oklch(.78 .018 245);--text-3:oklch(.66 .022 245);
  --accent:oklch(.74 .125 52);--accent-ink:oklch(.2 .03 52);--accent-soft:oklch(.74 .125 52 / .14);
  --signal:oklch(.8 .1 225);--good:oklch(.82 .15 155);--bad:oklch(.72 .18 25);--neutral:oklch(.66 .022 245);
  --tile:oklch(.925 .018 85);--tile-ink:oklch(.2 .025 245);--tile-2:oklch(.43 .02 245);
  --shadow:0 1px 1px oklch(.07 .02 245/.5),0 2px 4px oklch(.07 .02 245/.4),0 8px 16px oklch(.07 .02 245/.3);
  --inner:inset 0 1px 0 oklch(1 0 0/.06);
  --display:"Barlow Condensed","Arial Narrow",sans-serif;--sans:Barlow,system-ui,sans-serif;--mono:"Azeret Mono",ui-monospace,monospace;
  --r:10px;--r-in:6px;--ease:cubic-bezier(.23,1,.32,1);
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text-1);
  font:400 15px/1.5 var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;
}
.cj *,.cj *::before,.cj *::after{box-sizing:border-box}
.cj::before{content:"";position:absolute;inset:0 0 auto 0;height:520px;pointer-events:none;
  background:radial-gradient(900px 380px at 12% -8%,oklch(.74 .125 52/.1),transparent 70%),radial-gradient(700px 320px at 92% 0%,oklch(.8 .1 225/.07),transparent 70%)}
.cj::after{content:"";position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
::-webkit-scrollbar-track{background:oklch(.165 .022 245)}
::-webkit-scrollbar-thumb{background:oklch(.34 .028 245)}
.cj :focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--signal)}
.cj button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.cj :where(h1,h2,h3,p,ul,ol,dl,dd){margin:0;padding:0}
.cj :where(ul,ol){list-style:none}
.cj-wrap{position:relative;z-index:1;max-width:1360px;margin:0 auto;padding:20px 28px 28px}
.cj-label{font:500 11px/1.2 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--text-3)}
.cj-num{font-family:var(--mono);font-variant-numeric:tabular-nums slashed-zero}
.cj-in{animation:cj-in .44s var(--ease) both;animation-delay:calc(var(--i,0) * 40ms)}
@keyframes cj-in{from{opacity:0;transform:translateY(10px)}}

/* top bar */
.cj-top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid var(--line)}
.cj-brand{display:flex;align-items:center;gap:10px}
.cj-brand svg{flex:none}
.cj-brand b{font:700 25px/1 var(--display);letter-spacing:.06em;text-transform:uppercase}
.cj-brand span{font:500 11px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--text-3);padding-left:10px;border-left:1px solid var(--line-2)}
.cj-top-right{margin-left:auto;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.cj-demo{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--text-2);border:1px dashed var(--rule);border-radius:99px;padding:7px 11px}
.cj-clock{display:flex;align-items:baseline;gap:8px;font:500 12px/1 var(--mono);color:var(--text-2)}
.cj-clock b{font:600 22px/1 var(--display);letter-spacing:.03em;color:var(--text-1);font-variant-numeric:tabular-nums}
.cj-dot{width:7px;height:7px;border-radius:50%;background:var(--neutral);position:relative;flex:none;display:inline-block}
.cj-dot.run{background:var(--good)}
.cj-dot.run::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--good);animation:cj-ping 2s var(--ease) infinite}
@keyframes cj-ping{0%{transform:scale(1);opacity:.6}80%,100%{transform:scale(2.6);opacity:0}}

.cj-hello{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin:26px 0 18px}
.cj-hello h1{font:700 clamp(34px,4.4vw,54px)/.95 var(--display);letter-spacing:.01em;text-transform:uppercase}
.cj-hello h1 em{font-style:normal;color:var(--accent)}
.cj-hello p{color:var(--text-2);max-width:52ch;font-size:15px}

/* panels */
.cj-panel{position:relative;background:var(--s1);border-radius:var(--r);box-shadow:var(--inner),var(--shadow);min-width:0}
.cj-panel::before{content:"";position:absolute;inset:0;padding:1px;border-radius:inherit;pointer-events:none;
  background:linear-gradient(160deg,oklch(1 0 0/.17),oklch(1 0 0/.05) 38%,oklch(1 0 0/.04));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.cj-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-height:54px;padding:10px 16px 10px 18px}
.cj-head h2{font:600 19px/1 var(--display);letter-spacing:.07em;text-transform:uppercase}
.cj-head .cj-meta{margin-left:auto;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cj-fresh{display:flex;align-items:center;gap:8px;font:500 11px/1 var(--mono);color:var(--text-3)}

.cj-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:36px;padding:0 14px;border-radius:var(--r-in);
  border:1px solid var(--line-2);background:var(--s2);font:500 13.5px/1 var(--sans);white-space:nowrap;
  transition:transform .11s var(--ease),background-color .15s,border-color .15s,color .15s}
.cj-btn:active{transform:scale(.97)}
.cj-btn.primary{background:var(--accent);color:var(--accent-ink);border-color:transparent;font-weight:600}
.cj-icon{width:36px;height:36px;display:inline-grid;place-items:center;border-radius:var(--r-in);border:1px solid transparent;background:none;color:var(--text-2);transition:background-color .15s,color .15s}
@media (hover:hover){
  .cj-btn:hover{background:var(--s3)}
  .cj-btn.primary:hover{background:oklch(.79 .125 52)}
  .cj-icon:hover{background:var(--s2);color:var(--text-1)}
}

/* segmented control (tabs, filters) */
.cj-seg{display:inline-flex;gap:2px;padding:3px;border-radius:8px;background:oklch(.14 .02 245);border:1px solid var(--line);max-width:100%;overflow-x:auto;scrollbar-width:none}
.cj-seg::-webkit-scrollbar{display:none}
.cj-seg button{display:inline-flex;align-items:center;gap:7px;min-height:30px;padding:0 11px;border:0;border-radius:5px;background:none;color:var(--text-2);font:500 13px/1 var(--sans);white-space:nowrap;transition:background-color .15s,color .15s}
.cj-seg button[aria-pressed="true"],.cj-seg button[aria-selected="true"]{background:var(--s3);color:var(--text-1);box-shadow:var(--inner)}
.cj-seg button i{font:500 11px/1 var(--mono);font-style:normal;color:var(--text-3)}
@media (hover:hover){.cj-seg button:hover{color:var(--text-1)}}

/* mission control */
.cj-mc{margin-bottom:14px}
.cj-mc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border-top:1px solid var(--line);border-radius:0 0 var(--r) var(--r);overflow:hidden}
.cj-dec{display:flex;flex-direction:column;gap:10px;padding:16px 18px 18px;background:var(--s1);min-height:196px}
.cj-dec-agent{display:flex;align-items:center;gap:8px}
.cj-dec-agent .cj-sev{width:8px;height:8px;background:var(--accent);transform:rotate(45deg);flex:none}
.cj-dec h3{font:600 17px/1.3 var(--sans);letter-spacing:-.005em;text-wrap:balance}
.cj-dec p{color:var(--text-2);font-size:14px;line-height:1.5}
.cj-dec-foot{margin-top:auto;display:flex;align-items:center;gap:8px;padding-top:4px}
.cj-dec.done{background:oklch(.19 .022 245)}
.cj-dec.done .cj-sev{background:var(--good);transform:none;border-radius:50%}
.cj-dec.done h3{color:var(--text-2)}
.cj-dec-ok{display:flex;gap:9px;align-items:flex-start;color:var(--good);font-size:14px;line-height:1.45}
.cj-dec-ok svg{flex:none;margin-top:2px}
.cj-clear{color:var(--good);font:500 12px/1 var(--mono);letter-spacing:.06em}
.cj-count{display:inline-grid;place-items:center;min-width:24px;height:24px;padding:0 7px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font:600 12px/1 var(--mono)}
.cj-count.zero{background:var(--s3);color:var(--text-2)}

/* scoreboard */
.cj-kpis{display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;gap:14px;margin-bottom:14px}
.cj-tile{padding:16px 18px;min-height:170px;display:flex;flex-direction:column}
.cj-tile .cj-val{font:600 40px/1 var(--display);letter-spacing:.01em;margin:14px 0 8px;font-variant-numeric:tabular-nums;display:flex;align-items:baseline;gap:8px}
.cj-tile .cj-val small{font:400 13px/1.2 var(--sans);color:var(--text-3);letter-spacing:0}
.cj-tile .cj-sub{color:var(--text-2);font-size:13.5px;line-height:1.45;margin-top:auto}
.cj-tile .cj-sub b{color:var(--text-1);font-weight:500}
.cj-lead{background:var(--tile);color:var(--tile-ink);border-radius:var(--r);box-shadow:var(--shadow);padding:16px 18px 14px;min-height:170px;display:flex;flex-direction:column;min-width:0}
.cj-lead .cj-label{color:var(--tile-2)}
.cj-lead .cj-val{font:700 60px/1 var(--display);margin:10px 0 2px;font-variant-numeric:tabular-nums;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.cj-lead .cj-val small{font:400 13.5px/1.2 var(--sans);color:var(--tile-2)}
.cj-split{display:flex;gap:3px;height:10px;margin-top:auto}
.cj-split span{border-radius:2px;min-width:6px}
.cj-legend{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:8px}
.cj-legend button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:6px 8px;border:1px solid transparent;border-radius:var(--r-in);background:none;color:var(--tile-ink);text-align:left;min-width:0;transition:background-color .15s,border-color .15s}
.cj-legend button[aria-pressed="true"]{background:oklch(.2 .025 245/.09);border-color:oklch(.2 .025 245/.3)}
.cj-legend span{display:flex;align-items:center;gap:6px;font:500 11px/1.1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--tile-2);white-space:nowrap}
.cj-legend b{font:500 14px/1 var(--mono);font-variant-numeric:tabular-nums}
@media (hover:hover){.cj-legend button:hover{background:oklch(.2 .025 245/.06)}}
.is-changed{animation:cj-flash .75s ease-out}
@keyframes cj-flash{from{background-color:oklch(.74 .125 52/.3)}to{background-color:transparent}}
.cj-val .is-changed,.cj-val span{border-radius:4px}

/* main grid */
.cj-main{display:grid;grid-template-columns:minmax(0,1fr) 348px;gap:14px;margin-bottom:14px;align-items:stretch}
.cj-lower{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:14px}

/* dispatch board */
.cj-board{padding:0 16px 10px 0;--lane:184px}
.cj-axis{display:grid;grid-template-columns:var(--lane) 1fr;height:26px;border-bottom:1px solid var(--line)}
.cj-axis>div{position:relative}
.cj-axis span{position:absolute;top:4px;transform:translateX(-50%);font:500 11px/1 var(--mono);color:var(--text-3)}
.cj-lanes{position:relative}
.cj-lane{display:grid;grid-template-columns:var(--lane) 1fr;min-height:98px;border-bottom:1px solid var(--line)}
.cj-lane:last-child{border-bottom:0}
.cj-truck{display:flex;flex-direction:column;justify-content:center;gap:3px;padding:8px 12px 8px 18px;min-width:0}
.cj-truck-top{display:flex;align-items:center;gap:8px}
.cj-truck-top b{font:600 16px/1 var(--display);letter-spacing:.07em;text-transform:uppercase;color:var(--accent)}
.cj-truck-top span{font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cj-truck small{font-size:12.5px;line-height:1.3;color:var(--text-3);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cj-track{position:relative;background-image:linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:10% 100%;border-left:1px solid var(--line)}
.cj-job{position:absolute;top:8px;bottom:8px;left:calc(var(--l) * 1% + 2px);width:calc(var(--w) * 1% - 4px);
  display:flex;flex-direction:column;justify-content:center;gap:3px;padding:0 9px 0 12px;text-align:left;z-index:1;
  border:1px solid var(--line-2);border-radius:var(--r-in);background:var(--s2);overflow:hidden;
  transition:opacity .2s,background-color .15s,border-color .15s,transform .11s var(--ease)}
.cj-job::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--tone)}
.cj-job:active{transform:scale(.985)}
.cj-job b{display:flex;align-items:center;gap:6px;font:500 13.5px/1.15 var(--sans);white-space:nowrap;overflow:hidden}
.cj-job b span{overflow:hidden;text-overflow:ellipsis}
.cj-job small{font-size:12.5px;line-height:1.25;color:var(--text-2);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cj-job>span{font:500 12px/1.2 var(--mono);color:var(--text-1);font-variant-numeric:tabular-nums}
.cj-job.go>span::after{content:" · noon";color:var(--accent)}
.cj-job.onsite{background:oklch(.27 .04 165)}
.cj-job.enroute{background:oklch(.27 .04 232)}
.cj-job.done{background:transparent;border-style:dashed}
.cj-job.done{background:var(--s1)}
.cj-job.done b,.cj-job.done>span{color:var(--text-2)}
.cj-job.go{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
.cj-job.dim{opacity:.22}
.cj-job[aria-current="true"]{border-color:var(--text-1)}
@media (hover:hover){.cj-job:hover{border-color:var(--text-2)}}
.cj-now{position:absolute;top:-26px;bottom:0;left:calc(var(--lane) + (100% - var(--lane)) * var(--p));width:1px;background:var(--accent);pointer-events:none;z-index:0;transition:left .4s var(--ease)}
.cj-now span{position:absolute;top:2px;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-ink);font:600 10.5px/1 var(--mono);padding:4px 6px;border-radius:3px;white-space:nowrap}
.cj-glyph{flex:none;display:block}

/* job list (narrow) */
.cj-jlist{padding:0 12px 12px}
.cj-jgroup{padding:12px 0 4px}
.cj-jgroup .cj-truck{padding:0 4px 8px}
.cj-jlist .cj-job{position:relative;inset:auto;left:auto;top:auto;width:100%;min-height:76px;padding-top:10px;padding-bottom:10px;margin-bottom:6px}

/* map */
.cj-map{padding:0 16px 16px}
.cj-map>svg{display:block;width:100%;height:auto;border-radius:var(--r-in);background:oklch(.185 .03 245)}
.cj-map text{font-family:var(--mono);fill:var(--text-3);font-size:10px;letter-spacing:.14em}
.cj-pin{cursor:pointer;transition:opacity .2s}
.cj-pin.dim{opacity:.2}
.cj-pin:focus-visible{outline:none}
.cj-pin:focus-visible circle.ring{stroke:var(--signal);stroke-width:2}
.cj-route{stroke-dasharray:5 6;animation:cj-dash 1.2s linear infinite}
@keyframes cj-dash{to{stroke-dashoffset:-22}}
.cj-map-key{display:flex;gap:14px;flex-wrap:wrap;padding:12px 2px 0;color:var(--text-2);font-size:12.5px}
.cj-map-key span{display:inline-flex;align-items:center;gap:6px}

/* feed */
.cj-feed{display:flex;flex-direction:column}
.cj-feed ol{flex:1 1 0;min-height:320px;overflow:hidden;padding:0 18px;border-top:1px solid var(--line);-webkit-mask-image:linear-gradient(#000 82%,transparent);mask-image:linear-gradient(#000 82%,transparent)}
.cj-feed li{padding:12px 0;border-bottom:1px solid var(--line)}
.cj-feed li>div{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.cj-feed li b{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
.cj-feed li time{margin-left:auto;font:500 11px/1 var(--mono);color:var(--text-3)}
.cj-feed li p{font-size:14px;line-height:1.45;color:var(--text-1)}
.cj-feed li.you b{color:var(--good)}

/* overnight calls */
.cj-calls{padding:0 18px 8px;border-top:1px solid var(--line)}
.cj-call{display:grid;grid-template-columns:74px minmax(0,1fr);gap:4px 12px;padding:13px 0;border-bottom:1px solid var(--line)}
.cj-call:last-child{border-bottom:0}
.cj-call time{font:500 12px/1.5 var(--mono);color:var(--text-2)}
.cj-call h3{font:500 15px/1.35 var(--sans)}
.cj-call h3 span{color:var(--text-2);font-weight:400}
.cj-call p{grid-column:2;display:flex;gap:8px;align-items:flex-start;font-size:13.5px;line-height:1.45;color:var(--text-2)}
.cj-call p svg{flex:none;margin-top:3px}
.cj-call.booked p{color:var(--good)}
.cj-call.urgent p{color:var(--bad)}
.cj-call.urgent{box-shadow:inset 2px 0 0 var(--bad);margin-left:-18px;padding-left:18px}

/* quotes */
.cj-quotes{border-top:1px solid var(--line)}
.cj-qrow{display:grid;grid-template-columns:minmax(0,1.5fr) 92px 96px minmax(0,1.5fr);gap:14px;align-items:center;padding:12px 18px;border-bottom:1px solid var(--line)}
.cj-qrow:last-child{border-bottom:0}
.cj-qhead{padding-top:10px;padding-bottom:10px}
.cj-qrow h3{font:500 15px/1.3 var(--sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cj-qrow h3+small{display:block;font-size:13px;color:var(--text-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cj-qamt{font:500 14.5px/1 var(--mono);font-variant-numeric:tabular-nums;text-align:right}
.cj-qage{font:500 12px/1 var(--mono);color:var(--text-2)}
.cj-qage i{display:block;height:3px;margin-top:6px;border-radius:2px;background:var(--s3);overflow:hidden}
.cj-qage i::after{content:"";display:block;height:100%;width:calc(var(--a) * 1%);background:var(--text-3)}
.cj-qstate{display:flex;gap:8px;align-items:flex-start;font-size:13.5px;line-height:1.4;min-width:0}
.cj-qstate svg{flex:none;margin-top:3px}
.cj-qstate small{display:block;font:500 11px/1.4 var(--mono);color:var(--text-3)}
.cj-qrow.won .cj-qstate{color:var(--good)}
.cj-qrow.warm .cj-qstate{color:var(--accent)}
.cj-qrow.cold .cj-qstate{color:var(--text-2)}
.cj-qrow.new{animation:cj-flash .9s ease-out}
.cj-qnote{display:flex;align-items:center;gap:8px;padding:10px 18px;border-bottom:1px solid var(--line);background:var(--accent-soft);color:var(--text-1);font-size:13.5px}
.cj-empty{padding:28px 18px;color:var(--text-2);font-size:14px}

/* drawer */
.cj-scrim{position:fixed;inset:0;z-index:70;background:oklch(.08 .02 245/.6)}
.cj-sheet{position:fixed;top:0;right:0;bottom:0;z-index:71;width:min(440px,100vw);background:var(--s1);border-left:1px solid var(--line-2);
  box-shadow:-24px 0 48px oklch(.07 .02 245/.5);overflow-y:auto;overscroll-behavior:contain;outline:none;
  color:var(--text-1);font:400 15px/1.5 var(--sans)}
.cj-sheet-head{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:10px;padding:14px 14px 14px 22px;background:var(--s1);border-bottom:1px solid var(--line)}
.cj-sheet-head .cj-icon{margin-left:auto;width:44px;height:44px}
.cj-sheet-body{padding:22px}
.cj-sheet h2{font:600 30px/1.02 var(--display);letter-spacing:.02em;text-transform:uppercase;margin-bottom:6px}
.cj-sheet-type{color:var(--text-2);font-size:15.5px}
.cj-status{display:inline-flex;align-items:center;gap:7px;font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--tone)}
.cj-facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--r-in);overflow:hidden;margin:20px 0}
.cj-facts div{background:var(--s1);padding:12px 14px}
.cj-facts dt{font:500 11px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--text-3);margin-bottom:7px}
.cj-facts dd{margin:0;font-size:15px;line-height:1.35}
.cj-brain{padding:14px 16px;border-radius:var(--r-in);background:var(--s2);border-left:2px solid var(--accent);font-size:15px;line-height:1.55;margin:8px 0 22px}
.cj-log li{position:relative;display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;padding:0 0 16px 16px}
.cj-log li::before{content:"";position:absolute;left:0;top:7px;width:7px;height:7px;border-radius:50%;background:var(--s3);border:1px solid var(--rule)}
.cj-log li::after{content:"";position:absolute;left:3px;top:18px;bottom:0;width:1px;background:var(--line-2)}
.cj-log li:last-child::after{display:none}
.cj-log li:last-child::before{background:var(--accent);border-color:var(--accent)}
.cj-log time{font:500 12px/1.6 var(--mono);color:var(--text-3)}
.cj-log p{font-size:14.5px;line-height:1.5}

/* toast */
.cj-toast-host{position:fixed;left:0;right:0;bottom:20px;z-index:80;display:flex;justify-content:center;padding:0 16px;pointer-events:none}
.cj-toast{pointer-events:auto;display:flex;align-items:center;gap:14px;max-width:520px;padding:10px 10px 10px 16px;border-radius:var(--r);background:var(--tile);color:var(--tile-ink);box-shadow:var(--shadow);font:400 14px/1.4 var(--sans)}
.cj-toast button{min-height:36px;padding:0 12px;border-radius:var(--r-in);border:1px solid oklch(.2 .025 245/.3);background:none;font:600 13px/1 var(--sans);color:var(--tile-ink)}

/* footer */
.cj-foot{display:flex;justify-content:space-between;align-items:center;gap:12px 24px;flex-wrap:wrap;margin-top:28px;padding-top:18px;border-top:1px solid var(--line);color:var(--text-3);font-size:13px}
.cj-credit{color:var(--text-2);text-decoration:underline;text-decoration-color:var(--rule);text-underline-offset:4px;padding:10px 0}
@media (hover:hover){.cj-credit:hover{color:var(--text-1)}}

@media (max-width:1180px){
  .cj-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}
  .cj-lead{grid-column:1/-1}
  .cj-main{grid-template-columns:minmax(0,1fr)}
  .cj-feed ol{flex:none;height:340px}
  .cj-lower{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:760px){
  .cj-wrap{padding:14px 16px 24px}
  .cj-brand span{display:none}
  .cj-top-right{gap:10px}
  .cj-hello{margin:20px 0 16px}
  .cj-mc-grid{grid-template-columns:minmax(0,1fr)}
  .cj-dec{min-height:0}
  .cj-kpis{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}
  .cj-kpis .cj-tile:last-child{grid-column:1/-1;min-height:0}
  .cj-tile{min-height:150px;padding:14px}
  .cj-tile .cj-val{font-size:34px}
  .cj-lead .cj-val{font-size:50px}
  .cj-legend{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cj-btn{min-height:44px}
  .cj-seg button{min-height:40px}
  .cj-head .cj-meta{margin-left:0}
  .cj-meta .cj-seg{flex-wrap:wrap}
  .cj-head{padding:12px 14px}
  .cj-main,.cj-lower,.cj-mc,.cj-kpis{margin-bottom:10px;gap:10px}
  .cj-qrow{grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;padding:14px}
  .cj-qhead{display:none}
  .cj-qage{grid-column:1}
  .cj-qage i{max-width:120px}
  .cj-qstate{grid-column:1/-1}
  .cj-qamt{grid-row:1;grid-column:2}
  .cj-map{padding:0 12px 12px}
  .cj-foot{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){
  .cj-in,.is-changed,.cj-qrow.new{animation:none}
  .cj-dot.run::after,.cj-route{animation:none}
  .cj *{transition-duration:.01ms!important}
}
`;
