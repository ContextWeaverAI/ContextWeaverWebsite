import Link from "next/link"
import { WovenOrb } from "@/components/woven-orb"

const footerLinks = {
  "Use Cases": [
    { label: "Root Cause Analysis", href: "/use-cases#root-cause" },
    { label: "Equipment Troubleshooting", href: "/use-cases#troubleshooting" },
    { label: "Alarm Flood Management", href: "/use-cases#alarms" },
    { label: "OEE & Production Analytics", href: "/use-cases#oee" },
    { label: "Quality Deviation", href: "/use-cases#quality" },
    { label: "Predictive Health", href: "/use-cases#predictive" },
  ],
  Resources: [
    { label: "Architecture", href: "/architecture" },
    { label: "Security", href: "/security" },
    { label: "Documentation", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "https://calendly.com/yuvraj-s-bhadauria/30min", external: true },
    { label: "Privacy", href: "/bluestar_whatsappbot_privacy" },
    { label: "Terms", href: "/bluestar_whatsappbot_terms" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="font-semibold text-foreground text-lg">ContextWeaver</span>
              <WovenOrb className="w-8 h-8 text-foreground" />
            </Link>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ContextWeaver. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/bluestar_whatsappbot_privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/bluestar_whatsappbot_terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
            <a
              href="https://calendly.com/yuvraj-s-bhadauria/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
