export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  
  return (
    <footer className="footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '4rem 2rem' }}>
      <button 
        onClick={scrollToTop}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--white)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
      >
        ↑ Back to Top
      </button>
      <p>
        <a href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>©</a> {new Date().getFullYear()} · Crafted by <strong>Anmol, Loveneesh & Harshit</strong> ·{' '}
        <span className="footer-name" style={{ color: 'rgba(255,255,255,0.6)' }}>DigitalHall — Creative Studio & Production</span>
      </p>
    </footer>
  )
}
