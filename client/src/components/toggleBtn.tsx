import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ToggleBtn = ({ onToggleHandler }: { onToggleHandler: (isDark: boolean) => void }) => {
  const [selected, setSelected] = useState(false);

  function toggleHandler() {
    setSelected((prev) => {
      const newState = !prev;
      onToggleHandler(newState); // Pass the NEW state
      return newState;
    });
  }

  return (
    <button
      className="w-12 h-7 cursor-pointer rounded-full border-[3px] border-red-500 relative bg-transparent"
      onClick={toggleHandler}
      aria-label={selected ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Toggle knob */}
      <div
        className={`absolute top-[1.5px] h-5 w-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          selected
            ? "bg-red-500 translate-x-5"   // fully right
            : "bg-white border-[2px] border-red-500 translate-x-0.5" // fully left
        }`}
      >
        {/* Sun icon (visible in dark mode = selected=true) */}
        <BiSun
          className={`absolute transition-opacity duration-300 ${
            selected ? "opacity-100" : "opacity-0"
          } text-yellow-300`}
          size={14}
        />
        {/* Moon icon (visible in light mode = selected=false) */}
        <BiMoon
          className={`absolute transition-opacity duration-300 ${
            selected ? "opacity-0" : "opacity-100"
          } text-gray-700`}
          size={14}
        />
      </div>
    </button>
  );
};

export default ToggleBtn;