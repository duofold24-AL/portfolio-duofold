import { useEffect, useRef } from 'react'

export default function RainbowTrail() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const currentMousePos = useRef({ x: -1000, y: -1000 })
  const lastMousePos = useRef({ x: -1000, y: -1000, time: 0 })
  const frameCount = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      const now = Date.now()
      const x = e.clientX
      const y = e.clientY
      currentMousePos.current = { x, y }

      const dt = now - lastMousePos.current.time
      if (dt > 0) {
        const dx = x - lastMousePos.current.x
        const dy = y - lastMousePos.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const velocity = dist / dt

        // Emit light sources that will be warped by the SVG filter into caustics
        if (dist > 2) { 
          particles.current.push({
            x, y,
            r: 10 + Math.min(velocity * 8, 30), // Soft expanding base
            life: 1.0,
            hue: (now / 15) % 360,
            flickerOffset: Math.random() * Math.PI * 2
          })
        }
      }
      lastMousePos.current = { x, y, time: now }
    }

    const render = () => {
      frameCount.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Idle particle emission to keep cursor glowing with caustics
      if (frameCount.current % 8 === 0 && currentMousePos.current.x > 0) {
          particles.current.push({
            x: currentMousePos.current.x + (Math.random() * 8 - 4),
            y: currentMousePos.current.y + (Math.random() * 8 - 4),
            r: 8 + Math.random() * 6,
            life: 1.0,
            hue: (Date.now() / 15) % 360,
            flickerOffset: Math.random() * Math.PI * 2
          })
      }

      particles.current = particles.current.filter(p => p.life > 0)
      
      const mouseX = currentMousePos.current.x;
      const mouseY = currentMousePos.current.y;

      particles.current.forEach(p => {
        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY)
        
        // DISTANCE-BASED DECAY LOGIC
        if (distToMouse < 60) {
          p.life -= 0.008 // Lingers (~2s) near cursor
        } else {
          p.life -= 0.08 // Fades extremely fast when cursor moves away (~200ms)
        }

        const flicker = Math.sin(frameCount.current * 0.15 + p.flickerOffset)
        p.r += 0.8 + flicker * 0.3 // Water ripples distort expansion
        
        ctx.beginPath()
        const currentR = Math.max(1, p.r)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentR)
        
        // Slightly higher alpha inside codebase because the SVG displacement will scatter the light
        const alpha = p.life * 0.35 
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`) // Core bright white caustic
        gradient.addColorStop(0.2, `rgba(255, 255, 255, ${alpha * 0.8})`)
        gradient.addColorStop(0.6, `hsla(${p.hue}, 100%, 75%, ${alpha * 0.3})`) // Subtle prism edge
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 75%, 0)`)

        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    const handleMouseLeave = () => {
      currentMousePos.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    resizeCanvas()
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="global-rainbow-trail"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'color-dodge', // Color dodge ensures it acts like pure light
        filter: 'url(#water-ripple) blur(1px)' // <--- Physical water distortion!
      }}
    />
  )
}
