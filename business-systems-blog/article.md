# The Business Systems, honestly

## What ERP, CRM, CMMS, PLM, and QMS each hold, what falls in the gaps between them, and the software patterns hiding underneath them

*Deconstructing the Smart Factory · Part 5 — a technologist's read on the systems that run the business alongside the line.*

---

In [Part 4](/blog/mes), the MES answered what happened to batch #4471 and then hit the edge of its own routing. *Was the glycol skid involved? Why did the recipe drift? Who's waiting on shipment S-201?* — every one of those questions punted to a different system, and not one of them lives on the plant floor. This part is about where they punted to.

Walk off the floor and into the offices and the screens change again — and keep changing, room to room. Maintenance is staring at a work-order backlog. Engineering has the product's CAD, its bill of materials, and a stack of change orders. Quality is in an audit-ready system of SOPs, deviations, and CAPAs. Sales has the customer account and the open order. And somewhere a very large, very expensive system runs the company's money, materials, and orders all at once.

Take that last one first, because it is the one everyone has heard of. Watch a single customer order move through an **ERP** and you have seen, in miniature, what every system in this part is.

*[Diagram: ERP — a customer order, start to finish. Five boxes in a row inside one bounded frame — Sales order → MRP plan → **Production order** (highlighted red) → Goods issue → Invoice & ledger — with orange flow arrows and the acronym "ERP" in red. Footer: "one process · one company · its own database — and nothing outside this box." Caption: the one red step, the production order, is the only place ERP touches the plant at all.]*

Five polished systems, each indispensable, each with a decade of hardening behind it. Ask any one of them about last Tuesday's excursion and it hands you exactly one true piece of the story and has never heard of the other four.

---

## What these actually are

The acronyms name functions, not architectures. Underneath, all five are the same thing a software engineer has built a dozen times: a **CRUD app over a relational schema** — a system of record for one bounded slice of the business, with its own tables, its own identifiers, and its own model of the world. Domain-driven design even has a word for what each one is: a [**bounded context**](https://martinfowler.com/bliki/BoundedContext.html), a self-consistent model of the world that is deliberately ignorant of everything outside its boundary. It is *microservices* at the scale of a company: one service per business capability, each owning its own database — exactly the decomposition a modern architecture is *supposed* to have.

The tell is that each runs a clean workflow of its own and refers to nothing beyond it. You just watched ERP do it. Here are the other four, each doing its one job well — with the one step in red that the batch-#4471 story will come back to.

### CRM — the customer, cradle to renewal

Sales cannot run on memory. The CRM is the record of every customer and everything promised to them: a lead becomes an opportunity, an opportunity closes, an account opens, a support case tracks the aftermath. [Salesforce](https://www.salesforce.com/) is the archetype.

*[Diagram: CRM — a customer, cradle to renewal. Lead → Opportunity → Closed/won → Account → **Support case** (highlighted red). Caption: the CRM knows the account that ordered the 500 ml SKU and the support case it opens if the shipment slips; it has never heard of the batch, the filler, or the excursion.]*

### CMMS — every asset, kept alive

You cannot keep a fleet of machines running without a system that knows what is due. The CMMS is an asset register plus a maintenance loop: a machine logs runtime, a preventive job comes due, a work order is raised, a technician closes it, and the asset's history grows one more entry. IBM Maximo and SAP PM are typical.

*[Diagram: CMMS — keep every asset alive. Runtime hours → PM due → **Work order** (highlighted red) → Repair & close → Asset history. Caption: the glycol skid is a first-class object here — asset GLY-SKID-02, its work order closed clean two days earlier — and the loop never learned the skid drifted into a batch it will never see.]*

### PLM — the product, as designed

A product changes a hundred times across its life, and someone has to hold the authoritative version. PLM is the engineering-change loop: a part at revision A, a change request, review and approval, a change order, a released revision B, and the bill of materials updated to match. PTC Windchill and Siemens Teamcenter are the heavyweights.

*[Diagram: PLM — the product, revision by revision. Part rev A → Change request → Review & approve → **Change order** (highlighted red) → Released rev B. Caption: the recipe tweak that nudged the fill pressure is a change order here, with author and date; PLM knows what the product should be and never sees the run that drifted from it.]*

### QMS — quality you can prove

A regulated plant has to show, on demand, that the process met spec. The QMS is the compliance loop: a deviation is raised, investigated, a corrective action (CAPA) opened, the governing SOP updated, and the whole thing closed with a sign-off an auditor can follow.

*[Diagram: QMS — a deviation, closed and provable. **Deviation** (highlighted red) → Investigate → CAPA → SOP update → Close & sign-off. Caption: the QA hold on #4471 opens as a deviation here and walks to a signed-off CAPA; it holds the paperwork perfectly and holds no live pressure curve and no asset graph at all.]*

Five workflows, five databases, five faithful little worlds. Each is decades-hardened infrastructure for its function, and, in isolation, each is right. That is worth saying plainly before the rest of this part complicates it: you cannot run a manufacturing business without every one of these.

---

## Where they fit: the shape of a T

The four earlier parts climbed a single trunk. SCADA at the metal, the unified namespace moving what it sensed, the historian remembering it, the MES recording how the work moved — one vertical line, each system standing on the one below, all of it the *manufacturing* spine. The MES is the top of that trunk: the last system whose entire world is the production line itself.

These five are not further up that trunk, and they don't sit under it. They sit **beside the MES, at its level.** At the MES the stack stops climbing and the picture turns sideways into a row — ERP toward money and materials, CRM toward the customer, the CMMS toward the machines' upkeep, PLM toward the product's design, QMS toward the audit. Draw it and it's a **T**: the manufacturing trunk rising up to the MES, and the business systems spread out along the top from there, all on one level, each pointed at a different function of the same company.

*[Diagram: the T. A blue vertical manufacturing trunk — SCADA → Unified Namespace → Historian → rises up the center to the MES. The MES sits on a horizontal crossbar (a shared "ONE LEVEL" band) alongside ERP, CRM, CMMS, PLM, QMS — all six boxes at the same level, acronyms in red, MES marked orange as "top of trunk." The trunk is blue, labeled "Manufacturing trunk · Parts 1–4." Caption: the MES and the business systems sit on one level, the crossbar of a T; the trunk is wired top to bottom, and along the crossbar, nothing runs.]*

That shape is the whole problem in one picture. The trunk is wired top to bottom — a reading flows SCADA → UNS → historian → MES, each layer built on the one under it. Along the crossbar, nothing runs. No two of these systems touch, and none reaches back down the trunk that rises to meet them. And here the technologist's reflex should twitch harder than anywhere in the series — not at any one system, but at the white space along the top. **Each is a faithful model of its own slice; nothing is a model of the whole.**

A software engineer has seen this exact estate and knows its name: a pile of services, each with its own database and its own IDs, no shared identity, no event backbone, integrated pair-by-pair on demand. We call it a distributed monolith, or just integration hell, and we know how it ages. The plant has built the same thing out of purchased systems instead of home-grown ones.

That model isn't in any of them. Here's where that cracks.

---

## The specific example: chasing Line 2 across the offices

Same Tuesday, same filler, same near-miss on batch #4471. The MES handed us four questions it couldn't answer, and every one has a home — just a different system each time. The glycol skid is in the CMMS. The recipe change is in PLM. The hold and the SOP are in QMS. The order, the cost, and resin lot RL-88 are in ERP. The waiting customer is in CRM. Each system holds one true piece. None of them holds the piece next to it.

*[Diagram: batch #4471, the filler, and the glycol skid drawn once in the center, with five faint dashed spokes to five system cards — PLM (part + ECO), ERP (prod. order · fixed asset), CRM (account · case), CMMS (asset GLY-SKID-02), QMS (deviation · SOP), acronyms in red — each showing the different local ID the same real thing carries there, and no edges between the cards. Caption: five true records of the same steel, five different IDs, zero shared identity.]*

Five systems. Each one holds a genuine, load-bearing piece of *why #4471 nearly failed* — the asset that drifted, the recipe that changed, the hold that caught it, the customer who's waiting, the cost at stake. Every piece is true. And no system holds the piece next to it, because the edges that connect them — skid to filler, filler to batch, batch to recipe, recipe to order, order to customer — don't live inside any single system. The answer exists. It's just scattered across five databases behind five logins, and nothing assembles it.

---

## Five systems of record, no system of the plant

For four parts the failure was one system that couldn't understand its own number. This part's failure is stranger, and worse: **five systems that each understand their slice perfectly, and still no one understands the plant** — because understanding the plant means holding the edges *between* the systems, and every one of those edges is exactly what a bounded context is built to ignore. Watch what falls through, and it's the same three things that fell through in every earlier part, now multiplied by five.

- **Identity, five times over.** The historian had bare strings; the MES had identity, but only for units of work. Here every system has real, rich identity — for its own objects. The catch is that the same physical filler is a *fixed asset* in ERP, an *equipment record* in the CMMS, a *part* in PLM, and a *resource* on an MES routing, each with a different ID and a different partial description, and nothing declares them the same thing. Four faithful identities, and no shared one.
- **Relationships, none that cross a boundary.** Each system has clean edges inside itself — ERP's order to its lines, PLM's part to its BOM. But the load-bearing relationships in the real story all cross boundaries: the skid (CMMS) that fed the filler (MES) that ran the batch (ERP) built to the recipe (PLM) that failed the check (QMS). Every one of those edges spans two systems, so it belongs to neither. The graph is real; it's just homeless.
- **Meaning, distributed and unassembled.** "Why did #4471 nearly fail" isn't answered *wrong* by any system — it's answered one-fifth by each, and the assembly is left to a human with five logins and an afternoon. The symptom is in QMS, the cause is in PLM, the contributing asset is in the CMMS, the stakes are in ERP and CRM. Meaning that has to be joined across five schemas is meaning no schema holds.

If you've followed the car since [Part 1](/blog/unified-namespace), you already know this failure by sight. A modern car isn't run by one computer; it's run by dozens of **ECUs** — the engine controller, the ABS module (the same one that broke Part 1's tidy tree), the transmission unit, the body controller, the infotainment head — each from a different supplier, each a correct, self-contained model of its own subsystem. Individually flawless. And not one of them knows *the car*: the engine ECU can't see why the ABS is intervening, the ABS can't see the road the driver sees. That is the entire reason a car has a [**CAN bus**](https://en.wikipedia.org/wiki/CAN_bus) and, increasingly, a central domain controller sitting above the ECUs — because a fleet of perfect subsystem computers with no shared bus isn't a vehicle, it's a parking lot. ERP, CRM, CMMS, PLM, and QMS are the plant's enterprise ECUs: each correct, none of them the car.

---

## What it costs to run this estate

Nobody buys this estate; it accretes, one justified purchase at a time, and the bill comes due at the seams.

- **Integration is the forever-project — again, one floor up.** Every pair of systems that has to talk gets a bespoke connector: MES to ERP over [B2MML / ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95), CMMS to ERP, PLM to ERP, QMS to everything. It's the exact N-squared spaghetti [Part 1](/blog/unified-namespace) named on the OT floor, rebuilt in the office with middleware, an ESB, and nightly batch syncs that quietly drift out of agreement by morning.
- **Master data is everyone's problem and no one's job.** The same customer, part, or asset carries a different ID in every system, so someone stands up a [master-data-management](https://en.wikipedia.org/wiki/Master_data_management) program to reconcile them — a permanent, 70%-done effort with a steering committee, because the moment one system renumbers, every cross-system join it fed rots. It's the historian's tag-dictionary problem and the MES's routing problem, now spanning five schemas at once.
- **Five vendors, five locks, five logins.** SAP or Oracle for ERP, Salesforce for CRM, Maximo or SAP PM for the CMMS, Windchill or Teamcenter for PLM, a validated suite for QMS — each with its own data model, security domain, release cycle, and army of consultants. None of them federate, and none of them are in a hurry to make the others easy to reach.
- **And it still isn't a model of the plant.** Integrate all five flawlessly and you have five faithful islands wired together at the edges — not one model a question can walk across. The model that would span them belongs to none of them, and point-to-point connectors move records between systems without ever building it.

---

## The missing layer

Stand back from the whole T and the shape of what's wrong isn't a bad system — it's a missing one. The trunk is connected. The crossbar isn't: no system along it touches the next, and none reaches back down to the trunk that rises to meet them. Nothing sits across the top and reads all of it at once, so the question that needs the skid (one system), the recipe (another), and the pressure curve (the trunk) has nowhere to be asked.

*[Diagram: the five systems (ERP, CRM, MES + the trunk, PLM, QMS) sit in a row at the bottom, each sealed in its own database. Above them, a single dashed-orange arc with dashed arrows reaching down into each system, and one line of text: "what reads across all of them?" — an open question, no answer. Caption: what none of them is, and what nothing above them is either, is a single layer that reads across all of them at once; that empty arc is the question the series has been walking toward.]*

Each of these systems is the right place to run its slice of the business, and the wrong thing to mistake for a model of the plant they all touch. Five faithful records of five functions are still five islands — and the identities, the edges, and the meaning that live *between* them are exactly what a [context layer holds on top](/architecture), treating every one of these as a first-class source, not a rival.

What that makes possible — a single question that walks from a customer's slipping order straight to the machine that filled it — is where this series goes next.

> ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a plant — its assets, its history, its documents, and the tribal knowledge in between — that [AI agents can actually reason over](/use-cases). If your business runs on five systems of record and none of them can see the other four, talk to us.
