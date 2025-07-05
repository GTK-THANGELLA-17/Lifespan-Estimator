
import React from 'react';
import { InfoModal } from "@/components/InfoModal";
import { Sparkles } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 dark:from-primary/30 dark:via-primary/40 dark:to-purple-500/30 py-6 px-4 text-center border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold animate-fade-in text-primary dark:text-primary gradient-text">
            Lifespan Estimation Calculator
          </h1>
        </div>
        <p className="text-base opacity-90 mb-4 animate-fade-in delay-100 max-w-2xl mx-auto text-primary dark:text-primary">
          Calculate your estimated lifespan based on various lifestyle factors, health conditions, and personal choices
        </p>
        <InfoModal />
      </div>
    </header>
  );
}
