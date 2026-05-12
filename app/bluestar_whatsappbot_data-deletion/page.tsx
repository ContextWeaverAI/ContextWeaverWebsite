"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const EASE = [0.22, 1, 0.36, 1] as const
const MAIL = "yuvraj@getcontextweaver.com"
const MAIL_SUBJECT = "mailto:yuvraj@getcontextweaver.com?subject=Data%20Deletion%20Request"

export default function DataDeletionPage() {
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
                LEGAL / DATA DELETION
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
              Data deletion <span className="text-[var(--orange)]">instructions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              How to request that <strong className="text-foreground font-semibold">Bluestar</strong> delete the
              personal information we hold about you, including any data tied to your interactions with our
              WhatsApp Business integration.
            </motion.p>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-4">
          <article className="legal-prose legal-prose-numbered max-w-3xl mx-auto">
            <p>
              We respect your right to control your personal data. This page explains how to request that{" "}
              <strong>Bluestar</strong> delete the personal information we hold about you, including any data
              tied to your interactions with our WhatsApp Business integration.
            </p>

            <h2>What gets deleted</h2>
            <p>On a verified deletion request we will delete or irreversibly anonymise:</p>
            <ul>
              <li>Your account profile (name, email, role, organisation membership).</li>
              <li>
                Your WhatsApp identifiers (phone number, WhatsApp display name) and all message history
                exchanged between you and Bluestar on WhatsApp.
              </li>
              <li>Attachments, media, and voice notes you sent through WhatsApp.</li>
              <li>Activity logs and diagnostic records that can be associated with you.</li>
            </ul>
            <p>
              Some records may need to be retained for a limited period to satisfy legal, tax, or audit
              obligations, or to resolve disputes. Where this is the case the data will be access-restricted
              and deleted as soon as the obligation ends.
            </p>

            <h2>How to request deletion</h2>
            <p>You have two options:</p>

            <h3>Option 1 &mdash; Email us</h3>
            <ol>
              <li>
                Send an email to <a href={MAIL_SUBJECT}>{MAIL}</a> from the email address associated with your
                account.
              </li>
              <li>
                Use the subject line: <strong>Data Deletion Request</strong>.
              </li>
              <li>
                In the body, include:
                <ul>
                  <li>Your full name.</li>
                  <li>The email address linked to your Bluestar account.</li>
                  <li>
                    The WhatsApp phone number you have used with Bluestar (in international format, e.g.{" "}
                    <code>+91 98xxxxxx00</code>), if applicable.
                  </li>
                  <li>
                    A short statement: &ldquo;I request deletion of my personal data from Bluestar.&rdquo;
                  </li>
                </ul>
              </li>
            </ol>

            <h3>Option 2 &mdash; Reply on WhatsApp</h3>
            <p>
              From the same WhatsApp number you used to contact Bluestar, send the message{" "}
              <strong>DELETE MY DATA</strong>. Our team will reply to confirm your identity and process the
              request.
            </p>

            <h2>What happens next</h2>
            <ol>
              <li>
                We will acknowledge your request within <strong>3 business days</strong>.
              </li>
              <li>
                We may ask one or two follow-up questions to verify your identity and prevent fraudulent
                deletion of someone else&rsquo;s account.
              </li>
              <li>
                We will complete the deletion within <strong>30 days</strong> of verifying your request, and
                confirm in writing once it is done.
              </li>
              <li>
                If we cannot delete certain data (for example, because it is required by law), we will explain
                why and tell you when it will be deleted.
              </li>
            </ol>

            <h2>Stop receiving WhatsApp messages</h2>
            <p>
              If you only want to stop receiving WhatsApp messages from Bluestar (without deleting your
              account), reply <strong>STOP</strong> to any WhatsApp message we send you. We will end the
              conversation and stop further outbound messages on that number.
            </p>

            <h2>Cost</h2>
            <p>
              Submitting a deletion request is free. We will not charge you to exercise your data-protection
              rights.
            </p>

            <h2>Contact</h2>
            <p>
              If you have any questions about this process, email us at <a href={`mailto:${MAIL}`}>{MAIL}</a>.
            </p>

            <p className="!mt-12 pt-8 border-t border-border text-xs font-mono tabular-nums text-muted-foreground tracking-wider">
              See also:{" "}
              <Link href="/bluestar_whatsappbot_privacy">Privacy Policy</Link> &middot;{" "}
              <Link href="/bluestar_whatsappbot_terms">Terms of Service</Link>
            </p>
          </article>
        </section>
      </motion.main>
      <Footer />
    </>
  )
}
