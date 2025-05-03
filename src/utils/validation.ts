
export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - at least 10 digits
  const phonePattern = /^\+?[0-9]{10,15}$/;
  return phonePattern.test(phone);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateAge = (age: number | string): boolean => {
  const ageNum = typeof age === 'string' ? parseInt(age) : age;
  return !isNaN(ageNum) && ageNum > 0 && ageNum < 120;
};

export const validateHeight = (height: number | string): boolean => {
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  return !isNaN(heightNum) && heightNum > 0;
};

export const validateWeight = (weight: number | string): boolean => {
  const weightNum = typeof weight === 'string' ? parseInt(weight) : weight;
  return !isNaN(weightNum) && weightNum > 0;
};

export const validateDOB = (dob: string): boolean => {
  // Check if it's a valid date
  const date = new Date(dob);
  if (isNaN(date.getTime())) return false;
  
  // Check if the date is not in the future
  const currentDate = new Date();
  if (date > currentDate) return false;
  
  // Check if person is not older than 120 years
  const minDate = new Date();
  minDate.setFullYear(currentDate.getFullYear() - 120);
  if (date < minDate) return false;
  
  return true;
};

export const validateRequired = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const generateFieldErrorMessage = (field: string): string => {
  switch (field) {
    case 'email':
      return 'Please enter a valid email address';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'name':
      return 'Please enter your name (at least 2 characters)';
    case 'age':
      return 'Please enter a valid age between 1 and 120';
    case 'height':
      return 'Please enter a valid height';
    case 'weight':
      return 'Please enter a valid weight';
    case 'dob':
      return 'Please enter a valid date of birth';
    default:
      return 'This field is required';
  }
};
