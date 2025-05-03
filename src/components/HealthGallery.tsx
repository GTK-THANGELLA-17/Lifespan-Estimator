
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
  src: string;
  alt: string;
  description: string;
}

export function HealthGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images: Image[] = [
    {
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      alt: "Healthy fruits and vegetables",
      description: "A balanced diet rich in fruits and vegetables can boost your immune system and improve longevity."
    },
    {
      src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      alt: "Mental wellbeing",
      description: "Spending time with pets can reduce stress and improve your mental health."
    },
    {
      src: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      alt: "Nature and wellbeing",
      description: "Being in nature regularly can reduce stress and improve both mental and physical health."
    },
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Outdoor activities",
      description: "Regular outdoor activities can add years to your lifespan through improved cardiovascular health."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % images.length
    );
  };

  return (
    <div className="relative my-8 overflow-hidden rounded-xl border border-border bg-card shadow-md">
      <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
        <Heart className="h-4 w-4 mr-1.5 text-destructive" />
        Health & Wellbeing
      </div>
      
      <div className="relative h-[300px] md:h-[350px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 transition-all duration-500 ease-in-out
              ${index === currentImageIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
            `}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <p className="text-sm md:text-base">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-white ml-2"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-white mr-2"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
