import Header from '../header';
import { useEffect, useState } from 'react';
import Card from '../../productCard';
import SliderButton from './sliderButton';
import Discount from '../discount';
import { useGetDiscountedProducts } from '../../queries/productsQueries';
import Loader from '../loader';
import type { Product } from '../../types';
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
const DiscountSlider = ({ title }: { title: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {  data:products, isLoading, isError, error } = useGetDiscountedProducts(1);

  const productsPerSlide = 4;
  const actualProductCount = products?.data?.length ?? 0;
  const totalSlides = Math.max(1, Math.ceil(actualProductCount / productsPerSlide));

  useEffect(() => {
    // ✅ Guard inside the effect
    if (isLoading || isError || !products || actualProductCount === 0 || isHovered || totalSlides <= 1) {
      return;
    }
console.log(products)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides, isLoading, isError, actualProductCount]);

  // ✅ Now do early returns
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Header link="/discounts" title={title} />
        <Loader size="lg"/>
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

  if (!products || products.total === 0 || actualProductCount === 0) {
    return (
      <div className="space-y-3">
        <Header link="/" title={title} />
        <div className="h-64 flex items-center justify-center">
          No discounted products available.
        </div>
      </div>
    );
  }



  const gap = 16;
  const slideWidth = 250;

  
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
          <div className="xl:block hidden w-[400px]">
            <Discount />
          </div>

          <div className="overflow-hidden rounded-xl relative flex-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (slideWidth + gap)}px)`,
                gap: `${gap}px`,
                width: 'fit-content',
              }}
            >
              {products.data?.map((product:Product) => (
                <div key={product.id} style={{ width: `${slideWidth}px` }}>
                  <Card
                    // image={`http://localhost:5000/uploads/${product.images?.[0] || 'default.jpg'}`}
                    image={iphone14}
                    name={product.name}
                    brand={product.brand}
                    category={product.category}
                    count={String(product.count)}
                    price={product.price}
                    priceWithDiscount={product.priceWithDiscount}
                    discountPercent={product.discountPercentage}
                    slideWidth={`${slideWidth}px`}
                    path={`/product/${product.id}`}
                  />
                </div>
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