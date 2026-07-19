import type { Metadata } from "next"
import { SITE_URL, OG_IMAGE } from "@/lib/site"
import { WhitepaperClient } from "./whitepaper-client"

const PATH = "/whitepaper"
const TITLE = "The Manufacturing Context Layer — ContextWeaver White Paper"
const DESCRIPTION =
  "Most industrial AI initiatives stall at the pilot because the bottleneck is context, not connectivity or model capability. A reference architecture for a governed, agent-ready context layer built on ISA-95."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "manufacturing context layer",
    "industrial AI",
    "ISA-95",
    "agent-ready data",
    "SCADA MES ERP",
    "manufacturing AI architecture",
    "operational context",
    "smart factory white paper",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PATH}`,
    siteName: "ContextWeaver",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function WhitepaperPage() {
  return <WhitepaperClient />
}
