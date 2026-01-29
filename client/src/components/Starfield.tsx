/*
 * DESIGN: Celestial Observatory Dashboard
 * 3-layer parallax starfield background
 * - Layer 1: Distant small stars (slow movement)
 * - Layer 2: Medium stars (medium movement)
 * - Layer 3: Close bright stars (faster movement)
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[][]>([[], [], []]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const layers = [
        { count: 100, sizeRange: [0.5, 1], opacityRange: [0.1, 0.3], speed: 0.1 },
        { count: 60, sizeRange: [1, 1.5], opacityRange: [0.15, 0.4], speed: 0.2 },
        { count: 30, sizeRange: [1.5, 2.5], opacityRange: [0.2, 0.5], speed: 0.3 },
      ];

      starsRef.current = layers.map((layer) =>
        Array.from({ length: layer.count }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
          opacity: layer.opacityRange[0] + Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]),
          speed: layer.speed * (0.8 + Math.random() * 0.4),
        }))
      );
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((layer) => {
        layer.forEach((star) => {
          // Slow vertical drift
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }

          // Draw star with glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          
          // Soft lilac/white color
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          );
          gradient.addColorStop(0, `rgba(230, 199, 242, ${star.opacity})`);
          gradient.addColorStop(1, `rgba(230, 199, 242, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 237, 247, ${star.opacity * 1.5})`;
          ctx.fill();
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
