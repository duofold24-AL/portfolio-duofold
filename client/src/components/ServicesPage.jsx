import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'

export default function ServicesPage() {
  const fullServices = [
    {
      category: 'Web & App Development',
      items: [
        { title: 'Custom Web Applications', desc: 'Scalable and performant web apps built with modern React frameworks.' },
        { title: 'E-Commerce Solutions', desc: 'Custom storefronts optimized for conversion and speed.' },
        { title: 'API Integration', desc: 'Seamlessly connecting third-party services and data sources.' }
      ]
    },
    {
      category: 'Design & Branding',
      items: [
        { title: 'UI/UX Design', desc: 'User-centered design focusing on frictionless experiences.' },
        { title: 'Brand Identity', desc: 'Logos, typography, and visual languages that stand out.' },
        { title: 'Interactive Prototypes', desc: 'High-fidelity prototypes for user testing and stakeholder approval.' }
      ]
    },
    {
      category: 'Digital Strategy',
      items: [
        { title: 'SEO Optimization', desc: 'Technical SEO to improve visibility and organic traffic.' },
        { title: 'Performance Audits', desc: 'Identifying bottlenecks and optimizing load times.' },
        { title: 'Content Strategy', desc: 'Engaging content plans aligned with business objectives.' }
      ]
    },
    {
      category: 'Videography & Content Creation',
      items: [
        { title: 'Cinematic Videography', desc: 'Professional film production tailored for brands and social storytelling.' },
        { title: 'Video Editing & Post', desc: 'Precision editing, color grading, and sound design for maximum impact.' },
        { title: 'Motion Graphics', desc: 'Eye-catching 2D/3D motion elements to elevate your video content.' }
      ]
    }
  ]

  return (
    <>
      <Navbar />
      <main className="page-main" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <section className="section" style={{ paddingBottom: '2rem' }}>
          <div className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Breadcrumbs />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '4rem', textAlign: 'center', marginTop: '2rem' }}
            >
              <h1 className="hero-title clean-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1rem' }}>
                Our <span style={{ color: 'var(--accent)' }}>Services</span>
              </h1>
              <p className="section-body subtext-glass" style={{ margin: '0 auto', maxWidth: '600px' }}>
                Comprehensive digital solutions to help your business grow, innovate, and thrive in the modern landscape.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {fullServices.map((section, idx) => (
                <motion.div 
                  key={section.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                    {section.category}
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                  }}>
                    {section.items.map((item, i) => (
                      <div key={item.title} className="svc-card glass-container card-three" style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{item.title}</h3>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              style={{ textAlign: 'center', marginTop: '6rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Ready to start your project?</h3>
              <a href="/hire" className="glass-liquid-button" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.8rem 1.4rem',
                color: 'var(--white)',
                background: 'var(--accent)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(128, 0, 32, 0.4)',
                textTransform: 'none',
                letterSpacing: '0.02em',
                fontSize: '0.9rem'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
