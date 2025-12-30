import Header from '../header';
import { useEffect, useState } from "react";
import SliderButton from './sliderButton';
import { Link } from 'react-router-dom';
import { useGetRecentProducts } from "../../queries/productsQueries";
import Loader from '../loader';
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
const CircleSlider = ({ title, autoPlay }: { title?: string; autoPlay?: true }) => {
  const { error, data: products, isLoading, isError } = useGetRecentProducts(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Compute totalSlides from ACTUAL loaded products
  const totalSlides = products?.data?.length ?? 0;
  const gap = 32;
  const slideWidth = "150px";

  // ✅ useEffect must be called unconditionally (before any return)
  useEffect(() => {
    // Only auto-play if enabled, not hovering, and we have slides
    if (!autoPlay || isHovered || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, isHovered, totalSlides]);

  // ✅ Early returns AFTER hooks
  if (isLoading) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <Header link="/" title={title || ""} />
        <div className="flex w-full h-full justify-center items-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <Header link="/" title={title || ""} />
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load recent products: {error?.message}
        </div>
      </div>
    );
  }

  if (!products || totalSlides === 0) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <Header link="/" title={title || ""} />
        <div className="h-64 flex items-center justify-center">
          No recent products available.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
      {title && <Header link="/" title={title} />}
      
      <div
        className="w-full py-4 px-2 md:px-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-xl relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentSlide} * (${slideWidth} + ${gap}px)))`,
              gap: `${gap}px`,
              width: 'fit-content',
            }}
          >
            {products.data.map((product) => (
              <Link
                to={`/recent/${product.id}`}
                key={product.id}
                className="flex dark:text-white flex-col gap-5 items-center"
              >
                <div
                  className="rounded-full p-2 border-2 border-red-500"
                  style={{ width: slideWidth, height: "150px" }}
                >
                  <img
                    src={ iphone14}
                    alt={product.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center">{product.name}</p>
              </Link>
            ))}
          </div>

          {totalSlides > 1 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleSlider;