import { BiMoon, BiSun } from "react-icons/bi";
import useZustand from "../store";

const ToggleBtn = () => {
  const isDarkMode = useZustand((state) => state.isDarkMode);
  const toggleDarkMode = useZustand((state) => state.toggleDarkMode);

  const toggleHandler = () => {
    toggleDarkMode();
  };

  return (
    <button
      className="w-12 h-7 cursor-pointer rounded-full border-[3px] border-red-500 relative bg-transparent"
      onClick={toggleHandler}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Toggle knob */}
      <div
        className={`absolute top-[1.5px] h-5 w-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          isDarkMode
            ? "bg-red-500 translate-x-5"
            : "bg-white border-[2px] border-red-500 translate-x-0.5"
        }`}
      >
        <BiSun
          className={`absolute transition-opacity duration-300 ${
            isDarkMode ? "opacity-100" : "opacity-0"
          } text-yellow-300`}
          size={14}
        />
        <BiMoon
          className={`absolute transition-opacity duration-300 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          } text-gray-700`}
          size={14}
        />
      </div>
    </button>
  );
};

export default ToggleBtn;