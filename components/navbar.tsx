"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WovenOrb } from "@/components/woven-orb"
import { cn } from "@/lib/utils"
import { useWhitepaperRibbonVisible, dismissWhitepaperRibbon } from "@/lib/use-whitepaper-ribbon"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Architecture", href: "/architecture" },
  { label: "Blog", href: "/blog" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const showRibbon = useWhitepaperRibbonVisible(pathname === "/")

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent",
      )}
    >
      {showRibbon && (
        <div className="relative h-10 flex items-center justify-center bg-foreground text-background px-10 text-xs sm:text-sm font-medium">
          <Link href="/whitepaper" className="group inline-flex items-center gap-1.5 hover:underline underline-offset-2">
            <span className="hidden sm:inline">New —</span>
            <span>Read our white paper: The Manufacturing Context Layer</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => dismissWhitepaperRibbon()}
            className="absolute right-3 sm:right-4 inline-flex p-1 text-background/70 hover:text-background transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-semibold text-foreground text-xl tracking-tight">ContextWeaver</span>
            <WovenOrb className="w-9 h-9 text-foreground" />
          </Link>

          <div className="hidden lg:flex items-center gap-1 bg-secondary/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive(item.href)
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://calendly.com/yuvraj-s-bhadauria/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Talk to founder
            </a>
            <Button asChild className="btn-gradient rounded-full pl-5 pr-4 gap-2">
              <a href="https://calendly.com/yuvraj-s-bhadauria/30min" target="_blank" rel="noopener noreferrer">
                Book a demo
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  isActive(item.href)
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-4 border-border" />
            <a
              href="https://calendly.com/yuvraj-s-bhadauria/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Talk to founder
            </a>
            <Button asChild className="btn-gradient w-full mt-2 rounded-full">
              <a href="https://calendly.com/yuvraj-s-bhadauria/30min" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                Book a demo
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
