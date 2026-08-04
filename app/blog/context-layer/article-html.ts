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
.blog-prose .dg-mono{fill:var(--foreground);font-size:13px;font-weight:700;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
.blog-prose .dg-box{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 28%,transparent);stroke-width:1.5;}
.blog-prose .dg-box-accent{fill:color-mix(in oklch,var(--orange) 15%,var(--card));stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-blue-box{fill:color-mix(in oklch,#3a7ca5 18%,var(--card));stroke:#3a7ca5;stroke-width:1.6;}
.blog-prose .dg-blue-spine{stroke:#3a7ca5;stroke-width:5;fill:none;stroke-linecap:round;}
.blog-prose .dg-blue-text{fill:#2f6b8f;font-size:12.5px;font-weight:600;}
.blog-prose .dg-panel-blue{fill:#2f6b8f;font-size:12px;font-weight:700;}
.blog-prose .dg-accent-text{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-spoke{stroke:color-mix(in oklch,var(--foreground) 34%,transparent);stroke-width:1.4;fill:none;}
.blog-prose .dg-oarrow{fill:var(--orange);}
.blog-prose .dg-layer-band{fill:color-mix(in oklch,var(--orange) 15%,var(--card));stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-o-spoke{stroke:var(--orange);stroke-width:1.6;fill:none;}
.blog-prose .dg-edge{stroke:var(--orange);stroke-width:2.2;fill:none;}
.blog-prose .dg-edge-label{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-edge-label-bg{fill:var(--card);stroke:color-mix(in oklch,var(--orange) 22%,transparent);stroke-width:1;}
.blog-prose .dg-open{stroke:color-mix(in oklch,var(--foreground) 48%,transparent);stroke-width:1.6;fill:none;stroke-dasharray:5 6;}
.blog-prose .dg-open-q{fill:color-mix(in oklch,var(--foreground) 55%,transparent);font-size:15px;font-weight:800;}
.blog-prose .dg-card{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 28%,transparent);stroke-width:1.5;}
.blog-prose .dg-chip{fill:color-mix(in oklch,var(--orange) 15%,var(--card));stroke:var(--orange);stroke-width:1.8;}
.blog-prose .dg-path{stroke:var(--orange);stroke-width:3;fill:none;}
.blog-prose .dg-role{fill:var(--orange);font-size:11px;font-weight:700;}
.blog-prose .dg-stat{fill:var(--muted-foreground);font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;}
.blog-prose .dg-hair{stroke:color-mix(in oklch,var(--foreground) 20%,transparent);stroke-width:1;fill:none;}
.blog-prose .dg-hair-spoke{stroke:color-mix(in oklch,var(--foreground) 38%,transparent);stroke-width:1.25;fill:none;}
.blog-prose .dg-o-hair{stroke:var(--orange);stroke-width:1.5;fill:none;}
.blog-prose .dg-node-card{fill:url(#dgCardGrad);stroke:color-mix(in oklch,var(--foreground) 22%,transparent);stroke-width:1;filter:url(#dgSoft);}
.blog-prose .dg-node-active{fill:url(#dgCardGrad);stroke:var(--orange);stroke-width:1.6;filter:url(#dgGlow);}
.blog-prose .dg-plane{fill:url(#dgPlaneGrad);stroke:color-mix(in oklch,var(--orange) 55%,transparent);stroke-width:1.25;filter:url(#dgPlaneGlow);}
.blog-prose .dg-dot{fill:var(--orange);}
.blog-prose .dg-dot-halo{fill:color-mix(in oklch,var(--orange) 20%,transparent);}
.blog-prose .dg-node-dot{fill:color-mix(in oklch,var(--foreground) 40%,transparent);}
.blog-prose .dg-livepath{stroke:var(--orange);stroke-width:3.2;fill:none;stroke-linecap:round;filter:url(#dgGlow);}
</style>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="dgCardGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" style="stop-color:var(--card)" />
<stop offset="1" style="stop-color:color-mix(in oklch,var(--muted) 55%,var(--card))" />
</linearGradient>
<linearGradient id="dgPlaneGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" style="stop-color:color-mix(in oklch,var(--orange) 8%,var(--card))" />
<stop offset="1" style="stop-color:color-mix(in oklch,var(--orange) 18%,var(--card))" />
</linearGradient>
<linearGradient id="dgBlueGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" style="stop-color:color-mix(in oklch,#3a7ca5 10%,var(--card))" />
<stop offset="1" style="stop-color:color-mix(in oklch,#3a7ca5 22%,var(--card))" />
</linearGradient>
<linearGradient id="dgSpokeGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" style="stop-color:color-mix(in oklch,var(--orange) 30%,transparent)" />
<stop offset="1" style="stop-color:var(--orange)" />
</linearGradient>
<pattern id="dgDots" width="14" height="14" patternUnits="userSpaceOnUse">
<circle cx="2" cy="2" r="1" style="fill:color-mix(in oklch,var(--orange) 32%,transparent)" />
</pattern>
<filter id="dgSoft" x="-40%" y="-40%" width="180%" height="200%">
<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.16" />
</filter>
<filter id="dgGlow" x="-80%" y="-80%" width="260%" height="260%">
<feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="var(--orange)" flood-opacity="0.5" />
</filter>
<filter id="dgPlaneGlow" x="-30%" y="-160%" width="160%" height="420%">
<feGaussianBlur in="SourceAlpha" stdDeviation="9" result="b" />
<feFlood flood-color="var(--orange)" flood-opacity="0.34" result="c" />
<feComposite in="c" in2="b" operator="in" result="g" />
<feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
</filter>
<marker id="dgArrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
<path d="M1 1 L10 6 L1 11 L4 6 Z" style="fill:var(--orange)" />
</marker>
<marker id="dgArrowHair" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
<path d="M1 1.5 L10 6 L1 10.5 L4 6 Z" style="fill:color-mix(in oklch,var(--foreground) 45%,transparent)" />
</marker>
</defs></svg>
<p>The analyst had five logins and an afternoon. By the end of it she had the whole story of last
Tuesday &mdash; the skid that drifted in the CMMS, the recipe change in PLM, the hold in QMS, the
order and the resin lot in ERP, the waiting customer in CRM. Every piece was true, and she was the
only thing in the building that held all five at once. <a href="/blog/business-systems">Part&nbsp;5</a>
ended on that exact scene: <strong>five systems of record, no system of the plant</strong>, and an
empty orange arc drawn across the top of the T where something should have been reading across all of
it and wasn&rsquo;t.</p>
<p>Six parts, one number nobody understood. <code>PT_004 = 4.2 bar</code> on Line&nbsp;2&rsquo;s
filler moved through the unified namespace, was remembered by the historian, was acted on by SCADA,
was recorded as work by the MES, and was run as a business by five office systems &mdash; and not one
of them could explain it, because explaining it meant holding the edges <em>between</em> them, and no
system is built to do that. Every part of this series was scrupulous about the same thing: none of
those systems got the number <em>wrong</em>. The historian remembered it faithfully. The MES recorded
the work around it faithfully. ERP costed it faithfully. They were all correct, and correctness was
never the problem &mdash; the problem was that the whole was nobody&rsquo;s job.</p>
<p>This part installs the thing that can hold the whole. Not a sixth system to add to the row, not a
better version of any of the five. The layer that sits above the row and finally reads across it.</p>
<hr />
<h2 id="what-it-is">What it actually is</h2>
<p>Go back to the T. The trunk is wired top to bottom &mdash; SCADA, namespace, historian, MES, each
layer standing on the one below. The crossbar is where it fell apart: MES and the five business
systems all sitting at one level, none of them touching the next, none reaching back down the trunk.
The context layer is one shared model laid across the whole top of that T, and every system &mdash;
trunk and crossbar alike &mdash; connects to it <strong>once</strong>.</p>
<p>That word matters, because the fear Part&nbsp;5 named was integration hell: the N-squared spaghetti
of pairwise connectors, every system wired to every other, the
<a href="/blog/unified-namespace">forever-project</a> that ages badly. A context layer is not more of
that. Each system connects to the model a single time &mdash; N spokes into one hub, not N&sup2;
connectors between pairs. Add a seventh system and you add one spoke, not six new bridges. The model
is the place all of them meet, so none of them has to meet each other.</p>
<figure class="diagram">
<svg viewBox="0 0 680 400" role="img" aria-labelledby="dgc-title">
<title id="dgc-title">Five systems wired to every other on the left versus five systems each spoked once into a central context layer on the right</title>
<line x1="340" y1="60" x2="340" y2="374" class="dg-hair" stroke-dasharray="2 6" />
<text class="dg-panel-title" x="170" y="36" text-anchor="middle">N&sup2; connectors</text>
<g class="dg-hair-spoke">
<line x1="170" y1="96" x2="284" y2="169" /><line x1="170" y1="96" x2="240" y2="306" /><line x1="170" y1="96" x2="100" y2="306" /><line x1="170" y1="96" x2="56" y2="169" />
<line x1="284" y1="169" x2="240" y2="306" /><line x1="284" y1="169" x2="100" y2="306" /><line x1="284" y1="169" x2="56" y2="169" />
<line x1="240" y1="306" x2="100" y2="306" /><line x1="240" y1="306" x2="56" y2="169" /><line x1="100" y1="306" x2="56" y2="169" />
</g>
<g><rect class="dg-node-card" x="134" y="78" width="72" height="36" rx="9" /><text class="dg-label-sm" x="170" y="101" text-anchor="middle">ERP</text></g>
<g><rect class="dg-node-card" x="248" y="151" width="72" height="36" rx="9" /><text class="dg-label-sm" x="284" y="174" text-anchor="middle">MES</text></g>
<g><rect class="dg-node-card" x="204" y="288" width="72" height="36" rx="9" /><text class="dg-label-sm" x="240" y="311" text-anchor="middle">CMMS</text></g>
<g><rect class="dg-node-card" x="64" y="288" width="72" height="36" rx="9" /><text class="dg-label-sm" x="100" y="311" text-anchor="middle">PLM</text></g>
<g><rect class="dg-node-card" x="20" y="151" width="72" height="36" rx="9" /><text class="dg-label-sm" x="56" y="174" text-anchor="middle">QMS</text></g>
<text class="dg-stat" x="170" y="360" text-anchor="middle">5 systems = 10 pairs &middot; 7 = 21</text>
<text class="dg-panel-title" x="510" y="36" text-anchor="middle">N spokes</text>
<g class="dg-hair-spoke" style="opacity:.5">
<line x1="510" y1="205" x2="600" y2="252" /><line x1="510" y1="205" x2="420" y2="252" /><line x1="510" y1="205" x2="620" y2="196" /><line x1="510" y1="205" x2="400" y2="196" /><line x1="510" y1="205" x2="562" y2="300" /><line x1="510" y1="205" x2="458" y2="300" />
</g>
<g fill="none"><circle cx="600" cy="252" r="3" class="dg-node-dot" /><circle cx="420" cy="252" r="3" class="dg-node-dot" /><circle cx="620" cy="196" r="3" class="dg-node-dot" /><circle cx="400" cy="196" r="3" class="dg-node-dot" /><circle cx="562" cy="300" r="3" class="dg-node-dot" /><circle cx="458" cy="300" r="3" class="dg-node-dot" /></g>
<g class="dg-o-hair">
<line x1="510" y1="114" x2="510" y2="187" /><line x1="592" y1="187" x2="540" y2="200" /><line x1="566" y1="288" x2="526" y2="228" /><line x1="454" y1="288" x2="494" y2="228" /><line x1="428" y1="187" x2="480" y2="200" />
</g>
<rect class="dg-plane" x="450" y="188" width="120" height="52" rx="14" />
<rect x="454" y="192" width="112" height="44" rx="11" fill="url(#dgDots)" opacity="0.9" />
<rect x="470" y="198" width="80" height="32" rx="9" fill="var(--card)" opacity="0.78" />
<g class="dg-dot"><circle cx="510" cy="187" r="3" /><circle cx="540" cy="200" r="3" /><circle cx="526" cy="228" r="3" /><circle cx="494" cy="228" r="3" /><circle cx="480" cy="200" r="3" /></g>
<text class="dg-label-sm" x="510" y="211" text-anchor="middle" style="fill:var(--orange);font-weight:800">context</text>
<text class="dg-label-sm" x="510" y="226" text-anchor="middle" style="fill:var(--orange);font-weight:800">layer</text>
<g><rect class="dg-node-card" x="474" y="78" width="72" height="36" rx="9" /><text class="dg-label-sm" x="510" y="101" text-anchor="middle">ERP</text></g>
<g><rect class="dg-node-card" x="588" y="151" width="72" height="36" rx="9" /><text class="dg-label-sm" x="624" y="174" text-anchor="middle">MES</text></g>
<g><rect class="dg-node-card" x="544" y="288" width="72" height="36" rx="9" /><text class="dg-label-sm" x="580" y="311" text-anchor="middle">CMMS</text></g>
<g><rect class="dg-node-card" x="404" y="288" width="72" height="36" rx="9" /><text class="dg-label-sm" x="440" y="311" text-anchor="middle">PLM</text></g>
<g><rect class="dg-node-card" x="360" y="151" width="72" height="36" rx="9" /><text class="dg-label-sm" x="396" y="174" text-anchor="middle">QMS</text></g>
<text class="dg-stat" x="510" y="360" text-anchor="middle">5 systems = 5 spokes &middot; 7 = 7</text>
</svg>
<figcaption>Connect each system once. On the left, every pair needs its own connector &mdash; the N&sup2; spaghetti that grows to 10 links at five systems and 21 at seven. On the right, each system runs a single spoke into the <span style="color:var(--orange);font-weight:700">context layer</span>. Add a seventh system and you add one spoke, not six new bridges.</figcaption>
</figure>
<p>What the model actually holds is the three things that fell through every earlier part.</p>
<ul>
<li><strong>Identity:</strong> the ERP fixed-asset, the CMMS equipment record, the PLM part, the MES
resource, and the historian tag are declared to be one real thing &mdash; the filler &mdash; instead
of five strangers that happen to describe the same steel. Each system keeps its own local ID; the
model just knows they all point at one filler.</li>
<li><strong>Edges:</strong> the relationships that were homeless in Part&nbsp;5 because they spanned
two systems and belonged to neither &mdash; skid to filler, filler to batch, batch to recipe, recipe
to order &mdash; now live in the model as first-class connections, owned by the layer rather than by
either system on the ends.</li>
<li><strong>Meaning:</strong> with identity and edges in place, a question stops being a five-way
scavenger hunt and becomes a walk across one graph. The symptom in QMS, the cause in PLM, the asset
in the CMMS, the stakes in ERP &mdash; one-fifth of the answer in each &mdash; finally sit in a single
structure a question can traverse.</li>
</ul>
<p>It&rsquo;s worth being precise about what this is and isn&rsquo;t. It is not a warehouse that
copies everyone&rsquo;s data into a sixth database and lets it drift out of date by morning; the
systems of record stay the systems of record. It is a model that resolves each system&rsquo;s local
identity to one shared one, records how the real things connect, and reads from the sources live. The
systems keep doing their jobs. The layer does the one job none of them was ever built for: holding the
plant.</p>
<figure class="diagram">
<svg viewBox="0 0 660 440" role="img" aria-labelledby="dgt1-title">
<title id="dgt1-title">The context layer wired across the crossbar of the T and down the trunk, each system a spoke into it</title>
<text class="dg-title" x="330" y="30" text-anchor="middle">The crossbar, finally wired</text>
<rect class="dg-plane" x="24" y="50" width="612" height="46" rx="14" />
<rect x="30" y="56" width="600" height="34" rx="10" fill="url(#dgDots)" opacity="0.85" />
<text class="dg-accent-text" x="330" y="78" text-anchor="middle" style="font-size:13px;letter-spacing:.06em;font-weight:800">CONTEXT LAYER &mdash; one model across the whole T</text>
<g class="dg-o-hair" style="stroke-width:1.6">
<path d="M70 132 V96" /><path d="M174 132 V96" /><path d="M278 132 V96" /><path d="M382 132 V96" /><path d="M486 132 V96" /><path d="M590 132 V96" />
</g>
<g class="dg-dot"><circle cx="70" cy="96" r="3.4" /><circle cx="174" cy="96" r="3.4" /><circle cx="278" cy="96" r="3.4" /><circle cx="382" cy="96" r="3.4" /><circle cx="486" cy="96" r="3.4" /><circle cx="590" cy="96" r="3.4" /></g>
<g><rect class="dg-node-card" x="24" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="70" y="163" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text></g>
<g><rect class="dg-node-card" x="128" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="174" y="163" text-anchor="middle" style="fill:var(--orange);font-weight:800">CRM</text></g>
<g><rect class="dg-node-active" x="232" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="278" y="158" text-anchor="middle" style="fill:var(--orange);font-weight:800">MES</text><text class="dg-sub" x="278" y="175" text-anchor="middle" style="font-size:10.5px">top of trunk</text></g>
<g><rect class="dg-node-card" x="336" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="382" y="163" text-anchor="middle" style="fill:var(--orange);font-weight:800">CMMS</text></g>
<g><rect class="dg-node-card" x="440" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="486" y="163" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text></g>
<g><rect class="dg-node-card" x="544" y="132" width="92" height="52" rx="10" /><text class="dg-label-sm" x="590" y="163" text-anchor="middle" style="fill:var(--orange);font-weight:800">QMS</text></g>
<path d="M278 410 V184" style="stroke:url(#dgBlueGrad);stroke-width:6;fill:none;stroke-linecap:round" />
<g fill="url(#dgBlueGrad)" stroke="#3a7ca5" stroke-width="1.4" filter="url(#dgSoft)">
<rect x="204" y="236" width="148" height="44" rx="11" /><rect x="204" y="296" width="148" height="44" rx="11" /><rect x="204" y="356" width="148" height="44" rx="11" />
</g>
<text class="dg-blue-text" x="278" y="263" text-anchor="middle">Historian</text>
<text class="dg-blue-text" x="278" y="323" text-anchor="middle">Unified Namespace</text>
<text class="dg-blue-text" x="278" y="383" text-anchor="middle">SCADA</text>
<path class="dg-o-hair" style="stroke-width:1.6" d="M352 258 C 424 258 430 128 430 100" marker-end="url(#dgArrow)" />
<circle class="dg-dot" cx="430" cy="96" r="3.4" />
<text class="dg-panel-blue" x="392" y="306" text-anchor="start">Manufacturing</text>
<text class="dg-panel-blue" x="392" y="322" text-anchor="start">trunk reads in too</text>
</svg>
<figcaption>The empty orange arc from Part&nbsp;5 is finally filled. One <span style="color:var(--orange);font-weight:700">context layer</span> lies across the top of the T; every business system on the crossbar and the whole <span style="color:#2f6b8f;font-weight:700">manufacturing trunk</span> connects into it &mdash; each a single spoke, not a web of pairwise connectors. The crossbar is finally wired.</figcaption>
</figure>
<hr />
<h2 id="two-systems">Two systems: a superpower</h2>
<p>Connect any two of these systems through the model and something falls out that neither had alone.
Not a report. A capability.</p>
<p>Take the <strong>historian and the CMMS</strong>. The historian holds the glycol skid&rsquo;s live
pressure and vibration trend, second by second, and understands none of it. The CMMS holds the same
skid &mdash; asset GLY-SKID-02 &mdash; and its maintenance schedule, and has never seen a pressure
curve. Resolve them to the same asset in the model and you get <strong>condition-based
maintenance</strong>: service the skid when its actual trend says it&rsquo;s drifting, not when the
calendar says ninety days are up. The last work order on GLY-SKID-02 closed clean two days before it
drifted into batch #4471. A calendar couldn&rsquo;t have caught that. A joined trend and schedule
would have.</p>
<p>Take the <strong>QMS and PLM</strong>. The QMS holds the deviation raised on #4471 and the SOP
behind it; PLM holds the change orders that quietly reshape the process over time. Alone, a recurring
deviation is a paperwork loop that closes and reopens and closes again. Joined, it <strong>closes the
design-quality loop</strong>: the excursion traces straight to the exact approved, dated recipe ECO
that nudged the fill pressure &mdash; author and date attached &mdash; instead of a quality team
investigating the same drift for the fourth quarter running without ever seeing the change that caused
it.</p>
<figure class="diagram">
<svg viewBox="0 0 660 400" role="img" aria-labelledby="dgt2-title">
<title id="dgt2-title">Two solid labeled edges name two superpowers; several dashed question-mark edges stay open</title>
<text class="dg-title" x="330" y="30" text-anchor="middle">The superpower matrix</text>
<path class="dg-open" d="M120 152 L228 108" />
<path class="dg-open" d="M540 168 L500 288" />
<path class="dg-open" d="M172 320 L488 172" />
<path d="M96 180 L96 288" style="stroke:var(--orange);stroke-width:3.4;fill:none;stroke-linecap:round" />
<path d="M342 96 L422 96" style="stroke:var(--orange);stroke-width:3.4;fill:none;stroke-linecap:round" />
<g class="dg-dot"><circle cx="96" cy="180" r="3.6" /><circle cx="96" cy="288" r="3.6" /><circle cx="342" cy="96" r="3.6" /><circle cx="422" cy="96" r="3.6" /></g>
<g><rect class="dg-node-active" x="36" y="128" width="120" height="52" rx="10" /><text class="dg-label-sm" x="96" y="150" text-anchor="middle" style="fill:var(--orange);font-weight:800">Historian</text><text class="dg-sub" x="96" y="168" text-anchor="middle">pressure trend</text></g>
<g><rect class="dg-node-active" x="36" y="288" width="120" height="52" rx="10" /><text class="dg-label-sm" x="96" y="310" text-anchor="middle" style="fill:var(--orange);font-weight:800">CMMS</text><text class="dg-sub" x="96" y="328" text-anchor="middle">skid schedule</text></g>
<g><rect class="dg-node-active" x="222" y="72" width="120" height="52" rx="10" /><text class="dg-label-sm" x="282" y="94" text-anchor="middle" style="fill:var(--orange);font-weight:800">QMS</text><text class="dg-sub" x="282" y="112" text-anchor="middle">deviation</text></g>
<g><rect class="dg-node-active" x="422" y="72" width="120" height="52" rx="10" /><text class="dg-label-sm" x="482" y="94" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text><text class="dg-sub" x="482" y="112" text-anchor="middle">change order</text></g>
<g><rect class="dg-node-card" x="504" y="128" width="120" height="52" rx="10" /><text class="dg-label-sm" x="564" y="150" text-anchor="middle" style="fill:var(--orange);font-weight:800">MES</text><text class="dg-sub" x="564" y="168" text-anchor="middle">the work</text></g>
<g><rect class="dg-node-card" x="444" y="288" width="120" height="52" rx="10" /><text class="dg-label-sm" x="504" y="310" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text><text class="dg-sub" x="504" y="328" text-anchor="middle">order &amp; cost</text></g>
<rect class="dg-edge-label-bg" x="8" y="208" width="176" height="42" rx="8" filter="url(#dgSoft)" />
<text class="dg-edge-label" x="96" y="226" text-anchor="middle">condition-based</text>
<text class="dg-edge-label" x="96" y="243" text-anchor="middle">maintenance</text>
<rect class="dg-edge-label-bg" x="298" y="42" width="144" height="26" rx="8" filter="url(#dgSoft)" />
<text class="dg-edge-label" x="370" y="60" text-anchor="middle">design-quality loop</text>
<text class="dg-open-q" x="168" y="132" text-anchor="middle">?</text>
<text class="dg-open-q" x="530" y="232" text-anchor="middle">?</text>
<text class="dg-open-q" x="330" y="252" text-anchor="middle">?</text>
</svg>
<figcaption>Two solid edges, two named superpowers: <span style="color:var(--orange);font-weight:700">Historian&nbsp;+&nbsp;CMMS</span> for condition-based maintenance, <span style="color:var(--orange);font-weight:700">QMS&nbsp;+&nbsp;PLM</span> for the design-quality loop. Every dashed &ldquo;?&rdquo; edge is another pair whose capability we haven&rsquo;t named. We named two; there are dozens.</figcaption>
</figure>
<p>Two systems, two superpowers, and we&rsquo;ve barely started. And what falls out when you connect
the historian and the QMS? The MES and ERP? The CMMS and the MES? Every pair is another capability
neither system had alone &mdash; every pair is another superpower, and we&rsquo;ve named two. The rest
are yours to find.</p>
<hr />
<h2 id="three-systems">Three systems: true intelligence</h2>
<p>Two systems give you a superpower. Three give you something different in kind.</p>
<p>Walk one question across three. It starts at the metal: the historian shows
<code>PT_004 = 4.2 bar</code> on Line&nbsp;2&rsquo;s filler, over the 4.0&nbsp;bar alarm limit, one
Tuesday afternoon. That&rsquo;s a signal, and a signal alone is inert &mdash; Part&nbsp;2 proved a
stored number isn&rsquo;t an answer. So the layer walks the edge from the tag to the work: the MES
says the filler was running <strong>batch #4471</strong>, the 500&nbsp;ml SKU, on resin lot RL-88,
with Priya on shift. Now the pressure spike has a job attached to it. One more edge, into the business:
ERP ties #4471 to its production order, and that order to <strong>shipment S-201</strong> &mdash; which
is now at risk of slipping. One question has walked from a sensor reading at the metal, through the
work the plant was doing, all the way to a customer whose delivery is in jeopardy &mdash; the full
height of the T, in a single traversal.</p>
<figure class="diagram">
<svg viewBox="0 0 660 300" role="img" aria-labelledby="dgt3-title">
<title id="dgt3-title">One highlighted path walks a pressure reading through the work to a customer shipment at risk</title>
<text class="dg-title" x="330" y="28" text-anchor="middle">One question, walked across three systems</text>
<g class="dg-node-card"><rect x="24" y="70" width="184" height="150" rx="14" /></g>
<g class="dg-node-card"><rect x="238" y="70" width="184" height="150" rx="14" /></g>
<g class="dg-node-card"><rect x="452" y="70" width="184" height="150" rx="14" /></g>
<text class="dg-panel-title" x="116" y="94" text-anchor="middle">HISTORIAN &middot; SIGNAL</text>
<text class="dg-panel-title" x="330" y="94" text-anchor="middle">MES &middot; WORK</text>
<text class="dg-panel-title" x="544" y="94" text-anchor="middle">ERP &middot; BUSINESS</text>
<path d="M208 148 H232" style="stroke:var(--orange);stroke-width:3.4;fill:none;stroke-linecap:round" marker-end="url(#dgArrow)" />
<path d="M422 148 H446" style="stroke:var(--orange);stroke-width:3.4;fill:none;stroke-linecap:round" marker-end="url(#dgArrow)" />
<g class="dg-dot"><circle cx="208" cy="148" r="3.6" /><circle cx="422" cy="148" r="3.6" /></g>
<rect class="dg-chip" x="40" y="118" width="152" height="62" rx="10" filter="url(#dgSoft)" />
<text class="dg-mono" x="116" y="143" text-anchor="middle">PT_004 = 4.2 bar</text>
<text class="dg-sub" x="116" y="166" text-anchor="middle">over 4.0 alarm, Line&nbsp;2 filler</text>
<rect class="dg-chip" x="254" y="118" width="152" height="62" rx="10" filter="url(#dgSoft)" />
<text class="dg-mono" x="330" y="143" text-anchor="middle">batch #4471</text>
<text class="dg-sub" x="330" y="166" text-anchor="middle">500&nbsp;ml SKU, lot RL-88</text>
<rect class="dg-chip" x="468" y="118" width="152" height="62" rx="10" filter="url(#dgGlow)" />
<text class="dg-mono" x="544" y="142" text-anchor="middle">order &middot; shipment</text>
<text class="dg-mono" x="544" y="161" text-anchor="middle" style="fill:var(--orange)">S-201 at risk</text>
<text class="dg-role" x="116" y="206" text-anchor="middle">a signal, alone inert</text>
<text class="dg-role" x="330" y="206" text-anchor="middle">now it has a job</text>
<text class="dg-role" x="544" y="206" text-anchor="middle">a customer at stake</text>
</svg>
<figcaption>One question, walked end to end: a pressure reading in the historian (signal) resolves to the batch the MES was running (work), and that batch to the order and <span style="color:var(--orange);font-weight:700">shipment S-201</span> the ERP shows at risk (business). Signal to customer along a single highlighted path &mdash; a route nobody pre-wired.</figcaption>
</figure>
<p>Here is why three is the threshold, and it&rsquo;s the point the whole series has been walking
toward. With two systems, the join is fixed. Historian plus CMMS is <em>this</em> asset to <em>that</em>
schedule &mdash; one edge, one shape, an answer you could have pre-wired the moment you decided the two
should talk. It&rsquo;s a lookup. But add a third system and the agent no longer has a single edge to
follow; it has a <em>choice of paths</em>. From the pressure spike it could walk to the work, then to
the order, then to the customer &mdash; or to the recipe, then to the other batches that ran under the
same ECO &mdash; or to the asset, then to every other line that shares the skid. The number of routes
through three systems isn&rsquo;t three; it&rsquo;s every path the graph allows, and it grows
combinatorially with each system the model touches. Nobody pre-wired those paths, because nobody could
have known in advance which question would need which one. That jump &mdash; from a lookup you designed
to a route the agent finds for itself at question time &mdash; is what intelligence actually is here.
Two systems answer a question you already knew to ask. Three let something ask a question you
didn&rsquo;t.</p>
<hr />
<h2 id="the-reframe">The reframe: intelligence, not integration</h2>
<p>Point-to-point integration builds one bridge for one question and then stops; the next question
waits for someone to build the next bridge. A context layer builds the graph <strong>once</strong>
&mdash; resolve the identities, lay down the edges, and every path a future question might need already
exists, because paths are just walks over connected things nobody had to anticipate.</p>
<p>That&rsquo;s the whole distinction in one sentence: <strong>superpowers are joins you wired;
intelligence is traversal you didn&rsquo;t have to.</strong></p>
<figure class="diagram">
<svg viewBox="0 0 680 380" role="img" aria-labelledby="dgr-title">
<title id="dgr-title">One bridge between two systems that dead-ends on the left versus one question fanning out across a shared model on the right</title>
<line x1="340" y1="56" x2="340" y2="352" class="dg-hair" stroke-dasharray="2 6" />
<text class="dg-panel-title" x="170" y="34" text-anchor="middle">Point-to-point integration</text>
<g><rect class="dg-node-card" x="40" y="150" width="104" height="52" rx="10" /><text class="dg-label-sm" x="92" y="181" text-anchor="middle">System A</text></g>
<g><rect class="dg-node-card" x="204" y="150" width="104" height="52" rx="10" /><text class="dg-label-sm" x="256" y="181" text-anchor="middle">System B</text></g>
<path d="M146 176 H198" style="stroke:var(--orange);stroke-width:3.4;fill:none;stroke-linecap:round" marker-end="url(#dgArrow)" />
<circle class="dg-dot" cx="144" cy="176" r="3.6" />
<text class="dg-accent-text" x="175" y="138" text-anchor="middle">one bridge</text>
<path class="dg-open" d="M256 202 V272" />
<text class="dg-open-q" x="256" y="294" text-anchor="middle">?</text>
<text class="dg-stat" x="170" y="322" text-anchor="middle">next question waits</text>
<text class="dg-sub" x="170" y="340" text-anchor="middle">one bridge, one purpose</text>
<text class="dg-panel-title" x="510" y="34" text-anchor="middle">A context layer</text>
<g class="dg-hair-spoke" style="opacity:.45">
<line x1="510" y1="199" x2="620" y2="150" /><line x1="510" y1="199" x2="400" y2="150" /><line x1="510" y1="199" x2="628" y2="250" /><line x1="510" y1="199" x2="392" y2="250" />
</g>
<g fill="none"><circle cx="620" cy="150" r="3" class="dg-node-dot" /><circle cx="400" cy="150" r="3" class="dg-node-dot" /><circle cx="628" cy="250" r="3" class="dg-node-dot" /><circle cx="392" cy="250" r="3" class="dg-node-dot" /></g>
<g class="dg-hair-spoke">
<line x1="426" y1="130" x2="484" y2="178" /><line x1="594" y1="130" x2="536" y2="178" /><line x1="422" y1="270" x2="485" y2="220" /><line x1="598" y1="270" x2="536" y2="220" />
</g>
<g><rect class="dg-node-card" x="375" y="90" width="78" height="40" rx="9" /><text class="dg-label-sm" x="414" y="115" text-anchor="middle">ERP</text></g>
<g><rect class="dg-node-card" x="567" y="90" width="78" height="40" rx="9" /><text class="dg-label-sm" x="606" y="115" text-anchor="middle">MES</text></g>
<g><rect class="dg-node-card" x="371" y="270" width="78" height="40" rx="9" /><text class="dg-label-sm" x="410" y="295" text-anchor="middle">CMMS</text></g>
<g><rect class="dg-node-card" x="571" y="270" width="78" height="40" rx="9" /><text class="dg-label-sm" x="610" y="295" text-anchor="middle">QMS</text></g>
<rect class="dg-plane" x="452" y="174" width="116" height="50" rx="14" />
<rect x="456" y="178" width="108" height="42" rx="11" fill="url(#dgDots)" opacity="0.9" />
<text class="dg-label-sm" x="510" y="196" text-anchor="middle" style="fill:var(--orange);font-weight:800">shared</text>
<text class="dg-label-sm" x="510" y="211" text-anchor="middle" style="fill:var(--orange);font-weight:800">model</text>
<g class="dg-livepath" style="stroke-width:2.6">
<path d="M503 336 C 465 260 425 175 421 133" /><path d="M510 335 V226" /><path d="M517 336 C 575 260 590 175 599 133" />
</g>
<g class="dg-dot"><circle cx="421" cy="130" r="3.4" /><circle cx="510" cy="224" r="3.4" /><circle cx="599" cy="130" r="3.4" /></g>
<circle cx="510" cy="344" r="16" fill="url(#dgPlaneGrad)" stroke="var(--orange)" stroke-width="1.8" filter="url(#dgGlow)" />
<text class="dg-accent-text" x="510" y="349" text-anchor="middle" style="font-size:14px;font-weight:800">Q</text>
</svg>
<figcaption>Integration builds one bridge for one question, and it dead-ends &mdash; one bridge, one purpose, the next question waiting. A context layer builds the graph once: every system spokes into one <span style="color:var(--orange);font-weight:700">shared model</span>, and a single <span style="color:var(--orange);font-weight:700">question</span> fans out along many paths that already exist.</figcaption>
</figure>
<hr />
<h2 id="what-its-made-of">What it&rsquo;s made of</h2>
<p>Everything up to here is a pattern &mdash; a context layer, lowercase, the way a message bus or a
data warehouse is a pattern. This is where we name the thing we build. <strong>ContextWeaver</strong>
builds one, and it&rsquo;s called the <strong>Manufacturing Context Layer</strong>. Everything above is
what it does; here is what it&rsquo;s made of.</p>
<ul>
<li><strong>Asset-centric semantic model:</strong> the filler, the skid, the line, the batch, and the
order are real entities with real relationships, not rows scattered across five schemas.</li>
<li><strong>Unit and time normalization:</strong> a pressure in bar from the historian and a timestamp
from the MES and a cost in an ERP ledger line up on one clock and one set of units instead of
five.</li>
<li><strong>Document and tribal-knowledge memory:</strong> the SOP, the ECO, the note Priya left at
shift change &mdash; carried as part of the model, not as attachments nobody can query.</li>
<li><strong>Per-tag quality scoring:</strong> the layer knows which readings to trust and which are
drifting sensors.</li>
<li><strong>Business entities as first-class:</strong> the order, the customer, the shipment are
objects in the graph, so a walk that starts at a sensor can end at S-201 without falling off the edge
of the model.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 400" role="img" aria-labelledby="dgt4-title">
<title id="dgt4-title">Five local IDs from five systems resolve into one shared entity, the filler</title>
<text class="dg-title" x="320" y="24" text-anchor="middle">Five local IDs, resolved to one</text>
<g class="dg-o-hair" style="stroke-width:1.7">
<line x1="320" y1="92" x2="320" y2="172" marker-end="url(#dgArrow)" />
<line x1="547" y1="162" x2="398" y2="194" marker-end="url(#dgArrow)" />
<line x1="497" y1="296" x2="392" y2="230" marker-end="url(#dgArrow)" />
<line x1="143" y1="296" x2="248" y2="230" marker-end="url(#dgArrow)" />
<line x1="93" y1="162" x2="242" y2="194" marker-end="url(#dgArrow)" />
</g>
<g class="dg-dot"><circle cx="320" cy="90" r="3.4" /><circle cx="547" cy="162" r="3.4" /><circle cx="497" cy="296" r="3.4" /><circle cx="143" cy="296" r="3.4" /><circle cx="93" cy="162" r="3.4" /></g>
<g><rect class="dg-node-card" x="245" y="28" width="150" height="62" rx="10" /><text class="dg-label-sm" x="320" y="52" text-anchor="middle" style="fill:var(--orange);font-weight:800">ERP</text><text class="dg-sub" x="320" y="72" text-anchor="middle">fixed-asset ID</text></g>
<g><rect class="dg-node-card" x="470" y="100" width="150" height="62" rx="10" /><text class="dg-label-sm" x="545" y="124" text-anchor="middle" style="fill:var(--orange);font-weight:800">CMMS</text><text class="dg-sub" x="545" y="144" text-anchor="middle">equipment record</text></g>
<g><rect class="dg-node-card" x="420" y="298" width="150" height="62" rx="10" /><text class="dg-label-sm" x="495" y="322" text-anchor="middle" style="fill:var(--orange);font-weight:800">MES</text><text class="dg-sub" x="495" y="342" text-anchor="middle">resource</text></g>
<g><rect class="dg-node-card" x="70" y="298" width="150" height="62" rx="10" /><text class="dg-label-sm" x="145" y="322" text-anchor="middle" style="fill:var(--orange);font-weight:800">Historian</text><text class="dg-sub" x="145" y="342" text-anchor="middle">tag</text></g>
<g><rect class="dg-node-card" x="20" y="100" width="150" height="62" rx="10" /><text class="dg-label-sm" x="95" y="124" text-anchor="middle" style="fill:var(--orange);font-weight:800">PLM</text><text class="dg-sub" x="95" y="144" text-anchor="middle">part</text></g>
<rect class="dg-node-active" x="238" y="180" width="164" height="62" rx="14" />
<rect x="242" y="184" width="156" height="54" rx="11" fill="url(#dgDots)" opacity="0.85" />
<rect x="252" y="190" width="136" height="42" rx="9" fill="var(--card)" opacity="0.78" />
<text class="dg-sub" x="320" y="205" text-anchor="middle">one shared identity</text>
<text class="dg-label-sm" x="320" y="227" text-anchor="middle" style="fill:var(--orange);font-weight:800;font-size:15px">the filler</text>
</svg>
<figcaption>The five local IDs Part&nbsp;5 left as five strangers &mdash; ERP fixed-asset, CMMS equipment record, PLM part, MES resource, historian tag &mdash; now resolve into one entity: <span style="color:var(--orange);font-weight:700">the filler</span>. The shared identity Part&nbsp;5 said was homeless, now held.</figcaption>
</figure>
<p>None of this is free, and it&rsquo;s worth saying plainly, because the series has been sober the
whole way and shouldn&rsquo;t stop now. The hard part isn&rsquo;t the traversal &mdash; the traversal
is easy once the graph exists. The work is in building the graph well:
<a href="https://en.wikipedia.org/wiki/Record_linkage" target="_blank" rel="noopener noreferrer">entity
resolution</a> (establishing that the ERP asset, the CMMS equipment, the PLM part, the MES resource,
and the historian tag really are the one filler) and <strong>governance</strong> (who&rsquo;s allowed
to see and assert what). That&rsquo;s where the engineering goes, and it&rsquo;s what earns the model
the trust to reason on.</p>
<p>And it stays inside the boundary the series drew in <a href="/blog/scada">Part&nbsp;3</a>. The
context layer reads across the plant, reasons over it, and recommends. It does not actuate.
<strong>SCADA still owns the write</strong> to the machines &mdash; the layer can tell you the skid is
drifting toward #4471&rsquo;s excursion and that S-201 is at risk, and it can put that in front of the
operator, but the hand on the plant stays exactly where Part&nbsp;3 left it. A model that reasons is
not a model that reaches for the valve.</p>
<p>You can see how the model is assembled in the <a href="/architecture">architecture</a>, and what it
unlocks across real plants in the <a href="/use-cases">use cases</a>.</p>
<hr />
<p>For six parts the verdict was the same: faithful, and still not a model. Every layer moved the
number, remembered it, acted on it, recorded the work it served, or ran the business around it &mdash;
each one correct, and the plant itself nobody&rsquo;s job. Here, finally, is the model. The crossbar is
wired, the trunk connects to it, and the plant can be asked one question and answer it across every
system at once.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a plant
&mdash; its assets, its history, its documents, and the tribal knowledge in between &mdash; that
<a href="/use-cases">AI agents can actually reason over</a>. Connect two of your systems and
you&rsquo;ve got a superpower. Connect three and you&rsquo;ve got the thing none of them ever were. If
your plant runs on faithful systems that can&rsquo;t see past their own boundaries,
<a href="/architecture">talk to us</a>.</p>
</blockquote>`
