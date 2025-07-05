import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Shield, 
  Lightbulb, 
  Users,
  Calendar,
  BarChart3,
  Brain,
  Activity
} from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-rose-500" />,
      title: "Personalized Health Insights",
      description: "Get tailored analysis based on your unique lifestyle, medical history, and personal choices"
    },
    {
      icon: <Target className="h-6 w-6 text-blue-500" />,
      title: "Evidence-Based Calculations",
      description: "Our algorithms use peer-reviewed medical research and actuarial data for accurate estimations"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
      title: "Lifestyle Impact Analysis",
      description: "Understand how diet, exercise, sleep, and social factors affect your longevity"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Risk Factor Assessment",
      description: "Identify and quantify health risks to make informed decisions about your future"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
      title: "Actionable Recommendations",
      description: "Receive specific, science-backed suggestions to improve your health and longevity"
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-500" />,
      title: "Social & Environmental Factors",
      description: "Account for relationships, stress levels, and environmental conditions in your area"
    }
  ];

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-indigo-500" />,
      title: "Life Timeline Visualization",
      description: "See your projected health journey with interactive charts and milestones"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-500" />,
      title: "Comprehensive Analytics",
      description: "Multi-dimensional health analysis with radar charts, trends, and comparisons"
    },
    {
      icon: <Brain className="h-8 w-8 text-violet-500" />,
      title: "AI Health Assistant",
      description: "Get personalized advice and answers to your health questions"
    },
    {
      icon: <Activity className="h-8 w-8 text-orange-500" />,
      title: "Real-time Health Scoring",
      description: "Track your health dimensions and see improvements over time"
    }
  ];

  return (
    <motion.section 
      className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Why Use Our Lifespan Calculator?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empower yourself with data-driven insights about your health and longevity. 
            Make informed decisions to live your best, longest life.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full glass-card hover:shadow-lg transition-all duration-300 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">
            Advanced Features & Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/30 bg-gradient-to-br from-card to-primary/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-card-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Health Potential?</h3>
            <p className="text-lg mb-6 opacity-90">
              Start your personalized health journey today and unlock insights that could add years to your life.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => {
                  document.getElementById('personal')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Begin Health Assessment
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}