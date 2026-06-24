// ContextWeaver brand mark — the "woven orb" with an orange intelligence core.
// 12 equal circles whose centres ride a small ring around the centre; their
// outlines never enter the inner zone, leaving a clean hole for the core.
// Strands use currentColor so the mark adapts to light/dark surfaces.

const ORANGE = "oklch(0.62 0.21 35)"
const CX = 320
const CY = 320
const E = 66
const R = 150
const N = 12
const ACCENT = new Set([3, 9])

const circles = Array.from({ length: N }, (_, i) => {
  const th = (i * 2 * Math.PI) / N
  return {
    cx: +(CX + E * Math.cos(th)).toFixed(2),
    cy: +(CY + E * Math.sin(th)).toFixed(2),
    accent: ACCENT.has(i),
  }
})

export function WovenOrb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="96 96 448 448" fill="none" aria-hidden="true">
      {circles.map((c, i) =>
        c.accent ? (
          <circle key={i} cx={c.cx} cy={c.cy} r={R} stroke={ORANGE} strokeWidth={14} opacity={0.95} />
        ) : (
          <circle key={i} cx={c.cx} cy={c.cy} r={R} stroke="currentColor" strokeWidth={9} opacity={0.8} />
        ),
      )}
      <circle cx={CX} cy={CY} r={40} fill={ORANGE} />
      <circle cx={CX - 12} cy={CY - 12} r={11} fill="oklch(0.8 0.12 50)" opacity={0.85} />
    </svg>
  )
}
