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
<p>In <a href="/blog/historian">Part 2</a>, the historian gave us Line 2&rsquo;s pressure
history in seconds and then ran out of road on a question that wasn&rsquo;t about numbers
at all: <em>which batch was on the line at 14:03, and where did that lot go next?</em> Tag
<code>PT_004</code> had never heard of batch&nbsp;#4471. The historian punted us to the
system that has &mdash; and that system is the one this piece is about.</p>
<p>Walk over to it and you&rsquo;re looking at a different kind of screen. Not a trend, a
<strong>work-order list</strong>. Order #4471, product 500&nbsp;ml SKU, a route defined
step by step, a status against each step, a timestamp, an operator&rsquo;s name. Ask which
batch ran at 14:03 and you have it instantly: #4471, filled on Line 2, released to
packaging at 14:40, palletized into shipment S-201. After two systems that knew signals
and numbers, here at last is one that knows <em>things</em> &mdash; orders, batches, lots,
the units of work the plant actually makes.</p>
<p>It feels like the missing piece. In a real sense it is. It&rsquo;s also the third
system in a row that keeps exactly the structure it was built for and quietly drops
everything that crosses it. To see why, strip the vocabulary off.</p>
<hr />
<h2 id="what-an-mes-actually-is">What an MES actually is</h2>
<p>&ldquo;MES&rdquo; barely names one thing. Ask two plants and you&rsquo;ll get two
different suites: planning and scheduling here, quality and holds there, product tracking
and genealogy, work instructions, labor, OEE &mdash; the <a href="https://www.mesa.org/" target="_blank" rel="noopener noreferrer">MESA model</a> lists around
eleven functions, and most deployments are a stack of modules from a stack of vendors. It
looks less like a product than a category.</p>
<p>Strip the vocabulary away, though, and every one of those modules is a front-end over
the <strong>same primitive: a workflow engine.</strong> A state machine per unit of work,
and an append-only log of its transitions.</p>
<p>Watch one work order move and the whole suite collapses into that shape.
<strong>Planning</strong> writes the intended path: #4471 runs on Line 2 at 14:00, recipe
R-12. <strong>Execution</strong> advances a pointer along it &mdash;
<code>dispatched &rarr; filling &rarr; capping &rarr; labeling &rarr; QA &rarr; complete</code>
&mdash; stamping each transition with the resin lot consumed, the machine, the operator.
<strong>Quality</strong> gates a transition: pass releases the order downstream; fail
forces it into <code>HOLD</code> and blocks the move until someone records a disposition.
<strong>Genealogy</strong> is nothing more than that transition log read back afterward.
Four modules, four screens, one object underneath: a unit of work with a current state, a
set of legal next states, and a durable history of how it got there.</p>
<p>If you&rsquo;ve reached for <a href="https://temporal.io/" target="_blank" rel="noopener noreferrer">Temporal</a> or a workflow engine, you
already understand an MES, because that&rsquo;s what it is: <strong>event sourcing on the
plant floor.</strong> Two properties make it more than &ldquo;a table with a status
column&rdquo;:</p>
<ul>
<li><strong>It enforces the transitions.</strong> A historian stores whatever you send it;
an MES won&rsquo;t let you ship an order that hasn&rsquo;t passed QA. The routing
isn&rsquo;t a suggestion, it&rsquo;s a guard. That&rsquo;s the &ldquo;E&rdquo; in MES
&mdash; it&rsquo;s an <em>active</em> record, one that can say no.</li>
<li><strong>The log is the record.</strong> The live question (&ldquo;where is #4471 right
now, what&rsquo;s allowed next&rdquo;) and the permanent one (&ldquo;every step it ever
went through&rdquo;) are the same event log read two ways. State is a fold over the
history. That&rsquo;s why the old argument about whether an MES is &ldquo;really&rdquo; a
state machine or &ldquo;really&rdquo; a system of record dissolves: it&rsquo;s a state
machine <em>whose transition log is the system of record.</em> One object, two faces.</li>
</ul>
<hr />
<h2 id="what-it-solves">What it solves</h2>
<p>The win is exactly the thing the last two systems structurally couldn&rsquo;t give:
<strong>identity and linkage for what the plant made.</strong></p>
<p>The UNS moved live signals; the historian remembered numbers; neither had ever heard of
a batch. The MES is built around the batch. It knows #4471 consumed resin lot RL-88, ran
on Line 2, was operated by Priya, passed QA at 14:38, and shipped in S-201 &mdash; and it
can walk that chain in either direction. That&rsquo;s <strong>genealogy</strong>, and
it&rsquo;s the backbone of every recall, every &ldquo;which units got the bad lot,&rdquo;
every regulated e-record. When a defect surfaces in the field three months out, the MES is
the system that can name the other units at risk. Building that yourself &mdash;
transactional, auditable, enforced &mdash; is genuinely hard, and the MES has it solved and
hardened. For the problem of <em>tracking what was made and making the process actually get
followed</em>, this is real, load-bearing infrastructure, and the industry is right to run
production on it.</p>
<hr />
<h2 id="where-it-fits">Where it fits</h2>
<p>An MES is a <strong>system of record for the process</strong> &mdash; the ledger of what
was made and how it moved. It sits beside the two systems from the earlier parts: the UNS
moves the live event, the historian remembers the numbers, the MES records the
<em>work</em>. In software terms, it&rsquo;s the workflow service and its event store,
sitting on the same plant as the message bus and the time-series database. A well-run
factory has all three, and needs all three.</p>
<figure class="diagram">
<svg viewBox="0 0 560 360" role="img" aria-labelledby="dgm1-title">
<title id="dgm1-title">The MES is the plant&rsquo;s execution record, and the record still sits below understanding</title>
<rect class="dg-box" x="20" y="18" width="520" height="68" rx="10" />
<text class="dg-label" x="40" y="48">Understanding</text>
<text class="dg-sub" x="40" y="72">why did it happen? &middot; why do holds keep recurring? &middot; what caused the deviation?</text>
<rect class="dg-box-accent" x="20" y="114" width="520" height="64" rx="10" />
<text class="dg-label" x="40" y="144" style="fill:var(--orange)">MES</text>
<text class="dg-sub" x="40" y="166">every order, ever &mdash; the process, its states &amp; its transitions, and nothing off it</text>
<rect class="dg-box" x="20" y="206" width="520" height="56" rx="10" />
<text class="dg-label" x="40" y="232">Historian</text>
<text class="dg-sub" x="40" y="252">every value, ever &mdash; Part 2</text>
<rect class="dg-box" x="20" y="290" width="520" height="56" rx="10" />
<text class="dg-label" x="40" y="316">Unified Namespace</text>
<text class="dg-sub" x="40" y="336">live state, in motion &mdash; Part 1</text>
<g class="dg-connector">
<path d="M140 288 V272" /><path d="M280 288 V272" /><path d="M420 288 V272" /><path d="M140 204 V188" /><path d="M280 204 V188" /><path d="M420 204 V188" /><path d="M140 112 V96" /><path d="M280 112 V96" /><path d="M420 112 V96" />
</g>
<g class="dg-arrow">
<polygon points="135,275 145,275 140,267" /><polygon points="275,275 285,275 280,267" /><polygon points="415,275 425,275 420,267" /><polygon points="135,191 145,191 140,183" /><polygon points="275,191 285,191 280,183" /><polygon points="415,191 425,191 420,183" /><polygon points="135,99 145,99 140,91" /><polygon points="275,99 285,99 280,91" /><polygon points="415,99 425,99 420,91" />
</g>
</svg>
<figcaption>The MES records the work the UNS carried and the historian measured &mdash; the plant&rsquo;s execution record. But a record of the process still sits below understanding: it can tell you what happened to every order, never why it happened. A workflow engine is a system of record, not a model.</figcaption>
</figure>
<p>What it is <em>not</em> is a place where anything is <em>understood</em> &mdash; and here
a technologist&rsquo;s instincts should twitch again, because <strong>a workflow engine
models the process, not the world the process runs in.</strong> It captures the states you
defined, on the schema you configured, and nothing else. Temporal knows your workflow ran
step 4 after step 3; it has no opinion on the machine that did step 4, the physics inside
it, or why step 4 keeps retrying. An MES is the same. It&rsquo;s so good at recording the
process that it&rsquo;s tempting to mistake the process record for a model of the plant.</p>
<p>It isn&rsquo;t. Here&rsquo;s where that cracks.</p>
<hr />
<h2 id="the-example">The specific example: the work order on Line 2</h2>
<p>Same Tuesday, same defect on Line 2&rsquo;s filler. The historian sent us here for the
batch, and the MES delivers on exactly that:</p>
<p><strong>&ldquo;Which batch ran at 14:03, and where did the lot go?&rdquo;</strong> #4471,
filled on Line 2, operator Priya, released to packaging at 14:40, into shipment S-201.
Clean, instant, auditable. This is the MES&rsquo;s home turf, and it&rsquo;s genuinely the
thing the historian couldn&rsquo;t do.</p>
<p>Then the investigation keeps going, and the MES hits a wall the shape of its own
schema:</p>
<ul>
<li><strong>&ldquo;Why did #4471 nearly fail QA?&rdquo;</strong> The MES logged the
<code>HOLD</code> and a disposition <em>code</em> &mdash; &ldquo;pressure deviation,
released on review.&rdquo; Not the cause. The 4.2-bar excursion lives in the historian; the
recipe edit that drove it lives in the control system; the MES records the
<em>outcome</em> of the step, never the physics beneath it.</li>
<li><strong>&ldquo;Was the glycol skid involved?&rdquo;</strong> The skid isn&rsquo;t a
step in any routing, so it isn&rsquo;t in the MES model at all. Off-schema, invisible
&mdash; the same shared resource the UNS&rsquo;s tree couldn&rsquo;t place and the
historian kept as an unrelated pen.</li>
<li><strong>&ldquo;Has this failure mode hit other lines, or the 2&nbsp;L SKU?&rdquo;</strong>
This MES instance knows its own orders on its own site. The cross-line relationships and
the other plant&rsquo;s identical filler live in other databases, behind other logins. Two
plants, two islands.</li>
<li><strong>&ldquo;What did Priya actually do to recover it?&rdquo;</strong> The act is a
code. The knowledge &mdash; the trick she used, the thing she watched &mdash; is free text
in a field nobody queries, or on paper, or in her head.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 292" role="img" aria-labelledby="dgm2-title">
<title id="dgm2-title">The MES answers the genealogy question, then hits its own wall</title>
<circle class="dg-ok" cx="34" cy="42" r="15" />
<polyline class="dg-glyph" points="27,42 32,48 41,35" />
<text class="dg-label-sm" x="64" y="47">Which batch ran, and where did the lot go?</text>
<rect class="dg-chip-accent" x="430" y="27" width="182" height="30" rx="15" />
<text class="dg-accent-text" x="521" y="46" text-anchor="middle" style="font-size:12px">the MES nails this</text>
<circle class="dg-no" cx="34" cy="98" r="15" />
<line class="dg-glyph-no" x1="27" y1="98" x2="41" y2="98" />
<text class="dg-label-sm" x="64" y="103">Why did #4471 nearly fail QA?</text>
<rect class="dg-chip" x="430" y="83" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="102" text-anchor="middle">needs the physics / cause</text>
<circle class="dg-no" cx="34" cy="154" r="15" />
<line class="dg-glyph-no" x1="27" y1="154" x2="41" y2="154" />
<text class="dg-label-sm" x="64" y="159">Was the glycol skid involved?</text>
<rect class="dg-chip" x="430" y="139" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="158" text-anchor="middle">off the routing &mdash; invisible</text>
<circle class="dg-no" cx="34" cy="210" r="15" />
<line class="dg-glyph-no" x1="27" y1="210" x2="41" y2="210" />
<text class="dg-label-sm" x="64" y="215">Has this hit other lines or sites?</text>
<rect class="dg-chip" x="430" y="195" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="214" text-anchor="middle">needs the asset graph</text>
<circle class="dg-no" cx="34" cy="266" r="15" />
<line class="dg-glyph-no" x1="27" y1="266" x2="41" y2="266" />
<text class="dg-label-sm" x="64" y="271">What did the operator do to recover?</text>
<rect class="dg-chip" x="430" y="251" width="182" height="30" rx="15" />
<text class="dg-sub" x="521" y="270" text-anchor="middle">tribal knowledge &mdash; a code</text>
</svg>
<figcaption>The MES answers the question the historian punted to it &mdash; perfect account of the batch and where it went. The other four need the physics, the cause, the asset graph, and the human act behind the disposition: none of which a workflow engine over a fixed routing was built to hold.</figcaption>
</figure>
<p>The MES answered the question the historian handed it, and then ran out of road at the
edge of its own routing. It knows <em>what happened to every order.</em> It has no idea
<em>why any of it happened.</em> It&rsquo;s a perfect account of the process, attached to
nothing around the process.</p>
<hr />
<h2 id="a-record-of-the-plan">A record of the plan isn&rsquo;t a model of the plant</h2>
<p>Here&rsquo;s the part a tidy work-order list hides: the MES models the world as a set of
predefined workflows on a fixed schema, and that makes it a <strong>closed world.</strong>
It is excellent at the process it was configured for, and blind to everything off-model.
Watch what falls through &mdash; and notice it&rsquo;s the same three things every
time.</p>
<figure class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-labelledby="dgm3-title">
<title id="dgm3-title">The same QA hold: a bare disposition code versus the model that explains it</title>
<line class="dg-divider" x1="300" y1="20" x2="300" y2="284" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="150" y="26" text-anchor="middle">What the MES has</text>
<text class="dg-panel-title" x="490" y="26" text-anchor="middle">What makes it a model</text>
<rect class="dg-box" x="90" y="132" width="120" height="46" rx="9" />
<text class="dg-mono" x="150" y="153" text-anchor="middle">#4471</text>
<text class="dg-sub" x="150" y="170" text-anchor="middle">HOLD &rarr; released</text>
<g class="dg-spoke">
<line x1="470" y1="133" x2="470" y2="85" /><line x1="470" y1="177" x2="470" y2="225" /><line x1="448" y1="155" x2="425" y2="155" /><line x1="492" y1="155" x2="515" y2="155" />
</g>
<rect class="dg-box" x="415" y="51" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="470" y="72" text-anchor="middle">Asset: filler</text>
<rect class="dg-box" x="415" y="225" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="470" y="246" text-anchor="middle">Spec: R-12</text>
<rect class="dg-box" x="315" y="138" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="370" y="159" text-anchor="middle">4.2 bar</text>
<rect class="dg-box" x="515" y="138" width="110" height="34" rx="8" />
<text class="dg-label-sm" x="570" y="159" text-anchor="middle">Op act: Priya</text>
<circle class="dg-hub" cx="470" cy="155" r="22" />
<text class="dg-accent-text" x="470" y="159" text-anchor="middle" style="font-size:10px">QA hold</text>
</svg>
<figcaption>To the MES, the near-miss is a bare code: order #4471, held, released on review. The same hold only becomes something you can reason about once it&rsquo;s tied to the asset it happened on, the physics that triggered it, the spec it was judged against, and what the operator did &mdash; the edges a workflow engine over a fixed routing throws away, and the difference between a recorded outcome and an explanation.</figcaption>
</figure>
<ul>
<li><strong>Identity, but only of the work.</strong> The MES has real identity where the
historian had bare strings: #4471 is a <em>thing</em>, not a tag. But only units of work
are things. The oven, the glycol skid, the filler itself &mdash; the physical assets the
work runs <em>on</em> &mdash; are at most attributes on a routing, not first-class objects
with histories of their own.</li>
<li><strong>Linkage, but only along the routing.</strong> The MES has edges the historian
dropped: batch to lot to shipment, in a clean chain. But every edge that doesn&rsquo;t run
along the process is still gone. The filler and the glycol skid share one physical loop; to
the MES they share nothing, because the loop isn&rsquo;t a step. It keeps the edges it was
told to model and drops the ones the plant actually has &mdash; the same graph the
UNS&rsquo;s tree couldn&rsquo;t hold and the historian didn&rsquo;t either.</li>
<li><strong>The event, but not the cause.</strong> It records that #4471 went on hold and
was released. Not the pressure excursion that triggered it, not the recipe change that
caused <em>that</em>, not what the operator understood in the moment. The symptom is a
state transition; the cause and the context are in three other systems, or in
someone&rsquo;s head.</li>
</ul>
<p>An order record is a fact &mdash; precise, auditable, true. It just isn&rsquo;t a model.
A model would tie the process to the assets it ran on, the physics the historian measured,
the documents that specify it, and the people who intervened. That&rsquo;s identity across
<em>all</em> the plant&rsquo;s objects, edges that cross schemas, and meaning that survives
the join &mdash; exactly what a workflow engine over a fixed routing was never built to
carry. A state machine can tell you a unit went on hold. It takes a model to tell you why
holds keep happening.</p>
<hr />
<h2 id="the-hard-parts">What it costs to run one</h2>
<p>None of this is free, and of the three systems in this series the MES has the worst
reputation for a reason. Standing one up runs into walls that are, by now, familiar.</p>
<ul>
<li><strong>The process model is the actual project.</strong> &ldquo;Put in an MES&rdquo;
hides the hard part: someone configures every routing, BOM, quality plan, and work
instruction for every product on every line &mdash; and then owns it as the plant changes
underneath them. It&rsquo;s a multi-year build that&rsquo;s partly obsolete on go-live,
because the floor moved while you were modeling it. Schema design with a change-control
board attached.</li>
<li><strong>Rigidity is the price of enforcement.</strong> The same guard that guarantees
QA-before-ship makes every real-world exception &mdash; a rush order, a manual rework, a
one-off deviation &mdash; a fight with the system. Push too hard and operators route around
the MES, keeping the truth on a clipboard, and the as-run record quietly drifts from what
actually ran.</li>
<li><strong>One MES per plant, and they don&rsquo;t federate.</strong> Deep vendor lock
(<a href="https://www.rockwellautomation.com/" target="_blank" rel="noopener noreferrer">Rockwell</a>, Siemens Opcenter, <a href="https://www.aveva.com/" target="_blank" rel="noopener noreferrer">AVEVA</a>), a <a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95" target="_blank" rel="noopener noreferrer">B2MML / ISA-95</a> integration to talk to
ERP, and every site its own island with its own conventions. The cross-plant question has
nowhere to live.</li>
<li><strong>It still isn&rsquo;t a model.</strong> Even done perfectly, you have a flawless
account of the process and zero understanding of the plant. The assets, the physics, the
documents, the tribal knowledge &mdash; still somebody else&rsquo;s problem.</li>
</ul>
<p>None of these are reasons not to run an MES; you can&rsquo;t do serious, regulated
manufacturing without one. They&rsquo;re the reason it&rsquo;s a system of record for the
process, not a source of answers about the plant &mdash; and the reason the record only
pays off once something on top of it knows what the process was running on.</p>
<hr />
<h2 id="the-one-line">The one line</h2>
<p>An MES is the right place to record how work moved through the plant, and the wrong
thing to mistake for a model of the plant it moved through. The assets, the relationships,
the physics, and the meaning it can&rsquo;t hold are exactly what a
<a href="/architecture">context layer adds on top</a> &mdash; treating the MES as a
first-class source, not a rival.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model
of a plant &mdash; its assets, its history, its documents, and the tribal knowledge in
between &mdash; that <a href="/use-cases">AI agents can actually reason over</a>. If your
MES records every step and understands none of it, talk to us.</p>
</blockquote>`
