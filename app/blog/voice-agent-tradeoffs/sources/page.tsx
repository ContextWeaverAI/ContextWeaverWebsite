"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { citationsHtml } from "./citations-html"

const EASE = [0.22, 1, 0.36, 1] as const

const LEGEND = [
  { key: "verified", label: "verified", desc: "Third-party or vendor confirmed, replicated in search" },
  { key: "vendor", label: "vendor", desc: "Vendor self-reported, not independently replicated" },
  { key: "derived", label: "derived", desc: "Calculated from cited values (a math step)" },
  { key: "unrep", label: "flagged", desc: "Vendor claim with no third-party replication" },
  { key: "narrative", label: "narrative", desc: "Illustrative scene, no specific claim" },
]

export default function SourcesPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen pt-20"
      >
        {/* ── Hero ── */}
        <section className="py-16 lg:py-20 px-4 border-b border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <Link
                href="/blog/voice-agent-tradeoffs-part-1"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to the series
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Citations audit
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tighter leading-[1.05] mb-5">
              Sources &amp; citations
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Every numerical or factual claim in <em>The Voice Agent Tradeoff Triangle</em> series, traced
              to a verifiable public source with a capture date. The blog is defensible only if this document
              is.
            </p>

            {/* Meta strip */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider mb-8 pb-8 border-b border-border/60">
              <span>
                <span className="text-foreground font-semibold">CAPTURED</span> 2026-05-24
              </span>
              <span>
                <span className="text-foreground font-semibold">SOURCES</span> 56 URLs · 9 charts
              </span>
              <span>
                <span className="text-foreground font-semibold">METHOD</span> web search + vendor docs + Artificial Analysis cross-check
              </span>
            </div>

            {/* Legend */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {LEGEND.map((l) => (
                <div key={l.key} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className={`cite-badge cite-badge-${l.key} mt-0.5`}>{l.label}</span>
                  <span className="leading-snug">{l.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audit body ── */}
        <section className="py-14 lg:py-16 px-4">
          <div
            className="citations-prose max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: citationsHtml }}
          />

          <p className="max-w-4xl mx-auto mt-14 pt-8 border-t border-border text-sm text-muted-foreground leading-relaxed">
            This audit verifies every numerical or factual claim in the series against publicly accessible
            sources captured 2026-05-24. If you spot a citation that no longer loads or a number that has
            shifted since capture, let us know — the charts regenerate from source data.
          </p>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
