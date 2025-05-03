
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { ResultTabs } from "./results/ResultTabs";
import { ResultActions } from "./results/ResultActions";
import { AIAssistant } from "./AIAssistant"; 
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SectionTransition } from "./SectionTransition";
import { exportToImage } from "@/utils/exportToImage";

export interface ResultSectionProps {
  result: string | null;
  selectedData: Record<string, any> | null;
  photoPreview?: string | null;
  visible: boolean;
}

export function ResultSection({ result, selectedData, photoPreview, visible }: ResultSectionProps) {
  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeResultTab, setActiveResultTab] = useState("results");

  // Add animation for revealing charts
  useEffect(() => {
    if (visible && result) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setShowCharts(true);
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visible, result]);

  const handleDownloadImage = () => {
    exportToImage("result-capture", "health-results");
  };

  if (!visible || !result) return null;

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs value={activeResultTab} onValueChange={setActiveResultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="results" className="flex-1">
              Results & Data
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex-1">
              AI Health Assistant
            </TabsTrigger>
          </TabsList>
          
          <SectionTransition isActive={activeResultTab === "results"} direction="right">
            {isLoading ? (
              <Card className="border-primary/30 bg-primary/5 shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-[280px]" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block p-4 rounded-full bg-primary/10 animate-pulse">
                        <Calculator className="h-10 w-10 text-primary/50" />
                      </div>
                      <p className="mt-4 text-muted-foreground">Loading your results...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card id="result-capture" className="border-primary/30 bg-primary/5 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Calculator className="h-6 w-6 text-primary animate-pulse" />
                    Your Lifespan Estimation Result
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 overflow-hidden">
                  <div className="w-full overflow-hidden">
                    <ResultTabs 
                      result={result} 
                      selectedData={selectedData} 
                      showCharts={showCharts}
                      photoPreview={photoPreview}
                    />
                  </div>
                  
                  <ResultActions 
                    result={result} 
                    selectedData={selectedData}
                    onDownloadImage={handleDownloadImage}
                  />
                </CardContent>
              </Card>
            )}
          </SectionTransition>
          
          <SectionTransition isActive={activeResultTab === "assistant"} direction="left">
            <Card className="border-primary/30 bg-primary/5 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <AIAssistant selectedData={selectedData} />
              </CardContent>
            </Card>
          </SectionTransition>
        </Tabs>
      </motion.div>
    </div>
  );
}
