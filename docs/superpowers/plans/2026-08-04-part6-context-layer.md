# Part 6 — "The Context Layer, Finally" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Part 6, the capstone of the "Deconstructing the Smart Factory" series, which
installs the context layer as the answer to the empty arc Part 5 ended on.

**Architecture:** A Next.js static blog post following the exact pattern of Parts 1–5: a prose
markdown mirror (source of truth), a themed inline-SVG article rendered from an `article-html.ts`
string, a server-component `page.tsx` carrying SEO + JSON-LD, and a `posts.ts` registry entry.
Four hand-authored themed SVG diagrams. No new dependencies, no framework changes.

**Tech Stack:** Next.js (static export / GitHub Pages), TypeScript, hand-authored inline SVG,
`tectonic` not involved (that's proposals, different repo), `inkscape` for local SVG geometry checks,
`pnpm build` for the static-prerender gate.

## Global Constraints

Copied verbatim from the design spec (`docs/superpowers/specs/2026-08-04-part6-context-layer-design.md`)
and the series canon (`app/blog/series-canon-smart-factory.md`). **Every task inherits these.**

- **Slug:** `context-layer`. **Title:** `The Context Layer, Finally`. **Series part:** 6.
- **Positioning:** hybrid — honest-explainer voice in the body; **ContextWeaver named only in the
  finale (beat 6) and the closing blockquote**, never earlier.
- **No car / CAN-bus analogy anywhere in this part.** (Reason: a bus is transport = Part 1's UNS;
  it would contradict the "model, not a bus" thesis.)
- **Match Part 5's punctuation house style.** The website blog prose *does* use em dashes as a
  stylistic device (rendered via `&mdash;` in `article-html.ts`, literal `—` in the markdown mirror);
  Part 5 is full of them. Follow that. (The "no em dash" rule belongs to the separate brain/outreach
  repo, not here — do not apply it to this article.)
- **Frozen example facts, unchanged:** Line 2's filler; a Tuesday; `PT_004` = **4.2 bar**, alarm
  limit **4.0 bar**; **batch #4471**, **500 ml** SKU; **resin lot RL-88**; operator **Priya**; the
  shared **glycol skid** = asset **GLY-SKID-02**; shipment **S-201**.
- **Two-system prose covers exactly two pairs:** Historian + CMMS (condition-based maintenance) and
  QMS + PLM (close the design-quality loop). The other pairs are posed as unanswered open questions.
- **Three-system walk is exactly three systems:** Historian (signal) + MES (work) + ERP (business):
  `PT_004 = 4.2 bar` → batch #4471 → order + shipment S-201 at risk.
- **SCADA owns the write** — the context layer reasons/recommends, never actuates. Do not undercut.
- **Escalation intact** — no earlier layer "got the number wrong"; they were faithful and still
  could not explain it.
- **Verdict flip** is the payoff: Parts 1–5 "still not a model" → Part 6 "here, finally, is the model."
- **Diagram styling lives in a `<style>` block inside `article-html.ts`**, never in `globals.css`
  (lightningcss mangles `color-mix()` there). Reuse Part 5's `dg-*` class vocabulary and palette
  (blue trunk, red acronyms, orange layer/accent).
- **Domain / SEO:** import `SITE_URL` / `OG_IMAGE` from `lib/site.ts`; never hard-code a domain.

---

## Task 0 (prep, no commit): Read the ground truth

- [ ] Read the design spec `docs/superpowers/specs/2026-08-04-part6-context-layer-design.md` in full.
- [ ] Read `app/blog/series-canon-smart-factory.md` in full (throughline, frozen example, cohesion checklist).
- [ ] Read Part 5's prose mirror `business-systems-blog/article.md` (the immediately prior part — for
      voice, the callback words, and the "five IDs" and "T" diagrams Part 6 calls back to).
- [ ] Read Part 5's `app/blog/business-systems/article-html.ts` (the `<style>` block, `dg-*` classes,
      and the T-diagram + five-IDs SVG source that D1 and D4 will adapt).
- [ ] Read `app/blog/business-systems/page.tsx` (the exact metadata + JSON-LD shape to mirror).

---

## Task 1: Draft the prose mirror

**Files:**
- Create: `context-layer-blog/article.md`

**Interfaces:**
- Produces: the canonical prose (all 7 beats), with inline diagram placeholders
  `[Diagram D1: …]` … `[Diagram D4: …]` that Task 3 replaces with SVG. Later tasks (title, dek,
  keywords) draw their copy from this file.

- [ ] **Step 1: Write the full article body** into `context-layer-blog/article.md`, following the
  seven beats in the spec exactly:
  1. Cold open — analyst with five logins at Part 5's empty arc; "five parts, one number nobody
     understood; now we install the thing that understands."
  2. What it actually is — one shared model across the top of the T; each system connects **once**
     (N spokes, not N² connectors); the ERP asset / CMMS equipment / PLM part / MES resource /
     historian tag all resolve to **one filler**; identity, edges, meaning live here.
  3. Two systems = a superpower (a couple of paragraphs): **Historian + CMMS → condition-based
     maintenance**; **QMS + PLM → close the design-quality loop**; then the open-question line —
     *"And what falls out when you connect Historian + QMS? MES + ERP? CMMS + MES? Every pair is
     another superpower — we've named two."* (Leave those unanswered.)
  4. Three systems = true intelligence (the deep dive): the Historian → MES → ERP walk
     (`PT_004 = 4.2 bar` → #4471 → S-201 at risk); the "why three is the threshold" paragraph
     (two systems = a fixed join / an answer; three = the agent must choose a path, and paths
     explode — lookup becomes traversal nobody pre-wired).
  5. The reframe — integration moves records between two systems and stops; the context layer builds
     the graph once and every future path already exists; "superpowers are joins you wired,
     intelligence is traversal you didn't have to."
  6. Named finale (ContextWeaver, only here) — the Manufacturing Context Layer; facets from
     `/architecture` (asset-centric semantic model, unit/time normalization, document +
     tribal-knowledge memory, per-tag quality scoring, business entities as first-class); one
     honesty beat (the hard part is entity resolution + governance; only as trustworthy as its
     resolution and quality scores); the Part 3 boundary (reasons/recommends, **SCADA owns the
     write**); links to `/architecture` and `/use-cases`.
  7. One line + the ContextWeaver CTA blockquote (same register as Part 5's closing blockquote).
  Insert `[Diagram D1: the T completed]` after beat 2, `[Diagram D2: superpower matrix]` inside
  beat 3, `[Diagram D3: the three-system walk]` inside beat 4, `[Diagram D4: five IDs resolved to
  one]` inside beat 6 (or wherever it reads best in 5/6).

- [ ] **Step 2: Run the canon cohesion checklist against the draft** (from
  `series-canon-smart-factory.md`, section "Cohesion checklist"). Verify, line by line:
  - No contradiction with any UNS/Historian/SCADA/MES/business-systems thesis.
  - Exactly one callback to Part 5, in its own words ("five systems of record, no system of the plant").
  - Every number/name matches the frozen list (grep the draft for `4471`, `PT_004`, `4.2`, `4.0`,
    `RL-88`, `GLY-SKID-02`, `S-201`, `Priya`, `500 ml`).
  - No car/CAN-bus analogy present (`grep -in "can bus\|CAN-bus\|ECU\|car " context-layer-blog/article.md`
    should return nothing).
  - "SCADA owns the write" not undercut.
  Expected: all pass. Fix inline until they do.

- [ ] **Step 3: Commit**

```bash
git add context-layer-blog/article.md
git commit -m "content(blog): draft Part 6 prose mirror (context layer)"
```

---

## Task 2: Author the four SVG diagrams

**Files:**
- Create (scratch, not committed): `/tmp/p6-diagrams/*.svg` + `.png` for inkscape checks.

**Interfaces:**
- Produces: four validated `<svg>…</svg>` snippets (D1–D4) and one `<style>` block, all reusing
  Part 5's `dg-*` class names and palette tokens, ready for Task 3 to inline. Keep each SVG's source
  in a scratch note so Task 3 can paste it.

- [ ] **Step 1: Adapt Part 5's `<style>` block** for Part 6, keeping the semantic classes Part 5
  defined (`dg-node`, `dg-box`, `dg-hub`, `dg-chip`, `dg-mesh`, etc.). Add any Part-6-specific class
  (e.g. `dg-path` for the highlighted agent traversal, `dg-open` for dashed "?" edges). Reference
  only `var(--card/--foreground/--orange/--border/--muted)`; faint lines need ~45–55% foreground mix.

- [ ] **Step 2: Author D1 — "the T, completed."** Start from Part 5's T diagram (blue trunk
  SCADA → UNS → Historian → MES; crossbar ERP/CRM/CMMS/PLM/QMS), and **fill the empty orange arc**:
  draw the context-layer band across the crossbar and down the trunk, each system a spoke into it.
  Caption: the crossbar is finally wired.

- [ ] **Step 3: Author D2 — "the superpower matrix."** Nodes for the systems; **2 solid labeled
  edges** (Historian–CMMS "condition-based maintenance", QMS–PLM "design-quality loop") and several
  **dashed `?` edges** (Historian–QMS, MES–ERP, CMMS–MES) left unlabeled/open. Caption: we named two;
  there are dozens.

- [ ] **Step 4: Author D3 — "the three-system walk" (centerpiece).** Three system cards
  (Historian, MES, ERP) with a single highlighted path `PT_004 = 4.2 bar` → `#4471` →
  `order · S-201 at risk`, drawn as one continuous `dg-path`. Caption: one question, signal to
  customer, a route nobody pre-wired.

- [ ] **Step 5: Author D4 — "five IDs resolved to one."** Take Part 5's "five IDs, zero shared
  identity" diagram (the filler drawn once with five local IDs) and **resolve** it: the five local
  IDs (ERP fixed-asset, CMMS equipment, PLM part, MES resource, historian tag) now converge into one
  labeled node "the filler". Caption: the shared identity Part 5 said was homeless.

- [ ] **Step 6: Verify each diagram's geometry with inkscape** (per blog README). For each SVG:
  substitute a solid light-theme hex for every `var(--token)` (inkscape skips `color-mix()`/`rgba()`
  strokes), then:

```bash
inkscape /tmp/p6-diagrams/d1.svg --export-type=png --export-filename=/tmp/p6-diagrams/d1.png -w 800 -b '#f6f4f1'
```

  Read each PNG. Expected: no overflow, no overlapping labels, all strokes present, every node
  labeled. Fix geometry until clean. (No commit — these snippets land in Task 3.)

---

## Task 3: Assemble `article-html.ts`

**Files:**
- Create: `app/blog/context-layer/article-html.ts`

**Interfaces:**
- Consumes: the prose from Task 1 and the four SVG snippets + `<style>` block from Task 2.
- Produces: `export const articleHtml: string` — the themed HTML body, consumed by Task 4's `page.tsx`.

- [ ] **Step 1: Create the file** exporting a template-literal `articleHtml`. Put the `<style>` block
  at the very top of the string. Convert the Task 1 prose to HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`,
  `<blockquote>` for the CTA), matching Part 5's markup structure. **Use HTML entities**
  (`&mdash;`, `&rsquo;`, `&ldquo;`, `&rarr;`); **never raw backticks or `${...}`** inside the literal.
  Replace each `[Diagram Dn: …]` placeholder with its inlined `<svg>` from Task 2, wrapped like
  Part 5's diagram figures (figure + caption).

- [ ] **Step 2: Weave links.** Internal: `/blog/business-systems` (Part 5 callback),
  `/blog/unified-namespace` (the "N² spaghetti" reference), `/architecture`, `/use-cases`. External:
  2–4 authoritative links only if they earn their place (e.g. entity resolution / knowledge-graph
  references); each `target="_blank" rel="noopener noreferrer"`. Verify every external URL is live
  (WebFetch) before including.

- [ ] **Step 3: Commit**

```bash
git add app/blog/context-layer/article-html.ts
git commit -m "feat(blog): Part 6 article-html with four themed SVG diagrams"
```

---

## Task 4: Create the route + SEO (`page.tsx`)

**Files:**
- Create: `app/blog/context-layer/page.tsx`

**Interfaces:**
- Consumes: `articleHtml` from Task 3; `getPost("context-layer")` from Task 5 (add the posts entry
  first if executing out of order — see Task 5).
- Produces: the static route `/blog/context-layer`.

- [ ] **Step 1: Create `page.tsx` as a server component** (no `"use client"`), copying Part 5's
  `app/blog/business-systems/page.tsx` structure exactly and changing the content:
  - `export const metadata: Metadata` — title `"The Context Layer, Finally — ContextWeaver"`,
    description = the dek (from Task 5), `keywords`, `authors: [{ name: "Ishan Bhanuka" }]`,
    `alternates.canonical` = `${SITE_URL}/blog/context-layer`, `openGraph` (type `article`,
    `publishedTime`, `section: "Architecture"`), `twitter`. Import `SITE_URL`/`OG_IMAGE` from
    `lib/site.ts`.
  - A JSON-LD `Article` block via `<script type="application/ld+json" dangerouslySetInnerHTML>`.
  - Render `<BlogArticle post={getPost("context-layer")!} html={articleHtml} />`.

- [ ] **Step 2: Commit**

```bash
git add app/blog/context-layer/page.tsx
git commit -m "feat(blog): Part 6 route + SEO metadata and JSON-LD"
```

---

## Task 5: Register the post in `posts.ts`

**Files:**
- Modify: `app/blog/posts.ts` (prepend a new `BlogPost` to the `posts` array, newest-first)

**Interfaces:**
- Produces: `getPost("context-layer")`, `getSeriesParts("deconstructing-the-smart-factory")` now
  returning 6 parts, and the sitemap entry (auto via `app/sitemap.ts`).

- [ ] **Step 1: Add the entry** at the top of the `posts` array:

```ts
{
  slug: "context-layer",
  title: "The Context Layer, Finally",
  subtitle: "The layer that reads across every system, and why connecting three of them is where intelligence starts",
  dek: "Five systems of record, no system of the plant. This is the missing one: a single shared model where connecting any two systems unlocks a superpower, and connecting three turns lookups into reasoning no single system could do.",
  category: "Architecture",
  date: "2026-08-04",
  dateLabel: "Aug 4, 2026",
  readingTime: "10 min read",
  wordCount: "Concept · ~2,400 words",
  charts: "4 diagrams",
  author: "Ishan Bhanuka, CTO",
  series: { ...SMART_FACTORY_SERIES, part: 6 },
},
```

  (Adjust `wordCount`/`readingTime`/`charts` to the actual shipped numbers; adjust `date`/`dateLabel`
  to the real ship date.)

- [ ] **Step 2: Commit**

```bash
git add app/blog/posts.ts
git commit -m "feat(blog): register Part 6 in posts registry"
```

---

## Task 6: Build, verify static + SEO + links (the publish gate)

**Files:** none created; this is the README "Publishing checklist" run as a gate.

- [ ] **Step 1: Build**

```bash
pnpm build
```

Expected: clean build; `/blog/context-layer` shows `○ (Static)` in the route table; no errors from
the new files (pre-existing `bento-grid.tsx` type warnings are unrelated and OK).

- [ ] **Step 2: Verify the sitemap** includes the new slug:

```bash
grep context-layer out/sitemap.xml
```

Expected: one match (`https://www.contextweaver.info/blog/context-layer`).

- [ ] **Step 3: Verify links resolve.** Internal links (`/architecture`, `/use-cases`,
  `/blog/business-systems`, `/blog/unified-namespace`) map to real routes in the route table. Every
  external link returns 200 (WebFetch each). Fix any dead link.

- [ ] **Step 4: Prose mirror in sync.** Diff `context-layer-blog/article.md` against the shipped
  `article-html.ts` prose — they must say the same thing (the markdown is what the LinkedIn post is
  adapted from). Reconcile any drift into the markdown.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(blog): Part 6 build/link/sitemap verification fixes"
```

---

## Task 7: Update the series canon (ship the part)

**Files:**
- Modify: `app/blog/series-canon-smart-factory.md`

**Interfaces:** none — documentation gate that keeps the series' cumulative argument trustworthy.

- [ ] **Step 1: Add Part 6's row** to the throughline table (System = "Context layer", Verb =
  "reads across / reasons over the number", primitive = "a shared model / graph over the systems",
  one-line thesis = "connect two for a superpower, three for intelligence; the model none of them
  were", and note the deliberate absence of a car-analogy cell — or reuse the model-shaped register
  note). Mark the series **complete** (Part 6 is the finale).

- [ ] **Step 2: Note the two deliberate canon departures** in the canon doc so a future editor does
  not "fix" them: (a) **no car analogy** in Part 6 and why (CAN bus = transport = Part 1); (b) the
  structure inverts the 7-beat "limitation" ending into a "what it unlocks" payoff, by design.

- [ ] **Step 3: Commit**

```bash
git add app/blog/series-canon-smart-factory.md
git commit -m "docs(blog): mark smart-factory series complete, add Part 6 canon row"
```

---

## Self-review (author ran this against the spec)

- **Spec coverage:** every beat (1–7) → Task 1; every diagram (D1–D4) → Task 2/3; positioning +
  named finale → Task 1 beat 6 + Task 3 blockquote; SEO/JSON-LD → Task 4; registry/sitemap → Task 5;
  build/link gate → Task 6; canon update → Task 7. No spec section is unmapped.
- **Placeholder scan:** the only intentional placeholders are the `[Diagram Dn]` markers in Task 1,
  explicitly resolved in Task 3; the `wordCount`/`date` "adjust to actual" notes are real
  instructions, not TODOs.
- **Consistency:** slug `context-layer` and title `The Context Layer, Finally` used identically in
  Tasks 3/4/5; the three-system walk is pinned to Historian/MES/ERP everywhere; the two featured
  pairs (Historian+CMMS, QMS+PLM) match between Task 1 and the D2 diagram in Task 2.
- **Note:** this is a content build, so "tests" are the canon cohesion checklist (Task 1), inkscape
  geometry checks (Task 2), and the `pnpm build` static/SEO/link gate (Task 6) — the repo's real
  verification surfaces, standing in for unit tests.
