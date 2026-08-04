# The Context Layer, Finally

## The layer that reads across every system, and why connecting three of them is where intelligence starts

*Deconstructing the Smart Factory · Part 6 — the finale. The model none of the five systems were, and what it unlocks when a question can finally walk the whole plant.*

---

The analyst had five logins and an afternoon. By the end of it she had the whole story of last Tuesday — the skid that drifted in the CMMS, the recipe change in PLM, the hold in QMS, the order and the resin lot in ERP, the waiting customer in CRM. Every piece was true, and she was the only thing in the building that held all five at once. [Part 5](/blog/business-systems) ended on that exact scene: **five systems of record, no system of the plant**, and an empty orange arc drawn across the top of the T where something should have been reading across all of it and wasn't.

Six parts, one number nobody understood. `PT_004 = 4.2 bar` on Line 2's filler moved through the unified namespace, was remembered by the historian, was acted on by SCADA, was recorded as work by the MES, and was run as a business by five office systems — and not one of them could explain it, because explaining it meant holding the edges *between* them, and no system is built to do that. Every part of this series was scrupulous about the same thing: none of those systems got the number *wrong*. The historian remembered it faithfully. The MES recorded the work around it faithfully. ERP costed it faithfully. They were all correct, and correctness was never the problem — the problem was that the whole was nobody's job.

This part installs the thing that can hold the whole. Not a sixth system to add to the row, not a better version of any of the five. The layer that sits above the row and finally reads across it.

---

## What it actually is

Go back to the T. The trunk is wired top to bottom — SCADA, namespace, historian, MES, each layer standing on the one below. The crossbar is where it fell apart: MES and the five business systems all sitting at one level, none of them touching the next, none reaching back down the trunk. The context layer is one shared model laid across the whole top of that T, and every system — trunk and crossbar alike — connects to it **once**.

That word matters, because the fear Part 5 named was integration hell: the N-squared spaghetti of pairwise connectors, every system wired to every other, the [forever-project](/blog/unified-namespace) that ages badly. A context layer is not more of that. Each system connects to the model a single time — N spokes into one hub, not N² connectors between pairs. Add a seventh system and you add one spoke, not six new bridges. The model is the place all of them meet, so none of them has to meet each other.

What the model actually holds is the three things that fell through every earlier part. **Identity:** the ERP fixed-asset, the CMMS equipment record, the PLM part, the MES resource, and the historian tag are declared to be one real thing — the filler — instead of five strangers that happen to describe the same steel. Each system keeps its own local ID; the model just knows they all point at one filler. **Edges:** the relationships that were homeless in Part 5 because they spanned two systems and belonged to neither — skid to filler, filler to batch, batch to recipe, recipe to order — now live in the model as first-class connections, owned by the layer rather than by either system on the ends. **Meaning:** with identity and edges in place, a question stops being a five-way scavenger hunt and becomes a walk across one graph. The symptom in QMS, the cause in PLM, the asset in the CMMS, the stakes in ERP — one-fifth of the answer in each — finally sit in a single structure a question can traverse.

It's worth being precise about what this is and isn't. It is not a warehouse that copies everyone's data into a sixth database and lets it drift out of date by morning; the systems of record stay the systems of record. It is a model that resolves each system's local identity to one shared one, records how the real things connect, and reads from the sources live. The systems keep doing their jobs. The layer does the one job none of them was ever built for: holding the plant.

[Diagram D1: the T completed]

---

## Two systems: a superpower

Connect any two of these systems through the model and something falls out that neither had alone. Not a report. A capability.

Take the **historian and the CMMS**. The historian holds the glycol skid's live pressure and vibration trend, second by second, and understands none of it. The CMMS holds the same skid — asset GLY-SKID-02 — and its maintenance schedule, and has never seen a pressure curve. Resolve them to the same asset in the model and you get **condition-based maintenance**: service the skid when its actual trend says it's drifting, not when the calendar says ninety days are up. The last work order on GLY-SKID-02 closed clean two days before it drifted into batch #4471. A calendar couldn't have caught that. A joined trend and schedule would have.

Take the **QMS and PLM**. The QMS holds the deviation raised on #4471 and the SOP behind it; PLM holds the change orders that quietly reshape the process over time. Alone, a recurring deviation is a paperwork loop that closes and reopens and closes again. Joined, it **closes the design-quality loop**: the excursion traces straight to the exact approved, dated recipe ECO that nudged the fill pressure — author and date attached — instead of a quality team investigating the same drift for the fourth quarter running without ever seeing the change that caused it.

[Diagram D2: the superpower matrix]

Two systems, two superpowers, and we've barely started. And what falls out when you connect the historian and the QMS? The MES and ERP? The CMMS and the MES? Every pair is another capability neither system had alone — every pair is another superpower, and we've named two. The rest are yours to find.

---

## Three systems: true intelligence

Two systems give you a superpower. Three give you something different in kind.

Walk one question across three. It starts at the metal: the historian shows `PT_004 = 4.2 bar` on Line 2's filler, over the 4.0 bar alarm limit, one Tuesday afternoon. That's a signal, and a signal alone is inert — Part 2 proved a stored number isn't an answer. So the layer walks the edge from the tag to the work: the MES says the filler was running **batch #4471**, the 500 ml SKU, on resin lot RL-88, with Priya on shift. Now the pressure spike has a job attached to it. One more edge, into the business: ERP ties #4471 to its production order, and that order to **shipment S-201** — which is now at risk of slipping. One question has walked from a sensor reading at the metal, through the work the plant was doing, all the way to a customer whose delivery is in jeopardy — the full height of the T, in a single traversal.

[Diagram D3: the three-system walk]

Here is why three is the threshold, and it's the point the whole series has been walking toward. With two systems, the join is fixed. Historian plus CMMS is *this* asset to *that* schedule — one edge, one shape, an answer you could have pre-wired the moment you decided the two should talk. It's a lookup. But add a third system and the agent no longer has a single edge to follow; it has a *choice of paths*. From the pressure spike it could walk to the work, then to the order, then to the customer — or to the recipe, then to the other batches that ran under the same ECO — or to the asset, then to every other line that shares the skid. The number of routes through three systems isn't three; it's every path the graph allows, and it grows combinatorially with each system the model touches. Nobody pre-wired those paths, because nobody could have known in advance which question would need which one. That jump — from a lookup you designed to a route the agent finds for itself at question time — is what intelligence actually is here. Two systems answer a question you already knew to ask. Three let something ask a question you didn't.

---

## The reframe: intelligence, not integration

This is the line between the two, and it's sharper than it looks. Point-to-point integration moves records between two systems and then stops — it builds one bridge for one purpose, and the next question that needs a different bridge waits for someone to build it. That's the estate Part 5 described: five islands wired at the seams, a permanent 70%-done project, every new join a new ticket.

A context layer builds the graph **once**. It resolves the identities, lays down the edges, and from then on every path a future question might need already exists — not because anyone anticipated the question, but because the model connected the things, and paths are just walks over connected things. You don't wire the route from pressure to customer. You wire the filler to the historian, the filler to the MES, the batch to the order — each once — and the route from pressure to customer falls out for free, along with a thousand routes you never named.

That's the whole distinction in one sentence: **superpowers are joins you wired; intelligence is traversal you didn't have to.** The first you can plan for; the second is the payoff of having modelled the plant instead of merely connecting it. It's the difference between a report you commissioned and an answer to a question you hadn't thought to ask yet.

---

## The Manufacturing Context Layer

Everything up to here is a pattern — a context layer, lowercase, the way a message bus or a data warehouse is a pattern. This is where we name the thing we build. **ContextWeaver** builds one, and it's called the **Manufacturing Context Layer**. Everything above is what it does; here is what it's made of.

It's an **asset-centric semantic model**: the filler, the skid, the line, the batch, and the order are real entities with real relationships, not rows scattered across five schemas. It does **unit and time normalization**, so a pressure in bar from the historian and a timestamp from the MES and a cost in an ERP ledger line up on one clock and one set of units instead of five. It carries **document and tribal-knowledge memory** — the SOP, the ECO, the note Priya left at shift change — as part of the model, not as attachments nobody can query. It does **per-tag quality scoring**, so the layer knows which readings to trust and which are drifting sensors. And it treats **business entities as first-class**: the order, the customer, the shipment are objects in the graph, so a walk that starts at a sensor can end at S-201 without falling off the edge of the model.

[Diagram D4: five IDs resolved to one]

None of this is magic, and it's worth saying plainly, because the series has been sober the whole way and shouldn't stop now. The hard part isn't the traversal — the traversal is easy once the graph exists. The hard part is building the graph honestly: **entity resolution** (proving the ERP asset, the CMMS equipment, the PLM part, the MES resource, and the historian tag really are the one filler, and not guessing wrong) and **governance** (who's allowed to see and assert what). The layer is only ever as trustworthy as its resolution and its quality scores. Get those wrong and you've built a confident graph that walks to the wrong answer — which is worse than five honest islands.

And it stays inside the boundary the series drew in [Part 3](/blog/scada). The context layer reads across the plant, reasons over it, and recommends. It does not actuate. **SCADA still owns the write** to the machines — the layer can tell you the skid is drifting toward #4471's excursion and that S-201 is at risk, and it can put that in front of the operator, but the hand on the plant stays exactly where Part 3 left it. A model that reasons is not a model that reaches for the valve.

You can see how the model is assembled in the [architecture](/architecture), and what it unlocks across real plants in the [use cases](/use-cases).

---

For six parts the verdict was the same: faithful, and still not a model. Every layer moved the number, remembered it, acted on it, recorded the work it served, or ran the business around it — each one correct, and the plant itself nobody's job. Here, finally, is the model. The crossbar is wired, the trunk connects to it, and the plant can be asked one question and answer it across every system at once.

> ContextWeaver builds the Manufacturing Context Layer: a governed, standards-based model of a plant — its assets, its history, its documents, and the tribal knowledge in between — that [AI agents can actually reason over](/use-cases). Connect two of your systems and you've got a superpower. Connect three and you've got the thing none of them ever were. If your plant runs on faithful systems that can't see past their own boundaries, [talk to us](/architecture).
