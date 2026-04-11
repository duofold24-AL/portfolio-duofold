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
      <div className="glass-container-sharp-corner card-three section-inner contact-main-card">
        <div className="contact-layout-grid">
          <div className="contact-col-title">
            <span className="section-tag" style={{ border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '1rem', color: 'var(--accent)', fontSize: '0.7rem' }}>LET'S TALK</span>
            <h2 className="section-title">
              Ready to build<br /><em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>something great?</em>
            </h2>
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
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
