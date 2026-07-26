# Series canon — "Deconstructing the Smart Factory"

**Read this before drafting any new part, and update it the moment a part ships.**
It exists because the series makes *cumulative* arguments: each part leans on claims
the earlier parts established. Contradict one and the whole thing stops being trustworthy.
(Concrete failure this file prevents: Part 3's first LinkedIn draft said "a historian that
misreads a number stores a wrong answer" — directly contradicting Part 2, whose entire
thesis is that the historian stores numbers *faithfully* and still understands nothing.)

## The one throughline (never contradict this)

**One number runs through every layer, and not one of them understands it.** Follow a single
reading — `PT_004 = 4.2 bar` on Line 2's filler — through the stack. Each part adds one verb
and one honest limit. Stakes escalate as you go down toward the metal:

| Part | System | Verb | Software primitive | One-line thesis | Everyday (car) analogy |
|---|---|---|---|---|---|
| 1 | Unified Namespace | **moves** the number | pub/sub event bus | a message broker is transport, not a system of record; the world is a **graph, not a tree** | a **car is a web, not a tree** — ABS reads all four wheels at once, so it has no clean slot on the tidy tree |
| 2 | Historian | **remembers** the number | append-only time-series log | perfect recall, zero comprehension — **a stored number is not an answer** | the **dashcam / black box**: records everything, understands nothing |
| 3 | SCADA | **acts on** the number | mutable key-value tag table (overwritten every scan) | **reflexes, not judgment** — the only layer with a hand on the plant | the **brakes / ABS** themselves: sense, react dozens of times a second, no idea why you're braking |
| (parked) MES | records **how work moved** | workflow engine + event-sourced log | a record of the plan isn't a model of the plant | — |

**The escalation is the payoff line of Part 3:** moving or storing a misunderstood number is
inert; *acting* on one moves steel. Don't frame the historian or UNS as "getting a number
wrong" — they don't; they handle it faithfully and still can't explain it. Only the stakes change.

## The car analogy is the series' relatable register — keep extending it

Part 1 already chose **cars & brakes (ABS)** as the lay-audience hook (`car isn't a tree`).
That is now the series' everyday vocabulary. **Reuse and extend it; don't invent a new metaphor
per post.** The strongest Part-3 move is a *callback*: the ABS computer that broke the UNS tree
in Part 1 is the archetype of SCADA in Part 3 (senses, reacts, no idea why). Prefer cars /
brakes / dashcam over shop-floor jargon (valves, setpoints) when writing for a broad audience —
the plant example (below) stays for the concrete spine; the car is for intuition.

## The frozen running example (identical facts in every part)

Never renumber or rename these — readers carry them from part to part:

- Quality excursion on **Line 2's filler**, one **Tuesday**.
- **`PT_004`** pressure hits **4.2 bar**; alarm limit is **4.0 bar**.
- **Batch #4471**, **500 ml** SKU (the **2 L** SKU is the "different SKU, different normal" foil).
- **Resin lot RL-88**; operator **Priya**; the shared **glycol skid**; shipment **S-201**.

## Structure every part shares (7 beats)

Cold open (a concrete scene) → *What X actually is* (name the software primitive) → *What it
solves* (give it real credit) → *Where it fits* (relate it to the other layers) → *The specific
example* (the Line 2 excursion) → *the core reframe / limitation* → *What it costs* → *The one
line* + the context-layer CTA blockquote. Educational throughout; a single-sentence bridge to
ContextWeaver only at the very end.

## Cohesion checklist (run before shipping a part or its LinkedIn post)

1. **No contradiction.** Every claim about UNS/Historian/SCADA/MES matches its row above. If a
   sentence characterizes an earlier layer, re-read that layer's thesis first.
2. **One callback.** Reference the immediately prior part once, by its own thesis words
   ("Part 2 said a stored number isn't an answer…").
3. **Same example facts.** Cross-check every number/name against the frozen list.
4. **Analogy continuity.** Broad-audience explanations extend the car register, not a new one.
5. **Escalation intact.** The limitation is framed as *stakes rising down the stack*, not as an
   earlier layer being wrong.
