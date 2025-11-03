
import Header from '../header'
import image from "../../../public/laptop.webp";
import { useEffect, useState } from "react";
import Card from '../../productCard';
import SliderButton from './sliderButton';
import Discount from '../discount';

// Your category data

export interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  discountPercent: string;
  priceAfterDiscount: string;
  path: string;
}

const products: Product[] = [
  { id: 101, image: image, title: "آیفون ۱۵ پرو", price: "45,000,000", discountPercent: "10", priceAfterDiscount: "40,500,000", path: "/product/iphone-15-pro" },
  { id: 102, image: image, title: "سامسونگ گلکسی S24 الترا", price: "42,000,000", discountPercent: "15", priceAfterDiscount: "35,700,000", path: "/product/samsung-galaxy-s24-ultra" },
  { id: 201, image: image, title: "مک‌بوک ایر M3", price: "68,000,000", discountPercent: "8", priceAfterDiscount: "62,560,000", path: "/product/macbook-air-m3" },
  { id: 202, image: image, title: "لپ‌تاپ گیمینگ ایسوس ROG", price: "38,500,000", discountPercent: "12", priceAfterDiscount: "33,880,000", path: "/product/asus-rog-gaming-laptop" },
  { id: 301, image: image, title: "تلویزیون ال‌جی OLED 65 اینچ", price: "28,000,000", discountPercent: "20", priceAfterDiscount: "22,400,000", path: "/product/lg-oled-65-tv" },
  { id: 501, image: image, title: "مانتو پشمی زمستانه", price: "3,200,000", discountPercent: "25", priceAfterDiscount: "2,400,000", path: "/product/winter-wool-manteau" },
  { id: 601, image: image, title: "کفش راحتی نایکی", price: "4,500,000", discountPercent: "30", priceAfterDiscount: "3,150,000", path: "/product/nike-comfort-shoes" },
  { id: 701, image: image, title: "عطر شانل کوکو مادemoiselle", price: "12,000,000", discountPercent: "10", priceAfterDiscount: "10,800,000", path: "/product/chanel-coco-mademoiselle" },
]


const DiscountSlider = ({ title }: { title: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = products.length;
  const gap = 16;
  const slideWidth = "250px";

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    if (products.length-currentSlide<=4) {
      setCurrentSlide(0)
    }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides]); // ✅ Only these deps needed

  return (
    <div className="space-y-3 ">
      <Header link="/" title={title}  />
      <div className=' xl:hidden  justify-center flex w-full '>
      <Discount/>
      

      </div>
      <div 
        className="w-full gap-4 md:px-4 relative bg-red-500 rounded-lg p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=' flex gap-2 items-center '>
         
      <div className=' xl:block hidden w-[400px]'><Discount/></div> 
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
              <div key={slide.id} style={{ width: slideWidth }}>
                <Card {...slide} slideWidth='250px' path={slide.path} />
              </div>
            ))}
          </div>
          {/* Navigation buttons */}
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
     
    </div>
  );
};

export default DiscountSlider