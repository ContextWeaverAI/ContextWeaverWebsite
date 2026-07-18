// Authored for the ContextWeaver blog. Body HTML rendered inside .blog-prose.
export const articleHtml = `<style>
.blog-prose figure.diagram{margin:2.25rem 0;padding:1.5rem 1.25rem 1.1rem;border:1px solid var(--border);border-radius:var(--radius-lg);background:color-mix(in oklch, var(--muted) 40%, var(--card));box-shadow:0 14px 40px -30px rgba(0,0,0,.4);}
.blog-prose figure.diagram svg{display:block;width:100%;height:auto;overflow:visible;}
.blog-prose figure.diagram figcaption{margin-top:1rem;font-size:.85rem;line-height:1.5;text-align:center;color:var(--muted-foreground);font-style:normal;}
.blog-prose figure.diagram text{font-family:inherit;}
.blog-prose .dg-panel-title{fill:var(--foreground);font-size:13px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;}
.blog-prose .dg-label{fill:var(--foreground);font-size:14px;font-weight:600;}
.blog-prose .dg-label-sm{fill:var(--foreground);font-size:13px;font-weight:600;}
.blog-prose .dg-sub{fill:var(--muted-foreground);font-size:12px;font-weight:500;}
.blog-prose .dg-mono{fill:var(--foreground);font-size:13px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
.blog-prose .dg-node{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 55%,transparent);stroke-width:1.5;}
.blog-prose .dg-mesh{stroke:color-mix(in oklch,var(--foreground) 46%,transparent);stroke-width:1.15;}
.blog-prose .dg-spoke{stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-hub{fill:color-mix(in oklch,var(--orange) 18%,var(--card));stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-accent-text{fill:var(--orange);font-size:11px;font-weight:700;}
.blog-prose .dg-box{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 30%,transparent);stroke-width:1.5;}
.blog-prose .dg-box-accent{fill:color-mix(in oklch,var(--orange) 12%,var(--card));stroke:var(--orange);stroke-width:1.75;}
.blog-prose .dg-connector{stroke:color-mix(in oklch,var(--foreground) 42%,transparent);stroke-width:1.5;fill:none;}
.blog-prose .dg-arrow{fill:color-mix(in oklch,var(--foreground) 48%,transparent);}
.blog-prose .dg-divider{stroke:var(--border);stroke-width:1;}
.blog-prose .dg-chip{fill:color-mix(in oklch,var(--muted) 60%,var(--card));stroke:var(--border);stroke-width:1;}
.blog-prose .dg-chip-accent{fill:color-mix(in oklch,var(--orange) 14%,var(--card));stroke:var(--orange);stroke-width:1.25;}
.blog-prose .dg-ok{fill:var(--orange);}
.blog-prose .dg-no{fill:none;stroke:var(--muted-foreground);stroke-width:1.75;}
.blog-prose .dg-glyph{stroke:var(--card);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.blog-prose .dg-glyph-no{stroke:var(--muted-foreground);stroke-width:1.75;fill:none;stroke-linecap:round;}
</style>
<p>In <a href="/blog/unified-namespace">Part 1</a>, the unified namespace got us the
live pressure on Line 2&rsquo;s filler in about thirty seconds &mdash; then hit a wall
on the very next question: <em>what was it doing twenty minutes ago?</em> A broker is a
last-value cache. It has no past. It punted us to a second system, and that system is
the one this piece is about.</p>
<p>Walk over to it and you&rsquo;ll be looking at a trend screen: a dozen pens scrolling
right to left, years deep, every sample real. Ask the engineer what header pressure was
at 04:00 last Tuesday and they&rsquo;ll have it before you finish the sentence. Ask them
<em>why</em> that morning&rsquo;s batch failed and watch the scrolling start.</p>
<p>Every one of those pens is a <strong>tag</strong>: a name, a stream of timestamped
numbers, and nothing else. It&rsquo;s the same structure any backend engineer reaches
for once the dashboards fill up &mdash; a firehose of numeric samples you want to keep
cheaply and query by time. If you&rsquo;ve run <a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">Prometheus</a> or InfluxDB, you already
understand the plant historian. Because a historian is the OT world rediscovering the
<a href="https://www.influxdata.com/time-series-database/" target="_blank" rel="noopener noreferrer">time-series database.</a></p>
<hr />
<h2 id="what-a-historian-actually-is">What a historian actually is</h2>
<p>Strip the manufacturing vocabulary away and a historian is an <strong>append-only
time-series database for the plant floor.</strong></p>
<p>Everything in it is a tag: a named series of <code>(timestamp, value, quality)</code>
tuples. Writes dominate &mdash; millions of samples a second, forever &mdash; and reads
are almost always the same shape: <em>give me this tag between two times.</em> The whole
engine is bent around that one access pattern, the way a metrics store like
<a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">Prometheus</a> is, and the way a relational database deliberately isn&rsquo;t.</p>
<p>Two design choices make it more than &ldquo;a table with a timestamp column&rdquo;:</p>
<ul>
<li><strong>Compression by exception.</strong> A historian doesn&rsquo;t keep every
sample; it keeps the ones that carry information. Deadband and swinging-door algorithms
drop any point that falls on a straight line you could have interpolated, so a pressure
holding steady at 4.2 bar for an hour costs a handful of points, not thousands.
That&rsquo;s how you retain millions of tags for twenty years on hardware that fits in a
rack.</li>
<li><strong>A flat tag namespace.</strong> The tag name is the only key.
<code>TT2471.PV</code> is a string; the historian stores its numbers and knows nothing
else about it &mdash; not what it measures, not what it&rsquo;s bolted to, not what moves
with it. Where the UNS at least gave you a hierarchical path, the historian is usually a
giant flat dictionary of names. Hold onto that; it&rsquo;s the seed of everything
below.</li>
</ul>
<p>That&rsquo;s the whole idea. A durable, compressed, queryable record of every number
the plant has ever produced &mdash; addressed by tag and time, and nothing else.</p>
<hr />
<h2 id="what-it-solves">What it solves</h2>
<p>The win is exactly the win a time-series database gives you in software:
<strong>durable history at scale.</strong></p>
<p>Before historians, a reading nobody wrote down or watched was simply gone. After, the
past is queryable. Trends, statistical process control, golden-batch comparisons,
regulatory recall, &ldquo;what was header pressure at 04:00 last Tuesday&rdquo; &mdash; all
of it rests on a system that captured the number and never let go.</p>
<p>And it scales absurdly well: millions of tags, sub-second resolution, decades deep,
surviving network blips with store-and-forward buffering at the edge. Building that
yourself is genuinely hard; the historian has it solved and hardened. For the problem of
<em>remembering what the plant did</em>, this is real, hard-won infrastructure &mdash;
and the industry is right to run everything on it.</p>
<hr />
<h2 id="where-it-fits">Where it fits</h2>
<p>A historian is a <strong>system of record for values over time.</strong> It sits
beside the UNS from Part 1: the broker moves the live event; the historian is the one
subscriber whose entire job is to write every event down and keep it. In software terms,
the event bus and the append-only store &mdash; the two halves of a logging pipeline. A
well-run plant has both, and needs both.</p>
<figure class="diagram">
<svg viewBox="0 0 560 300" role="img" aria-labelledby="dgh1-title">
<title id="dgh1-title">The historian is the plant&rsquo;s memory, and memory sits below understanding</title>
<rect class="dg-box" x="20" y="20" width="520" height="78" rx="10" />
<text class="dg-label" x="40" y="50">Understanding</text>
<text class="dg-sub" x="40" y="74">why did it happen? &middot; is 4.2 bar in-spec? &middot; what changed at 14:01?</text>
<rect class="dg-box-accent" x="20" y="126" width="520" height="66" rx="10" />
<text class="dg-label" x="40" y="156" style="fill:var(--orange)">Historian</text>
<text class="dg-sub" x="40" y="178">every value, ever &mdash; addressed by tag &amp; time, and nothing else</text>
<rect class="dg-box" x="20" y="220" width="520" height="60" rx="10" />
<text class="dg-label" x="40" y="248">Unified Namespace</text>
<text class="dg-sub" x="40" y="270">live state, in motion &mdash; Part 1</text>
<g class="dg-connector">
<path d="M140 218 V200" /><path d="M280 218 V200" /><path d="M420 218 V200" /><path d="M140 124 V106" /><path d="M280 124 V106" /><path d="M420 124 V106" />
</g>
<g class="dg-arrow">
<polygon points="135,203 145,203 140,195" /><polygon points="275,203 285,203 280,195" /><polygon points="415,203 425,203 420,195" /><polygon points="135,109 145,109 140,101" /><polygon points="275,109 285,109 280,101" /><polygon points="415,109 425,109 420,101" />
</g>
</svg>
<figcaption>The historian remembers every value the UNS ever carried &mdash; the plant&rsquo;s memory. But memory sits below understanding: a store of numbers can tell you what a reading <em>was</em>, never whether it was right or why it moved. A time-series database is storage, not a knowledge base.</figcaption>
</figure>
<p>What it is <em>not</em> is a place where anything is <em>understood.</em> And here a
technologist&rsquo;s instincts should twitch again, because <strong>a time-series
database is storage, not a knowledge base.</strong> Prometheus is not your CMDB. A
metrics store tells you <em>that</em> a number moved; it never tells you what the number
means. We learned this in observability the hard way &mdash; a wall of green dashboards
and still no idea why the site is down. Manufacturing is learning the same thing, because
the historian is so good at recall that it&rsquo;s tempting to mistake recall for
understanding.</p>
<p>It isn&rsquo;t. Here&rsquo;s why.</p>
<hr />
<h2 id="the-example">The specific example: back into the historian on Line 2</h2>
<p>Same Tuesday, same defect on Line 2&rsquo;s filler. The UNS gave us live pressure and
then sent us here for history. The historian delivers immediately on exactly that:</p>
<p><strong>&ldquo;What was <code>PT_004</code> doing twenty minutes ago?&rdquo;</strong> A
clean trend, sub-second, as far back as you care to scroll. This is the historian&rsquo;s
home turf, and it&rsquo;s genuinely the thing the broker couldn&rsquo;t do.</p>
<p>Then the investigation keeps going, and the historian hits a different wall than the
UNS did:</p>
<ul>
<li><strong>&ldquo;Is 4.2 bar even wrong?&rdquo;</strong> The historian has the number,
not the norm. 4.2 is nominal for the 500&nbsp;ml SKU and an alarm for the 2&nbsp;L
&mdash; but which product was running at 14:03 isn&rsquo;t a tag. The value has no
yardstick to be measured against.</li>
<li><strong>&ldquo;What else moved with it?&rdquo;</strong> You can drag the glycol-skid
temperature onto the same chart &mdash; if you already know to, and already know they
share a loop. The historian won&rsquo;t volunteer it. Two related pens are, to it, two
unrelated strings.</li>
<li><strong>&ldquo;Which batch was on the line, and where did that lot go next?&rdquo;</strong>
That&rsquo;s the MES, joined to the historian by nothing. Tag <code>PT_004</code> has
never heard of batch&nbsp;#4471.</li>
<li><strong>&ldquo;Who acknowledged the alarm at 14:05, and what did they change?&rdquo;</strong>
The historian logged the pressure falling. It did not log the operator, the setpoint
edit, or the note they left on the way out. It records the symptom, never the act.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 292" role="img" aria-labelledby="dgh2-title">
<title id="dgh2-title">The historian answers the history question, then hits its own wall</title>
<circle class="dg-ok" cx="34" cy="42" r="15" />
<polyline class="dg-glyph" points="27,42 32,48 41,35" />
<text class="dg-label-sm" x="64" y="47">What was PT_004 doing 20 minutes ago?</text>
<rect class="dg-chip-accent" x="430" y="27" width="182" height="30" rx="15" />
<text class="dg-accent-text" x="521" y="46" text-anchor="middle" style="font-size:12px">historian nails this</text>
<circle class="dg-no" cx="34" cy="98" r="15" />
<line class="dg-glyph-no" x1="27" y1="98" x2="41" y2="98" />
<text class="dg-label-sm" x="64" y="103">Is 4.2 bar wrong for the product that ran?</text>
<rect class="dg-chip" x="430" y="83" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="102" text-anchor="middle">needs the spec / context</text>
<circle class="dg-no" cx="34" cy="154" r="15" />
<line class="dg-glyph-no" x1="27" y1="154" x2="41" y2="154" />
<text class="dg-label-sm" x="64" y="159">What else moved with it?</text>
<rect class="dg-chip" x="430" y="139" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="158" text-anchor="middle">needs a graph / model</text>
<circle class="dg-no" cx="34" cy="210" r="15" />
<line class="dg-glyph-no" x1="27" y1="210" x2="41" y2="210" />
<text class="dg-label-sm" x="64" y="215">Which batch was on the line?</text>
<rect class="dg-chip" x="430" y="195" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="214" text-anchor="middle">needs the MES &mdash; no key</text>
<circle class="dg-no" cx="34" cy="266" r="15" />
<line class="dg-glyph-no" x1="27" y1="266" x2="41" y2="266" />
<text class="dg-label-sm" x="64" y="271">Who acked the alarm, and what changed?</text>
<rect class="dg-chip" x="430" y="251" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="270" text-anchor="middle">needs the event log</text>
</svg>
<figcaption>The historian answers the one question the UNS punted to it &mdash; perfect recall of the trend. The other four need a spec, a model, a join to the MES, and the human act behind the number: none of which a store of timestamped values was built to hold.</figcaption>
</figure>
<p>The historian answered the one question the UNS handed it, and then ran out of road.
It knows <em>what every number was.</em> It has no idea what any of them <em>meant.</em>
It&rsquo;s a perfect memory attached to nothing.</p>
<hr />
<h2 id="a-number-isnt-a-fact">A number isn&rsquo;t a fact</h2>
<p>Here&rsquo;s the part a wall of trends hides: the historian&rsquo;s entire model is a
flat set of tags keyed by time, and a bare number carries no <em>identity,</em> no
<em>relationships,</em> and no <em>meaning.</em> Which means it isn&rsquo;t yet a fact you
can reason on &mdash; it&rsquo;s a measurement waiting for the context that would make it
one.</p>
<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="dgh3-title">
<title id="dgh3-title">The same reading: an isolated tag versus a fact with context</title>
<line class="dg-divider" x1="300" y1="20" x2="300" y2="284" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="150" y="26" text-anchor="middle">What the historian has</text>
<text class="dg-panel-title" x="490" y="26" text-anchor="middle">What makes it a fact</text>
<rect class="dg-box" x="90" y="132" width="120" height="46" rx="9" />
<text class="dg-mono" x="150" y="153" text-anchor="middle">PT_004</text>
<text class="dg-sub" x="150" y="170" text-anchor="middle">14:03 &middot; 4.2 bar</text>
<g class="dg-spoke">
<line x1="470" y1="133" x2="470" y2="85" /><line x1="470" y1="177" x2="470" y2="225" /><line x1="448" y1="155" x2="425" y2="155" /><line x1="492" y1="155" x2="515" y2="155" />
</g>
<rect class="dg-box" x="415" y="51" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="470" y="72" text-anchor="middle">Asset: filler</text>
<rect class="dg-box" x="415" y="225" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="470" y="246" text-anchor="middle">Spec 3.8&ndash;4.4</text>
<rect class="dg-box" x="315" y="138" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="370" y="159" text-anchor="middle">Batch #4471</text>
<rect class="dg-box" x="515" y="138" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="570" y="159" text-anchor="middle">Op note 14:06</text>
<circle class="dg-hub" cx="470" cy="155" r="22" />
<text class="dg-accent-text" x="470" y="159" text-anchor="middle" style="font-size:10px">4.2 bar</text>
</svg>
<figcaption>To the historian, the reading is an island: a tag, a timestamp, a number. The same 4.2 bar only becomes a fact you can act on once it&rsquo;s tied to the asset it came from, the batch that was running, the spec it&rsquo;s judged against, and the operator&rsquo;s note &mdash; the edges a flat namespace of numbers throws away.</figcaption>
</figure>
<p>Watch what falls through:</p>
<ul>
<li><strong>Identity.</strong> <code>TT2471</code> is a string, not a thing. The
historian doesn&rsquo;t know it&rsquo;s the zone-3 temperature on the oven that feeds
Line 2 &mdash; and the day someone renames it <code>TT2471_NEW</code>, four years of
history quietly split into two strangers.</li>
<li><strong>Relationships.</strong> No edges. The filler pressure and the glycol-skid
temperature are one physical story; to the historian they&rsquo;re two unrelated pens.
It&rsquo;s the same graph the UNS&rsquo;s tree couldn&rsquo;t hold &mdash; and the
historian doesn&rsquo;t hold it either. It keeps the nodes and drops every line between
them.</li>
<li><strong>Meaning in context.</strong> A value has no product, no batch, no operating
mode attached. 4.2 bar is in-spec for one SKU and a defect for the next; a startup ramp
and a genuine fault trace the same curve. Same number, opposite truth &mdash; and nothing
in the historian can tell them apart.</li>
<li><strong>The event behind the number.</strong> It records that pressure fell at 14:03.
Not the recipe change at 14:01 that caused it, nor the operator note at 14:06 that
explains it. The symptom is stored; the cause and the context live in other systems, or
in someone&rsquo;s head.</li>
</ul>
<p>A tag is a measurement; a fact is a measurement plus what it&rsquo;s attached to, what
it depends on, and what it meant at the time. That&rsquo;s identity, edges, and context
&mdash; exactly what a flat namespace of numbers was never built to carry. It&rsquo;s the
lesson observability keeps relearning: a metric tells you the system twitched, and it
takes a model to tell you why.</p>
<hr />
<h2 id="the-hard-parts">What it costs to run one</h2>
<p>None of this is free either, and the bill looks a lot like the UNS&rsquo;s. A
historian is production infrastructure, and standing one up runs into familiar walls.</p>
<ul>
<li><strong>The tag dictionary is the actual project.</strong> &ldquo;Just log the
tags&rdquo; hides the hard part: someone designs the naming convention, gets every plant
to honor it, and owns it for a decade. When they leave you inherit 200,000 cryptic tags
across six conventions and four decades &mdash; and renaming one breaks every report,
trend, and query that referenced it. Schema design with organizational politics
attached.</li>
<li><strong>Compression is lossy on purpose.</strong> Deadband and swinging-door buy you
decades of retention by throwing away the wiggles. Tune it loose and the two-second
excursion you needed for root cause got smoothed into a flat line. You&rsquo;re trading
tomorrow&rsquo;s questions for today&rsquo;s disk &mdash; and you don&rsquo;t know which
questions until you&rsquo;re asking them.</li>
<li><strong>Contextualization is the forever-project.</strong> Every plant on earth has a
half-finished effort to bolt an <a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95" target="_blank" rel="noopener noreferrer">ISA-95</a> asset model onto the historian &mdash; the
&ldquo;asset framework,&rdquo; the tag-to-equipment mapping, the <a href="https://www.aveva.com/en/products/pi-system/" target="_blank" rel="noopener noreferrer">PI</a> AF hierarchy. It&rsquo;s 70% done everywhere, because the model is
the hard part and a store of numbers was never the place to keep it.</li>
<li><strong>It still isn&rsquo;t a model.</strong> Even done perfectly, you have flawless
recall and zero understanding. Identity, relationships, meaning, provenance &mdash; still
somebody else&rsquo;s problem.</li>
</ul>
<p>None of these are reasons not to run a historian; you can&rsquo;t do serious
manufacturing without one. They&rsquo;re the reason it&rsquo;s a system of record, not a
source of answers &mdash; and the reason the recall only pays off once something on top
of it knows what the numbers mean.</p>
<hr />
<h2 id="the-one-line">The one line</h2>
<p>A historian is the right place to remember what the plant did, and the wrong thing to
mistake for a system that understands it. The identity, the relationships, and the
meaning it lacks are exactly what a <a href="/architecture">context layer adds on top</a>
&mdash; treating the historian as a first-class source, not a rival.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based
model of a plant &mdash; its assets, its history, its documents, and the tribal
knowledge in between &mdash; that <a href="/use-cases">AI agents can actually reason over</a>. If your historian
remembers everything and understands nothing, talk to us.</p>
</blockquote>`
