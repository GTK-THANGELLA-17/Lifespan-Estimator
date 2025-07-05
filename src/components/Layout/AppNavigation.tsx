import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface AppNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AppNavigation({ activeSection, onSectionChange }: AppNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar only if near the top (within 100px)
      if (currentScrollY <= 100) {
        setIsVisible(true);
      } else {
        // Hide navbar if scrolled down beyond 100px
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <motion.nav
      className="fixed top-4 right-4 w-fit z-50
                 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
                 rounded-full px-6 py-3 shadow-lg border border-primary/20"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange(item.id)}
            className="flex items-center gap-2 transition-all duration-200"
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        ))}

        <div className="ml-2 pl-2 border-l border-primary/20">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
