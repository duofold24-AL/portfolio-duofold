import React, { useEffect, useRef } from 'react';

export default function LiquidHeroBackground() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let idleTimeout;

    const initBackground = async () => {
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js');
        const LiquidBackground = module.default;

        if (!canvasRef.current) return;

        appRef.current = LiquidBackground(canvasRef.current);
        appRef.current.loadImage('/assets/rock-floor-bg.webp');

        const mat = appRef.current.liquidPlane.material;
        mat.metalness = 0.55;
        mat.roughness = 0.35;
        if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 0.5;
        if (mat.uniforms?.uFrequency) mat.uniforms.uFrequency.value = 12.0;
        if (mat.uniforms?.displacementScale) mat.uniforms.displacementScale.value = 3.5;

        appRef.current.setRain(true);

        // ── Smooth, self-terminating animation loop ──
        let targetDisplacement = 3.5;
        let currentDisplacement = 3.5;
        let isAnimatingDisplacement = false;

        const lerpDisplacement = () => {
          if (!appRef.current || !mat.uniforms?.displacementScale) {
            isAnimatingDisplacement = false;
            return;
          }

          // Smoothly move current towards target
          currentDisplacement += (targetDisplacement - currentDisplacement) * 0.05;
          mat.uniforms.displacementScale.value = currentDisplacement;

          // If we reached the target, stop the loop to save CPU
          if (Math.abs(targetDisplacement - currentDisplacement) < 0.01) {
            mat.uniforms.displacementScale.value = targetDisplacement;
            currentDisplacement = targetDisplacement;
            isAnimatingDisplacement = false;
          } else {
            requestAnimationFrame(lerpDisplacement);
          }
        };

        const setTargetDisplacement = (val) => {
          targetDisplacement = val;
          if (!isAnimatingDisplacement) {
            isAnimatingDisplacement = true;
            requestAnimationFrame(lerpDisplacement);
          }
        };

        // ── Mouse: bump displacement, drop after idle ──
        let isThrottled = false;
        let lastX = 0;
        let lastY = 0;

        const handleMovement = (e) => {
          lastX = e.clientX;
          lastY = e.clientY;

          if (isThrottled) return;
          isThrottled = true;

          requestAnimationFrame(() => {
            isThrottled = false;

            if (appRef.current && mat.uniforms?.displacementScale) {
              setTargetDisplacement(8.0);
              mat.metalness = 0.35;
              mat.roughness = 0.5;

              clearTimeout(idleTimeout);
              idleTimeout = setTimeout(() => {
                if (appRef.current && mat.uniforms?.displacementScale) {
                  setTargetDisplacement(3.5);
                  mat.metalness = 0.55;
                  mat.roughness = 0.35;
                }
              }, 1500);
            }

            // Forward mouse to canvas
            if (canvasRef.current) {
              canvasRef.current.dispatchEvent(
                new MouseEvent('mousemove', {
                  clientX: lastX,
                  clientY: lastY,
                  bubbles: false,
                  cancelable: true,
                })
              );
            }
          });
        };

        window.addEventListener('mousemove', handleMovement, { passive: true });

        return () => {
          clearTimeout(idleTimeout);
          window.removeEventListener('mousemove', handleMovement);
        };

      } catch (error) {
        console.error('Failed to load LiquidBackground:', error);
      }
    };

    let cleanup;
    initBackground().then(fn => { cleanup = fn; });

    return () => {
      if (cleanup) cleanup();
      if (appRef.current?.destroy) appRef.current.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -99, pointerEvents: 'none' }}>
      <canvas
        id="canvas-liquid-bg"
        ref={canvasRef}
        className="liquid-background-canvas"
      />
      <div className="liquid-bg-glare" />
    </div>
  );
}
