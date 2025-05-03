
import { useEffect, useState } from "react";
import { Sparkles, Brain, Heart, Activity, Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function EnhancedLoadingSpinner() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Loading steps with different icons and messages
  const loadingSteps = [
    {
      icon: <Brain className="text-primary" />,
      message: "Initializing health analysis..."
    },
    {
      icon: <Heart className="text-primary" />,
      message: "Processing health factors..."
    },
    {
      icon: <Activity className="text-primary" />,
      message: "Analyzing lifestyle data..."
    },
    {
      icon: <Dumbbell className="text-primary" />,
      message: "Calculating predictions..."
    },
    {
      icon: <Sparkles className="text-primary" />,
      message: "Finalizing results..."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    // Progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        // Accelerate progress near the end
        const increment = prev > 80 ? 3 : 1;
        const newProgress = Math.min(prev + increment, 100);
        return newProgress;
      });
    }, 30);

    // Step change animation
    interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev < loadingSteps.length - 1 ? prev + 1 : prev;
        return next;
      });
    }, 800);

    // Auto hide after set time
    const hideTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500); // Wait for fade out animation
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          Lifespan Estimator
        </h1>
        
        <div className="relative mb-10">
          <Progress value={progress} className="h-2 w-full bg-primary/20" />
          <span className="text-sm text-muted-foreground mt-2 block text-right">{progress}%</span>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Rings animation */}
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full animate-ping opacity-30"></div>
            <div className="absolute inset-0 border-4 border-t-primary border-r-primary/50 border-b-primary/20 border-l-transparent rounded-full animate-spin"></div>
            
            <div className="relative transition-all duration-300 transform scale-110 animate-pulse">
              {loadingSteps[currentStep].icon}
            </div>
          </div>
          
          <p className="text-lg text-center font-medium">
            {loadingSteps[currentStep].message}
          </p>
          
          <div className="flex space-x-3 mt-2">
            {loadingSteps.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-primary scale-125' : 'bg-primary/30'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
