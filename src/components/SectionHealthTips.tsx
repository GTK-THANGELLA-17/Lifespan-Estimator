import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Utensils, Dumbbell, Moon, ArrowRight, Scale, Users, Clock, Cigarette, Wine, Award, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthTip {
  title: string;
  icon: React.ReactNode;
  content: string;
}

interface SectionHealthTipsProps {
  section: string;
}

export function SectionHealthTips({ section }: SectionHealthTipsProps) {
  const [showMore, setShowMore] = useState(false);
  
  const nutritionTips: HealthTip[] = [
    {
      title: "Balanced Diet",
      icon: <Utensils className="h-5 w-5 text-primary" />,
      content: "Aim for a diet rich in fruits, vegetables, whole grains, and lean proteins. Limit processed foods and added sugars."
    },
    {
      title: "Portion Control",
      icon: <Scale className="h-5 w-5 text-primary" />,
      content: "Be mindful of portion sizes to maintain a healthy weight. Use smaller plates to help control portions."
    },
    {
      title: "Hydration",
      icon: <Wine className="h-5 w-5 text-primary" />,
      content: "Drink plenty of water throughout the day. Limit sugary drinks and alcohol."
    }
  ];

  const fitnessTips: HealthTip[] = [
    {
      title: "Regular Exercise",
      icon: <Dumbbell className="h-5 w-5 text-primary" />,
      content: "Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week."
    },
    {
      title: "Strength Training",
      icon: <Award className="h-5 w-5 text-primary" />,
      content: "Include muscle-strengthening activities at least twice a week to maintain muscle mass and bone density."
    },
    {
      title: "Move Throughout Day",
      icon: <Clock className="h-5 w-5 text-primary" />,
      content: "Break up sitting time by moving every hour, even if just for a few minutes."
    }
  ];

  const sleepTips: HealthTip[] = [
    {
      title: "Sleep Schedule",
      icon: <Moon className="h-5 w-5 text-primary" />,
      content: "Maintain a consistent sleep schedule, even on weekends."
    },
    {
      title: "Bedtime Routine",
      icon: <Clock className="h-5 w-5 text-primary" />,
      content: "Create a relaxing bedtime routine to signal your body it's time to sleep."
    },
    {
      title: "Sleep Environment",
      icon: <Moon className="h-5 w-5 text-primary" />,
      content: "Keep your bedroom cool, dark, and quiet for optimal sleep."
    }
  ];

  const medicalTips: HealthTip[] = [
    {
      title: "Regular Checkups",
      icon: <Heart className="h-5 w-5 text-primary" />,
      content: "Schedule regular preventive health screenings and checkups."
    },
    {
      title: "Know Your Numbers",
      icon: <Scale className="h-5 w-5 text-primary" />,
      content: "Monitor your blood pressure, cholesterol, and blood sugar levels."
    },
    {
      title: "Medication Adherence",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      content: "Take medications as prescribed and understand potential side effects."
    }
  ];

  const mentalHealthTips: HealthTip[] = [
    {
      title: "Stress Management",
      icon: <Brain className="h-5 w-5 text-primary" />,
      content: "Practice stress-reduction techniques like meditation, deep breathing, or yoga."
    },
    {
      title: "Social Connection",
      icon: <Users className="h-5 w-5 text-primary" />,
      content: "Maintain strong social connections with friends and family."
    },
    {
      title: "Mental Stimulation",
      icon: <Brain className="h-5 w-5 text-primary" />,
      content: "Keep your brain active with puzzles, reading, and learning new skills."
    }
  ];

  const lifestyleTips: HealthTip[] = [
    {
      title: "Avoid Smoking",
      icon: <Cigarette className="h-5 w-5 text-primary" />,
      content: "If you smoke, quitting is the single best thing you can do for your health."
    },
    {
      title: "Limit Alcohol",
      icon: <Wine className="h-5 w-5 text-primary" />,
      content: "If you drink alcohol, do so in moderation (up to 1 drink per day for women, up to 2 for men)."
    },
    {
      title: "Sun Protection",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      content: "Use sunscreen and protect your skin from excessive sun exposure."
    }
  ];

  const tipsMap: Record<string, HealthTip[]> = {
    "nutrition": nutritionTips,
    "fitness": fitnessTips,
    "sleep": sleepTips,
    "medical": medicalTips,
    "mental": mentalHealthTips,
    "lifestyle": lifestyleTips,
    "general": [
      {
        title: "Healthy Lifestyle",
        icon: <Heart className="h-5 w-5 text-primary" />,
        content: "A healthy lifestyle is key to longevity. Balance diet, exercise, sleep, and stress management."
      }
    ]
  };

  const sectionTips = tipsMap[section.toLowerCase()] || tipsMap.general;
  const displayTips = showMore ? sectionTips : sectionTips.slice(0, 2);

  return (
    <Card className="bg-primary/5 border-primary/20 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Health Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayTips.map((tip, index) => (
            <div 
              key={index} 
              className="p-3 bg-background rounded-md border border-border flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="shrink-0 mt-1">{tip.icon}</div>
              <div>
                <h4 className="font-medium mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        {sectionTips.length > 2 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMore(!showMore)}
            className="mt-3 w-full text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            {showMore ? "Show Less" : "Show More Tips"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
