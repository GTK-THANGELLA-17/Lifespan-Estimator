
import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormSectionProps {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  description?: string;
  collapsible?: boolean;
  className?: string;
}

export function FormSection({ 
  id, 
  title, 
  icon, 
  children, 
  description,
  collapsible = false,
  className = ""
}: FormSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`mb-8 animate-fade-in ${className}`}>
      <div 
        id={id}
        className={`
          p-6 rounded-xl border border-border 
          bg-card shadow-md card-hover-effect
          transition-all duration-300
          ${collapsed ? 'opacity-90' : ''}
        `}
      >
        <div 
          className={`flex items-center justify-between mb-2 ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={() => collapsible ? setCollapsed(!collapsed) : null}
        >
          <h2 className="card-title">
            <span className="text-primary float-effect">{icon}</span>
            {title}
          </h2>
          {collapsible && (
            <div className="p-1 hover:bg-primary/10 rounded-full transition-colors">
              {collapsed ? 
                <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              }
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        
        <div className={`
          space-y-4 
          transition-all duration-300
          ${collapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-[2000px] opacity-100'}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
}
