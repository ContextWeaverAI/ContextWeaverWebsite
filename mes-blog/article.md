# The MES, honestly

## What it tracks, what it can't, and the software patterns hiding underneath it

*Deconstructing the Smart Factory · Part 3 — a technologist's read on the plant's execution record.*

---

In [Part 2](/blog/historian), the historian gave us Line 2's pressure history in seconds and then ran out of road on a question that wasn't about numbers at all: *which batch was on the line at 14:03, and where did that lot go next?* Tag `PT_004` had never heard of batch #4471. The historian punted us to the system that has — and that system is the one this piece is about.

Walk over to it and you're looking at a different kind of screen. Not a trend, a **work-order list**. Order #4471, product 500 ml SKU, a route defined step by step, a status against each step, a timestamp, an operator's name. Ask which batch ran at 14:03 and you have it instantly: #4471, filled on Line 2, released to packaging at 14:40, palletized into shipment S-201. After two systems that knew signals and numbers, here at last is one that knows *things* — orders, batches, lots, the units of work the plant actually makes.

It feels like the missing piece. In a real sense it is. It's also the third system in a row that keeps exactly the structure it was built for and quietly drops everything that crosses it. To see why, strip the vocabulary off.

---

## What an MES actually is

"MES" barely names one thing. Ask two plants and you'll get two different suites: planning and scheduling here, quality and holds there, product tracking and genealogy, work instructions, labor, OEE — the [MESA model](https://www.mesa.org/) lists around eleven functions, and most deployments are a stack of modules from a stack of vendors. It looks less like a product than a category.

Strip the vocabulary away, though, and every one of those modules is a front-end over the **same primitive: a workflow engine.** A state machine per unit of work, and an append-only log of its transitions.

Watch one work order move and the whole suite collapses into that shape. **Planning** writes the intended path: #4471 runs on Line 2 at 14:00, recipe R-12. **Execution** advances a pointer along it — `dispatched → filling → capping → labeling → QA → complete` — stamping each transition with the resin lot consumed, the machine, the operator. **Quality** gates a transition: pass releases the order downstream; fail forces it into `HOLD` and blocks the move until someone records a disposition. **Genealogy** is nothing more than that transition log read back afterward. Four modules, four screens, one object underneath: a unit of work with a current state, a set of legal next states, and a durable history of how it got there.

If you've reached for [Temporal](https://temporal.io/) or a workflow engine, you already understand an MES, because that's what it is: **event sourcing on the plant floor.** Two properties make it more than "a table with a status column":

- **It enforces the transitions.** A historian stores whatever you send it; an MES won't let you ship an order that hasn't passed QA. The routing isn't a suggestion, it's a guard. That's the "E" in MES — it's an *active* record, one that can say no.
- **The log is the record.** The live question ("where is #4471 right now, what's allowed next") and the permanent one ("every step it ever went through") are the same event log read two ways. State is a fold over the history. That's why the old argument about whether an MES is "really" a state machine or "really" a system of record dissolves: it's a state machine *whose transition log is the system of record.* One object, two faces.

---

## What it solves

The win is exactly the thing the last two systems structurally couldn't give: **identity and linkage for what the plant made.**

The UNS moved live signals; the historian remembered numbers; neither had ever heard of a batch. The MES is built around the batch. It knows #4471 consumed resin lot RL-88, ran on Line 2, was operated by Priya, passed QA at 14:38, and shipped in S-201 — and it can walk that chain in either direction. That's **genealogy**, and it's the backbone of every recall, every "which units got the bad lot," every regulated e-record. When a defect surfaces in the field three months out, the MES is the system that can name the other units at risk. Building that yourself — transactional, auditable, enforced — is genuinely hard, and the MES has it solved and hardened. For the problem of *tracking what was made and making the process actually get followed*, this is real, load-bearing infrastructure, and the industry is right to run production on it.

---

## Where it fits

An MES is a **system of record for the process** — the ledger of what was made and how it moved. It sits beside the two systems from the earlier parts: the UNS moves the live event, the historian remembers the numbers, the MES records the *work*. In software terms, it's the workflow service and its event store, sitting on the same plant as the message bus and the time-series database. A well-run factory has all three, and needs all three.

*[Diagram: four layers — Understanding on top, then MES (accent), Historian, and Unified Namespace below. The MES is the execution layer; like the others, it still sits below understanding.]*

What it is *not* is a place where anything is *understood* — and here a technologist's instincts should twitch again, because **a workflow engine models the process, not the world the process runs in.** It captures the states you defined, on the schema you configured, and nothing else. Temporal knows your workflow ran step 4 after step 3; it has no opinion on the machine that did step 4, the physics inside it, or why step 4 keeps retrying. An MES is the same. It's so good at recording the process that it's tempting to mistake the process record for a model of the plant.

It isn't. Here's where that cracks.

---

## The specific example: the work order on Line 2

Same Tuesday, same defect on Line 2's filler. The historian sent us here for the batch, and the MES delivers on exactly that:

**"Which batch ran at 14:03, and where did the lot go?"** #4471, filled on Line 2, operator Priya, released to packaging at 14:40, into shipment S-201. Clean, instant, auditable. This is the MES's home turf, and it's genuinely the thing the historian couldn't do.

Then the investigation keeps going, and the MES hits a wall the shape of its own schema:

- **"Why did #4471 nearly fail QA?"** The MES logged the `HOLD` and a disposition *code* — "pressure deviation, released on review." Not the cause. The 4.2-bar excursion lives in the historian; the recipe edit that drove it lives in the control system; the MES records the *outcome* of the step, never the physics beneath it.
- **"Was the glycol skid involved?"** The skid isn't a step in any routing, so it isn't in the MES model at all. Off-schema, invisible — the same shared resource the UNS's tree couldn't place and the historian kept as an unrelated pen.
- **"Has this failure mode hit other lines, or the 2 L SKU?"** This MES instance knows its own orders on its own site. The cross-line relationships and the other plant's identical filler live in other databases, behind other logins. Two plants, two islands.
- **"What did Priya actually do to recover it?"** The act is a code. The knowledge — the trick she used, the thing she watched — is free text in a field nobody queries, or on paper, or in her head.

*[Diagram: one green check — "which batch / where did the lot go / did it pass" (the MES nails this) — over four red rows needing the physics, the cause, the asset graph, and the tribal knowledge.]*

The MES answered the question the historian handed it, and then ran out of road at the edge of its own routing. It knows *what happened to every order.* It has no idea *why any of it happened.* It's a perfect account of the process, attached to nothing around the process.

---

## A record of the plan isn't a model of the plant

Here's the part a tidy work-order list hides: the MES models the world as a set of predefined workflows on a fixed schema, and that makes it a **closed world.** It is excellent at the process it was configured for, and blind to everything off-model. Watch what falls through — and notice it's the same three things every time.

- **Identity, but only of the work.** The MES has real identity where the historian had bare strings: #4471 is a *thing*, not a tag. But only units of work are things. The oven, the glycol skid, the filler itself — the physical assets the work runs *on* — are at most attributes on a routing, not first-class objects with histories of their own.
- **Linkage, but only along the routing.** The MES has edges the historian dropped: batch to lot to shipment, in a clean chain. But every edge that doesn't run along the process is still gone. The filler and the glycol skid share one physical loop; to the MES they share nothing, because the loop isn't a step. It keeps the edges it was told to model and drops the ones the plant actually has — the same graph the UNS's tree couldn't hold and the historian didn't either.
- **The event, but not the cause.** It records that #4471 went on hold and was released. Not the pressure excursion that triggered it, not the recipe change that caused *that*, not what the operator understood in the moment. The symptom is a state transition; the cause and the context are in three other systems, or in someone's head.

An order record is a fact — precise, auditable, true. It just isn't a model. A model would tie the process to the assets it ran on, the physics the historian measured, the documents that specify it, and the people who intervened. That's identity across *all* the plant's objects, edges that cross schemas, and meaning that survives the join — exactly what a workflow engine over a fixed routing was never built to carry. A state machine can tell you a unit went on hold. It takes a model to tell you why holds keep happening.

---

## What it costs to run one

None of this is free, and of the three systems in this series the MES has the worst reputation for a reason. Standing one up runs into walls that are, by now, familiar.

- **The process model is the actual project.** "Put in an MES" hides the hard part: someone configures every routing, BOM, quality plan, and work instruction for every product on every line — and then owns it as the plant changes underneath them. It's a multi-year build that's partly obsolete on go-live, because the floor moved while you were modeling it. Schema design with a change-control board attached.
- **Rigidity is the price of enforcement.** The same guard that guarantees QA-before-ship makes every real-world exception — a rush order, a manual rework, a one-off deviation — a fight with the system. Push too hard and operators route around the MES, keeping the truth on a clipboard, and the as-run record quietly drifts from what actually ran.
- **One MES per plant, and they don't federate.** Deep vendor lock ([Rockwell](https://www.rockwellautomation.com/), Siemens Opcenter, [AVEVA](https://www.aveva.com/)), a [B2MML / ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95) integration to talk to ERP, and every site its own island with its own conventions. The cross-plant question has nowhere to live.
- **It still isn't a model.** Even done perfectly, you have a flawless account of the process and zero understanding of the plant. The assets, the physics, the documents, the tribal knowledge — still somebody else's problem.

None of these are reasons not to run an MES; you can't do serious, regulated manufacturing without one. They're the reason it's a system of record for the process, not a source of answers about the plant — and the reason the record only pays off once something on top of it knows what the process was running on.

---

## The one line

An MES is the right place to record how work moved through the plant, and the wrong thing to mistake for a model of the plant it moved through. The assets, the relationships, the physics, and the meaning it can't hold are exactly what a [context layer adds on top](/architecture) — treating the MES as a first-class source, not a rival.

> ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a plant — its assets, its history, its documents, and the tribal knowledge in between — that [AI agents can actually reason over](/use-cases). If your MES records every step and understands none of it, talk to us.
