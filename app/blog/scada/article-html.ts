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
.blog-prose .dg-box{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 30%,transparent);stroke-width:1.5;}
.blog-prose .dg-box-accent{fill:color-mix(in oklch,var(--orange) 12%,var(--card));stroke:var(--orange);stroke-width:1.75;}
.blog-prose .dg-connector{stroke:color-mix(in oklch,var(--foreground) 42%,transparent);stroke-width:1.5;fill:none;}
.blog-prose .dg-arrow{fill:color-mix(in oklch,var(--foreground) 48%,transparent);}
.blog-prose .dg-chip{fill:color-mix(in oklch,var(--muted) 60%,var(--card));stroke:var(--border);stroke-width:1;}
.blog-prose .dg-alt{stroke:var(--orange);stroke-width:1.75;fill:none;}
.blog-prose .dg-alt-arrow{fill:var(--orange);}
.blog-prose .dg-alt-text{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-node{fill:var(--card);stroke:color-mix(in oklch,var(--foreground) 55%,transparent);stroke-width:1.5;}
.blog-prose .dg-mesh{stroke:color-mix(in oklch,var(--foreground) 40%,transparent);stroke-width:1.1;}
.blog-prose .dg-hub{fill:color-mix(in oklch,var(--orange) 18%,var(--card));stroke:var(--orange);stroke-width:2;}
.blog-prose .dg-spoke{stroke:var(--orange);stroke-width:1.75;}
.blog-prose .dg-accent-text{fill:var(--orange);font-size:12px;font-weight:700;}
.blog-prose .dg-pipe{stroke:color-mix(in oklch,var(--foreground) 32%,transparent);stroke-width:6;fill:none;stroke-linecap:round;}
</style>
<p>The <a href="/blog/unified-namespace">unified namespace</a> and the
<a href="/blog/historian">historian</a> &mdash; Parts 1 and 2 &mdash; dealt with moving the
plant&rsquo;s data and remembering it, and never once said where it comes from.
<strong>It comes from here.</strong> One layer below both sits the system that actually
touches the machines: it reads the sensors, throws the alarms, and, <strong>alone among the
three, reaches back and acts</strong>. We have been standing on it the whole series without
naming it.</p>
<p>Walk into a control room and it is a wall of screens showing a live schematic of the
plant. An engineer drew the tanks and pipes once; <strong>SCADA paints this second&rsquo;s
readings onto them</strong> &mdash; a pump glowing green because it is running, a level
ticking up, a banner flashing amber because a pressure just crossed its limit. It is the
plant&rsquo;s <strong>dashboard and its control panel in one</strong>, watching everything at
once, right now. When Line 2&rsquo;s filler pressure crossed its limit last Tuesday, this is
the screen that went red, and this is where an operator <strong>reached in to throttle a
valve</strong> &mdash; before the number ever reached the historian&rsquo;s memory or the
namespace&rsquo;s bus.</p>
<figure class="diagram">
<svg viewBox="0 0 560 328" role="img" aria-labelledby="dgsm-title">
<title id="dgsm-title">The three systems by what they do: SCADA is the only one that acts</title>
<text class="dg-panel-title" x="248" y="52" text-anchor="middle">Observe</text>
<text class="dg-sub" x="248" y="68" text-anchor="middle">read only</text>
<text class="dg-panel-title" x="442" y="52" text-anchor="middle">Act</text>
<text class="dg-sub" x="442" y="68" text-anchor="middle">write back</text>
<text class="dg-panel-title" x="142" y="128" text-anchor="end">Present</text>
<text class="dg-sub" x="142" y="144" text-anchor="end">real-time</text>
<text class="dg-panel-title" x="142" y="248" text-anchor="end">Past</text>
<text class="dg-sub" x="142" y="264" text-anchor="end">stored</text>
<rect class="dg-box" x="158" y="78" width="180" height="110" rx="10" />
<text class="dg-label" x="248" y="126" text-anchor="middle">Unified Namespace</text>
<text class="dg-sub" x="248" y="148" text-anchor="middle">moves live data</text>
<text class="dg-sub" x="248" y="167" text-anchor="middle">Part 1</text>
<rect class="dg-box-accent" x="352" y="78" width="180" height="110" rx="10" />
<text class="dg-label" x="442" y="126" text-anchor="middle" style="fill:var(--orange)">SCADA</text>
<text class="dg-sub" x="442" y="148" text-anchor="middle">senses and commands</text>
<text class="dg-accent-text" x="442" y="168" text-anchor="middle">the only one that acts</text>
<rect class="dg-box" x="158" y="198" width="180" height="110" rx="10" />
<text class="dg-label" x="248" y="246" text-anchor="middle">Historian</text>
<text class="dg-sub" x="248" y="268" text-anchor="middle">remembers</text>
<text class="dg-sub" x="248" y="287" text-anchor="middle">Part 2</text>
<rect x="352" y="198" width="180" height="110" rx="10" style="fill:none;stroke:var(--border);stroke-width:1.5;stroke-dasharray:5 5" />
<text class="dg-sub" x="442" y="252" text-anchor="middle">nothing acts</text>
<text class="dg-sub" x="442" y="270" text-anchor="middle">on the past</text>
</svg>
<figcaption>The three systems, placed by what they do and when. The unified namespace and the historian only ever read; <strong>SCADA is the one system in the act column</strong> &mdash; the only layer that reaches back and changes the plant. The fourth quadrant stays empty: nothing acts on the past.</figcaption>
</figure>
<p>Strip the vocabulary off and look at what &ldquo;here&rdquo; actually is.</p>
<hr />
<h2 id="what-scada-actually-is">What SCADA actually is</h2>
<p>SCADA &mdash; Supervisory Control And Data Acquisition &mdash; sounds like a category, and
it is sold as one. Underneath, it is two loops around a plant.</p>
<p>The <strong>acquisition</strong> loop polls. Every second or faster, the SCADA server
sweeps its PLCs and asks each one the same question: what is your value now? It writes the
answer into a <strong>tag table</strong> &mdash; one row per tag, holding that tag&rsquo;s
current value &mdash; paints it on the screen, and checks it against a limit. A scan loop, a
last-value table, and an alarm table: that is the whole of it.</p>
<p>That tag table is the primitive, and it is one you already know.
<a href="/blog/unified-namespace">Part 1</a>&rsquo;s namespace was a <strong>tree</strong>;
<a href="/blog/historian">Part 2</a>&rsquo;s historian was an <strong>append-only
log</strong>. SCADA is the third structure in the set: a <strong>mutable key-value
table</strong> (<code>tag &rarr; current value</code>) that is <strong>overwritten on every
scan</strong>. Where the historian appends and keeps all of it, SCADA overwrites and keeps
only <em>now</em> &mdash; same keys, opposite memory. Wrap that table in the loop that
refreshes it, the thresholds that fire on it, and the write-back that pushes values the other
way, and you have SCADA.</p>
<figure class="diagram">
<svg viewBox="0 0 640 322" role="img" aria-labelledby="dgs0-title">
<title id="dgs0-title">SCADA&rsquo;s core: a tag table overwritten every scan, with alarms and write-back</title>
<rect class="dg-box" x="30" y="94" width="110" height="120" rx="10" />
<text class="dg-panel-title" x="85" y="122" text-anchor="middle" style="font-size:11px">Devices</text>
<text class="dg-sub" x="85" y="150" text-anchor="middle">PLCs</text>
<text class="dg-sub" x="85" y="170" text-anchor="middle">sensors</text>
<text class="dg-sub" x="85" y="190" text-anchor="middle">actuators</text>
<path class="dg-connector" d="M140 128 H236" />
<polygon class="dg-arrow" points="236,123 236,133 244,128" />
<text class="dg-sub" x="192" y="118" text-anchor="middle">poll every scan</text>
<rect class="dg-box" x="250" y="66" width="256" height="172" rx="10" />
<text class="dg-panel-title" x="266" y="92">Tag table</text>
<text class="dg-sub" x="266" y="110">last-value cache &middot; overwritten every scan</text>
<line class="dg-divider" x1="258" y1="120" x2="498" y2="120" />
<text class="dg-sub" x="266" y="138">tag</text>
<text class="dg-sub" x="382" y="138">value</text>
<text class="dg-sub" x="452" y="138">limit</text>
<rect x="258" y="148" width="240" height="24" rx="4" style="fill:color-mix(in oklch,var(--orange) 13%,transparent)" />
<text class="dg-mono" x="266" y="165">PT_004</text>
<text class="dg-mono" x="382" y="165" style="fill:var(--orange)">4.2</text>
<text class="dg-mono" x="452" y="165">4.0</text>
<text class="dg-mono" x="266" y="193">LT_012</text>
<text class="dg-mono" x="382" y="193">78%</text>
<text class="dg-mono" x="452" y="193">20</text>
<text class="dg-mono" x="266" y="219">MTR_3</text>
<text class="dg-mono" x="382" y="219">ON</text>
<text class="dg-mono" x="452" y="219">&mdash;</text>
<path class="dg-alt" d="M506 160 H548" />
<polygon class="dg-alt-arrow" points="548,155 548,165 556,160" />
<rect class="dg-alt-box" x="556" y="148" width="76" height="24" rx="8" />
<text class="dg-alt-text" x="594" y="165" text-anchor="middle">ALARM</text>
<path class="dg-alt" d="M300 238 C 232 302, 85 302, 85 224" />
<polygon class="dg-alt-arrow" points="80,232 90,232 85,220" />
<text class="dg-alt-text" x="198" y="256" text-anchor="middle">write-back &middot; setpoint</text>
</svg>
<figcaption>SCADA&rsquo;s core is a <strong>tag table</strong>: one row per tag, holding its current value, overwritten on every scan &mdash; a last-value cache, not a log. The poll loop refreshes it, a crossed limit fires an alarm, and the write-back pushes new setpoints back to the machines. Where the historian appends and keeps everything, this keeps only <em>now</em>.</figcaption>
</figure>
<p>The <strong>control</strong> loop is the half the other two systems in this series do not
have. SCADA does not only read; it writes back. An operator drags a setpoint from 4.4 down
to 4.0, or a scripted rule trips a pump, and SCADA pushes that command to the PLC, which
moves the actual steel.</p>
<p>The word <em>supervisory</em> is doing real work there. The fast, automatic control
&mdash; hold this pressure, trip on that interlock, dozens of times a second &mdash; runs on
the PLC underneath, in the machine, untouched by anyone. SCADA sits a level above it and
supervises many such loops at once. So &ldquo;who acts&rdquo; has two answers: the PLC acts
continuously and automatically on its own logic, and SCADA is where a <em>human at the
screen</em> or a <em>plant-level rule</em> reaches in to retarget or override that logic when
the live picture calls for it. The reflex is the PLC&rsquo;s; SCADA is the hand that changes
what the reflex aims at.</p>
<p>In plainer terms: a <strong>Grafana that also has buttons that do things</strong>, pointed
not at a web service but at physical equipment. Two properties define it, and both matter
later:</p>
<ul>
<li><strong>It lives in the present.</strong> The table holds this scan and nothing before
it &mdash; enough to trend on the screen for the shift, not enough to answer &ldquo;was this
normal in March.&rdquo; Its whole world is <em>now</em>.</li>
<li><strong>It can act.</strong> It is the only layer in this series with a hand on the
plant. The UNS observes and moves; the historian observes and keeps; <strong>SCADA observes
and changes the physical state of the world.</strong> That capability is the entire point of
it, and the entire risk.</li>
</ul>
<hr />
<h2 id="what-it-solves">What it solves</h2>
<p>Before SCADA, running a plant meant a person standing at the machine, reading a gauge,
turning a valve. SCADA collapses the distance: <strong>one operator, one room, the whole
plant live in front of them.</strong> Every tank level, every motor, every line, visible at
a glance, alarmed the moment it strays, adjustable without walking out to the floor.</p>
<p>That is genuinely foundational. This is not analytics or optimization; it is
<strong>how a plant is run, minute to minute</strong>, on the night shift, when something
starts to drift and someone has thirty seconds to catch it. Real-time visibility and the
ability to reach in and correct &mdash; reliably, across thousands of tags, for decades
&mdash; is hard-won infrastructure, and every plant on earth depends on it to operate at
all.</p>
<hr />
<h2 id="where-it-fits">Where it fits</h2>
<p>SCADA is the <strong>real-time acquisition and control layer</strong>, and it sits at the
bottom of the three, closest to the machines. The other two are built on what it produces.
Follow one reading and the stack falls into place: the 4.2 bar on Line 2 is born in SCADA
&mdash; it polled the filler&rsquo;s PLC &mdash; SCADA alarms on it and lets the operator
act, and only then does that value flow onto the <strong>unified namespace</strong> to be
distributed and into the <strong>historian</strong> to be kept. <strong>Sense and act here;
move there; remember there.</strong> A plant runs all three.</p>
<figure class="diagram">
<svg viewBox="0 0 560 384" role="img" aria-labelledby="dgs1-title">
<title id="dgs1-title">SCADA is the foundation the series has been standing on</title>
<rect class="dg-box" x="20" y="18" width="520" height="60" rx="10" />
<text class="dg-label" x="40" y="46">Understanding</text>
<text class="dg-sub" x="40" y="68">why did it happen? &middot; is this normal? &middot; should we have acted?</text>
<rect class="dg-box" x="20" y="100" width="520" height="54" rx="10" />
<text class="dg-label" x="40" y="128">Historian</text>
<text class="dg-sub" x="40" y="148">every value, ever &mdash; Part 2</text>
<rect class="dg-box" x="20" y="176" width="520" height="54" rx="10" />
<text class="dg-label" x="40" y="204">Unified Namespace</text>
<text class="dg-sub" x="40" y="224">live state, in motion &mdash; Part 1</text>
<rect class="dg-box-accent" x="20" y="252" width="520" height="60" rx="10" />
<text class="dg-label" x="40" y="280" style="fill:var(--orange)">SCADA</text>
<text class="dg-sub" x="40" y="302">sense &middot; alarm &middot; act &mdash; real-time, and the only layer that touches the steel</text>
<rect class="dg-chip" x="20" y="334" width="520" height="34" rx="8" style="stroke-dasharray:4 4" />
<text class="dg-sub" x="280" y="355" text-anchor="middle">PLCs &middot; sensors &middot; actuators</text>
<g class="dg-connector">
<path d="M140 250 V234" /><path d="M280 250 V234" /><path d="M420 250 V234" /><path d="M140 174 V158" /><path d="M280 174 V158" /><path d="M420 174 V158" /><path d="M140 98 V82" /><path d="M280 98 V82" /><path d="M420 98 V82" />
</g>
<g class="dg-arrow">
<polygon points="135,236 145,236 140,228" /><polygon points="275,236 285,236 280,228" /><polygon points="415,236 425,236 420,228" /><polygon points="135,160 145,160 140,152" /><polygon points="275,160 285,160 280,152" /><polygon points="415,160 425,160 420,152" /><polygon points="135,84 145,84 140,76" /><polygon points="275,84 285,84 280,76" /><polygon points="415,84 425,84 420,76" />
</g>
<path class="dg-alt" d="M300 314 V330" /><polygon class="dg-alt-arrow" points="295,328 305,328 300,334" />
<text class="dg-alt-text" x="316" y="327">act</text>
<path class="dg-alt" d="M240 330 V314" /><polygon class="dg-alt-arrow" points="235,318 245,318 240,312" />
<text class="dg-alt-text" x="196" y="327">sense</text>
</svg>
<figcaption>SCADA is the foundation the series has been standing on: it senses and commands the machines, then hands each reading up to the UNS to move and the historian to keep. Born here, moved there, remembered there &mdash; and it is the only layer that can reach back down and act.</figcaption>
</figure>
<p>There is one honest tension worth naming, because the marketing hides it. SCADA used to
be the hub for all of it: every other system integrated point-to-point through the SCADA
server, and the result was the N-squared spaghetti
<a href="/blog/unified-namespace">Part 1</a> described. The unified namespace is, in part, a
revolt against exactly that &mdash; publish each event once to a broker instead of routing
everything through SCADA. So the UNS both <em>depends on</em> SCADA (it moves what SCADA
senses) and <em>displaces</em> it (it takes over the distribution SCADA used to own).
Cooperative layers, with a live turf war at the seam.</p>
<figure class="diagram">
<svg viewBox="0 0 660 300" role="img" aria-labelledby="dgs3-title">
<title id="dgs3-title">Point-to-point integration through SCADA versus a unified namespace</title>
<line class="dg-divider" x1="330" y1="26" x2="330" y2="284" stroke-dasharray="4 6" />
<text class="dg-panel-title" x="165" y="28" text-anchor="middle">Point-to-point</text>
<text class="dg-panel-title" x="497" y="28" text-anchor="middle">Unified namespace</text>
<g class="dg-mesh">
<line x1="165" y1="70" x2="249" y2="131" /><line x1="165" y1="70" x2="217" y2="229" /><line x1="165" y1="70" x2="113" y2="229" /><line x1="165" y1="70" x2="81" y2="131" /><line x1="249" y1="131" x2="217" y2="229" /><line x1="249" y1="131" x2="113" y2="229" /><line x1="249" y1="131" x2="81" y2="131" /><line x1="217" y1="229" x2="113" y2="229" /><line x1="217" y1="229" x2="81" y2="131" /><line x1="113" y1="229" x2="81" y2="131" />
</g>
<g>
<circle class="dg-node" cx="165" cy="70" r="27" /><text class="dg-label-sm" x="165" y="74" text-anchor="middle">SCADA</text>
<circle class="dg-node" cx="249" cy="131" r="27" /><text class="dg-label-sm" x="249" y="135" text-anchor="middle">MES</text>
<circle class="dg-node" cx="217" cy="229" r="27" /><text class="dg-label-sm" x="217" y="233" text-anchor="middle">ERP</text>
<circle class="dg-node" cx="113" cy="229" r="27" /><text class="dg-label-sm" x="113" y="233" text-anchor="middle">BI</text>
<circle class="dg-node" cx="81" cy="131" r="27" /><text class="dg-label-sm" x="81" y="135" text-anchor="middle">HIST</text>
</g>
<text class="dg-sub" x="165" y="272" text-anchor="middle">every system wired to every other</text>
<g class="dg-spoke">
<line x1="497" y1="158" x2="497" y2="70" /><line x1="497" y1="158" x2="581" y2="131" /><line x1="497" y1="158" x2="549" y2="229" /><line x1="497" y1="158" x2="445" y2="229" /><line x1="497" y1="158" x2="413" y2="131" />
</g>
<g>
<circle class="dg-node" cx="497" cy="70" r="27" /><text class="dg-label-sm" x="497" y="74" text-anchor="middle">SCADA</text>
<circle class="dg-node" cx="581" cy="131" r="27" /><text class="dg-label-sm" x="581" y="135" text-anchor="middle">MES</text>
<circle class="dg-node" cx="549" cy="229" r="27" /><text class="dg-label-sm" x="549" y="233" text-anchor="middle">ERP</text>
<circle class="dg-node" cx="445" cy="229" r="27" /><text class="dg-label-sm" x="445" y="233" text-anchor="middle">BI</text>
<circle class="dg-node" cx="413" cy="131" r="27" /><text class="dg-label-sm" x="413" y="135" text-anchor="middle">HIST</text>
<circle class="dg-hub" cx="497" cy="158" r="30" /><text class="dg-accent-text" x="497" y="162" text-anchor="middle">UNS</text>
</g>
<text class="dg-sub" x="497" y="272" text-anchor="middle">publish once, subscribe once</text>
</svg>
<figcaption>Historically every system integrated point-to-point, often through SCADA &mdash; N-squared spaghetti (left). The unified namespace flips it: each system publishes and subscribes once to a shared broker (right). SCADA still senses and acts, it just stops being the plant&rsquo;s switchboard.</figcaption>
</figure>
<p>What SCADA is <em>not</em> is a place where anything is <em>understood</em> &mdash; and by
now the technologist&rsquo;s reflex should be twitching, because <strong>a
monitoring-and-control console executes rules, it does not hold a model.</strong> Your
alerting system pages you when CPU crosses 90%; it has no idea whether 90% is fine for this
service or a five-alarm fire, because that judgment was never in the threshold. SCADA is the
same, wired to a valve. It is so good at watching and reacting that it is tempting to mistake
reaction for judgment.</p>
<p>It isn&rsquo;t. Here is where that cracks.</p>
<hr />
<h2 id="the-example">The specific example: the control room on Line 2</h2>
<p>Same Tuesday, same filler. The control room is where the excursion actually surfaces, and
SCADA does exactly what it is built to do:</p>
<p><strong>Live, alarmed, actionable.</strong> <code>PT_004</code> climbs past its 4.0 bar
alarm limit; the tag goes red; the banner fires; the operator sees it in seconds and
throttles the supply valve from the screen without leaving the chair. Present-tense sensing,
a threshold, a hand on the world. This is SCADA&rsquo;s home turf, and neither the UNS nor
the historian could have done any of it.</p>
<p>Then the questions start, and every one lands outside the scan loop:</p>
<ul>
<li><strong>&ldquo;Is 4.2 bar even a problem?&rdquo;</strong> SCADA has a limit, not a norm.
Someone typed 4.0 into an alarm field once; whether that is right for the 500&nbsp;ml SKU
running now, SCADA has no idea. The threshold is a guess frozen in a config.</li>
<li><strong>&ldquo;Was it climbing, or did it spike?&rdquo;</strong> The scan loop holds the
last value. The shape over the last twenty minutes is the historian&rsquo;s to answer, not
SCADA&rsquo;s. It forgot.</li>
<li><strong>&ldquo;What else moved with it?&rdquo;</strong> The glycol-skid temperature is
right there on another screen, but SCADA sees a wall of independent tags. That the two share
a loop is a fact about the plant SCADA does not hold.</li>
<li><strong>&ldquo;Should the operator have throttled that valve at all?&rdquo;</strong>
SCADA will execute the command either way. Whether it was the right move &mdash; given the
product, the batch, the upstream cause &mdash; is a judgment the console has no way to make.
It offers the lever; it cannot weigh the pull.</li>
</ul>
<figure class="diagram">
<svg viewBox="0 0 640 288" role="img" aria-labelledby="dgs2-title">
<title id="dgs2-title">SCADA is a reflex loop that never asks whether it should</title>
<text class="dg-panel-title" x="120" y="30" text-anchor="middle">Sense</text>
<text class="dg-panel-title" x="320" y="30" text-anchor="middle">Threshold</text>
<text class="dg-panel-title" x="520" y="30" text-anchor="middle">Act</text>
<rect class="dg-box" x="36" y="44" width="168" height="46" rx="9" />
<text class="dg-mono" x="120" y="72" text-anchor="middle">PT_004 &gt; 4.0 bar</text>
<rect class="dg-box-accent" x="236" y="44" width="168" height="46" rx="9" />
<text class="dg-label-sm" x="320" y="72" text-anchor="middle">over the limit</text>
<rect class="dg-box" x="436" y="44" width="168" height="46" rx="9" />
<text class="dg-label-sm" x="520" y="72" text-anchor="middle">throttle the valve</text>
<g class="dg-connector"><path d="M204 67 H230" /><path d="M404 67 H430" /></g>
<g class="dg-arrow"><polygon points="230,62 230,72 238,67" /><polygon points="430,62 430,72 438,67" /></g>
<path class="dg-connector" d="M520 90 C 520 158, 120 158, 120 92" />
<polygon class="dg-arrow" points="115,98 125,98 120,90" />
<text class="dg-sub" x="320" y="115" text-anchor="middle">next scan &mdash; again</text>
<text class="dg-panel-title" x="320" y="172" text-anchor="middle" style="fill:var(--muted-foreground)">What the loop never asks</text>
<rect class="dg-chip" x="36" y="188" width="168" height="52" rx="9" />
<text class="dg-label-sm" x="120" y="210" text-anchor="middle">Is 4.2 normal?</text>
<text class="dg-sub" x="120" y="228" text-anchor="middle">needs the historian</text>
<rect class="dg-chip" x="236" y="188" width="168" height="52" rx="9" />
<text class="dg-label-sm" x="320" y="210" text-anchor="middle">Right for this SKU?</text>
<text class="dg-sub" x="320" y="228" text-anchor="middle">needs a model</text>
<rect class="dg-chip" x="436" y="188" width="168" height="52" rx="9" />
<text class="dg-label-sm" x="520" y="210" text-anchor="middle">Why did it rise?</text>
<text class="dg-sub" x="520" y="228" text-anchor="middle">needs the plant graph</text>
</svg>
<figcaption>SCADA&rsquo;s whole logic is a loop: a tag crosses a limit, the console calls it an alarm, someone or something acts, and the next scan runs it again. Fast and reliable. It never asks whether the number was normal, whether the limit is right for what is running, or why it moved &mdash; those live in the historian, a model, and the plant graph, none of which the loop touches.</figcaption>
</figure>
<p>SCADA sensed, compared against a number, and acted &mdash; start to finish, in seconds,
correct by its own lights. It also never asked whether the number was right, whether the
moment was normal, or why any of it was happening. It is a perfect reflex attached to
nothing.</p>
<hr />
<h2 id="reflexes-arent-judgment">Reflexes aren&rsquo;t judgment</h2>
<p>Strip it to the logic and SCADA is <em>sense, compare to a threshold, react</em> &mdash;
and a threshold carries no memory, no relationships, and no meaning. It is the plant&rsquo;s
autonomic nervous system: a knee jerking when the hammer taps it, at machine scale, across
ten thousand tags. It cannot tell whether 4.2 bar is normal (that is the historian), whether
it is right for the product running now (that needs a model), or why it moved and what moved
with it (that needs the plant graph). A reflex is an action; judgment is that action plus
what came before, what it depends on, and what it means.</p>
<p>And that gap matters more here than anywhere else in the series, because this is the
layer that <em>acts</em>. Part&nbsp;2 made the case that a stored number isn&rsquo;t an
answer &mdash; but a historian can keep a number it doesn&rsquo;t understand and nothing
happens. SCADA is the one layer that <em>acts</em> on the number it doesn&rsquo;t
understand, and when it acts, steel moves. Same blind spot; only here does it have a hand
on the plant.</p>
<hr />
<h2 id="the-hard-parts">What it costs to run one</h2>
<p>None of this is free, and SCADA&rsquo;s bill has a sharper edge than the others, because
<strong>the thing it does &mdash; act &mdash; is the thing that goes wrong.</strong></p>
<ul>
<li><strong>Alarm floods are the standing disease.</strong> Every threshold is easy to add
and nobody owns removing them, so control rooms drown in thousands of nuisance alarms a
shift. Operators normalize the red, and the one alarm that mattered scrolls past in the
noise. There is an entire standard (<a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa18" target="_blank" rel="noopener noreferrer">ISA-18.2</a>) that exists only because this
failure is universal.</li>
<li><strong>The HMI is built by hand, tag by tag.</strong> Every screen, every mimic, every
alarm limit is drawn and typed by an integrator and owned for a decade. Rename a tag and a
graphic goes blank. It is the same tag-dictionary project the historian had, with pictures
on top.</li>
<li><strong>Deep vendor lock.</strong> <a href="https://inductiveautomation.com/" target="_blank" rel="noopener noreferrer">Ignition</a>, AVEVA (Wonderware),
FactoryTalk, Siemens WinCC &mdash; each with its own tags, scripting, and drivers, none
portable, one per site.</li>
<li><strong>It is the write path to the physical world.</strong> SCADA is the one system
that can move actuators, which makes it the one whose compromise is a safety event, not a
data breach. It is what <a href="https://en.wikipedia.org/wiki/Stuxnet" target="_blank" rel="noopener noreferrer">Stuxnet</a> went after. Every convenience of remote
control is also an attack surface on the steel.</li>
<li><strong>And it still isn&rsquo;t memory or a model.</strong> Even run perfectly,
everything past the current instant &mdash; history, relationships, meaning &mdash; is
somebody else&rsquo;s problem.</li>
</ul>
<p>None of these are reasons not to run SCADA; you cannot operate a plant without it. They
are the reason it is a control system, not a judgment system &mdash; and the reason the
reflex only becomes safe to lean on once something above it knows what the numbers
mean.</p>
<hr />
<h2 id="the-one-line">The one line</h2>
<p>SCADA is the right way to watch and command the plant in real time, and the wrong thing
to mistake for a system that knows what it is doing. The memory, the relationships, and the
meaning its reflexes lack are exactly what a <a href="/architecture">context layer adds on
top</a> &mdash; treating SCADA as a first-class source, and, when the moment comes to act,
acting with judgment instead of a threshold.</p>
<blockquote>
<p>ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model
of a plant &mdash; its assets, its history, its documents, and the tribal knowledge in
between &mdash; that <a href="/use-cases">AI agents can actually reason over</a>. If your
control room reacts to every number and understands none of them, talk to us.</p>
</blockquote>`
