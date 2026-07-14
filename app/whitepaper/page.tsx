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
