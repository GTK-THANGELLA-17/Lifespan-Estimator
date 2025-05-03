
import { toast } from "@/components/ui/use-toast";
import { HealthData } from "../types/healthData";

export const exportToPDF = (
  result: string,
  selectedData: Record<string, any> | null
) => {
  toast({
    title: "Exporting PDF",
    description: "Your PDF is being generated...",
  });
  
  // In a real implementation, this would use a library like jsPDF
  // For now, we'll simulate the PDF generation
  
  setTimeout(() => {
    // Format the data properly
    let textContent = `Lifespan Estimation Results\n\n${result}\n\n`;
    
    if (selectedData) {
      textContent += "Selected Data:\n";
      
      Object.entries(selectedData).forEach(([category, data]) => {
        const formattedCategory = formatCategoryName(category);
        textContent += `\n${formattedCategory}:\n`;
        
        if (data && typeof data === 'object') {
          Object.entries(data).forEach(([key, value]) => {
            if (!value) return;
            
            const formattedKey = formatKeyName(key);
            const formattedValue = Array.isArray(value) 
              ? value.join(", ") 
              : String(value);
            
            textContent += `${formattedKey}: ${formattedValue}\n`;
          });
        }
      });
    }
    
    // In a real app, this would create a PDF
    const blob = new Blob([textContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lifespan-estimation-results.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "PDF Downloaded",
      description: "Your results have been exported to PDF",
      variant: "default",
    });
    
  }, 1000);
};

// Helper functions for formatting
const formatCategoryName = (name: string) => {
  return name.replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatKeyName = (key: string) => {
  return key.replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
