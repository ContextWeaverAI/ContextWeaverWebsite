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
<p>Walk into most factories that have &ldquo;gone digital&rdquo; and ask to see
the integration diagram. You&rsquo;ll get a photograph of a whiteboard with thirty
arrows on it. The PLC talks to the SCADA. The SCADA talks to the historian. The
historian feeds a reporting database. The MES pulls from the historian and pushes
to the ERP. Someone wired a Python script from the ERP to a Power BI dashboard two
years ago, and the person who wrote it has left.</p>
<p>Every one of those arrows is a bespoke, point-to-point integration. Custom
protocol on one end, custom mapping on the other, a brittle handoff in the middle.
It&rsquo;s the same failure mode any backend engineer has watched a microservices
estate fall into without a <a href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html" target="_blank" rel="noopener noreferrer">message bus</a>: N systems, N&sup2; connections, and every
new consumer means touching every producer. Eight systems is twenty-eight
integrations. Add a ninth and you owe eight more.</p>
<p>If that made you wince, you already understand the unified namespace. Because a
UNS is the OT world rediscovering the message broker.</p>
<figure class="diagram">
<svg viewBox="0 0 680 330" role="img" aria-labelledby="dg1-title">
<title id="dg1-title">Point-to-point integrations versus a single message broker</title>
<line class="dg-divider" x1="340" y1="20" x2="340" y2="312" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="170" y="26" text-anchor="middle">Point-to-point</text>
<text class="dg-panel-title" x="510" y="26" text-anchor="middle">Through a broker</text>
<g class="dg-mesh">
<line x1="165" y1="87" x2="232.5" y2="126" /><line x1="165" y1="87" x2="232.5" y2="204" /><line x1="165" y1="87" x2="165" y2="243" /><line x1="165" y1="87" x2="97.5" y2="204" /><line x1="165" y1="87" x2="97.5" y2="126" /><line x1="232.5" y1="126" x2="232.5" y2="204" /><line x1="232.5" y1="126" x2="165" y2="243" /><line x1="232.5" y1="126" x2="97.5" y2="204" /><line x1="232.5" y1="126" x2="97.5" y2="126" /><line x1="232.5" y1="204" x2="165" y2="243" /><line x1="232.5" y1="204" x2="97.5" y2="204" /><line x1="232.5" y1="204" x2="97.5" y2="126" /><line x1="165" y1="243" x2="97.5" y2="204" /><line x1="165" y1="243" x2="97.5" y2="126" /><line x1="97.5" y1="204" x2="97.5" y2="126" />
</g>
<circle class="dg-node" cx="165" cy="87" r="8" /><circle class="dg-node" cx="232.5" cy="126" r="8" /><circle class="dg-node" cx="232.5" cy="204" r="8" /><circle class="dg-node" cx="165" cy="243" r="8" /><circle class="dg-node" cx="97.5" cy="204" r="8" /><circle class="dg-node" cx="97.5" cy="126" r="8" />
<text class="dg-sub" x="165" y="74" text-anchor="middle">ERP</text><text class="dg-sub" x="246" y="123" text-anchor="start">MES</text><text class="dg-sub" x="246" y="209" text-anchor="start">Dashboard</text><text class="dg-sub" x="165" y="266" text-anchor="middle">Historian</text><text class="dg-sub" x="84" y="209" text-anchor="end">SCADA</text><text class="dg-sub" x="84" y="123" text-anchor="end">PLC</text>
<g class="dg-spoke">
<line x1="505" y1="165" x2="505" y2="87" /><line x1="505" y1="165" x2="572.5" y2="126" /><line x1="505" y1="165" x2="572.5" y2="204" /><line x1="505" y1="165" x2="505" y2="243" /><line x1="505" y1="165" x2="437.5" y2="204" /><line x1="505" y1="165" x2="437.5" y2="126" />
</g>
<circle class="dg-node" cx="505" cy="87" r="8" /><circle class="dg-node" cx="572.5" cy="126" r="8" /><circle class="dg-node" cx="572.5" cy="204" r="8" /><circle class="dg-node" cx="505" cy="243" r="8" /><circle class="dg-node" cx="437.5" cy="204" r="8" /><circle class="dg-node" cx="437.5" cy="126" r="8" />
<circle class="dg-hub" cx="505" cy="165" r="21" />
<text class="dg-accent-text" x="505" y="169" text-anchor="middle">UNS</text>
<text class="dg-sub" x="505" y="74" text-anchor="middle">ERP</text><text class="dg-sub" x="586" y="123" text-anchor="start">MES</text><text class="dg-sub" x="586" y="209" text-anchor="start">Dashboard</text><text class="dg-sub" x="505" y="266" text-anchor="middle">Historian</text><text class="dg-sub" x="424" y="209" text-anchor="end">SCADA</text><text class="dg-sub" x="424" y="123" text-anchor="end">PLC</text>
<text class="dg-sub" x="170" y="304" text-anchor="middle" style="font-weight:600">15 brittle links</text>
<text class="dg-sub" x="510" y="304" text-anchor="middle" style="font-weight:600">6 links</text>
</svg>
<figcaption>Six systems wired directly need fifteen brittle links, and every new consumer means touching every producer. Publish to a broker instead and it collapses to six &mdash; add a system and you just subscribe.</figcaption>
</figure>
<hr />
<h2 id="what-a-uns-actually-is">What a UNS actually is</h2>
<p>Strip the manufacturing vocabulary away and a unified namespace is a
<strong>pub/sub event bus for the plant floor.</strong></p>
<p>There&rsquo;s a broker in the middle &mdash; almost always <a href="https://mqtt.org/" target="_blank" rel="noopener noreferrer">MQTT</a> &mdash; and
everything on the plant publishes its current state to it instead of wiring
directly to consumers. A pump publishes its pressure. A line publishes its running
state. The MES publishes the active work order. Anyone who wants that data
subscribes to the broker. Nobody talks to anybody directly.</p>
<p>Two design choices make it more than &ldquo;MQTT with some topics&rdquo;:</p>
<ul>
<li><strong>A single hierarchical namespace.</strong> Topics follow the physical
structure of the business &mdash; <code>enterprise/site/area/line/cell/asset/signal</code>.
It&rsquo;s <a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95" target="_blank" rel="noopener noreferrer">ISA-95</a> as a naming convention, and it&rsquo;s the same idea as a
filesystem path, a REST resource tree, or a DNS name: a hierarchy that
<em>means something</em>, so any client can navigate it without a decoder ring.</li>
<li><strong>Report by exception, current state on the broker.</strong> Publishers
emit only when a value changes &mdash; usually via <a href="https://sparkplug.eclipse.org/" target="_blank" rel="noopener noreferrer">Sparkplug B</a>, which adds a schema
envelope on top of raw MQTT: birth/death certificates, declared data types,
sequence numbers. The broker retains the latest value of everything. Subscribe to a
topic and you get the current state of the plant immediately, then every change
after it.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 280" role="img" aria-labelledby="dg2-title">
<title id="dg2-title">A unified namespace topic as a hierarchical path</title>
<g class="dg-connector">
<path d="M36 52 V75 H54" /><path d="M70 92 V115 H88" /><path d="M104 132 V155 H122" /><path d="M138 172 V195 H156" /><path d="M172 212 V235 H190" />
</g>
<rect class="dg-box" x="20" y="18" width="230" height="34" rx="8" />
<text class="dg-mono" x="36" y="40">enterprise</text>
<rect class="dg-box" x="54" y="58" width="230" height="34" rx="8" />
<text class="dg-mono" x="70" y="80">dublin-site</text>
<rect class="dg-box" x="88" y="98" width="230" height="34" rx="8" />
<text class="dg-mono" x="104" y="120">packaging</text>
<rect class="dg-box" x="122" y="138" width="230" height="34" rx="8" />
<text class="dg-mono" x="138" y="160">line2</text>
<rect class="dg-box" x="156" y="178" width="230" height="34" rx="8" />
<text class="dg-mono" x="172" y="200">filler</text>
<rect class="dg-box-accent" x="190" y="218" width="230" height="34" rx="8" />
<text class="dg-mono" x="206" y="240" style="fill:var(--orange)">PT_004</text>
<text class="dg-sub" x="336" y="240">4.2 bar</text>
</svg>
<figcaption><code>enterprise/site/area/line/asset/signal</code> &mdash; ISA-95 as a naming convention, readable like a filesystem path. But a path is a hierarchy, not a graph: it knows the transmitter sits under the filler, not what the filler feeds.</figcaption>
</figure>
<p>That&rsquo;s the whole idea. A single, real-time, hierarchically-named broadcast
of what is true on the plant floor right now.</p>
<hr />
<h2 id="what-it-solves">What it solves</h2>
<p>The win is exactly the win a message bus gives you in software:
<strong>decoupling.</strong></p>
<p>Producers stop knowing about consumers. The pump publishes its pressure once and
doesn&rsquo;t care whether that&rsquo;s read by the historian, a dashboard, a
maintenance model, or nothing at all. Add a new consumer &mdash; a fresh analytics
tool, an AI agent, a second dashboard &mdash; and you subscribe. You touch zero
producers. The N&sup2; spaghetti collapses to N connections into a hub.</p>
<p>You also get a single source of truth for current state. No more &ldquo;the SCADA
says the line is up but the MES says it&rsquo;s down&rdquo; &mdash; one topic, one
value, one broadcast everyone reads. Edge-driven, real-time, sub-second.</p>
<p>For the problem of <em>moving data around a factory</em>, this is a genuine,
hard-won architectural improvement. The industry is right to be excited about
it.</p>
<hr />
<h2 id="where-it-fits">Where it fits</h2>
<p>A UNS is a <strong>data-movement layer.</strong> It sits above the OT floor
&mdash; PLCs, SCADA, sensors &mdash; and feeds everything above it: historians,
MES, analytics, cloud, dashboards, models. It&rsquo;s the transport. The nervous
system carrying the signals.</p>
<figure class="diagram">
<svg viewBox="0 0 560 300" role="img" aria-labelledby="dg3-title">
<title id="dg3-title">Where a unified namespace sits: a transport layer between the OT floor and its consumers</title>
<rect class="dg-box" x="20" y="20" width="520" height="78" rx="10" />
<text class="dg-label" x="40" y="50">Consumers</text>
<text class="dg-sub" x="40" y="74">historian &middot; MES &middot; analytics &middot; cloud &middot; dashboards &middot; AI agents</text>
<rect class="dg-box-accent" x="20" y="126" width="520" height="66" rx="10" />
<text class="dg-label" x="40" y="156" style="fill:var(--orange)">Unified Namespace</text>
<text class="dg-sub" x="40" y="178">MQTT broker &mdash; transport &amp; current state, not a system of record</text>
<rect class="dg-box" x="20" y="220" width="520" height="60" rx="10" />
<text class="dg-label" x="40" y="248">OT floor</text>
<text class="dg-sub" x="40" y="270">PLCs &middot; SCADA &middot; sensors</text>
<g class="dg-connector">
<path d="M140 218 V200" /><path d="M280 218 V200" /><path d="M420 218 V200" /><path d="M140 124 V106" /><path d="M280 124 V106" /><path d="M420 124 V106" />
</g>
<g class="dg-arrow">
<polygon points="135,203 145,203 140,195" /><polygon points="275,203 285,203 280,195" /><polygon points="415,203 425,203 420,195" /><polygon points="135,109 145,109 140,101" /><polygon points="275,109 285,109 280,101" /><polygon points="415,109 425,109 420,101" />
</g>
</svg>
<figcaption>A UNS is a data-movement layer: it carries signals up from the plant floor to everything that consumes them, but nothing is remembered or understood inside it. A message broker is transport, not a system of record.</figcaption>
</figure>
<p>What it is <em>not</em> is a place where anything is remembered or understood. And
this is where a technologist&rsquo;s instincts should start twitching, because
<strong>a message broker is transport, not a system of record.</strong> Kafka is
not your database. The event bus is not your domain model. We learned this the hard
way in software. Manufacturing is, understandably, still learning it &mdash; because
the UNS is so useful for movement that it&rsquo;s tempting to treat it as the
destination.</p>
<p>It isn&rsquo;t. Here&rsquo;s why.</p>
<hr />
<h2 id="the-example">The specific example: a quality excursion on Line 2</h2>
<p>It&rsquo;s a Tuesday. A quality check flags a defect on Line 2&rsquo;s filler.
Someone has to answer <em>why</em>, and fast.</p>
<p>The UNS is brilliant for the first thirty seconds. Subscribe to
<code>.../line2/filler/PT_004</code> and you have the live pressure on the
filler&rsquo;s pressure transmitter, instantly, alongside the current state of every
asset on the line. No integration project, no ticket, no waiting. That&rsquo;s the
pub/sub payoff, exactly as advertised.</p>
<p>Then the actual investigation starts, and the UNS runs out of road:</p>
<ul>
<li><strong>&ldquo;What was the pressure doing twenty minutes ago?&rdquo;</strong> The
broker holds current state, not history. It&rsquo;s a last-value cache, not an event
store &mdash; there&rsquo;s no log to replay. That&rsquo;s what the historian is for,
and now you&rsquo;re querying a second system.</li>
<li><strong>&ldquo;What feeds this filler, and what does it feed?&rdquo;</strong> The
topic string <code>enterprise/site/area/line2/filler</code> encodes a hierarchy, not
a graph. It knows the filler sits under Line 2. It does not know the filler feeds the
capper downstream, or that they share a glycol loop. There are no relationships
beyond the path.</li>
<li><strong>&ldquo;What&rsquo;s the SOP for this seal?&rdquo;</strong> Not in the
UNS. Documents aren&rsquo;t signals.</li>
<li><strong>&ldquo;Didn&rsquo;t someone flag this seal last week?&rdquo;</strong>
Definitely not in the UNS. The shift-handover note where an operator wrote
<em>&ldquo;seal sounded off again&rdquo;</em> is the kind of
<a href="/blog/voice-agent-tradeoffs-part-1">tribal knowledge</a> that lives in a chat
thread, and a message broker has nowhere to put it.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 292" role="img" aria-labelledby="dg4-title">
<title id="dg4-title">Of five root-cause questions, the unified namespace answers only one</title>
<circle class="dg-ok" cx="34" cy="42" r="15" />
<polyline class="dg-glyph" points="27,42 32,48 41,35" />
<text class="dg-label-sm" x="64" y="47">Live pressure on PT_004, right now</text>
<rect class="dg-chip-accent" x="430" y="27" width="182" height="30" rx="15" />
<text class="dg-accent-text" x="521" y="46" text-anchor="middle" style="font-size:12px">UNS answers this</text>
<circle class="dg-no" cx="34" cy="98" r="15" />
<line class="dg-glyph-no" x1="27" y1="98" x2="41" y2="98" />
<text class="dg-label-sm" x="64" y="103">What was it doing 20 minutes ago?</text>
<rect class="dg-chip" x="430" y="83" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="102" text-anchor="middle">needs the historian</text>
<circle class="dg-no" cx="34" cy="154" r="15" />
<line class="dg-glyph-no" x1="27" y1="154" x2="41" y2="154" />
<text class="dg-label-sm" x="64" y="159">What feeds this filler, and what does it feed?</text>
<rect class="dg-chip" x="430" y="139" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="158" text-anchor="middle">needs a graph / model</text>
<circle class="dg-no" cx="34" cy="210" r="15" />
<line class="dg-glyph-no" x1="27" y1="210" x2="41" y2="210" />
<text class="dg-label-sm" x="64" y="215">What&rsquo;s the SOP for this seal?</text>
<rect class="dg-chip" x="430" y="195" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="214" text-anchor="middle">needs documents</text>
<circle class="dg-no" cx="34" cy="266" r="15" />
<line class="dg-glyph-no" x1="27" y1="266" x2="41" y2="266" />
<text class="dg-label-sm" x="64" y="271">Didn&rsquo;t someone flag this last week?</text>
<rect class="dg-chip" x="430" y="251" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="270" text-anchor="middle">needs tribal knowledge</text>
</svg>
<figcaption>The pub/sub payoff is real for the first question &mdash; live state, instantly. The other four need history, a typed model, documents, and human context: none of which a transport layer was built to hold.</figcaption>
</figure>
<p>Five questions. The UNS answered one. The rest need history, a real domain model
with typed relationships, documents, and human context &mdash; none of which a
transport layer was ever designed to hold. It&rsquo;s a nervous system without a
memory or a model.</p>
<hr />
<h2 id="the-world-isnt-a-tree">The world isn&rsquo;t a tree</h2>
<p>Here&rsquo;s the part that looks trivial on a slide and turns into months of
meetings: the namespace is a <strong>strict hierarchy</strong>, and a real plant
isn&rsquo;t one. <code>enterprise/site/area/line/cell/asset</code> is a tree &mdash;
every asset has exactly one parent. That holds right up until the first resource
that&rsquo;s <em>shared</em>, because a tree cannot say &ldquo;belongs to many.&rdquo;</p>
<figure class="diagram">
<svg viewBox="0 0 640 342" role="img" aria-labelledby="dg5-title">
<title id="dg5-title">A shared resource has no single parent in the hierarchy</title>
<g class="dg-connector">
<path d="M320 76 V113" /><path d="M130 113 H510" /><path d="M130 113 V150" /><path d="M320 113 V150" /><path d="M510 113 V150" />
</g>
<rect class="dg-box" x="255" y="34" width="130" height="42" rx="9" />
<text class="dg-label" x="320" y="60" text-anchor="middle">Plant</text>
<rect class="dg-box" x="70" y="150" width="120" height="42" rx="9" />
<text class="dg-label" x="130" y="176" text-anchor="middle">Line 1</text>
<rect class="dg-box" x="260" y="150" width="120" height="42" rx="9" />
<text class="dg-label" x="320" y="176" text-anchor="middle">Line 2</text>
<rect class="dg-box" x="450" y="150" width="120" height="42" rx="9" />
<text class="dg-label" x="510" y="176" text-anchor="middle">Line 3</text>
<g class="dg-spoke">
<line x1="255" y1="250" x2="132" y2="194" stroke-dasharray="5 4" /><line x1="320" y1="250" x2="320" y2="194" stroke-dasharray="5 4" /><line x1="385" y1="250" x2="508" y2="194" stroke-dasharray="5 4" />
</g>
<rect class="dg-box-accent" x="195" y="248" width="250" height="52" rx="10" />
<text class="dg-label" x="320" y="272" text-anchor="middle" style="fill:var(--orange)">Shared utility</text>
<text class="dg-sub" x="320" y="290" text-anchor="middle">one glycol loop &middot; feeds every line</text>
<line class="dg-connector" x1="150" y1="324" x2="185" y2="324" />
<text class="dg-sub" x="192" y="328" text-anchor="start">hierarchy (one parent)</text>
<line class="dg-spoke" x1="360" y1="324" x2="395" y2="324" stroke-dasharray="5 4" />
<text class="dg-sub" x="402" y="328" text-anchor="start">shared (belongs to many)</text>
</svg>
<figcaption>The tree gives every asset one parent. A shared utility &mdash; a glycol loop, a
compressor house, a CIP skid &mdash; feeds many lines at once, so its real dependencies
(orange) cut clean across the hierarchy. Model the plant as a tree and those edges have
nowhere to live.</figcaption>
</figure>
<p>Take the glycol loop from earlier. One refrigeration skid chills the jacket on Line
2&rsquo;s filler <em>and</em> Line 4&rsquo;s. Where does it live &mdash; under
<code>line2</code>, under <code>line4</code>, or under a <code>utilities</code> branch
where the fact that it&rsquo;s load-bearing for two production lines quietly vanishes?
Every option is wrong in a different way. And it&rsquo;s everywhere once you look:</p>
<ul>
<li><strong>Shared utilities.</strong> One compressor house feeding every line; a
boiler, a DI-water system, an electrical feeder that spans areas. Physically upstream
of everything, structurally a child of nothing.</li>
<li><strong>A CIP skid</strong> cleaning a dozen tanks across the plant on a rotating
schedule &mdash; time-multiplexed ownership that no fixed path can express.</li>
<li><strong>A batch that flows reactor &rarr; filter &rarr; dryer &rarr; packaging</strong>,
crossing the very physical units the tree keeps in separate branches. The equipment
hierarchy (ISA-95) and the batch genealogy (ISA-88) are two different graphs stapled to
the same steel.</li>
<li><strong>A mold or die</strong> whose history follows the tool as it moves between
presses &mdash; not the press it happens to sit in this week.</li>
</ul>
<p>The real topology is a <strong>graph</strong>: many-to-many, full of lateral
dependencies and things that move. Force it into one tree and you&rsquo;re choosing a
single spanning path and dropping every edge that doesn&rsquo;t fit &mdash; either
duplicating a resource under several branches (congratulations, you now own a sync
problem) or crowning one arbitrary parent and losing the rest. It&rsquo;s the lesson
software keeps relearning: filesystems, org charts, category trees &mdash; every strict
hierarchy eventually meets the thing that belongs in two places at once.</p>
<hr />
<h2 id="the-hard-parts">What it costs to run one</h2>
<p>None of this is free, and the marketing rarely mentions the bill. A UNS is
production infrastructure, and standing one up runs into the same walls any
distributed system does.</p>
<ul>
<li><strong>Modeling the namespace is the actual project.</strong>
&ldquo;Just publish to <code>enterprise/site/area/&hellip;</code>&rdquo; hides the
hard part: someone has to design that hierarchy, get every plant to agree on it, and
live with it for a decade. It&rsquo;s schema design with organizational politics
attached &mdash; rename a level two years in and every subscriber breaks.</li>
<li><strong>Getting data onto the broker is real integration work.</strong> The pump
doesn&rsquo;t speak MQTT. Between it and the namespace sit edge gateways and protocol
drivers &mdash; OPC-UA, Modbus, proprietary PLC dialects &mdash; plus
report-by-exception tuning so you publish changes, not a firehose. The N&sup2;
spaghetti doesn&rsquo;t vanish; it moves to the edge.</li>
<li><strong>You now operate a broker.</strong> High availability, TLS, auth and
ACLs, the OT/IT security boundary, and &mdash; on Sparkplug &mdash; primary-host and
birth/death state edge cases. That&rsquo;s Kafka-grade ops landing on a team that may
never have run a message bus.</li>
<li><strong>It still isn&rsquo;t memory or a model.</strong> Even done perfectly,
everything from the last section &mdash; history, relationships, documents, human
context &mdash; is still somebody else&rsquo;s problem.</li>
</ul>
<p>None of these are reasons not to build a UNS. They&rsquo;re the reasons it&rsquo;s
a project, not a switch you flip &mdash; and the reason the payoff only really lands
once something on top of it turns those signals into answers.</p>
<hr />
<h2 id="the-one-line">The one line</h2>
<p>A unified namespace is the right way to move data around a plant, and the wrong
thing to mistake for the place data <em>lives</em>. The memory, the model, and the
provenance it lacks are exactly what a <a href="/architecture">context layer adds on top</a>
&mdash; treating the UNS as a first-class source, not a rival.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based
model of a plant &mdash; its assets, its history, its documents, and the tribal
knowledge in between &mdash; that <a href="/use-cases">AI agents can actually reason over</a>. If your UNS
moves the data but nothing on the other end understands it, talk to us.</p>
</blockquote>`
