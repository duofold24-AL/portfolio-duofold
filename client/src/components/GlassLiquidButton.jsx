import React from 'react';

export default function GlassLiquidButton({ text, svgPath, viewBoxSize = 24, onClick, href, className = '' }) {
  const content = (
    <>
      <div className="button-liquid-filter" />
      <div className="button-liquid-overlay" />
      <div className="button-liquid-specular" />
      <div className="button-liquid-content">
        {svgPath && (
          <svg 
            width="20" 
            height="20" 
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} 
            fill="currentColor"
            style={{ display: 'block' }}
          >
            <path d={svgPath} />
          </svg>
        )}
        <span>{text}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`glass-liquid-button ${className}`} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={`glass-liquid-button ${className}`} onClick={onClick}>
      {content}
    </button>
  );
}
