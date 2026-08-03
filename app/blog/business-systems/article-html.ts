// Authored for the ContextWeaver blog. Body HTML rendered inside .blog-prose.
export const articleHtml = `<style>
.blog-prose figure.diagram{margin:2.25rem 0;padding:1.5rem 1.25rem 1.1rem;border:1px solid var(--border);border-radius:var(--radius-lg);background:color-mix(in oklch, var(--muted) 40%, var(--card));box-shadow:0 14px 40px -30px rgba(0,0,0,.4);}
.blog-prose figure.diagram svg{display:block;width:100%;height:auto;overflow:visible;}
.blog-prose figure.diagram figcaption{margin-top:1rem;font-size:.85rem;line-height:1.5;text-align:center;color:var(--muted-foreground);font-style:normal;}
.blog-prose figure.diagram text{font-family:inherit;}
.blog-prose .dg-title{fill:var(--foreground);font-size:14px;font-weight:700;}
.blog-prose .dg-acc{fill:var(--orange);font-weight:800;}
.blog-prose .dg-panel-title{fill:var(--muted-foreground);font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;}
.blog-prose .dg-label{fill:var(--foreground);font-size:14px;font-weight:600;}
.blog-prose .dg-label-sm{fill:var(--foreground);font-size:12.5px;font-weight:600;}
.blog-prose .dg-sub{fill:var(--muted-foreground);font-size:12px;font-weight:500;}
.blog-prose .dg-mono{fill:var(--foreground);font-size:13px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
.blog-prose .dg-box{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 28%,transparent);stroke-width:1.5;}
.blog-prose .dg-box-accent{fill:color-mix(in oklch,var(--orange) 15%,var(--card));stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-blue-box{fill:color-mix(in oklch,#3a7ca5 18%,var(--card));stroke:#3a7ca5;stroke-width:1.6;}
.blog-prose .dg-blue-spine{stroke:#3a7ca5;stroke-width:5;fill:none;stroke-linecap:round;}
.blog-prose .dg-blue-text{fill:#2f6b8f;font-size:12.5px;font-weight:600;}
.blog-prose .dg-frame{fill:none;stroke:color-mix(in oklch,var(--foreground) 20%,transparent);stroke-width:1.5;}
.blog-prose .dg-flow-line{stroke:color-mix(in oklch,var(--orange) 60%,transparent);stroke-width:1.75;fill:none;}
.blog-prose .dg-oarrow{fill:var(--orange);}
.blog-prose .dg-connector{stroke:color-mix(in oklch,var(--foreground) 42%,transparent);stroke-width:1.5;fill:none;}
.blog-prose .dg-arrow{fill:color-mix(in oklch,var(--foreground) 48%,transparent);}
.blog-prose .dg-chip{fill:color-mix(in oklch,var(--muted) 60%,var(--card));stroke:var(--border);stroke-width:1;}
.blog-prose .dg-accent-text{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-spoke{stroke:color-mix(in oklch,var(--foreground) 34%,transparent);stroke-width:1.4;fill:none;}
</style>
<p>In <a href="/blog/mes">Part&nbsp;4</a>, the MES answered what happened to batch #4471 and
then hit the edge of its own routing. <em>Was the glycol skid involved? Why did the recipe
drift? Who&rsquo;s waiting on shipment S-201?</em> &mdash; every one of those questions punted
to a different system, and not one of them lives on the plant floor. This part is about where
they punted to.</p>
<p>Walk off the floor and into the offices and the screens change again &mdash; and keep
changing, room to room. Maintenance is staring at a work-order backlog. Engineering has the
product&rsquo;s CAD, its bill of materials, and a stack of change orders. Quality is in an
audit-ready system of SOPs, deviations, and CAPAs. Sales has the customer account and the open
order. And somewhere a very large, very expensive system runs the company&rsquo;s money,
materials, and orders all at once.</p>
<p>Take that last one first, because it is the one everyone has heard of. Watch a single
customer order move through an <strong>ERP</strong> and you have seen, in miniature, what every
system in this part is.</p>
<figure class="diagram">
<svg viewBox="0 0 640 176" role="img" aria-labelledby="dgbe-title">
<title id="dgbe-title">ERP runs a customer order from sale to ledger, entirely inside its own database</title>
<text class="dg-title" x="320" y="28" text-anchor="middle"><tspan class="dg-acc" style="font-size:17px">ERP</tspan> &mdash; a customer order, start to finish</text>
<rect class="dg-frame" x="16" y="46" width="608" height="108" rx="12" />
<rect class="dg-box" x="32" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="80" y="90" text-anchor="middle">Sales</text>
<text class="dg-label-sm" x="80" y="106" text-anchor="middle">order</text>
<rect class="dg-box" x="152" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="200" y="90" text-anchor="middle">MRP</text>
<text class="dg-label-sm" x="200" y="106" text-anchor="middle">plan</text>
<rect class="dg-box-accent" x="272" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="320" y="90" text-anchor="middle" style="fill:var(--orange)">Production</text>
<text class="dg-label-sm" x="320" y="106" text-anchor="middle" style="fill:var(--orange)">order</text>
<rect class="dg-box" x="392" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="440" y="90" text-anchor="middle">Goods</text>
<text class="dg-label-sm" x="440" y="106" text-anchor="middle">issue</text>
<rect class="dg-box" x="512" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="560" y="90" text-anchor="middle">Invoice</text>
<text class="dg-label-sm" x="560" y="106" text-anchor="middle">&amp; ledger</text>
<g class="dg-flow-line"><path d="M129 93 H145" /><path d="M249 93 H265" /><path d="M369 93 H385" /><path d="M489 93 H505" /></g>
<g class="dg-oarrow"><polygon points="145,88 145,98 152,93" /><polygon points="265,88 265,98 272,93" /><polygon points="385,88 385,98 392,93" /><polygon points="505,88 505,98 512,93" /></g>
<text class="dg-sub" x="320" y="142" text-anchor="middle">one process &middot; one company &middot; its own database &mdash; and nothing outside this box</text>
</svg>
<figcaption>This is what a business system is: a workflow that runs one process end to end &mdash; here, a customer order from sale to ledger &mdash; on a database it alone owns. The one step in red, the <strong>production order</strong>, is the only place ERP touches the plant at all. It runs the whole chain flawlessly, and never once looks outside the box.</figcaption>
</figure>
<p>Five polished systems, each indispensable, each with a decade of hardening behind it. Ask
any one of them about last Tuesday&rsquo;s excursion and it hands you exactly one true piece of
the story and has never heard of the other four.</p>
<hr />
<h2 id="what-these-are">What these actually are</h2>
<p>The acronyms name functions, not architectures. Underneath, all five are the same thing a
software engineer has built a dozen times: a <strong>CRUD app over a relational schema</strong>
&mdash; a system of record for one bounded slice of the business, with its own tables, its own
identifiers, and its own model of the world. Domain-driven design even has a word for what each
one is: a <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener noreferrer"><strong>bounded context</strong></a>, a self-consistent model of
the world that is deliberately ignorant of everything outside its boundary. It is
<em>microservices</em> at the scale of a company: one service per business capability, each
owning its own database &mdash; exactly the decomposition a modern architecture is
<em>supposed</em> to have.</p>
<p>The tell is that each runs a clean workflow of its own and refers to nothing beyond it. You
just watched ERP do it. Here are the other four, each doing its one job well &mdash; with the
one step in red that the batch-#4471 story will come back to.</p>
<h3 id="crm">CRM &mdash; the customer, cradle to renewal</h3>
<p>Sales cannot run on memory. The CRM is the record of every customer and everything promised
to them: a lead becomes an opportunity, an opportunity closes, an account opens, a support case
tracks the aftermath. <a href="https://www.salesforce.com/" target="_blank" rel="noopener noreferrer">Salesforce</a> is the archetype.</p>
<figure class="diagram">
<svg viewBox="0 0 640 176" role="img" aria-labelledby="dgbc-title">
<title id="dgbc-title">CRM tracks a customer from lead to support case in its own database</title>
<text class="dg-title" x="320" y="28" text-anchor="middle"><tspan class="dg-acc" style="font-size:17px">CRM</tspan> &mdash; a customer, cradle to renewal</text>
<rect class="dg-frame" x="16" y="46" width="608" height="108" rx="12" />
<rect class="dg-box" x="32" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="80" y="97" text-anchor="middle">Lead</text>
<rect class="dg-box" x="152" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="200" y="97" text-anchor="middle">Opportunity</text>
<rect class="dg-box" x="272" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="320" y="97" text-anchor="middle">Closed / won</text>
<rect class="dg-box" x="392" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="440" y="97" text-anchor="middle">Account</text>
<rect class="dg-box-accent" x="512" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="560" y="90" text-anchor="middle" style="fill:var(--orange)">Support</text>
<text class="dg-label-sm" x="560" y="106" text-anchor="middle" style="fill:var(--orange)">case</text>
<g class="dg-flow-line"><path d="M129 93 H145" /><path d="M249 93 H265" /><path d="M369 93 H385" /><path d="M489 93 H505" /></g>
<g class="dg-oarrow"><polygon points="145,88 145,98 152,93" /><polygon points="265,88 265,98 272,93" /><polygon points="385,88 385,98 392,93" /><polygon points="505,88 505,98 512,93" /></g>
<text class="dg-sub" x="320" y="142" text-anchor="middle">every touch with the customer &middot; its own database</text>
</svg>
<figcaption>The CRM knows the account that ordered the 500&nbsp;ml SKU, and the <strong>support case</strong> (in red) it will open if the shipment slips. It has never heard of the batch, the filler, or the excursion that put the shipment at risk in the first place.</figcaption>
</figure>
<h3 id="cmms">CMMS &mdash; every asset, kept alive</h3>
<p>You cannot keep a fleet of machines running without a system that knows what is due. The
CMMS is an asset register plus a maintenance loop: a machine logs runtime, a preventive job
comes due, a work order is raised, a technician closes it, and the asset&rsquo;s history grows
one more entry. IBM Maximo and SAP&nbsp;PM are typical.</p>
<figure class="diagram">
<svg viewBox="0 0 640 176" role="img" aria-labelledby="dgbm-title">
<title id="dgbm-title">CMMS runs the preventive-maintenance loop for each asset in its own database</title>
<text class="dg-title" x="320" y="28" text-anchor="middle"><tspan class="dg-acc" style="font-size:17px">CMMS</tspan> &mdash; keep every asset alive</text>
<rect class="dg-frame" x="16" y="46" width="608" height="108" rx="12" />
<rect class="dg-box" x="32" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="80" y="90" text-anchor="middle">Runtime</text>
<text class="dg-label-sm" x="80" y="106" text-anchor="middle">hours</text>
<rect class="dg-box" x="152" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="200" y="97" text-anchor="middle">PM due</text>
<rect class="dg-box-accent" x="272" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="320" y="97" text-anchor="middle" style="fill:var(--orange)">Work order</text>
<rect class="dg-box" x="392" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="440" y="90" text-anchor="middle">Repair</text>
<text class="dg-label-sm" x="440" y="106" text-anchor="middle">&amp; close</text>
<rect class="dg-box" x="512" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="560" y="90" text-anchor="middle">Asset</text>
<text class="dg-label-sm" x="560" y="106" text-anchor="middle">history</text>
<g class="dg-flow-line"><path d="M129 93 H145" /><path d="M249 93 H265" /><path d="M369 93 H385" /><path d="M489 93 H505" /></g>
<g class="dg-oarrow"><polygon points="145,88 145,98 152,93" /><polygon points="265,88 265,98 272,93" /><polygon points="385,88 385,98 392,93" /><polygon points="505,88 505,98 512,93" /></g>
<text class="dg-sub" x="320" y="142" text-anchor="middle">GLY-SKID-02&rsquo;s whole service life &middot; its own database</text>
</svg>
<figcaption>The glycol skid the MES couldn&rsquo;t place is a first-class object here: asset GLY-SKID-02, its <strong>work order</strong> (in red) closed clean two days earlier. The loop ran perfectly &mdash; and never learned that the skid it just serviced drifted into a batch it will never see.</figcaption>
</figure>
<h3 id="plm">PLM &mdash; the product, as designed</h3>
<p>A product changes a hundred times across its life, and someone has to hold the authoritative
version. PLM is the engineering-change loop: a part at revision A, a change request, review and
approval, a change order, a released revision B, and the bill of materials updated to match.
PTC Windchill and Siemens Teamcenter are the heavyweights.</p>
<figure class="diagram">
<svg viewBox="0 0 640 176" role="img" aria-labelledby="dgbp-title">
<title id="dgbp-title">PLM runs the engineering-change loop for the product in its own database</title>
<text class="dg-title" x="320" y="28" text-anchor="middle"><tspan class="dg-acc" style="font-size:17px">PLM</tspan> &mdash; the product, revision by revision</text>
<rect class="dg-frame" x="16" y="46" width="608" height="108" rx="12" />
<rect class="dg-box" x="32" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="80" y="90" text-anchor="middle">Part</text>
<text class="dg-label-sm" x="80" y="106" text-anchor="middle">rev A</text>
<rect class="dg-box" x="152" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="200" y="90" text-anchor="middle">Change</text>
<text class="dg-label-sm" x="200" y="106" text-anchor="middle">request</text>
<rect class="dg-box" x="272" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="320" y="90" text-anchor="middle">Review</text>
<text class="dg-label-sm" x="320" y="106" text-anchor="middle">&amp; approve</text>
<rect class="dg-box-accent" x="392" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="440" y="90" text-anchor="middle" style="fill:var(--orange)">Change</text>
<text class="dg-label-sm" x="440" y="106" text-anchor="middle" style="fill:var(--orange)">order</text>
<rect class="dg-box" x="512" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="560" y="90" text-anchor="middle">Released</text>
<text class="dg-label-sm" x="560" y="106" text-anchor="middle">rev B</text>
<g class="dg-flow-line"><path d="M129 93 H145" /><path d="M249 93 H265" /><path d="M369 93 H385" /><path d="M489 93 H505" /></g>
<g class="dg-oarrow"><polygon points="145,88 145,98 152,93" /><polygon points="265,88 265,98 272,93" /><polygon points="385,88 385,98 392,93" /><polygon points="505,88 505,98 512,93" /></g>
<text class="dg-sub" x="320" y="142" text-anchor="middle">the authoritative design &middot; its own database</text>
</svg>
<figcaption>The recipe tweak that nudged the fill pressure last week is a <strong>change order</strong> (in red) here, with an author and a date. PLM knows what the product <em>should</em> be &mdash; and never sees the one run on Line&nbsp;2 that drifted away from it.</figcaption>
</figure>
<h3 id="qms">QMS &mdash; quality you can prove</h3>
<p>A regulated plant has to show, on demand, that the process met spec. The QMS is the
compliance loop: a deviation is raised, investigated, a corrective action (CAPA) opened, the
governing SOP updated, and the whole thing closed with a sign-off an auditor can follow.</p>
<figure class="diagram">
<svg viewBox="0 0 640 176" role="img" aria-labelledby="dgbq-title">
<title id="dgbq-title">QMS runs the deviation-to-CAPA loop in its own database</title>
<text class="dg-title" x="320" y="28" text-anchor="middle"><tspan class="dg-acc" style="font-size:17px">QMS</tspan> &mdash; a deviation, closed and provable</text>
<rect class="dg-frame" x="16" y="46" width="608" height="108" rx="12" />
<rect class="dg-box-accent" x="32" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="80" y="97" text-anchor="middle" style="fill:var(--orange)">Deviation</text>
<rect class="dg-box" x="152" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="200" y="97" text-anchor="middle">Investigate</text>
<rect class="dg-box" x="272" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="320" y="97" text-anchor="middle">CAPA</text>
<rect class="dg-box" x="392" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="440" y="90" text-anchor="middle">SOP</text>
<text class="dg-label-sm" x="440" y="106" text-anchor="middle">update</text>
<rect class="dg-box" x="512" y="68" width="96" height="50" rx="8" />
<text class="dg-label-sm" x="560" y="90" text-anchor="middle">Close &amp;</text>
<text class="dg-label-sm" x="560" y="106" text-anchor="middle">sign-off</text>
<g class="dg-flow-line"><path d="M129 93 H145" /><path d="M249 93 H265" /><path d="M369 93 H385" /><path d="M489 93 H505" /></g>
<g class="dg-oarrow"><polygon points="145,88 145,98 152,93" /><polygon points="265,88 265,98 272,93" /><polygon points="385,88 385,98 392,93" /><polygon points="505,88 505,98 512,93" /></g>
<text class="dg-sub" x="320" y="142" text-anchor="middle">the audit trail &middot; its own database</text>
</svg>
<figcaption>The QA hold on #4471 opens as a <strong>deviation</strong> (in red) here, and walks all the way to a signed-off CAPA. It holds the paperwork perfectly &mdash; and holds no live pressure curve and no asset graph at all.</figcaption>
</figure>
<p>Five workflows, five databases, five faithful little worlds. Each is decades-hardened
infrastructure for its function, and, in isolation, each is right. That is worth saying plainly
before the rest of this part complicates it: you cannot run a manufacturing business without
every one of these.</p>
<hr />
<h2 id="where-it-fits">Where they fit: the shape of a T</h2>
<p>The four earlier parts climbed a single trunk. SCADA at the metal, the unified namespace
moving what it sensed, the historian remembering it, the MES recording how the work moved
&mdash; one vertical line, each system standing on the one below, all of it the
<em>manufacturing</em> spine. The MES is the top of that trunk: the last system whose entire
world is the production line itself.</p>
<p>These five are not further up that trunk, and they don&rsquo;t sit under it. They sit
<strong>beside the MES, at its level.</strong> At the MES the stack stops climbing and the
picture turns sideways into a row &mdash; ERP toward money and materials, CRM toward the
customer, the CMMS toward the machines&rsquo; upkeep, PLM toward the product&rsquo;s design, QMS
toward the audit. Draw it and it&rsquo;s a <strong>T</strong>: the manufacturing trunk rising up
to the MES, and the business systems spread out along the top from there, all on one level, each
pointed at a different function of the same company.</p>
<figure class="diagram">
<svg viewBox="0 0 660 384" role="img" aria-labelledby="dgt-title">
<title id="dgt-title">The MES and the business systems sit at one level (the crossbar of a T) with the manufacturing trunk rising to the MES</title>
<rect x="10" y="50" width="640" height="80" rx="14" style="fill:color-mix(in oklch,var(--orange) 6%,transparent);stroke:none" />
<text class="dg-accent-text" x="330" y="38" text-anchor="middle" style="font-size:12.5px;letter-spacing:.05em">MES &amp; THE BUSINESS SYSTEMS &mdash; ONE LEVEL</text>
<rect class="dg-box" x="24" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="70" y="95" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text>
<rect class="dg-box" x="128" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="174" y="95" text-anchor="middle" style="fill:var(--orange);font-weight:800">CRM</text>
<rect class="dg-box-accent" x="232" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="278" y="90" text-anchor="middle" style="fill:var(--orange);font-weight:800">MES</text><text class="dg-sub" x="278" y="107" text-anchor="middle" style="font-size:10.5px">top of trunk</text>
<rect class="dg-box" x="336" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="382" y="95" text-anchor="middle" style="fill:var(--orange);font-weight:800">CMMS</text>
<rect class="dg-box" x="440" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="486" y="95" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text>
<rect class="dg-box" x="544" y="64" width="92" height="52" rx="9" /><text class="dg-label-sm" x="590" y="95" text-anchor="middle" style="fill:var(--orange);font-weight:800">QMS</text>
<path class="dg-blue-spine" d="M278 342 V116" />
<rect class="dg-blue-box" x="204" y="170" width="148" height="46" rx="10" /><text class="dg-blue-text" x="278" y="198" text-anchor="middle">Historian</text>
<rect class="dg-blue-box" x="204" y="236" width="148" height="46" rx="10" /><text class="dg-blue-text" x="278" y="264" text-anchor="middle">Unified Namespace</text>
<rect class="dg-blue-box" x="204" y="302" width="148" height="46" rx="10" /><text class="dg-blue-text" x="278" y="330" text-anchor="middle">SCADA</text>
<text class="dg-panel-title" x="392" y="252" text-anchor="start" style="fill:#2f6b8f">Manufacturing</text>
<text class="dg-panel-title" x="392" y="268" text-anchor="start" style="fill:#2f6b8f">trunk &middot; Parts 1&ndash;4</text>
</svg>
<figcaption>The MES and the business systems sit on <strong>one level</strong> &mdash; the crossbar of a T. The <span style="color:#2f6b8f;font-weight:700">manufacturing trunk</span> (blue: SCADA &rarr; UNS &rarr; Historian) rises up to the MES; from that same level the <span style="color:var(--orange);font-weight:700">business systems</span> (orange) spread out. The trunk is wired top to bottom. Along the crossbar, nothing runs.</figcaption>
</figure>
<p>That shape is the whole problem in one picture. The trunk is wired top to bottom &mdash; a
reading flows SCADA &rarr; UNS &rarr; historian &rarr; MES, each layer built on the one under it.
Along the crossbar, nothing runs. No two of these systems touch, and none reaches back down the
trunk that rises to meet them. And here the technologist&rsquo;s reflex should twitch harder than
anywhere in the series &mdash; not at any one system, but at the white space along the top.
<strong>Each is a faithful model of its own slice; nothing is a model of the
whole.</strong></p>
<p>A software engineer has seen this exact estate and knows its name: a pile of services, each
with its own database and its own IDs, no shared identity, no event backbone, integrated
pair-by-pair on demand. We call it a distributed monolith, or just integration hell, and we
know how it ages. The plant has built the same thing out of purchased systems instead of
home-grown ones.</p>
<p>That model isn&rsquo;t in any of them. Here&rsquo;s where that cracks.</p>
<hr />
<h2 id="the-example">The specific example: chasing Line 2 across the offices</h2>
<p>Same Tuesday, same filler, same near-miss on batch #4471. The MES handed us four questions
it couldn&rsquo;t answer, and every one has a home &mdash; just a different system each time.
The glycol skid is in the CMMS. The recipe change is in PLM. The hold and the SOP are in QMS.
The order, the cost, and resin lot RL-88 are in ERP. The waiting customer is in CRM. Each system
holds one true piece. None of them holds the piece next to it.</p>
<figure class="diagram">
<svg viewBox="0 0 640 400" role="img" aria-labelledby="dgb2-title">
<title id="dgb2-title">One physical thing carries a different ID in five systems, with no edges between them</title>
<g class="dg-spoke" style="stroke-dasharray:5 6">
<line x1="320" y1="200" x2="320" y2="55" />
<line x1="320" y1="200" x2="545" y2="127" />
<line x1="320" y1="200" x2="495" y2="331" />
<line x1="320" y1="200" x2="145" y2="331" />
<line x1="320" y1="200" x2="95" y2="127" />
</g>
<rect class="dg-box" x="245" y="24" width="150" height="62" rx="9" />
<text class="dg-label-sm" x="320" y="50" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text>
<text class="dg-sub" x="320" y="70" text-anchor="middle">part rev + ECO</text>
<rect class="dg-box" x="470" y="96" width="150" height="62" rx="9" />
<text class="dg-label-sm" x="545" y="122" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text>
<text class="dg-sub" x="545" y="142" text-anchor="middle">prod. order &middot; fixed asset</text>
<rect class="dg-box" x="420" y="300" width="150" height="62" rx="9" />
<text class="dg-label-sm" x="495" y="326" text-anchor="middle" style="fill:var(--orange);font-weight:800">CRM</text>
<text class="dg-sub" x="495" y="346" text-anchor="middle">account &middot; case</text>
<rect class="dg-box" x="70" y="300" width="150" height="62" rx="9" />
<text class="dg-label-sm" x="145" y="326" text-anchor="middle" style="fill:var(--orange);font-weight:800">CMMS</text>
<text class="dg-sub" x="145" y="346" text-anchor="middle">asset GLY-SKID-02</text>
<rect class="dg-box" x="20" y="96" width="150" height="62" rx="9" />
<text class="dg-label-sm" x="95" y="122" text-anchor="middle" style="fill:var(--orange);font-weight:800">QMS</text>
<text class="dg-sub" x="95" y="142" text-anchor="middle">deviation &middot; SOP</text>
<rect class="dg-box-accent" x="248" y="163" width="144" height="74" rx="10" />
<text class="dg-sub" x="320" y="186" text-anchor="middle">one physical thing</text>
<text class="dg-label-sm" x="320" y="207" text-anchor="middle">the filler + glycol skid</text>
<text class="dg-mono" x="320" y="227" text-anchor="middle" style="fill:var(--orange)">batch #4471</text>
</svg>
<figcaption>The same physical filler, skid, and batch sit in five systems at once &mdash; and each one names them differently: a <em>fixed asset</em> in ERP, an <em>equipment record</em> in the CMMS, a <em>part</em> in PLM, a <em>deviation</em> in QMS, an <em>account&rsquo;s order</em> in CRM. Five true records of the same steel, five different IDs, and <strong>no edges between the systems</strong> &mdash; nothing declares them the same thing.</figcaption>
</figure>
<p>Five systems. Each one holds a genuine, load-bearing piece of <em>why #4471 nearly
failed</em> &mdash; the asset that drifted, the recipe that changed, the hold that caught it,
the customer who&rsquo;s waiting, the cost at stake. Every piece is true. And no system holds
the piece next to it, because the edges that connect them &mdash; skid to filler, filler to
batch, batch to recipe, recipe to order, order to customer &mdash; don&rsquo;t live inside any
single system. The answer exists. It&rsquo;s just scattered across five databases behind five
logins, and nothing assembles it.</p>
<hr />
<h2 id="five-systems">Five systems of record, no system of the plant</h2>
<p>For four parts the failure was one system that couldn&rsquo;t understand its own number.
This part&rsquo;s failure is stranger, and worse: <strong>five systems that each understand
their slice perfectly, and still no one understands the plant</strong> &mdash; because
understanding the plant means holding the edges <em>between</em> the systems, and every one of
those edges is exactly what a bounded context is built to ignore. Watch what falls through, and
it&rsquo;s the same three things that fell through in every earlier part, now multiplied by
five.</p>
<ul>
<li><strong>Identity, five times over.</strong> The historian had bare strings; the MES had
identity, but only for units of work. Here every system has real, rich identity &mdash; for its
own objects. The catch is that the same physical filler is a <em>fixed asset</em> in ERP, an
<em>equipment record</em> in the CMMS, a <em>part</em> in PLM, and a <em>resource</em> on an MES
routing, each with a different ID and a different partial description, and nothing declares them
the same thing. Four faithful identities, and no shared one.</li>
<li><strong>Relationships, none that cross a boundary.</strong> Each system has clean edges
inside itself &mdash; ERP&rsquo;s order to its lines, PLM&rsquo;s part to its BOM. But the
load-bearing relationships in the real story all cross boundaries: the skid (CMMS) that fed the
filler (MES) that ran the batch (ERP) built to the recipe (PLM) that failed the check (QMS).
Every one of those edges spans two systems, so it belongs to neither. The graph is real;
it&rsquo;s just homeless.</li>
<li><strong>Meaning, distributed and unassembled.</strong> &ldquo;Why did #4471 nearly
fail&rdquo; isn&rsquo;t answered <em>wrong</em> by any system &mdash; it&rsquo;s answered
one-fifth by each, and the assembly is left to a human with five logins and an afternoon. The
symptom is in QMS, the cause is in PLM, the contributing asset is in the CMMS, the stakes are
in ERP and CRM. Meaning that has to be joined across five schemas is meaning no schema
holds.</li>
</ul>
<p>If you&rsquo;ve followed the car since <a href="/blog/unified-namespace">Part&nbsp;1</a>, you
already know this failure by sight. A modern car isn&rsquo;t run by one computer; it&rsquo;s run
by dozens of <strong>ECUs</strong> &mdash; the engine controller, the ABS module (the same one
that broke Part&nbsp;1&rsquo;s tidy tree), the transmission unit, the body controller, the
infotainment head &mdash; each from a different supplier, each a correct, self-contained model
of its own subsystem. Individually flawless. And not one of them knows <em>the car</em>: the
engine ECU can&rsquo;t see why the ABS is intervening, the ABS can&rsquo;t see the road the
driver sees. That is the entire reason a car has a
<a href="https://en.wikipedia.org/wiki/CAN_bus" target="_blank" rel="noopener noreferrer"><strong>CAN bus</strong></a> and, increasingly, a central domain
controller sitting above the ECUs &mdash; because a fleet of perfect subsystem computers with no
shared bus isn&rsquo;t a vehicle, it&rsquo;s a parking lot. ERP, CRM, CMMS, PLM, and QMS are the
plant&rsquo;s enterprise ECUs: each correct, none of them the car.</p>
<hr />
<h2 id="the-hard-parts">What it costs to run this estate</h2>
<p>Nobody buys this estate; it accretes, one justified purchase at a time, and the bill comes
due at the seams.</p>
<ul>
<li><strong>Integration is the forever-project &mdash; again, one floor up.</strong> Every pair
of systems that has to talk gets a bespoke connector: MES to ERP over
<a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95" target="_blank" rel="noopener noreferrer">B2MML / ISA-95</a>, CMMS to ERP, PLM to
ERP, QMS to everything. It&rsquo;s the exact N-squared spaghetti
<a href="/blog/unified-namespace">Part&nbsp;1</a> named on the OT floor, rebuilt in the office
with middleware, an ESB, and nightly batch syncs that quietly drift out of agreement by
morning.</li>
<li><strong>Master data is everyone&rsquo;s problem and no one&rsquo;s job.</strong> The same
customer, part, or asset carries a different ID in every system, so someone stands up a
<a href="https://en.wikipedia.org/wiki/Master_data_management" target="_blank" rel="noopener noreferrer">master-data-management</a> program to reconcile them &mdash; a
permanent, 70%-done effort with a steering committee, because the moment one system renumbers,
every cross-system join it fed rots. It&rsquo;s the historian&rsquo;s tag-dictionary problem and
the MES&rsquo;s routing problem, now spanning five schemas at once.</li>
<li><strong>Five vendors, five locks, five logins.</strong> SAP or Oracle for ERP, Salesforce
for CRM, Maximo or SAP&nbsp;PM for the CMMS, Windchill or Teamcenter for PLM, a validated suite
for QMS &mdash; each with its own data model, security domain, release cycle, and army of
consultants. None of them federate, and none of them are in a hurry to make the others easy to
reach.</li>
<li><strong>And it still isn&rsquo;t a model of the plant.</strong> Integrate all five
flawlessly and you have five faithful islands wired together at the edges &mdash; not one model a
question can walk across. The model that would span them belongs to none of them, and
point-to-point connectors move records between systems without ever building it.</li>
</ul>
<hr />
<h2 id="the-one-line">The missing layer</h2>
<p>Stand back from the whole T and the shape of what&rsquo;s wrong isn&rsquo;t a bad system
&mdash; it&rsquo;s a missing one. The trunk is connected. The crossbar isn&rsquo;t: no system
along it touches the next, and none reaches back down to the trunk that rises to meet them.
Nothing sits across the top and reads all of it at once, so the question that needs the skid
(one system), the recipe (another), and the pressure curve (the trunk) has nowhere to be
asked.</p>
<figure class="diagram">
<svg viewBox="0 0 640 236" role="img" aria-labelledby="dgb3-title">
<title id="dgb3-title">Nothing reads across the MES and the business systems at once</title>
<text class="dg-accent-text" x="320" y="40" text-anchor="middle" style="font-size:15px">what reads across all of them?</text>
<path d="M40 88 Q 320 56 600 88" style="fill:none;stroke:var(--orange);stroke-width:2;stroke-dasharray:7 6" />
<g style="stroke:var(--orange);stroke-width:1.5;fill:none;stroke-dasharray:4 5">
<path d="M100 96 V150" /><path d="M210 96 V150" /><path d="M320 96 V150" /><path d="M430 96 V150" /><path d="M540 96 V150" />
</g>
<g style="fill:var(--orange)"><polygon points="95,150 105,150 100,158" /><polygon points="205,150 215,150 210,158" /><polygon points="315,150 325,150 320,158" /><polygon points="425,150 435,150 430,158" /><polygon points="535,150 545,150 540,158" /></g>
<rect class="dg-box" x="46" y="160" width="108" height="56" rx="9" /><text class="dg-label-sm" x="100" y="184" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text><text class="dg-sub" x="100" y="202" text-anchor="middle">own DB</text>
<rect class="dg-box" x="156" y="160" width="108" height="56" rx="9" /><text class="dg-label-sm" x="210" y="184" text-anchor="middle" style="fill:var(--orange);font-weight:800">CRM</text><text class="dg-sub" x="210" y="202" text-anchor="middle">own DB</text>
<rect class="dg-box-accent" x="266" y="160" width="108" height="56" rx="9" /><text class="dg-label-sm" x="320" y="184" text-anchor="middle" style="fill:var(--orange);font-weight:800">MES</text><text class="dg-sub" x="320" y="202" text-anchor="middle">+ the trunk</text>
<rect class="dg-box" x="376" y="160" width="108" height="56" rx="9" /><text class="dg-label-sm" x="430" y="184" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text><text class="dg-sub" x="430" y="202" text-anchor="middle">own DB</text>
<rect class="dg-box" x="486" y="160" width="108" height="56" rx="9" /><text class="dg-label-sm" x="540" y="184" text-anchor="middle" style="fill:var(--orange);font-weight:800">QMS</text><text class="dg-sub" x="540" y="202" text-anchor="middle">own DB</text>
</svg>
<figcaption>Every system below is real and load-bearing. What none of them is &mdash; and what nothing above them is either &mdash; is a single layer that reads across all of them at once. That empty arc is the whole question the series has been walking toward.</figcaption>
</figure>
<p>Each of these systems is the right place to run its slice of the business, and the wrong
thing to mistake for a model of the plant they all touch. Five faithful records of five
functions are still five islands &mdash; and the identities, the edges, and the meaning that
live <em>between</em> them are exactly what a <a href="/architecture">context layer holds on
top</a>, treating every one of these as a first-class source, not a rival.</p>
<p>What that makes possible &mdash; a single question that walks from a customer&rsquo;s slipping
order straight to the machine that filled it &mdash; is where this series goes next.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a
plant &mdash; its assets, its history, its documents, and the tribal knowledge in between
&mdash; that <a href="/use-cases">AI agents can actually reason over</a>. If your business runs
on five systems of record and none of them can see the other four, talk to us.</p>
</blockquote>`
