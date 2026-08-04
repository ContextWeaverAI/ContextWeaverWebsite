import type { Metadata } from "next"
import { BlogArticle } from "@/components/blog-article"
import { getPost } from "../posts"
import { articleHtml } from "./article-html"
import { SITE_URL, OG_IMAGE } from "@/lib/site"

const post = getPost("context-layer")!
const PATH = "/blog/context-layer"

export const metadata: Metadata = {
  title: `${post.title} — ContextWeaver`,
  description: post.dek,
  keywords: [
    "context layer",
    "manufacturing data",
    "semantic model",
    "entity resolution",
    "industrial AI agents",
    "unified namespace",
    "MES",
    "ERP",
    "SCADA",
    "manufacturing context layer",
    "ISA-95",
    "smart factory",
  ],
  authors: [{ name: post.author }],
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PATH}`,
    siteName: "ContextWeaver",
    title: post.title,
    description: post.dek,
    publishedTime: post.date,
    authors: [post.author],
    section: post.category,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: post.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.dek,
    images: [OG_IMAGE],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.dek,
  author: { "@type": "Person", name: post.author },
  publisher: {
    "@type": "Organization",
    name: "ContextWeaver",
    logo: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE}` },
  },
  datePublished: post.date,
  dateModified: post.date,
  articleSection: post.category,
  image: `${SITE_URL}${OG_IMAGE}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PATH}` },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} html={articleHtml} />
    </>
  )
}
