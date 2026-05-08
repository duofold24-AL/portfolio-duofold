import React from 'react'

const Breadcrumbs = () => {
  const pathname = window.location.pathname
  const pathnames = pathname.split('/').filter((x) => x)

  if (pathname === '/' || pathname === '/admin') return null

  return (
    <nav aria-label="breadcrumb" style={{ 
      padding: '1.5rem 0', 
      marginBottom: '1rem',
      position: 'relative',
      zIndex: 10
    }}>
      <ol style={{ 
        display: 'flex', 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        gap: '0.8rem',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontWeight: 700
      }}>
        <li>
          <a href="/" style={{ 
            color: 'var(--muted)', 
            textDecoration: 'none',
            transition: 'color 0.2s'
          }} onMouseOver={e => e.target.style.color = 'var(--accent)'} 
             onMouseOut={e => e.target.style.color = 'var(--muted)'}>
            Home
          </a>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          
          // Capitalize each word and replace hyphens
          const label = value.replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return (
            <li key={to} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: 'var(--border)' }}>/</span>
              {last ? (
                <span style={{ color: 'var(--accent)' }}>
                  {label}
                </span>
              ) : (
                <a href={to} style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }} onMouseOver={e => e.target.style.color = 'var(--accent)'} 
                   onMouseOut={e => e.target.style.color = 'var(--muted)'}>
                  {label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
