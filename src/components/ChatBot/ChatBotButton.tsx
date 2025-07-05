
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatBotButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatBotButton({ onClick, isOpen, onClose }: ChatBotButtonProps) {
  const handleClick = () => {
    if (isOpen && onClose) {
      onClose();
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
    >
      <motion.div
        animate={{ 
          y: isOpen ? 0 : [0, -8, 0],
          rotate: isOpen ? 0 : [0, 3, -3, 0],
          scale: isOpen ? 1 : [1, 1.05, 1]
        }}
        transition={{ 
          duration: isOpen ? 0.3 : 3,
          repeat: isOpen ? 0 : Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Button
          onClick={handleClick}
          size="lg"
          className={`w-16 h-16 rounded-full transition-all duration-500 relative overflow-hidden group ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 shadow-lg' 
              : 'ice-blue-gradient hover:shadow-2xl'
          }`}
        >
          {!isOpen && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
            />
          )}
          
          {isOpen ? (
            <X className="h-8 w-8 relative z-10 text-white" />
          ) : (
            <>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MessageCircle className="h-8 w-8 relative z-10 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 360, 720]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-3 w-3 text-white" />
              </motion.div>
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
