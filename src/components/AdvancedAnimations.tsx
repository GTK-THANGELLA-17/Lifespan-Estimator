
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
}

export const FadeInWhenVisible = ({ children, delay = 0 }: FadeInWhenVisibleProps) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, isVisible]);

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = ""
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

interface PulsingAnimationProps {
  children: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
  duration?: number;
}

export const PulsingAnimation = ({
  children,
  intensity = "subtle",
  duration = 2
}: PulsingAnimationProps) => {
  const scale = intensity === "subtle" ? 1.03 : intensity === "medium" ? 1.05 : 1.08;
  
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
        opacity: [1, 0.9, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  offset?: number;
  duration?: number;
}

export const FloatingElement = ({
  children,
  offset = 5,
  duration = 4
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [`-${offset}px`, `${offset}px`, `-${offset}px`]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter = ({
  target,
  duration = 2,
  precision = 0,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * target;
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [target, duration]);
  
  return (
    <span>
      {prefix}
      {count.toFixed(precision)}
      {suffix}
    </span>
  );
};

interface AnimatedGradientProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedGradient = ({ children, className = "" }: AnimatedGradientProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ 
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 15, 
        ease: "linear" 
      }}
      style={{
        background: "linear-gradient(90deg, rgba(94,84,243,0.15) 0%, rgba(74,222,128,0.15) 50%, rgba(94,84,243,0.15) 100%)",
        backgroundSize: "200% 100%"
      }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};
