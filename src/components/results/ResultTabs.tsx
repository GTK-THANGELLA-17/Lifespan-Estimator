
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResultData } from "./ResultData"; 
import { ResultCharts } from "./ResultCharts";
import { PieChart, BarChart, User, Loader2, AreaChart, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultTabsProps {
  result: string;
  selectedData: Record<string, any> | null;
  showCharts: boolean;
  photoPreview?: string | null;
}

export function ResultTabs({ result, selectedData, showCharts, photoPreview }: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState("result");
  const [isLoading, setIsLoading] = useState(false);
  
  // Add loading effect when switching tabs
  useEffect(() => {
    if (activeTab === "chart" || activeTab === "trends" || activeTab === "visual") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Format the result string to make sure it starts with the estimated lifespan text
  const formattedResult = () => {
    if (!result) return "";
    
    // If the result doesn't contain the text about estimated lifespan, add it
    if (!result.includes("Based on your current age")) {
      const { personalInfo } = selectedData || {};
      const age = personalInfo?.age || "";
      if (age) {
        return `Based on your current age (${age}) and selected factors, your remaining estimated lifespan is approximately ${result}`;
      }
    }
    return result;
  };
  
  return (
    <motion.div 
      className="mb-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-lg mb-6 font-lato p-4 bg-primary/5 rounded-lg border border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-card-foreground">
          {formattedResult()}
        </p>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 relative overflow-hidden">
          <motion.div 
            className="absolute h-full bg-primary/10 rounded-md z-0"
            animate={{ 
              left: activeTab === "result" ? "0%" : 
                   activeTab === "chart" ? "25%" : 
                   activeTab === "trends" ? "50%" : "75%",
              width: "25%"
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
          <TabsTrigger value="result" className="flex items-center gap-1 z-10">
            <User className="h-4 w-4 text-primary" /> Data
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-1 z-10">
            <PieChart className="h-4 w-4 text-orange-500" /> Chart
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1 z-10">
            <BarChart className="h-4 w-4 text-green-500" /> Trends
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-1 z-10">
            <Image className="h-4 w-4 text-purple-500" /> Visual
          </TabsTrigger>
        </TabsList>
        
        {/* Container with fixed height and overflow handling */}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ResultData selectedData={selectedData} photoPreview={photoPreview} />
              </motion.div>
            )}
            
            {activeTab === "chart" && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {isLoading ? (
                  <div className="text-center py-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Loader2 className="h-10 w-10 text-primary" />
                    </motion.div>
                    <div className="mt-4 space-y-3">
                      <Skeleton className="h-6 w-32 mx-auto" />
                      <Skeleton className="h-4 w-48 mx-auto" />
                    </div>
                  </div>
                ) : showCharts ? (
                  <div className="w-full overflow-x-hidden">
                    <ResultCharts selectedData={selectedData} showCharts={true} chartType="pie" />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <p className="text-muted-foreground">No chart data available</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {activeTab === "trends" && (
              <motion.div
                key="trends"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {isLoading ? (
                  <div className="text-center py-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Loader2 className="h-10 w-10 text-primary" />
                    </motion.div>
                    <div className="mt-4 space-y-3">
                      <Skeleton className="h-6 w-32 mx-auto" />
                      <Skeleton className="h-4 w-48 mx-auto" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full overflow-x-hidden">
                    <ResultCharts selectedData={selectedData} showCharts={true} chartType="area" />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "visual" && (
              <motion.div
                key="visual"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {isLoading ? (
                  <div className="text-center py-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Loader2 className="h-10 w-10 text-primary" />
                    </motion.div>
                    <div className="mt-4 space-y-3">
                      <Skeleton className="h-6 w-32 mx-auto" />
                      <Skeleton className="h-4 w-48 mx-auto" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full overflow-x-hidden">
                    <ResultCharts selectedData={selectedData} showCharts={true} chartType="radar" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </motion.div>
  );
}
