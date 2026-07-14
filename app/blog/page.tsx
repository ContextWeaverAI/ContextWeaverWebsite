"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Clock, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABand } from "@/components/cta-band"
import { getSeriesParts, getFieldNotePosts } from "./posts"

const EASE = [0.22, 1, 0.36, 1] as const

const SERIES_DEK =
  "A production-engineering view, and a CTO procurement view, of what it actually takes to ship a voice agent in 2026. The four-way tradeoff between cost, latency, language, and intelligence, in three parts. Every number cited."

export default function BlogPage() {
  const currentYear = new Date().getFullYear()
  const parts = getSeriesParts("voice-agent-tradeoffs")
  const series = parts[0]?.series
  const cover = parts[parts.length - 1]?.cover // four-axis radar
  const notes = getFieldNotePosts()

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
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-4 mb-8 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider"
            >
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--orange)]" />
                BLOG / FIELD NOTES
              </span>
              <span className="w-4 h-px bg-border" />
              <span>// {currentYear}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tighter mb-8 leading-[1.03] max-w-4xl"
            >
              Notes from
              <br />
              <span className="text-muted-foreground">the shop floor and</span>
              <br />
              <span className="text-[var(--orange)]">the production stack.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              Deep engineering write-ups on building agentic infrastructure for manufacturing: voice
              agents, semantic layers, model economics, and the tradeoffs nobody markets honestly. Every
              number cited.
            </motion.p>
          </div>
        </section>

        {/* ── Featured series ── */}
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span className="font-mono tabular-nums">01</span>
              <span className="w-6 h-px bg-border" />
              <span>Latest series</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid lg:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden border border-border"
            >
              {/* Left — series intro + cover */}
              <div className="relative bg-secondary/40 p-8 lg:p-12 flex flex-col justify-between gap-10 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
                    backgroundSize: "18px 18px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase mb-6">
                    <Layers className="w-3.5 h-3.5" />
                    {series?.total}-part series
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.08] mb-4">
                    {series?.name}
                  </h2>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-md">
                    {SERIES_DEK}
                  </p>
                </div>
                {cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt="" className="relative w-full max-w-sm mx-auto drop-shadow-sm" />
                )}
              </div>

              {/* Right — the parts */}
              <ol className="bg-background flex flex-col divide-y divide-border">
                {parts.map((p) => (
                  <li key={p.slug} className="flex-1">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full items-start gap-5 p-7 lg:p-8 hover:bg-secondary/40 transition-colors duration-300"
                    >
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-semibold text-foreground tabular-nums group-hover:bg-[var(--orange)] group-hover:text-[var(--orange-foreground)] group-hover:border-transparent transition-colors">
                        {p.series!.part}
                      </span>
                      <span className="flex-1">
                        <span className="block text-lg lg:text-xl font-bold tracking-tight text-foreground leading-snug mb-1.5">
                          {p.title}
                        </span>
                        <span className="block text-sm text-muted-foreground leading-relaxed mb-3">
                          {p.dek}
                        </span>
                        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {p.readingTime}
                          </span>
                          <span>{p.wordCount}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="mt-1 w-5 h-5 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ol>

              {/* Author byline — bottom of the card */}
              <div className="lg:col-span-2 bg-background flex justify-end px-7 lg:px-8 py-4">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                  Written by Aditya Kasaudhan &amp; Yuvraj S Bhadauria
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 flex justify-center"
            >
              <Link
                href={`/blog/${parts[0]?.slug}`}
                className="group inline-flex items-stretch rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors overflow-hidden"
              >
                <span className="inline-flex items-center px-6 py-3 text-sm font-semibold">
                  Start with Part 1
                </span>
                <span className="inline-flex items-center justify-center w-11 my-1 mr-1 rounded-full bg-[var(--orange)] text-[var(--orange-foreground)]">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Standalone field notes ── */}
        <section className="py-12 lg:py-16 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span className="font-mono tabular-nums">02</span>
              <span className="w-6 h-px bg-border" />
              <span>Field notes</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {notes.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                >
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-background p-7 lg:p-8 hover:border-foreground/30 hover:bg-secondary/40 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex items-center rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                        {p.category}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                        {p.dateLabel}
                      </span>
                    </div>
                    {p.series && (
                      <span className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-[var(--orange)] tracking-wider">
                        <Layers className="w-3 h-3" />
                        {p.series.name} · Part {p.series.part}
                      </span>
                    )}
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-snug mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {p.dek}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {p.readingTime}
                        </span>
                        <span>{p.wordCount}</span>
                      </span>
                      <ArrowUpRight className="w-5 h-5 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABand
          title="Building voice agents for the floor?"
          description="If you want a deep-engineering tour of a production voice agent running in Indian manufacturing, from work orders to preventive maintenance to WhatsApp escalation, talk to us."
        />
      </motion.main>
      <Footer />
    </>
  )
}
