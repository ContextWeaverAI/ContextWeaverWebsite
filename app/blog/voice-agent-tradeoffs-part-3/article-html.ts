// Auto-generated from voice-tradeoff-blog/article.html (series part 3). Do not edit by hand.
export const articleHtml = `<h2 id="the-four-axis-tradeoff-visualized">5. The four-axis tradeoff
visualized</h2>
<p>All of the above collapses into one picture.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_07_four_axis_radar.svg"
alt="Chart 7: the four-axis radar" />
<figcaption aria-hidden="true">Chart 7: the four-axis radar</figcaption>
</figure>
<p>Axes normalized 0 to 1, higher is better. Cost efficiency means
cheaper. Latency means lower end-to-end ms. Intelligence is AA Index
plus Hindi capability blended. Language coverage runs from English-only
to multi-Indic.</p>
<p>No stack wins on all four. That’s the entire point.</p>
<ul>
<li><strong>Cheap English (Whisper.cpp + Llama 3.3 70B on Groq +
Piper).</strong> Maximum on cost, near-maximum on latency, mediocre on
intelligence (Llama 14 AA Index), low on language. Use when you have a
budget constraint and an English-only user base.</li>
<li><strong>Premium English (Deepgram + GPT-5.4 + ElevenLabs
Flash).</strong> Wins on intelligence, second on latency, expensive,
English-first. Use when the language constraint is solved and you can
pay for quality.</li>
<li><strong>Production Indic (Sarvam Saaras + Gemini 2.5 Flash + Sarvam
Bulbul).</strong> Maximum on language. All 22 Indian languages plus
English, with native code-mix handling. Second on cost. Middling on
latency (India-to-US network round trips dominate). This is what we
run.</li>
<li><strong>Vapi managed.</strong> Middle of every axis. You are paying
~$0.05/min for orchestration, retries, telephony, observability.</li>
<li><strong>Gemini Live e2e.</strong> Highest latency score (one round
trip), low cost, English-leaning, lower intelligence ceiling than the
best cascade options. The “audio-native” play.</li>
</ul>
<p>The framework is simple. <strong>Find the axis you can’t bend.
Optimize the other three around it.</strong> A manufacturing CMMS for
Indian operators can’t bend Language. A US telesales pilot can’t bend
Latency. A 12-market consumer app can’t bend Cost. Everyone else has
more flexibility than they think.</p>
<hr />
<h2 id="what-this-actually-costs-at-8000-voice-minmo">6. What this
actually costs at 8,000 voice-min/mo</h2>
<p>The scenario every CTO actually wants modeled: 200 maintenance
operators, 2 calls per shift, 60 seconds per call, 20 working days per
month. ~8,000 voice-minutes/month.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_08_monthly_cost.svg"
alt="Chart 8: monthly cost at 8k voice-min/mo" />
<figcaption aria-hidden="true">Chart 8: monthly cost at 8k
voice-min/mo</figcaption>
</figure>
<p>A few procurement-grade observations:</p>
<ul>
<li><p><strong>Cheap English on OSS is the cheapest production stack at
~$98/mo.</strong> A fully self-hosted Whisper.cpp + Piper TTS pair on a
$40/mo VPS, with Llama 3.3 70B on Groq for the LLM, hits the floor of
what a production English voice agent costs in 2026. The tradeoffs are
real: Llama 3.3 70B’s intelligence is AA Index 14 (versus Gemini Flash’s
35), STT latency on a CPU VPS is higher than hosted alternatives, and
you take on operational responsibility for the OSS infrastructure. But
the bill is small.</p></li>
<li><p><strong>Production Indic is $157/mo, about $60/mo more than
English-OSS.</strong> That $60 gap is the <em>Indic language
premium</em>. No production-grade OSS STT or TTS exists for Indian
languages yet, so you pay Sarvam for hosted Saaras (STT) and Bulbul
(TTS). Per-minute all-in is about $0.020. Still less than a single SaaS
seat for a 200-operator plant.</p></li>
<li><p><strong>Gemini Live e2e lands at $140/mo for English-leaning use
cases.</strong> Audio-native LLM pricing is now genuinely competitive,
between Cheap English ($98) and Production Indic ($157). The deciding
factor is language coverage and intelligence ceiling, not cost.</p></li>
<li><p><strong>Premium English at $253/mo</strong> is what you pay if
you want paid Deepgram + GPT-5.4 + ElevenLabs. Roughly 2.5× more than
OSS English for incrementally better quality and zero infrastructure
work.</p></li>
<li><p><strong>Vapi managed is by far the most expensive at ~$1,120/mo,
and that’s the cheapest Vapi configuration.</strong> Vapi’s published
cheapest stack (GPT-4o-mini + Deepgram + 11Labs Turbo at ~$0.15/min)
lands at $1,120/mo at our 8k voice-min scenario. Premium Vapi configs
(GPT-4o + 11Labs Multilingual) reach $0.30-$0.40/min, or
$2,400-$3,200/mo. Vapi’s $0.05/min platform fee is only about a third of
the cheapest-config bill; the rest is Vapi’s marked-up bundled provider
rates. Vapi makes sense when you need telephony, retries, observability,
multi-call routing, and your engineering team would burn more than
$1,000/mo of time implementing those primitives.</p></li>
<li><p><strong>Indian-region voice platforms price differently.</strong>
Bolna lists ~₹5.52/min (≈ $0.066/min) for their Indian voice-agent
platform. Western per-minute pricing on Vapi/Retell maps to roughly
$0.15-$0.30/min equivalent. The Indian platforms are 30-50% cheaper than
Western equivalents at comparable feature scope, but the gap shrinks
once you BYO providers on either side.</p></li>
</ul>
<h3 id="one-more-thing-ctos-ask-about-compliance">One more thing CTOs
ask about: compliance</h3>
<p>In India, voice agents touch four compliance surfaces every
procurement review covers. <strong>DPDP</strong> (Digital Personal Data
Protection Act, 2023) for any PII captured in transcripts.
<strong>TRAI</strong> (telecom regulator); outbound calls need DLT
registration for many use cases. <strong>RBI</strong> if your voice
agent handles any financial intent, BFSI guidelines apply. And the new
<strong>AI Act</strong> drafts under MeitY. Sarvam, Bolna, and Reverie
all have India data residency. Vapi and Western platforms typically
route through US datacenters, fine for most manufacturing use cases but
worth confirming before signing a contract.</p>
<h3 id="where-the-money-inside-one-call-actually-goes">Where the money
inside one call actually goes</h3>
<p>Per-call breakdown for the Production Indic stack:</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_10_cost_breakdown.svg"
alt="Chart 10: where the per-call cents go" />
<figcaption aria-hidden="true">Chart 10: where the per-call cents
go</figcaption>
</figure>
<p>The LLM, which dominates engineering blog headlines, is the
<strong>smallest</strong> line item on a Hinglish voice call. TTS is the
biggest (Sarvam Bulbul billed per character), telephony is second, STT
is third, LLM is fourth.</p>
<p>This breakdown changes everything about where to optimize. If a CTO
asks “should we move from Gemini Flash to Haiku 4.5?”, the answer is “it
won’t materially change your bill.” If they ask “should we cut the
agent’s verbosity from 7 turns to 4?”, the answer is “yes, because TTS
is your biggest line item.”</p>
<hr />
<h2 id="latency-optimization-what-actually-moves-the-needle">7. Latency
optimization: what actually moves the needle</h2>
<p>If your cascade is sitting above 2 seconds end-to-end, you’re almost
certainly doing some combination of three things wrong: using HTTP
request-response instead of persistent connections to your providers,
generating the LLM response in full before starting TTS, or running
services in a region distant from your providers’ endpoints. None of
these are subtle. They’re the mistakes every voice-agent team makes on
first deploy.</p>
<p>The general patterns that work, in descending order of impact:</p>
<ul>
<li><strong>Stream every stage of the pipeline.</strong> STT should emit
partial transcripts as audio arrives; LLM should stream tokens; TTS
should synthesize on incoming chunks. If any one stage waits for the
previous to complete, you’ve serialized the pipeline and given up the
biggest single latency lever you have.</li>
<li><strong>Persistent connections to your providers.</strong> Per-turn
HTTP handshakes (TLS, DNS, TCP) easily add 200-500 ms before any actual
work happens. Most modern voice-AI providers expose WebSocket or HTTP/2
keepalive surfaces. Use them.</li>
<li><strong>Prompt caching.</strong> Voice-agent system prompts run
1,500–3,000 tokens (instructions + catalog + few-shot examples) and are
constant across the call. Caching this prefix produces a step-change in
TTFT, not just cost. Anthropic, Google Gemini, OpenAI, DeepSeek, and xAI
all support some form (75-98% cost discount, similar-magnitude latency
savings on a cache hit).</li>
<li><strong>Co-locate with your providers’ regions.</strong> Sarvam
serves from ap-south-1. Google Gemini exposes ap-south-1 endpoints.
Deepgram has multiple regional options. Running your voice orchestrator
from us-east-1 against ap-south-1 providers costs ~200 ms of round-trip
on every single API call.</li>
<li><strong>Tune VAD for your actual speakers.</strong> Default
end-of-speech thresholds are conservative (300-500 ms of silence). Most
voice agents work fine at 150-200 ms with care taken not to cut off
slower or older speakers. The savings compound across every turn.</li>
</ul>
<p>A useful rule for procurement: assume vendor TTFB is +50% from your
region, and ask for end-to-end p95 numbers from a comparable production
deployment, not lab-conditions p50.</p>
<hr />
<h2 id="cost-optimization-the-engineering-deep-dive">8. Cost
optimization: the engineering deep dive</h2>
<p>Four levers, in descending impact order:</p>
<ol type="1">
<li><p><strong>Use the smallest LLM that passes your eval.</strong>
Voice agent tasks (slot-filling, asset code lookup, severity
classification) are not where the bigger models earn their price. Build
a 30-turn evaluation harness (Daily/Pipecat’s open-source <a
href="https://www.daily.co/blog/benchmarking-llms-for-voice-agent-use-cases/">aiewf-eval</a>
is a reasonable starting point) and run your top transcripts through
Haiku 4.5, Gemini 2.5 Flash, Grok 4.1 Fast, and DeepSeek V4 Flash. Pick
the cheapest one that gets 95%+ of the larger model’s output. Most teams
settle on the 80%-quality bracket and that’s fine.</p></li>
<li><p><strong>Truncate transcripts aggressively.</strong> A 7-turn call
is ~4,000 tokens. A 20-turn call is 12,000. Voice context isn’t
precious. Summarize old turns into 100 tokens of “what’s been said so
far” after the 5th turn. Saves 30-50% on long-call cost.</p></li>
<li><p><strong>Pick TTS by character price, not voice cloning
fidelity.</strong> Per chart 6, $5/M Inworld Mini at Enterprise floor vs
$100/M ElevenLabs Multilingual is a 20× spread for the same use case.
Your operators will not notice the voice clone. The CFO will notice the
bill.</p></li>
<li><p><strong>Self-host the cheap stuff if you have GPUs idle.</strong>
Piper TTS on a CPU is real-time. Whisper.cpp on consumer hardware is
real-time. Kokoro 82M (open-weight, Apache-licensed) runs real-time on
CPU too. If your STT + TTS is English-only and you have spare compute,
you can take those line items to near-zero. The savings only matter at
scale (above ~50k voice-min/mo), but at scale they compound
fast.</p></li>
</ol>
<p>The prompt-caching lever is covered separately in section 3. Worth
treating it as a sixth axis of architecture decision, not just a cost
optimization.</p>
<hr />
<h2 id="the-honest-conclusion">9. The honest conclusion</h2>
<p>No best stack exists. There’s just the stack that matches what you
can’t compromise on.</p>
<p>Can’t bend Cost? Self-host. Whisper.cpp, Llama 3.3 70B on Groq,
Piper. Near-zero variable cost. You’ll pay for it in latency and
intelligence.</p>
<p>Can’t bend Latency? Pay for an audio-native LLM. Deepgram, GPT-5.4,
ElevenLabs Flash, all in the same region as your users. You’ll pay for
it in cost.</p>
<p>Can’t bend Intelligence? Claude Sonnet 4.6 or GPT-5.4. Cache
aggressively. Expect $300-500/mo at 8k voice-min. You’ll pay for it in
cost.</p>
<p>Can’t bend Language? Use a stack built for the languages your users
actually speak. For India that means Indic-tuned STT and TTS plus an LLM
that handles code-switching cleanly. The round-trip to providers will
push you above a second end-to-end. You’ll pay for it in latency.</p>
<p>The decision isn’t “which vendor wins.” The decision is “which axis
am I optimizing.” Get that right first. Everything else follows.</p>
<hr />
<p><em>ContextWeaver builds production voice agents for Indian
manufacturing: work orders, preventive maintenance, voice intake,
WhatsApp escalation. If you want a deep-engineering tour of a production
voice agent in India, talk to us.</em></p>`;
