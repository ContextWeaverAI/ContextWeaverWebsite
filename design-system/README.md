# ContextWeaver Design System

Extracted from the ContextWeaver marketing site. Aesthetic: **industrial minimalism** —
a warm off-white canvas, charcoal ink, a monochrome primary, and a single amber CTA accent,
all expressed in OKLCH with a full dark-mode variant.

## Principles

1. **Warm-neutral, not stark.** Off-white surfaces (`oklch(0.975 0.004 80)`), never pure white.
2. **One accent, earned.** Amber (`--orange` / `--accent-cta`) is reserved for conversion and
   emphasis — links, section numbers, list markers, primary CTAs. Everything else is grayscale.
3. **The page is a blueprint.** A fixed engineering grid, dot lattice, warm radial glow, and a
   faint noise grain sit behind all content.
4. **Generous radius.** 1rem base softens the technical grid; pills for nav and buttons.
5. **Outfit everywhere**, with tight negative tracking on headings and tabular-nums monospace
   for numbers, counters, and metadata.
6. **Restrained motion.** Lift-on-hover, pulse signals, gentle float, drawn lines, shimmer on CTAs.

## Structure

```
design-system/
├── tokens.css              # the source-of-truth CSS variables (light + dark)
├── brand/
│   ├── logo.html           # brand card: mark, lockup, app icon, colors, clearspace
│   ├── woven-orb.svg       # reusable mark — strands use currentColor (light/dark adaptive)
│   └── icon.svg            # app icon / favicon (rounded field, fixed colors)
├── foundations/
│   ├── colors.html         # OKLCH palette
│   ├── typography.html     # Outfit type scale
│   ├── radius-spacing.html  # radius scale + 4px spacing rhythm
│   └── backgrounds.html    # grid / dots / glow / noise
├── components/
│   ├── buttons.html        # gradient, amber CTA, secondary, outline, ghost, link
│   ├── badges.html         # badges + pulsing status pill
│   ├── cards.html          # hover-lift & gradient-glow cards
│   ├── navbar.html         # sticky glass pill-nav
│   ├── prose.html          # blog / long-form article typography
│   └── citation-badges.html # semantic evidence tags
└── effects/
    └── motion.html         # shimmer, pulse, float, border-beam, draw-line, marquee
```

Each HTML file is a self-contained preview card carrying a first-line `@dsCard` marker, so it
renders directly in the Claude Design System pane. Consume the tokens in code via `tokens.css`.
