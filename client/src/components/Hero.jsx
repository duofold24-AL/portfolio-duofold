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
        {/* Background Visual (Liquid/Video substitute) */}
        <div className="visual-background">
          <div className="overlay-gradient" />
        </div>

        {/* Dynamic Cards Wrapper */}
        <div className="visual-cards-wrapper">
          {heroData.map((item, index) => {
            // Calculate when this card should be visible
            const start = index / heroData.length
            const end = (index + 1) / heroData.length
            
            // animations for each card
            const opacity = useTransform(smoothProgress, 
              [start - 0.1, start, end, end + 0.1], 
              [0, 1, 1, 0]
            )
            const scale = useTransform(smoothProgress,
              [start - 0.1, start, end, end + 0.1],
              [0.8, 1, 1, 0.8]
            )
            const y = useTransform(smoothProgress,
              [start - 0.1, start, end, end + 0.1],
              [50, 0, 0, -50]
            )

            return (
              <motion.div 
                key={item.id}
                className="hero-visual-card"
                style={{ 
                  opacity,
                  scale,
                  y,
                  zIndex: index === 0 ? 3 : 2
                }}
              >
                <div className="card-glass-frame">
                  <img src={item.image} alt={item.highlight} className="card-image" />
                  <div className="card-stat-badge">
                    <span className="badge-val">{item.statVal}</span>
                    <span className="badge-label">{item.stat}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
              transition={{ duration: 0.8, ease: "easeOut" }}
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
