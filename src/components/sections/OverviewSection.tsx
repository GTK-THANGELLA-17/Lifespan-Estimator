
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, Heart, Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OverviewSectionProps {
  onStartCalculation: () => void;
}

export function OverviewSection({ onStartCalculation }: OverviewSectionProps) {
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Lifespan Calculator
            </h1>
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Discover your personalized health insights with our advanced AI-powered lifespan estimation tool. 
            Make informed decisions for a longer, healthier life based on scientific research and lifestyle factors.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 inline-block"
          >
            <Button
              size="lg"
              onClick={onStartCalculation}
              className="group relative w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              
              <span className="relative flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                <span className="whitespace-nowrap">Start Your Health Journey</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
                </motion.div>
              </span>
              
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {[
            { 
              icon: Brain, 
              title: "AI-Powered Analysis", 
              desc: "Advanced algorithms analyze 50+ lifestyle factors for accurate predictions",
              color: "text-blue-500"
            },
            { 
              icon: Heart, 
              title: "Personalized Insights", 
              desc: "Tailored recommendations based on your unique health profile",
              color: "text-rose-500"
            },
            { 
              icon: Calculator, 
              title: "Scientific Accuracy", 
              desc: "Based on peer-reviewed research and population health data",
              color: "text-emerald-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 border-primary/20">
                <CardContent className="p-8 text-center">
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { number: "50+", label: "Health Factors" },
            { number: "95%", label: "Accuracy Rate" },
            { number: "10K+", label: "Users Helped" },
            { number: "24/7", label: "Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
