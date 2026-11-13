// Oriel House day book. Reference: a clinic's leather appointment book and a perfume house label
// (plaster paper, mulberry band, brass hairlines, didone numerals). OKLCH tokens, scoped to .oh.
export const CSS = `
.oh{
  --bg:oklch(.965 .012 75);--s1:oklch(.985 .008 75);--s2:oklch(.94 .016 72);--s3:oklch(.91 .02 70);
  --line:oklch(.87 .02 65);--line-2:oklch(.77 .03 60);
  --text-1:oklch(.26 .035 10);--text-2:oklch(.42 .03 15);--text-3:oklch(.5 .026 20);
  --accent:oklch(.33 .085 8);--accent-2:oklch(.39 .09 8);--accent-ink:oklch(.965 .012 75);
  --brass:oklch(.68 .09 80);--brass-deep:oklch(.5 .08 72);--brass-light:oklch(.86 .065 88);
  --good:oklch(.44 .07 150);--bad:oklch(.48 .13 30);
  --display:"Bodoni Moda",Didot,"Bodoni 72",Georgia,serif;--sans:Figtree,system-ui,sans-serif;
  --ease:cubic-bezier(.23,1,.32,1);--hh:96px;
  position:relative;min-height:100vh;min-height:100dvh;background:var(--bg);color:var(--text-1);
  font:400 15px/1.55 var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;
}
.oh *,.oh *::before,.oh *::after{box-sizing:border-box}
.oh::after{content:"";position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.04;mix-blend-mode:multiply;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
::-webkit-scrollbar-track{background:oklch(.94 .016 72)}
::-webkit-scrollbar-thumb{background:oklch(.77 .03 60)}
.oh :focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--brass-deep)}
.oh button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
.oh :where(h1,h2,h3,p,ul,ol,dl,dd,blockquote){margin:0;padding:0}
.oh :where(ul,ol){list-style:none}
.oh-wrap{max-width:1320px;margin:0 auto;padding:0 32px}
.oh-label{font:500 11px/1.2 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--text-3)}
.oh-num{font-family:var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-in{animation:oh-in .73s var(--ease) both;animation-delay:calc(var(--i,0) * 60ms)}
@keyframes oh-in{from{opacity:0;transform:translateY(4px)}}

/* band */
.oh-band{background:var(--accent);color:var(--accent-ink);position:relative}
.oh-band::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(100deg,oklch(.52 .08 75),oklch(.74 .08 85) 45%,oklch(.86 .065 88) 52%,oklch(.62 .08 78))}
.oh-top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:18px 0;border-bottom:1px solid oklch(.965 .012 75/.16)}
.oh-brand{display:flex;align-items:center;gap:12px}
.oh-brand b{font:400 23px/1 var(--display);letter-spacing:.01em}
.oh-brand span{font:500 11px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--brass-light)}
.oh-top-right{margin-left:auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.oh-demo{font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;border:1px solid oklch(.86 .065 88/.55);color:var(--brass-light);padding:8px 12px}
.oh-clock{font:400 14px/1 var(--sans);color:oklch(.965 .012 75/.85)}
.oh-clock b{font:400 21px/1 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--accent-ink);margin-left:8px}
.oh-hello{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px 48px;align-items:end;padding:44px 0 40px}
.oh-hello h1{font:400 clamp(38px,5vw,66px)/1.02 var(--display);letter-spacing:-.015em;text-wrap:balance}
.oh-hello h1 em{font-style:italic;color:var(--brass-light)}
.oh-hello p{margin-top:16px;max-width:70ch;color:oklch(.965 .012 75/.86);font-size:16px}
.oh-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid oklch(.86 .065 88/.4)}
.oh-kpi{padding:20px 24px 26px 0;min-height:132px}
.oh-kpi+.oh-kpi{padding-left:24px;border-left:1px solid oklch(.86 .065 88/.28)}
.oh-kpi .oh-label{color:var(--brass-light)}
.oh-kpi-val{font:400 44px/1 var(--display);font-variant-numeric:lining-nums tabular-nums;margin:14px 0 8px;display:flex;align-items:baseline;gap:8px}
.oh-kpi-val small{font:400 14px/1.2 var(--sans);color:oklch(.965 .012 75/.8)}
.oh-kpi p{font-size:13.5px;line-height:1.45;color:oklch(.965 .012 75/.84)}
.is-changed{animation:oh-flash .8s ease-out}
@keyframes oh-flash{from{background-color:oklch(.86 .065 88/.35)}to{background-color:transparent}}

/* sections */
.oh-sec{padding:40px 0 0}
.oh-sec-head{display:flex;align-items:flex-end;gap:12px 20px;flex-wrap:wrap;padding-bottom:14px;border-bottom:1px solid var(--text-1)}
.oh-sec-head h2{font:400 30px/1.05 var(--display);letter-spacing:-.01em}
.oh-sec-head h2 em{font-style:italic;color:var(--brass-deep)}
.oh-sec-head .oh-meta{margin-left:auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap}

.oh-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:0 18px;border:1px solid var(--text-1);border-radius:0;background:transparent;
  font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;transition:background-color .16s,color .16s,transform .16s var(--ease)}
.oh-btn:active{transform:scale(.98)}
.oh-btn.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.oh-icon{width:44px;height:44px;display:inline-grid;place-items:center;border:0;background:none;color:var(--text-2);transition:background-color .16s,color .16s}
@media (hover:hover){
  .oh-btn:hover{background:var(--s2)}
  .oh-btn.primary:hover{background:var(--accent-2)}
  .oh-icon:hover{background:var(--s2);color:var(--text-1)}
}

/* tabs: underline, tracked caps */
.oh-tabs{display:flex;gap:22px;max-width:100%;overflow-x:auto;scrollbar-width:none}
.oh-tabs::-webkit-scrollbar{display:none}
.oh-tabs button{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0;border:0;background:none;white-space:nowrap;color:var(--text-3);
  font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;box-shadow:inset 0 -1px 0 transparent;transition:color .16s,box-shadow .16s}
.oh-tabs button[aria-selected="true"],.oh-tabs button[aria-pressed="true"]{color:var(--text-1);box-shadow:inset 0 -2px 0 var(--accent)}
.oh-tabs button i{width:9px;height:9px;border-radius:50%;flex:none}
.oh-tabs button span{font:400 14px/1 var(--display);letter-spacing:0;color:var(--brass-deep)}
@media (hover:hover){.oh-tabs button:hover{color:var(--text-1)}}

/* decisions */
.oh-desk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
.oh-dec{display:flex;flex-direction:column;gap:12px;padding:24px 28px 26px 0;min-height:250px;border-bottom:1px solid var(--line)}
.oh-dec+.oh-dec{padding-left:28px;border-left:1px solid var(--line)}
.oh-dec-n{display:flex;align-items:baseline;gap:12px}
.oh-dec-n b{font:italic 400 30px/1 var(--display);color:var(--brass-deep)}
.oh-dec h3{font:400 23px/1.2 var(--display);letter-spacing:-.005em;text-wrap:balance}
.oh-dec p{color:var(--text-2);font-size:14.5px;line-height:1.55}
.oh-dec-foot{margin-top:auto;padding-top:6px}
.oh-dec.done h3{color:var(--text-2)}
.oh-dec-ok{display:flex;gap:10px;align-items:flex-start;color:var(--good)!important}
.oh-dec-ok svg{flex:none;margin-top:4px}
.oh-stamp{margin-top:auto;font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--good)}

/* main */
.oh-main{display:grid;grid-template-columns:minmax(0,1fr) 372px;gap:48px;align-items:start}

/* day book */
.oh-book{display:grid;grid-template-columns:52px repeat(var(--cols),minmax(0,1fr));margin-top:0}
.oh-book-head{display:contents}
.oh-prov{padding:16px 12px 14px;border-bottom:1px solid var(--line);border-left:1px solid var(--line);min-width:0}
.oh-prov b{display:flex;align-items:center;gap:8px;font:400 19px/1.15 var(--display)}
.oh-prov b i{width:9px;height:9px;border-radius:50%;flex:none}
.oh-prov span{display:block;margin-top:5px;font-size:13px;color:var(--text-2)}
.oh-hours{position:relative;height:calc(var(--hh) * 8)}
.oh-hours span{position:absolute;right:10px;transform:translateY(-50%);font:400 14px/1 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--text-3)}
.oh-hours span:first-child{transform:translateY(2px)}
.oh-col{position:relative;height:calc(var(--hh) * 8);border-left:1px solid var(--line);
  background-image:linear-gradient(var(--line) 1px,transparent 1px);background-size:100% var(--hh)}
.oh-appt{position:absolute;left:6px;right:6px;top:calc(var(--t) * var(--hh) + 2px);height:calc(var(--d) * var(--hh) - 4px);
  display:flex;flex-direction:column;gap:2px;padding:5px 10px 4px 12px;text-align:left;overflow:hidden;
  border:1px solid transparent;border-radius:2px;background:var(--soft);color:var(--text-1);z-index:1;transition:border-color .16s,opacity .2s,transform .16s var(--ease)}
.oh-appt::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--ink)}
.oh-appt:active{transform:scale(.99)}
.oh-appt b{display:flex;justify-content:space-between;gap:8px;font:500 14px/1.2 var(--sans)}
.oh-appt b span:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oh-appt b span:last-child{font:400 13px/1.2 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--text-2);flex:none}
.oh-appt small{font-size:12.5px;line-height:1.25;color:var(--text-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oh-appt .oh-st{margin-top:auto;display:flex;align-items:center;gap:6px;font:500 10.5px/1.5 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
.oh-appt.done{background:var(--bg);border-color:var(--line)}
.oh-appt.done b{font-weight:400;color:var(--text-2)}
.oh-appt.confirmed{background:var(--s1);border-color:var(--ink)}
.oh-appt.open{background:var(--bg);border:1px dashed var(--line-2)}
.oh-appt.open::before{display:none}
.oh-appt.open b{font:italic 400 17px/1.2 var(--display);color:var(--text-2)}
.oh-appt.fresh{animation:oh-flash 1s ease-out}
.oh-appt[aria-current="true"]{border-color:var(--text-1)}
@media (hover:hover){.oh-appt:hover{border-color:var(--text-1)}}
.oh-now{position:absolute;left:52px;right:0;top:calc(var(--p) * var(--hh));height:1px;background:var(--accent);z-index:0;pointer-events:none;transition:top .5s var(--ease)}
.oh-now span{position:absolute;left:-52px;top:-10px;width:46px;text-align:center;background:var(--accent);color:var(--accent-ink);font:400 13px/20px var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-book-body{grid-column:1/-1;display:grid;grid-template-columns:subgrid;position:relative}
.oh-dot{width:7px;height:7px;border-radius:50%;background:var(--text-3);position:relative;flex:none;display:inline-block}
.oh-dot.run{background:var(--good)}
.oh-dot.run::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--good);animation:oh-ping 2.4s var(--ease) infinite}
@keyframes oh-ping{0%{transform:scale(1);opacity:.5}80%,100%{transform:scale(2.4);opacity:0}}

/* agenda (narrow) */
.oh-agenda li{border-bottom:1px solid var(--line)}
.oh-agenda button{display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:2px 12px;align-items:baseline;width:100%;min-height:64px;padding:12px 0;border:0;background:none;text-align:left}
.oh-agenda time{font:400 16px/1.3 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--text-2)}
.oh-agenda b{font:500 15.5px/1.3 var(--sans);display:flex;align-items:center;gap:8px;min-width:0}
.oh-agenda b i{width:9px;height:9px;border-radius:50%;flex:none}
.oh-agenda .oh-price{font:400 16px/1.3 var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-agenda small{grid-column:2/-1;font-size:13.5px;color:var(--text-2);line-height:1.4}
.oh-agenda .oh-st{grid-column:2/-1;display:flex;align-items:center;gap:6px;font:500 10.5px/1.6 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--text-3)}
.oh-agenda .open b{font:italic 400 18px/1.3 var(--display);color:var(--text-2)}

/* rail */
.oh-rail{display:flex;flex-direction:column;gap:40px}
.oh-feed ol{height:470px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 80%,transparent);mask-image:linear-gradient(#000 80%,transparent)}
.oh-feed li{display:grid;grid-template-columns:52px minmax(0,1fr);gap:0 10px;padding:13px 0;border-bottom:1px solid var(--line)}
.oh-feed time{font:400 14.5px/1.5 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--brass-deep)}
.oh-feed b{display:block;font:500 10.5px/1.5 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--text-3);margin-bottom:2px}
.oh-feed li.you b{color:var(--good)}
.oh-feed p{font-size:14.5px;line-height:1.5}
.oh-fresh{display:flex;align-items:center;gap:8px;font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--text-3)}

.oh-rev-total{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:18px 0 14px}
.oh-rev-total b{font:400 40px/1 var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-rev-total span{font-size:13.5px;color:var(--text-2)}
.oh-rev-bar{display:flex;gap:2px;height:12px}
.oh-rev-bar span{min-width:4px}
.oh-rev-list li{display:grid;grid-template-columns:12px minmax(0,1fr) auto 44px;gap:10px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--line);font-size:14.5px}
.oh-rev-list i{width:10px;height:10px;align-self:center}
.oh-rev-list b{font:400 16.5px/1 var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-rev-list small{font-size:12.5px;color:var(--text-3);text-align:right;font-variant-numeric:tabular-nums}

/* client care */
.oh-care-note{padding:16px 0;color:var(--text-2);font-size:14.5px;border-bottom:1px solid var(--line)}
.oh-care-note b{color:var(--text-1);font-weight:500}
.oh-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.2fr) minmax(0,.9fr) minmax(0,1.3fr);gap:20px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--line)}
.oh-row h3{font:400 20px/1.2 var(--display)}
.oh-row span{font-size:14.5px;color:var(--text-2);line-height:1.45}
.oh-row .oh-row-num{font:400 19px/1.2 var(--display);font-variant-numeric:lining-nums tabular-nums;color:var(--text-1)}
.oh-state{display:flex;gap:9px;align-items:flex-start;font-size:14.5px;line-height:1.45;color:var(--text-1)!important}
.oh-state svg{flex:none;margin-top:4px}
.oh-state.ok{color:var(--good)!important}
.oh-state.wait{color:var(--brass-deep)!important}
.oh-reviews{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
.oh-review{padding:24px 28px 26px 0;display:flex;flex-direction:column;gap:12px;border-bottom:1px solid var(--line)}
.oh-review+.oh-review{padding-left:28px;border-left:1px solid var(--line)}
.oh-stars{display:flex;align-items:center;gap:3px;color:var(--brass-deep)}
.oh-stars small{margin-left:8px;font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--text-3)}
.oh-review blockquote{font:italic 400 21px/1.35 var(--display);text-wrap:pretty}
.oh-review cite{font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;font-style:normal;color:var(--text-3)}
.oh-reply{margin-top:6px;padding:14px 16px;background:var(--s2);border-left:2px solid var(--brass);font-size:14px;line-height:1.55;color:var(--text-2)}
.oh-reply .oh-label{display:flex;align-items:center;gap:7px;margin-bottom:8px;color:var(--brass-deep)}
.oh-reply.posted{border-left-color:var(--good)}
.oh-reply.posted .oh-label{color:var(--good)}

/* sheet */
.oh-scrim{position:fixed;inset:0;z-index:70;background:oklch(.26 .035 10/.45)}
.oh-sheet{position:fixed;top:0;right:0;bottom:0;z-index:71;width:min(460px,100vw);background:var(--s1);border-left:1px solid var(--line-2);overflow-y:auto;overscroll-behavior:contain;outline:none;
  color:var(--text-1);font:400 15px/1.55 var(--sans)}
.oh-sheet-head{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:10px;padding:10px 10px 10px 28px;background:var(--s1);border-bottom:1px solid var(--line)}
.oh-sheet-head .oh-icon{margin-left:auto}
.oh-sheet-head i{width:9px;height:9px;border-radius:50%}
.oh-sheet-body{padding:28px}
.oh-sheet h2{font:400 40px/1.02 var(--display);letter-spacing:-.015em;margin-bottom:10px}
.oh-sheet-tx{font-size:16px;color:var(--text-2)}
.oh-facts{display:grid;grid-template-columns:1fr 1fr;margin:24px 0 26px;border-top:1px solid var(--text-1)}
.oh-facts div{padding:14px 0 14px;border-bottom:1px solid var(--line)}
.oh-facts div:nth-child(even){padding-left:18px;border-left:1px solid var(--line)}
.oh-facts dt{font:500 11px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--text-3);margin-bottom:9px}
.oh-facts dd{font:400 24px/1.1 var(--display);font-variant-numeric:lining-nums tabular-nums}
.oh-facts dd small{font:400 14px/1 var(--sans);color:var(--text-2)}
.oh-note{margin:10px 0 24px;font-size:15.5px;line-height:1.6}
.oh-note.quote{font:italic 400 21px/1.4 var(--display)}

/* toast */
.oh-toast-host{position:fixed;left:0;right:0;bottom:20px;z-index:80;display:flex;justify-content:center;padding:0 16px;pointer-events:none}
.oh-toast{pointer-events:auto;display:flex;align-items:center;gap:16px;max-width:560px;padding:10px 10px 10px 18px;background:var(--text-1);color:var(--accent-ink);font:400 14.5px/1.4 var(--sans)}
.oh-toast button{min-height:38px;padding:0 14px;border:1px solid oklch(.965 .012 75/.5);background:none;color:var(--accent-ink);font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase}

/* footer */
.oh-foot{display:flex;justify-content:space-between;align-items:center;gap:10px 24px;flex-wrap:wrap;margin-top:56px;padding:20px 0 28px;border-top:1px solid var(--line);color:var(--text-3);font-size:13.5px}
.oh-credit{color:var(--text-2);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:4px;padding:10px 0}
@media (hover:hover){.oh-credit:hover{color:var(--text-1)}}

@media (max-width:1140px){
  .oh-main{grid-template-columns:minmax(0,1fr);gap:0}
  .oh-rail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px}
  .oh-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}
  .oh-kpi:nth-child(3){padding-left:0;border-left:0}
  .oh-kpi:nth-child(n+3){border-top:1px solid oklch(.86 .065 88/.28)}
}
@media (max-width:760px){
  .oh-wrap{padding:0 16px}
  .oh-brand span{display:none}
  .oh-top{padding:14px 0}
  .oh-hello{grid-template-columns:minmax(0,1fr);padding:30px 0 28px}
  .oh-kpi{padding:16px 14px 18px 0;min-height:0}
  .oh-kpi+.oh-kpi{padding-left:14px}
  .oh-kpi:nth-child(3){padding-left:0}
  .oh-kpi-val{font-size:34px;flex-wrap:wrap}
  .oh-kpi .oh-label{display:block;min-height:2.8em;line-height:1.4}
  .oh-sec{padding-top:32px}
  .oh-sec-head h2{font-size:27px}
  .oh-desk,.oh-reviews{grid-template-columns:minmax(0,1fr)}
  .oh-dec,.oh-review{padding:22px 0;min-height:0}
  .oh-dec+.oh-dec,.oh-review+.oh-review{padding-left:0;border-left:0}
  .oh-btn{min-height:46px}
  .oh-tabs button{min-height:44px}
  .oh-tabs{gap:20px}
  .oh-sec-head .oh-meta{margin-left:0;max-width:100%}
  .oh-rail{grid-template-columns:minmax(0,1fr);gap:0}
  .oh-row{grid-template-columns:minmax(0,1fr) auto;gap:4px 16px}
  .oh-row .oh-state{grid-column:1/-1;margin-top:4px}
  .oh-row.three span:nth-of-type(2){grid-column:1/-1}
  .oh-foot{flex-direction:column;align-items:flex-start;margin-top:40px}
  .oh-sheet-body{padding:22px 20px}
  .oh-sheet-head{padding-left:20px}
}
@media (prefers-reduced-motion:reduce){
  .oh-in,.is-changed,.oh-appt.fresh{animation:none}
  .oh-dot.run::after{animation:none}
  .oh *{transition-duration:.01ms!important}
}
`;
