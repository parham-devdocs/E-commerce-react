import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SliderButtonProps {
    type: 'prev' | 'next';
    clickHandler: () => void;
  }
  
  const SliderButton = ({ type, clickHandler }: SliderButtonProps) => {
    return (
      <button
        onClick={clickHandler}
        aria-label={type === 'prev' ? 'Previous' : 'Next'}
        className="lg:w-10 lg:h-10 h-6 w-6  rounded-full bg-white/90 border border-gray-300 shadow-lg
                   flex items-center justify-center
                   cursor-pointer
                   text-gray-800 hover:bg-white hover:scale-105 
              
                   focus:outline-none focus:ring-2 
                   transition-all duration-300 z-10"
      >
        {type === 'prev' ? (
          <FaChevronLeft className="lg:text-lg text-[15px]" /> // ← RTL: prev = right arrow
        ) : (
          <FaChevronRight className="lg:text-lg text-[15px]" />  // ← RTL: next = left arrow
        )}
      </button>
    );
  };
  
  
export default SliderButton  