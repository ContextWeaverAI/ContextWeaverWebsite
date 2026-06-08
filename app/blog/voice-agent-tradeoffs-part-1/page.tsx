"use client"

import { BlogArticle } from "@/components/blog-article"
import { getPost } from "../posts"
import { articleHtml } from "./article-html"

export default function Page() {
  return <BlogArticle post={getPost("voice-agent-tradeoffs-part-1")!} html={articleHtml} />
}
