
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

export function InfoModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        variant="outline"
        className="flex gap-2 items-center animate-fade-in"
      >
        <Info className="h-4 w-4" />
        Before Calculation Read This
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Understanding Your Estimated Lifespan</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Important information about this calculation
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] px-1">
            <div className="space-y-4 py-2 text-foreground/90">
              <p>
                This calculation is not applicable to individuals who engage in high-risk activities, activities that humans should avoid, and those who do not prioritize safe living, thereby increasing the risk of their lifespan being cut short due to their risky behaviors.
              </p>
              <p>
                Instead, this calculation is based on individuals who lead their daily lives safely, considering both healthy and unhealthy situations, as well as favorable and unfavorable conditions in the environment they inhabit.
              </p>
              <p className="text-destructive">
                Don't take this estimation seriously; it's just a calculation meant to raise awareness about health for people. Remember, health statistics can vary widely and should be interpreted with caution. The goal here is to spark conversations and encourage proactive health behaviors among individuals and communities.
              </p>
              
              <h3 className="text-xl font-bold mt-6">Understanding Your Estimated Lifespan</h3>
              <p>Our tool provides an estimation of your remaining lifespan based on various factors that you select. Here's an overview of what influences the estimation:</p>
              
              <h4 className="text-lg font-semibold mt-4">Your Health and Lifestyle</h4>
              <p>Your current health status, lifestyle habits, and medical conditions significantly impact your estimated lifespan.</p>
              
              <h4 className="text-lg font-semibold mt-4">Environmental Factors</h4>
              <p>Where you live, the quality of the air you breathe, exposure to pollution, and access to green spaces all play a role in determining your estimated lifespan.</p>
              
              <h4 className="text-lg font-semibold mt-4">Social Connections</h4>
              <p>The strength of your social relationships and access to healthcare services also influence your estimated lifespan.</p>
              
              <h4 className="text-lg font-semibold mt-4">Additional Lifestyle Factors</h4>
              <p>Your dietary choices, alcohol consumption habits, hydration level, sun exposure, screen time, exercise frequency, and stress management techniques are all considered.</p>
              
              <h4 className="text-lg font-semibold mt-4">Mental Well-being</h4>
              <p>Your mental health status, including conditions like anxiety, depression, and stress, can affect your estimated lifespan.</p>
              
              <h4 className="text-lg font-semibold mt-4">Result Interpretation</h4>
              <p>Your estimated remaining lifespan is calculated based on these factors. A positive remaining lifespan indicates a relatively good outlook, while a lifespan of less than 40 years may suggest areas for improvement.</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
