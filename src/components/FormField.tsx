
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
  helpText?: string;
  className?: string;
}

export function FormField({ 
  label, 
  id, 
  required = false, 
  children, 
  helpText,
  className = "" 
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-foreground/90"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>
      {children}
      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
