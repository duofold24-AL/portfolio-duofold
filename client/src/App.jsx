import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiquidHeroBackground from './components/LiquidHeroBackground'

// Lazy load components below the fold
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const Testimonials = lazy(() => import('./components/Testimonials'))

const AdminPage = lazy(() => import('./components/AdminPage'))
const AllProjectsPage = lazy(() => import('./components/AllProjectsPage'))
const AboutPage = lazy(() => import('./components/AboutPage'))
const MemberPage = lazy(() => import('./components/MemberPage'))
const HireUsPage = lazy(() => import('./components/HireUsPage'))
const ServicesPage = lazy(() => import('./components/ServicesPage'))
const Services = lazy(() => import('./components/Services'))
const FloatingBookCall = lazy(() => import('./components/FloatingBookCall'))

import { SkeletonBase, HeroSkeleton, AboutSkeleton, ProjectSkeleton, TestimonialSkeleton, MemberSkeleton, DashboardSkeleton, ServicesSkeleton, FooterSkeleton, GeneralPageSkeleton } from './components/Skeleton'

// Loading component for Suspense
const SectionLoader = ({ type }) => {
  if (type === 'about') return <AboutSkeleton />
  if (type === 'projects') return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </div>
  )
  if (type === 'services') return <ServicesSkeleton />
  if (type === 'testimonials') return <TestimonialSkeleton />
  if (type === 'contact') return (
    <div className="section">
      <div className="section-inner">
        <SkeletonBase width="150px" height="24px" borderRadius="var(--radius-pill)" style={{ marginBottom: '1.5rem' }} />
        <SkeletonBase width="80%" height="48px" style={{ marginBottom: '3rem' }} />
        <div className="glass-container-sharp-corner" style={{ height: '500px' }} />
      </div>
    </div>
  )
  return (
    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
    </div>
  )
}

export default function App() {
  const isAdminPath = window.location.pathname === '/admin'
  const isProjectsPath = window.location.pathname === '/projects'
  const isAboutPath = window.location.pathname === '/about'
  const isMemberPath = window.location.pathname.startsWith('/member/')
  const isHirePath = window.location.pathname === '/hire'
  const isServicesPath = window.location.pathname === '/services'

  return (
    <>
      {/* SVG filter definitions — liquid glass effect */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="bubble-water" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="1" seed="12" result="bubbles" />
            <feDiffuseLighting in="bubbles" lightingColor="#ffffff" surfaceScale="2" result="diffuse">
               <feDistantLight azimuth="225" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diffuse-clip" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="edge-blur" />
            <feSpecularLighting in="edge-blur" surfaceScale="5" specularConstant="1.5" specularExponent="30" lightingColor="#ffffff" result="specular">
              <fePointLight x="-50" y="-100" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-clip" />
            <feTurbulence type="turbulence" baseFrequency="0.015 0.012" numOctaves="1" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feMerge>
              <feMergeNode in="warped" />
              <feMergeNode in="diffuse-clip" />
              <feMergeNode in="specular-clip" />
            </feMerge>
          </filter>
          <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.012" numOctaves="1" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
            <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
          </filter>
          <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lg-dist" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="1" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="liquid-glass-morph" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -14" result="goo-solid" />
            <feColorMatrix in="goo-solid" type="matrix" values="1.2 0 0 0 0  0 1.2 0 0 0  0 0 1.2 0 0  0 0 0 0.05 0" result="glass-body" />
            <feColorMatrix in="goo-solid" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" result="goo-alpha" />
            <feMorphology in="goo-alpha" operator="erode" radius="3" result="eroded" />
            <feGaussianBlur in="eroded" stdDeviation="4" result="eroded-blur" />
            <feComposite in="goo-alpha" in2="eroded-blur" operator="out" result="edge" />
            <feColorMatrix in="edge" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.8 0" result="glass-edge" />
            <feGaussianBlur in="goo-alpha" stdDeviation="5" result="spec-depth" />
            <feSpecularLighting in="spec-depth" surfaceScale="7" specularConstant="1.2" specularExponent="40" lighting-color="#ffffff" result="spec">
              <fePointLight x="-50" y="-100" z="250" />
            </feSpecularLighting>
            <feComposite in="spec" in2="goo-alpha" operator="in" result="spec-cut" />
            <feGaussianBlur in="goo-alpha" stdDeviation="15" result="shadow-blur" />
            <feOffset in="shadow-blur" dx="0" dy="10" result="shadow-offset" />
            <feFlood floodColor="#800020" floodOpacity="0.15" result="shadow" />
            <feComposite in="shadow" in2="shadow-offset" operator="in" result="shadow-final" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -0.333 -0.333 -0.333 1 0" result="extracted-icons" />
            <feComposite in="extracted-icons" in2="goo-alpha" operator="in" result="masked-icons" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="glass-body" />
              <feMergeNode in="glass-edge" />
              <feMergeNode in="spec-cut" />
              <feMergeNode in="masked-icons" />
            </feMerge>
          </filter>
          <filter id="depth-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="water-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" in="noise" result="coloredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="25" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          </filter>
          <filter id="liquid-glass" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' x='0' y='0' fill='gray' rx='22' ry='22' stroke='green' stroke-width='7' style='filter: contrast(2)'/></svg>"></feImage>
            <feGaussianBlur in="map" stdDeviation="1.5" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" id="Greenchannel" result="dispGreen" scale="-50" xChannelSelector="G" yChannelSelector="R" />
          </filter>
          <filter id="liquid-glass-two" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' x='0' y='0' fill='gray' rx='22' ry='22' stroke='green' stroke-width='5' style='filter: blur(3px) contrast(2)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="Greenchannel-two" result="dispGreen" scale="-70" xChannelSelector="G" yChannelSelector="R" />
          </filter>
          <filter id="thick-liquid-glass" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='green'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='22' ry='22' stroke='url(%23red-green-stroke)' strokeWidth='5' style='filter:blur(5px) contrast(2)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-one" result="dispRed" scale="-100" xChannelSelector="G" yChannelSelector="R"></feDisplacementMap>
          </filter>
          <filter id="melted-liquid-glass-angled" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0 0 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='red'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='40' ry='40' stroke='url(%23red-green-stroke)' stroke-width='15' style='filter:blur(3px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-two" result="dispRed" scale="-50" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <filter id="liquid-glass-stretchy-angled" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='red'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='40' ry='40' stroke='url(%23red-green-stroke)' stroke-width='5' style='filter:blur(3px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-three" result="dispRed" scale="-70" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <filter id="liquid-glass-stretchy-angled-radius-0rem" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0 0 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-grad' x1='0%' y1='0%' x2='0%' y2='0%'><stop offset='0%' stop-color='%230000'/><stop offset='100%' stop-color='red'/></linearGradient><linearGradient id='green-grad' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%230000'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect rx='0%' ry='0%' width='100%' height='100%' fill='black'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='url(%23red-grad)'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='url(%23green-grad)'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='hsl(0 0% 50% / 1)' style='filter:blur(5px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-four" result="dispRed" scale="-100" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <filter id="knockout" colorInterpolationFilters="sRGB">
            <feColorMatrix result="knocked" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 1 0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="3" intercept="-1" />
              <feFuncG type="linear" slope="3" intercept="-1" />
              <feFuncB type="linear" slope="3" intercept="-1" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
              <feFuncG type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
              <feFuncB type="table" tableValues="0 0 0 0 0 1 1 1 1 1" />
            </feComponentTransfer>
          </filter>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -255 -255 -255 0 1" result="black-pixels" />
            <feMorphology in="black-pixels" operator="dilate" radius="0.5" result="smoothed" />
            <feComposite in="SourceGraphic" in2="smoothed" operator="out" />
          </filter>
        </defs>
      </svg>

      {/* Background Ecosystem */}
      <div id="app-background-composer" style={{ position: 'fixed', inset: 0, zIndex: -100, overflow: 'hidden', background: '#0b0b0f' }}>
        <LiquidHeroBackground />
      </div>

      <Suspense fallback={<div className="global-loader" />}>
        {isAdminPath ? (
          <Suspense fallback={<DashboardSkeleton />}>
            <AdminPage />
          </Suspense>
        ) : isProjectsPath ? (
          <Suspense fallback={<div className="section"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /></div></div>}>
            <AllProjectsPage />
          </Suspense>
        ) : isAboutPath ? (
          <Suspense fallback={<AboutSkeleton />}>
            <AboutPage />
          </Suspense>
        ) : isMemberPath ? (
          <Suspense fallback={<MemberSkeleton />}>
            <MemberPage />
          </Suspense>
        ) : isHirePath ? (
          <Suspense fallback={<div className="section"><GeneralPageSkeleton /></div>}>
            <HireUsPage />
          </Suspense>
        ) : isServicesPath ? (
          <Suspense fallback={<div className="section"><GeneralPageSkeleton /></div>}>
            <ServicesPage />
          </Suspense>
        ) : (
          <>
            <Navbar />
            <main>
              <Suspense fallback={<HeroSkeleton />}>
                <Hero />
              </Suspense>
              <Suspense fallback={<SectionLoader type="about" />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionLoader type="projects" />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionLoader type="services" />}>
                <Services />
              </Suspense>
              <Suspense fallback={<SectionLoader type="testimonials" />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<SectionLoader type="contact" />}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={<FooterSkeleton />}>
              <Footer />
            </Suspense>
          </>
        )}
      </Suspense>

      {!isAdminPath && (
        <Suspense fallback={null}>
          <FloatingBookCall />
        </Suspense>
      )}
    </>
  )
}
