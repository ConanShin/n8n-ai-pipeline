import React from 'react';

export interface InputFieldProps {
  type: string;
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  type, 
  placeholder, 
  isError = false, 
  disabled = false 
}) => {
  const baseClasses = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";
  const stateClasses = isError 
    ? "border-red-500" 
    : "border-gray-300";
  const disabledClasses = disabled 
    ? "bg-gray-100 cursor-not-allowed opacity-75" 
    : "bg-white";

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      role="textbox"
      aria-label="입력 필드"
      className={`${baseClasses} ${stateClasses} ${disabledClasses}`}
    />
  );
};
