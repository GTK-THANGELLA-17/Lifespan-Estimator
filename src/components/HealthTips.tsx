
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sun, Brain, Utensils, Dumbbell, AlertTriangle } from "lucide-react";

interface HealthTipsProps {
  selectedData: Record<string, any> | null;
}

export function HealthTips({ selectedData }: HealthTipsProps) {
  if (!selectedData) return null;

  // Determine which tips to show based on selected data
  const showSleepTips = selectedData.lifestyleInfo?.sleepPatterns === "insomnia" || selectedData.lifestyleInfo?.sleepPatterns === "other";
  const showExerciseTips = !selectedData.lifestyleInfo?.lifestyleHabits?.includes("exercise") || selectedData.activityInfo?.exerciseFrequency === "never" || selectedData.activityInfo?.exerciseFrequency === "occasionally";
  const showNutritionTips = selectedData.dietInfo?.dietType === "processed" || selectedData.dietInfo?.dietType === "high_sugar";
  const showMentalHealthTips = selectedData.lifestyleInfo?.mentalHealth !== "good";
  const showHeartTips = selectedData.healthInfo?.chronicConditions?.includes("heart_disease") || selectedData.healthInfo?.chronicConditions?.includes("hypertension");
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Heart className="text-primary h-6 w-6" />
        Personalized Health Recommendations
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {showSleepTips && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Sleep Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Maintain a consistent sleep schedule, even on weekends</li>
                <li>Create a relaxing bedtime routine (reading, warm bath)</li>
                <li>Limit screen time 1-2 hours before bed</li>
                <li>Ensure your bedroom is dark, quiet, and cool</li>
                <li>Avoid caffeine after mid-afternoon</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        {showExerciseTips && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Physical Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Aim for at least 150 minutes of moderate exercise weekly</li>
                <li>Start with short, achievable walking sessions</li>
                <li>Find activities you enjoy to maintain consistency</li>
                <li>Incorporate both aerobic and strength training</li>
                <li>Take brief movement breaks throughout the day</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        {showNutritionTips && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Nutrition Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Increase fresh fruits and vegetables in your diet</li>
                <li>Limit processed foods and added sugars</li>
                <li>Choose whole grains over refined varieties</li>
                <li>Stay hydrated with water instead of sugary drinks</li>
                <li>Consider consulting with a registered dietitian</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        {showMentalHealthTips && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Mental Wellbeing
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Practice mindfulness or meditation daily</li>
                <li>Schedule regular breaks during work hours</li>
                <li>Maintain social connections and support networks</li>
                <li>Consider professional counseling or therapy</li>
                <li>Set healthy boundaries in work and personal life</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        {showHeartTips && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Heart Health
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Monitor blood pressure regularly</li>
                <li>Limit sodium intake in your diet</li>
                <li>Talk to your doctor about appropriate screenings</li>
                <li>Know the warning signs of heart problems</li>
                <li>Follow medical advice regarding medications</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              General Wellness
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Schedule regular preventive health check-ups</li>
              <li>Stay up to date with recommended vaccinations</li>
              <li>Practice good hygiene habits</li>
              <li>Manage stress through relaxation techniques</li>
              <li>Foster meaningful social relationships</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-5 p-4 border rounded-md bg-muted/30">
        <p className="text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> These recommendations are general in nature and not tailored to individual medical needs. 
          Always consult with healthcare professionals before making significant changes to your health regimen.
        </p>
      </div>
    </div>
  );
}
