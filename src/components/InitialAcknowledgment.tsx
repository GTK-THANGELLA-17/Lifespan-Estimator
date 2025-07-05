
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface InitialAcknowledgmentProps {
  acknowledged: boolean;
  handleAcknowledgmentChange: (checked: boolean) => void;
}

export function InitialAcknowledgment({ 
  acknowledged, 
  handleAcknowledgmentChange 
}: InitialAcknowledgmentProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 border-l-4 border-l-amber-500 overflow-hidden relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
        <motion.div 
          className="absolute -right-16 -top-16 w-32 h-32 bg-amber-200 dark:bg-amber-900/20 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2 right-2"
        >
          <AlertCircle className="h-6 w-6 text-amber-500" />
        </motion.div>
        <CardContent className="pt-6 relative z-10">
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 10 }}
                animate={{ 
                  boxShadow: [
                    "0 0 10px rgba(245, 158, 11, 0.3)",
                    "0 0 20px rgba(245, 158, 11, 0.6)",
                    "0 0 10px rgba(245, 158, 11, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full"
              >
                <Shield className="h-5 w-5 text-amber-500" />
              </motion.div>
            </div>
            <div className="space-y-3 flex-grow">
              <motion.h3 
                className="text-lg font-semibold"
                animate={{ 
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Acknowledge Here
              </motion.h3>
              
              <motion.div 
                className={`space-y-2 text-sm overflow-hidden`}
                animate={{ height: expanded ? "auto" : "4.5rem" }}
                transition={{ duration: 0.3 }}
              >
                <p>
                  This lifespan estimator uses statistical models based on population-level data to provide a general estimation of life expectancy. It is not intended to be a precise prediction of any individual's actual lifespan.
                </p>
                <p>
                  Many factors that influence lifespan may not be captured by this calculator, including advances in medical technology, changes in lifestyle over time, unforeseen health conditions, accidents, and other unpredictable events.
                </p>
                <p>
                  The results should not be interpreted as medical advice or a substitute for consultation with healthcare professionals. This tool is designed for educational purposes only.
                </p>
                <p>
                  By checking the box below, you understand and acknowledge these limitations and agree to use this information responsibly as a general reference only.
                </p>
              </motion.div>
              
              {!expanded && (
                <motion.button 
                  className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium flex items-center gap-1"
                  onClick={() => setExpanded(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read more
                  <motion.span 
                    animate={{ x: [0, 3, 0] }} 
                    transition={{ duration: 1, repeat: Infinity }}
                  >→</motion.span>
                </motion.button>
              )}
              
              <div className="flex items-center space-x-2 mt-4">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -2, 0],
                    boxShadow: [
                      "0 0 0 0 rgba(245, 158, 11, 0)",
                      "0 0 0 4px rgba(245, 158, 11, 0.3)",
                      "0 0 0 0 rgba(245, 158, 11, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="rounded"
                >
                  <Checkbox 
                    id="acknowledgment" 
                    checked={acknowledged} 
                    onCheckedChange={handleAcknowledgmentChange} 
                    className="border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-amber-foreground transition-all duration-200"
                  />
                </motion.div>
                <Label 
                  htmlFor="acknowledgment" 
                  className="text-sm font-medium cursor-pointer"
                >
                  I understand and acknowledge the limitations of this estimation tool
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
