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
.blog-prose .dg-alt{stroke:var(--orange);stroke-width:1.75;fill:none;}
.blog-prose .dg-alt-arrow{fill:var(--orange);}
.blog-prose .dg-alt-text{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-alt-box{fill:color-mix(in oklch,var(--orange) 12%,var(--card));stroke:var(--orange);stroke-width:1.5;}
.blog-prose p.pivot{margin:2.75rem 0;text-align:center;font-size:1.7rem;line-height:1.3;font-weight:650;letter-spacing:-.02em;font-style:italic;color:var(--foreground);}
.blog-prose p.pivot::before{content:"";display:block;width:52px;height:3px;margin:0 auto 1.4rem;border-radius:2px;background:var(--orange);}
@media (max-width:640px){.blog-prose p.pivot{font-size:1.35rem;margin:2.25rem 0;}}
.blog-prose pre.impl{margin:1.6rem 0;padding:1.15rem 1.35rem;border:1px solid var(--border);border-radius:12px;background:color-mix(in oklch,var(--muted) 55%,var(--card));font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem;line-height:1.6;color:var(--foreground);overflow-x:auto;white-space:pre;}
</style>
<p>Three parts, one number. <code>PT_004</code> on Line 2&rsquo;s filler read 4.2&nbsp;bar
last Tuesday: <a href="/blog/scada">SCADA</a> sensed it and threw the alarm, the
<a href="/blog/unified-namespace">unified namespace</a> carried it, the
<a href="/blog/historian">historian</a> filed it away. Part 3 landed on the sharpest version
of the problem &mdash; SCADA is the one layer with a hand on the plant, and it acts on that
number with a reflex against a threshold, never a judgment about it.</p>
<p>Now ask a question that number cannot answer at any of those three layers.</p>
<p class="pivot">What was the plant making at the time?</p>
<p>Not what the pressure was. What was <strong>in</strong> the machine &mdash; which batch,
on which order, from which resin lot, bound for which shipment. Tag <code>PT_004</code> has
never heard of batch&nbsp;#4471, and no amount of sensing, moving, or remembering a pressure
reading will introduce them. That question belongs to a different system, because it belongs
to a different axis of the plant: not the signal, but the work.</p>
<p>Walk over and the screen changes: not a trend, a <strong>work-order list</strong>. Order
#4471, 500&nbsp;ml SKU, a route, a status against each step, an operator&rsquo;s name. Ask
which batch ran at 14:03 and it answers instantly. After three systems that knew only signals
and numbers, here is one that knows <em>things</em> &mdash; orders, batches, lots. It feels
like the missing piece, and in part it is. Strip the vocabulary off and you can see both why
it helps, and where it stops.</p>
<hr />
<h2 id="what-an-mes-actually-is">What an MES actually is</h2>
<p>&ldquo;MES&rdquo; barely names one thing. Ask two plants and you&rsquo;ll get two
different suites: planning and scheduling here, quality and holds there, product tracking
and genealogy, work instructions, labor, OEE &mdash; the <a href="https://mesa.org/topics-resources/mesa-model/history-of-the-mesa-models/" target="_blank" rel="noopener noreferrer">MESA model</a> lists around
eleven functions, and most deployments are a stack of modules from a stack of vendors. It
looks less like a product than a category.</p>
<p>Strip the vocabulary away, though, and every one of those modules is a front-end over
the <strong>same primitive: a workflow engine.</strong> A state machine per unit of work,
and an append-only log of its transitions.</p>
<p>Watch one work order move and the suite collapses into that shape.
<strong>Planning</strong> writes the intended path, <strong>Execution</strong> walks the
order along it and stamps each step, <strong>Quality</strong> gates the moves, and
<strong>Genealogy</strong> is just the log read back afterward. Four modules, one object: a
unit of work with a current state, a set of legal next states, and a durable history of how
it got there. On a slide it looks like a clean line.</p>
<figure class="diagram">
<svg viewBox="0 0 660 322" role="img" aria-labelledby="dgm0-title">
<title id="dgm0-title">The happy-path state machine versus the one you actually ship</title>
<line class="dg-divider" x1="300" y1="40" x2="300" y2="300" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="150" y="30" text-anchor="middle">The happy path</text>
<text class="dg-panel-title" x="480" y="30" text-anchor="middle">What you actually ship</text>
<rect class="dg-box" x="82" y="52" width="136" height="34" rx="8" /><text class="dg-label-sm" x="150" y="74" text-anchor="middle">DISPATCHED</text>
<rect class="dg-box" x="82" y="101" width="136" height="34" rx="8" /><text class="dg-label-sm" x="150" y="123" text-anchor="middle">FILLING</text>
<rect class="dg-box" x="82" y="150" width="136" height="34" rx="8" /><text class="dg-label-sm" x="150" y="172" text-anchor="middle">CAPPING</text>
<rect class="dg-box" x="82" y="199" width="136" height="34" rx="8" /><text class="dg-label-sm" x="150" y="221" text-anchor="middle">QA</text>
<rect class="dg-box" x="82" y="248" width="136" height="34" rx="8" /><text class="dg-label-sm" x="150" y="270" text-anchor="middle">RELEASED</text>
<g class="dg-connector"><path d="M150 86 V99" /><path d="M150 135 V148" /><path d="M150 184 V197" /><path d="M150 233 V246" /></g>
<g class="dg-arrow"><polygon points="145,99 155,99 150,105" /><polygon points="145,148 155,148 150,154" /><polygon points="145,197 155,197 150,203" /><polygon points="145,246 155,246 150,252" /></g>
<rect class="dg-box" x="395" y="52" width="120" height="34" rx="8" /><text class="dg-label-sm" x="455" y="74" text-anchor="middle">DISPATCHED</text>
<rect class="dg-box" x="395" y="101" width="120" height="34" rx="8" /><text class="dg-label-sm" x="455" y="123" text-anchor="middle">FILLING</text>
<rect class="dg-box" x="395" y="150" width="120" height="34" rx="8" /><text class="dg-label-sm" x="455" y="172" text-anchor="middle">CAPPING</text>
<rect class="dg-box" x="395" y="199" width="120" height="34" rx="8" /><text class="dg-label-sm" x="455" y="221" text-anchor="middle">QA</text>
<rect class="dg-box" x="395" y="248" width="120" height="34" rx="8" /><text class="dg-label-sm" x="455" y="270" text-anchor="middle">RELEASED</text>
<g class="dg-connector"><path d="M455 86 V99" /><path d="M455 135 V148" /><path d="M455 184 V197" /><path d="M455 233 V246" /></g>
<g class="dg-arrow"><polygon points="450,99 460,99 455,105" /><polygon points="450,148 460,148 455,154" /><polygon points="450,197 460,197 455,203" /><polygon points="450,246 460,246 455,252" /></g>
<path class="dg-alt" d="M395 216 C 348 205, 348 130, 393 118" />
<polygon class="dg-alt-arrow" points="389,113 389,123 397,118" />
<text class="dg-alt-text" x="340" y="170" text-anchor="middle">rework</text>
<path class="dg-alt" d="M515 216 H544" />
<polygon class="dg-alt-arrow" points="544,211 544,221 551,216" />
<rect class="dg-alt-box" x="551" y="199" width="94" height="34" rx="8" /><text class="dg-alt-text" x="598" y="220" text-anchor="middle">HOLD</text>
<path class="dg-alt" d="M598 233 V246" />
<polygon class="dg-alt-arrow" points="593,246 603,246 598,252" />
<rect class="dg-alt-box" x="551" y="248" width="94" height="34" rx="8" /><text class="dg-alt-text" x="598" y="269" text-anchor="middle">SCRAP</text>
<path class="dg-alt" d="M551 226 C 532 236, 524 254, 517 261" />
<polygon class="dg-alt-arrow" points="521,255 522,265 514,261" />
<text class="dg-sub" x="480" y="298" text-anchor="middle" style="font-size:11px">+ splits, merges, resume-from-hold, manual overrides&hellip;</text>
</svg>
<figcaption>Left: the state machine as it&rsquo;s pitched &mdash; a handful of steps in a row. Right: the one you actually ship. Rework loops, holds, scrap, splits and manual overrides are all real transitions someone has to define, and there is always one more. Modeling the happy path takes an afternoon; modeling the exceptions is the project.</figcaption>
</figure>
<p>That gap is where MES work actually lives. A unit fails QA and loops back for rework
&mdash; from which step? A batch splits into two pallets bound for different customers, and
one order becomes two genealogies. A line stops mid-fill and resumes an hour later &mdash;
same run, or not? An operator forces a move the model never allowed. Each is a transition
someone has to define, and no two plants define them the same way. Modeling the happy path
is an afternoon; modeling every exception is the multi-year project, and most of why no two
MES deployments look alike.</p>
<p>None of it needs an exotic engine, though. The core of an MES is two tables and a
rule:</p>
<pre class="impl">CREATE TABLE order_event (      -- the append-only log
  order_id   int,
  from_state text,
  to_state   text,
  at         timestamptz,
  operator   text
);

-- batch #4471&rsquo;s whole life, one row per transition:
--   (none)      &rarr; DISPATCHED   14:00   scheduler
--   DISPATCHED  &rarr; FILLING      14:03   priya
--   FILLING     &rarr; QA           14:36   priya
--   QA          &rarr; HOLD         14:37   qa-check
--   HOLD        &rarr; RELEASED     14:40   r.menon

-- &ldquo;current state&rdquo; isn&rsquo;t stored. it&rsquo;s a fold over the log:
SELECT to_state FROM order_event
WHERE order_id = 4471
ORDER BY at DESC LIMIT 1;        -- &rarr; RELEASED</pre>
<p>That&rsquo;s the heart of it. An append-only <code>order_event</code> log, a
<code>transitions</code> table listing which moves are legal, and a current state that
isn&rsquo;t stored but <em>derived</em> &mdash; a fold over the log. This is
<strong>event sourcing</strong>, and you can stand the core up on Postgres in an afternoon.
<a href="https://temporal.io/" target="_blank" rel="noopener noreferrer">Temporal</a>,
Camunda, or a commercial MES add durability, retries, a UI, and a decade of
exception-handling on top &mdash; but the engine underneath is these two tables. It&rsquo;s
also why most plants have three half-built ones: an Access app, a SQL Server instance, and a
SaaS tool nobody ever decommissioned.</p>
<figure class="diagram">
<svg viewBox="0 0 660 400" role="img" aria-labelledby="dgm-log-title">
<title id="dgm-log-title">An append-only transition log, the state folded out of it, and the table that guards which moves are legal</title>
<text class="dg-panel-title" x="30" y="24">The log &mdash; append only</text>
<rect class="dg-box" x="30" y="44" width="330" height="30" rx="7" />
<text class="dg-mono" x="44" y="64">(none) &rarr; DISPATCHED</text>
<text class="dg-sub" x="350" y="64" text-anchor="end" style="font-size:11px">14:00 &middot; scheduler</text>
<rect class="dg-box" x="30" y="78" width="330" height="30" rx="7" />
<text class="dg-mono" x="44" y="98">DISPATCHED &rarr; FILLING</text>
<text class="dg-sub" x="350" y="98" text-anchor="end" style="font-size:11px">14:03 &middot; priya</text>
<rect class="dg-box" x="30" y="112" width="330" height="30" rx="7" />
<text class="dg-mono" x="44" y="132">FILLING &rarr; QA</text>
<text class="dg-sub" x="350" y="132" text-anchor="end" style="font-size:11px">14:36 &middot; priya</text>
<rect class="dg-box" x="30" y="146" width="330" height="30" rx="7" />
<text class="dg-mono" x="44" y="166">QA &rarr; HOLD</text>
<text class="dg-sub" x="350" y="166" text-anchor="end" style="font-size:11px">14:37 &middot; qa-check</text>
<rect class="dg-box-accent" x="30" y="180" width="330" height="30" rx="7" />
<text class="dg-mono" x="44" y="200">HOLD &rarr; RELEASED</text>
<text class="dg-sub" x="350" y="200" text-anchor="end" style="font-size:11px">14:40 &middot; r.menon</text>
<path class="dg-spoke" d="M362 195 H422" />
<polygon class="dg-alt-arrow" points="422,190 422,200 430,195" />
<rect class="dg-chip-accent" x="436" y="180" width="204" height="30" rx="15" />
<text class="dg-accent-text" x="538" y="199" text-anchor="middle" style="font-size:12px">current state = RELEASED</text>
<text class="dg-sub" x="538" y="170" text-anchor="middle" style="font-size:11px">derived by folding the log, never stored</text>
<text class="dg-sub" x="30" y="232" style="font-size:11px">Rows are only ever appended. Nothing above is updated, and nothing is deleted.</text>
<line class="dg-divider" x1="30" y1="256" x2="640" y2="256" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="30" y="286">The guard &mdash; the transitions table</text>
<circle class="dg-ok" cx="44" cy="317" r="13" />
<polyline class="dg-glyph" points="38,317 42,322 50,312" />
<rect class="dg-chip" x="70" y="302" width="90" height="30" rx="8" />
<text class="dg-label-sm" x="115" y="322" text-anchor="middle">FILLING</text>
<path class="dg-connector" d="M162 317 H174" />
<polygon class="dg-arrow" points="174,312 174,322 181,317" />
<rect class="dg-chip" x="186" y="302" width="60" height="30" rx="8" />
<text class="dg-label-sm" x="216" y="322" text-anchor="middle">QA</text>
<path class="dg-connector" d="M248 317 H260" />
<polygon class="dg-arrow" points="260,312 260,322 267,317" />
<rect class="dg-chip" x="272" y="302" width="100" height="30" rx="8" />
<text class="dg-label-sm" x="322" y="322" text-anchor="middle">RELEASED</text>
<text class="dg-sub" x="392" y="322" style="font-size:11px">legal: every step is in the log</text>
<circle class="dg-no" cx="44" cy="365" r="13" />
<line class="dg-glyph-no" x1="39" y1="360" x2="49" y2="370" />
<line class="dg-glyph-no" x1="49" y1="360" x2="39" y2="370" />
<rect class="dg-chip" x="70" y="350" width="90" height="30" rx="8" />
<text class="dg-label-sm" x="115" y="370" text-anchor="middle">FILLING</text>
<path class="dg-connector" d="M162 365 H260" stroke-dasharray="4 4" />
<polygon class="dg-arrow" points="260,360 260,370 267,365" />
<rect class="dg-chip" x="272" y="350" width="100" height="30" rx="8" />
<text class="dg-label-sm" x="322" y="370" text-anchor="middle">RELEASED</text>
<text class="dg-sub" x="392" y="370" style="font-size:11px">rejected: no such edge, QA never happened</text>
</svg>
<figcaption>The whole primitive in one picture. Every step appends a row and nothing is ever overwritten, so &ldquo;where is #4471 now&rdquo; is not a stored field but the last row folded out of the log &mdash; which is why the live status and the permanent audit trail can never disagree. The transitions table is the other half: ship-without-QA isn&rsquo;t an edge it knows, so the jump is refused rather than recorded.</figcaption>
</figure>
<p>Two things separate that from &ldquo;a table with a status column.&rdquo; It
<strong>enforces</strong> the legal moves &mdash; a historian stores whatever you send it;
an MES won&rsquo;t let you ship an order that hasn&rsquo;t passed QA, because the
<code>transitions</code> table forbids the jump. And <strong>the log is the record</strong>:
the live &ldquo;where is #4471 now&rdquo; and the permanent &ldquo;every step it took&rdquo;
are the same events read two ways. That&rsquo;s why the old argument over whether an MES is
&ldquo;really&rdquo; a state machine or a system of record dissolves &mdash; it&rsquo;s a
state machine whose transition log is the system of record. One object, two faces.</p>
<hr />
<h2 id="what-it-solves">What it solves</h2>
<p>The win is exactly the thing the last three systems structurally couldn&rsquo;t give:
<strong>identity and linkage for what the plant made.</strong></p>
<p>SCADA sensed live signals and acted on them; the UNS moved them; the historian remembered
them; not one of the three had ever heard of a batch. The MES is built around the batch. It knows #4471 consumed resin lot RL-88, ran
on Line 2, was operated by Priya, was held at QA and released on review at 14:40, and
shipped in S-201 &mdash; and it
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
was made and how it moved. It sits beside the three systems from the earlier parts: SCADA
senses the live value and acts on it, the UNS moves it, the historian remembers it, and the
MES records the <em>work</em> all three were serving the whole time. In software terms,
it&rsquo;s the workflow service and its event store, sitting on the same plant as the control
console, the message bus, and the time-series database. A well-run factory has all four, and
needs all four.</p>
<p>One caveat on that picture: the arrows do not all point up. Work gets
<em>dispatched</em> as well as recorded. The MES releases the order to the line and hands
down the recipe and setpoints the batch is meant to run at, and that path runs the other way
&mdash; down through the namespace and into <a href="/blog/scada">SCADA</a>, which owns the
write to the machines. It skips the historian entirely: nothing is ever dispatched to memory.
The MES sits on both paths, and only one of them is a record.</p>
<figure class="diagram">
<svg viewBox="0 0 660 400" role="img" aria-labelledby="dgm1-title">
<title id="dgm1-title">The tidy stack every architecture slide draws, against how the plant is actually wired</title>
<line class="dg-divider" x1="266" y1="20" x2="266" y2="390" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="135" y="26" text-anchor="middle">The stack we draw</text>
<text class="dg-panel-title" x="470" y="26" text-anchor="middle">What&rsquo;s actually wired</text>
<rect class="dg-box" x="60" y="48" width="150" height="28" rx="7" /><text class="dg-label-sm" x="135" y="67" text-anchor="middle">Understanding</text>
<rect class="dg-box-accent" x="60" y="110" width="150" height="28" rx="7" /><text class="dg-label-sm" x="135" y="129" text-anchor="middle" style="fill:var(--orange)">MES</text>
<rect class="dg-box" x="60" y="172" width="150" height="28" rx="7" /><text class="dg-label-sm" x="135" y="191" text-anchor="middle">Historian</text>
<rect class="dg-box" x="60" y="234" width="150" height="28" rx="7" /><text class="dg-label-sm" x="135" y="253" text-anchor="middle">Unified Namespace</text>
<rect class="dg-box" x="60" y="296" width="150" height="28" rx="7" /><text class="dg-label-sm" x="135" y="315" text-anchor="middle">SCADA</text>
<g class="dg-connector"><path d="M135 294 V272" /><path d="M135 232 V210" /><path d="M135 170 V148" /><path d="M135 108 V86" /></g>
<g class="dg-arrow"><polygon points="130,272 140,272 135,264" /><polygon points="130,210 140,210 135,202" /><polygon points="130,148 140,148 135,140" /><polygon points="130,86 140,86 135,78" /></g>
<text class="dg-sub" x="135" y="346" text-anchor="middle" style="font-size:11px">One chain, bottom to top.</text>
<rect class="dg-box" x="300" y="48" width="340" height="30" rx="8" /><text class="dg-label-sm" x="470" y="68" text-anchor="middle">Understanding</text>
<rect class="dg-box-accent" x="300" y="130" width="102" height="30" rx="8" /><text class="dg-label-sm" x="351" y="150" text-anchor="middle" style="fill:var(--orange)">MES</text>
<rect class="dg-box" x="518" y="130" width="122" height="30" rx="8" /><text class="dg-label-sm" x="579" y="150" text-anchor="middle">Historian</text>
<rect class="dg-box" x="330" y="212" width="270" height="30" rx="8" /><text class="dg-label-sm" x="465" y="232" text-anchor="middle">Unified Namespace</text>
<rect class="dg-box" x="400" y="284" width="130" height="30" rx="8" /><text class="dg-label-sm" x="465" y="304" text-anchor="middle">SCADA</text>
<rect class="dg-chip" x="400" y="352" width="130" height="26" rx="8" /><text class="dg-sub" x="465" y="369" text-anchor="middle" style="font-size:11px">PLCs &amp; sensors</text>
<g class="dg-connector"><path d="M350 128 V90" /><path d="M580 128 V90" /><path d="M344 210 V170" /><path d="M580 210 V170" /><path d="M452 282 V252" /><path d="M452 350 V324" /></g>
<g class="dg-arrow"><polygon points="345,90 355,90 350,80" /><polygon points="575,90 585,90 580,80" /><polygon points="339,170 349,170 344,162" /><polygon points="575,170 585,170 580,162" /><polygon points="447,252 457,252 452,244" /><polygon points="447,324 457,324 452,316" /></g>
<g class="dg-alt"><path d="M366 162 V202" /><path d="M478 244 V274" /><path d="M478 316 V342" /></g>
<g class="dg-alt-arrow"><polygon points="361,202 371,202 366,210" /><polygon points="473,274 483,274 478,282" /><polygon points="473,342 483,342 478,350" /></g>
<g class="dg-glyph-no" stroke-dasharray="5 4"><path d="M402 145 H444" /><path d="M476 145 H518" /></g>
<g class="dg-glyph-no"><line x1="452" y1="137" x2="468" y2="153" /><line x1="468" y1="137" x2="452" y2="153" /></g>
<text class="dg-sub" x="465" y="180" text-anchor="middle" style="font-size:10px">no link: the hold stays unexplained</text>
</svg>
<figcaption>Left: the stack every architecture slide draws. Right: the same four systems as they are actually wired. Readings rise from the machines; commands (accent) run back down through the namespace into SCADA, which owns the write. The historian only ever receives &mdash; nothing is dispatched to memory. And the edge that would explain the QA hold, MES to historian, is the one that was never built: the batch record and the pressure trace sit in separate systems that have no idea about each other. Part 1 said the plant is a graph, not a tree. So is the software running it.</figcaption>
</figure>
<p>What it is <em>not</em> is a place where anything is <em>understood</em> &mdash; and here
a technologist&rsquo;s instincts should twitch again, because <strong>a workflow engine
models the process, not the world the process runs in.</strong> It captures the states you
defined, on the schema you configured, and nothing else. Temporal knows your workflow ran
step 4 after step 3; it has no opinion on the machine that did step 4, the physics inside
it, or why step 4 keeps retrying.</p>
<p>An MES is the same, and the everyday version of it is sitting in a glovebox. A car&rsquo;s
service book is a genuine record: every service stamped, dated and signed, in order, and
exactly what you want when a fault turns out to be systemic rather than a one-off. It also
has nothing to say about why the pads keep wearing early, and the ABS computer from
<a href="/blog/unified-namespace">Part 1</a> &mdash; the one that reads all four wheels at
once and broke the tidy tree &mdash; appears nowhere in it. The book is a faithful account of
what was done to the car, kept by people who never had to explain the car. An MES is so good
at recording the process that it&rsquo;s tempting to mistake the process record for a model
of the plant.</p>
<p>It isn&rsquo;t. Here&rsquo;s where that cracks.</p>
<hr />
<h2 id="the-example">The specific example: the work order on Line 2</h2>
<p>Same Tuesday, same defect on Line 2&rsquo;s filler. The question that stalled at every
layer of the signal stack lands here, and the MES delivers on exactly that:</p>
<p><strong>&ldquo;Which batch ran at 14:03, and where did the lot go?&rdquo;</strong> #4471,
filled on Line 2, operator Priya, released to packaging at 14:40, into shipment S-201.
Clean, instant, auditable. This is the MES&rsquo;s home turf, and it&rsquo;s genuinely the
thing none of the first three could do.</p>
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
&mdash; the same shared resource the UNS&rsquo;s tree couldn&rsquo;t place, the historian
kept as an unrelated pen, and SCADA saw as just another independent tag.</li>
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
<figcaption>The MES answers the question the signal stack never could &mdash; perfect account of the batch and where it went. The other four need the physics, the cause, the asset graph, and the human act behind the disposition: none of which a workflow engine over a fixed routing was built to hold.</figcaption>
</figure>
<p>The MES answered the question the signal layers never could, and then ran out of road at
the edge of its own routing. It knows <em>what happened to every order.</em> It has no idea
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
UNS&rsquo;s tree couldn&rsquo;t hold, the historian didn&rsquo;t keep, and SCADA never
saw.</li>
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
<p>None of this is free, and of the four systems in this series the MES has the worst
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
