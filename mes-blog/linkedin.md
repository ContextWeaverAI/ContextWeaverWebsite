HOW TO POST (LinkedIn throttles links in the body, so the URL goes in the first comment):
  1. New post → attach the image  assets/linkedin-plan-not-a-model.png
  2. Paste the POST text below
  3. Publish
  4. Immediately add the FIRST COMMENT below


====================  POST  ====================

Every smart factory runs an MES. Strip the acronym and it's a workflow engine for the plant floor: every production order is a little state machine, every step a transition, and the log of those transitions is the record of what got made.

The first three parts of this series followed one pressure reading through a plant. SCADA sensed it and acted on it, the namespace moved it, the historian kept it. Not one of them could tell you what the plant was actually making at the time.

That question belongs here. The MES is the first system on the floor that knows things, not just numbers. Which batch ran on Line 2 at 2pm? Which resin lot went into it? Who ran it, did it pass QA, where did the pallet ship? It answers all of that instantly, and that genealogy is the backbone of every recall.

Then you ask why that batch nearly failed QA. The MES hands you a code: "pressure deviation, released on review." Not the cause. The pressure trace is in the historian. The recipe change is in the control system. The shared chiller that actually drove it isn't in the MES at all, because it was never a step in any routing.

An MES records the plan and whether each step passed. It doesn't model the plant the plan runs on. A perfect account of the process, and no understanding of it. A state machine can tell you an order went on hold. It takes a model to tell you why holds keep happening.

Naming the plant was step one (the Unified Namespace). Remembering it was step two (the Historian). Reacting to it was step three (SCADA). Recording the work is step four. None of the four understands it.

Part 4 of Deconstructing the Smart Factory.

(link in comments)

#Manufacturing #SmartFactory #MES #Industry40 #WorkflowEngine #Deconstructing


====================  FIRST COMMENT  ====================

Full piece 👇 https://www.contextweaver.info/blog/mes

Earlier parts: the Unified Namespace https://www.contextweaver.info/blog/unified-namespace, the Historian https://www.contextweaver.info/blog/historian, and SCADA https://www.contextweaver.info/blog/scada


====================  NOTES  ====================
- No em dashes in the post text (house style), spaced hyphens / parentheses instead.
- Link lives in the first comment; LinkedIn throttles posts with outbound links.
- Canonical domain is contextweaver.info (getcontextweaver.com does not serve deep blog
  paths — that drift broke earlier link previews).
- Image: assets/linkedin-plan-not-a-model.png (rendered, 1080x1080, article design scheme;
  source slide at slides/linkedin-plan-not-a-model.html). It's the "a record of the plan
  isn't a model of the plant" hook: QA hold as a bare code vs. wired to what explains it.
  Post text stands alone without it.
- Re-sequenced from Part 3 to Part 4 on 2026-07-29 (SCADA took the Part 3 slot on 07-26).
  The second paragraph is the axis turn that earns the Part 4 position: Parts 1-3 followed
  the signal, Part 4 turns to the work. Keep it if the post is ever re-cut.
