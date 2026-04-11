export default function LiquidGlassTitle({ text }) {
  return (
    <div className="glass-title-wrapper" id="glass-title-wrapper">
      {/* Layer 1 — Base Depth */}
      <span className="glass-title layer-depth" aria-hidden="true">{text}</span>
      {/* Layer 2 — Glass (main) */}
      <span className="glass-title layer-glass" aria-hidden="true">{text}</span>
      {/* Layer 3 — Glow */}
      <span className="glass-title layer-glow" aria-hidden="true">{text}</span>
      {/* Layer 4 — Readable / accessible */}
      <h1 className="glass-title layer-accessible">{text}</h1>
    </div>
  )
}
