
export interface HealthData {
  // Basic info
  personalInfo?: {
    name?: string;
    age?: number;
    gender?: string;
    dob?: string;
    height?: number;
    weight?: number;
    email?: string;
    phone?: string;
    photo?: string;
  };
  
  // Health status
  medicalHistory?: {
    conditions?: string[];
    medications?: string[];
    surgeries?: string[];
    allergies?: string[];
    chronicIllnesses?: string[];
    familyHistory?: string[];
  };
  
  // Lifestyle factors
  lifestyle?: {
    smokingStatus?: string;
    alcoholConsumption?: string;
    physicalActivity?: string;
    sleepHours?: number;
    dietType?: string;
    stressLevel?: string;
    images?: string[];
  };
  
  // Environment
  environment?: {
    location?: string;
    pollution?: string;
    livingConditions?: string;
    occupation?: string;
    exposures?: string[];
  };
  
  // Mental health
  mentalHealth?: {
    diagnosis?: string[];
    stressManagement?: string;
    socialConnections?: string;
    mentalWellbeing?: string;
  };
  
  // Preventative care
  preventativeCare?: {
    regularcheckups?: boolean;
    vaccinations?: boolean;
    screenings?: string[];
    healthInsurance?: boolean;
  };
}

export type HealthSection = keyof HealthData;
