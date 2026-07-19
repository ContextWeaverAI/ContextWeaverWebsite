import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { posts } from "./blog/posts"

export const dynamic = "force-static"

// Statically generated at build time (compatible with output: 'export').
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/architecture",
    "/use-cases",
    "/security",
    "/contact",
    "/whitepaper",
    "/blog",
    "/blog/voice-agent-tradeoffs/sources",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticEntries, ...postEntries]
}
