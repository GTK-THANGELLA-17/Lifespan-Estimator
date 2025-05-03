
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { Utensils, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHealthTips } from "@/components/SectionHealthTips";

interface DietSectionProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleNextSection: () => void;
  handlePrevSection: () => void;
}

export function DietSection({
  formData,
  handleChange,
  handleNextSection,
  handlePrevSection
}: DietSectionProps) {
  return (
    <>
      <FormSection 
        id="dietInfo" 
        title="Diet & Consumption" 
        icon={<Utensils className="h-5 w-5" />}
        description="Your diet and consumption habits have long-term effects on your health outcomes."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Diet Type" id="diet_type" required>
            <Select value={formData.dietType} onValueChange={(value) => handleChange("dietType", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced Diet</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
                <SelectItem value="processed">High Processed Foods</SelectItem>
                <SelectItem value="high_sugar">High Sugar Diet</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Alcohol Consumption" id="alcohol_consumption" required>
            <Select value={formData.alcoholConsumption} onValueChange={(value) => handleChange("alcoholConsumption", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select alcohol consumption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional (Few drinks per month)</SelectItem>
                <SelectItem value="moderate">Moderate (Few drinks per week)</SelectItem>
                <SelectItem value="heavy">Heavy (Daily drinking)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Screen Time (hours daily)" id="screen_time" required>
            <Select value={formData.screenTime} onValueChange={(value) => handleChange("screenTime", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select daily screen time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 hours</SelectItem>
                <SelectItem value="3-4">3-4 hours</SelectItem>
                <SelectItem value="5-6">5-6 hours</SelectItem>
                <SelectItem value="6+">6+ hours</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormSection>
      
      <SectionHealthTips section="diet" />
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevSection} className="nav-button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNextSection} className="nav-button">
          Continue to Calculate <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
