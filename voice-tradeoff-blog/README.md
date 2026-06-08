# The Voice Agent Tradeoff Triangle — blog package

A self-contained, framework-agnostic package of one blog post, ready to drop into
your website's code folder. No build step, no dependencies — just content + images.

> **Post:** *The Voice Agent Tradeoff Triangle — Cost, Latency, Language and Intelligence*
> A production-engineering and CTO-procurement view of shipping a voice agent in 2026.
> ~4,200 words · 9 charts · every figure cited.

---

## What's in here

```
voice-tradeoff-blog/
├── article.md            ← the post as Markdown (use this for most stacks)
├── article.html          ← the post as an HTML fragment (body content only, no <html>/<head>)
├── citations.html        ← standalone, self-styled citations/sources audit page
├── assets/
│   └── charts/           ← 9 SVG charts referenced by the article
│       ├── chart_01_latency_waterfall.svg
│       ├── chart_02_stt_cost_vs_wer.svg
│       ├── chart_03_language_coverage.svg
│       ├── chart_04_llm_intelligence_vs_cost.svg
│       ├── chart_05_context_vs_price.svg
│       ├── chart_06_tts_tradeoff.svg
│       ├── chart_07_four_axis_radar.svg
│       ├── chart_08_monthly_cost.svg
│       └── chart_10_cost_breakdown.svg
└── README.md             ← this file
```

Both `article.md` and `article.html` contain the **same content**. Pick whichever
your stack ingests more easily — you don't need both.

---

## How to use it

### The one rule: keep `assets/` next to the article

The article references charts with **relative paths** like
`assets/charts/chart_07_four_axis_radar.svg`. As long as the `assets/` folder sits
at the same relative location as the article file you serve, images resolve with
zero config.

If your site serves images from a different base (e.g. `/static/`, `/public/`, a
CDN), do a find-and-replace on `assets/charts/` → your path. One token, nine refs.

### Option A — Markdown (recommended for most stacks)

Use `article.md` if your site renders Markdown (Next.js/MDX, Astro, Hugo, Jekyll,
11ty, Gatsby, Docusaurus, a headless CMS, etc.).

1. Copy `article.md` into your content/posts directory.
2. Copy the `assets/charts/` folder to wherever your site serves static assets.
3. Add your own front-matter at the top if your generator needs it, e.g.:
   ```yaml
   ---
   title: "The Voice Agent Tradeoff Triangle"
   description: "Cost, Latency, Language and Intelligence — shipping a voice agent in 2026."
   date: 2026-06-08
   ---
   ```
4. Fix the `assets/charts/` prefix only if your static base differs (see the rule above).

### Option B — HTML fragment (drop into a template)

Use `article.html` if you'd rather inject ready-made HTML. It's **content only** —
no `<html>`, `<head>`, `<body>`, or styling — so it inherits your site's typography
and layout.

- **Server template / partial:** include `article.html` inside your page layout's
  content slot.
- **React/JSX:** render it with `dangerouslySetInnerHTML={{ __html: articleHtml }}`,
  or paste it into a component (rename `class=` → `className=` if you inline the JSX).
- **Plain static HTML:** paste the fragment into the `<body>` of your page shell.

### Citations page

`citations.html` is a **complete, self-styled page** (it has its own CSS and uses
color coding to flag measured vs. vendor-reported numbers — don't strip that
styling, it carries meaning). Use it as-is:

- Serve it at its own URL (e.g. `/blog/voice-tradeoffs/citations`), **or**
- Link to it from the article, **or**
- Embed it in an `<iframe>`.

It contains a section-by-section sourcing breakdown, a per-chart citation summary,
a "known caveats" section, and a full source index of every URL cited.

---

## Styling notes

- `article.md` / `article.html` ship **unstyled** — they take on your site's theme.
- The charts are **SVG**: crisp at any zoom, retina-safe, and recolorable via CSS
  if you ever want to (they're real vector, not rasterized).
- Headings in `article.html` already carry `id` attributes (e.g.
  `id="the-thesis"`), so in-page anchor links and a table of contents work out of
  the box.

## Quick local preview

From inside this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/article.html
```

(Markdown won't render in a raw browser — preview `article.html`, or run
`article.md` through your generator.)
