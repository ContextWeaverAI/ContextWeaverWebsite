// Auto-generated from voice-tradeoff-blog/article.html (series part 2). Do not edit by hand.
export const articleHtml = `<h2 id="llm-the-inner-triangle">3. LLM: the inner triangle</h2>
<p>The LLM is where cost, latency, and intelligence pull in three
different directions hardest.</p>
<p>Throughput-per-minute and context window? Mostly irrelevant for voice
agents. Two things actually matter.</p>
<ul>
<li><strong>TTFT (time to first token).</strong> Sets the floor on
perceived latency. Anything over ~700 ms feels sluggish.</li>
<li><strong>Cost per call.</strong> A 60-second voice call generates
roughly 3,000 input tokens (system prompt + 7 turns of transcript) and
600 output tokens (7 short agent replies). Pick that envelope, and the
model picks itself.</li>
</ul>
<p>Here’s the voice-agent-relevant LLM frontier. Non-reasoning variants
only, because anything with reasoning enabled has 5+ second TTFT and is
unusable for live conversation.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_04_llm_intelligence_vs_cost.svg"
alt="Chart 4: LLM intelligence vs cost vs speed" />
<figcaption aria-hidden="true">Chart 4: LLM intelligence vs cost vs
speed</figcaption>
</figure>
<p>Three things jump out.</p>
<ol type="1">
<li><p><strong>The Indian/OSS cluster on the left is
competitive.</strong> DeepSeek V4 Flash at $0.14/$0.28 per 1M tokens
with AA Intelligence Index 36 (non-reasoning) is, for voice-agent
purposes, smarter than Claude Haiku 4.5 and 7× cheaper. (<a
href="https://api-docs.deepseek.com/quick_start/pricing">DeepSeek
pricing</a>, <a
href="https://artificialanalysis.ai/leaderboards/models">Artificial
Analysis leaderboard</a>, 2026-05-24.) Grok 4.1 Fast at $0.20/$0.50 with
AA Index 39 is similar. The Western premium is real but it isn’t
10×.</p></li>
<li><p><strong>Big bubbles aren’t smart.</strong> Llama 3.3 70B on Groq
is the giant teal bubble at 280 tokens/sec. Beautiful throughput, AA
Index 14. Fast doesn’t mean smart enough for slot-filling on a Hinglish
work order. The voice-agent sweet spot is a small-medium bubble at
$0.25-$1.00/1M output: Gemini 3 Flash, DeepSeek V4 Flash, Grok 4.1 Fast,
GPT-OSS 120B on Groq.</p></li>
<li><p><strong>The reasoning models aren’t on this chart.</strong>
Claude Sonnet 4.6 in non-reasoning mode is here (AA Index 44 at 1.34s
TTFT). With max reasoning it would be at AA 52 and 81 seconds of TTFT.
You can’t have a voice agent that takes 81 seconds to start speaking.
Reasoning is for offline batch.</p></li>
</ol>
<h3 id="prompt-caching-changes-everything">Prompt caching changes
everything</h3>
<p>The single biggest cost lever on a system-prompt-heavy voice agent is
<strong>prompt caching</strong>. (Every voice agent is
system-prompt-heavy because the agent needs ~1500 tokens of
instructions, asset catalog, and Hinglish examples to work.)</p>
<p>Numbers from the research:</p>
<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr>
<th>Provider</th>
<th>Cached input discount</th>
<th>TTL</th>
<th>Source</th>
</tr>
</thead>
<tbody>
<tr>
<td>Anthropic Claude (5-min cache)</td>
<td>90% off cache reads</td>
<td>5 minutes</td>
<td><a
href="https://platform.claude.com/docs/en/about-claude/pricing">claude.com
pricing</a></td>
</tr>
<tr>
<td>Anthropic Claude (1-hour cache)</td>
<td>80% off cache reads, +25% on writes</td>
<td>1 hour</td>
<td>same</td>
</tr>
<tr>
<td>Google Gemini (implicit)</td>
<td>~90% off cached tokens</td>
<td>implicit</td>
<td><a
href="https://ai.google.dev/gemini-api/docs/pricing">ai.google.dev
pricing</a></td>
</tr>
<tr>
<td>OpenAI cached input</td>
<td>75–90% off</td>
<td>implicit (10-min retention)</td>
<td><a
href="https://developers.openai.com/api/docs/pricing">developers.openai.com
pricing</a></td>
</tr>
<tr>
<td>DeepSeek context caching</td>
<td><strong>98% off</strong></td>
<td>implicit</td>
<td><a
href="https://api-docs.deepseek.com/quick_start/pricing">api-docs.deepseek.com</a></td>
</tr>
<tr>
<td>xAI Grok cached input</td>
<td>75% off</td>
<td>implicit</td>
<td><a href="https://docs.x.ai/developers/models">docs.x.ai</a></td>
</tr>
</tbody>
</table>
<p>A worked example: 1500-token system prompt on Claude Sonnet 4.6, 1000
calls/day.</p>
<ul>
<li>Without cache: 1000 × 1500 × $3.00/1M = <strong>$4.50/day</strong>
input alone.</li>
<li>With 5-min cache (assume 90% hit rate): 1000 × 1500 × ($3.00 × 0.1 +
$3.00 × 0.9 × 0.10) = <strong>$0.66/day</strong>.</li>
</ul>
<p>That’s 7× the cost wiped out by <em>one config flag</em>. If your
voice agent doesn’t use prompt caching, you’re paying for nothing.</p>
<h3 id="context-window-pricing">Context window pricing</h3>
<p>A million-token context is now table stakes. But it is not free, and
it is not flat across vendors:</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_05_context_vs_price.svg"
alt="Chart 5: context vs blended price" />
<figcaption aria-hidden="true">Chart 5: context vs blended
price</figcaption>
</figure>
<p>DeepSeek V4 Flash gives you a 1M-token context at $0.21 blended per
1M tokens. Claude Sonnet 4.6 gives you the same 1M context at $6
blended. That’s a 29× price spread for the same capability ceiling.
Obviously you’re paying for AA Index 44 on Sonnet vs 36 on DeepSeek, but
still.</p>
<p>For voice agents, the practical context window need is much smaller
than this suggests. A 7-turn call uses maybe 4,000 tokens of history.
The 200K window on Haiku 4.5 is already overkill. Optimize for
cost-per-call, not context.</p>
<hr />
<h2 id="tts-where-naturalness-costs-you">4. TTS, where naturalness costs
you</h2>
<p>TTS is the dirtiest fight in voice AI in 2026. Lots of marketing,
less honesty.</p>
<p>The metric that matters is <strong>TTFB (time to first audio
byte)</strong>. Total synthesis time doesn’t matter as much as you’d
think. Audio streams, the client buffers, the operator hears something.
Latency is felt at the first byte, not the last.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_06_tts_tradeoff.svg"
alt="Chart 6: TTS price vs TTFB" />
<figcaption aria-hidden="true">Chart 6: TTS price vs TTFB</figcaption>
</figure>
<p>The story this chart tells:</p>
<ul>
<li><p><strong>Cartesia Sonic-3 is the published TTFB winner at ~40
ms.</strong> Deepgram Aura-2 at 90 ms. ElevenLabs Flash v2.5 at 75 ms
inference-only. These are vendor-published numbers.</p></li>
<li><p><strong>Independent benchmarks tell a different story.</strong>
Async.com measured ElevenLabs Flash v2.5 at 251 ms median TTFB from
us-central1. Vexyl measured the same model at <strong>478 ms from
India</strong>. That’s 6× the vendor claim. The vendor number excludes
network round-trip, which is exactly the thing voice agents can’t
exclude. (<a
href="https://async.com/blog/tts-latency-vs-quality-benchmark/">Async
TTS benchmark</a>, <a
href="https://vexyl.ai/elevenlabs-tts-latency-test-2026-real-world-results/">Vexyl
India test</a>, both captured 2026-05-24.)</p></li>
<li><p><strong>Sarvam Bulbul v3 has no published TTFB.</strong> The 300
ms point on this chart is <em>measured</em> on our production cascade.
Observably correct on the apps/voice stack but not reproducible from a
vendor page. That’s the chart’s honest gap.</p></li>
<li><p><strong>Inworld TTS-1.5 Max is now #1 on Artificial Analysis ELO
(1,236),</strong> better than ElevenLabs v3 (1,179), and <em>5-20×
cheaper</em>. This rewrites the “ElevenLabs is the quality benchmark”
assumption that dominated 2024-25 voice agent design. (<a
href="https://artificialanalysis.ai/text-to-speech">Artificial Analysis
TTS</a>, 2026-05-24.)</p></li>
<li><p><strong>Sarvam Bulbul v2 at $18/M chars is dramatically cheaper
than every Western Hindi-capable provider.</strong> 5.5× cheaper than
ElevenLabs Multilingual v2 at $100/M. For Indian manufacturing voice
agents this is the dominant economic argument.</p></li>
</ul>
<h3
id="three-tts-providers-wed-never-use-again-for-english-voice-agents">Three
TTS providers we’d never use again for English voice agents</h3>
<ul>
<li><strong>Deepgram Aura-2.</strong> Excellent English quality, 90 ms
TTFB, but <strong>no Hindi</strong>. Only 7 languages. If you ever need
to expand beyond English you have to swap. (<a
href="https://developers.deepgram.com/docs/tts-models">Deepgram TTS
models</a>.)</li>
<li><strong>Rime AI Mist.</strong> English-only. Strong streaming but
again, language-limited.</li>
<li><strong>Speechmatics TTS.</strong> New entrant Q2 2026, English-only
at launch.</li>
</ul>
<h3 id="tts-providers-worth-knowing-about">TTS providers worth knowing
about</h3>
<p>The chart above shows the providers most voice-agent teams actually
pick from, but a few more are worth noting:</p>
<ul>
<li><strong>MiniMax Speech 2.6 HD.</strong> $100/M chars, Artificial
Analysis ELO ~1,156 (second tier behind Inworld and ElevenLabs v3).
Strong multilingual; emerging quality contender.</li>
<li><strong>Hume AI Octave 2.</strong> $7.60/M chars at the high tier
with ~100 ms latency. The cheapest “natural-enough” TTS that doesn’t
sacrifice prosody. Worth piloting for English-leaning agents.</li>
<li><strong>Kokoro 82M (open-weight).</strong> ~$0.70/M chars effective
cost when self-hosted (Apache-licensed), Artificial Analysis ELO ~1,059,
runs real-time on a CPU. The cheapest viable OSS English TTS in
2026.</li>
</ul>
<p>The 2024 instinct was “use ElevenLabs for everything.” The 2026
reality is: pick by language coverage first, latency second, quality
third. Inworld and Sarvam will likely take ElevenLabs’s voice-agent
market share over the next 12 months. And the open-weight options
(Kokoro, Piper) have closed the gap enough that English self-hosting is
genuinely viable.</p>`;
