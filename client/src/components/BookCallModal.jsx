import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM'
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function BookCallModal({ isOpen, onClose }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [step, setStep] = useState(1) // 1: pick date/time, 2: fill details, 3: success
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSelectedDate(null)
      setSelectedTime(null)
      setForm({ name: '', email: '', note: '' })
      setStatus('idle')
      setErrMsg('')
    }
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const isPastDay = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const isWeekend = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    const dow = d.getDay()
    return dow === 0 || dow === 6
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleDayClick = (day) => {
    if (isPastDay(day)) return
    setSelectedDate(new Date(viewYear, viewMonth, day))
    setSelectedTime(null)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrMsg('Please fill in your name and email.')
      return
    }
    setStatus('loading')
    setErrMsg('')

    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const messageBody = `📅 CALL BOOKING REQUEST\n\nDate: ${dateStr}\nTime: ${selectedTime}\n\n${form.note ? `Note: ${form.note}\n\n` : ''}—\nBooked via DigitalHall website`

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: messageBody })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Something went wrong')
      }
      setStatus('success')
      setStep(3)
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 10000
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10001,
            pointerEvents: 'none'
          }}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                pointerEvents: 'auto',
                width: 'min(96vw, 880px)',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                padding: '2.5rem',
                color: '#fff',
                fontFamily: 'var(--font-body, sans-serif)'
              }}
            >
              {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent, #800020)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  📞 Book a Call
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-heading, sans-serif)', margin: 0 }}>
                  Schedule a Discovery Call
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                  30 min · Video or Phone · Mon–Fri
                </p>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '2.5rem', height: '2.5rem', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >×</button>
            </div>

            {/* Progress dots */}
            {step < 3 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                {[1, 2].map(s => (
                  <div key={s} style={{
                    height: '4px', flex: 1, borderRadius: '2px',
                    background: step >= s ? 'var(--accent, #800020)' : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s'
                  }} />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">

              {/* ── STEP 1: Calendar + Time ── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* Calendar */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                        <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', cursor: 'pointer', padding: '0.4rem 0.8rem' }}>‹</button>
                        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{MONTHS[viewMonth]} {viewYear}</span>
                        <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', cursor: 'pointer', padding: '0.4rem 0.8rem' }}>›</button>
                      </div>

                      {/* Day labels */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '0.5rem' }}>
                        {DAYS.map(d => (
                          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 700, padding: '0.3rem 0' }}>{d}</div>
                        ))}
                      </div>

                      {/* Calendar grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
                        {Array(daysInMonth).fill(null).map((_, i) => {
                          const day = i + 1
                          const past = isPastDay(day)
                          const weekend = isWeekend(day)
                          const isSelected = selectedDate &&
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() === viewMonth &&
                            selectedDate.getFullYear() === viewYear
                          const disabled = past || weekend

                          return (
                            <button
                              key={day}
                              onClick={() => !disabled && handleDayClick(day)}
                              style={{
                                padding: '0.5rem 0.2rem',
                                borderRadius: '0.5rem',
                                border: isSelected ? '1px solid var(--accent, #800020)' : '1px solid transparent',
                                background: isSelected ? 'var(--accent, #800020)' : disabled ? 'transparent' : 'rgba(255,255,255,0.03)',
                                color: isSelected ? '#fff' : disabled ? 'rgba(255,255,255,0.2)' : '#fff',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: isSelected ? 700 : 400,
                                transition: 'all 0.15s',
                                textAlign: 'center'
                              }}
                            >{day}</button>
                          )
                        })}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.8rem' }}>Weekends unavailable</p>
                    </div>

                    {/* Time slots */}
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                        {selectedDateLabel || 'Select a date first'}
                      </h4>
                      {selectedDate ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '320px', overflowY: 'auto' }}>
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              style={{
                                padding: '0.7rem 1rem',
                                borderRadius: '0.75rem',
                                border: selectedTime === slot ? '1px solid var(--accent, #800020)' : '1px solid rgba(255,255,255,0.08)',
                                background: selectedTime === slot ? 'var(--accent, #800020)' : 'rgba(255,255,255,0.03)',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: selectedTime === slot ? 700 : 400,
                                textAlign: 'left',
                                transition: 'all 0.15s'
                              }}
                            >{slot}</button>
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '1rem' }}>
                          ← Pick a date
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      style={{
                        padding: '0.8rem 2rem',
                        borderRadius: '99rem',
                        background: selectedDate && selectedTime ? 'var(--accent, #800020)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                        opacity: selectedDate && selectedTime ? 1 : 0.4,
                        transition: 'all 0.2s',
                        boxShadow: selectedDate && selectedTime ? '0 4px 15px rgba(128, 0, 32,0.4)' : 'none'
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Details form ── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  {/* Booking summary pill */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(128, 0, 32,0.1)', border: '1px solid rgba(128, 0, 32,0.3)', borderRadius: '99rem', padding: '0.5rem 1rem', fontSize: '0.85rem', marginBottom: '2rem' }}>
                    <span>📅</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{selectedDateLabel}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                    <span style={{ color: 'var(--accent, #800020)', fontWeight: 700 }}>{selectedTime}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <input
                        type="text"
                        id="bc-name"
                        placeholder=" "
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                      <label htmlFor="bc-name">Your Name *</label>
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <input
                        type="email"
                        id="bc-email"
                        placeholder=" "
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                      <label htmlFor="bc-email">Email Address *</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      id="bc-note"
                      rows="3"
                      placeholder=" "
                      value={form.note}
                      onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    />
                    <label htmlFor="bc-note">Brief note (optional)</label>
                  </div>

                  {errMsg && <p style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errMsg}</p>}

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'space-between' }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
                    >← Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      style={{
                        padding: '0.8rem 2rem',
                        borderRadius: '99rem',
                        background: 'var(--accent, #800020)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                        boxShadow: '0 4px 15px rgba(128, 0, 32,0.4)',
                        transition: 'all 0.2s'
                      }}
                    >
                      {status === 'loading' ? 'Booking…' : 'Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Success ── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>You're booked!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
                    {selectedDateLabel} at <strong style={{ color: 'var(--accent, #800020)' }}>{selectedTime}</strong>
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    We've received your booking and will send a confirmation to <strong style={{ color: '#fff' }}>{form.email}</strong>.
                  </p>
                  <button
                    onClick={onClose}
                    style={{ padding: '0.8rem 2rem', borderRadius: '99rem', background: 'var(--accent, #800020)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(128, 0, 32,0.4)' }}
                  >Close</button>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
