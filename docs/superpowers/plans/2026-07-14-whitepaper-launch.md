# Whitepaper Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the "Manufacturing Context Layer" white paper on the site, gated behind an email-capture form, surfaced from the blog section, and promoted via a dismissible homepage ribbon.

**Architecture:** The raw whitepaper HTML is hosted as a static asset under `public/whitepapers/`. A new `/whitepaper` route shows a preview mockup and an email form; on successful submit (AJAX POST to Formspree) it reveals a link to the raw asset and remembers the unlock in `localStorage`. The blog page and a homepage ribbon both link to `/whitepaper` (never directly to the raw file), so the gate always applies. A preview "document mockup" component and a ribbon-visibility hook are shared across surfaces to keep behavior and visuals consistent.

**Tech Stack:** Next.js 16 App Router, `output: 'export'` (static export, no server/API routes), React 19, Tailwind, framer-motion, lucide-react icons, shadcn/ui (`Button`, `Input`, `Label`), Formspree (client-side form POST). Package manager is `pnpm` (see `pnpm-lock.yaml`).

## Global Constraints

- Static export only — no Next.js API routes, no server actions. All new interactive pages/components must be `"use client"`.
- Formspree endpoint: `https://formspree.io/f/xlgqdrnw` (already created by the user).
- The raw whitepaper file must be copied **verbatim** (no edits) to `public/whitepapers/manufacturing-context-layer.html` — it is fully self-contained (inline CSS, inline SVGs, its own Google Fonts link).
- The raw file is linked to **only** from the unlocked state of the `/whitepaper` gate page. No other page links to it directly.
- No PDF export — read-online only.
- No test framework is configured in this repo (no jest/vitest/playwright — `package.json` only has `build`/`dev`/`lint`/`start`). Verification for every task is: (a) `pnpm build` for type/build correctness, and (b) manual browser verification via `pnpm dev` for visual/behavioral correctness. Do not invent a test framework.
- Follow existing conventions from `app/blog/page.tsx` / `components/cta-band.tsx` for motion, spacing, and section-header patterns (small dot + `font-mono` index number + label).

---

### Task 1: Host the whitepaper source file

**Files:**
- Create: `public/whitepapers/manufacturing-context-layer.html`

**Interfaces:**
- Produces: a static asset reachable at path `/whitepapers/manufacturing-context-layer.html` once built/exported. This exact path string is consumed by Task 4 (`WHITEPAPER_URL` constant).

- [ ] **Step 1: Copy the source file verbatim**

```bash
mkdir -p public/whitepapers
cp "/Users/yuvraj/Downloads/contextweaver-whitepaper-v4.html" "public/whitepapers/manufacturing-context-layer.html"
```

- [ ] **Step 2: Verify the copy is byte-identical**

Run: `diff "/Users/yuvraj/Downloads/contextweaver-whitepaper-v4.html" "public/whitepapers/manufacturing-context-layer.html"`
Expected: no output (files identical).

- [ ] **Step 3: Verify it renders standalone**

Run: `open "public/whitepapers/manufacturing-context-layer.html"` (macOS) and confirm it opens in the browser with its own styling (paper background, teal accents, Space Grotesk headline, 7 numbered figures) — this file needs no build step, it's a plain static HTML document.

- [ ] **Step 4: Commit**

```bash
git add public/whitepapers/manufacturing-context-layer.html
git commit -m "Add Manufacturing Context Layer whitepaper as static asset"
```

---

### Task 2: Shared ribbon-visibility hook

**Files:**
- Create: `lib/use-whitepaper-ribbon.ts`

**Interfaces:**
- Produces:
  - `dismissWhitepaperRibbon(): void` — call on the ribbon's close-button click.
  - `useWhitepaperRibbonVisible(active: boolean): boolean` — call with `active = true` on any component that needs to know if the ribbon is currently shown. Returns `false` on the very first render (avoids SSR/hydration mismatch since `localStorage` isn't available at build time), then updates synchronously after mount and whenever `dismissWhitepaperRibbon()` is called anywhere in the app (via a custom `window` event), so multiple components (Navbar and the homepage hero) stay in sync without prop drilling.
- Consumed by: Task 7 (`components/navbar.tsx`, `active = pathname === "/"`) and Task 8 (`app/page.tsx`, `active = true`).

- [ ] **Step 1: Write the hook**

```ts
// lib/use-whitepaper-ribbon.ts
"use client"

import { useEffect, useState } from "react"

const DISMISSED_KEY = "cw_ribbon_dismissed"
const DISMISS_EVENT = "cw:ribbon-dismissed"

export function dismissWhitepaperRibbon() {
  window.localStorage.setItem(DISMISSED_KEY, "1")
  window.dispatchEvent(new Event(DISMISS_EVENT))
}

export function useWhitepaperRibbonVisible(active: boolean): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }

    const update = () => {
      setVisible(window.localStorage.getItem(DISMISSED_KEY) !== "1")
    }

    update()
    window.addEventListener(DISMISS_EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(DISMISS_EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [active])

  return visible
}
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: build succeeds (this file isn't imported anywhere yet, so it only needs to type-check cleanly — no unused-export errors are expected since `ignoreBuildErrors: true` is set in `next.config.mjs`, but confirm there's no syntax error in the terminal output).

- [ ] **Step 3: Commit**

```bash
git add lib/use-whitepaper-ribbon.ts
git commit -m "Add shared whitepaper ribbon visibility hook"
```

---

### Task 3: Whitepaper preview mockup component

**Files:**
- Create: `components/whitepaper-preview.tsx`

**Interfaces:**
- Produces: `WhitepaperPreview({ size, className }: { size?: "card" | "large"; className?: string })` — a React component, default export style matches other components in `components/` (named export, e.g. `export function WhitepaperPreview`).
- Consumed by: Task 5 (`app/whitepaper/page.tsx`, `size="large"`) and Task 6 (`app/blog/page.tsx`, `size="card"`).

- [ ] **Step 1: Write the component**

```tsx
// components/whitepaper-preview.tsx
import { cn } from "@/lib/utils"

interface WhitepaperPreviewProps {
  size?: "card" | "large"
  className?: string
}

const ABSTRACT_LINE_WIDTHS = [100, 92, 96, 70]

export function WhitepaperPreview({ size = "card", className }: WhitepaperPreviewProps) {
  const large = size === "large"

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-sm",
        large ? "aspect-[4/5] max-w-sm" : "aspect-[3/4]",
        className,
      )}
      style={{ background: "#FBFAF6", borderColor: "#DCDAD1", color: "#23252B" }}
    >
      <div className="absolute inset-0 flex flex-col p-5">
        <span
          className="font-mono uppercase tracking-[0.14em]"
          style={{ color: "#0E6B54", fontSize: large ? 11 : 9 }}
        >
          ContextWeaver · White paper
        </span>

        <h3
          className="mt-3 font-semibold leading-[1.08]"
          style={{
            fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
            fontSize: large ? 26 : 18,
            letterSpacing: "-0.01em",
          }}
        >
          The Manufacturing Context Layer
        </h3>

        <p
          className="mt-2 italic"
          style={{ color: "#4A4C52", fontSize: large ? 13 : 11, fontFamily: "Georgia, serif" }}
        >
          An architecture for governed, agent-ready operational context.
        </p>

        <div className="mt-4 flex-1 border bg-white" style={{ borderColor: "#23252B" }}>
          <span
            className="inline-block font-mono uppercase tracking-[0.16em]"
            style={{ background: "#23252B", color: "#FBFAF6", fontSize: 9, padding: "3px 10px" }}
          >
            Abstract
          </span>
          <div className="px-3 py-3 space-y-2">
            {ABSTRACT_LINE_WIDTHS.map((w, i) => (
              <span
                key={i}
                className="block h-[6px] rounded-full"
                style={{ width: `${w}%`, background: "#DCDAD1" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: build succeeds (component isn't imported anywhere yet).

- [ ] **Step 3: Commit**

```bash
git add components/whitepaper-preview.tsx
git commit -m "Add whitepaper document preview mockup component"
```

---

### Task 4: Whitepaper email-gate component

**Files:**
- Create: `components/whitepaper-gate.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`, `Input` from `@/components/ui/input`, `Label` from `@/components/ui/label` (all existing shadcn components, already used elsewhere in this repo).
- Produces: `WhitepaperGate()` — a React component with no props, self-contained state. Reads/writes `localStorage["cw_whitepaper_unlocked"]`. POSTs to `https://formspree.io/f/xlgqdrnw`.
- Consumed by: Task 5 (`app/whitepaper/page.tsx`).
- The unlocked-state CTA links to `/whitepapers/manufacturing-context-layer.html` — **this exact path must match** the file created in Task 1.

- [ ] **Step 1: Write the component**

```tsx
// components/whitepaper-gate.tsx
"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgqdrnw"
const UNLOCK_KEY = "cw_whitepaper_unlocked"
const WHITEPAPER_URL = "/whitepapers/manufacturing-context-layer.html"

type Status = "idle" | "submitting" | "error"

export function WhitepaperGate() {
  const [checkedStorage, setCheckedStorage] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === "1")
    setCheckedStorage(true)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, source: "whitepaper-gate" }),
      })
      if (!res.ok) throw new Error("Formspree request failed")
      window.localStorage.setItem(UNLOCK_KEY, "1")
      setUnlocked(true)
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  if (!checkedStorage) return null

  if (unlocked) {
    return (
      <Button size="lg" asChild className="btn-gradient rounded-full px-8 gap-2">
        <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer">
          Open the white paper
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <Label htmlFor="wp-email">Email *</Label>
        <Input
          id="wp-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="wp-name">Name</Label>
          <Input id="wp-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wp-company">Company</Label>
          <Input
            id="wp-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong — please try again.</p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="btn-gradient rounded-full w-full gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Get the white paper
            <ArrowUpRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/whitepaper-gate.tsx
git commit -m "Add whitepaper email-gate form component"
```

---

### Task 5: `/whitepaper` gate page

**Files:**
- Create: `app/whitepaper/page.tsx`

**Interfaces:**
- Consumes: `Navbar` (`@/components/navbar`), `Footer` (`@/components/footer`), `WhitepaperPreview` (Task 3), `WhitepaperGate` (Task 4).
- Produces: the route `/whitepaper`, linked to by Task 6 (blog section) and Task 7 (ribbon).

- [ ] **Step 1: Write the page**

```tsx
// app/whitepaper/page.tsx
"use client"

import { motion } from "framer-motion"
import { FileText, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhitepaperPreview } from "@/components/whitepaper-preview"
import { WhitepaperGate } from "@/components/whitepaper-gate"

const EASE = [0.22, 1, 0.36, 1] as const

export default function WhitepaperPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen pt-20"
      >
        <section className="py-16 lg:py-24 px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase mb-6">
                <FileText className="w-3.5 h-3.5" />
                White paper
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.05] mb-5">
                The Manufacturing Context Layer
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Manufacturers have spent a decade centralizing plant data in historians, data lakes, and
                warehouses, yet most industrial AI initiatives still fail to move from pilot to production.
                This paper argues the bottleneck is context, not connectivity or model capability — and lays
                out a reference architecture for a governed, agent-ready context layer built on ISA-95.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
                <ShieldCheck className="w-4 h-4 text-[var(--orange)] shrink-0" />
                Takes 10 seconds. We&apos;ll never share your email.
              </div>
              <WhitepaperGate />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="flex justify-center lg:justify-end"
            >
              <WhitepaperPreview size="large" />
            </motion.div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: build succeeds, and the export output includes `out/whitepaper.html` (or `out/whitepaper/index.html`) — check with `ls out/whitepaper*` after the build.

- [ ] **Step 3: Manual verification**

Run: `pnpm dev`, open `http://localhost:3000/whitepaper` in a browser.
Confirm:
- Page renders with Navbar/Footer, title, dek, preview mockup, and the email form.
- Submitting a real email in the form shows the "Sending…" state, then swaps to the "Open the white paper" button.
- Clicking "Open the white paper" opens `/whitepapers/manufacturing-context-layer.html` in a new tab and it renders the whitepaper's own styling.
- Reload the `/whitepaper` page — confirm the form is skipped and the "Open the white paper" button shows immediately (localStorage persisted).
- Open the Formspree dashboard (or the email tied to the account) and confirm the test submission arrived.

- [ ] **Step 4: Commit**

```bash
git add app/whitepaper/page.tsx
git commit -m "Add gated /whitepaper reading page"
```

---

### Task 6: Blog section entry

**Files:**
- Modify: `app/blog/page.tsx:181-203` (the `{/* ── More coming ── */}` section)

**Interfaces:**
- Consumes: `WhitepaperPreview` (Task 3, `size="card"`).
- Links to `/whitepaper` (Task 5's route).

- [ ] **Step 1: Add the new imports**

In `app/blog/page.tsx`, the current import block is:

```tsx
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Clock, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABand } from "@/components/cta-band"
import { getSeriesParts } from "./posts"
```

Change it to:

```tsx
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Clock, FileText, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABand } from "@/components/cta-band"
import { WhitepaperPreview } from "@/components/whitepaper-preview"
import { getSeriesParts } from "./posts"
```

- [ ] **Step 2: Replace the "More coming" section with a whitepaper section + renumbered "More coming" section**

Find this exact block (currently lines 181-203):

```tsx
        {/* ── More coming ── */}
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span className="font-mono tabular-nums">02</span>
              <span className="w-6 h-px bg-border" />
              <span>More</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-dashed border-border bg-secondary/20 px-8 py-10 text-center"
            >
              <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                More field notes are in the works: deep dives on semantic layers, SLM fine-tuning, and
                cross-stack RCA. Check back soon.
              </p>
            </motion.div>
          </div>
        </section>
```

Replace it with:

```tsx
        {/* ── White paper ── */}
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span className="font-mono tabular-nums">02</span>
              <span className="w-6 h-px bg-border" />
              <span>White paper</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 lg:gap-16 items-center rounded-3xl border border-border bg-secondary/20 p-8 lg:p-12"
            >
              <WhitepaperPreview size="card" className="max-w-xs mx-auto lg:mx-0" />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase mb-6">
                  <FileText className="w-3.5 h-3.5" />
                  White paper
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.08] mb-4">
                  The Manufacturing Context Layer
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-md mb-6">
                  Manufacturers have spent a decade centralizing plant data — but the bottleneck to
                  production AI isn&apos;t connectivity or storage. It&apos;s context. A reference
                  architecture for governed, agent-ready operational context: connectors, an ISA-95
                  knowledge graph, and governed agents.
                </p>
                <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider mb-8">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />7 figures
                  </span>
                  <span className="w-4 h-px bg-border" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    ~20 min read
                  </span>
                </div>
                <Link
                  href="/whitepaper"
                  className="group inline-flex items-stretch rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors overflow-hidden"
                >
                  <span className="inline-flex items-center px-6 py-3 text-sm font-semibold">
                    Read the white paper
                  </span>
                  <span className="inline-flex items-center justify-center w-11 my-1 mr-1 rounded-full bg-[var(--orange)] text-[var(--orange-foreground)]">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── More coming ── */}
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span className="font-mono tabular-nums">03</span>
              <span className="w-6 h-px bg-border" />
              <span>More</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-dashed border-border bg-secondary/20 px-8 py-10 text-center"
            >
              <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                More field notes are in the works: deep dives on semantic layers, SLM fine-tuning, and
                cross-stack RCA. Check back soon.
              </p>
            </motion.div>
          </div>
        </section>
```

- [ ] **Step 3: Verify it builds**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification**

Run: `pnpm dev`, open `http://localhost:3000/blog`.
Confirm: a new "02 — White paper" section appears between "Featured series" and "03 — More", showing the preview mockup, title, dek, "7 figures · ~20 min read", and a "Read the white paper" button that navigates to `/whitepaper`.

- [ ] **Step 5: Commit**

```bash
git add app/blog/page.tsx
git commit -m "Add whitepaper section to blog page"
```

---

### Task 7: Homepage ribbon in Navbar

**Files:**
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: `useWhitepaperRibbonVisible`, `dismissWhitepaperRibbon` from `@/lib/use-whitepaper-ribbon` (Task 2).
- Produces: a ribbon rendered only when `pathname === "/"`, `h-10` (40px) tall when visible. Task 8 relies on this exact height to size the homepage hero's compensating padding.

- [ ] **Step 1: Add imports**

Change:

```tsx
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WovenOrb } from "@/components/woven-orb"
import { cn } from "@/lib/utils"
```

to:

```tsx
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WovenOrb } from "@/components/woven-orb"
import { cn } from "@/lib/utils"
import { useWhitepaperRibbonVisible, dismissWhitepaperRibbon } from "@/lib/use-whitepaper-ribbon"
```

- [ ] **Step 2: Compute ribbon visibility in the component**

Change:

```tsx
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
```

to:

```tsx
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const showRibbon = useWhitepaperRibbonVisible(pathname === "/")

  const isActive = (href: string) =>
```

- [ ] **Step 3: Render the ribbon inside the fixed header, above the nav row**

Change:

```tsx
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

to:

```tsx
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent",
      )}
    >
      {showRibbon && (
        <div className="relative h-10 flex items-center justify-center bg-foreground text-background px-10 text-xs sm:text-sm font-medium">
          <Link href="/whitepaper" className="group inline-flex items-center gap-1.5 hover:underline underline-offset-2">
            <span className="hidden sm:inline">New —</span>
            <span>Read our white paper: The Manufacturing Context Layer</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => dismissWhitepaperRibbon()}
            className="absolute right-3 sm:right-4 inline-flex p-1 text-background/70 hover:text-background transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

- [ ] **Step 4: Verify it builds**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Manual verification**

Run: `pnpm dev`, open `http://localhost:3000/`.
Confirm:
- The ribbon appears above the nav row on the homepage.
- Navigate to `/about` (or any other page) — confirm the ribbon does NOT appear there.
- Click the ribbon text — confirm it navigates to `/whitepaper`.
- Go back to `/`, click the `×` — confirm the ribbon disappears and the nav row moves back up to the top.
- Reload `/` — confirm the ribbon stays dismissed (persisted via `localStorage`).
- Clear `localStorage` (or open dev tools → Application → clear `cw_ribbon_dismissed`) and reload `/` — confirm the ribbon reappears.

- [ ] **Step 6: Commit**

```bash
git add components/navbar.tsx
git commit -m "Add dismissible whitepaper announcement ribbon to homepage navbar"
```

---

### Task 8: Homepage hero padding compensation

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `useWhitepaperRibbonVisible` from `@/lib/use-whitepaper-ribbon` (Task 2), with `active = true` (this file only renders on `/`).
- Depends on the ribbon being exactly `h-10` (40px) as built in Task 7 — the padding bump below is sized to match.

- [ ] **Step 1: Add the import**

Find the import block starting with `import Link from "next/link"` near the top of `app/page.tsx` and add, alongside the other `@/components/...`/`@/lib/...` imports:

```tsx
import { useWhitepaperRibbonVisible } from "@/lib/use-whitepaper-ribbon"
```

- [ ] **Step 2: Compute ribbon visibility inside the page component**

Find:

```tsx
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Navbar />
```

Change to:

```tsx
  const currentYear = new Date().getFullYear()
  const showRibbon = useWhitepaperRibbonVisible(true)

  return (
    <>
      <Navbar />
```

- [ ] **Step 3: Make the hero section's top padding conditional**

Find:

```tsx
        {/* ── Hero ── */}
        <section className="relative py-16 lg:py-20 px-4 border-b border-border/50 overflow-hidden">
```

Change to:

```tsx
        {/* ── Hero ── */}
        <section
          className={cn(
            "relative px-4 border-b border-border/50 overflow-hidden transition-[padding] duration-300",
            showRibbon ? "pt-[104px] pb-16 lg:pt-[120px] lg:pb-20" : "py-16 lg:py-20",
          )}
        >
```

- [ ] **Step 4: Import `cn` if not already imported**

Check the top of `app/page.tsx` for an existing `import { cn } from "@/lib/utils"`. If it is not already present, add it next to the other imports:

```tsx
import { cn } from "@/lib/utils"
```

- [ ] **Step 5: Verify it builds**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 6: Manual verification**

Run: `pnpm dev`, open `http://localhost:3000/`.
Confirm: with the ribbon visible, the hero's top content (the "PLANT.FLOOR / BOARD.ROOM" eyebrow row) is fully visible below the ribbon+nav, not clipped or overlapped. Dismiss the ribbon (click `×`) and confirm the hero's top padding shrinks back down smoothly with no layout jump/flash of overlapping content.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "Adjust homepage hero padding when whitepaper ribbon is visible"
```

---

### Task 9: End-to-end verification

**Files:** none (verification only).

- [ ] **Step 1: Full production build**

Run: `pnpm build`
Expected: build completes with no errors, and `out/` contains `whitepaper.html` (or `out/whitepaper/index.html`), `blog.html`, and the copied `out/whitepapers/manufacturing-context-layer.html`.

Run: `ls out/whitepapers/manufacturing-context-layer.html out/whitepaper* out/blog.html`
Expected: all three paths exist.

- [ ] **Step 2: Full manual walkthrough**

Run: `pnpm dev` and, in a browser:
1. Visit `/` — see the dismissible ribbon; click through to `/whitepaper`.
2. On `/whitepaper`, submit the email form with a real test address — confirm the success state appears and clicking "Open the white paper" opens the raw whitepaper HTML in a new tab, correctly styled.
3. Visit `/blog` — confirm the new white paper section renders correctly and its CTA also lands on `/whitepaper` (and, since already unlocked from step 2, shows the "Open the white paper" button immediately, no form).
4. Check the Formspree dashboard for the test submission from step 2.
5. Resize the browser to a mobile width (~375px) and re-check all three surfaces (ribbon, gate page, blog card) for layout issues.

- [ ] **Step 3: Lint check**

Run: `pnpm lint`
Expected: no new errors introduced by the changes in this plan (pre-existing unrelated lint issues, if any, are out of scope).
