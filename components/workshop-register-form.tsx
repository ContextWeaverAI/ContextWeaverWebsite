"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/meajznwa"

type Status = "idle" | "submitting" | "success" | "error"

export function WorkshopRegisterForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [idea, setIdea] = useState("")
  const [coupon, setCoupon] = useState("")
  const [submittedName, setSubmittedName] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          idea,
          coupon,
          source: "workshop-registration",
          workshop: "From Ideas to Reliable Apps using AI",
        }),
      })
      if (!res.ok) throw new Error("Formspree request failed")
      setSubmittedName(name)
      setSubmittedEmail(email)
      setName("")
      setEmail("")
      setPhone("")
      setCompany("")
      setIdea("")
      setCoupon("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-background text-foreground p-5 sm:p-6 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Name *</Label>
          <Input
            id="reg-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Work email *</Label>
          <Input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reg-company">Company name *</Label>
          <Input
            id="reg-company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your company"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-phone">Phone number *</Label>
          <Input
            id="reg-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="rounded-xl border border-amber-400/40 bg-amber-400/5 p-3.5 space-y-1.5">
        <Label htmlFor="reg-idea" className="text-amber-700">
          Briefly describe an app idea for your day-to-day plant work *
        </Label>
        <Textarea
          id="reg-idea"
          required
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. Something that tells maintenance which alarms actually need a response before the next shift change."
          className="min-h-20 bg-background border-amber-400/50 focus-visible:border-amber-500 focus-visible:ring-amber-400/50"
        />
        <p className="text-xs text-muted-foreground pt-0.5">
          Describe your idea with clarity — the 20 best entries get a{" "}
          <span className="font-semibold text-amber-700">100% fee waiver</span>.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-coupon">Discount coupon code (optional)</Label>
        <Input
          id="reg-coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Have a code? Enter it here"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong — please try again.</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="btn-gradient rounded-full w-full sm:w-auto px-8 gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Submit registration
            <ArrowUpRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>

    <Dialog open={status === "success"} onOpenChange={(open) => !open && setStatus("idle")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-11 h-11 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mb-1">
            <CheckCircle2 className="w-5 h-5 text-[var(--orange)]" />
          </div>
          <DialogTitle>Registration received</DialogTitle>
          <DialogDescription className="text-left">
            Thanks{submittedName ? `, ${submittedName.split(" ")[0]}` : ""} — your registration
            request has been sent and is being taken care of. We'll get back to you at{" "}
            <span className="text-foreground font-medium">{submittedEmail}</span> with seat
            confirmation, the schedule, and whether your idea made the top 20 for the 100% fee
            waiver.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl border border-border p-3.5 text-xs text-muted-foreground space-y-1">
          <div>
            <span className="font-semibold text-foreground">When:</span> September 2026
          </div>
          <div>
            <span className="font-semibold text-foreground">Fee:</span> $50 standard, $5 for the
            first 50 registrants
          </div>
          <div>
            <span className="font-semibold text-foreground">Includes:</span> certificate of
            completion
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="btn-gradient rounded-full w-full sm:w-auto px-8">Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
