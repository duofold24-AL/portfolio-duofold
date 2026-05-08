import { useState } from 'react'
import LiquidLoadingButton from './LiquidLoadingButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Something went wrong')
      }
      setStatus('success')
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="glass-container card-three section-inner contact-main-card">
        <div className="contact-layout-grid">
          <div className="contact-col-title">
            <span className="section-tag" style={{ border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '1rem', color: 'var(--accent)', fontSize: '0.7rem' }}>LET'S TALK</span>
            <h2 className="section-title">
              Ready to build<br /><em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>something great?</em>
            </h2>
            <p className="subtext-glass" style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '90%' }}>
              Whether you have a complete product specification or just an idea on a napkin, our team of developers and designers is ready to bring your vision to life. Fill out the form or message us directly.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <a 
                href="https://wa.me/qr/R4IC2RB7DMO7H1" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-liquid-button" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.8rem 1.8rem',
                  color: '#25D366',
                  textTransform: 'none',
                  letterSpacing: '0.05em'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'drop-shadow(0 0 8px rgba(37,211,102,0.6))' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-col-form">
            {status === 'success' ? (
              <div className="form-success">
                <h3>Message sent! 🎉</h3>
                <p>Thanks for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder=" "
                    required
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                  <label htmlFor="message">Your Message</label>
                </div>

                {status === 'error' && (
                  <div className="form-error">⚠ {errMsg}</div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <a 
                    href="/hire" 
                    className="glass-liquid-button" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.8rem 1.4rem',
                      color: 'var(--white)',
                      textTransform: 'none',
                      letterSpacing: '0.02em',
                      fontSize: '0.9rem'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px var(--accent-glow))' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Detailed Inquiry
                  </a>
                  <LiquidLoadingButton 
                    text="Send Message ↗"
                    loadingText="Sending..."
                    onClick={handleSubmit} 
                    className="liquid-submit"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
