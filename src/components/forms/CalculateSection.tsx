
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { Calculator, User, ChevronLeft } from "lucide-react";
import { SectionHealthTips } from "@/components/SectionHealthTips";

interface CalculateSectionProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  estimationType: "user" | "system";
  setEstimationType: (type: "user" | "system") => void;
  calculateLifespan: () => void;
  loading: boolean;
  handlePrevSection: () => void;
}

export function CalculateSection({
  formData,
  handleChange,
  estimationType,
  setEstimationType,
  calculateLifespan,
  loading,
  handlePrevSection
}: CalculateSectionProps) {
  return (
    <>
      <FormSection 
        id="calculateInfo" 
        title="Calculate Lifespan" 
        icon={<Calculator className="h-5 w-5" />}
        description="Choose your estimation type and calculate your estimated lifespan."
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <Label className="text-base">Estimation Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={`cursor-pointer border-2 transition-all ${estimationType === "system" ? "border-primary" : ""}`}
                onClick={() => setEstimationType("system")}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Calculator className="h-10 w-10 mb-2 mt-2 text-primary" />
                  <h3 className="font-semibold mb-1">System Estimate</h3>
                  <p className="text-sm text-muted-foreground">Our algorithm calculates based on your inputs</p>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer border-2 transition-all ${estimationType === "user" ? "border-primary" : ""}`}
                onClick={() => setEstimationType("user")}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <User className="h-10 w-10 mb-2 mt-2 text-primary" />
                  <h3 className="font-semibold mb-1">User Estimate</h3>
                  <p className="text-sm text-muted-foreground">Start with your own estimate and adjust</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {estimationType === "user" && (
            <FormField 
              label="Your Estimated Lifespan (years)"
              id="estimated_lifespan"
              helpText="Enter your estimation of your total lifespan in years"
            >
              <Input
                id="estimated_lifespan"
                type="number"
                placeholder="e.g., 85"
                min="20"
                max="120"
                value={formData.userEstimatedLifespan}
                onChange={(e) => handleChange("userEstimatedLifespan", e.target.value)}
                className="bg-background/50"
              />
            </FormField>
          )}
          
          <div className="flex justify-center">
            <Button onClick={calculateLifespan} disabled={loading} className="w-full md:w-auto md:px-8 py-6 text-lg">
              {loading ? (
                <>
                  <span className="mr-2 animate-spin">⟳</span>
                  Calculating...
                </>
              ) : (
                <>
                  Calculate Estimated Lifespan
                  <Calculator className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </FormSection>
      
      <SectionHealthTips section="calculate" />
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevSection} className="nav-button">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </>
  );
}
