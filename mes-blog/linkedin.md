HOW TO POST (LinkedIn throttles links in the body, so the URL goes in the first comment):
  1. New post → attach the image  assets/linkedin-plan-not-a-model.png
  2. Paste the POST text below
  3. Publish
  4. Immediately add the FIRST COMMENT below


====================  POST  ====================

Every car has a service book in the glovebox. Every service stamped, dated and signed, in order. Exactly what you want when a fault turns out to be systemic rather than a one off.

It also has nothing to say about why the pads keep wearing early, and the ABS computer from Part 1 appears nowhere in it.

That book is an MES. Strip the acronym and it's a workflow engine for the plant floor: every production order is a state machine, every step a transition, and the log of those transitions is the record of what got made. Which batch ran on Line 2 at 2pm, which resin lot went into it, who ran it, did it pass QA, where the pallet shipped. It answers all of that instantly, and that genealogy is the backbone of every recall. After three parts about systems that only knew numbers, here is one that knows things.

Then you ask why that batch nearly failed QA. You get a code: "pressure deviation, released on review." Not the cause. The pressure trace is in the historian. The recipe change is in the control system. The shared chiller that actually drove it was never a step in any routing, so the MES has never heard of it.

A faithful record of what was done to the car, kept by people who never had to explain the car.

Part 3 said SCADA has reflexes, not judgment. Here is the other half: the MES has a perfect record and no explanation. A state machine can tell you an order went on hold. It takes a model to tell you why holds keep happening.

Name the plant (Part 1). Remember it (Part 2). React to it (Part 3). Record the work (Part 4, the MES). Not one of them knows what any of it means.

Deconstructing the Smart Factory, Part 4.

(link in comments)

#Manufacturing #SmartFactory #Industry40 #MES #IIoT


====================  FIRST COMMENT  ====================

Full piece 👇 https://contextweaver.info/blog/mes

Part 1 (the Unified Namespace, honestly): https://contextweaver.info/blog/unified-namespace
Part 2 (the Historian, honestly): https://contextweaver.info/blog/historian
Part 3 (SCADA, honestly): https://contextweaver.info/blog/scada


====================  NOTES  ====================
- Style matched to historian-blog/linkedin.md and scada-blog/linkedin.md: an explicit
  callback to the prior part's thesis in its own words (Part 3's "reflexes, not judgment"),
  the car register carried forward (Part 1 ABS → Part 2 dashcam → Part 3 brakes → Part 4
  service book), and the ladder close naming every part so far.
- **Opens on the car, not the plant.** An earlier draft led with the PT_004 / 4.2 bar
  pressure example and spent a whole paragraph walking it through the three prior systems.
  That is the article's concrete spine, not the post's hook: the canon says prefer the car
  register over shop-floor jargon for a broad audience, and the plant example is for the
  spine while the car is for intuition. Leading with the service book let the entire
  "three parts followed one number" paragraph go and cut the post by about a quarter.
  The pressure trace survives only where it earns its place, as the thing the MES cannot
  explain.
- No em dashes in the post body (house style), spaced hyphens / parentheses instead.
- Link lives in the first comment; LinkedIn throttles posts with outbound links.
- URLs use contextweaver.info without the www, matching Parts 1-3's first comments.
  (Both forms resolve 200; the site's canonical metadata uses www.)
- Image: assets/linkedin-plan-not-a-model.png (rendered, 1080x1080, article design scheme;
  source slide at slides/linkedin-plan-not-a-model.html). The "a record of the plan isn't a
  model of the plant" hook: QA hold as a bare code vs. wired to what explains it. Post text
  stands alone without it.
- Article published 2026-07-31 at https://contextweaver.info/blog/mes (Part 4).
