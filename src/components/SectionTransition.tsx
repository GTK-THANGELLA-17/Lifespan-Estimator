
import React from 'react';
import { motion } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const SectionTransition = ({ 
  children, 
  isActive,
  direction = 'left' 
}: SectionTransitionProps) => {
  // Define direction-based transitions
  const getVariants = () => {
    switch(direction) {
      case 'right':
        return {
          initial: { x: -20, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 20, opacity: 0 }
        };
      case 'left':
        return {
          initial: { x: 20, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -20, opacity: 0 }
        };
      case 'up':
        return {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -20, opacity: 0 }
        };
      case 'down':
        return {
          initial: { y: -20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 20, opacity: 0 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };
  
  const variants = getVariants();
  
  if (!isActive) return null;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.4
      }}
    >
      {children}
    </motion.div>
  );
};
