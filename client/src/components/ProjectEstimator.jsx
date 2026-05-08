import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidLoadingButton from './LiquidLoadingButton'

export default function ProjectEstimator() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: '',
    budget: '',
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')
  const [customBudget, setCustomBudget] = useState('')

  const handleSelectService = (service) => {
    setFormData(prev => ({ ...prev, serviceType: service }))
    setStep(2)
  }

  const handleSelectBudget = (budget) => {
    setFormData(prev => ({ ...prev, budget: budget }))
    setStep(3)
  }

  const handleCustomBudgetSubmit = () => {
    if (customBudget.trim()) {
      handleSelectBudget(`Custom: ${customBudget}`)
    }
  }

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Service: ${formData.serviceType}\nBudget: ${formData.budget}\n\nVision:\n${formData.message}`
        }),
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

  const services = [
    { id: 'Web App', desc: 'Full-stack custom platforms' },
    { id: 'Landing Page', desc: 'High-conversion marketing sites' },
    { id: 'Video Production', desc: 'Cinematic brand storytelling' },
    { id: 'UI/UX Design', desc: 'Premium user experiences' }
  ]

  const budgets = [
    { id: '<$250', usd: '< $250', inr: 'Below ₹20,000' },
    { id: '$250-$1.25k', usd: '$250 - $1,250', inr: '₹20,000 - ₹1 Lakh' },
    { id: '$1.25k-$2.5k', usd: '$1,250 - $2,500', inr: '₹1 Lakh - ₹2 Lakhs' },
    { id: '$2.5k+', usd: '$2,500+', inr: 'Above ₹2 Lakhs' }
  ]

  return (
    <div className="glass-container card-three estimator-main-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Progress Bar */}
      {status !== 'success' && (
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
          <motion.div 
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            style={{ height: '100%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
          />
        </div>
      )}

      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="form-success" 
          style={{ textAlign: 'center', padding: '3rem 1rem' }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Request Received!</h3>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
            Thanks for reaching out. We've received your project details and will be in touch shortly to discuss the next steps!
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>What are you looking for?</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Select the primary focus of your project.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {services.map(srv => (
                  <motion.button 
                    key={srv.id}
                    onClick={() => handleSelectService(srv.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '1rem',
                      background: formData.serviceType === srv.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: formData.serviceType === srv.id ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: formData.serviceType === srv.id ? '0 0 20px rgba(255,255,255,0.1) inset' : '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s, border 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{srv.id}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{srv.desc}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>What's your estimated budget?</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>This helps us tailor our approach and propose the best solution.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {budgets.map(bg => (
                  <motion.button 
                    key={bg.id}
                    onClick={() => handleSelectBudget(bg.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '1rem',
                      background: formData.budget === bg.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: formData.budget === bg.id ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: formData.budget === bg.id ? '0 0 20px rgba(255,255,255,0.1) inset' : '0 4px 30px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'background 0.2s, border 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{bg.usd}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{bg.inr}</span>
                  </motion.button>
                ))}
              </div>

              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Or enter a custom budget:</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ margin: 0, flex: '1 1 250px' }}>
                    <input 
                      type="text" 
                      id="custom-budget" 
                      placeholder=" " 
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleCustomBudgetSubmit()
                        }
                      }}
                    />
                    <label htmlFor="custom-budget">E.g., $15,000 or ₹10 Lakhs</label>
                  </div>
                  <button 
                    onClick={handleCustomBudgetSubmit}
                    className="glass-liquid-button" 
                    style={{ padding: '0 2rem', height: '54px', textTransform: 'none', letterSpacing: 'normal' }}
                    disabled={!customBudget.trim()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setStep(2)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Tell us about the vision.</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Share a brief overview of what you want to achieve.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input
                      type="text"
                      id="est-name"
                      name="name"
                      placeholder=" "
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                    <label htmlFor="est-name">Your Name</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="est-email"
                      name="email"
                      placeholder=" "
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                    <label htmlFor="est-email">Email Address</label>
                  </div>
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <textarea
                    id="est-message"
                    name="message"
                    rows="4"
                    placeholder=" "
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  ></textarea>
                  <label htmlFor="est-message">Project Vision</label>
                </div>

                {status === 'error' && <p className="form-error" style={{ color: 'red', marginTop: '1rem' }}>{errMsg}</p>}

                <div style={{ marginTop: '2rem' }}>
                  <LiquidLoadingButton 
                    text="Send Request" 
                    loadingText="Sending..." 
                    className="btn-primary" 
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
