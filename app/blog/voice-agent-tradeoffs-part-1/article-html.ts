// Auto-generated from voice-tradeoff-blog/article.html (series part 1). Do not edit by hand.
export const articleHtml = `<p>It’s 11:47 on a Tuesday morning on the assembly floor of an automobile
plant on the outskirts of New Delhi. A welding robot on Line 3 has thrown a
fault — red light, arm frozen mid-cycle. Anwar, the maintenance supervisor,
is wearing gloves and safety glasses, standing two meters from a 200-tonne
stamping press. He can’t type. He has thirty seconds before the line
stops.</p>
<p>He hits one button on a panel and speaks Hinglish:</p>
<blockquote>
<p>“Welding robot pe lal batti jal rahi hai, arm beech mein hi ruk gaya
hai, spot weld miss ho raha hai shayad. Yeh urgent hai, line ruk gayi
hai.”</p>
</blockquote>
<p>A voice agent answers in Hindi in about 1.1 seconds. Fast enough that
Anwar stays on rhythm and the conversation feels real. (Humans notice
pauses starting around 250-300 ms; under 1.5 s end-to-end is the
threshold where voice conversations feel natural rather than
transactional.) The agent asks the machine code, confirms the severity,
files a work order, and notifies the maintenance head over WhatsApp. The
whole exchange takes 47 seconds.</p>
<p>This isn’t a demo. It’s the kind of voice agent we run in production
today. It’s also the kind of system that, if you actually try to build
it, forces you into a four-way tradeoff nobody in voice AI marketing is
honest about.</p>
<p>This post is about that tradeoff.</p>
<hr />
<h2 id="the-thesis">The thesis</h2>
<p>A production voice agent lives at the intersection of four
constraints:</p>
<ul>
<li><strong>Cost.</strong> What one minute of conversation actually
costs you, at scale.</li>
<li><strong>Latency.</strong> End-of-speech to first-audio-out. The only
latency number that matters.</li>
<li><strong>Intelligence.</strong> Does the model understand the
operator’s intent and produce a useful response.</li>
<li><strong>Language.</strong> Does it work in the language your users
actually speak, including code-switching.</li>
</ul>
<p>You can’t maximize all four. Most voice-agent decisions are really
decisions about <em>which axis you can’t compromise on</em>. Pick wrong
and you ship something technically impressive and operationally
useless.</p>
<p>We’ll work through this in two passes. The first is for ML and
backend engineers: how the pipeline fits together, where the
milliseconds and dollars go, what we’ve measured. The second is for CTOs
and engineering leaders: what this costs at 8,000 voice-minutes per
month, where the procurement decisions live, and what to ask
vendors.</p>
<p>Every number is cited. Where a number is vendor-self-reported, we say
so. Where it’s measured, we say so.</p>
<hr />
<h2 id="the-pipeline-end-to-end">1. The pipeline, end-to-end</h2>
<p>“Voice agent” describes two completely different things. Worth
getting that straight before we go further.</p>
<p><strong>Cascade.</strong> Three specialized models stitched together.
STT transcribes the audio. An LLM decides what to say. TTS renders the
reply as audio. Three vendors, three handoffs, three places for things
to break. Most engineering effort goes into the seams.</p>
<p><strong>End-to-end.</strong> One audio-native LLM. Audio in, audio
out. No intermediate text. Gemini Live and OpenAI’s Realtime models are
the canonical examples. Fewer hops, lower latency, different cost curve,
weaker language coverage.</p>
<p>Cascade is where production stacks live today. End-to-end is catching
up on quality, but it still costs more per minute and loses badly on
Indian languages, especially when speakers code-switch mid-sentence.</p>
<h3 id="where-the-latency-actually-goes">Where the latency actually
goes</h3>
<p>Our production cascade: Sarvam Saaras streaming STT, Gemini Flash,
Sarvam Bulbul streaming TTS. Here’s the budget.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_01_latency_waterfall.svg"
alt="Chart 1: latency waterfall" />
<figcaption aria-hidden="true">Chart 1: latency waterfall</figcaption>
</figure>
<p>Two stages dominate. Gemini Flash TTFT is around 590 ms (Artificial
Analysis median). Sarvam Bulbul TTFB is around 300 ms. Everything else
is noise. If you’re optimizing latency without touching those two,
you’re not optimizing anything.</p>
<p>The Gemini number isn’t ours; it’s the published median. We re-ran
our own benchmark to sanity-check it: 32 calls of the same 1,500-token
Hinglish system prompt against a comparable hosted model. Numbers lined
up. Raw data sits in <code>benchmark/results/warm_turn_*.json</code> if
you want to verify.</p>
<p>One thing most teams get wrong: they obsess over STT. Modern
streaming STT adds maybe 50 ms after end-of-speech. That’s not the
problem. The model generating the response and the audio synthesizing it
are the problem. In that order.</p>
<hr />
<h2 id="stt-where-the-language-axis-hits-first">2. STT, where the
language axis hits first</h2>
<p>STT is where the language decision either solves itself or owns
you.</p>
<p>English is solved. The STT market for English-only voice agents is
now a commodity. Whisper large-v3 hits ~2% WER on LibriSpeech test-clean
and ~5% on Common Voice 15. Parakeet RNNT runs faster than real time on
a single A10. Deepgram Nova-3 streams with ~150 ms TTFT (Deepgram’s own
benchmark says 5.26% WER on real-world audio; Artificial Analysis says
12.8% on the same model, which tells you everything about vendor vs
independent numbers). AssemblyAI Universal-3 Pro Streaming hits ~1.56%
WER at $0.0075/min. You can ship a production English voice agent with
$0/min STT cost on self-hosted Parakeet or Whisper.cpp and nobody will
notice.</p>
<p>Indian languages are not solved. If your users speak Hindi, Tamil,
Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Odia,
or any of the other 22 official Indian languages, and especially if they
code-switch (Hinglish, Tanglish, Tenglish; every real Indian
conversation does this), the picture changes completely.</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_02_stt_cost_vs_wer.svg"
alt="Chart 2: STT cost vs Hindi WER" />
<figcaption aria-hidden="true">Chart 2: STT cost vs Hindi
WER</figcaption>
</figure>
<p>A few honest observations from this chart:</p>
<ul>
<li><p><strong>NVIDIA Parakeet TDT v3, the latest and fastest variant on
the Hugging Face Open ASR Leaderboard, does not support Hindi.</strong>
The TDT v3 release covers 25 European languages. Hindi, Chinese,
Japanese, Korean, and Arabic are all absent. NVIDIA’s older Parakeet
RNNT 1.1B multilingual variant does cover Hindi (<code>hi-IN</code>),
but it’s the slower architecture, not the headline TDT generation. The
flagship OSS ASR frontier is openly skipping Indic languages. (<a
href="https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3">Parakeet TDT
0.6B v3 model card</a> and <a
href="https://build.nvidia.com/nvidia/parakeet-1_1b-rnnt-multilingual-asr/modelcard">RNNT
1.1B multilingual</a>, captured 2026-05-24.)</p></li>
<li><p><strong>The Indian providers occupy the price-quality frontier
for Indian languages.</strong> Sarvam Saaras v3 covers all 22 official
Indian languages plus English at $0.0059/min (₹30/hour) and posts 19.31%
WER on the IndicVoices benchmark across the top 10 languages. Reverie
offers quote-based pricing. Soniox sits at $0.002/min with 7.4% Hindi
WER on their own benchmark. Western providers (Google STT, Azure STT)
sit at $0.016/min with 13-14% WER on the 2023 AI4Bharat Vistaar
benchmark (the most recent third-party multi-vendor data available), and
their coverage of Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam,
and Gujarati ranges from “supported but underbenchmarked” to “missing
entirely.” (<a href="https://www.sarvam.ai/blogs/asr">Sarvam Saaras
blog</a>, <a href="https://github.com/AI4Bharat/vistaar">AI4Bharat
Vistaar</a>, both captured 2026-05-24.)</p></li>
<li><p><strong>Real-world Indic WER is much worse than benchmark
numbers.</strong> AI4Bharat reports Hindi WER blowing up to 22-30% on
telephony audio; the gap is similar or worse for Tamil, Bengali,
Marathi, and lower-resourced languages where training data is sparser.
Sarvam’s IndicVoices number (~19% on Saaras v3) is closer to shop-floor
reality than the clean-audio numbers any vendor publishes. Budget for
that. (<a href="https://ai4bharat.iitm.ac.in/areas/asr">AI4Bharat
IndicVoices study</a>.)</p></li>
</ul>
<h3 id="so-which-stt">So which STT?</h3>
<p>If your voice agent is English-only: - <strong>Cheapest:</strong>
Groq Whisper Large v3 Turbo at $0.04/hour ≈ $0.00067/min. (<a
href="https://groq.com/pricing">Groq pricing</a>, 2026-05-24.) -
<strong>Lowest TTFT:</strong> Deepgram Nova-3 at ~150 ms US-region.
AssemblyAI Universal-3 Pro Streaming at ~1.56% English WER and
$0.0075/min. - <strong>OSS path:</strong> Faster-Whisper large-v3 on
your own GPUs.</p>
<p>If your voice agent must handle Indian languages (Hindi, Tamil,
Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Odia,
or any other Indic language, including the code-mixed dialects): -
<strong>Production default:</strong> Sarvam Saaras v3 at $0.0059/min.
All 22 official Indian languages plus English, native code-mix handling,
sub-150 ms TTFT in fast mode. Sarvam has explicitly tuned Bulbul (their
TTS) for 8 kHz telephony bandwidth, which is exactly the channel a
phone-based manufacturing voice agent runs on. - <strong>Strong
open-source alternative:</strong> AI4Bharat IndicConformer-600M-Multi.
Covers all 22 Indian languages, MIT-licensed, RNNT streaming under 100
ms latency on self-hosted GPU. The only OSS Indic ASR that meaningfully
challenges Sarvam on language breadth. - <strong>OSS path with
effort:</strong> Mistral Voxtral Small. Apache-licensed, 7.69% FLEURS
Hindi, but no native streaming infrastructure yet. Needs production
wrapping. - <strong>Don’t bother with:</strong> Parakeet TDT (no Indic),
Deepgram Aura-2 (no Indic, that’s TTS but worth flagging), AssemblyAI
for languages beyond Hindi (limited coverage in
Tamil/Telugu/Bengali).</p>
<h3 id="the-provider-coverage-matrix">The provider coverage matrix</h3>
<p>When a CTO asks “can we support all our regions with one provider?”,
the answer is almost never yes:</p>
<figure>
<img src="/blog/voice-tradeoff/charts/chart_03_language_coverage.svg"
alt="Chart 3: language coverage matrix" />
<figcaption aria-hidden="true">Chart 3: language coverage
matrix</figcaption>
</figure>
<p>Sarvam and Reverie span all 22 Indian languages. Smallest.ai covers 7
of them: Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati.
Notably no Bengali or Punjabi. Western providers cover English natively,
Hindi passably, and most are simply absent for Tamil, Telugu, Bengali,
Marathi, Kannada, Malayalam, Gujarati, Punjabi, and Odia. If your
operators or customers speak more than one Indian language, you’re
picking Sarvam, Reverie, or AI4Bharat (OSS). Full stop.</p>`;
