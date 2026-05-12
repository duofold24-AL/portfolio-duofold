import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BookCallModal from './BookCallModal'
import LiquidButton from './LiquidButton'
import './AnimatedCtaButton.css'

export default function FloatingBookCall() {
  const [open, setOpen] = useState(false)
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const btnWidth = dimensions.isMobile ? dimensions.width - 64 : 280
  const btnHeight = dimensions.isMobile ? 48 : 55

  return (
    <>
      <BookCallModal isOpen={open} onClose={() => setOpen(false)} />

      <div className="floating-cta-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="floating-cta-inner"
        >
          {/* Waves */}
          <div className="button-ripple-wave" />
          <div className="button-ripple-wave" />

          <LiquidButton
            text="Book a Call"
            onClick={() => setOpen(true)}
            width={btnWidth}
            height={btnHeight}
            color1="#800020"
            color2="#990026"
            color3="#4d0013"
            svgPath="M17.4,22A15.42,15.42,0,0,1,2,6.6,4.6,4.6,0,0,1,6.6,2a1.43,1.43,0,0,1,1.14.54l2.58,3.44a1.44,1.44,0,0,1-.13,1.8l-2.07,2.07a11.36,11.36,0,0,0,6.08,6.08l2.07-2.07a1.44,1.44,0,0,1,1.8-.13l3.44,2.58A1.43,1.43,0,0,1,22,17.4,4.6,4.6,0,0,1,17.4,22Z"
            viewBoxSize={24}
          />
        </motion.div>
      </div>
    </>
  )
}
