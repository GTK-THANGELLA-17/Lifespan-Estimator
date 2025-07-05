import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Shield, 
  Heart, 
  Activity, 
  Brain, 
  Utensils,
  Moon,
  Users,
  Thermometer,
  Eye,
  Stethoscope,
  Clock
} from 'lucide-react';

interface HealthPrecautionsProps {
  selectedData: Record<string, any> | null;
}

export function HealthPrecautions({ selectedData }: HealthPrecautionsProps) {
  const generatePrecautions = () => {
    const precautions = [];
    
    if (!selectedData) {
      return [
        {
          category: "General Health",
          icon: <Stethoscope className="h-5 w-5" />,
          color: "text-blue-500",
          items: [
            "Schedule regular health checkups with your physician",
            "Maintain a balanced diet with fruits and vegetables",
            "Exercise for at least 30 minutes daily",
            "Get 7-9 hours of quality sleep each night"
          ]
        }
      ];
    }

    const { personalInfo, healthInfo, lifestyleInfo, activityInfo, dietInfo, habitInfo } = selectedData;

    // Age-based precautions
    const age = personalInfo?.age ? parseInt(personalInfo.age) : 30;
    if (age >= 40) {
      precautions.push({
        category: "Age-Related Health",
        icon: <Clock className="h-5 w-5" />,
        color: "text-amber-500",
        priority: "high",
        items: [
          "Annual cardiovascular screening recommended",
          "Regular cancer screenings as per guidelines",
          "Bone density tests every 2 years",
          "Vitamin D and B12 level monitoring"
        ]
      });
    }

    // BMI-based precautions
    const height = parseFloat(personalInfo?.height || "0");
    const weight = parseFloat(personalInfo?.weight || "0");
    if (height > 0 && weight > 0) {
      const bmi = weight / ((height / 100) ** 2);
      if (bmi > 25) {
        precautions.push({
          category: "Weight Management",
          icon: <Activity className="h-5 w-5" />,
          color: "text-orange-500",
          priority: "medium",
          items: [
            "Consult a nutritionist for personalized meal planning",
            "Increase physical activity gradually",
            "Monitor blood pressure and cholesterol levels",
            "Consider joining a weight management program"
          ]
        });
      }
    }

    // Medical condition precautions
    if (healthInfo?.medicalCondition === "bad" || healthInfo?.chronicConditions?.length > 0) {
      precautions.push({
        category: "Chronic Disease Management",
        icon: <Heart className="h-5 w-5" />,
        color: "text-red-500",
        priority: "high",
        items: [
          "Strict medication adherence as prescribed",
          "Regular specialist consultations",
          "Daily symptom monitoring and recording",
          "Emergency action plan preparation",
          "Lifestyle modifications as recommended"
        ]
      });
    }

    // Mental health precautions
    if (lifestyleInfo?.mentalHealth && lifestyleInfo.mentalHealth !== "none") {
      precautions.push({
        category: "Mental Health Support",
        icon: <Brain className="h-5 w-5" />,
        color: "text-purple-500",
        priority: "high",
        items: [
          "Regular mental health check-ins with professionals",
          "Practice stress reduction techniques daily",
          "Maintain strong social connections",
          "Consider therapy or counseling if needed",
          "Limit exposure to stressful situations"
        ]
      });
    }

    // Sleep-related precautions
    if (lifestyleInfo?.sleepPatterns === "insomnia" || lifestyleInfo?.sleepPatterns === "irregular") {
      precautions.push({
        category: "Sleep Hygiene",
        icon: <Moon className="h-5 w-5" />,
        color: "text-indigo-500",
        priority: "medium",
        items: [
          "Establish consistent sleep schedule",
          "Create relaxing bedtime routine",
          "Limit screen time before bed",
          "Consider sleep study if problems persist",
          "Avoid caffeine and alcohol before sleep"
        ]
      });
    }

    // Exercise-related precautions
    if (activityInfo?.exerciseFrequency === "never" || activityInfo?.exerciseFrequency === "rarely") {
      precautions.push({
        category: "Physical Activity",
        icon: <Activity className="h-5 w-5" />,
        color: "text-green-500",
        priority: "medium",
        items: [
          "Start with low-impact exercises like walking",
          "Gradually increase activity duration and intensity",
          "Consult physician before starting new exercise program",
          "Include strength training 2-3 times per week",
          "Stay hydrated during physical activities"
        ]
      });
    }

    // Diet-related precautions
    if (dietInfo?.dietType === "processed" || dietInfo?.dietType === "high_sugar") {
      precautions.push({
        category: "Nutritional Health",
        icon: <Utensils className="h-5 w-5" />,
        color: "text-yellow-500",
        priority: "medium",
        items: [
          "Reduce processed food consumption gradually",
          "Increase fruit and vegetable intake",
          "Monitor blood sugar levels regularly",
          "Stay hydrated with water, limit sugary drinks",
          "Consider consultation with a registered dietitian"
        ]
      });
    }

    // Smoking-related precautions
    if (lifestyleInfo?.lifestyleHabits?.includes("smoking")) {
      precautions.push({
        category: "Smoking Cessation",
        icon: <AlertTriangle className="h-5 w-5" />,
        color: "text-red-600",
        priority: "critical",
        items: [
          "Immediate cessation is highly recommended",
          "Consult healthcare provider for cessation programs",
          "Regular lung function tests",
          "Monitor for respiratory symptoms",
          "Consider nicotine replacement therapy"
        ]
      });
    }

    // Social health precautions
    if (lifestyleInfo?.socialRelationships === "weak") {
      precautions.push({
        category: "Social Wellness",
        icon: <Users className="h-5 w-5" />,
        color: "text-pink-500",
        priority: "medium",
        items: [
          "Actively seek social connections",
          "Join community groups or clubs",
          "Maintain regular contact with family and friends",
          "Consider volunteer opportunities",
          "Practice social skills in comfortable settings"
        ]
      });
    }

    // Environmental precautions
    if (lifestyleInfo?.environmentalFactors === "pollution") {
      precautions.push({
        category: "Environmental Health",
        icon: <Shield className="h-5 w-5" />,
        color: "text-gray-500",
        priority: "medium",
        items: [
          "Use air purifiers in living spaces",
          "Wear masks during high pollution days",
          "Regular respiratory health monitoring",
          "Limit outdoor activities during poor air quality",
          "Consider relocating if possible"
        ]
      });
    }

    // General preventive care
    precautions.push({
      category: "Preventive Care",
      icon: <Eye className="h-5 w-5" />,
      color: "text-cyan-500",
      priority: "low",
      items: [
        "Annual comprehensive physical examinations",
        "Regular dental checkups and cleanings",
        "Eye examinations every 1-2 years",
        "Skin cancer screenings annually",
        "Stay up-to-date with vaccinations"
      ]
    });

    return precautions;
  };

  const precautions = generatePrecautions();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "critical": return "Critical";
      case "high": return "High Priority";
      case "medium": return "Medium Priority";
      default: return "Recommended";
    }
  };

  return (
    <motion.section 
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-card-foreground">
          🏥 Personalized Health Precautions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your health profile, here are important precautions and recommendations 
          to help you maintain and improve your health.
        </p>
      </motion.div>

      <div className="grid gap-6">
        {precautions.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-primary/10 ${category.color}`}>
                      {category.icon}
                    </div>
                    <span className="text-card-foreground">{category.category}</span>
                  </CardTitle>
                  {category.priority && (
                    <Badge className={getPriorityColor(category.priority)}>
                      {getPriorityLabel(category.priority)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (itemIndex * 0.1), duration: 0.3 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Emergency Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Emergency Preparedness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-card-foreground">Keep readily available:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Emergency contact numbers</li>
                  <li>• List of current medications</li>
                  <li>• Medical history summary</li>
                  <li>• Insurance information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-card-foreground">Seek immediate medical attention for:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Chest pain or difficulty breathing</li>
                  <li>• Sudden severe headache</li>
                  <li>• Loss of consciousness</li>
                  <li>• Severe allergic reactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}