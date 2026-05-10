import { useState } from 'react'
import LiquidButton from './LiquidButton'
import { useFetch } from '../hooks/useFetch'
import AnimatedCtaButton from './AnimatedCtaButton'

function ProjectCard({ project, index }) {
  return (
    <li 
      className="projects-stack-item glass-container" 
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
      gradient: 'linear-gradient(135deg,#800020,#ff7aa2)'
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
          <AnimatedCtaButton href="/projects" text="View all projects ↗" />
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
