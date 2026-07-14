"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgqdrnw"
const UNLOCK_KEY = "cw_whitepaper_unlocked"
const WHITEPAPER_URL = "/whitepapers/manufacturing-context-layer.html"

type Status = "idle" | "submitting" | "error"

export function WhitepaperGate() {
  const [checkedStorage, setCheckedStorage] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === "1")
    setCheckedStorage(true)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, source: "whitepaper-gate" }),
      })
      if (!res.ok) throw new Error("Formspree request failed")
      window.localStorage.setItem(UNLOCK_KEY, "1")
      setUnlocked(true)
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  if (!checkedStorage) return null

  if (unlocked) {
    return (
      <Button size="lg" asChild className="btn-gradient rounded-full px-8 gap-2">
        <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer">
          Open the white paper
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <Label htmlFor="wp-email">Email *</Label>
        <Input
          id="wp-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="wp-name">Name</Label>
          <Input id="wp-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wp-company">Company</Label>
          <Input
            id="wp-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong — please try again.</p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="btn-gradient rounded-full w-full gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Get the white paper
            <ArrowUpRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  )
}
