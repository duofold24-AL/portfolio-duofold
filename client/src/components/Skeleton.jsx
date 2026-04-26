import React from 'react'

export const SkeletonBase = ({ width, height, borderRadius, className = '' }) => (
  <div 
    className={`skeleton ${className}`} 
    style={{ 
      width: width || '100%', 
      height: height || '20px', 
      borderRadius: borderRadius || 'var(--radius)' 
    }} 
  />
)

export const ProjectSkeleton = () => (
  <div className="glass-container-sharp-corner" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem' }}>
    <SkeletonBase height="200px" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <SkeletonBase width="70%" height="28px" />
      <SkeletonBase width="40%" height="16px" />
      <SkeletonBase width="100%" height="60px" />
    </div>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <SkeletonBase width="60px" height="24px" borderRadius="var(--radius-pill)" />
      <SkeletonBase width="80px" height="24px" borderRadius="var(--radius-pill)" />
    </div>
    <SkeletonBase height="45px" borderRadius="var(--radius-pill)" />
  </div>
)

export const AboutSkeleton = () => (
  <div className="glass-container card-three" style={{ padding: '3rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SkeletonBase width="100px" height="24px" borderRadius="var(--radius-pill)" />
        <SkeletonBase width="80%" height="60px" />
        <SkeletonBase width="60%" height="60px" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SkeletonBase width="100%" height="20px" />
        <SkeletonBase width="100%" height="20px" />
        <SkeletonBase width="90%" height="20px" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
          {[1,2,3,4,5,6,7,8].map(i => (
            <SkeletonBase key={i} width="80px" height="32px" borderRadius="var(--radius-pill)" />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export const HeroSkeleton = () => (
  <div className="hero" style={{ paddingTop: '120px' }}>
    <div className="hero-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SkeletonBase width="90%" height="100px" />
        <SkeletonBase width="80%" height="100px" />
        <SkeletonBase width="60%" height="24px" />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
          <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
        </div>
      </div>
      <SkeletonBase height="600px" />
    </div>
  </div>
)
