import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const setMode = (isDark) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    // Initial sync with localStorage
    setMode(localStorage.getItem('theme') !== 'light');
  }, []);

  return (
    <div 
      className="simple-theme-toggle" 
      onClick={() => setMode(!isDarkMode)}
      style={{
        width: '64px',
        height: '34px',
        borderRadius: '34px',
        background: isDarkMode ? 'var(--surface)' : 'var(--border)',
        border: '1px solid var(--border)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '0',
        boxSizing: 'border-box'
      }}
      aria-label="Toggle Dark/Light Mode"
    >
      <div 
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: isDarkMode ? '#fff' : '#000',
          position: 'absolute',
          top: '3px',
          left: isDarkMode ? '3px' : 'calc(100% - 29px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </div>
    </div>
  );
}
