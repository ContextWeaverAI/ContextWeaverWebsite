"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const EASE = [0.22, 1, 0.36, 1] as const
const MAIL = "yuvraj@getcontextweaver.com"

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen pt-20"
      >
        <section className="py-20 lg:py-24 px-4 border-b border-border/50">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-4 mb-8 font-mono text-[11px] tabular-nums text-muted-foreground tracking-wider"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--orange)]" />
                LEGAL / TERMS
              </span>
              <span className="w-4 h-px bg-border" />
              <span>// EFFECTIVE 2026-05-12</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter mb-8 leading-[1.05]"
            >
              Terms of <span className="text-[var(--orange)]">Service</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              The rules that govern access to and use of{" "}
              <strong className="text-foreground font-semibold">Bluestar</strong>, the related website, and the
              WhatsApp Business messaging integration.
            </motion.p>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-4">
          <article className="legal-prose legal-prose-numbered max-w-3xl mx-auto">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{" "}
              <strong>Bluestar</strong> maintenance management platform, the related website, and the WhatsApp
              Business messaging integration (collectively, the &ldquo;Service&rdquo;) provided by Bluestar
              (&ldquo;Bluestar&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated by
              Context Weaver. By accessing or using the Service you agree to be bound by these Terms. If you do
              not agree to these Terms, do not use the Service.
            </p>

            <h2>Eligibility and accounts</h2>
            <p>
              You must be at least 18 years old, or the age of majority in your jurisdiction, to use the
              Service. If you use the Service on behalf of an organisation, you represent that you have
              authority to bind that organisation to these Terms. You are responsible for keeping your login
              credentials secure and for all activity that occurs under your account.
            </p>

            <h2>The Service</h2>
            <p>
              Bluestar is a computerized maintenance management system (CMMS). It lets organisations track
              assets, work orders, preventive-maintenance schedules, and related operational data, and it
              includes an optional WhatsApp Business channel that lets users raise and receive updates about
              maintenance requests through chat. The Service may evolve over time; we may add, change, or
              remove features without notice.
            </p>

            <h2>Acceptable use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any applicable law, regulation, or third-party right.</li>
              <li>
                Send spam, unsolicited marketing, harassing, abusive, defamatory, obscene, or otherwise
                objectionable content over WhatsApp or any other channel.
              </li>
              <li>Impersonate any person or entity or misrepresent your affiliation with anyone.</li>
              <li>
                Upload or transmit viruses, malware, or any code intended to disrupt, damage, or limit the
                functioning of the Service.
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract the source code of the Service, except to
                the extent permitted by law.
              </li>
              <li>
                Use the Service to build a competing product, or scrape, copy, or resell its content or data
                without our written permission.
              </li>
              <li>
                Access the Service through automated means (bots, scripts) other than through interfaces we
                expressly provide.
              </li>
            </ul>
            <p>
              WhatsApp messaging through the Service is also subject to the{" "}
              <a
                href="https://www.whatsapp.com/legal/business-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Business Messaging Policy
              </a>{" "}
              and the{" "}
              <a href="https://business.whatsapp.com/policy" target="_blank" rel="noopener noreferrer">
                WhatsApp Commerce Policy
              </a>
              . You agree to comply with both.
            </p>

            <h2>Your content and data</h2>
            <p>
              You retain ownership of the data and content you submit to the Service (&ldquo;Customer
              Data&rdquo;). You grant Bluestar a worldwide, non-exclusive, royalty-free licence to host, store,
              transmit, display, and process Customer Data solely as needed to operate, maintain, and improve
              the Service for you. You are responsible for ensuring you have the rights and consents needed to
              submit Customer Data and for the legality of the content you send through the Service, including
              WhatsApp messages.
            </p>

            <h2>Privacy</h2>
            <p>
              Your use of the Service is also governed by our <Link href="/bluestar_whatsappbot_privacy">Privacy Policy</Link>,
              which explains how we collect, use, and protect personal data. Please review it carefully.
            </p>

            <h2>Third-party services</h2>
            <p>
              The Service relies on third-party platforms, including the WhatsApp Business Platform operated by
              Meta Platforms, Inc. and our cloud infrastructure providers. We are not responsible for the
              availability, content, or practices of those third parties, and your use of their services is
              governed by their own terms.
            </p>

            <h2>Fees</h2>
            <p>
              Some features of the Service may be offered for a fee. Pricing, billing terms, and refund
              policies, if any, will be presented to you before you commit to a paid plan. WhatsApp
              conversation charges levied by Meta may be passed through to you at cost or as agreed in your
              order form.
            </p>

            <h2>Suspension and termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without notice, if we
              reasonably believe you have breached these Terms, posed a risk to the Service or to other users,
              or used the Service in a manner that violates applicable law or the WhatsApp Business policies.
              You may stop using the Service at any time. On termination, the rights granted to you under these
              Terms end immediately; sections that by their nature should survive (ownership, disclaimers,
              liability, indemnity, governing law) will continue to apply.
            </p>

            <h2>Disclaimers</h2>
            <p>
              The Service is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
              <strong>&ldquo;as available&rdquo;</strong>, without warranties of any kind, whether express,
              implied, statutory, or otherwise. To the maximum extent permitted by law, Bluestar disclaims all
              warranties, including merchantability, fitness for a particular purpose, non-infringement, and
              any warranty arising from course of dealing or usage of trade. We do not warrant that the Service
              will be uninterrupted, error-free, secure, or that defects will be corrected.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, in no event will Bluestar, Context Weaver, or any of our
              affiliates, officers, employees, or agents be liable for any indirect, incidental, special,
              consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, or
              business opportunities, arising out of or related to your use of the Service. Our aggregate
              liability for any claim relating to the Service will not exceed the greater of (a) the amount you
              paid us for the Service in the 12 months preceding the claim, or (b) one hundred US dollars (USD
              100).
            </p>

            <h2>Indemnity</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Bluestar and its affiliates from any claims,
              liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in
              any way connected with (a) your use of the Service, (b) Customer Data you submit, (c) WhatsApp
              messages you send through the Service, or (d) your breach of these Terms or any applicable law.
            </p>

            <h2>Changes to the Terms</h2>
            <p>
              We may modify these Terms from time to time. If we do, we will revise the &ldquo;Effective
              date&rdquo; above and, where the changes are material, give you reasonable advance notice. Your
              continued use of the Service after the changes take effect constitutes your acceptance of the
              updated Terms.
            </p>

            <h2>Governing law and disputes</h2>
            <p>
              These Terms are governed by the laws of India, without regard to its conflict-of-laws principles.
              Any dispute arising out of or related to these Terms or the Service will be subject to the
              exclusive jurisdiction of the courts located in Bengaluru, India, except where applicable
              consumer-protection law gives you the right to bring an action in your home jurisdiction.
            </p>

            <h2>Miscellaneous</h2>
            <p>
              These Terms constitute the entire agreement between you and Bluestar regarding the Service and
              supersede any prior agreements on the same subject. If any provision is held unenforceable, the
              remaining provisions will continue in full force. Our failure to enforce any right or provision
              will not be a waiver of that right or provision. You may not assign these Terms without our prior
              written consent; we may assign them freely.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these Terms, contact us at <a href={`mailto:${MAIL}`}>{MAIL}</a>.
            </p>

            <p className="!mt-12 pt-8 border-t border-border text-xs font-mono tabular-nums text-muted-foreground tracking-wider">
              See also:{" "}
              <Link href="/bluestar_whatsappbot_privacy">Privacy Policy</Link> &middot;{" "}
              <Link href="/bluestar_whatsappbot_data-deletion">Data deletion instructions</Link>
            </p>
          </article>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
