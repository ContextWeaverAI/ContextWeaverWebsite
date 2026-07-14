export interface BlogSeries {
  id: string
  name: string
  part: number
  /** Optional planned length. When omitted, the UI derives it from published parts. */
  total?: number
}

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  dek: string
  category: string
  date: string // ISO
  dateLabel: string
  readingTime: string
  wordCount: string
  charts: string
  author: string
  cover?: string
  series?: BlogSeries
}

const VOICE_SERIES = {
  id: "voice-agent-tradeoffs",
  name: "The Voice Agent Tradeoff Triangle",
  total: 3,
}

const SMART_FACTORY_SERIES = {
  id: "deconstructing-the-smart-factory",
  name: "Deconstructing the Smart Factory",
}

export const posts: BlogPost[] = [
  {
    slug: "unified-namespace",
    title: "The Unified Namespace, Honestly",
    subtitle: "What it is, what it actually solves, and the software patterns underneath it",
    dek: "Strip the manufacturing vocabulary away and a UNS is a pub/sub event bus for the plant floor. A technologist's read on what it solves, where it stops, and why a message broker is transport — not a system of record.",
    category: "Architecture",
    date: "2026-07-14",
    dateLabel: "Jul 14, 2026",
    readingTime: "6 min read",
    wordCount: "Concept · ~1,300 words",
    charts: "",
    author: "Ishan Bhanuka, CTO",
    series: { ...SMART_FACTORY_SERIES, part: 1 },
  },
  {
    slug: "voice-agent-tradeoffs-part-1",
    title: "The Pipeline & the Language Wall",
    subtitle: "Part 1 — Cost, Latency, Language and Intelligence",
    dek: "Why a production voice agent is a four-way tradeoff nobody markets honestly. How the pipeline fits together, where the milliseconds go, and the language wall that hits the moment you leave English.",
    category: "Engineering",
    date: "2026-06-08",
    dateLabel: "Jun 8, 2026",
    readingTime: "6 min read",
    wordCount: "§1–§2 · pipeline + STT",
    charts: "3 charts",
    author: "Aditya Kasaudhan & Yuvraj S Bhadauria",
    cover: "/blog/voice-tradeoff/charts/chart_03_language_coverage.svg",
    series: { ...VOICE_SERIES, part: 1 },
  },
  {
    slug: "voice-agent-tradeoffs-part-2",
    title: "The Inner Triangle: LLM & TTS",
    subtitle: "Part 2 — Cost, Latency, Language and Intelligence",
    dek: "The two stages where cost, latency, and intelligence pull hardest in different directions. Picking the right LLM, why prompt caching changes everything, and the dirtiest fight in voice AI: text-to-speech.",
    category: "Engineering",
    date: "2026-06-08",
    dateLabel: "Jun 8, 2026",
    readingTime: "6 min read",
    wordCount: "§3–§4 · LLM + TTS",
    charts: "3 charts",
    author: "Aditya Kasaudhan & Yuvraj S Bhadauria",
    cover: "/blog/voice-tradeoff/charts/chart_04_llm_intelligence_vs_cost.svg",
    series: { ...VOICE_SERIES, part: 2 },
  },
  {
    slug: "voice-agent-tradeoffs-part-3",
    title: "The Tradeoff, the Bill & the Playbook",
    subtitle: "Part 3 — Cost, Latency, Language and Intelligence",
    dek: "It all collapses into one picture. The four-axis radar, what a real deployment costs at 8,000 voice-minutes a month, the latency and cost levers that actually move the needle, and the honest conclusion.",
    category: "Engineering",
    date: "2026-06-08",
    dateLabel: "Jun 8, 2026",
    readingTime: "8 min read",
    wordCount: "§5–§9 · tradeoff + cost",
    charts: "3 charts",
    author: "Aditya Kasaudhan & Yuvraj S Bhadauria",
    cover: "/blog/voice-tradeoff/charts/chart_07_four_axis_radar.svg",
    series: { ...VOICE_SERIES, part: 3 },
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

/** Standalone posts (not part of any series), newest first. */
export function getStandalonePosts(): BlogPost[] {
  return posts
    .filter((p) => !p.series)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Posts for the index "notes" grid: newest-first, excluding the featured voice
 * series (which gets its own hero block). Standalone posts and the opening parts
 * of other series both surface here until a series is large enough to feature.
 */
export function getFieldNotePosts(): BlogPost[] {
  return posts
    .filter((p) => p.series?.id !== VOICE_SERIES.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** All posts in a series, ordered by part number. */
export function getSeriesParts(seriesId: string): BlogPost[] {
  return posts
    .filter((p) => p.series?.id === seriesId)
    .sort((a, b) => (a.series!.part ?? 0) - (b.series!.part ?? 0))
}

/** Previous / next post within the same series, if any. */
export function getSeriesNeighbors(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const post = getPost(slug)
  if (!post?.series) return {}
  const parts = getSeriesParts(post.series.id)
  const i = parts.findIndex((p) => p.slug === slug)
  return { prev: parts[i - 1], next: parts[i + 1] }
}
