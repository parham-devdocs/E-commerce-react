
import Header from '../header'
import { useEffect, useState } from "react";
import iphoneImage from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import SliderButton from './sliderButton';
import { Link } from 'react-router-dom';

// Your category data

export interface Product {
  id: number;
  image: string;
  title: string;
  path: string;
}

const products: Product[] = [
  { id: 101, image: iphoneImage, title: "آیفون ۱۵ پرو", path: "/product/iphone-15-pro" },
  { id: 102, image:iphoneImage, title: "سامسونگ گلکسی S24 الترا",  path: "/product/samsung-galaxy-s24-ultra" },
  { id: 201, image: iphoneImage, title: "مک‌بوک ایر M3",  path: "/product/macbook-air-m3" },
  { id: 202, image: iphoneImage, title: "لپ‌تاپ گیمینگ ایسوس ROG",  path: "/product/asus-rog-gaming-laptop" },
  { id: 301, image: iphoneImage, title: "تلویزیون ال‌جی OLED 65 اینچ", path: "/product/lg-oled-65-tv" },
  { id: 501, image: iphoneImage, title: "مانتو پشمی زمستانه", path: "/product/winter-wool-manteau" },
  { id: 601, image: iphoneImage, title: "کفش راحتی نایکی", path: "/product/nike-comfort-shoes" },
  { id: 701, image: iphoneImage, title: "عطر شانل کوکو مادemoiselle", path: "/product/chanel-coco-mademoiselle" },
]


const CircleSlider = ({ title,autoPlay }: { title?: string,autoPlay?:true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = products.length;
  const gap = 32;
  const slideWidth = "150px";

  useEffect(() => {
    if (isHovered) return;
if (autoPlay) {
  const interval = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  if (products.length-currentSlide<=4) {
    setCurrentSlide(0)
  }
  }, 3000);

  return () => clearInterval(interval);
}
   
  }, [isHovered, totalSlides]); // ✅ Only these deps needed

  return (
    <div className="space-y-3  dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950 ">
      {title && <Header link="/" title={title } /> }
      <div 
        className="w-full py-4 px-2 md:px-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div className=" overflow-hidden rounded-xl relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentSlide} * (${slideWidth} + ${gap}px)))`,
              gap: `${gap}px`,
              width: 'fit-content',
            }}
          >
            {products.map((slide) => (
             <Link 
             to={slide.path} 
             key={slide.id} 
             className=" flex dark:text-white flex-col gap-5 items-center "
           >
            <div className=' rounded-full p-2 border-2 border-red-500'              style={{ width: slideWidth, height: "150px" }}             >
            <img 
               src={slide.image} 
               alt={slide.title}
               className="w-full h-full rounded-full object-cover"
             />
            </div>
            <p className="mt-2 text-center">{slide.title}</p>

           </Link>
            ))}
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <SliderButton
              type="next"
              clickHandler={() => setCurrentSlide(e => (e + 1) % totalSlides)}
            />
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <SliderButton
              type="prev"
              clickHandler={() => setCurrentSlide(e => (e - 1 + totalSlides) % totalSlides)}
            />
          </div>
        </div>
      
          </div>
     
    </div>
  );
};

export default CircleSlider