import React, { useEffect, useRef } from 'react';

class LiquidButtonLogic {
  constructor(optionsParam) {
    const options = optionsParam || {};
    this.tension = options.tension || 0.4;
    this.width   = options.width   || 200;
    this.height  = options.height  || 50;
    this.margin  = options.margin  || 50;
    this.padding = Math.min(options.padding || 17, this.height / 2 - 5);
    this.hoverFactor = options.hoverFactor || -0.1;
    this.gap     = options.gap     || 5;
    this.debug   = options.debug   || false;
    this.forceFactor = options.forceFactor || 0.2;
    this.color1 = options.color1 || '#36DFE7';
    this.color2 = options.color2 || '#8F17E1';
    this.color3 = options.color3 || '#E509E6';
    this.textColor = options.textColor || '#FFFFFF';
    this.text    = options.text    || '▶';
    this.svgPath = options.svgPath || null;
    this.viewBoxSize = options.viewBoxSize || 24;

    this.layers = [{
      points: [],
      viscosity: 0.5,
      mouseForce: 100,
      forceLimit: 2,
    },{
      points: [],
      viscosity: 0.8,
      mouseForce: 150,
      forceLimit: 3,
    }];
    
    this.canvas  = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.touches = [];
    this.noise = options.noise || 0;
    
    this.mousemove = this.mousemove.bind(this);
    this.mouseout = this.mouseout.bind(this);
    
    this.canvas.addEventListener('mousemove', this.mousemove);
    this.canvas.addEventListener('mouseout', this.mouseout);
    
    this.initOrigins();
    this.running = true;
    this.animate();
  }

  mousemove(e) {
    this.touches = [{
      x: e.offsetX,
      y: e.offsetY,
      z: 0,
      force: 1,
    }];
  }

  mouseout(e) {
    this.touches = [];
  }

  get raf() {
    return this.__raf || (this.__raf = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){ setTimeout(callback, 10)}
    ).bind(window));
  }

  distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  update() {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = layer.points;
      for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
        const point = points[pointIndex];
        const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
        const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = d * this.forceFactor;
        point.vx += f * ((dx / d) || 0);
        point.vy += f * ((dy / d) || 0);
        for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
          const touch = this.touches[touchIndex];
          let mouseForce = layer.mouseForce;
          if (
            touch.x > this.margin &&
            touch.x < this.margin + this.width &&
            touch.y > this.margin &&
            touch.y < this.margin + this.height
          ) {
            mouseForce *= -this.hoverFactor;
          }
          const mx = point.x - touch.x;
          const my = point.y - touch.y;
          const md = Math.sqrt(mx * mx + my * my);
          const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
          point.vx += mf * ((mx / md) || 0);
          point.vy += mf * ((my / md) || 0);
        }
        point.vx *= layer.viscosity;
        point.vy *= layer.viscosity;
        point.x += point.vx;
        point.y += point.vy;
      }
      for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
        const prev = points[(pointIndex + points.length - 1) % points.length]; 
        const point = points[pointIndex];
        const next = points[(pointIndex + points.length + 1) % points.length];
        const dPrev = this.distance(point, prev);
        const dNext = this.distance(point, next);

        const line = {
          x: next.x - prev.x,
          y: next.y - prev.y,
        };
        const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

        point.cPrev = {
          x: point.x - (line.x / dLine) * dPrev * this.tension,
          y: point.y - (line.y / dLine) * dPrev * this.tension,
        };
        point.cNext = {
          x: point.x + (line.x / dLine) * dNext * this.tension,
          y: point.y + (line.y / dLine) * dNext * this.tension,
        };
      }
    }
  }

  animate() {
    if (!this.running) return;
    this.raf(() => {
      this.update();
      this.draw();
      this.animate();
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      if (layerIndex === 1) {
        if (this.touches.length > 0) {
          const gx = this.touches[0].x;
          const gy = this.touches[0].y;
          layer.color = this.context.createRadialGradient(gx, gy, this.height * 2, gx, gy, 0);
          layer.color.addColorStop(0, this.color2);
          layer.color.addColorStop(1, this.color3);
        } else {
          layer.color = this.color2;
        }
      } else {
        layer.color = this.color1;
      }
      const points = layer.points;
      this.context.fillStyle = layer.color;
      
      this.context.beginPath();
      this.context.moveTo(points[0].x, points[0].y);
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        this.context.bezierCurveTo(
          points[(pointIndex + 0) % points.length].cNext.x,
          points[(pointIndex + 0) % points.length].cNext.y,
          points[(pointIndex + 1) % points.length].cPrev.x,
          points[(pointIndex + 1) % points.length].cPrev.y,
          points[(pointIndex + 1) % points.length].x,
          points[(pointIndex + 1) % points.length].y
        );
      }
      this.context.fill();
    }
    
    this.context.fillStyle = this.textColor;
    const fontSize = Math.max(14, this.height - this.padding * 2);
    this.context.font = '500 ' + fontSize + 'px sans-serif'; 
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle'; 

    let textX = this.canvas.width / 2;
    
    if (this.svgPath) {
      const iconSize = fontSize * 1.1;
      const spacing = 8;
      this.context.save();
      const textMetrics = this.context.measureText(this.text);
      const totalWidth = iconSize + spacing + textMetrics.width;
      const startX = (this.canvas.width - totalWidth) / 2;
      
      const path = new Path2D(this.svgPath);
      this.context.translate(startX, (this.canvas.height - iconSize) / 2);
      const scale = iconSize / this.viewBoxSize; 
      this.context.scale(scale, scale);
      this.context.fill(path);
      this.context.restore();
      
      textX = startX + iconSize + spacing + textMetrics.width / 2;
    }

    this.context.fillText(this.text, textX, this.canvas.height / 2, this.width - this.padding * 2);
  }

  createPoint(x, y) {
    return {
      x: x,
      y: y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
    };
  }

  initOrigins() {
    this.canvas.width = this.width + this.margin * 2;
    this.canvas.height = this.height + this.margin * 2;
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = [];
      for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin
        ));
      }
      for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin + this.height
        ));
      }
      for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          (this.height - Math.sin(angle) * this.height / 2) + this.margin - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      layer.points = points;
    }
  }

  destroy() {
    this.running = false;
    this.canvas.removeEventListener('mousemove', this.mousemove);
    this.canvas.removeEventListener('mouseout', this.mouseout);
  }
}

export default function LiquidButton({ 
  text = 'Button', 
  svgPath,
  viewBoxSize = 24,
  onClick, 
  href, 
  width = 200, 
  height = 50,
  color1 = 'rgba(255, 255, 255, 0.05)', 
  color2 = 'rgba(255, 255, 255, 0.15)', 
  color3 = 'rgba(255, 255, 255, 0.4)',  
  textColor = '#FFFFFF',
  className = ''
}) {
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize animation engine
    buttonRef.current = new LiquidButtonLogic({
      canvas: canvasRef.current,
      text: text,
      svgPath: svgPath,
      viewBoxSize: viewBoxSize,
      width: width,
      height: height,
      color1: color1,
      color2: color2,
      color3: color3,
      textColor: textColor,
      margin: 30,
    });

    return () => {
      if (buttonRef.current) {
        buttonRef.current.destroy();
      }
    };
  }, [text, svgPath, viewBoxSize, width, height, color1, color2, color3, textColor]);

  // Adjust container style to match actual functional area (ignoring margin bleed)
  const style = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width + 'px',
    height: height + 'px',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    textDecoration: 'none',
    padding: 0
  };

  const canvasStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'auto', // Accept mouse input for physics
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  if (href) {
    return (
      <a href={href} className={className} style={style} onClick={handleClick}>
        <canvas ref={canvasRef} style={canvasStyle} />
      </a>
    );
  }

  return (
    <button className={className} style={style} onClick={handleClick}>
      <canvas ref={canvasRef} style={canvasStyle} />
    </button>
  );
}
