import { useState } from "react";
import { type DropDownType } from "../types";

const DropDown = (dropDowProps: DropDownType) => {
    const [value,setValue]=useState("")
  const {
    header,
    defaultValue,
    options,
    onChange,
    name,
    placeholder = "انتخاب کنید...",
    disabled = false,
    className = "",
    size = "md"
  } = dropDowProps;

  // Size classes mapping
  const sizeClasses = {
    sm: "px-2 py-1 text-sm h-10",
    md: "px-3 py-2 text-base h-12",
    lg: "px-4 py-3 text-lg h-14"
  };

  return (
    <div className="w-full">
      {header && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {header}
        </label>
      )}
      <select
        value={value || defaultValue}
        name={name}
      onChange={(e) => onChange(e.target.value)}    
        disabled={disabled}
        className={`
          w-full rounded-lg focus:ring-4 focus:ring-red-200 focus:border-red-500
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300
          ${sizeClasses[size]}
          ${className}
          bg-white
          text-black
          border-2 border-red-300
          transition-all duration-200
          hover:border-red-400
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option 
            key={index} 
            value={option.value} 
            disabled={option.disabled}
            className="bg-white hover:bg-red-50"
          >
            {option.icon && <span className="mr-3 text-red-500">{option.icon}</span>}
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;