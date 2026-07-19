# Deferred: make `getcontextweaver.com` the canonical brand domain

**Status:** not started — canonical is currently `https://www.contextweaver.info`.
**Why deferred:** `.info` works today with zero infra change (it's the domain bound
to GitHub Pages via `public/CNAME`). Moving to `.com` requires DNS + registrar work
that is separate from the code.

## Background — why we're on `.info`, not `.com`

`getcontextweaver.com` today is **only a root-domain forward** at the registrar. It
301-redirects the bare homepage to `www.contextweaver.info` but 404s on every deep
path and file:

```
www.getcontextweaver.com/                  → 301 → www.contextweaver.info/   (200)
www.getcontextweaver.com/contextweaver.png → 404   (no redirect)
www.getcontextweaver.com/blog/historian    → 404   (no redirect)
getcontextweaver.com  (apex)               → 405   (HEAD), 301 root-only (GET)
```

So it can't serve `og:image` or per-post URLs — pointing metadata at it is exactly
what broke link previews (fixed in the "repair link previews" commit by pointing
everything at `www.contextweaver.info`).

The email address `yuvraj@getcontextweaver.com` is unaffected — email/MX is
independent of web hosting. Leave the Bluestar legal-page emails as-is.

## What "make .com real" requires

### 1. DNS / registrar (the actual blocker — do this first)
- Remove the root-forward rule for `getcontextweaver.com` at the registrar.
- Point the site host at GitHub Pages:
  - `www.getcontextweaver.com` → **CNAME** → `contextweaverai.github.io`
  - apex `getcontextweaver.com` → GitHub Pages **A/AAAA** records
    (`185.199.108–111.153` and the IPv6 equivalents), or an ALIAS/ANAME to
    `contextweaverai.github.io` if the registrar supports it.
- Decide apex-vs-www canonical and 301 the other to it (pick `www` to match the
  current `.info` setup).

### 2. GitHub Pages custom domain
- Repo **Settings → Pages → Custom domain** → `www.getcontextweaver.com`.
- Update `public/CNAME` from `www.contextweaver.info` to `www.getcontextweaver.com`
  (this file is what Pages reads on each deploy).
- Wait for GitHub's TLS cert to provision (can take up to ~1h). Enable
  "Enforce HTTPS".
- Verify `https://www.getcontextweaver.com/contextweaver.png` returns `200 image/png`
  before touching any metadata.

### 3. Code — the easy part (one line, thanks to the SEO refactor)
- `lib/site.ts` → change `SITE_URL` to `https://www.getcontextweaver.com`.
  That's the single source of truth; `layout.tsx`, every blog post, `sitemap.ts`,
  and `robots.ts` all import it. **No other code change needed.**
- Rebuild and confirm `out/` has no stray `contextweaver.info` in `og:*`/canonical:
  `grep -rl 'contextweaver.info' out/` should return nothing except intended refs.

### 4. Keep `.info` working (don't strand old links)
- Leave `contextweaver.info` registered and 301-redirect it (all paths) to
  `www.getcontextweaver.com` so already-shared `.info` links keep resolving.
- Set up the same forward for the bare `getcontextweaver.com` apex → `www`.

### 5. Post-cutover
- Google Search Console: add `www.getcontextweaver.com` as a property, submit
  `https://www.getcontextweaver.com/sitemap.xml`, and use "Change of address" from
  the `.info` property so ranking/indexing transfers.
- Re-scrape social caches: LinkedIn [Post Inspector](https://www.linkedin.com/post-inspector/)
  per URL; WhatsApp clears on its own in a few days (a `?v=` query param forces a
  fresh fetch to test).
- Update any hardcoded `.info` links in outreach material, email signatures, and
  LinkedIn/company profiles.

## Rollback
Revert `SITE_URL` in `lib/site.ts` to `https://www.contextweaver.info` and restore
`public/CNAME` — since `.info` stays registered and Pages-bound, rollback is a
one-line + one-file change plus the Pages custom-domain setting.
