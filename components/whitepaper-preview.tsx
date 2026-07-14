import { cn } from "@/lib/utils"

interface WhitepaperPreviewProps {
  size?: "card" | "large"
  className?: string
}

const ABSTRACT_LINE_WIDTHS = [100, 92, 96, 70]

export function WhitepaperPreview({ size = "card", className }: WhitepaperPreviewProps) {
  const large = size === "large"

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-sm",
        large ? "aspect-[4/5] max-w-sm" : "aspect-[3/4]",
        className,
      )}
      style={{ background: "#FBFAF6", borderColor: "#DCDAD1", color: "#23252B" }}
    >
      <div className="absolute inset-0 flex flex-col p-5">
        <span
          className="font-mono uppercase tracking-[0.14em]"
          style={{ color: "#0E6B54", fontSize: large ? 11 : 9 }}
        >
          ContextWeaver · White paper
        </span>

        <h3
          className="mt-3 font-semibold leading-[1.08]"
          style={{
            fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
            fontSize: large ? 26 : 18,
            letterSpacing: "-0.01em",
          }}
        >
          The Manufacturing Context Layer
        </h3>

        <p
          className="mt-2 italic"
          style={{ color: "#4A4C52", fontSize: large ? 13 : 11, fontFamily: "Georgia, serif" }}
        >
          An architecture for governed, agent-ready operational context.
        </p>

        <div className="mt-4 flex-1 border bg-white" style={{ borderColor: "#23252B" }}>
          <span
            className="inline-block font-mono uppercase tracking-[0.16em]"
            style={{ background: "#23252B", color: "#FBFAF6", fontSize: 9, padding: "3px 10px" }}
          >
            Abstract
          </span>
          <div className="px-3 py-3 space-y-2">
            {ABSTRACT_LINE_WIDTHS.map((w, i) => (
              <span
                key={i}
                className="block h-[6px] rounded-full"
                style={{ width: `${w}%`, background: "#DCDAD1" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
