
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { Dumbbell, AlertTriangle, Utensils, Brain, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHealthTips } from "@/components/SectionHealthTips";
import { HealthGallery } from "@/components/HealthGallery";

interface LifestyleSectionProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleLifestyleChange: (habit: string) => void;
  handleNextSection: () => void;
  handlePrevSection: () => void;
}

export function LifestyleSection({
  formData,
  handleChange,
  handleLifestyleChange,
  handleNextSection,
  handlePrevSection
}: LifestyleSectionProps) {
  return (
    <>
      <HealthGallery />
      
      <FormSection 
        id="lifestyleInfo" 
        title="Lifestyle" 
        icon={<Dumbbell className="h-5 w-5" />}
        description="Your daily habits and lifestyle choices have a significant impact on your health and longevity."
      >
        <div className="space-y-4">
          <FormField label="Lifestyle Habits" id="lifestyle_habits">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { id: "smoking", label: "Smoking", icon: <AlertTriangle className="h-4 w-4 text-destructive" /> },
                { id: "alcohol", label: "Alcohol Consumption", icon: <AlertTriangle className="h-4 w-4 text-destructive" /> },
                { id: "diet", label: "Dietary Habits", icon: <Utensils className="h-4 w-4" /> },
                { id: "exercise", label: "Exercise Routine", icon: <Dumbbell className="h-4 w-4" /> },
                { id: "stress", label: "Stress Levels", icon: <Brain className="h-4 w-4" /> }
              ].map((habit) => (
                <div key={habit.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lifestyle_${habit.id}`}
                    checked={formData.lifestyleHabits.includes(habit.id)}
                    onCheckedChange={() => handleLifestyleChange(habit.id)}
                  />
                  <label
                    htmlFor={`lifestyle_${habit.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    {habit.icon}
                    {habit.label}
                  </label>
                </div>
              ))}
            </div>
          </FormField>
          
          {formData.lifestyleHabits.includes("smoking") && (
            <FormField 
              label="Years of Smoking" 
              id="smoking_years"
              helpText="Enter how many years you've been smoking"
            >
              <Input
                id="smoking_years"
                type="number"
                placeholder="Number of years"
                min="0"
                max="100"
                value={formData.smokingYears}
                onChange={(e) => handleChange("smokingYears", e.target.value)}
                className="bg-background/50"
              />
            </FormField>
          )}
          
          <FormField label="Mental Health" id="mental_health" required>
            <Select value={formData.mentalHealth} onValueChange={(value) => handleChange("mentalHealth", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select mental health status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="good">Good Mental Health</SelectItem>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="burnout">Burnout</SelectItem>
                <SelectItem value="other">Other Mental Health Concern</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Sleep Patterns" id="sleep_patterns" required>
            <Select value={formData.sleepPatterns} onValueChange={(value) => handleChange("sleepPatterns", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select sleep pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="good">Good Sleep (7-9 hours/night)</SelectItem>
                <SelectItem value="insomnia">Insomnia</SelectItem>
                <SelectItem value="other">Other Sleep Issues</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormSection>
      
      <SectionHealthTips section="lifestyle" />
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevSection} className="nav-button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNextSection} className="nav-button">
          Continue to Activity <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
