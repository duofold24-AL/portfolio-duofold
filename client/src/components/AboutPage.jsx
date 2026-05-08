import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'
import { motion } from 'framer-motion'
import { teamMembers } from '../data/team'


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutPage() {
  return (
    <>
      <style>
        {`
          .about-team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 5%;
          }

          .about-cta-container {
            padding: 4rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
          }

          .about-cta-buttons {
            display: flex;
            gap: 1.5rem;
            margin-top: 1rem;
          }

          @media (max-width: 768px) {
            .about-team-grid {
              grid-template-columns: 1fr;
              padding: 0 1rem;
            }
            .about-header-top {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1.5rem !important;
            }
            .about-cta-container {
              padding: 3rem 1.5rem;
            }
            .about-cta-buttons {
              flex-direction: column;
              width: 100%;
              gap: 1rem;
            }
            .about-cta-buttons a {
              width: 100%;
              text-align: center;
              justify-content: center;
            }
            main {
              padding-top: 100px !important;
            }
          }
        `}
      </style>
      <Navbar />
      <main style={{ paddingTop: '120px', minHeight: 'calc(100vh - 100px)', position: 'relative', zIndex: 1 }}>
        {/* ── Header ── */}
        <section className="section" style={{ paddingBottom: '2rem' }}>
          <div className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Breadcrumbs />
            <div className="about-header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <span className="section-tag">ABOUT OUR TEAM</span>
                <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: 0, fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
                  The people behind<br /><em>the craft</em>
                </h1>
              </div>
              <a
                href="/"
                className="btn btn-ghost"
                style={{ 
                  textDecoration: 'none', 
                  padding: '1rem 2rem', 
                  height: 'auto', 
                  width: 'auto',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border)'
                }}
              >
                ← Back to Home
              </a>
            </div>
            <p className="section-body subtext-glass" style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
              We are a close-knit creative studio — developers, designers, and storytellers — unified by a single mission: turning ambitious ideas into digital masterpieces.
            </p>
          </div>
        </section>

        {/* ── Team Cards ── */}
        <section className="section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="about-team-grid"
          >
            {teamMembers.map((member) => (
              <a href={`/member/${member.id}`} key={member.id} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  variants={cardVariants}
                className="glass-container"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  padding: '2.5rem',
                  minHeight: '450px',
                  border: 'none', // reset inline border to use liquid glass system
                  background: 'transparent' // transparent because liquid glass system uses pseudo-elements
                }}
              >
                {/* Visual Accent */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    width: '100px', 
                    height: '100px', 
                    background: member.gradient, 
                    filter: 'blur(60px)', 
                    opacity: 0.2,
                    pointerEvents: 'none'
                  }} 
                />

                {/* Avatar / Icon */}
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: 'var(--radius)',
                    background: member.image ? 'rgba(255,255,255,0.05)' : member.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    position: 'relative',
                    zIndex: 2,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      loading="lazy"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'contrast(1.05) brightness(1.1)' 
                      }} 
                    />
                  ) : (
                    member.emoji
                  )}
                </div>

                {/* Name & Role */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.75rem',
                    color: 'var(--white)',
                    marginBottom: '0.4rem',
                    letterSpacing: '-0.03em',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {member.name}
                </h2>
                {member.role && (
                  <p
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--accent)',
                      marginBottom: '1.5rem',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {member.role}
                  </p>
                )}

                {/* Bio */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {member.bio}
                </p>

                {/* Skills Container */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Core Expertise</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {member.skills.map((skill) => (
                      <span key={skill} className="skill-chip" style={{ fontSize: '0.7rem', padding: '0.35rem 0.75rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              </a>
            ))}
          </motion.div>
        </section>

        {/* ── Studio CTA ── */}
        <section style={{ padding: '0 5% 8rem' }}>
          <div
            className="glass-container-sharp-corner about-cta-container"
          >
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Let's craft something <em>extraordinary</em>
            </h2>
            <p className="subtext-glass" style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px' }}>
              We're currently accepting new projects and creative collaborations. If you have a vision that needs high-end execution, let's talk.
            </p>
            <div className="about-cta-buttons">
              <a href="/#contact" className="btn btn-primary" style={{ height: 'auto', width: 'auto', padding: '1rem 2.5rem' }}>
                Start a project →
              </a>
              <a href="mailto:hello@duofold.com" className="btn btn-ghost" style={{ height: 'auto', width: 'auto', padding: '1rem 2.5rem' }}>
                Say hello
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
