import Header from '../header';
import { useEffect, useState } from 'react';
import Card from '../../productCard';
import SliderButton from './sliderButton';
import Discount from '../discount';
import { useGetDiscountedProducts } from '../../queries/productsQueries';
const DiscountSlider = ({ title }: { title: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch discounted products
  const { data, isLoading, isError, error } = useGetDiscountedProducts();
  const products = data || [];

  // Slider config
  const productsPerSlide = 4;
  const totalSlides = Math.max(1, Math.ceil(products.length / productsPerSlide));
  const gap = 16; // px
  const slideWidth = 250; // px

  // Auto-rotate unless hovered or only 1 slide
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;
console.log(data)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
      console.log(currentSlide)
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  // Handle loading & error states
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Header link="/" title={title} />
        <div className="h-64 flex items-center justify-center">Loading discounted products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3">
        <Header link="/" title={title} />
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load discounted products: {error?.message}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-3">
        <Header link="/" title={title} />
        <div className="h-64 flex items-center justify-center">No discounted products available.</div>
      </div>
    );
  }

  // Group products into slides
  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(products.slice(i * productsPerSlide, (i + 1) * productsPerSlide));
  }

  return (
    <div className="space-y-3">
      <Header link="/" title={title} />
      
      <div className="xl:hidden justify-center flex w-full">
        <Discount />
      </div>

      <div
        className="w-full gap-4 md:px-4 relative rounded-lg p-4 bg-red-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-2 items-center">
          {/* Discount banner (desktop) */}
          <div className="xl:block hidden w-[400px] ">
            <Discount />
          </div>

          {/* Product slider */}
          <div className="overflow-hidden rounded-xl relative flex-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (slideWidth + gap)}px)`,
                gap: `${gap}px`,
                width: 'fit-content',
              }}
            >
              {products.map((product) => (
                <div key={product.id} style={{ width: `${slideWidth}px` }}>
<Card
  image={`http://localhost:5000/uploads/c1c3b58bd8d63073d68a4cbe26efb8d8`}
  name={product.name}
  brand={product.brand}
  category={product.category}
  count={String(product.count)}
  price={product.price}
  priceWithDiscount={product.priceWithDiscount}
  discountPercent={product.discountPercentage}
  slideWidth={`${slideWidth}px`}
  path={`/product/${product.id}`}
/>                </div>
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
    </div>
  );
};

export default DiscountSlider;