import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'
import { teamMembers } from '../data/team'

export default function MemberPage() {
  const pathParts = window.location.pathname.split('/')
  const memberId = pathParts[pathParts.length - 1]
  const member = teamMembers.find(m => m.id === memberId)

  if (!member) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '120px', minHeight: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'var(--white)', fontSize: '2rem' }}>Member not found.</h1>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <style>
        {`
          .member-hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 5%;
            align-items: center;
          }
          
          .member-image-wrapper {
            position: relative;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            aspect-ratio: 4/5;
          }

          .member-image-wrapper::before {
            content: "";
            position: absolute;
            inset: 0;
            background: ${member.gradient};
            opacity: 0.2;
            z-index: 1;
            mix-blend-mode: overlay;
          }

          @media (max-width: 900px) {
            .member-hero {
              grid-template-columns: 1fr;
              gap: 2rem;
              padding: 2rem 5%;
            }
          }
        `}
      </style>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: 'calc(100vh - 100px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
          <Breadcrumbs />
        </div>
        <section className="section">
          <div className="member-hero">
            <div className="member-image-wrapper glass-container">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) brightness(1.1)' }} 
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '8rem', background: member.gradient }}>
                  {member.emoji}
                </div>
              )}
            </div>

            <div className="member-details">
              <a href="/about" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                ← Back to Team
              </a>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                {member.name}
              </h1>
              {member.role && (
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
                  {member.role}
                </div>
              )}
              
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius)', padding: '2rem', marginBottom: '2.5rem', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '1rem' }}>Biography</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--white)', lineHeight: 1.8, opacity: 0.9 }}>
                  {member.bio}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '1rem' }}>Core Expertise</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {member.skills.map((skill) => (
                    <span key={skill} className="skill-chip" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {member.services && (
                <div style={{ marginTop: '3rem' }}>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Personal Services</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {member.services.map((svc) => (
                      <div key={svc.title} className="glass-container" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>{svc.title}</h4>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{svc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
