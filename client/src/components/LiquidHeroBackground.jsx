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
            appRef.current.loadImage('/assets/thic-bg.png');
            appRef.current.liquidPlane.material.metalness = 0.15; // Much lower to reduce glare
            appRef.current.liquidPlane.material.roughness = 0.6; // Higher to diffuse light
            if (appRef.current.liquidPlane.material.uniforms.uFrequency) {
                appRef.current.liquidPlane.material.uniforms.uFrequency.value = 8.0; // Softer waves
            }
            if (appRef.current.liquidPlane.material.uniforms.displacementScale) {
                appRef.current.liquidPlane.material.uniforms.displacementScale.value = 3.0; 
            }
            appRef.current.setRain(false);

            // Handle Dynamic Intensity on idle
            let idleTimeout;
            const handleMovement = () => {
              if (appRef.current && appRef.current.liquidPlane.material.uniforms.displacementScale) {
                appRef.current.liquidPlane.material.uniforms.displacementScale.value = 5.5; 
                
                // Keep metalness low to avoid return of the "white glare"
                appRef.current.liquidPlane.material.metalness = 0.15; 
                appRef.current.liquidPlane.material.roughness = 0.5;

                clearTimeout(idleTimeout);
                idleTimeout = setTimeout(() => {
                  if (appRef.current && appRef.current.liquidPlane.material.uniforms.displacementScale) {
                    appRef.current.liquidPlane.material.uniforms.displacementScale.value = 0.4; 
                  }
                }, 3000);
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
    <canvas 
      id="canvas-liquid-bg" 
      ref={canvasRef} 
      className="liquid-background-canvas"
    />
  );
}
