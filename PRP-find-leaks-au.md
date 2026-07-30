# PRP — Phase A: Localize the Lead-Loss Calculator to Australia (`/find-leaks-au`)

**Branch:** `feat/find-leaks-au` · **Scope:** localization only (locale/currency, calibration, copy, routing). No visual redesign (that's Phase B). **Status:** awaiting approval + calibration confirms before `/execute-plan`.

---

## 1. Goal + scope
Ship an Australian variant of the live owner-facing "lead-loss calculator" funnel so AU cold-email + Meta ads can point at a clean AU URL, without touching the live US funnel on `main`.

**In scope:** en-AU currency; AU-appropriate default calibration (avg ticket, CPL); copy localization (air con, AU tooling, GST, suburb/postcode, AU spelling, winter framing); separate AU routes; AU lead/booking wiring.
**Out of scope:** any visual redesign (Phase B); incentive/rebate logic (VEU/NSW ESS/STCs); changing the leak-math formula thesis; anything on `main`.

## 2. Routing approach — recommendation
**Recommended: duplicate the folder to `hvac-calculator-au/` and add separate routes `/find-leaks-au` + `/find-leaks-au/start`.**
- Why: the guardrail is "US funnel untouched," and the existing copy is hard-coded inline in each component (not prop-driven). Making it locale-parameterised would mean editing the shared components the US funnel renders → live-funnel regression risk. A duplicated folder gives full isolation, zero US regression, and divergence is fine because the US port is an explicit later/separate effort.
- The only `main`-shared files touched are **purely additive**: two new branches in `App.tsx` and two new rewrites in `vercel.json`. US behaviour is byte-identical.
- Rejected: locale toggle / query-param on the existing route (pollutes the US route, regression surface).

## 3. File-by-file change plan (new `hvac-calculator-au/`, copied from `hvac-calculator/`)
| File | Changes | Stays |
|---|---|---|
| `calculations.ts` | `formatCurrency` → `toLocaleString('en-AU')`; recalibrate CPL constant `8`→AU (Open #2); update doc-comment expected outputs | The 3 leak formulas (structure unchanged) |
| `constants.ts` | localize QUESTION labels/helpers (air con; AU helper text); `DEFAULT_INPUTS.averageTicket`→AU (Open #1); avg-ticket slider `max` (Open #5) | `ACCENT_HEX = #D45D00`; structure |
| `types.ts` | comment `USD`→`AUD` | interfaces |
| `Calculator.tsx` | header "HVAC"→"air conditioning"; `formatDisplay` `'en-US'`→`'en-AU'` | slider logic, GA4 |
| `ResultView.tsx` | (labels already generic) GA4 `event_label`→`hvac_calculator_au` | count-up, layout |
| `EmailCapture.tsx` | `source`→`hvac_calculator_au`; webhook env (Open #4); GA4 label→`_au` | GHL POST shape, validation |
| `SqueezePage.tsx` | `CALC_URL` `/find-leaks`→`/find-leaks-au`; "HVAC"→"air con"; add winter-breakdown framing to hero; GA4 label→`_au` | 3-leak structure, layout |
| `SalesPage.tsx` | "HVAC"→"air con"; ServiceTitan/Housecall FAQ→ServiceM8/simPRO/Tradify; "90-Day HVAC Lead Engine"→"…Air-Con…"; `BOOKING_URL` (Open #4); GA4 label→`_au` | offer stack, guarantees, layout, shared surfaces |
| `index.tsx` | imports from local AU files; header "HVAC Lead Loss Calculator"→"Air-Con Lead Loss Calculator" | structure |
| `styles.css` | identical copy (isolation) | all |
| **`App.tsx`** *(shared, additive)* | add `isAuSqueezeRoute('/find-leaks-au/start')` + `isAuCalculatorRoute('/find-leaks-au')` branches; import AU pages | all US branches unchanged |
| **`vercel.json`** *(shared, additive)* | add rewrites for `/find-leaks-au` + `/find-leaks-au/start` | US rewrites unchanged |

Shared surfaces (`CalculatorPreviewSurface`, `MissionControlSurface`) are imported as-is (visual = Phase B; not localized in Phase A).

## 4. Calibration table (CONFIRM = unsourced, needs Rob)
| Constant | US | Proposed AU | Justification | Flag |
|---|---|---|---|---|
| `averageTicket` default | $1,800 | **A$2,200** ✓ | AU split install for a typical home A$1,800–2,200; blended with service/repair + occasional ducted (A$12–17k). Research-backed (servicetasker, solarquotes) | RESOLVED |
| CPL (`adTrackingLeak` `*8`) | $8 | **A$15** ✓ | AU paid air-con CPLs A$40–150 (Google), A$40–120 (Meta) — kept conservative since most inbound isn't paid. Research-backed (searchlightdigital, webco) | RESOLVED |
| `averageTicket` slider max | $15,000 | **A$20,000** ✓ | AU ducted replacements reach A$15–20k | RESOLVED |
| `conversionRate` default | 20% | 20% | residential close-rate transfers | keep |
| `monthlyLeads` / `oldQuotes` | 200 / 400 | 200 / 400 | operation-size (3–15 techs) transfers | keep |

With AU defaults (200 / 0.20 / 2,200 / 400 / CPL 15): afterHoursLeak **A$70,400**, deadQuoteLeak **A$105,600**, adTrackingLeak **A$1,050**, total **A$177,050** (doc-comment matches).

## 5. Copy localization (representative find → replace)
| File | US | AU |
|---|---|---|
| constants/Calculator/Squeeze/Sales | "HVAC" | "air conditioning" / "air con" |
| SalesPage FAQ | "ServiceTitan or Housecall Pro" | "ServiceM8, simPRO or Tradify" |
| any | "sales tax" | "GST" |
| any | ZIP | suburb / postcode |
| all | optimize/organize/center | optimise/organise/centre |
| Squeeze hero | (cooling-neutral) | add winter heating-breakdown framing (June = AU winter) |
| Sales engine name | "90-Day HVAC Lead Engine" | "90-Day Air-Con Lead Engine" |
| currency | `en-US` `$` | `en-AU` `$` (Open #3) |

All copy held to voice.md (operator, short sentences, never lead with "free") + icp-profiles.md. AU vernacular natural, not costume.

## 6. Acceptance criteria
1. `/find-leaks-au` renders calculator+result+sales; `/find-leaks-au/start` renders the squeeze; both via the new routes + vercel rewrites.
2. Currency renders AUD via `en-AU` (symbol per Open #3).
3. Hero/squeeze uses **winter** heating-breakdown framing, not cooling.
4. The three leak formulas are structurally intact; only constants/defaults recalibrated; doc-comment outputs match.
5. No VEU/NSW ESS/STC logic added.
6. Copy axes applied per file (air con, AU tooling, GST, suburb/postcode, AU spelling).
7. End-to-end: AU URL → calculator → result → email capture POSTs to GHL with `source: hvac_calculator_au` → booking CTA opens the AU booking target.
8. `main`'s `/find-leaks` + `/find-leaks/start` render byte-identical (US untouched).
9. `npm run build` passes (tsc + vite).

## 7. Manual test plan
- `npm run dev` → visit `/find-leaks-au/start` → click Start → lands `/find-leaks-au`.
- Drag each slider; confirm AUD formatting + AU labels; result count-up shows A$ total.
- Submit a test email → network tab shows POST to GHL webhook with `source: hvac_calculator_au`.
- Click "Book" → opens the AU booking target.
- Visit `/find-leaks` + `/find-leaks/start` → confirm unchanged US copy/values.
- `npm run build` clean.

## 8. Rollout notes
- Vercel SPA rewrites added for both AU paths.
- **GHL/booking (Open #4):** default = reuse `VITE_GHL_WEBHOOK_URL` + `/calculator-page.html`, distinguish AU by `source: hvac_calculator_au`. If a dedicated AU pipeline is wanted: add `VITE_GHL_WEBHOOK_URL_AU` (Vercel Prod+Preview) and point `BOOKING_URL` at the AU calendar.
- GA4: AU events suffixed `_au` (`hvac_calculator_au`, `hvac_squeeze_au`, `hvac_funnel_au`) so the AU test reads cleanly in analytics.
- Commit Phase A on `feat/find-leaks-au` (this PRP + the AU folder + additive App/vercel changes). Phase B is a separate commit.

## 9. Open decisions (confirm before build)
1. **Average ticket default** — proposed **A$2,500** (CONFIRM with your AU job data).
2. **CPL constant** — proposed **A$12** (CONFIRM).
3. **Currency symbol** — recommend plain **"$"** (en-AU; audience is domestic AU). "A$" available if you want explicit AUD signalling.
4. **Booking/lead target** — recommend **reuse existing GHL webhook + calendar, tag `source: _au`**. Or wire a separate AU webhook/calendar (give me the URL).
5. **Avg-ticket slider max** — proposed **A$20,000**.
