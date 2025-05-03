
import React from 'react';
import { InfoModal } from "@/components/InfoModal";
import { Sparkles } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-powderBlue via-primary to-mintWhisper dark:from-iceBlue dark:via-primary dark:to-iceBlue/70 py-8 px-4 text-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-7 w-7 text-primary-foreground animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold animate-fade-in dark:text-iceblue">
            Lifespan Estimation Calculator
          </h1>
        </div>
        <p className="text-lg opacity-90 mb-6 animate-fade-in delay-100 max-w-2xl mx-auto dark:text-iceblue">
          Calculate your estimated lifespan based on various lifestyle factors, health conditions, and personal choices
        </p>
        <InfoModal />
      </div>
    </header>
  );
}
