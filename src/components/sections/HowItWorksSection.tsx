
import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Brain, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function HowItWorksSection() {
  const steps = [
    {
      icon: User,
      title: "Personal Information",
      description: "Enter basic details like age, gender, location, and physical measurements",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Health Assessment",
      description: "Provide information about medical conditions, family history, and current health status",
      color: "bg-rose-500"
    },
    {
      icon: Brain,
      title: "Lifestyle Analysis",
      description: "Share details about diet, exercise, sleep patterns, and daily habits",
      color: "bg-purple-500"
    },
    {
      icon: TrendingUp,
      title: "AI Calculation",
      description: "Our advanced algorithm processes your data and generates personalized insights",
      color: "bg-emerald-500"
    }
  ];

  const factors = [
    "Age and Gender", "Physical Health", "Mental Wellbeing", "Exercise Habits",
    "Diet Quality", "Sleep Patterns", "Stress Levels", "Social Connections",
    "Environmental Factors", "Healthcare Access", "Family History", "Lifestyle Choices"
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our sophisticated AI analyzes multiple health and lifestyle factors to provide you with 
            accurate lifespan estimations and personalized health recommendations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">Step {index + 1}</div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Factors We Analyze */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/50 dark:bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Factors We Analyze
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {factors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (index * 0.05), duration: 0.3 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{factor}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accuracy Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
            Scientific Foundation
          </h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Our calculations are based on extensive epidemiological research, population health data, 
            and peer-reviewed scientific studies to ensure maximum accuracy and reliability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
