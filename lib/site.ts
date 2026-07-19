// Canonical site metadata. Single source of truth — import from here instead of
// re-declaring SITE_URL in individual pages (that drift is what broke link previews:
// pages pointed at getcontextweaver.com, which does not serve files/deep paths).
//
// The canonical domain is the one bound to GitHub Pages via public/CNAME
// (www.contextweaver.info). It serves every path and /contextweaver.png with 200.
export const SITE_URL = "https://www.contextweaver.info"
export const SITE_TITLE = "ContextWeaver"
export const SITE_DESCRIPTION =
  "Agentic layers over your entire manufacturing stack. ContextWeaver builds semantic and agent-application layers on top of your SCADA, MES, and ERP systems — and trains your team to extend them."
export const OG_IMAGE = "/contextweaver.png"
