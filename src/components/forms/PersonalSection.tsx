
import React from "react";
import { FormSection } from "@/components/FormSection";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateOfBirthInput } from "@/components/DateOfBirthInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, MapPin } from "lucide-react";

interface PersonalSectionProps {
  formData: any;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleChange: (field: string, value: any) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
  handleNextSection: () => void;
}

export function PersonalSection({
  formData,
  date,
  setDate,
  handleChange,
  handlePhotoUpload,
  photoPreview,
  handleNextSection,
}: PersonalSectionProps) {
  // Handle mobile number input to allow only digits after +91 prefix
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters and limit to 10 digits
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    
    // Set the value with +91 prefix
    handleChange('mobile', `+91${digits}`);
  };

  return (
    <FormSection
      id="personal-section"
      title="Personal Information"
      description="Please provide your basic information to get started."
      icon={<User className="h-5 w-5 text-emerald-600" />}
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            id="full-name" 
            label="Full Name" 
            required
          >
            <Input 
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={(e) => handleChange('name', e.target.value)} 
            />
          </FormField>
          
          <FormField 
            id="email-address" 
            label="Email Address" 
            required
          >
            <Input 
              type="email" 
              placeholder="your.email@example.com" 
              value={formData.email} 
              onChange={(e) => handleChange('email', e.target.value)} 
            />
          </FormField>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateOfBirthInput 
            id="date-of-birth"
            date={date}
            setDate={setDate}
            required
          />
          
          <FormField 
            id="gender" 
            label="Gender" 
            required
          >
            <RadioGroup 
              value={formData.gender} 
              onValueChange={(value) => handleChange('gender', value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </FormField>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            id="mobile-number" 
            label="Mobile Number" 
            required
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-md px-2 border-r">
                <span className="text-gray-500 text-sm font-medium">+91</span>
              </div>
              <Input 
                type="text" 
                placeholder="Enter 10-digit number" 
                value={formData.mobile.replace('+91', '')} 
                onChange={handleMobileChange}
                className="pl-14"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Format: +91 followed by 10 digits</p>
          </FormField>
          
          <FormField 
            id="photo-upload" 
            label="Upload Your Photo (optional)"
          >
            <div className="flex flex-col items-start">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="max-w-full"
              />
              {photoPreview && (
                <div className="mt-2">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-full border shadow-sm" 
                  />
                </div>
              )}
            </div>
          </FormField>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            id="height" 
            label="Height (cm)" 
            required
          >
            <Input 
              type="number" 
              placeholder="Height in centimeters" 
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)} 
            />
          </FormField>
          
          <FormField 
            id="weight" 
            label="Weight (kg)" 
            required
          >
            <Input 
              type="number" 
              placeholder="Weight in kilograms" 
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)} 
            />
          </FormField>
        </div>
        
        <FormField 
          id="location" 
          label="Location" 
          required
        >
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
            <RadioGroup 
              value={formData.location} 
              onValueChange={(value) => handleChange('location', value)}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urban" id="urban" />
                <Label htmlFor="urban">Urban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suburban" id="suburban" />
                <Label htmlFor="suburban">Suburban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rural" id="rural" />
                <Label htmlFor="rural">Rural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none_location" />
                <Label htmlFor="none_location">None</Label>
              </div>
            </RadioGroup>
          </div>
        </FormField>
        
        <div className="flex justify-end">
          <Button onClick={handleNextSection} className="mt-4">
            Next Step
          </Button>
        </div>
      </div>
    </FormSection>
  );
}
