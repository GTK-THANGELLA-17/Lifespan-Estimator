
import { useEffect, useState } from "react";
import { Heart, Activity, Stethoscope } from "lucide-react";

export function LoadingSpinner() {
  const [visible, setVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [fullText, setFullText] = useState("Preparing health analysis");
  const [dots, setDots] = useState(".");
  const [currentIcon, setCurrentIcon] = useState(0);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);

  const icons = [
    <Heart className="h-10 w-10 text-red-500 animate-pulse" key="heart" />,
    <Activity className="h-10 w-10 text-blue-500 animate-pulse" key="activity" />,
    <Stethoscope className="h-10 w-10 text-green-500 animate-pulse" key="stethoscope" />
  ];

  useEffect(() => {
    // Show app title before anything else
    setTimeout(() => setTitleVisible(true), 300);
    
    // Force hide the loading spinner after a maximum time
    const timer = setTimeout(() => {
      setVisible(false);
      console.log("Force hiding loading spinner");
    }, 2000); // Reduced from 2500ms to 2000ms

    // Animation for loading text typing effect
    const typeInterval = setInterval(() => {
      if (typewriterIndex < fullText.length) {
        setLoadingText(fullText.substring(0, typewriterIndex + 1));
        setTypewriterIndex(prev => prev + 1);
      }
    }, 40); // Faster typing

    // Animation for loading dots
    const textTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 400); // Faster dots

    // Different loading messages
    const messages = [
      "Preparing health analysis",
      "Getting everything ready",
      "Setting up lifestyle assessment"
    ];
    
    let messageIndex = 0;
    const messageTimer = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setFullText(messages[messageIndex]);
      setTypewriterIndex(0); // Reset typewriter index for new message
    }, 1000); // Faster message change

    // Icon rotation
    const iconTimer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 700); // Faster icon change

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
      clearInterval(messageTimer);
      clearInterval(iconTimer);
      clearInterval(typeInterval);
    };
  }, [typewriterIndex, fullText]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      {titleVisible && (
        <h1 className="text-4xl md:text-5xl font-bold mb-10 animate-fade-in text-gradient bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          Lifespan Estimator
        </h1>
      )}
      
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-r-primary/50 border-b-primary/20 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-primary/10 rounded-full animate-ping opacity-30"></div>
        {icons[currentIcon]}
      </div>
      <p className="mt-6 text-foreground/80 animate-pulse font-medium">
        {loadingText}<span>{dots}</span>
      </p>
      <div className="mt-8 flex space-x-3">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-100"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce delay-200"></div>
      </div>
    </div>
  );
}
