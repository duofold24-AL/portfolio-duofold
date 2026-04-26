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
  <div className="hero" style={{ padding: '8rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <div className="hero-container" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SkeletonBase width="90%" height="80px" />
        <SkeletonBase width="70%" height="80px" />
        <SkeletonBase width="60%" height="24px" />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
          <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
        </div>
      </div>
      <div className="hero-visual">
         <SkeletonBase height="100%" borderRadius="var(--radius-lg)" />
      </div>
    </div>
  </div>
)

export const TestimonialSkeleton = () => (
  <div className="section">
    <div className="section-inner" style={{ textAlign: 'center' }}>
      <SkeletonBase width="120px" height="24px" borderRadius="var(--radius-pill)" style={{ margin: '0 auto 1.5rem' }} />
      <SkeletonBase width="60%" height="48px" style={{ margin: '0 auto 3rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-container-sharp-corner" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SkeletonBase width="40px" height="40px" borderRadius="50%" />
            <SkeletonBase height="100px" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <SkeletonBase width="50px" height="50px" borderRadius="50%" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <SkeletonBase width="100px" height="16px" />
                <SkeletonBase width="60px" height="12px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const MemberSkeleton = () => (
  <div className="section" style={{ paddingTop: '8rem' }}>
    <div className="hero-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
         <SkeletonBase width="60%" height="60px" />
         <SkeletonBase width="40%" height="20px" />
         <SkeletonBase width="100%" height="150px" />
         <div style={{ display: 'flex', gap: '1rem' }}>
           <SkeletonBase width="120px" height="40px" borderRadius="var(--radius-pill)" />
           <SkeletonBase width="120px" height="40px" borderRadius="var(--radius-pill)" />
         </div>
      </div>
      <SkeletonBase height="500px" borderRadius="var(--radius-lg)" />
    </div>
  </div>
)

export const DashboardSkeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SkeletonBase width="150px" height="30px" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SkeletonBase height="40px" borderRadius="12px" />
        <SkeletonBase height="40px" borderRadius="12px" />
        <SkeletonBase height="40px" borderRadius="12px" />
      </div>
    </div>
    <div style={{ padding: '60px 80px' }}>
      <SkeletonBase width="300px" height="50px" style={{ marginBottom: '1rem' }} />
      <SkeletonBase width="400px" height="20px" style={{ marginBottom: '3rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
        <SkeletonBase height="120px" borderRadius="20px" />
        <SkeletonBase height="120px" borderRadius="20px" />
        <SkeletonBase height="120px" borderRadius="20px" />
      </div>
      <SkeletonBase height="400px" borderRadius="24px" />
    </div>
  </div>
)
