import { useId } from 'react'

export default function LiquidDropTitle({ text = 'DUOPORTFOLIO', highlight = '' }) {
  const safeId = useId().replace(/:/g, '')
  const filterId = `liquid-title-filter-${safeId}`
  const scopeClass = `liquid-title-scope-${safeId}`

  const parts = highlight ? text.split(highlight) : [text]

  return (
    <>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="alpha-blur" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.008"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="alpha-blur"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          />
          <feGaussianBlur in="warped" stdDeviation="0.9" result="smoothed" />
          <feComposite in="SourceGraphic" in2="smoothed" operator="in" />
        </filter>
      </svg>

      <style>
        {`
          .${scopeClass} {
            position: relative;
            display: block;
            justify-content: flex-start;
            width: 100%;
            min-width: 0;
            padding: 0;
            isolation: isolate;
          }

          .${scopeClass} .liquid-title {
            position: relative;
            display: block;
            margin: 0;
            text-align: left;
            text-transform: uppercase;
            white-space: normal;
            word-break: break-word;
            font-size: clamp(1.8rem, 11vw, 5.5rem);
            font-weight: 800;
            line-height: 0.92;
            letter-spacing: 0.03em;
            color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 0.9px rgba(255, 255, 255, 0.24);
            background:
              radial-gradient(circle at 16% 18%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.42) 14%, transparent 30%),
              radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.38) 0%, transparent 24%),
              radial-gradient(circle at 24% 82%, rgba(120, 220, 255, 0.14) 0%, transparent 26%),
              radial-gradient(circle at 76% 78%, rgba(255, 170, 210, 0.14) 0%, transparent 24%),
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.28) 0%,
                rgba(255, 255, 255, 0.12) 24%,
                rgba(215, 235, 255, 0.08) 50%,
                rgba(255, 255, 255, 0.16) 100%
              );
            -webkit-background-clip: text;
            background-clip: text;
            filter: url(#${filterId});
            text-shadow:
              0 0 0.5px rgba(255, 255, 255, 0.65),
              0 1px 1px rgba(255, 255, 255, 0.18),
              0 10px 26px rgba(255, 255, 255, 0.08);
          }

          .${scopeClass} .liquid-title span {
            background: linear-gradient(180deg, var(--accent) 0%, #ff7a55 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 0.8px rgba(234, 46, 0, 0.2);
            text-shadow: 0 0 15px rgba(234, 46, 0, 0.25);
            /* Keep the filter to ensure liquid continuity */
          }

          .${scopeClass} .liquid-title::before {
            content: attr(data-text);
            position: absolute;
            inset: 0;
            z-index: -2;
            color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 4px rgba(255, 255, 255, 0.08);
            filter: blur(4px);
            opacity: 0.95;
          }

          .${scopeClass} .liquid-title::after {
            content: attr(data-text);
            position: absolute;
            inset: 0;
            z-index: -1;
            color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(210, 240, 255, 0.24);
            transform: translate(-1px, -1px);
            opacity: 0.7;
            mix-blend-mode: screen;
          }

          @media (max-width: 768px) {
            .${scopeClass} .liquid-title {
              font-size: clamp(2.4rem, 14vw, 5rem);
              letter-spacing: 0.03em;
            }
          }
        `}
      </style>

      <div className={scopeClass}>
        <h1 className="liquid-title" data-text={text}>
          {parts[0]}
          {highlight && <span>{highlight}</span>}
          {parts[1]}
        </h1>
      </div>
    </>
  )
}
