"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  MapPin,
  Users,
  ListChecks,
  Sparkles,
  Ticket,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WorkshopRegisterForm } from "@/components/workshop-register-form"

const EASE = [0.22, 1, 0.36, 1] as const

const agendaItems = [
  "How to turn real manufacturing problems into working apps using AI",
  "How to explain what you need clearly so the AI builds the right thing",
  "The difference between a fragile demo and an app you can actually rely on",
  "How to get your app into the hands of your team and keep improving it",
  "Walk away with an app built around your work, not a generic template",
]

const instructors = [
  {
    name: "Yuvraj",
    role: "Co-founder & CEO",
    photo: "/workshops/yuvraj.jpg",
    bio: "Published IoT and AI research spanning BITS Pilani and NUS Singapore. First employee at an Accel and Nexus-backed startup, driving GTM and product. Earlier founded a deep-tech startup backed by the Hong Kong Science and Technology Park.",
  },
  {
    name: "Ishan",
    role: "Co-founder & CTO",
    photo: "/workshops/ishan.jpg",
    bio: "Started at AWS, then left to pursue computer science research at HKUST. Along the way, built production AI applications for Fortune 500 companies and a trading platform for an Australian trading firm, before ContextWeaver.",
  },
]

export default function WorkshopsPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen pt-20"
      >
        {/* ── Register + Photo ── */}
        <section id="register" className="py-12 lg:py-14 px-4 bg-foreground text-background scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-4 mb-6 font-mono text-[11px] tabular-nums text-background/60 tracking-wider"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--orange)]" />
                AI WORKSHOP / BY CONTEXTWEAVER
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5">
                Register your interest
              </h2>
              <p className="text-sm text-background/70 leading-relaxed max-w-md">
                Tell us who you are and the tool you'd want to build — registration opens to this
                list first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
              className="mb-6 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-amber-300/5 to-transparent p-4 sm:p-5 flex gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Ticket className="w-4.5 h-4.5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-1">
                  The 100% Fee Waiver — Golden Ticket
                </h3>
                <p className="text-xs sm:text-sm text-background/80 leading-relaxed">
                  The 20 best entries get a full fee waiver. We're judging clarity of thinking — can
                  you spot a real problem around you and picture a working piece of software to
                  solve it? Not the technical details, just what the software should do and who
                  does what in it. Show us that in your app description below. Articulate it well,
                  and you're exactly the kind of person we can take from this idea to a production
                  app by the end of the workshop.
                </p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
              {/* Form, shifted left */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                <WorkshopRegisterForm />
              </motion.div>

              {/* Photo + workshop name, on the right */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                <div className="rounded-2xl overflow-hidden border border-background/15 shadow-sm mb-4">
                  <img
                    src="/workshops/engineer-hero.jpg"
                    alt="Engineer working in a manufacturing plant"
                    className="w-full h-56 sm:h-64 lg:h-56 object-cover"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter leading-[1.1]">
                  <span className="text-[var(--orange)]">From Ideas to Reliable Apps</span>
                  <br />
                  <span className="text-[var(--orange)]/60">using AI</span>
                </h1>
                <p className="text-sm text-background/70 leading-relaxed mt-3">
                  For <strong className="text-background font-semibold">manufacturing professionals</strong>{" "}
                  who want to build their own tools without learning to code.
                </p>

                <div className="flex items-end gap-6 mt-4 pt-4 border-t border-background/15">
                  <div>
                    <div className="text-2xl font-bold leading-none">$5</div>
                    <div className="text-[11px] text-background/60 mt-1">first 50 registrants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold leading-none">$50</div>
                    <div className="text-[11px] text-background/60 mt-1">standard</div>
                  </div>
                </div>
                <p className="text-[11px] text-background/50 mt-2">Certificate of completion included.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Everything else, condensed ── */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span>Workshop details</span>
              <span className="w-6 h-px bg-border" />
              <span>Starts September 2026</span>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {/* Who it's for */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="bg-background p-5 flex flex-col gap-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-foreground/5 text-foreground flex items-center justify-center border border-border">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-foreground">Who it's for</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Operations, production, maintenance, quality — whichever department of
                  manufacturing you belong to. No AI or software background needed. Just be good at
                  what you do and know where the friction is.
                </p>
              </motion.div>

              {/* Agenda */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className="bg-background p-5 flex flex-col gap-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-foreground/5 text-foreground flex items-center justify-center border border-border">
                  <ListChecks className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-foreground">Agenda</h3>
                <ul className="text-xs text-muted-foreground leading-relaxed space-y-1 list-disc pl-3.5">
                  {agendaItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Don't hesitate */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                className="bg-background p-5 flex flex-col gap-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-foreground/5 text-[var(--orange)] flex items-center justify-center border border-border">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-foreground">You don't need to be a developer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  With AI, building a tool is as simple as explaining what you need in your own
                  words. You know the problem better than anyone — don't hesitate, bring it as is.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="mt-6 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {instructors.map((person) => (
                <div key={person.name} className="bg-background p-5 flex gap-4 items-start">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover border border-border shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-foreground">{person.name}</h3>
                    <div className="text-xs font-medium text-[var(--orange)] mb-1.5">{person.role}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{person.bio}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 flex items-center gap-1.5"
            >
              <a
                href="https://calendly.com/yuvraj-s-bhadauria/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Have questions instead? Talk to us
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
