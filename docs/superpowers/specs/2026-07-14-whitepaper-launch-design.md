# Whitepaper launch: gated page, blog entry, homepage ribbon

Date: 2026-07-14

## Context

We're publishing a whitepaper, "The Manufacturing Context Layer" (source: `contextweaver-whitepaper-v4.html`, a self-contained 615-line styled HTML document with its own fonts/CSS/SVG figures). It needs to be:

1. Hosted and reachable from the site.
2. Gated behind an email-capture form (lead generation).
3. Surfaced from the blog section.
4. Promoted via a dismissible ribbon on the homepage.

The site is a Next.js App Router project built with `output: 'export'` (static export, deployed to GitHub Pages via `public/CNAME`). There is no server/API route capability and no existing email-capture backend. The user has a Formspree account with endpoint `https://formspree.io/f/xlgqdrnw`.

## 1. Whitepaper asset hosting

- Copy the source file verbatim to `public/whitepapers/manufacturing-context-layer.html`. It is fully self-contained (inline `<style>`, inline SVG figures, Google Fonts link) — no changes needed.
- Path is namespaced under `public/whitepapers/` (not `public/whitepaper.html`) to avoid colliding with the static-export output of the `/whitepaper` route (which will emit `out/whitepaper.html` or `out/whitepaper/index.html`).
- This file is never linked to directly from anywhere except the unlock action on the gate page (`/whitepaper`), so the only path to it is through the email gate.

## 2. Gated reading page (`/whitepaper`)

New route: `app/whitepaper/page.tsx`, client component, built in the site's normal design system (uses `Navbar` + `Footer` + existing motion/section conventions from other pages like `app/blog/page.tsx`).

**Layout:**
- Hero block: eyebrow "White paper", `h1` title "The Manufacturing Context Layer", one-line dek adapted from the whitepaper's abstract.
- A stylized preview card (new shared component, see §4) that visually echoes the whitepaper's own design language (paper background `#FBFAF6`, ink `#23252B`, teal `#0E6B54`, "Abstract" tab, a few truncated faux lines of body text) so visitors get a sense of the document before unlocking it. This is a hand-built mockup component, not a screenshot.
- Below the preview: an email-capture form.

**Form fields:** Email (required), Name (optional), Company (optional).

**Submit behavior:**
- On submit, `fetch()` POSTs JSON to `https://formspree.io/f/xlgqdrnw` with header `Accept: application/json` (Formspree's AJAX mode — no page navigation/redirect).
- While in flight: submit button shows a loading state, disabled.
- On success (`res.ok`): the form is replaced in place with an "Open the white paper →" button/link. That link:
  - opens `/whitepapers/manufacturing-context-layer.html` in a new tab (`target="_blank"`), and
  - sets `localStorage["cw_whitepaper_unlocked"] = "1"`.
- On failure (non-OK response or network error): show an inline error message below the form ("Something went wrong — please try again.") and re-enable the form for retry. No silent failures.

**Repeat visits:** On mount, check `localStorage["cw_whitepaper_unlocked"]`. If set, skip the form entirely and render the "Open the white paper →" button directly (no re-prompt for email).

## 3. Blog section entry

Edit `app/blog/page.tsx`: insert a new section between the existing "Featured series" section and the "More coming" section (renumber the "More" section's index label from `02` to `03`).

New section ("White paper", index `02`):
- Eyebrow/label row matching the existing section-header pattern (small dot + index + label, e.g. "White paper").
- Title: "The Manufacturing Context Layer".
- Dek: one-line abstract summary.
- Meta line: figure count / estimated reading time (e.g. "6 figures · ~15 min read"), styled like the existing `readingTime` / `wordCount` meta row used for blog series parts.
- The same preview mockup component from §4 (small/card-sized variant).
- CTA: "Read the white paper →", links to `/whitepaper` (the gated route — never directly to the raw HTML file, so the gate always applies).

This section is hand-authored directly in `app/blog/page.tsx` (not added to `app/blog/posts.ts`), since the existing `posts.ts` data model is shaped around blog series/parts, and the whitepaper isn't a blog post — it doesn't need its own `/blog/[slug]` route.

## 4. Shared whitepaper preview component

New component `components/whitepaper-preview.tsx`: a stylized "document" mockup card reflecting the whitepaper's own palette and typography choices (paper background, ink/teal accents, "Abstract" tab treatment, a couple of ruled/truncated lines standing in for body text). Accepts a `size` variant (`"card"` for the blog entry, `"large"` for the gate page hero) via props. Used in both §2 and §3 so the visual identity is consistent everywhere the whitepaper is promoted.

## 5. Homepage ribbon

- `Navbar` (`components/navbar.tsx`) already reads the current path via `usePathname()`. It gains an inline, self-contained ribbon: when `pathname === "/"` and not dismissed, render a slim bar as the first child inside its existing fixed header container (so ribbon + nav move together as one fixed unit — no separate positioning coordination needed).
- Ribbon copy: "New — Read our white paper: The Manufacturing Context Layer →". The entire bar is a `Link` to `/whitepaper`. A small `×` dismiss control (with `stopPropagation` so it doesn't trigger the link) sets `localStorage["cw_ribbon_dismissed"] = "1"` and hides the ribbon for that browser.
- On mount, `Navbar` checks `localStorage["cw_ribbon_dismissed"]` to decide initial ribbon visibility.
- Since the ribbon adds height to the fixed header only on `/`, the homepage's hero section (`app/page.tsx`) gets a small conditional top-padding bump (checked against the same dismissed/visible state) so hero content isn't crowded when the ribbon is showing.
- No ribbon on any other route.

## Out of scope

- PDF export/download of the whitepaper (read-online only, per user decision).
- Any backend beyond Formspree (no custom API route — not possible under static export anyway).
- Adding the whitepaper as a `posts.ts` entry / giving it a `/blog/[slug]` page.
- Analytics/tracking beyond what Formspree captures.
