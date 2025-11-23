import { useState, useEffect } from "react";

const Input = ({ 
  type, 
  id, 
  autoComplete,
  value, 
  placeHolder, 
  onChangeHandler 
}: { 
  placeHolder: string,
  value: string | number,
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  autoComplete?: React.HTMLInputAutoCompleteAttribute,
  id: string, 
  type: "text" | "email" | "password" | "number" 
}) => {
  const [input, setInput] = useState<string>(value.toString());
  
  // Update internal state when external value prop changes
  useEffect(() => {
    setInput(value.toString());
  }, [value]);

  return (
    <div className="relative">
      <input
        autoComplete={autoComplete}
        type={type}
        name={id}
        onChange={(e) => {
          setInput(e.currentTarget.value);
          onChangeHandler(e);
        }}
        value={input}
        className="w-full h-12 text-right rounded-md border-2 border-red-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400 dark:text-gray-100 transition-all duration-200 peer"
      />
      <label
        htmlFor={id}
        className="absolute w-fit h-fit inset-y-0 right-2 bg-white dark:bg-transparent text-[10px] text-red-500 text-right transition-all duration-200 ease-in-out pointer-events-none"
      >
        {placeHolder}
      </label>
    </div>
  );
}

export default Input;