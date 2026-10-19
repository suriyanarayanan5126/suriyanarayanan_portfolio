import React, { useEffect, useRef } from 'react';

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      { r: 59, g: 130, b: 246 },   // electric blue
      { r: 6, g: 182, b: 212 },    // cyan
      { r: 139, g: 92, b: 246 },   // violet
      { r: 16, g: 185, b: 129 },   // emerald
    ];

    // Particle pool
    const particleCount = Math.min(width < 768 ? 30 : 65, 75);
    const particles = Array.from({ length: particleCount }).map(() => {
      const col = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.4 + 0.15,
        pulsing: Math.random() * 0.02 + 0.006,
        color: col,
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.pulsing;
        if (p.alpha > 0.65 || p.alpha < 0.15) {
          p.pulsing = -p.pulsing;
        }

        // Slight mouse gravitational drift
        const dmx = mouseX - p.x;
        const dmy = mouseY - p.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < 120 && mouseDist > 0) {
          p.x -= (dmx / mouseDist) * 0.5;
          p.y -= (dmy / mouseDist) * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Connect nearby particles with subtle multi-spectral filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.15 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  );
};
