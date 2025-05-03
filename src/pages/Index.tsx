import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EnhancedLoadingSpinner } from "@/components/EnhancedLoadingSpinner";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResultSection } from "@/components/ResultSection";
import { HealthTips } from "@/components/HealthTips";
import { format, differenceInYears, differenceInMonths, addYears } from "date-fns";
import { 
  Calculator, 
  Heart,
  Dumbbell, 
  Timer, 
  Utensils, 
  User
} from "lucide-react";
import { DeveloperModal } from "@/components/DeveloperModal";
import { AppHeader } from "@/components/Layout/AppHeader";
import { AppFooter } from "@/components/Layout/AppFooter";
import { PersonalSection } from "@/components/forms/PersonalSection";
import { HealthSection } from "@/components/forms/HealthSection";
import { LifestyleSection } from "@/components/forms/LifestyleSection";
import { ActivitySection } from "@/components/forms/ActivitySection";
import { DietSection } from "@/components/forms/DietSection";
import { CalculateSection } from "@/components/forms/CalculateSection";
import { InitialAcknowledgment } from "@/components/InitialAcknowledgment";

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [estimationType, setEstimationType] = useState<"user" | "system">("user");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<Record<string, any> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [sectionAnimation, setSectionAnimation] = useState(false);
  
  // Map of sections for navigation
  const sections = ["personal", "health", "lifestyle", "activity", "diet", "calculate"];
  
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    mobile: "",
    email: "",
    photo: null as File | null,
    location: "",
    medicalCondition: "",
    currentSituation: "",
    lifestyleHabits: [] as string[],
    mentalHealth: "",
    sleepPatterns: "",
    environmentalFactors: "",
    socialRelationships: "",
    accessHealthcare: "",
    exerciseFrequency: "",
    stressManagement: "",
    hydrationLevel: "",
    sunExposure: "",
    dietType: "",
    alcoholConsumption: "",
    screenTime: "",
    userEstimatedLifespan: "",
    smokingYears: "",
    height: "",
    weight: "",
    chronicConditions: [] as string[],
    familyHistory: [] as string[]
  });
  
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Set up section transitions
  useEffect(() => {
    setSectionAnimation(true);
    const timer = setTimeout(() => {
      setSectionAnimation(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLifestyleChange = (habit: string) => {
    setFormData(prev => {
      const current = [...prev.lifestyleHabits];
      if (current.includes(habit)) {
        return { ...prev, lifestyleHabits: current.filter(h => h !== habit) };
      } else {
        return { ...prev, lifestyleHabits: [...current, habit] };
      }
    });
  };
  
  const handleChronicConditionsChange = (condition: string) => {
    setFormData(prev => {
      const current = [...prev.chronicConditions];
      if (current.includes(condition)) {
        return { ...prev, chronicConditions: current.filter(c => c !== condition) };
      } else {
        return { ...prev, chronicConditions: [...current, condition] };
      }
    });
  };
  
  const handleFamilyHistoryChange = (condition: string) => {
    setFormData(prev => {
      const current = [...prev.familyHistory];
      if (current.includes(condition)) {
        return { ...prev, familyHistory: current.filter(c => c !== condition) };
      } else {
        return { ...prev, familyHistory: [...current, condition] };
      }
    });
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  
  const validateMobile = (mobile: string) => {
    return /^\+91\d{10}$/.test(mobile);
  };

  const calculateBMI = () => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    
    if (!height || !weight) return null;
    
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };
  
  // Navigation handlers
  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  const handlePrevSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  // Enhanced acknowledgment
  const handleAcknowledgmentChange = (checked: boolean) => {
    setAcknowledged(checked);
    if (checked) {
      toast({
        title: "Thank you for acknowledging",
        description: "You can now proceed with the lifespan calculation.",
      });
    }
  };
  
  const calculateLifespan = () => {
    if (!acknowledged) {
      toast({
        title: "Acknowledgment Required",
        description: "Please read and acknowledge the information before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.name || !date || !formData.gender || !formData.mobile || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill all required personal information fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateMobile(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please provide a valid mobile number starting with +91 followed by 10 digits.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.medicalCondition || !formData.currentSituation || !formData.location ||
        !formData.mentalHealth || !formData.sleepPatterns || !formData.environmentalFactors ||
        !formData.socialRelationships || !formData.accessHealthcare || !formData.exerciseFrequency ||
        !formData.stressManagement || !formData.hydrationLevel || !formData.sunExposure ||
        !formData.dietType || !formData.alcoholConsumption || !formData.screenTime) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields to calculate your lifespan estimation.",
        variant: "destructive"
      });
      return;
    }
    
    if (estimationType === "user" && !formData.userEstimatedLifespan) {
      toast({
        title: "Missing Estimation",
        description: "Please enter your estimated lifespan in years.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Reduced timeout for better responsiveness
    setTimeout(() => {
      const today = new Date();
      const birthDate = date!;
      let age = differenceInYears(today, birthDate);
      const monthDiff = differenceInMonths(today, birthDate) % 12;
      
      let baseLifespan;
      if (formData.gender === "male") {
        baseLifespan = 76.1;
      } else if (formData.gender === "female") {
        baseLifespan = 81.1;
      } else {
        baseLifespan = 78.6;
      }
      
      let remainingYears;
      if (estimationType === "user") {
        remainingYears = parseInt(formData.userEstimatedLifespan) - age;
      } else {
        remainingYears = baseLifespan - age;
      }
      
      // Apply various factors to modify the lifespan estimate
      const bmi = calculateBMI();
      if (bmi) {
        if (bmi < 18.5) {
          remainingYears -= 2;
        } else if (bmi >= 25 && bmi < 30) {
          remainingYears -= 3;
        } else if (bmi >= 30 && bmi < 35) {
          remainingYears -= 5;
        } else if (bmi >= 35) {
          remainingYears -= 8;
        }
      }
      
      if (formData.medicalCondition === "bad") {
        remainingYears -= 6;
      }
      
      if (formData.currentSituation === "unhealthy") {
        remainingYears -= 4;
      }
      
      if (formData.location === "urban") {
        remainingYears -= 2;
      } else if (formData.location === "rural") {
        remainingYears += 1;
      }
      
      if (formData.lifestyleHabits.includes("smoking")) {
        const smokingYears = parseInt(formData.smokingYears) || 0;
        if (smokingYears > 0) {
          remainingYears -= 4 + (smokingYears * 0.2);
        } else {
          remainingYears -= 8;
        }
      }
      
      if (formData.lifestyleHabits.includes("alcohol")) {
        remainingYears -= 3;
      }
      
      if (formData.lifestyleHabits.includes("diet")) {
        remainingYears -= 2;
      }
      
      if (formData.lifestyleHabits.includes("exercise")) {
        remainingYears += 4;
      }
      
      if (formData.lifestyleHabits.includes("stress")) {
        remainingYears -= 4;
      }
      
      formData.chronicConditions.forEach(condition => {
        switch(condition) {
          case "diabetes":
            remainingYears -= 7;
            break;
          case "hypertension":
            remainingYears -= 5;
            break;
          case "heart_disease":
            remainingYears -= 8;
            break;
          case "cancer":
            remainingYears -= 10;
            break;
          case "respiratory":
            remainingYears -= 6;
            break;
        }
      });
      
      formData.familyHistory.forEach(condition => {
        switch(condition) {
          case "longevity":
            remainingYears += 4;
            break;
          case "heart_disease":
            remainingYears -= 3;
            break;
          case "cancer":
            remainingYears -= 2;
            break;
          case "diabetes":
            remainingYears -= 2;
            break;
        }
      });
      
      if (formData.mentalHealth === "anxiety" || formData.mentalHealth === "depression") {
        remainingYears -= 6;
      } else if (formData.mentalHealth === "Burnout") {
        remainingYears -= 4;
      } else if (formData.mentalHealth === "other") {
        remainingYears -= 2;
      }
      
      if (formData.sleepPatterns === "insomnia") {
        remainingYears -= 5;
      } else if (formData.sleepPatterns === "other") {
        remainingYears -= 2;
      }
      
      if (formData.environmentalFactors === "pollution") {
        remainingYears -= 3;
      } else if (formData.environmentalFactors === "air_quality") {
        remainingYears += 2;
      } else if (formData.environmentalFactors === "green_spaces") {
        remainingYears += 1;
      } else if (formData.environmentalFactors === "natural_disasters") {
        remainingYears -= 5;
      }
      
      if (formData.socialRelationships === "weak") {
        remainingYears -= 3;
      } else if (formData.socialRelationships === "strong") {
        remainingYears += 2;
      }
      
      if (formData.accessHealthcare === "emergency_only") {
        remainingYears -= 5;
      } else if (formData.accessHealthcare === "no_access") {
        remainingYears -= 8;
      } else if (formData.accessHealthcare === "regular_checkups") {
        remainingYears += 3;
      }
      
      if (formData.exerciseFrequency === "daily") {
        remainingYears += 3;
      } else if (formData.exerciseFrequency === "never") {
        remainingYears -= 6;
      }
      
      if (formData.stressManagement === "none") {
        remainingYears -= 3;
      } else if (formData.stressManagement === "meditation" || formData.stressManagement === "yoga") {
        remainingYears += 2;
      }
      
      if (formData.dietType === "balanced") {
        remainingYears += 3;
      } else if (formData.dietType === "mediterranean") {
        remainingYears += 2;
      }
      
      if (formData.alcoholConsumption === "none") {
        remainingYears += 2;
      } else if (formData.alcoholConsumption === "heavy") {
        remainingYears -= 5;
      }
      
      if (formData.hydrationLevel === "very_low") {
        remainingYears -= 3;
      } else if (formData.hydrationLevel === "very_high") {
        remainingYears += 2;
      }
      
      if (formData.screenTime === "6+") {
        remainingYears -= 5;
      }
      
      const predictedDate = addYears(today, Math.max(0, Math.round(remainingYears)));
      const predictedYear = predictedDate.getFullYear();
      
      // Generate the result text
      let resultText;
      if (remainingYears <= 40 && remainingYears >= 1) {
        resultText = `Based on your current age and selected factors, your remaining estimated lifespan is approximately ${Math.round(remainingYears)} years (until around ${predictedYear}).`;
      } else if (remainingYears <= 0) {
        resultText = "Based on your selected factors, you have reached or exceeded the average estimated lifespan for someone with your profile.";
      } else {
        resultText = `Based on your current age and selected factors, your remaining estimated lifespan is approximately ${Math.round(remainingYears)} years (until around ${predictedYear}).`;
      }
      
      setResult(resultText);
      
      // Prepare selected data for display
      setSelectedData({
        personalInfo: {
          name: formData.name,
          gender: formData.gender,
          dateOfBirth: format(date!, "PPP"),
          mobile: formData.mobile,
          email: formData.email,
          location: formData.location,
          height: formData.height ? `${formData.height} cm` : "Not provided",
          weight: formData.weight ? `${formData.weight} kg` : "Not provided",
          bmi: bmi ? bmi.toFixed(1) : "Not calculated"
        },
        healthInfo: {
          medicalCondition: formData.medicalCondition,
          currentSituation: formData.currentSituation,
          chronicConditions: formData.chronicConditions.length ? formData.chronicConditions.join(", ") : "None",
          familyHistory: formData.familyHistory.length ? formData.familyHistory.join(", ") : "None"
        },
        lifestyleInfo: {
          lifestyleHabits: formData.lifestyleHabits.length ? formData.lifestyleHabits : "None",
          smokingYears: formData.smokingYears || "Not applicable",
          mentalHealth: formData.mentalHealth,
          sleepPatterns: formData.sleepPatterns,
          environmentalFactors: formData.environmentalFactors,
          socialRelationships: formData.socialRelationships,
          accessHealthcare: formData.accessHealthcare
        },
        activityInfo: {
          exerciseFrequency: formData.exerciseFrequency,
          stressManagement: formData.stressManagement,
          hydrationLevel: formData.hydrationLevel,
          sunExposure: formData.sunExposure
        },
        dietInfo: {
          dietType: formData.dietType
        },
        habitInfo: {
          alcoholConsumption: formData.alcoholConsumption,
          screenTime: formData.screenTime
        }
      });
      
      setShowResults(true);
      
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      toast({
        title: "Calculation Complete",
        description: "Your lifespan estimation has been calculated!",
      });
    }, 800); // Reduced for better responsiveness
  };
  
  return (
    <div className="page-container">
      <EnhancedLoadingSpinner />
      <ThemeToggle />
      
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 main-content">
        <InitialAcknowledgment 
          acknowledged={acknowledged}
          handleAcknowledgmentChange={handleAcknowledgmentChange}
        />
        
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap justify-start md:justify-center">
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Personal
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-1">
              <Heart className="h-4 w-4" /> Health
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" /> Lifestyle
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <Timer className="h-4 w-4" /> Activity
            </TabsTrigger>
            <TabsTrigger value="diet" className="flex items-center gap-1">
              <Utensils className="h-4 w-4" /> Diet
            </TabsTrigger>
            <TabsTrigger value="calculate" className="flex items-center gap-1">
              <Calculator className="h-4 w-4" /> Calculate
            </TabsTrigger>
          </TabsList>
          
          <div ref={formRef}>
            <TabsContent value="personal" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <PersonalSection 
                formData={formData}
                date={date}
                setDate={setDate}
                handleChange={handleChange}
                handlePhotoUpload={handlePhotoUpload}
                photoPreview={photoPreview}
                handleNextSection={handleNextSection}
              />
            </TabsContent>
            
            <TabsContent value="health" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <HealthSection 
                formData={formData}
                handleChange={handleChange}
                handleChronicConditionsChange={handleChronicConditionsChange}
                handleFamilyHistoryChange={handleFamilyHistoryChange}
                handleNextSection={handleNextSection}
                handlePrevSection={handlePrevSection}
              />
            </TabsContent>
            
            <TabsContent value="lifestyle" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <LifestyleSection 
                formData={formData}
                handleChange={handleChange}
                handleLifestyleChange={handleLifestyleChange}
                handleNextSection={handleNextSection}
                handlePrevSection={handlePrevSection}
              />
            </TabsContent>
            
            <TabsContent value="activity" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <ActivitySection 
                formData={formData}
                handleChange={handleChange}
                handleNextSection={handleNextSection}
                handlePrevSection={handlePrevSection}
              />
            </TabsContent>
            
            <TabsContent value="diet" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <DietSection 
                formData={formData}
                handleChange={handleChange}
                handleNextSection={handleNextSection}
                handlePrevSection={handlePrevSection}
              />
            </TabsContent>
            
            <TabsContent value="calculate" className={`mt-0 ${sectionAnimation ? 'section-enter' : 'section-enter-active'}`}>
              <CalculateSection 
                formData={formData}
                handleChange={handleChange}
                estimationType={estimationType}
                setEstimationType={setEstimationType}
                calculateLifespan={calculateLifespan}
                loading={loading}
                handlePrevSection={handlePrevSection}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        {showResults && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            <ResultSection 
              result={result}
              selectedData={selectedData}
              photoPreview={photoPreview}
              visible={showResults}
            />
            <HealthTips selectedData={selectedData} />
          </div>
        )}
        
        <AppFooter setShowDeveloperModal={setShowDeveloperModal} />
        
        <DeveloperModal
          open={showDeveloperModal}
          onOpenChange={setShowDeveloperModal}
        />
      </main>
    </div>
  );
};

export default Index;
