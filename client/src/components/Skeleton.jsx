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
  <div className="hero-lockup" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <SkeletonBase width="80%" height="80px" />
      <SkeletonBase width="60%" height="80px" />
      <SkeletonBase width="100%" height="24px" />
      <SkeletonBase width="90%" height="24px" />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
        <SkeletonBase width="160px" height="50px" borderRadius="var(--radius-pill)" />
      </div>
    </div>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingLeft: '5%' }}>
       <SkeletonBase width="450px" height="450px" borderRadius="40px" />
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

export const ServicesSkeleton = () => (
  <div className="section">
    <div className="section-inner">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <SkeletonBase width="120px" height="24px" borderRadius="var(--radius-pill)" style={{ margin: '0 auto 1.5rem' }} />
        <SkeletonBase width="60%" height="48px" style={{ margin: '0 auto 1.25rem' }} />
        <SkeletonBase width="40%" height="20px" style={{ margin: '0 auto' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="glass-container card-three" style={{ height: '220px', padding: '2rem' }}>
            <SkeletonBase width="50px" height="50px" borderRadius="12px" style={{ marginBottom: '1.5rem' }} />
            <SkeletonBase width="70%" height="24px" style={{ marginBottom: '1rem' }} />
            <SkeletonBase width="100%" height="16px" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const FooterSkeleton = () => (
  <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
      <div style={{ gridColumn: 'span 1' }}>
        <SkeletonBase width="120px" height="32px" style={{ marginBottom: '1.5rem' }} />
        <SkeletonBase width="100%" height="60px" />
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SkeletonBase width="80px" height="20px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonBase width="100%" height="16px" />
          <SkeletonBase width="100%" height="16px" />
          <SkeletonBase width="100%" height="16px" />
        </div>
      ))}
    </div>
  </footer>
)

export const GeneralPageSkeleton = () => (
  <div style={{ paddingTop: '100px' }}>
    <div className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SkeletonBase width="200px" height="20px" style={{ marginBottom: '3rem' }} />
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <SkeletonBase width="40%" height="80px" style={{ margin: '0 auto 1.5rem' }} />
        <SkeletonBase width="60%" height="24px" style={{ margin: '0 auto' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {[1, 2].map(i => (
          <div key={i}>
            <SkeletonBase width="200px" height="32px" style={{ marginBottom: '2rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[1, 2, 3].map(j => (
                <SkeletonBase key={j} height="150px" borderRadius="2rem" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
