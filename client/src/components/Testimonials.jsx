import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    text: "The team completely transformed our digital presence. The obsidian glass aesthetic they delivered is absolutely world-class.",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    name: "David Chen",
    role: "Founder, Zenith",
    text: "Working with Anmol and Loveneesh was incredible. The attention to detail in the UI/UX is unmatched. Best investment we've made.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Dir, Lumina",
    text: "Harshit's video production brought our brand story to life. Combined with the new web platform, our conversions doubled in a month.",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Marcus Thorne",
    role: "Product Manager",
    text: "Insanely fast delivery and the code quality is flawless. The fluid animations they built into our app are mesmerizing.",
    image: "https://i.pravatar.cc/150?img=60"
  },
  {
    name: "Priya Patel",
    role: "Creative Director",
    text: "I've worked with many agencies, but the DigitalHall team operates on another level. Their design system was perfectly executed.",
    image: "https://i.pravatar.cc/150?img=44"
  }
]

const TestimonialCard = ({ testimonial }) => (
  <div 
    className="glass-container" 
    style={{ 
      minWidth: '350px', 
      maxWidth: '350px', 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem',
      flexShrink: 0
    }}
  >
    <div style={{ color: 'var(--accent)', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</div>
    <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.6', flexGrow: 1, fontStyle: 'italic' }}>
      "{testimonial.text}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
      <img 
        src={testimonial.image} 
        alt={testimonial.name} 
        loading="lazy"
        decoding="async"
        width="48"
        height="48"
        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
      />
      <div>
        <div style={{ fontWeight: 'bold', color: '#fff' }}>{testimonial.name}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{testimonial.role}</div>
      </div>
    </div>
  </div>
)

export default function Testimonials() {
  return (
    <section className="section testimonials-section" style={{ overflow: 'hidden', padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="section-inner" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-tag" style={{ border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '1rem', color: 'var(--accent)', fontSize: '0.7rem' }}>WALL OF LOVE</span>
        <h2 className="section-title" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          What our clients<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>are saying</em>
        </h2>
      </div>

      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', padding: '1rem 0' }}>
        {/* Gradient fades on the edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--bg-color) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--bg-color) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div
          style={{ display: 'flex', width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40
          }}
        >
          {/* Set 1 */}
          <div style={{ display: 'flex', gap: '2rem', paddingRight: '2rem' }}>
            {testimonials.map((t, i) => <TestimonialCard testimonial={t} key={i} />)}
          </div>
          {/* Set 2 */}
          <div style={{ display: 'flex', gap: '2rem', paddingRight: '2rem' }}>
            {testimonials.map((t, i) => <TestimonialCard testimonial={t} key={i} />)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
