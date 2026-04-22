import React from 'react'

export default function AllProjects() {
  const allProjectsList = [
    { 
      id: 1, 
      title: 'EdZure Legal', 
      description: 'Comprehensive legal services platform featuring secure client onboarding, case management, and seamless integrations.', 
      tags: ['React', 'Firebase', 'Tailwind'], 
      live_url: 'https://edzurelegal.com',
      image_url: '/assets/edzure_legal.png'
    },
    { 
      id: 2, 
      title: 'RSA Crane Service', 
      description: 'Corporate website for a heavy-machinery and crane service provider featuring dynamic service catalogs.', 
      tags: ['React', 'Node.js', 'PostgreSQL'], 
      live_url: 'https://rsacraneservice.com',
      image_url: '/assets/rsa_crane.png'
    },
    { 
      id: 3, 
      title: '3D Product Visualizer', 
      description: 'Interactive WebGL product configurator with real-time material and lighting control.', 
      tags: ['Three.js', 'GLSL', 'WebGL'], 
      live_url: '#',
      image_url: '/assets/3d_visualizer.png'
    },
    { 
      id: 4, 
      title: 'AI Analytics Dashboard', 
      description: 'Real-time analytics powered by machine learning with animated visualisations.', 
      tags: ['Next.js', 'Python', 'D3.js'], 
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 5, 
      title: 'Neural Canvas', 
      description: 'Generative art platform using stable diffusion for unique digital assets.', 
      tags: ['React', 'Python', 'AI'], 
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 6, 
      title: 'Commercial Production', 
      developer: 'Harshit Khatana',
      description: 'Full-service video production for commercial advertisements, from storyboarding to final post-production.', 
      tags: ['Videography', 'Creative Direction', 'Blender'], 
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop'
    }
  ]

  return (
    <div className="all-projects-page">
      <section className="section">
        <div className="section-inner" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <a href="#hero" className="btn btn-ghost" style={{ padding: '0.5rem', width: 'auto', height: 'auto', marginRight: '1rem', borderRadius: '50%' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </a>
            <h1 className="section-title" style={{ marginBottom: 0 }}>All Projects</h1>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {allProjectsList.map(project => (
              <div key={project.id} className="glass-container-sharp-corner" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.4rem', marginBottom: '1.5rem' }} 
                />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--white)' }}>{project.title}</h3>
                <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>By {project.developer || 'Team ALH'}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>{project.description}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.5rem 0' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="skill-chip" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>{tag}</span>
                  ))}
                </div>
                
                {project.live_url && project.live_url !== '#' && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem', width: '100%', height: 'auto', fontSize: '0.9rem' }}>
                    View Live Project ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
