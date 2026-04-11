import React, { useState, useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleRef = useRef(null);
  const toggleRefState = useRef(true);

  const setMode = (isDark) => {
    setIsDarkMode(isDark);
    toggleRefState.current = isDark;
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      if (toggleRef.current) gsap.set(toggleRef.current, { '--complete': 0 });
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      if (toggleRef.current) gsap.set(toggleRef.current, { '--complete': 100 });
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if none saved, adjust per your specs
    if (savedTheme === 'light') {
      setMode(false);
    } else {
      setMode(true);
    }

    const toggle = toggleRef.current;
    if (!toggle) return;

    const toggleState = async () => {
      toggle.dataset.pressed = true;
      toggle.dataset.active = true;
      const pressed = toggle.getAttribute('aria-pressed') === 'true';

      const isDark = toggleRefState.current;
      const newIsDark = !isDark;

      // GSAP animate
      gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(0.05, () => {
            toggle.dataset.active = false;
            toggle.dataset.pressed = false;
            setMode(newIsDark);
          });
        }
      }).to(toggle, {
        '--complete': isDark ? 100 : 0,
        duration: 0.2,
      });
    };

    let dragger;
    try {
      const proxy = document.createElement('div');
      dragger = Draggable.create(proxy, {
        allowContextMenu: true,
        handle: toggle,
        onDragStart: function() {
          const pressed = toggle.getAttribute('aria-pressed') === 'true';
          const toggleBounds = toggle.getBoundingClientRect();
          const bounds = pressed ? toggleBounds.left - this.pointerX : toggleBounds.left + toggleBounds.width - this.pointerX;
          this.dragBounds = bounds;
          toggle.dataset.active = true;
        },
        onDrag: function() {
          const pressed = toggle.getAttribute('aria-pressed') === 'true';
          const dragged = this.x - this.startX;
          const complete = gsap.utils.clamp(
            0,
            100,
            pressed
              ? gsap.utils.mapRange(this.dragBounds, 0, 0, 100, dragged)
              : gsap.utils.mapRange(0, this.dragBounds, 0, 100, dragged)
          );
          this.complete = complete;
          gsap.set(toggle, { '--complete': complete, '--delta': Math.min(Math.abs(this.deltaX), 12) });
        },
        onDragEnd: function() {
          const completeAmount = this.complete;
          const willBeDark = completeAmount < 50;
          gsap.fromTo(toggle, 
            { '--complete': completeAmount },
            {
              '--complete': willBeDark ? 0 : 100,
              duration: 0.15,
              onComplete: () => {
                gsap.delayedCall(0.05, () => {
                  toggle.dataset.active = false;
                  setMode(willBeDark);
                });
              }
            }
          );
        },
        onPress: function() {
           this.__pressTime = Date.now();
        },
        onRelease: function() {
            this.__releaseTime = Date.now();
            gsap.set(toggle, { '--delta': 0 });
            if (this.__releaseTime - this.__pressTime <= 150) {
               toggleState();
            }
        }
      });
    } catch(e) {
      console.warn("Draggable disabled:", e);
      toggle.addEventListener('click', toggleState);
    }

    return () => {
      toggle.removeEventListener('click', toggleState);
      if (dragger) dragger[0].kill();
    };
  }, []);

  return (
    <div className="theme-toggle-wrapper">
      <button 
        aria-label="toggle" 
        aria-pressed={!isDarkMode} 
        className="liquid-toggle" 
        ref={toggleRef}
      >
        <div className="knockout">
          <div className="indicator indicator--masked">
            <div className="mask"></div>
          </div>
        </div>
        <div className="indicator__liquid">
          <div className="shadow"></div>
          <div className="wrapper">
            <div className="liquids">
              <div className="liquid__shadow"></div>
              <div className="liquid__track"></div>
            </div>
          </div>
          <div className="cover"></div>
        </div>
      </button>

      {/* Required SVG Filters */}
      <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              result="blur"
              in="SourceGraphic"
              stdDeviation="13"
            ></feGaussianBlur>
            <feColorMatrix
              result="color_matrix"
              in="blur"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -10"
              type="matrix"
            ></feColorMatrix>
            <feComposite
              result="composite"
              in="color_matrix"
              operator="atop"
            ></feComposite>
          </filter>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -255 -255 -255 0 1" result="black-pixels"/>
            <feMorphology in="black-pixels" operator="dilate" radius="0.5" result="smoothed"/>
            <feComposite in="SourceGraphic" in2="smoothed" operator="out" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
