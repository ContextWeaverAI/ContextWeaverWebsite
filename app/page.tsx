"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import {
  ArrowUpRight,
  Cpu,
  Factory,
  Building2,
  Layers,
  Sparkles,
  Lock,
  Cog,
  GraduationCap,
  Users,
  BrainCircuit,
  Network,
  Workflow,
  Plus,
  MapPin,
  Quote,
  TrendingUp,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABand } from "@/components/cta-band"
import { HeroStackDiagram } from "@/components/hero-stack-diagram"
import { AgentsAtWorkDashboard } from "@/components/agents-at-work-dashboard"
import { LLMModelDiagram } from "@/components/llm-model-diagram"
import { useWhitepaperRibbonVisible } from "@/lib/use-whitepaper-ribbon"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// Agent catalog grouped by stack layer
const agentLayers = [
  {
    key: "scada",
    label: "SCADA / Historians",
    icon: Cpu,
    index: "L1",
    blurb: "Agents that live on top of your sensors and historians — where the raw signal lives.",
    agents: [
      { name: "Sensor Cleanse", line: "Removes noise, fills gaps, normalizes units" },
      { name: "Alarm Rationalizer", line: "Cuts floods, groups correlated events, proposes suppression" },
      { name: "Asset Health", line: "Vibration, temp, current trends → remaining useful life" },
    ],
  },
  {
    key: "mes",
    label: "MES",
    icon: Factory,
    index: "L2",
    blurb: "Agents on the execution layer — where work orders, batches, and production intelligence live.",
    agents: [
      { name: "OEE Analytics", line: "Availability / performance / quality loss waterfall by shift" },
      { name: "Quality Deviation", line: "In-line + lab correlation, CAPA drafts with evidence" },
      { name: "Scheduling", line: "Changeover-aware schedule rebalancing on disruption" },
    ],
  },
  {
    key: "erp",
    label: "ERP / CRM",
    icon: Building2,
    index: "L3",
    blurb: "Agents that reason over orders, inventory, margin, and customer signals.",
    agents: [
      { name: "Order Intelligence", line: "Order-to-fulfil risk, promise date confidence" },
      { name: "Margin Agent", line: "Per-SKU margin attribution, drift detection" },
      { name: "Inventory Agent", line: "Coverage vs. demand, stockout early warning" },
    ],
  },
  {
    key: "cross",
    label: "Cross-stack",
    icon: Layers,
    index: "L∞",
    blurb: "Agents that draw context from every layer below to reason end-to-end.",
    agents: [
      { name: "Root Cause Agent", line: "SCADA + MES + ERP: traces incidents to process or supply cause" },
      { name: "Demand-to-Production", line: "ERP + MES: short-horizon plan updates as demand shifts" },
      { name: "Compliance Agent", line: "All layers: audit trails, evidence packs, deviation flags" },
    ],
  },
]

const outcomes = [
  {
    title: "Alarm flood rationalization",
    metric: "-62%",
    metricLabel: "Nuisance alarms",
    description: "Identified 400+ chattering alarms and generated suppression logic in one review cycle on the SCADA layer.",
  },
  {
    title: "Downtime investigation",
    metric: "-78%",
    metricLabel: "RCA time",
    description: "Cross-stack RCA agent reduced multi-team investigations from 6 hours to under 10 minutes.",
  },
  {
    title: "Order-to-fulfil confidence",
    metric: "+18pp",
    metricLabel: "Promise-date accuracy",
    description: "ERP agents reconciled with MES in real time, catching at-risk orders one shift earlier.",
  },
  {
    title: "Packaging OEE uplift",
    metric: "+4.2pp",
    metricLabel: "OEE points",
    description: "Speed-loss attribution on the MES layer pointed to one upstream feeder; fix moved OEE from 82.1% to 86.3%.",
  },
  {
    title: "Per-query cost",
    metric: "$0",
    metricLabel: "On SLM inference",
    description: "Fine-tuned small language models remove per-token cost; ROI curves stop flattening at scale.",
  },
]

const trustPoints = [
  "All models fine-tuned and hosted on your infra — data never leaves",
  "Read-only source connections — no migration, no writes",
  "On-prem, VPC, or SaaS deployment options",
  "SOC 2 aligned controls, role-based access, audit logging",
  "Native connectors for PI, Ignition, Wonderware, Rockwell, SAP, Dynamics",
  "Deploys in days, not quarters",
]

const slmPillars = [
  {
    icon: Lock,
    title: "Private by default",
    description: "SLMs fine-tuned and served on your infrastructure. No data leaves the plant, VPC, or region.",
  },
  {
    icon: BrainCircuit,
    title: "No per-token bill",
    description: "Inference cost is CPU/GPU cycles, not API calls. Agent chatter at scale stops being a line item.",
  },
  {
    icon: Cog,
    title: "Tuned on your data",
    description: "Your tag naming, your shift language, your SOPs. The model learns the vocabulary of your plant.",
  },
]

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
      <span className="font-mono tabular-nums">{index}</span>
      <span className="w-6 h-px bg-border" />
      <span>{children}</span>
    </div>
  )
}

function AgentCatalogTabs({ isInView }: { isInView: boolean }) {
  const [active, setActive] = useState(0)
  const current = agentLayers[active]
  const ActiveIcon = current.icon

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.7, ease: EASE }}
      className="space-y-8"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {agentLayers.map((layer, i) => {
          const Icon = layer.icon
          const isActive = active === i
          return (
            <button
              key={layer.key}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-foreground text-background border border-foreground"
                  : "bg-transparent text-muted-foreground border border-border hover:text-foreground hover:border-foreground/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              {layer.label}
              <span className="text-[10px] font-mono tabular-nums opacity-60">{layer.index}</span>
            </button>
          )
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="rounded-2xl border border-border bg-card p-8 lg:p-12"
      >
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
          <div>
            <div className="w-12 h-12 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center mb-5 border border-border">
              <ActiveIcon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-mono tabular-nums text-muted-foreground tracking-widest mb-2">
              / {current.index}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {current.label}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">{current.blurb}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {current.agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
                className="flex items-start gap-5 py-5"
              >
                <span className="text-[11px] font-mono tabular-nums text-muted-foreground tracking-wider w-8 pt-1">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground mb-1">{agent.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.line}</p>
                </div>
                <Plus className="w-3.5 h-3.5 text-muted-foreground mt-2 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HomePage() {
  const diagramRef = useRef(null)
  const catalogRef = useRef(null)
  const slmRef = useRef(null)
  const enableRef = useRef(null)
  const outcomesRef = useRef(null)
  const trustRef = useRef(null)

  const diagramInView = useInView(diagramRef, { once: true, margin: "-100px" })
  const catalogInView = useInView(catalogRef, { once: true, margin: "-100px" })
  const slmInView = useInView(slmRef, { once: true, margin: "-100px" })
  const enableInView = useInView(enableRef, { once: true, margin: "-100px" })
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-100px" })
  const trustInView = useInView(trustRef, { once: true, margin: "-100px" })

  const currentYear = new Date().getFullYear()
  const showRibbon = useWhitepaperRibbonVisible(true)

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen"
      >
        {/* ── Hero ── */}
        <section
          className={cn(
            "relative px-4 border-b border-border/50 overflow-hidden transition-[padding] duration-300",
            showRibbon ? "pt-[104px] pb-16 lg:pt-[120px] lg:pb-20" : "py-16 lg:py-20",
          )}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="inline-flex items-center gap-4 mb-8 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--orange)]" />
                    PLANT.FLOOR / BOARD.ROOM
                  </span>
                  <span className="w-4 h-px bg-border" />
                  <span>// {currentYear}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter mb-10 leading-[1.03]"
                >
                  <span className="text-[var(--orange)]">Agentic</span> layers over
                  <br />
                  <span className="text-muted-foreground">your entire</span>
                  <br />
                  <span className="text-muted-foreground">manufacturing stack.</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                  className="flex flex-col sm:flex-row items-start gap-3"
                >
                  <a
                    href="https://calendly.com/yuvraj-s-bhadauria/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-stretch rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors overflow-hidden"
                  >
                    <span className="inline-flex items-center px-6 text-sm font-semibold">
                      Schedule consultation
                    </span>
                    <span className="inline-flex items-center justify-center w-11 h-11 my-1.5 mr-1.5 rounded-full bg-[var(--orange)] text-[var(--orange-foreground)] group-hover:bg-[var(--orange)]/90 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                  <Link
                    href="#concepts"
                    className="group inline-flex items-stretch rounded-full border border-border bg-transparent hover:border-foreground/40 transition-colors overflow-hidden"
                  >
                    <span className="inline-flex items-center px-6 py-3 text-sm font-semibold text-foreground">
                      See how it works
                    </span>
                    <span className="inline-flex items-center justify-center w-11 h-11 my-1 mr-1 rounded-full bg-[var(--orange)] text-[var(--orange-foreground)] group-hover:bg-[var(--orange)]/90 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <HeroStackDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* ── Concept explainer (after hero) ── */}
        <section id="concepts" ref={diagramRef} className="py-20 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate={diagramInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-2xl mb-12"
            >
              <SectionLabel index="01">The three layers we add</SectionLabel>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
                Your systems stay.
                <br />
                <span className="text-muted-foreground">We add the layers that think.</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Over every system in your stack we deploy two thin layers: a
                <strong className="text-foreground"> semantic layer</strong> that makes the system machine-readable
                in your company's vocabulary, and an
                <strong className="text-foreground"> agent application layer</strong> that acts on it. A cross-stack
                layer connects the three, enabling agents that reason end-to-end.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {[
                {
                  icon: Layers,
                  title: "Semantic layer",
                  body: "Tag-to-asset graphs, unit conversions, SOP linkage, business terminology. The context every agent reads from.",
                },
                {
                  icon: Sparkles,
                  title: "Agent application layer",
                  body: "Specialized agents for the work on that system — RCA on SCADA, OEE on MES, margin analytics on ERP.",
                },
                {
                  icon: Network,
                  title: "Cross-stack layer",
                  body: "Agents that pull context from every layer below to reason end-to-end. One investigation, all three systems.",
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="bg-background p-7 flex flex-col gap-4 hover:bg-secondary/40 transition-colors duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center border border-border">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono tabular-nums text-muted-foreground tracking-wider">
                        / 0{i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Agents-at-work dashboard ── */}
        <section className="py-20 px-4 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-2xl mb-10"
            >
              <SectionLabel index="01.5">Agents at work</SectionLabel>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
                The console your team
                <br />
                <span className="text-muted-foreground">watches each shift</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                KPIs streamed from the MES layer, sparklines from the SCADA layer, and an agent activity log from
                the cross-stack layer — one console, all three.
              </p>
            </motion.div>
            <AgentsAtWorkDashboard />
          </div>
        </section>

        {/* ── Agent catalog by layer ── */}
        <section ref={catalogRef} className="py-24 px-4 border-b border-border/50 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate={catalogInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-12"
            >
              <div className="flex justify-center">
                <SectionLabel index="02">Offerings</SectionLabel>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
                One catalog per layer
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Each stack layer gets its own set of agents. Start with one, add more as the semantic layer
                thickens and your team gets confident.
              </p>
            </motion.div>

            <AgentCatalogTabs isInView={catalogInView} />
          </div>
        </section>

        {/* ── SLM pillar ── */}
        <section ref={slmRef} className="py-24 px-4 border-b border-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={slmInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <SectionLabel index="03">Small language models</SectionLabel>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
                  Private models,
                  <br />
                  <span className="text-muted-foreground">fine-tuned on your plant.</span>
                </h2>
                <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  Frontier APIs are fine for demos and dead wrong for operations: your tag schema, your SOPs, your
                  batch records are not someone else's training data. We run small, specialized models on your
                  hardware — tuned to the way your plant actually talks.
                </p>

                <div className="space-y-3">
                  {slmPillars.map((p, i) => {
                    const Icon = p.icon
                    return (
                      <motion.div
                        key={p.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={slmInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                        className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
                      >
                        <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border text-foreground flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-foreground mb-1">{p.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              <LLMModelDiagram />
            </div>
          </div>
        </section>

        {/* ── Enablement ── */}
        <section ref={enableRef} className="py-24 px-4 border-b border-border/50 bg-foreground text-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={enableInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-2xl mb-14"
            >
              <div className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-background/60 uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                <span className="font-mono tabular-nums">04</span>
                <span className="w-6 h-px bg-background/30" />
                <span>Enablement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.05]">
                We build the first layer.
                <br />
                <span className="text-background/60">Your team builds the next one.</span>
              </h2>
              <p className="text-base text-background/70 leading-relaxed">
                Agentic infrastructure is a compounding asset only if your people can extend it. As we ship the
                initial agents, we train your leaders, general managers, and CDOs to build on the same semantic
                layer — so the second wave of agents comes from inside the org.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: GraduationCap,
                  title: "Pair-building",
                  body: "Every agent we ship is built side-by-side with someone on your team. The repo is yours; so is the review history.",
                },
                {
                  icon: Users,
                  title: "Leaders, GMs, CDOs",
                  body: "Curriculum tuned for operational leaders — not just engineers. They drive the next-wave agent roadmap.",
                },
                {
                  icon: Workflow,
                  title: "Handover-first",
                  body: "Semantic-layer ownership transfers as we deploy. By month six, your team is shipping agents without us.",
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={enableInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
                    className="rounded-2xl border border-background/15 bg-background/5 p-7 flex flex-col gap-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-background/10 border border-background/20 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono tabular-nums text-background/50 tracking-wider">
                        / 0{i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-background/70 leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Outcomes carousel ── */}
        <section ref={outcomesRef} className="py-24 border-b border-border/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              animate={outcomesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            >
              <div>
                <SectionLabel index="05">Outcomes</SectionLabel>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground max-w-xl leading-[1.05]">
                  What the layers
                  <br />
                  <span className="text-muted-foreground">unlock in practice</span>
                </h2>
              </div>
              <Link
                href="/use-cases"
                className="text-sm font-semibold text-foreground hover:underline underline-offset-4 inline-flex items-center gap-1.5"
              >
                See all use cases
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4" style={{ scrollbarWidth: "none" }}>
              {outcomes.map((outcome, i) => (
                <motion.div
                  key={outcome.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="flex-shrink-0 w-[320px] sm:w-[360px] snap-start rounded-2xl border border-border bg-card p-7 flex flex-col gap-5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground tracking-wider">
                      / 0{i + 1}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-5xl font-bold tracking-tighter text-[var(--orange)]">{outcome.metric}</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {outcome.metricLabel}
                  </p>
                  <div className="h-px bg-border" />
                  <h3 className="text-lg font-semibold text-foreground leading-snug">{outcome.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{outcome.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust + testimonial ── */}
        <section ref={trustRef} className="py-24 px-4 border-b border-border/50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionLabel index="06">Reliable by design</SectionLabel>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
                Engineered for
                <br />
                <span className="text-muted-foreground">plant-floor reality</span>
              </h2>
              <p className="text-base text-muted-foreground mb-10 leading-relaxed">
                No forced migrations, no ripping out your historian, no "move everything to our cloud." The stack
                you run today is the substrate we build on.
              </p>

              <div className="divide-y divide-border border-y border-border">
                {trustPoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    animate={trustInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
                    className="flex items-center gap-5 py-4"
                  >
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground tracking-wider w-6">
                      0{i + 1}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
                    <span className="text-base text-foreground leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="relative rounded-2xl bg-foreground text-background p-10 lg:p-12"
            >
              <Quote className="w-10 h-10 text-background/20 mb-6" />
              <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-10">
                We stopped arguing about whose data was right. The agents surface a single, evidence-backed
                timeline — and the second wave of them came from our own team.
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-background/15">
                <div className="w-11 h-11 rounded-full bg-background/10 border border-background/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Operations Director</p>
                  <p className="text-xs text-background/60">Tier 1 supplier · Discrete manufacturing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <CTABand
          title="Ready to put layers over your stack?"
          description="Tell us what you run today — SCADA, MES, ERP. We'll map the semantic layer, the first agent pack per layer, and the enablement plan for your team."
        />
      </motion.main>
      <Footer />
    </>
  )
}
