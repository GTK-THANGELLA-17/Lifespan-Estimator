
import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  darkMode: boolean;
}

export function AnimatedBackground({ darkMode }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once and add event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave parameters
    const waves = [
      {
        amplitude: 25,
        period: 0.04,
        offsetY: canvas.height * 0.2,
        speed: 0.015,
        color: darkMode ? 'rgba(214, 230, 242, 0.07)' : 'rgba(166, 198, 216, 0.15)', // Ice blue with low opacity
        points: [],
        phase: 0,
      },
      {
        amplitude: 20,
        period: 0.03,
        offsetY: canvas.height * 0.35,
        speed: 0.02,
        color: darkMode ? 'rgba(214, 230, 242, 0.05)' : 'rgba(209, 242, 235, 0.1)', // Mint whisper with low opacity
        points: [],
        phase: 1,
      },
      {
        amplitude: 15,
        period: 0.05,
        offsetY: canvas.height * 0.5,
        speed: 0.01,
        color: darkMode ? 'rgba(214, 230, 242, 0.03)' : 'rgba(255, 255, 240, 0.08)', // Ivory with low opacity
        points: [],
        phase: 2,
      },
    ];

    // Particles for the glowing effect
    const particles = Array(darkMode ? 50 : 30).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
    }));

    // Lights for dark mode (only active in dark mode)
    const lights = darkMode ? [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.1,
        radius: 150,
        color: 'rgba(214, 230, 242, 0.08)', // Ice blue light
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        radius: 200,
        color: 'rgba(209, 242, 235, 0.06)', // Mint whisper light
      },
    ] : [];

    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw lights in dark mode
      if (darkMode) {
        for (const light of lights) {
          const gradient = ctx.createRadialGradient(
            light.x, light.y, 0,
            light.x, light.y, light.radius
          );
          gradient.addColorStop(0, light.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw waves
      for (const wave of waves) {
        wave.phase += wave.speed;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = wave.offsetY + Math.sin(x * wave.period + wave.phase) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = wave.color;
        ctx.fill();
      }
      
      // Draw glowing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = darkMode 
          ? `rgba(214, 230, 242, ${p.opacity})` 
          : `rgba(166, 198, 216, ${p.opacity})`;
        ctx.fill();
        
        // Move particles
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Occasionally change direction
        if (Math.random() < 0.01) {
          p.direction += (Math.random() - 0.5) * Math.PI / 2;
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
    />
  );
}
