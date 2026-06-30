'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  hue: number;
  size: number;
}

export default function RainbowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const pointsRef = useRef<Point[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const globalHue = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      lastMousePos.current = { x, y };

      // Calculate speed/distance to spawn multiple points when moving fast
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const pointsToSpawn = Math.max(1, Math.min(5, Math.floor(speed / 4)));

      for (let i = 0; i < pointsToSpawn; i++) {
        // Shift hue along the trail for the rainbow effect
        globalHue.current = (globalHue.current + 0.8) % 360;

        pointsRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          age: 0,
          maxAge: 35 + Math.random() * 25,
          hue: globalHue.current,
          size: 28 + Math.random() * 22,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Draw trails
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Physics: update position & friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.age++;

        const lifeRatio = 1 - p.age / p.maxAge;
        if (lifeRatio <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }

        const size = p.size * lifeRatio;

        // Oil spill colors: shifting iridescence
        // We use hsla where hue is mapped along the path and saturation/lightness are high
        const color = `hsla(${p.hue}, 95%, 60%, ${lifeRatio * 0.7})`;

        // Glow gradient around each fluid bubble
        const grad = ctx.createRadialGradient(p.x, p.y, size * 0.1, p.x, p.y, size);
        grad.addColorStop(0, color);
        grad.addColorStop(0.4, `hsla(${(p.hue + 45) % 360}, 90%, 55%, ${lifeRatio * 0.45})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw a tight bright center core at current mouse pos for responsiveness
      if (lastMousePos.current.x > 0 && lastMousePos.current.y > 0) {
        const coreHue = (globalHue.current + 180) % 360;
        const coreGrad = ctx.createRadialGradient(
          lastMousePos.current.x,
          lastMousePos.current.y,
          1,
          lastMousePos.current.x,
          lastMousePos.current.y,
          10
        );
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.3, `hsla(${globalHue.current}, 100%, 70%, 0.9)`);
        coreGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(lastMousePos.current.x, lastMousePos.current.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* SVG liquid goo filter def */}
      <svg className="absolute w-0 h-0 hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-goo-trail">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-screen"
        style={{
          filter: 'url(#liquid-goo-trail)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
