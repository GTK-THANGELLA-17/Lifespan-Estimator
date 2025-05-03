
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Heart, Activity, Dumbbell, Utensils, Clock } from "lucide-react";

interface ResultDataProps {
  selectedData: Record<string, any> | null;
  photoPreview?: string | null;
}

export function ResultData({ selectedData, photoPreview }: ResultDataProps) {
  if (!selectedData) return null;

  const { personalInfo, healthInfo, lifestyleInfo, activityInfo, dietInfo, habitInfo } = selectedData;

  const renderSection = (
    title: string,
    data: Record<string, any>,
    icon: JSX.Element
  ) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-medium text-base text-card-foreground">{title}</h3>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="flex items-start gap-1">
            <span className="text-sm text-muted-foreground capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim().replace(/_/g, ' ')}:
            </span>
            <span className="text-sm font-medium ml-1 text-card-foreground">
              {Array.isArray(value) ? value.join(', ') : value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {photoPreview && (
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-md">
                <img 
                  src={photoPreview} 
                  alt={personalInfo.name || "User"} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <h2 className="mt-2 text-center text-lg font-medium text-card-foreground">
                {personalInfo.name}
              </h2>
            </div>
          )}
          
          <div className="flex-1 space-y-6">
            {renderSection("Personal Information", personalInfo, 
              <User className="h-5 w-5 text-violet-500" />
            )}
            
            <Separator />
            
            {renderSection("Health Information", healthInfo, 
              <Heart className="h-5 w-5 text-rose-500" />
            )}
            
            <Separator />
            
            {renderSection("Lifestyle Information", lifestyleInfo, 
              <Activity className="h-5 w-5 text-amber-500" />
            )}
            
            <Separator />
            
            {renderSection("Activity Information", activityInfo, 
              <Dumbbell className="h-5 w-5 text-emerald-500" />
            )}
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSection("Diet Information", dietInfo, 
                <Utensils className="h-5 w-5 text-cyan-500" />
              )}
              
              {renderSection("Habit Information", habitInfo, 
                <Clock className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
