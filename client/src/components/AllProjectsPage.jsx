import { useFetch } from '../hooks/useFetch'
import { AllProjectCard } from './Projects'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'

export default function AllProjectsPage() {
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
      id: 6, 
      title: 'Krishna Vasudevaya Elevators', 
      developer: 'Anmol Chaudhary',
      description: 'Corporate showcase for a leading elevator manufacturing company, focusing on high-performance vertical transportation solutions.', 
      tags: ['React', 'Three.js', 'Framer Motion'], 
      live_url: 'https://cozy-daifuku-62c431.netlify.app',
      image_url: '/assets/elevator-thumb.webp',
      gradient: 'linear-gradient(135deg,#f7971e,#ffd200)'
    }
  ]

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: 'calc(100vh - 100px)' }}>
        <section className="section projects-section" style={{ padding: '0 5%' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Breadcrumbs />
            <span className="section-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Complete Portfolio</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h1 className="section-title" style={{ marginBottom: 0, fontSize: '3rem' }}>
                All Selected <br /><em>Works</em>
              </h1>
              <a href="/#projects" className="btn btn-ghost" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', marginTop: '1rem' }}>
                &larr; Back to Home
              </a>
            </div>

            {loading && <div className="loader" style={{ textAlign: 'center', padding: '50px' }}>Loading projects...</div>}
            
            <div className="all-projects-grid all-projects-grid--open" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {displayProjects.map(project => (
                <AllProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {!loading && displayProjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '50px', color: 'var(--muted)' }}>
                No projects found.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
