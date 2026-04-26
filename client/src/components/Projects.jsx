import { useState } from 'react'
import LiquidButton from './LiquidButton'
import { useFetch } from '../hooks/useFetch'

function ProjectCard({ project, index }) {
  return (
    <li 
      className="projects-stack-item" 
      style={{ '--i': index + 1 }}
    >
      <img 
        src={project.image_url || `https://picsum.photos/seed/${project.id}/600/400`} 
        alt={project.title} 
        loading="lazy"
      />
      <div className="content">
        <div className="content-text">
          <h3>{project.title}</h3>
          <p className="developer-tag">By {project.developer}</p>
          <p>{project.description}</p>
        </div>
        <div className="content-links">
          {project.live_url && (
            <div style={{ pointerEvents: 'auto' }}>
              <LiquidButton text="Live" href={project.live_url} width={80} height={35} />
            </div>
          )}
          {project.github_url && (
            <div style={{ pointerEvents: 'auto' }}>
              <LiquidButton text="Repo" href={project.github_url} width={80} height={35} />
            </div>
          )}
          <div style={{ pointerEvents: 'auto' }}>
            <a
              href={project.github_url || "https://github.com/Trifold-HALO/portfolio"}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '600',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.2s ease',
                background: 'rgba(255,255,255,0.03)',
                height: '35px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Star
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export function AllProjectCard({ project }) {
  return (
    <div className="glass-container-sharp-corner all-project-card">
      <img 
        src={project.image_url || `https://picsum.photos/seed/${project.id}/400/300`} 
        alt={project.title} 
        className="all-project-card-img"
        loading="lazy"
      />
      <h3 className="all-project-card-title">{project.title}</h3>
      <p className="developer-tag-small">By {project.developer}</p>
      <p className="all-project-card-desc">{project.description}</p>
      <div className="all-project-card-tags">
        {project.tags.map(tag => (
          <span key={tag} className="skill-chip" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        {project.live_url && (
          <a 
            href={project.live_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary all-project-card-btn"
            style={{ flex: 1, textAlign: 'center' }}
          >
            View Live ↗
          </a>
        )}
        <a
          href={project.github_url || "https://github.com/duofold24-AL/portfolio-duofold"}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: 'var(--text)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600',
            padding: '0 15px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.2s ease',
            background: 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            flex: project.live_url ? 'none' : '1'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          Star
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const { data: projects, loading, error } = useFetch('/api/projects')

  // Use API data if available, otherwise fallback for demo
  const displayProjects = (projects && projects.length > 0) ? projects : [
    { 
      id: 1, 
      title: 'EDZURE LEGAL LLP', 
      developer: 'Anmol Chaudhary',
      description: 'A prestige Delhi-based law firm specializing in 14 wide-ranging practice areas, featuring premium client management and high-end legal digital solutions.', 
      tags: ['React', 'Firebase', 'Tailwind'], 
      live_url: 'https://edzurelegal.com',
      image_url: '/assets/edzure-legal-thumb.webp',
      gradient: 'linear-gradient(135deg,#fb4268,#ff7aa2)'
    },
    { 
      id: 2, 
      title: 'RSA Crane Service', 
      developer: 'Loveneesh',
      description: 'Corporate website for a heavy-machinery and crane service provider featuring dynamic service catalogs.', 
      tags: ['React', 'Node.js', 'PostgreSQL'], 
      live_url: 'https://rsacraneservice.com',
      image_url: '/assets/rsa_crane.webp',
      gradient: 'linear-gradient(135deg,#6a11cb,#2575fc)'
    },
    { 
      id: 3, 
      title: 'Cinematic Brand Film', 
      developer: 'Harshit Khatana',
      description: 'A high-impact cinematic brand story produced for a luxury lifestyle brand, featuring advanced color grading and precision editing.', 
      tags: ['Videography', 'Premiere Pro', 'After Effects'], 
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
      gradient: 'linear-gradient(135deg,#f7971e,#ffd200)'
    },
    { 
      id: 6, 
      title: 'Krishna Vasudevaya Elevators', 
      developer: 'Anmol Chaudhary',
      description: 'Corporate showcase for a leading elevator manufacturing company, focusing on high-performance vertical transportation solutions.', 
      tags: ['React', 'Three.js', 'Framer Motion'], 
      live_url: 'https://cozy-daifuku-62c431.netlify.app',
      image_url: '/assets/elevator-thumb.webp',
      gradient: 'linear-gradient(135deg,#8e2de2,#4a00e0)'
    }
  ]

  const featured = displayProjects.slice(0, 3)

  return (
    <section className="section projects-section" id="projects">
      <div className="section-inner" style={{ perspective: '1000px' }}>
        <span className="section-tag">Selected Work</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Projects that<br /><em>speak for themselves</em>
          </h2>
          <a 
            href="/projects" 
            className="btn btn-ghost" 
            style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem', height: 'auto', width: 'auto', textDecoration: 'none' }}
          >
            View all projects ↗
          </a>
        </div>

        {loading && <div className="loader">Loading projects...</div>}

        {/* Featured stack — always visible */}
        <ul className="projects-stack">
          {featured.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </ul>

      </div>
    </section>
  )
}
