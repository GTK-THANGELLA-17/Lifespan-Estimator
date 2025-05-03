
import { useState, useEffect } from "react";
import { FormField } from "@/components/FormField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface DateOfBirthInputProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DateOfBirthInput({ 
  id = "dob", 
  value, 
  onChange, 
  required = false,
  date,
  setDate
}: DateOfBirthInputProps) {
  // Parse initial value if exists
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Generate arrays for days and months
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  // Initialize values from props
  useEffect(() => {
    if (value && initialLoad) {
      const [y, m, d] = value.split('-');
      if (y && m && d) {
        setYear(y);
        setMonth(m);
        setDay(d);
        setInitialLoad(false);
      }
    }
    
    // Initialize from date prop if available
    if (date && initialLoad) {
      setYear(date.getFullYear().toString());
      setMonth(String(date.getMonth() + 1).padStart(2, '0'));
      setDay(String(date.getDate()).padStart(2, '0'));
      setInitialLoad(false);
    }
  }, [value, date, initialLoad]);

  // Validate and update when any part changes
  useEffect(() => {
    if (day && month && year && year.length === 4) {
      const dateStr = `${year}-${month}-${day}`;
      
      // Basic validation
      const yearNum = parseInt(year, 10);
      const currentYear = new Date().getFullYear();
      
      if (yearNum < 1900) {
        setError("Year must be 1900 or later");
        return;
      }
      
      if (yearNum > currentYear) {
        setError("Year cannot be in the future");
        return;
      }
      
      try {
        // Check valid date (e.g., February 30th doesn't exist)
        const date = new Date(yearNum, parseInt(month, 10) - 1, parseInt(day, 10));
        if (
          date.getFullYear() !== yearNum ||
          date.getMonth() !== parseInt(month, 10) - 1 ||
          date.getDate() !== parseInt(day, 10)
        ) {
          setError("Invalid date");
          return;
        }
        
        setError(null);
        
        // Update via onChange callback if provided
        if (onChange) {
          onChange(dateStr);
        }
        
        // Update via setDate callback if provided
        if (setDate) {
          setDate(date);
        }
      } catch (e) {
        setError("Invalid date format");
      }
    }
  }, [day, month, year, onChange, setDate]);

  // Handle year input changes
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4); // Only allow digits, max 4
    setYear(value);
  };

  return (
    <FormField
      id={id}
      label="Date of Birth"
      required={required}
      helpText={error ? undefined : "Please enter your date of birth"}
    >
      <div className="flex flex-wrap gap-2">
        <div className="w-full sm:w-[30%]">
          <Label htmlFor={`${id}-month`}>Month</Label>
          <Select 
            value={month} 
            onValueChange={setMonth}
          >
            <SelectTrigger id={`${id}-month`} className="w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(m => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-[30%]">
          <Label htmlFor={`${id}-day`}>Day</Label>
          <Select 
            value={day} 
            onValueChange={setDay}
          >
            <SelectTrigger id={`${id}-day`} className="w-full">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-[30%]">
          <Label htmlFor={`${id}-year`}>Year</Label>
          <Input
            id={`${id}-year`}
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            className="w-full"
            maxLength={4}
          />
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </FormField>
  );
}
