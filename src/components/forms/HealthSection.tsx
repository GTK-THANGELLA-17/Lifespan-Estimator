
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHealthTips } from "@/components/SectionHealthTips";

interface HealthSectionProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleChronicConditionsChange: (condition: string) => void;
  handleFamilyHistoryChange: (condition: string) => void;
  handleNextSection: () => void;
  handlePrevSection: () => void;
}

export function HealthSection({
  formData,
  handleChange,
  handleChronicConditionsChange,
  handleFamilyHistoryChange,
  handleNextSection,
  handlePrevSection
}: HealthSectionProps) {
  return (
    <>
      <FormSection 
        id="healthInfo" 
        title="Health Related" 
        icon={<Heart className="h-5 w-5" />}
        description="Your current health status and medical history play a significant role in lifespan estimation."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Medical Condition" id="medical_condition" required>
            <Select value={formData.medicalCondition} onValueChange={(value) => handleChange("medicalCondition", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select medical condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="bad">Bad</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Current Situation" id="current_situation" required>
            <Select value={formData.currentSituation} onValueChange={(value) => handleChange("currentSituation", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select current situation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="unhealthy">Unhealthy</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
        
        <div className="mt-6">
          <Label className="text-sm font-medium mb-2 block">Chronic Conditions</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { id: "diabetes", label: "Diabetes" },
              { id: "hypertension", label: "Hypertension" },
              { id: "heart_disease", label: "Heart Disease" },
              { id: "cancer", label: "Cancer" },
              { id: "respiratory", label: "Respiratory Disease" }
            ].map((condition) => (
              <div key={condition.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`chronic_${condition.id}`}
                  checked={formData.chronicConditions.includes(condition.id)}
                  onCheckedChange={() => handleChronicConditionsChange(condition.id)}
                />
                <label
                  htmlFor={`chronic_${condition.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <Label className="text-sm font-medium mb-2 block">Family History</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { id: "longevity", label: "Longevity (relatives lived 90+)" },
              { id: "heart_disease", label: "Heart Disease" },
              { id: "cancer", label: "Cancer" },
              { id: "diabetes", label: "Diabetes" }
            ].map((condition) => (
              <div key={condition.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`family_${condition.id}`}
                  checked={formData.familyHistory.includes(condition.id)}
                  onCheckedChange={() => handleFamilyHistoryChange(condition.id)}
                />
                <label
                  htmlFor={`family_${condition.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </FormSection>
      
      <SectionHealthTips section="health" />
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevSection} className="nav-button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNextSection} className="nav-button">
          Continue to Lifestyle <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
