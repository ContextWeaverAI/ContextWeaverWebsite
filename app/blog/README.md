# Blog authoring & engineering notes

How the ContextWeaver blog is built, and the non-obvious things that will bite you.
Read this before adding a post or a diagram.

## File layout

```
app/blog/
  posts.ts                 # post metadata registry (single source of truth)
  page.tsx                 # /blog index — series grid + "Field notes" standalone grid
  <slug>/
    page.tsx               # route: server component — owns SEO metadata + JSON-LD
    article-html.ts        # article body as a themed HTML string (+ diagram <style>)
components/
  blog-article.tsx         # shared client renderer (hero, prose surface, series nav, CTA)
```

Two kinds of post:
- **Series** — grouped via the `series` field (`{ ...SERIES_CONST, part: N }`). The
  hero shows a "Part N" chip; the progress strip and prev/next nav appear only once the
  series has **2+ published parts** (derived from `getSeriesParts`, not a hard-coded count).
- **Standalone** — no `series` field.

### Series conventions (learned the hard way)
- `BlogSeries.total` is **optional**. Don't hard-code a planned length — the UI derives
  "of N" and "A N-part series" from the number of *published* parts, so a one-post series
  reads "Part 1" (no fabricated total) and grows automatically.
- The `/blog` index **features one series** (currently the voice series) in the hero block;
  every other post — standalone *or* the opening parts of a newer series — surfaces in the
  "Field notes" grid via `getFieldNotePosts()`, with a series badge. Without this, adding a
  `series` to a post would drop it out of `getStandalonePosts()` and it would **vanish from
  `/blog`**. Promote a series to the featured hero once it's big enough.
- The "Sources & citations" card in `blog-article.tsx` is gated to the **voice series id**
  (it links to a voice-only sources page) — not to `series` in general. Any new series that
  needs sources must add its own gate + page.
- The article-footer `CTABand` is themed per post in `blog-article.tsx`: voice series → the
  voice pitch; everything else → the context-layer pitch. Add a branch when a series needs
  its own CTA.

## Adding a post

1. Add an entry to `posts.ts` (`BlogPost`). Standalone → omit `series`. Set `charts: ""`
   unless you have a charts hero stat.
2. Create `app/blog/<slug>/article-html.ts` exporting `articleHtml` — a template-literal
   string rendered into `.blog-prose` via `dangerouslySetInnerHTML`. Use HTML entities
   (`&mdash;`, `&rsquo;`, `&ldquo;`), never raw backticks or `${...}`.
3. Create `app/blog/<slug>/page.tsx` as a **server component** (no `"use client"`) — see
   SEO below. It renders `<BlogArticle post={...} html={articleHtml} />`.
4. Keep a plain-markdown mirror of the prose (`<slug>-blog/article.md`) in sync — it's the
   readable source of truth and what gets adapted into the LinkedIn post.

## SEO (do not skip)

`components/blog-article.tsx` is `"use client"`, so it **cannot** export `metadata`. Per-post
SEO lives in the **server-component `page.tsx`**:
- `export const metadata: Metadata` — title (`"<title> — ContextWeaver"`), description (the
  dek), `keywords`, `authors`, `alternates.canonical`, `openGraph` (type `article`,
  `publishedTime`, `section`), `twitter`.
- A JSON-LD `Article` block via `<script type="application/ld+json" dangerouslySetInnerHTML>`.

Without this a post inherits the generic site title/description — the single biggest SEO gap.

**Domain:** canonical is `https://www.contextweaver.info` — the domain bound to GitHub
Pages via `public/CNAME`, the only host that serves every path and `/contextweaver.png`
with `200`. It is defined once in `lib/site.ts` (`SITE_URL`, `OG_IMAGE`) and imported by
`app/layout.tsx` and every page — do **not** re-declare it per page. `getcontextweaver.com`
is only a root-domain forward and 404s on deep paths/files, so pointing metadata there
breaks link previews. If the `.com` becomes the real brand host, repoint DNS + `CNAME`
first, then change `SITE_URL` in one place.

**Links:** weave a few real internal links (`/architecture`, `/use-cases`, sibling posts) and
2–4 authoritative external links (`target="_blank" rel="noopener noreferrer"`). Verify every
external URL is live (WebFetch) before shipping — don't guess paths.

## Voice

Studied from the founder's writing (`voice-tradeoff-blog/`). For a technical explainer:
lead with a concrete scene, map the domain onto patterns a software engineer already knows,
stay honest (flag what's thin, name the tradeoffs), end with one clean line. Educational
first; a single-sentence bridge to ContextWeaver at the very end, never salesy throughout.

## Readability (globals.css)

The `<body>` has a **fixed dot-grid background** (`globals.css`, the `radial-gradient(circle
at 1px 1px, …)` layer). Prose sitting directly on it is hard to read. Fixes in place:
- `.blog-prose` is 18px (19px ≥1024px), line-height ~1.78.
- Paragraph/list color is mixed ~82% toward `--foreground` (not the faint `--muted-foreground`).
- The article body is wrapped in a `.blog-surface` panel (solid `--card` + border + shadow)
  in `blog-article.tsx` so text never sits on the dots.

## Diagrams — the important gotcha

**Do NOT put SVG styling classes (`fill`/`stroke`) in `globals.css`.** Tailwind v4's optimizer
(lightningcss) **mangles `color-mix()`** there — it silently drops `stroke-width` and collapses
the mix to a bare `var()`. Combined with dev-server CSS chunking serving stale rules, SVG shapes
fall back to defaults (**black fill, no stroke**) and the diagram looks broken.

**Instead:** put a `<style>` block **inside the `articleHtml` string** (top of `article-html.ts`).
Because it's injected via `dangerouslySetInnerHTML`, it bypasses lightningcss entirely, so
`var(--token)` and `color-mix()` render as authored — and still track light/dark via the theme
tokens. (This is why the one working element in the first broken attempt was an inline
`style="fill:var(--orange)"`.)

Diagram conventions that worked:
- Inline SVG with `viewBox` (responsive; sized to 100% width by the `<style>`). No image files.
- Semantic classes (`dg-node`, `dg-mesh`, `dg-box`, `dg-hub`, `dg-chip`, …) defined once in the
  embedded `<style>`, referencing `var(--card/--foreground/--orange/--border/--muted)`.
- Faint lines need ~45–55% foreground mix to read on the surface; 20–25% is invisible.
- **Label your nodes.** An unlabeled dot-and-line graph reads as abstract noise; the same graph
  with `ERP/MES/SCADA/PLC/Historian/Dashboard` labels reads instantly.
- No diagram tool (`d2`, `mermaid`, `graphviz`) is installed, and none matches the theme as
  tightly as hand-authored themed SVG. Don't reach for one.

### Verifying diagrams without a browser

`inkscape` and ImageMagick `convert` are available locally. To eyeball an SVG:
1. Extract the `<svg>…</svg>` from `article-html.ts`.
2. Substitute a light-theme hex value for each `var(--token)` (inkscape doesn't resolve CSS
   vars; it also skips `rgba()`/`color-mix()` strokes — use a **solid** hex to check geometry).
3. `inkscape d.svg --export-type=png --export-filename=d.png -w 800 -b '#f6f4f1'`
4. Read the PNG. This catches overflow, overlaps, and missing strokes before handing back.

## Build / preview

- `pnpm build` — validates compilation + static prerender (blog routes are `○ Static`).
- After editing `globals.css`, **restart `pnpm dev`** — HMR can serve a stale CSS chunk and
  make finished changes look broken. A production build reflects the true output.
