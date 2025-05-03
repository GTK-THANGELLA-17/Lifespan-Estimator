
import { toast } from "@/components/ui/use-toast";

export const exportToWord = (
  result: string,
  selectedData: Record<string, any> | null
) => {
  toast({
    title: "Exporting Word Document",
    description: "Your Word document is being generated...",
  });
  
  // In a real implementation, this would use a library like docx
  // For now, we'll simulate the Word document generation
  
  setTimeout(() => {
    // Format the data properly
    let textContent = `<html xmlns:w="urn:schemas-microsoft-com:office:word">
    <head>
    <meta charset="utf-8">
    <title>Lifespan Estimation Results</title>
    <style>
      body { font-family: Arial, sans-serif; }
      h1 { color: #2a67b7; }
      h2 { color: #333; margin-top: 20px; }
      .result { font-size: 18px; margin: 20px 0; padding: 15px; background: #f5f5f5; border-left: 5px solid #2a67b7; }
      .category { margin-top: 25px; }
      .item { margin: 5px 0; }
      .label { font-weight: bold; }
    </style>
    </head>
    <body>
      <h1>Lifespan Estimation Results</h1>
      <div class="result">${result}</div>`;
    
    if (selectedData) {
      textContent += `<h2>Selected Data</h2>`;
      
      Object.entries(selectedData).forEach(([category, data]) => {
        const formattedCategory = formatCategoryName(category);
        textContent += `<div class="category"><h3>${formattedCategory}</h3>`;
        
        if (data && typeof data === 'object') {
          Object.entries(data).forEach(([key, value]) => {
            if (!value) return;
            
            const formattedKey = formatKeyName(key);
            const formattedValue = Array.isArray(value) 
              ? value.join(", ") 
              : String(value);
            
            textContent += `<div class="item"><span class="label">${formattedKey}:</span> ${formattedValue}</div>`;
          });
        }
        
        textContent += `</div>`;
      });
    }
    
    textContent += `</body></html>`;
    
    // Create a blob and download
    const blob = new Blob([textContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lifespan-estimation-results.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Word Document Downloaded",
      description: "Your results have been exported to Word format",
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
