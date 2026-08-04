# Design — Part 6: "The Context Layer, Finally"

*Deconstructing the Smart Factory · Part 6 — the finale. A brainstormed design spec, not the article itself.*

## Purpose

Part 6 is the payoff of the series. Parts 1–5 walked one misunderstood number (`PT_004 = 4.2 bar`
on Line 2's filler) down and across the plant and proved, layer by layer, that **no system is a
model of the whole** — ending Part 5 on an empty orange arc over the "T": *what reads across all of
them at once?* Part 6 installs the answer: a **context layer** — one shared model of the plant —
and flips the series' recurring verdict from *"still not a model"* to *"here, finally, is the model."*

The core argument, in the author's framing:

- **Connect any two systems → a superpower** (one concrete capability neither system had alone).
- **Connect three → true intelligence** (an agent walks a path across domains that nobody pre-wired).

## Positioning & voice (locked decisions)

- **Hybrid: concept body, named finale.** The body teaches "a context layer" as an architectural
  pattern in the same honest-explainer voice as Parts 1–5. ContextWeaver is named **only** in the
  finale section (beat 6) and the closing blockquote — never earlier.
- **Primitive named lightly.** Give the layer a one-line primitive (a shared, governed model /
  graph of the plant, built by resolving each system's local identity to one real thing), but keep
  the weight on *what it unlocks*, not *how it's built*. Capability-first, not mechanism-first.
- **Finale / capstone.** Part 6 closes the 6-part arc. No pivot into a "how it's built" sub-arc.
- **No car analogy.** Deliberate break from the series' car/CAN-bus register. Reason: the car's
  shared connector is the **CAN bus**, and a bus is *transport* — which is exactly what **Part 1
  (UNS) already was** ("a message broker is transport, not a system of record"). Part 6's whole
  thesis is that the layer is a **model, not a bus**, so a CAN-bus callback would (a) repeat the
  image Part 5 already spent and (b) argue the opposite of the thesis. The concrete `#4471` example
  carries the intuition alone. (If a lay register is ever wanted, the only non-contradicting shape
  is model-shaped — "five aerial photos of one town vs. one map in a single coordinate system" —
  but the default is no analogy.)

## Structure — beats

1. **Cold open.** Pick up exactly where Part 5 ended: the analyst with five logins and an afternoon,
   staring at the empty orange arc over the T. Reframe the series in two lines — five parts, one
   number nobody understood; now we install the thing that understands.

2. **What it actually is.** One shared model sitting across the top of the T. Each system connects
   to it **once** — N spokes into one model, explicitly **not** another N² pairwise connector (kills
   the "integration hell" fear Part 5 named). Primitive, named lightly: a governed model of the
   plant where the ERP fixed-asset, CMMS equipment, PLM part, MES resource, and historian tag all
   **resolve to one thing — the filler.** The three things that fell through every earlier part —
   identity, edges, meaning — live here.

3. **Two systems = a superpower** — *a couple of paragraphs, two worked examples only:*
   - **Historian + CMMS → condition-based maintenance.** Join the skid's live pressure/vibration
     trend to its maintenance schedule → service it when its *actual* condition says so, not the
     calendar.
   - **QMS + PLM → close the design-quality loop.** Join recurring deviations to the change orders
     that caused them → the excursion traces to the exact approved, dated recipe ECO that nudged
     fill pressure.
   Then **hand the rest to the reader as open questions** (do not answer them): *"And what falls out
   when you connect Historian + QMS? MES + ERP? CMMS + MES? Every pair is another superpower — we've
   named two."* Invites the combinatorial explosion without enumerating it.

4. **Three systems = true intelligence** — *the main event, the deep dive:*
   - **The walk — exactly three systems: Historian (signal) + MES (work) + ERP (business).**
     `PT_004 = 4.2 bar` at the metal (Historian) → **batch #4471** (MES) → the production order and
     **shipment S-201 now at risk** (ERP). Customer impact is reached *through* ERP's order, so the
     count stays a literal three — the thesis word must not wobble. (SCADA can stand in for Historian
     as the signal source, and CRM can be *named* as where the customer ultimately sits, but the
     three walked systems are Historian, MES, ERP.) One question walks from a sensor spike all the
     way to customer impact, spanning the full height of the T.
   - **Why three is the threshold.** With two systems you get *an answer* — a fixed join. With three,
     the agent must *choose a path*, and the number of possible paths explodes. That jump from
     "lookup" to "the agent finds a route nobody pre-wired" is the definition of intelligence here.
     This is the payoff paragraph of the entire series.

5. **The reframe — intelligence, not integration.** Point-to-point integration moves records
   between two systems and stops. The context layer builds the graph **once**; every path a future
   question needs already exists. Superpowers are joins you wired; intelligence is traversal you
   didn't have to.

6. **The named finale (ContextWeaver — only here).** This is the **Manufacturing Context Layer.**
   Name the real facets from `/architecture` as the concrete instance: asset-centric semantic model,
   unit/time normalization, document + tribal-knowledge memory, per-tag quality scoring, business
   entities as first-class. **One honesty beat** (preserves the series' sober voice): this is not
   magic — the hard part is entity resolution and governance; the layer is only as trustworthy as
   its resolution and its quality scores. **Boundary respecting Part 3's canon:** the layer reasons
   and recommends; **SCADA still owns the write** to the machines. Link `/architecture` + `/use-cases`.

7. **The one line + CTA blockquote.** Close the T: the crossbar is finally wired; the plant can be
   asked one question and answer it. Series-style ContextWeaver blockquote to end.

## Diagram plan (~4, leaner than Part 5's 8)

- **D1 — The T, completed.** Part 5's exact T with the empty orange arc, now *filled*: a
  context-layer band across the crossbar and down the trunk, each system a spoke into it. The
  literal visual payoff of Part 5's open question.
- **D2 — the superpower matrix.** A graph with **2 solid, labeled edges** (Historian+CMMS,
  QMS+PLM — the pairs the prose covers) and several **dashed "?" edges** (the open-question pairs
  handed to the reader). Says "we showed two; there are dozens" in one image.
- **D3 — the three-system walk (centerpiece).** `PT_004` → `#4471` → `S-201`, the agent's path
  highlighted across signal → work → business.
- **D4 — entity-resolution bookend.** Part 5's "five IDs, zero shared identity" diagram, now
  *resolved* into one node — a direct visual callback closing the series. **In by default**; pull it
  only if it turns out not to fit the final layout. (So ~4 diagrams, not 3.)

All diagrams: hand-authored themed inline SVG with a `<style>` block **inside** `article-html.ts`
(never in `globals.css` — lightningcss mangles `color-mix()`). Semantic classes referencing
`var(--card/--foreground/--orange/--border/--muted)`. Label every node. Reuse Part 5's `dg-*`
class vocabulary and the blue-trunk / red-acronym / orange-layer palette so Part 6 reads as the
same series. Verify geometry with inkscape before shipping (see blog README).

## Canon-consistency requirements (ship-gate — from `series-canon-smart-factory.md`)

- **Frozen example facts, unchanged:** quality excursion on **Line 2's filler**, one **Tuesday**;
  `PT_004` pressure **4.2 bar**, alarm limit **4.0 bar**; **batch #4471**, **500 ml** SKU;
  **resin lot RL-88**; operator **Priya**; the shared **glycol skid** (asset **GLY-SKID-02** per
  Part 5); shipment **S-201**. Cross-check every number/name against this list.
- **One callback.** Reference Part 5 once, by its own thesis words ("five faithful records, no model
  of the whole" / "five systems of record, no system of the plant").
- **Escalation intact.** Do not frame any earlier layer as having gotten the number *wrong* — they
  handled it faithfully and still couldn't explain it. Part 6 adds the model none of them were.
- **SCADA owns the write.** Do not undercut it. The context layer reasons/recommends; it does not
  actuate.
- **The stack is bidirectional.** If the trunk is drawn, don't imply purely-upward flow; but Part 6's
  diagrams are read-across (arrows into the layer), which is fine.
- **Verdict flip is the payoff.** Parts 1–5: "still not a model." Part 6: "here, finally, is the model."

## Two-system superpower menu (reference — prose features only #1 and #4)

Kept here so the "open questions" teasers and any future edits draw from a consistent set:

| Connect | Superpower | Before → after |
|---|---|---|
| Historian + CMMS | Condition-based maintenance | calendar service → service on actual trend |
| MES + ERP | True margin per run | standard-cost estimate → real margin after scrap/rework/downtime |
| MES + CRM | Promise-dates you can trust | quote from a spreadsheet → flag S-201 the moment the line will slip |
| QMS + PLM | Close the design-quality loop | log a deviation → trace it to the causing change order |
| Historian + QMS | Self-assembling audit evidence | screenshot trends into Word → deviation builds its own evidence pack |
| ERP + MES/Historian | Inventory that matches the floor | trust the ledger → reconcile against actual consumption |
| CMMS + MES | Maintenance-aware scheduling | schedule blind → plan around the asset about to need service |

Prose covers **Historian+CMMS** and **QMS+PLM**; the rest become the reader's open questions.

## Build & publish (from blog README — for the implementation plan)

- `posts.ts` entry: `slug: "context-layer"` (or similar), `series: { ...SMART_FACTORY_SERIES, part: 6 }`,
  `category: "Architecture"`, author `Ishan Bhanuka, CTO`, date `2026-08-04` (adjust on ship),
  `charts` set to the diagram count.
- `app/blog/<slug>/article-html.ts` — themed HTML string + embedded `<style>`; HTML entities, no raw
  backticks / `${...}`.
- `app/blog/<slug>/page.tsx` — **server component** with `metadata` (title `"… — ContextWeaver"`,
  dek as description, keywords, authors, `alternates.canonical`, `openGraph` type `article`,
  `twitter`) **and** a JSON-LD `Article` block. Import `SITE_URL`/`OG_IMAGE` from `lib/site.ts`.
- Plain-markdown mirror at `<slug>-blog/article.md`, kept in sync (source for the LinkedIn post).
- **Update `series-canon-smart-factory.md` the moment Part 6 ships** — add its row and mark the
  series complete.
- Run the README publishing checklist + the canon cohesion checklist before pushing to `main`
  (push = publish via GitHub Pages).

## Out of scope

- No "how the layer is built" deep dive (ontology, entity-resolution internals, governance model) —
  that would be a separate sub-arc; Part 6 is the capstone.
- No 7-system / "all of it" mega-walk. Three systems is the climax.
- No new running example — reuse the frozen one only.
- The LinkedIn adaptation is a follow-on, not part of this article's build.
