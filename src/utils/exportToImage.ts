
import { toast } from "@/components/ui/use-toast";
import html2canvas from 'html2canvas';

export const exportToImage = async (elementId: string, filename: string = 'lifespan-result') => {
  try {
    toast({
      title: "Capturing Image",
      description: "Converting your results to an image...",
    });

    const element = document.getElementById(elementId);
    if (!element) {
      toast({
        title: "Error",
        description: "Could not find the results section to capture.",
        variant: "destructive",
      });
      return;
    }

    // Make sure any hidden elements that should be in the image are temporarily visible
    const originalHeight = element.style.maxHeight;
    const originalOverflow = element.style.overflow;
    
    element.style.maxHeight = 'none'; // Remove any max-height constraints
    element.style.overflow = 'visible'; // Ensure all content is visible
    
    // Use html2canvas to create a canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      backgroundColor: window.getComputedStyle(document.body).backgroundColor || '#ffffff',
      logging: false,
      useCORS: true, // To handle images from different domains
      allowTaint: true,
      windowWidth: 1200, // Set a fixed width for more consistent results
      onclone: (clonedDoc) => {
        // Make sure result text is visible in the clone
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          const resultTexts = clonedElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
          resultTexts.forEach(el => {
            (el as HTMLElement).style.color = window.getComputedStyle(el).color;
            (el as HTMLElement).style.visibility = 'visible';
          });
        }
      }
    });
    
    // Restore original styling
    element.style.maxHeight = originalHeight;
    element.style.overflow = originalOverflow;

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        toast({
          title: "Error",
          description: "Failed to create image.",
          variant: "destructive",
        });
        return;
      }

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = url;
      link.click();

      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      toast({
        title: "Download Complete",
        description: "Your results have been saved as an image.",
        variant: "default",
      });
    }, 'image/png');
    
  } catch (error) {
    console.error("Error exporting to image:", error);
    toast({
      title: "Error",
      description: "Failed to export results as an image.",
      variant: "destructive",
    });
  }
};
