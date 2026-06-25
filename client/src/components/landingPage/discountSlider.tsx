import Header from '../header';
import { useEffect, useState } from 'react';
import Card from '../../productCard';
import SliderButton from './sliderButton';
import Discount from '../discount';
import { useGetDiscountedProducts } from '../../queries/productsQueries';
import Loader from '../loader';
import type { Product } from '../../types';
import noPhoto from "../../../public/259987.png";
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
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides, isLoading, isError, actualProductCount]);

  // ✅ Now do early returns
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
        <Header link="/" title={"دسته بندی ها"} />
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load recent products: {error?.message}
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
    <div className="space-y-3 ">
      <Header link="/" title={title} />

      <div className="xl:hidden justify-center flex w-full">
        <Discount />
      </div>

      <div
        className="w-full gap-4 md:px-4 relative rounded-lg p-4 bg-red-500 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-2 items-center">
          <div className="xl:block hidden w-[400px]">
            <Discount />
          </div>

          <div className="overflow-hidden rounded-xl relative flex-1">
            <div
              className="flex transition-transform duration-500 ease-in-out "
              style={{
                transform: `translateX(-${currentSlide * (slideWidth + gap)}px)`,
                gap: `${gap}px`,
                width: 'fit-content',
              }}
            >
              {products.data?.map((product:Product) => (
                <div key={product._id} style={{ width: `${slideWidth}px` }}>
                  <Card
                  
                    image={`http://localhost:5000/${product.images?.[0] || noPhoto}`}
                    name={product.name}
                    brand={product.brand}
                    category={product.category}
                    count={String(product.count)}
                    price={product.price}
                    priceWithDiscount={product.priceWithDiscount}
                    discountPercent={product.discountPercentage}
                    slideWidth={`${slideWidth}px`}
                    path={`/products/${product._id}`}
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