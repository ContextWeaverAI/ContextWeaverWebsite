"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const EASE = [0.22, 1, 0.36, 1] as const
const MAIL = "yuvraj@getcontextweaver.com"

export default function PrivacyPage() {
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
                LEGAL / PRIVACY
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
              Privacy <span className="text-[var(--orange)]">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              How <strong className="text-foreground font-semibold">Bluestar</strong>, operated by Context
              Weaver, collects, uses, stores, and shares your information across the maintenance platform and
              the WhatsApp Business integration.
            </motion.p>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-4">
          <article className="legal-prose legal-prose-numbered max-w-3xl mx-auto">
            <p>
              This Privacy Policy explains how <strong>Bluestar</strong> (&ldquo;Bluestar&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated by Context Weaver, collects, uses, stores, and
              shares information when you use the Bluestar maintenance management platform, our website, and our
              WhatsApp Business messaging integration (collectively, the &ldquo;Service&rdquo;). By using the
              Service you agree to the practices described below.
            </p>

            <h2>Who we are</h2>
            <p>
              Bluestar is a computerized maintenance management system (CMMS) for facility and equipment
              maintenance teams. It includes a web application for operators and administrators and an optional
              WhatsApp Business channel that lets technicians and customers raise, update, and track maintenance
              requests through chat.
            </p>
            <p>
              For any privacy-related question or request, contact us at{" "}
              <a href={`mailto:${MAIL}`}>{MAIL}</a>.
            </p>

            <h2>Information we collect</h2>
            <p>We collect only the information needed to operate the Service:</p>
            <ul>
              <li>
                <strong>Account information.</strong> Name, email address, role, organisation, and authentication
                credentials when an account is created for you by an administrator or when you sign in.
              </li>
              <li>
                <strong>WhatsApp messaging data.</strong> When you message Bluestar on WhatsApp, or when Bluestar
                messages you, we receive and store: your WhatsApp phone number, your display name as provided by
                WhatsApp, the message contents (text, media, voice, location), message timestamps, and message
                delivery / read status. This is required to deliver and respond to your messages.
              </li>
              <li>
                <strong>Operational data.</strong> Maintenance requests, work orders, assets, locations,
                comments, attachments, and other records you or your organisation enter into the Service.
              </li>
              <li>
                <strong>Technical data.</strong> Device type, browser, IP address, access logs, and similar
                diagnostics required to keep the Service secure and reliable.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> collect special-category personal data (health, religion, political
              opinions, etc.), and we do not knowingly collect data from children under 13.
            </p>

            <h2>How we use your information</h2>
            <p>We use the information we collect only to:</p>
            <ul>
              <li>Provide, operate, and maintain the Service.</li>
              <li>
                Send and receive WhatsApp messages that you or your organisation have opted in to, including
                service notifications, work-order updates, and replies to messages you initiate.
              </li>
              <li>Authenticate users and prevent abuse, fraud, or unauthorised access.</li>
              <li>Diagnose technical problems and improve reliability and performance.</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal data, and we do not use WhatsApp message content for
              advertising or for training third-party machine-learning models.
            </p>

            <h2>Legal basis for processing</h2>
            <p>
              Where applicable law requires a legal basis for processing personal data, we rely on (a) your
              consent, (b) the performance of a contract with you or your organisation, (c) our legitimate
              interests in operating and securing the Service, and (d) compliance with legal obligations.
            </p>

            <h2>How we share information</h2>
            <p>We share information only as follows:</p>
            <ul>
              <li>
                <strong>WhatsApp / Meta.</strong> WhatsApp messages are transmitted through the WhatsApp Business
                Platform operated by Meta Platforms, Inc. and its affiliates. Their handling of message data is
                governed by Meta&rsquo;s own terms and policies.
              </li>
              <li>
                <strong>Infrastructure providers.</strong> We use vetted cloud providers (such as our hosting,
                database, and storage providers) to run the Service. They process data only on our instructions
                and under contractual confidentiality and security obligations.
              </li>
              <li>
                <strong>Your organisation.</strong> If you use Bluestar as part of an organisation (for example,
                your employer or a service provider), the administrators of that organisation can access the
                data you submit through the Service.
              </li>
              <li>
                <strong>Legal compliance.</strong> We may disclose information if required by law, regulation,
                legal process, or governmental request, or to protect the rights, property, or safety of
                Bluestar, our users, or the public.
              </li>
            </ul>

            <h2>Data retention</h2>
            <p>
              We keep personal data only for as long as necessary to provide the Service and to meet the
              purposes described in this policy. WhatsApp message contents are retained for up to{" "}
              <strong>24 months</strong> for operational and audit purposes, after which they are deleted or
              anonymised. Account and operational records are kept for the lifetime of the account and for a
              reasonable period afterwards to satisfy legal and accounting requirements. You can request earlier
              deletion at any time (see section 8).
            </p>

            <h2>Security</h2>
            <p>
              We use industry-standard technical and organisational measures to protect your information,
              including encryption in transit (TLS), encryption at rest, access controls, audit logging, and the
              principle of least privilege for our staff. No system is perfectly secure; however, we work
              continuously to reduce risk and to respond promptly to any incident.
            </p>

            <h2>Your rights</h2>
            <p>
              Subject to applicable law, you have the right to (a) access the personal data we hold about you,
              (b) correct inaccurate data, (c) request deletion of your data, (d) restrict or object to certain
              processing, (e) request a portable copy of your data, and (f) withdraw consent at any time. To
              exercise any of these rights, email <a href={`mailto:${MAIL}`}>{MAIL}</a>. We will respond within
              30 days. You can also stop receiving WhatsApp messages from us at any time by replying{" "}
              <strong>STOP</strong> in the WhatsApp conversation.
            </p>

            <h2>International transfers</h2>
            <p>
              Bluestar is operated from India and may process data in countries other than your own. Where
              personal data is transferred internationally, we use appropriate safeguards required by applicable
              law (such as standard contractual clauses) to protect it.
            </p>

            <h2>Children</h2>
            <p>
              The Service is intended for use by businesses and is not directed at children under 13. We do not
              knowingly collect personal data from children. If you believe a child has provided us with
              personal data, please contact us and we will delete it.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Effective date&rdquo; above. If the changes are material we will provide a more prominent
              notice (for example, by email or in-app message). Continued use of the Service after a change
              means you accept the updated policy.
            </p>

            <h2>Contact</h2>
            <p>
              Questions, complaints, or requests about this policy or your personal data should be sent to:
            </p>
            <p>
              Bluestar &mdash; Context Weaver
              <br />
              Email: <a href={`mailto:${MAIL}`}>{MAIL}</a>
            </p>

            <p className="!mt-12 pt-8 border-t border-border text-xs font-mono tabular-nums text-muted-foreground tracking-wider">
              See also:{" "}
              <Link href="/bluestar_whatsappbot_terms">Terms of Service</Link> &middot;{" "}
              <Link href="/bluestar_whatsappbot_data-deletion">Data deletion instructions</Link>
            </p>
          </article>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
