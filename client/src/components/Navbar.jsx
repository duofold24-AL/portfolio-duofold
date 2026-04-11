import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import HireUsButton from './HireUsButton'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mouseVelocity, setMouseVelocity] = useState(0)
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 })
  
  // High-end Scroll Squish Logic
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 60, damping: 20 })
  const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.85, 1, 0.85])
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleMouseMove = (e) => {
    const now = Date.now()
    const dt = now - lastMousePos.current.time
    
    if (dt > 0) {
      const dx = e.clientX - lastMousePos.current.x
      const dy = e.clientY - lastMousePos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const velocity = dist / dt
      setMouseVelocity(Math.min(velocity * 10, 100))
    }
    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now }
  }

  const handleMobileLinkClick = (e, href) => {
    e.preventDefault()
    document.body.style.overflow = 'unset'
    setMobileMenuOpen(false)
    
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      // We're on the homepage — smooth scroll to the section
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      // We're on a different page (e.g. /projects) — navigate home first
      window.location.href = '/' + href
    }
  }

  return (
    <>
      <nav className={`navbar-one ${scrolled ? 'nav-scrolled' : ''}`}>
        <motion.div 
          className="glass-container navbar-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredIndex(null)
            setMouseVelocity(0)
          }}
          style={{ scaleY, transformOrigin: 'top center' }}
        >
          {/* Desktop Links */}
          <div className="desktop-links">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="nav-link-item"
                onMouseEnter={() => setHoveredIndex(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="nav-link-text"
                  animate={{ 
                    scale: hoveredIndex === idx ? 1.25 : 1,
                    y: hoveredIndex === idx ? -1 : 0,
                    textShadow: mouseVelocity > 5 && hoveredIndex === idx 
                      ? `-${mouseVelocity/15}px 0 rgba(255,0,0,0.3), ${mouseVelocity/15}px 0 rgba(0,255,255,0.3)`
                      : '0 0 0 rgba(0,0,0,0)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.name}
                </motion.span>
              </motion.a>
            ))}
          </div>

          <div className="hire-us-wrapper mobile-action">
            <HireUsButton onClick={(e) => handleMobileLinkClick(e, '#contact')} />
          </div>

          <div className="nav-actions">
            <a
              href="https://github.com/duofold24-AL/portfolio-duofold"
              target="_blank"
              rel="noreferrer"
              className="nav-github-star desktop-only"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span>Star on GitHub</span>
            </a>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              ✕
            </button>

            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleMobileLinkClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <div className="mobile-menu-footer">
                <HireUsButton onClick={(e) => handleMobileLinkClick(e, '#contact')} />
                <a
                  href="https://github.com/duofold24-AL/portfolio-duofold"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-github-star"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
