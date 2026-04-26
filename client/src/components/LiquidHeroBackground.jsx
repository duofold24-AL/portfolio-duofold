import React, { useEffect, useRef } from 'react';

export default function LiquidHeroBackground() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initBackground = async () => {
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js');
        const LiquidBackground = module.default;

        if (canvasRef.current) {
            appRef.current = LiquidBackground(canvasRef.current);
            appRef.current.loadImage('/assets/rock-floor-bg.webp');
            appRef.current.liquidPlane.material.metalness = 0.55;
            appRef.current.liquidPlane.material.roughness = 0.35;
            if (appRef.current.liquidPlane.material.envMapIntensity !== undefined) {
                appRef.current.liquidPlane.material.envMapIntensity = 0.5;
            }
            if (appRef.current.liquidPlane.material.uniforms.uFrequency) {
                appRef.current.liquidPlane.material.uniforms.uFrequency.value = 12.0;
            }
            if (appRef.current.liquidPlane.material.uniforms.displacementScale) {
                appRef.current.liquidPlane.material.uniforms.displacementScale.value = 3.5; 
            }
            appRef.current.setRain(false);

            // Handle Dynamic Intensity on idle
            let idleTimeout;
            const handleMovement = (e) => {
              if (appRef.current && appRef.current.liquidPlane.material.uniforms.displacementScale) {
                appRef.current.liquidPlane.material.uniforms.displacementScale.value = 18.0; 
                
                appRef.current.liquidPlane.material.metalness = 0.3; 
                appRef.current.liquidPlane.material.roughness = 0.55;

                clearTimeout(idleTimeout);
                idleTimeout = setTimeout(() => {
                  if (appRef.current && appRef.current.liquidPlane.material.uniforms.displacementScale) {
                    appRef.current.liquidPlane.material.uniforms.displacementScale.value = 2.5; 
                  }
                }, 3000);
              }

              // Forward mouse coordinates to the canvas so internal liquid1.min.js tracking works
              // even though the canvas is behind other elements (z-index: -99)
              if (canvasRef.current && e.target !== canvasRef.current) {
                const syntheticEvent = new MouseEvent('mousemove', {
                  clientX: e.clientX,
                  clientY: e.clientY,
                  bubbles: false,
                  cancelable: true
                });
                canvasRef.current.dispatchEvent(syntheticEvent);
              }
            };

            window.addEventListener('mousemove', handleMovement);
            return () => window.removeEventListener('mousemove', handleMovement);
        }
      } catch (error) {
        console.error('Failed to load LiquidBackground:', error);
      }
    };

    initBackground();

    return () => {
      // Cleanup if the library provides a destroy method, 
      // though liquid1.min.js usually doesn't expose a clear one in snippets
      if (appRef.current && appRef.current.destroy) {
        appRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -99, pointerEvents: 'none' }}>
      <canvas 
        id="canvas-liquid-bg" 
        ref={canvasRef} 
        className="liquid-background-canvas"
      />
      {/* Edge glare — transparent center, subtle glow on the perimeter */}
      <div className="liquid-bg-glare" />
    </div>
  );
}
