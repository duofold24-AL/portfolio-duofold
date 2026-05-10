export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="glass-container card-three section-inner about-main-card">
        <div className="about-content-grid">
          <div className="about-col-title">
            <span className="section-tag" style={{ border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '1rem', color: 'var(--accent)', fontSize: '0.7rem' }}>ABOUT US</span>
            <h2 className="section-title">
              Turning ideas into<br /><em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>digital art</em>
            </h2>
            <div style={{ marginTop: '2rem' }}>
              <a href="/about" className="btn btn-primary" style={{ height: 'auto', width: 'auto', padding: '0.8rem 1.8rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                Meet the Team →
              </a>
            </div>
          </div>

          <div className="about-col-text">
            <p className="section-body">
              We are a team of full-stack developers and creative technologists. We specialise in
              building high-performance web applications with a laser focus on user
              experience, micro-interactions, and visual storytelling — powered by
              React frontends and Python/Node backends.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
