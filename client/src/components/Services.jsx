import { motion } from 'framer-motion'
import AnimatedCtaButton from './AnimatedCtaButton'

const services = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance web applications built with React, seamless APIs, and pixel-perfect responsiveness.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Outer frame */}
        <rect x="6" y="14" width="68" height="52" rx="6" stroke="var(--accent)" strokeWidth="2.5" opacity="0.4" className="svc-svg-frame" />
        {/* Top bar dots */}
        <circle cx="16" cy="23" r="3" fill="var(--accent)" className="svc-svg-dot1" />
        <circle cx="26" cy="23" r="3" fill="var(--accent)" opacity="0.5" className="svc-svg-dot2" />
        <circle cx="36" cy="23" r="3" fill="var(--accent)" opacity="0.25" className="svc-svg-dot3" />
        {/* Divider */}
        <line x1="6" y1="31" x2="74" y2="31" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" />
        {/* Code lines */}
        <line x1="16" y1="42" x2="34" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" className="svc-svg-line1" />
        <line x1="38" y1="42" x2="52" y2="42" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" className="svc-svg-line2" />
        <line x1="16" y1="51" x2="46" y2="51" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" className="svc-svg-line3" />
        <line x1="50" y1="51" x2="64" y2="51" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" className="svc-svg-line4" />
        <line x1="16" y1="60" x2="28" y2="60" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" className="svc-svg-line5" />
        {/* Cursor blink */}
        <rect x="29" y="56" width="2.5" height="8" rx="1" fill="var(--accent)" className="svc-svg-cursor" />
      </svg>
    )
  },
  {
    id: 'ui-ux',
    title: 'UI / UX Design',
    description: 'Stunning user interfaces and frictionless experiences crafted from deep research and bold visual language.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Outer orbit */}
        <circle cx="40" cy="40" r="30" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" className="svc-svg-orbit" />
        {/* Mid ring */}
        <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="1" opacity="0.15" className="svc-svg-ring" />
        {/* Core circle */}
        <circle cx="40" cy="40" r="10" fill="var(--accent)" opacity="0.15" className="svc-svg-core" />
        <circle cx="40" cy="40" r="6" fill="var(--accent)" className="svc-svg-dot-center" />
        {/* Crosshairs */}
        <line x1="40" y1="6" x2="40" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="40" y1="62" x2="40" y2="74" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="6" y1="40" x2="18" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="62" y1="40" x2="74" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        {/* Accent tick marks */}
        <circle cx="40" cy="12" r="2.5" fill="var(--accent)" className="svc-svg-tick1" />
        <circle cx="68" cy="40" r="2.5" fill="var(--accent)" className="svc-svg-tick2" />
      </svg>
    )
  },
  {
    id: 'brand',
    title: 'Brand Strategy',
    description: 'Holistic brand identities — from logo and color systems to tone of voice — that command attention.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Diamond */}
        <path d="M40 8L70 40L40 72L10 40L40 8Z" stroke="var(--accent)" strokeWidth="2" opacity="0.4" className="svc-svg-diamond" />
        {/* Inner diamond */}
        <path d="M40 20L58 40L40 60L22 40L40 20Z" stroke="white" strokeWidth="1.5" opacity="0.2" className="svc-svg-inner-diamond" />
        {/* Center spark */}
        <circle cx="40" cy="40" r="6" fill="var(--accent)" className="svc-svg-spark" />
        {/* Diagonal lines */}
        <line x1="10" y1="40" x2="26" y2="40" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
        <line x1="54" y1="40" x2="70" y2="40" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
        <line x1="40" y1="8" x2="40" y2="24" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <line x1="40" y1="56" x2="40" y2="72" stroke="white" strokeWidth="1.5" opacity="0.3" />
      </svg>
    )
  },
  {
    id: 'motion',
    title: 'Motion & 3D',
    description: 'Cinematic animations, interactive 3D scenes, and micro-interactions that bring digital products to life.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Play triangle */}
        <path d="M20 18L62 40L20 62V18Z" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.5" className="svc-svg-play" />
        <path d="M26 24L54 40L26 56V24Z" fill="var(--accent)" opacity="0.2" className="svc-svg-play-fill" />
        {/* Motion lines */}
        <line x1="8" y1="28" x2="18" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" className="svc-svg-mline1" />
        <line x1="5" y1="40" x2="18" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" className="svc-svg-mline2" />
        <line x1="8" y1="52" x2="18" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" className="svc-svg-mline3" />
        {/* Speed sparks */}
        <circle cx="66" cy="32" r="3" fill="var(--accent)" className="svc-svg-spark2" />
        <circle cx="70" cy="40" r="2" fill="white" opacity="0.5" className="svc-svg-spark3" />
        <circle cx="66" cy="48" r="3" fill="var(--accent)" className="svc-svg-spark4" />
      </svg>
    )
  },
  {
    id: 'seo',
    title: 'Performance & SEO',
    description: 'Blazing load speeds, Lighthouse-perfect audits, and technical SEO that drives organic growth.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Chart bars */}
        <rect x="10" y="50" width="12" height="20" rx="2" fill="var(--accent)" opacity="0.25" className="svc-svg-bar1" />
        <rect x="26" y="38" width="12" height="32" rx="2" fill="var(--accent)" opacity="0.45" className="svc-svg-bar2" />
        <rect x="42" y="26" width="12" height="44" rx="2" fill="var(--accent)" opacity="0.7" className="svc-svg-bar3" />
        <rect x="58" y="14" width="12" height="56" rx="2" fill="var(--accent)" className="svc-svg-bar4" />
        {/* Trend line */}
        <polyline points="16,50 32,38 48,26 64,14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" className="svc-svg-trendline" />
        {/* Dots on trend */}
        <circle cx="16" cy="50" r="3" fill="white" opacity="0.6" />
        <circle cx="64" cy="14" r="4" fill="white" className="svc-svg-top-dot" />
      </svg>
    )
  },
  {
    id: 'consulting',
    title: 'Tech Consulting',
    description: 'Strategic guidance on architecture, stack selection, and scalability to help you ship confidently.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Head/person outline */}
        <circle cx="40" cy="24" r="12" stroke="white" strokeWidth="2" opacity="0.35" className="svc-svg-head" />
        <path d="M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
        {/* Lightbulb */}
        <circle cx="40" cy="24" r="6" fill="var(--accent)" opacity="0.8" className="svc-svg-bulb" />
        {/* Rays */}
        <line x1="40" y1="8" x2="40" y2="4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="svc-svg-ray1" />
        <line x1="52" y1="12" x2="55" y2="9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="svc-svg-ray2" />
        <line x1="56" y1="24" x2="60" y2="24" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="svc-svg-ray3" />
        <line x1="28" y1="12" x2="25" y2="9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="svc-svg-ray4" />
        <line x1="24" y1="24" x2="20" y2="24" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="svc-svg-ray5" />
      </svg>
    )
  },
  {
    id: 'video',
    title: 'Videography & Editing',
    description: 'High-end visual storytelling, cinematic videography, and precision editing that brings your brand to life.',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-icon-svg">
        {/* Camera body */}
        <rect x="12" y="24" width="40" height="32" rx="4" stroke="var(--accent)" strokeWidth="2.5" opacity="0.4" />
        <circle cx="32" cy="40" r="10" stroke="white" strokeWidth="2" opacity="0.6" />
        <circle cx="32" cy="40" r="4" fill="var(--accent)" />
        {/* Lens part */}
        <path d="M52 34L68 26V54L52 46V34Z" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.4" />
        {/* Recording dot */}
        <circle cx="20" cy="32" r="2" fill="#ff4d4d" className="svc-svg-record-dot">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Film reel lines */}
        <line x1="16" y1="50" x2="48" y2="50" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
      </svg>
    )
  }
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'var(--accent-soft)',
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '0.4rem 1.2rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(128, 0, 32,0.3)',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>What We Do</span>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            color: 'var(--white)'
          }}>
            Our <span style={{ color: 'var(--accent)' }}>Services</span>
          </h2>

          <p className="section-body subtext-glass" style={{ maxWidth: '540px', margin: '0 auto' }}>
            End-to-end digital solutions — from pixel to performance — crafted to make your brand unforgettable.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="svc-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="svc-card glass-container card-three"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Accent top glow bar */}
              <div className="svc-card-glow" />

              {/* Icon */}
              <div className="svc-icon-wrap">
                {svc.icon}
              </div>

              {/* Text */}
              <h3 className="svc-card-title">{svc.title}</h3>
              <p className="svc-card-body">{svc.description}</p>

              {/* Arrow link */}
              <div className="svc-card-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <AnimatedCtaButton href="/services" text="View Full Services" />
        </motion.div>
      </div>
    </section>
  )
}
