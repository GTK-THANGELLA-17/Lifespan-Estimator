
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { Menu, User, Heart, Dumbbell, Timer, Utensils, Calculator, Brain, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileSectionNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function MobileSectionNav({ activeSection, setActiveSection }: MobileSectionNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setShowMobileNav(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!showMobileNav) return null;
  
  const sections = [
    { id: "personal", label: "Personal", icon: <User className="h-5 w-5 text-violet-500" /> },
    { id: "health", label: "Health", icon: <Heart className="h-5 w-5 text-rose-500" /> },
    { id: "lifestyle", label: "Lifestyle", icon: <Dumbbell className="h-5 w-5 text-amber-500" /> },
    { id: "activity", label: "Activity", icon: <Timer className="h-5 w-5 text-emerald-500" /> },
    { id: "diet", label: "Diet", icon: <Utensils className="h-5 w-5 text-cyan-500" /> },
    { id: "mental", label: "Mental", icon: <Brain className="h-5 w-5 text-indigo-500" /> },
    { id: "environment", label: "Environment", icon: <Sun className="h-5 w-5 text-amber-400" /> },
    { id: "sleep", label: "Sleep", icon: <Moon className="h-5 w-5 text-blue-400" /> },
    { id: "calculate", label: "Calculate", icon: <Calculator className="h-5 w-5 text-blue-500" /> }
  ];
  
  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };
  
  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                size="icon" 
                className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="pb-10 rounded-t-xl max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-1 pt-4">
                <h3 className="text-lg font-medium text-center mb-4">Navigation</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sections.map((section) => (
                    <SheetClose asChild key={section.id}>
                      <Button
                        variant={activeSection === section.id ? "default" : "outline"}
                        className={`flex-col justify-center h-20 ${
                          activeSection === section.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/10"
                        }`}
                        onClick={() => handleSelectSection(section.id)}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="mb-2">{section.icon}</span>
                          <span className="text-xs">{section.label}</span>
                        </div>
                        {activeSection === section.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-2 h-1 w-8 rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
