HOW TO POST (LinkedIn throttles links in the body, so the URL goes in the first comment):
  1. New post → attach the image  assets/linkedin-plan-not-a-model.png
  2. Paste the POST text below
  3. Publish
  4. Immediately add the FIRST COMMENT below


====================  POST  ====================

Every smart factory runs an MES. Strip the acronym and it's a workflow engine for the plant floor: every production order is a little state machine, every step a transition, and the log of those transitions is the record of what got made.

The first three parts of this series followed one number. A pressure reading on Line 2 hits 4.2 bar: SCADA senses it and throws the alarm, the namespace carries it, the historian files it away. Three systems, and not one of them can tell you what the plant was actually making at the time.

That question belongs here. Which batch ran on Line 2 at 2pm? Which resin lot went into it? Who ran it, did it pass QA, where did the pallet ship? The MES answers all of it instantly, and that genealogy is the backbone of every recall. After three systems that knew only signals and numbers, here is one that knows things.

Then you ask why that batch nearly failed QA. The MES hands you a code: "pressure deviation, released on review." Not the cause. The pressure trace is in the historian. The recipe change is in the control system. The shared chiller that actually drove it isn't in the MES at all, because it was never a step in any routing.

Think of the service book in a car's glovebox. Every service stamped, dated and signed, in order, and exactly what you want when a fault turns out to be systemic rather than a one off. It still has nothing to say about why the pads keep wearing early, and the ABS computer from Part 1 appears nowhere in it. A faithful account of what was done to the car, kept by people who never had to explain the car.

Part 3 said SCADA has reflexes, not judgment. Here is the other half: the MES has a perfect record, and no explanation. A state machine can tell you an order went on hold. It takes a model to tell you why holds keep happening.

Name the plant (Part 1). Remember it (Part 2). React to it (Part 3). Record the work (Part 4, the MES). Four systems, two different questions, and not one of them knows what any of it means.

Deconstructing the Smart Factory, Part 4.

(link in comments)

#Manufacturing #SmartFactory #Industry40 #MES #IIoT


====================  FIRST COMMENT  ====================

Full piece 👇 https://contextweaver.info/blog/mes

Part 1 (the Unified Namespace, honestly): https://contextweaver.info/blog/unified-namespace
Part 2 (the Historian, honestly): https://contextweaver.info/blog/historian
Part 3 (SCADA, honestly): https://contextweaver.info/blog/scada


====================  NOTES  ====================
- Style matched to historian-blog/linkedin.md and scada-blog/linkedin.md: the
  "strip the vocabulary" opener from Part 2, an explicit callback to the prior part's
  thesis in its own words (Part 3's "reflexes, not judgment"), the car register carried
  forward (Part 1 ABS → Part 2 dashcam → Part 3 brakes → Part 4 service book), and the
  ladder close naming every part so far.
- No em dashes in the post body (house style), spaced hyphens / parentheses instead.
- Link lives in the first comment; LinkedIn throttles posts with outbound links.
- URLs use contextweaver.info without the www, matching Parts 1-3's first comments.
  (Both forms resolve 200; the site's canonical metadata uses www.)
- Image: assets/linkedin-plan-not-a-model.png (rendered, 1080x1080, article design scheme;
  source slide at slides/linkedin-plan-not-a-model.html). The "a record of the plan isn't a
  model of the plant" hook: QA hold as a bare code vs. wired to what explains it. Post text
  stands alone without it.
- Article published 2026-07-31 at https://contextweaver.info/blog/mes (Part 4).
