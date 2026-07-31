# The MES, honestly

## What it tracks, what it can't, and the software patterns hiding underneath it

*Deconstructing the Smart Factory · Part 4 — a technologist's read on the plant's execution record.*

---

Three parts, one number. `PT_004` on Line 2's filler read 4.2 bar last Tuesday: [SCADA](/blog/scada) sensed it and threw the alarm, the [unified namespace](/blog/unified-namespace) carried it, the [historian](/blog/historian) filed it away. Part 3 landed on the sharpest version of the problem — SCADA is the one layer with a hand on the plant, and it acts on that number with a reflex against a threshold, never a judgment about it.

Now ask a question that number cannot answer at any of those three layers.

> **What was the plant making at the time?**
>
> *(rendered as the article's pivot line: centered display type under a short orange rule, not a blockquote — see `p.pivot` in `article-html.ts`)*

Not what the pressure was. What was **in** the machine — which batch, on which order, from which resin lot, bound for which shipment. Tag `PT_004` has never heard of batch #4471, and no amount of sensing, moving, or remembering a pressure reading will introduce them. That question belongs to a different system, because it belongs to a different axis of the plant: not the signal, but the work.

Walk over and the screen changes: not a trend, a **work-order list**. Order #4471, 500 ml SKU, a route, a status against each step, an operator's name. Ask which batch ran at 14:03 and it answers instantly. After three systems that knew only signals and numbers, here is one that knows *things* — orders, batches, lots. It feels like the missing piece, and in part it is. Strip the vocabulary off and you can see both why it helps, and where it stops.

---

## What an MES actually is

"MES" barely names one thing. Ask two plants and you'll get two different suites: planning and scheduling here, quality and holds there, product tracking and genealogy, work instructions, labor, OEE — the [MESA model](https://mesa.org/topics-resources/mesa-model/history-of-the-mesa-models/) lists around eleven functions, and most deployments are a stack of modules from a stack of vendors. It looks less like a product than a category.

Strip the vocabulary away, though, and every one of those modules is a front-end over the **same primitive: a workflow engine.** A state machine per unit of work, and an append-only log of its transitions.

Watch one work order move and the suite collapses into that shape. **Planning** writes the intended path, **Execution** walks the order along it and stamps each step, **Quality** gates the moves, and **Genealogy** is just the log read back afterward. Four modules, one object: a unit of work with a current state, a set of legal next states, and a durable history of how it got there. On a slide it looks like a clean line.

*[Diagram: two panels. Left "the happy path" — DISPATCHED → FILLING → CAPPING → QA → RELEASED, a clean chain. Right "what you actually ship" — the same spine tangled with a rework loop (QA back to FILLING), a HOLD branch, a SCRAP terminal, and "+ splits, merges, resume-from-hold, manual overrides…". Caption: modeling the happy path takes an afternoon; modeling the exceptions is the project.]*

That gap is where MES work actually lives. A unit fails QA and loops back for rework — from which step? A batch splits into two pallets bound for different customers, and one order becomes two genealogies. A line stops mid-fill and resumes an hour later — same run, or not? An operator forces a move the model never allowed. Each is a transition someone has to define, and no two plants define them the same way. Modeling the happy path is an afternoon; modeling every exception is the multi-year project, and most of why no two MES deployments look alike.

None of it needs an exotic engine, though. The core of an MES is two tables and a rule:

```sql
CREATE TABLE order_event (      -- the append-only log
  order_id   int,
  from_state text,
  to_state   text,
  at         timestamptz,
  operator   text
);

-- batch #4471's whole life, one row per transition:
--   (none)      → DISPATCHED   14:00   scheduler
--   DISPATCHED  → FILLING      14:03   priya
--   FILLING     → QA           14:36   priya
--   QA          → HOLD         14:37   qa-check
--   HOLD        → RELEASED     14:40   r.menon

-- "current state" isn't stored. it's a fold over the log:
SELECT to_state FROM order_event
WHERE order_id = 4471
ORDER BY at DESC LIMIT 1;        -- → RELEASED
```

That's the heart of it. An append-only `order_event` log, a `transitions` table listing which moves are legal, and a current state that isn't stored but *derived* — a fold over the log. This is **event sourcing**, and you can stand the core up on Postgres in an afternoon. [Temporal](https://temporal.io/), Camunda, or a commercial MES add durability, retries, a UI, and a decade of exception-handling on top — but the engine underneath is these two tables. It's also why most plants have three half-built ones: an Access app, a SQL Server instance, and a SaaS tool nobody ever decommissioned.

*[Diagram: two stacked panels. Top "the log — append only" — five transition rows for batch #4471 ((none)→DISPATCHED 14:00 scheduler, DISPATCHED→FILLING 14:03 priya, FILLING→QA 14:36 priya, QA→HOLD 14:37 qa-check, HOLD→RELEASED 14:40 r.menon), the last row accented, an arrow folding out of it to a chip reading "current state = RELEASED / derived by folding the log, never stored", and a note that rows are only appended, never updated or deleted. Bottom "the guard — the transitions table" — FILLING → QA → RELEASED ticked as legal, FILLING ⇢ RELEASED crossed out as rejected: no such edge, QA never happened.]*

Two things separate that from "a table with a status column." It **enforces** the legal moves — a historian stores whatever you send it; an MES won't let you ship an order that hasn't passed QA, because the `transitions` table forbids the jump. And **the log is the record**: the live "where is #4471 now" and the permanent "every step it took" are the same events read two ways. That's why the old argument over whether an MES is "really" a state machine or a system of record dissolves — it's a state machine whose transition log is the system of record. One object, two faces.

---

## What it solves

The win is exactly the thing the last three systems structurally couldn't give: **identity and linkage for what the plant made.**

SCADA sensed live signals and acted on them; the UNS moved them; the historian remembered them; not one of the three had ever heard of a batch. The MES is built around the batch. It knows #4471 consumed resin lot RL-88, ran on Line 2, was operated by Priya, was held at QA and released on review at 14:40, and shipped in S-201 — and it can walk that chain in either direction. That's **genealogy**, and it's the backbone of every recall, every "which units got the bad lot," every regulated e-record. When a defect surfaces in the field three months out, the MES is the system that can name the other units at risk. Building that yourself — transactional, auditable, enforced — is genuinely hard, and the MES has it solved and hardened. For the problem of *tracking what was made and making the process actually get followed*, this is real, load-bearing infrastructure, and the industry is right to run production on it.

---

## Where it fits

An MES is a **system of record for the process** — the ledger of what was made and how it moved. It sits beside the three systems from the earlier parts: SCADA senses the live value and acts on it, the UNS moves it, the historian remembers it, and the MES records the *work* all three were serving the whole time. In software terms, it's the workflow service and its event store, sitting on the same plant as the control console, the message bus, and the time-series database. A well-run factory has all four, and needs all four.

One caveat on that picture: the arrows do not all point up. Work gets *dispatched* as well as recorded. The MES releases the order to the line and hands down the recipe and setpoints the batch is meant to run at, and that path runs the other way — down through the namespace and into [SCADA](/blog/scada), which owns the write to the machines. It skips the historian entirely: nothing is ever dispatched to memory. The MES sits on both paths, and only one of them is a record.

*[Diagram: two panels. Left "the stack we draw" — the tidy chain Understanding → MES → Historian → Unified Namespace → SCADA, captioned "one chain, bottom to top". Right "what's actually wired" — the same systems as a graph: PLCs & sensors at the bottom, SCADA above them, the Unified Namespace above that, with MES and Historian side by side fanning off it and Understanding spanning the top. Readings rise; a command path (accent) runs back down MES → namespace → SCADA → the machines. The Historian has no outbound edge. Between MES and Historian sits a broken, crossed-out link labelled "no link: the hold stays unexplained".]*

What it is *not* is a place where anything is *understood* — and here a technologist's instincts should twitch again, because **a workflow engine models the process, not the world the process runs in.** It captures the states you defined, on the schema you configured, and nothing else. Temporal knows your workflow ran step 4 after step 3; it has no opinion on the machine that did step 4, the physics inside it, or why step 4 keeps retrying.

An MES is the same, and the everyday version of it is sitting in a glovebox. A car's service book is a genuine record: every service stamped, dated and signed, in order, and exactly what you want when a fault turns out to be systemic rather than a one-off. It also has nothing to say about why the pads keep wearing early, and the ABS computer from [Part 1](/blog/unified-namespace) — the one that reads all four wheels at once and broke the tidy tree — appears nowhere in it. The book is a faithful account of what was done to the car, kept by people who never had to explain the car. An MES is so good at recording the process that it's tempting to mistake the process record for a model of the plant.

It isn't. Here's where that cracks.

---

## The specific example: the work order on Line 2

Same Tuesday, same defect on Line 2's filler. The question that stalled at every layer of the signal stack lands here, and the MES delivers on exactly that:

**"Which batch ran at 14:03, and where did the lot go?"** #4471, filled on Line 2, operator Priya, released to packaging at 14:40, into shipment S-201. Clean, instant, auditable. This is the MES's home turf, and it's genuinely the thing none of the first three could do.

Then the investigation keeps going, and the MES hits a wall the shape of its own schema:

- **"Why did #4471 nearly fail QA?"** The MES logged the `HOLD` and a disposition *code* — "pressure deviation, released on review." Not the cause. The 4.2-bar excursion lives in the historian; the recipe edit that drove it lives in the control system; the MES records the *outcome* of the step, never the physics beneath it.
- **"Was the glycol skid involved?"** The skid isn't a step in any routing, so it isn't in the MES model at all. Off-schema, invisible — the same shared resource the UNS's tree couldn't place, the historian kept as an unrelated pen, and SCADA saw as just another independent tag.
- **"Has this failure mode hit other lines, or the 2 L SKU?"** This MES instance knows its own orders on its own site. The cross-line relationships and the other plant's identical filler live in other databases, behind other logins. Two plants, two islands.
- **"What did Priya actually do to recover it?"** The act is a code. The knowledge — the trick she used, the thing she watched — is free text in a field nobody queries, or on paper, or in her head.

*[Diagram: one green check — "which batch / where did the lot go / did it pass" (the MES nails this) — over four red rows needing the physics, the cause, the asset graph, and the tribal knowledge.]*

The MES answered the question the signal layers never could, and then ran out of road at the edge of its own routing. It knows *what happened to every order.* It has no idea *why any of it happened.* It's a perfect account of the process, attached to nothing around the process.

---

## A record of the plan isn't a model of the plant

Here's the part a tidy work-order list hides: the MES models the world as a set of predefined workflows on a fixed schema, and that makes it a **closed world.** It is excellent at the process it was configured for, and blind to everything off-model. Watch what falls through — and notice it's the same three things every time.

- **Identity, but only of the work.** The MES has real identity where the historian had bare strings: #4471 is a *thing*, not a tag. But only units of work are things. The oven, the glycol skid, the filler itself — the physical assets the work runs *on* — are at most attributes on a routing, not first-class objects with histories of their own.
- **Linkage, but only along the routing.** The MES has edges the historian dropped: batch to lot to shipment, in a clean chain. But every edge that doesn't run along the process is still gone. The filler and the glycol skid share one physical loop; to the MES they share nothing, because the loop isn't a step. It keeps the edges it was told to model and drops the ones the plant actually has — the same graph the UNS's tree couldn't hold, the historian didn't keep, and SCADA never saw.
- **The event, but not the cause.** It records that #4471 went on hold and was released. Not the pressure excursion that triggered it, not the recipe change that caused *that*, not what the operator understood in the moment. The symptom is a state transition; the cause and the context are in three other systems, or in someone's head.

An order record is a fact — precise, auditable, true. It just isn't a model. A model would tie the process to the assets it ran on, the physics the historian measured, the documents that specify it, and the people who intervened. That's identity across *all* the plant's objects, edges that cross schemas, and meaning that survives the join — exactly what a workflow engine over a fixed routing was never built to carry. A state machine can tell you a unit went on hold. It takes a model to tell you why holds keep happening.

---

## What it costs to run one

None of this is free, and of the four systems in this series the MES has the worst reputation for a reason. Standing one up runs into walls that are, by now, familiar.

- **The process model is the actual project.** "Put in an MES" hides the hard part: someone configures every routing, BOM, quality plan, and work instruction for every product on every line — and then owns it as the plant changes underneath them. It's a multi-year build that's partly obsolete on go-live, because the floor moved while you were modeling it. Schema design with a change-control board attached.
- **Rigidity is the price of enforcement.** The same guard that guarantees QA-before-ship makes every real-world exception — a rush order, a manual rework, a one-off deviation — a fight with the system. Push too hard and operators route around the MES, keeping the truth on a clipboard, and the as-run record quietly drifts from what actually ran.
- **One MES per plant, and they don't federate.** Deep vendor lock ([Rockwell](https://www.rockwellautomation.com/), Siemens Opcenter, [AVEVA](https://www.aveva.com/)), a [B2MML / ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95) integration to talk to ERP, and every site its own island with its own conventions. The cross-plant question has nowhere to live.
- **It still isn't a model.** Even done perfectly, you have a flawless account of the process and zero understanding of the plant. The assets, the physics, the documents, the tribal knowledge — still somebody else's problem.

None of these are reasons not to run an MES; you can't do serious, regulated manufacturing without one. They're the reason it's a system of record for the process, not a source of answers about the plant — and the reason the record only pays off once something on top of it knows what the process was running on.

---

## The one line

An MES is the right place to record how work moved through the plant, and the wrong thing to mistake for a model of the plant it moved through. The assets, the relationships, the physics, and the meaning it can't hold are exactly what a [context layer adds on top](/architecture) — treating the MES as a first-class source, not a rival.

> ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a plant — its assets, its history, its documents, and the tribal knowledge in between — that [AI agents can actually reason over](/use-cases). If your MES records every step and understands none of it, talk to us.
