import { useState } from "react";

const TextInput = ({ type, id, placeHolder, ...props }: { placeHolder: string, id: string, type: "text" | "email" | "password" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState("");
    
    return (
        <div className="relative">
            <input
                type={type}
                name={id}
                onChange={(e) => {
                    setInput(e.currentTarget.value);
                    
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-12 text-right rounded-md border-2 border-red-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400 dark:text-gray-100 transition-all duration-200 peer"
                {...props}
            />
            <label
                htmlFor={id}
                className={`absolute w-fit h-fit inset-y-0 right-2 bg-white dark:bg-transparent text-red-500 text-right transition-all duration-200 ease-in-out pointer-events-none ${
                    isFocused || input.length > 0
                        ? "-top-0 -translate-y-1/2 text-sm dark:top-2 dark:text-[10px] " 
                        : "top-1/2 -translate-y-1/2 text-[15px]  "
                }`}
            >
                {placeHolder}
            </label>
        </div>
    );
}

export default TextInput;