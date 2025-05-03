
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, Share2, Heart, Save, FileDown, Mail, Copy, Image as ImageIcon,
  Facebook, Twitter, Linkedin, Instagram, Link, MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ResultActionsProps {
  result: string | null;
  selectedData: Record<string, any> | null;
  onDownloadImage?: () => void;
}

export function ResultActions({ result, selectedData, onDownloadImage }: ResultActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    toast({
      title: "Results Saved",
      description: "Your results have been saved successfully.",
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(getFullResult());
      toast({
        title: "Results Copied",
        description: "Your results have been copied to clipboard.",
      });
    }
  };

  const getFullResult = () => {
    if (!result || !selectedData) return "";
    
    const { personalInfo, healthInfo, lifestyleInfo, activityInfo, dietInfo, habitInfo } = selectedData;
    const name = personalInfo?.name || "User";
    const age = personalInfo?.age || "N/A";
    
    return `
Lifespan Estimation Results for ${name}

${result}

Personal Information:
- Gender: ${personalInfo?.gender || "N/A"}
- Date of Birth: ${personalInfo?.dateOfBirth || "N/A"}
- Height: ${personalInfo?.height || "N/A"}
- Weight: ${personalInfo?.weight || "N/A"}
- BMI: ${personalInfo?.bmi || "N/A"}
- Location: ${personalInfo?.location || "N/A"}

Health Information:
- Medical Condition: ${healthInfo?.medicalCondition || "N/A"}
- Current Situation: ${healthInfo?.currentSituation || "N/A"}
- Chronic Conditions: ${healthInfo?.chronicConditions || "None"}
- Family History: ${healthInfo?.familyHistory || "None"}

Lifestyle Information:
- Habits: ${Array.isArray(lifestyleInfo?.lifestyleHabits) ? lifestyleInfo?.lifestyleHabits.join(", ") : lifestyleInfo?.lifestyleHabits || "None"}
- Mental Health: ${lifestyleInfo?.mentalHealth || "N/A"}
- Sleep Patterns: ${lifestyleInfo?.sleepPatterns || "N/A"}
- Social Relationships: ${lifestyleInfo?.socialRelationships || "N/A"}

Activity & Diet Information:
- Exercise Frequency: ${activityInfo?.exerciseFrequency || "N/A"}
- Stress Management: ${activityInfo?.stressManagement || "N/A"}
- Diet Type: ${dietInfo?.dietType || "N/A"}
- Alcohol Consumption: ${habitInfo?.alcoholConsumption || "N/A"}

This estimation is based on your personal health data and lifestyle factors.
    `;
  };

  const handleShareSocial = (platform: string) => {
    const fullResult = getFullResult();
    const encodedText = encodeURIComponent(fullResult);
    let shareUrl = "";
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${window.location.href}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=My%20Lifespan%20Estimation&summary=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      case 'email':
        const subject = "My Health Lifespan Estimation Results";
        shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodedText}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    toast({
      title: "Sharing Results",
      description: `Sharing to ${platform}...`,
    });
  };

  const shareOptions = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5 text-blue-600" />, id: "facebook" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5 text-sky-500" />, id: "twitter" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5 text-blue-800" />, id: "linkedin" },
    { name: "WhatsApp", icon: <MessageCircle className="h-5 w-5 text-green-600" />, id: "whatsapp" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5 text-pink-600" />, id: "instagram" },
    { name: "Email", icon: <Mail className="h-5 w-5 text-gray-600" />, id: "email" },
  ];

  return (
    <motion.div 
      className="mt-6 flex flex-wrap items-center justify-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Button 
        variant="secondary" 
        className="group flex items-center gap-2"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4 group-hover:text-iceblue transition-colors" />
        <span>Copy Results</span>
      </Button>
      
      <Button 
        variant={isSaved ? "outline" : "secondary"} 
        className={`group flex items-center gap-2 ${isSaved ? "border-green-500" : ""}`}
        onClick={handleSave}
      >
        <Heart className={`h-4 w-4 ${isSaved ? "text-rose-500 fill-rose-500" : "group-hover:text-iceblue"} transition-colors`} />
        <span>{isSaved ? "Saved" : "Save Results"}</span>
      </Button>
      
      <Button 
        variant="secondary" 
        className="group flex items-center gap-2"
        onClick={onDownloadImage}
      >
        <ImageIcon className="h-4 w-4 group-hover:text-iceblue transition-colors" />
        <span>Save as Image</span>
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="group flex items-center gap-2">
            <Share2 className="h-4 w-4 group-hover:text-iceblue transition-colors" />
            <span>Share Results</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your results</DialogTitle>
            <DialogDescription>
              Choose a platform to share your health results with others
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {shareOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="flex items-center justify-center gap-2 h-20 hover:bg-primary/10 transition-colors"
                onClick={() => handleShareSocial(option.id)}
              >
                <div className="flex flex-col items-center">
                  {option.icon}
                  <span className="mt-2 text-sm">{option.name}</span>
                </div>
              </Button>
            ))}
            <Button
              variant="outline" 
              className="flex items-center justify-center gap-2 h-20 hover:bg-primary/10 transition-colors"
              onClick={handleCopy}
            >
              <div className="flex flex-col items-center">
                <Link className="h-5 w-5 text-gray-600" />
                <span className="mt-2 text-sm">Copy Link</span>
              </div>
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
