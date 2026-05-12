import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import GlassLiquidButton from './GlassLiquidButton'

const heroData = [
  {
    id: 1,
    title: 'Building Your',
    highlight: 'Digital Success',
    desc: 'From complex web applications to stunning brand identities, our projects define the future of digital interaction.',
    image: '/tech_project_mockup.webp',
    stat: 'Projects',
    statVal: '50+'
  },
  {
    id: 2,
    title: 'Years of',
    highlight: 'Expertise',
    desc: 'With over 3+ years in the industry, we bring seasoned knowledge and cutting-edge solutions to every challenge.',
    image: '/tech_experience_abstract.webp',
    stat: 'Experience',
    statVal: '3+ Years'
  },
  {
    id: 3,
    title: 'Trusted by',
    highlight: 'Global Partners',
    desc: '98+ happy clients across the globe trust us to deliver high-performance digital solutions and cinematic branding.',
    image: '/global_clients_network.webp',
    stat: 'Clients',
    statVal: '98+'
  }
]

// Each card is its own component so hooks are called at the top level — never inside a loop
function HeroCard({ item, index, total, scrollProgress }) {
  const start = index / total
  const end = (index + 1) / total

  // Build a strictly [0,1] monotonically-increasing range so Framer Motion v12
  // WAAPI engine never receives out-of-range offsets (TypeError: Offsets must be in [0,1])
  const r0 = Math.max(0, start - 0.1)
  const r3 = Math.min(1, end + 0.1)
  // Deduplicate: if r0 === start (first card) or r3 === end (last card), use 3-point range
  const inputRange  = (r0 < start && r3 > end) ? [r0, start, end, r3]
                    : (r0 < start)              ? [r0, start, end]
                    : (r3 > end)                ? [start, end, r3]
                    :                             [start, end]

  const opacity  = useTransform(scrollProgress, inputRange,
    inputRange.length === 4 ? [0, 1, 1, 0]     :
    inputRange.length === 3 ? (r0 < start ? [0, 1, 1] : [1, 1, 0]) : [1, 1])
  const scale    = useTransform(scrollProgress, inputRange,
    inputRange.length === 4 ? [0.8, 1, 1, 0.8] :
    inputRange.length === 3 ? (r0 < start ? [0.8, 1, 1] : [1, 1, 0.8]) : [1, 1])
  const x        = useTransform(scrollProgress, inputRange,
    inputRange.length === 4 ? [120, 0, 0, -120] :
    inputRange.length === 3 ? (r0 < start ? [120, 0, 0] : [0, 0, -120]) : [0, 0])
  const rotateX  = useTransform(scrollProgress, inputRange,
    inputRange.length === 4 ? [15, 0, 0, -15]  :
    inputRange.length === 3 ? (r0 < start ? [15, 0, 0] : [0, 0, -15])  : [0, 0])
  const rotateY  = useTransform(scrollProgress, inputRange,
    inputRange.length === 4 ? [-10, 0, 0, 10]  :
    inputRange.length === 3 ? (r0 < start ? [-10, 0, 0] : [0, 0, 10])  : [0, 0])

  return (
    <motion.div
      key={item.id}
      className="hero-visual-card"
      style={{
        opacity,
        scale,
        x,
        rotateX,
        rotateY,
        perspective: 1000,
        zIndex: index === 0 ? 3 : 2
      }}
    >
      <div className="card-glass-frame">
        <img src={item.image} alt={item.highlight} className="card-image" fetchPriority={index === 0 ? "high" : "auto"} />
        <div className="card-stat-badge">
          <span className="badge-val">{item.statVal}</span>
          <span className="badge-label">{item.stat}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth scroll progress for animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section className="hero-lockup" ref={containerRef} id="hero">
      {/* Sticky Background & Visuals */}
      <div className="sticky-visual-container">
        {/* Dynamic Cards Wrapper */}
        <div className="visual-cards-wrapper">
          {heroData.map((item, index) => (
            <HeroCard
              key={item.id}
              item={item}
              index={index}
              total={heroData.length}
              scrollProgress={smoothProgress}
            />
          ))}
        </div>
      </div>

      {/* Scrolling Content Sections */}
      <div className="scrolling-content-container">
        {heroData.map((item, index) => (
          <div key={item.id} className="hero-content-section">
            <motion.div
              className="content-inner"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="hero-title">
                {item.title} <br />
                <span className="text-highlight">{item.highlight}</span>
              </h1>
              <p className="hero-desc">{item.desc}</p>

              <div className="hero-actions">
                <GlassLiquidButton
                  text={index === 0 ? "View Projects" : index === 1 ? "Our Story" : "Read Reviews"}
                  href={index === 0 ? "#projects" : index === 1 ? "#about" : "#testimonials"}
                />
                {index === 0 && (
                  <GlassLiquidButton
                    text="Hire Us"
                    href="#contact"
                    className="secondary"
                  />
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
