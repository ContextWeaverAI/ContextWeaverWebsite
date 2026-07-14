"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, BarChart3, FileText, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABand } from "@/components/cta-band"
import { type BlogPost, getSeriesParts, getSeriesNeighbors } from "@/app/blog/posts"

const EASE = [0.22, 1, 0.36, 1] as const

export function BlogArticle({ post, html }: { post: BlogPost; html: string }) {
  const series = post.series
  const parts = series ? getSeriesParts(series.id) : []
  const { prev, next } = getSeriesNeighbors(post.slug)

  // CTA is themed per post: the voice series keeps its voice pitch; everything
  // else (the Smart Factory series, standalone posts) gets the context-layer pitch.
  const cta =
    series?.id === "voice-agent-tradeoffs"
      ? {
          title: "Want a tour of a production voice agent?",
          description:
            "ContextWeaver builds production voice agents for Indian manufacturing: work orders, preventive maintenance, voice intake, WhatsApp escalation. If you want a deep-engineering walkthrough, talk to us.",
        }
      : {
          title: "Your plant moves the data. What understands it?",
          description:
            "ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of your plant — its assets, its history, its documents, and the tribal knowledge in between — that AI agents can actually reason over. If your UNS moves the data but nothing on the other end understands it, talk to us.",
        }

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen pt-20"
      >
        {/* ── Article hero ── */}
        <section className="py-10 lg:py-14 px-4 border-b border-border/50">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All posts
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="flex flex-wrap items-center gap-3 mb-7"
            >
              <span className="inline-flex items-center rounded-full bg-[var(--orange)]/10 text-[var(--orange)] px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                {post.category}
              </span>
              {series && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  Part {series.part}
                  {parts.length > 1 ? ` of ${parts.length}` : ""}
                </span>
              )}
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider">
                {post.dateLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter leading-[1.04] mb-5"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-lg lg:text-xl text-muted-foreground font-medium tracking-tight mb-6"
            >
              {post.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed border-l-2 border-[var(--orange)]/40 pl-5 italic mb-9"
            >
              {post.dek}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider border-t border-border/60"
            >
              <span className="pt-5">By {post.author}</span>
              <span className="pt-5 inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              {post.charts && (
                <span className="pt-5 inline-flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  {post.charts}
                </span>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Series progress ── */}
        {series && parts.length > 1 && (
          <section className="px-4 py-8 border-b border-border/50 bg-secondary/20">
            <div className="max-w-3xl mx-auto">
              <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                {series.name} · A {parts.length}-part series
              </p>
              <ol className="grid gap-px bg-border rounded-xl overflow-hidden border border-border sm:grid-cols-3">
                {parts.map((p) => {
                  const active = p.slug === post.slug
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={
                          "flex h-full flex-col gap-1.5 p-4 transition-colors " +
                          (active
                            ? "bg-background"
                            : "bg-background/40 hover:bg-background")
                        }
                      >
                        <span className="flex items-center gap-2 text-[11px] font-mono tabular-nums tracking-wider">
                          <span
                            className={
                              "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold " +
                              (active
                                ? "bg-[var(--orange)] text-[var(--orange-foreground)]"
                                : "bg-secondary text-muted-foreground")
                            }
                          >
                            {p.series!.part}
                          </span>
                          <span className={active ? "text-[var(--orange)]" : "text-muted-foreground"}>
                            {active ? "You are here" : `Part ${p.series!.part}`}
                          </span>
                        </span>
                        <span
                          className={
                            "text-sm font-semibold leading-snug tracking-tight " +
                            (active ? "text-foreground" : "text-muted-foreground")
                          }
                        >
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )}

        {/* ── Article body ── */}
        <section className="py-10 lg:py-14 px-4">
          <div className="blog-surface max-w-3xl mx-auto px-5 py-8 sm:px-9 sm:py-11 lg:px-12 lg:py-14">
            <article className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          {/* Sources / citations — voice series only (it has a dedicated sources page) */}
          {series?.id === "voice-agent-tradeoffs" && (
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-border">
            <Link
              href="/blog/voice-agent-tradeoffs/sources"
              className="group block rounded-2xl border border-border bg-secondary/30 p-7 lg:p-8 hover:border-foreground/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center border border-border">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      Sources &amp; citations
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-4">
                    Every claim in the series traced to a public source. A section-by-section audit,
                    per-chart citations, known caveats, and a full index of every URL cited.
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
                    <span className="cite-badge cite-badge-verified">verified</span>
                    <span className="cite-badge cite-badge-vendor">vendor</span>
                    <span className="cite-badge cite-badge-derived">derived</span>
                    <span className="cite-badge cite-badge-unrep">flagged</span>
                    <span className="font-mono tabular-nums text-muted-foreground tracking-wider">
                      56 sources · 9 charts
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          )}

          {/* Prev / next within series */}
          {(prev || next) && (
            <nav className="max-w-3xl mx-auto mt-8 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-6 hover:border-foreground/30 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tabular-nums text-muted-foreground tracking-wider">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Part {prev.series!.part} · Previous
                  </span>
                  <span className="text-base font-bold tracking-tight text-foreground leading-snug">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-6 text-right hover:border-foreground/30 transition-colors sm:col-start-2"
                >
                  <span className="inline-flex items-center justify-end gap-1.5 text-[11px] font-mono tabular-nums text-muted-foreground tracking-wider">
                    Part {next.series!.part} · Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-base font-bold tracking-tight text-foreground leading-snug">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </section>

        <CTABand title={cta.title} description={cta.description} />
      </motion.main>
      <Footer />
    </>
  )
}
