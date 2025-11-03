import image5 from "../../../public/fa565367636484864d81e89e19efbbea0fb36bd1_1761655539.gif"
import image4 from "../../../public/b8a490b424d6c2b9fdbff100b0563b28623f0af1_1761769742.webp";
import image3 from "../../../public/42a742fae2d9a7d521599c3f4796675c4c957fd4_1761753635.webp";
import image2 from "../../../public/136eddc13131b9c1cce7b20a1bea1f83566fcb78_1761560313.webp";
import image1 from "../../../public/0f368310ea44bf72b2d24fc70b47189ed36da2c8_1761743470.webp";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Your category data
const menuData = [
  { id: 1, name: "موبایل", path: "/category/mobile",image:image1 },
  { id: 2, name: "لپ‌تاپ", path: "/category/laptop",image:image2 },
  { id: 3, name: "تلویزیون", path: "/category/tv",image:image3 },
  { id: 4, name: "لباس", path: "/category/clothing",image:image4 },
  { id: 5, name: "کفش", path: "/category/shoes",image:image5 }
];

const CategorySliderSwiper = () => {
    const [currentSlide,setCurrentSlide]=useState(1)
    const [isHovered,setIsHovered]=useState(false)
console.log(currentSlide)
useEffect(() => {
    if (isHovered) return;
  
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        
        const next = prev + 1;
        return next >= menuData.length ? 0 : next; 
      });
    }, 2000);
  

    return () => clearInterval(interval);
  }, [isHovered]); 
 
const totalSlides = menuData.length;
return (
  <div className="py-6 px-4 relative">

    {/* Slider viewport */}
    <div className="w-full h-auto overflow-hidden rounded-xl relative">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${totalSlides+1 * 100}%`,
        }}
      >
        {menuData.map((slide) => (
          <div key={slide.name} className="w-full flex-shrink-0 h-full">
            <img
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 md:bottom-5  left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
      {Array.from({ length: menuData.length }).map((_, index) => (
        <div
          key={index}
          className={` lg:h-4 h-2 rounded-full transition-colors duration-500 ${
            index === currentSlide
              ? 'bg-red-500 lg:w-8 w-4'        
              : 'bg-white/50 lg:w-4 w-2'     
          }`}
        />
      ))}
    </div>
      <div className="absolute right-2 top-[38%]  z-10">
        <SliderButton
          type="next"
          clickHandler={() =>
            setCurrentSlide((e) => (e === totalSlides - 1 ? 0 : e + 1))
          }
        />
      </div>
      <div className="absolute left-2 top-[38%]  z-10">
        <SliderButton
          type="prev"
          clickHandler={() =>
            setCurrentSlide((e) => (e === 0 ? totalSlides - 1 : e - 1))
          }
        />
      </div>

     
    </div>
  </div>
);
};

export default CategorySliderSwiper;

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

