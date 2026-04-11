import { useEffect, useRef } from 'react'
import LiquidGlassTitle from './LiquidGlassTitle'
import GlassLiquidButton from './GlassLiquidButton'
import LiquidDropTitle from './LiquidDropTitle'


function AnimatedStat({ target, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    const duration = 1800

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="stat">
      <span className="stat-number" ref={ref}>0</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">
        {target === 3 && 'Projects Done'}
        {target === 1 && 'Years Exp.'}
        {target === 98 && 'Happy Clients'}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero" style={{ position: 'relative' }}>
      <div className="grid-overlay" />

      <div className="hero-content" style={{ 
        background: 'radial-gradient(circle at center, rgba(11, 11, 15, 0.4) 0%, transparent 70%)',
        padding: '2rem',
        borderRadius: '50%'
      }}>

        <LiquidDropTitle text="DUOFOLD-AL" highlight="AL" />
        <p className="hero-subtitle">
          <strong>Anmol Chaudhary & Loveneesh</strong><br />
          Crafting immersive digital experiences with clean code,<br />
          bold design, and obsessive attention to detail.
        </p>



        <div className="hero-stats">
          <AnimatedStat target={3} suffix="+" />
          <div className="stat-divider" />
          <AnimatedStat target={1} suffix="+" />
          <div className="stat-divider" />
          <AnimatedStat target={98} suffix="%" />
        </div>
      </div>

    </section>
  )
}
