import React from 'react'
import './AnimatedCtaButton.css' // We'll create this

export default function AnimatedCtaButton({ href, text }) {
  return (
    <a href={href} className="inspired-cta-button">
      <div className="icon-section">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="26" fill="#111928"/>
          <path d="M24.5664 38V28.7664L16.5765 33.4011L15 30.6347L22.9899 26L15 21.4012L16.5765 18.6347L24.5664 23.2694V14H27.7194V23.2694L35.7093 18.6347L37.2857 21.4012L29.2959 26L37.2857 30.6347L35.7093 33.4011L27.7194 28.7664V38H24.5664Z" fill="white"/>
        </svg>
      </div>
      <span className="text-section">{text}</span>
    </a>
  )
}
