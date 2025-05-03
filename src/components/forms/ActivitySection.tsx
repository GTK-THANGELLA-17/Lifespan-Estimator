
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { Timer, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHealthTips } from "@/components/SectionHealthTips";

interface ActivitySectionProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleNextSection: () => void;
  handlePrevSection: () => void;
}

export function ActivitySection({
  formData,
  handleChange,
  handleNextSection,
  handlePrevSection
}: ActivitySectionProps) {
  return (
    <>
      <FormSection 
        id="activityInfo" 
        title="Activity & Environment" 
        icon={<Timer className="h-5 w-5" />}
        description="Your physical activity level and environment play crucial roles in determining your overall health and lifespan."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Environmental Factors" id="environmental_factors" required>
            <Select value={formData.environmentalFactors} onValueChange={(value) => handleChange("environmentalFactors", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select environmental factor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pollution">High Pollution Area</SelectItem>
                <SelectItem value="air_quality">Good Air Quality</SelectItem>
                <SelectItem value="green_spaces">Access to Green Spaces</SelectItem>
                <SelectItem value="natural_disasters">Prone to Natural Disasters</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Social Relationships" id="social_relationships" required>
            <Select value={formData.socialRelationships} onValueChange={(value) => handleChange("socialRelationships", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select relationship status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strong">Strong Social Connections</SelectItem>
                <SelectItem value="moderate">Moderate Social Connections</SelectItem>
                <SelectItem value="weak">Few Social Connections</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Access to Healthcare" id="access_healthcare" required>
            <Select value={formData.accessHealthcare} onValueChange={(value) => handleChange("accessHealthcare", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select healthcare access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular_checkups">Regular Check-ups</SelectItem>
                <SelectItem value="emergency_only">Emergency Care Only</SelectItem>
                <SelectItem value="no_access">Limited Healthcare Access</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Exercise Frequency" id="exercise_frequency" required>
            <Select value={formData.exerciseFrequency} onValueChange={(value) => handleChange("exerciseFrequency", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select exercise frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">3-5 Times Weekly</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Stress Management" id="stress_management" required>
            <Select value={formData.stressManagement} onValueChange={(value) => handleChange("stressManagement", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select stress management method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="therapy">Therapy</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="none">No Stress Management</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Hydration Level" id="hydration_level" required>
            <Select value={formData.hydrationLevel} onValueChange={(value) => handleChange("hydrationLevel", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select hydration level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very_high">8+ Glasses of Water Daily</SelectItem>
                <SelectItem value="high">6-8 Glasses of Water Daily</SelectItem>
                <SelectItem value="moderate">4-6 Glasses of Water Daily</SelectItem>
                <SelectItem value="low">2-4 Glasses of Water Daily</SelectItem>
                <SelectItem value="very_low">Less than 2 Glasses Daily</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField label="Sun Exposure" id="sun_exposure" required>
            <Select value={formData.sunExposure} onValueChange={(value) => handleChange("sunExposure", value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select sun exposure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal (Indoor Most of the Time)</SelectItem>
                <SelectItem value="moderate">Moderate (15-30 mins Daily)</SelectItem>
                <SelectItem value="high">High (1-2 Hours Daily)</SelectItem>
                <SelectItem value="excessive">Excessive (2+ Hours without Protection)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormSection>
      
      <SectionHealthTips section="activity" />
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevSection} className="nav-button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNextSection} className="nav-button">
          Continue to Diet <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
