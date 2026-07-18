import type { Metadata } from "next"
import { BlogArticle } from "@/components/blog-article"
import { getPost } from "../posts"
import { articleHtml } from "./article-html"

const post = getPost("historian")!
const SITE_URL = "https://getcontextweaver.com"
const PATH = "/blog/historian"
const OG_IMAGE = "/contextweaver.png"

export const metadata: Metadata = {
  title: `${post.title} — ContextWeaver`,
  description: post.dek,
  keywords: [
    "data historian",
    "operational historian",
    "time-series database",
    "PI System",
    "AVEVA PI",
    "OSIsoft",
    "process historian",
    "ISA-95 asset model",
    "manufacturing context layer",
    "industrial IoT",
    "SCADA MES historian",
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
