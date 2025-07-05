import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Brain, 
  Dumbbell, 
  Utensils, 
  Moon, 
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Calendar
} from 'lucide-react';

interface EnhancedResultVisualsProps {
  selectedData: Record<string, any> | null;
  result: string | null;
}

export function EnhancedResultVisuals({ selectedData, result }: EnhancedResultVisualsProps) {
  const [healthScore, setHealthScore] = useState(0);
  const [animateScores, setAnimateScores] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateScores(true), 500);
  }, []);

  // Calculate comprehensive health metrics
  const calculateHealthMetrics = () => {
    if (!selectedData) return { overall: 70, dimensions: [] };

    const { personalInfo, healthInfo, lifestyleInfo, activityInfo, dietInfo, habitInfo } = selectedData;
    
    // Base scores
    let physicalScore = 70;
    let mentalScore = 70;
    let nutritionScore = 70;
    let sleepScore = 70;
    let socialScore = 70;
    let medicalScore = 70;

    // Physical activity scoring
    if (activityInfo?.exerciseFrequency === "daily") physicalScore = 95;
    else if (activityInfo?.exerciseFrequency === "weekly") physicalScore = 80;
    else if (activityInfo?.exerciseFrequency === "rarely") physicalScore = 50;
    else if (activityInfo?.exerciseFrequency === "never") physicalScore = 30;

    // Mental health scoring
    if (lifestyleInfo?.mentalHealth === "none") mentalScore = 90;
    else if (lifestyleInfo?.mentalHealth === "mild") mentalScore = 75;
    else if (lifestyleInfo?.mentalHealth === "moderate") mentalScore = 60;
    else if (lifestyleInfo?.mentalHealth === "severe") mentalScore = 40;

    // Nutrition scoring
    if (dietInfo?.dietType === "balanced" || dietInfo?.dietType === "mediterranean") nutritionScore = 90;
    else if (dietInfo?.dietType === "vegetarian") nutritionScore = 85;
    else if (dietInfo?.dietType === "processed") nutritionScore = 40;

    // Sleep scoring
    if (lifestyleInfo?.sleepPatterns === "normal") sleepScore = 85;
    else if (lifestyleInfo?.sleepPatterns === "insomnia") sleepScore = 35;
    else if (lifestyleInfo?.sleepPatterns === "irregular") sleepScore = 55;

    // Social scoring
    if (lifestyleInfo?.socialRelationships === "strong") socialScore = 90;
    else if (lifestyleInfo?.socialRelationships === "moderate") socialScore = 70;
    else if (lifestyleInfo?.socialRelationships === "weak") socialScore = 45;

    // Medical scoring
    if (healthInfo?.medicalCondition === "excellent") medicalScore = 95;
    else if (healthInfo?.medicalCondition === "good") medicalScore = 80;
    else if (healthInfo?.medicalCondition === "fair") medicalScore = 60;
    else if (healthInfo?.medicalCondition === "bad") medicalScore = 40;

    const dimensions = [
      { name: "Physical", score: physicalScore, icon: Dumbbell, color: "text-green-500" },
      { name: "Mental", score: mentalScore, icon: Brain, color: "text-purple-500" },
      { name: "Nutrition", score: nutritionScore, icon: Utensils, color: "text-orange-500" },
      { name: "Sleep", score: sleepScore, icon: Moon, color: "text-blue-500" },
      { name: "Social", score: socialScore, icon: Users, color: "text-pink-500" },
      { name: "Medical", score: medicalScore, icon: Shield, color: "text-red-500" }
    ];

    const overall = Math.round(dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length);

    return { overall, dimensions };
  };

  const { overall, dimensions } = calculateHealthMetrics();

  // Health recommendations based on scores
  const getRecommendations = () => {
    const recommendations = [];
    
    dimensions.forEach(dim => {
      if (dim.score < 60) {
        switch (dim.name) {
          case "Physical":
            recommendations.push({
              type: "warning",
              title: "Increase Physical Activity",
              description: "Aim for at least 150 minutes of moderate exercise weekly",
              priority: "high"
            });
            break;
          case "Mental":
            recommendations.push({
              type: "warning",
              title: "Mental Health Support",
              description: "Consider stress management techniques or professional support",
              priority: "high"
            });
            break;
          case "Nutrition":
            recommendations.push({
              type: "warning",
              title: "Improve Diet Quality",
              description: "Focus on whole foods, fruits, vegetables, and lean proteins",
              priority: "medium"
            });
            break;
          case "Sleep":
            recommendations.push({
              type: "warning",
              title: "Optimize Sleep Habits",
              description: "Establish consistent sleep schedule and improve sleep hygiene",
              priority: "high"
            });
            break;
          case "Social":
            recommendations.push({
              type: "info",
              title: "Strengthen Social Connections",
              description: "Cultivate meaningful relationships and social activities",
              priority: "medium"
            });
            break;
          case "Medical":
            recommendations.push({
              type: "warning",
              title: "Medical Attention Needed",
              description: "Consult healthcare providers for regular check-ups",
              priority: "high"
            });
            break;
        }
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  // Animate health score
  useEffect(() => {
    if (animateScores) {
      let current = 0;
      const increment = overall / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= overall) {
          current = overall;
          clearInterval(timer);
        }
        setHealthScore(Math.round(current));
      }, 30);
      return () => clearInterval(timer);
    }
  }, [animateScores, overall]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Overall Health Score Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            Overall Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div
            className="relative mx-auto w-32 h-32 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted opacity-30"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${healthScore}, 100`}
                className={getScoreColor(healthScore)}
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${healthScore}, 100` }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className={`text-3xl font-bold ${getScoreColor(healthScore)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {healthScore}
              </motion.span>
            </div>
          </motion.div>
          <Badge variant={getScoreBadgeVariant(healthScore)} className="mb-2">
            {healthScore >= 80 ? "Excellent" : healthScore >= 60 ? "Good" : "Needs Improvement"}
          </Badge>
        </CardContent>
      </Card>

      {/* Health Dimensions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dimensions.map((dimension, index) => {
          const Icon = dimension.icon;
          return (
            <motion.div
              key={dimension.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 interactive-card">
                <CardContent className="p-4">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${dimension.color}`} />
                  <h3 className="font-medium mb-2 text-card-foreground">{dimension.name}</h3>
                  <div className="space-y-2">
                    <Progress 
                      value={animateScores ? dimension.score : 0} 
                      className="h-2"
                    />
                    <motion.span 
                      className={`text-lg font-bold ${getScoreColor(dimension.score)}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                    >
                      {dimension.score}%
                    </motion.span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Target className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {recommendations.slice(0, 3).map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-gray-800/60"
                  >
                    {rec.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <Badge 
                        variant={rec.priority === "high" ? "destructive" : "secondary"}
                        className="mt-2 text-xs"
                      >
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lifestyle Impact Timeline */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Lifestyle Impact Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "Next 30 days", action: "Improve sleep habits", impact: "+2 years" },
              { time: "Next 6 months", action: "Regular exercise routine", impact: "+4 years" },
              { time: "Next 2 years", action: "Dietary improvements", impact: "+3 years" },
              { time: "Long term", action: "Stress management", impact: "+5 years" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent"
              >
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">{item.time}</span>
                    <Badge variant="outline" className="text-green-600">
                      {item.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}