import type { ProductCardType } from "../types"; 
import  usePrice  from "../hooks/priceHook"; 
import Button from "./button";

const ProductCard = ({
  id,
  src,
  name,
  shortDescription,
  price,
  discountPercentage,
  inStock,
}: ProductCardType) => {
  const { seperatedPrice, seperatedPriceWithDiscount } = usePrice({ price, discountPercentage });
  return (
    <div 
      className="md:w-72 w-full  min-h-96 flex flex-col items-center shadow-lg rounded-xl dark:bg-gray-800 bg-white p-4 
                 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border border-gray-200 dark:border-gray-700"
      role="article"
      aria-label={`کارت محصول ${name}`}
    >
      
{inStock && discountPercentage > 0 && (
  <div className="absolute top-3 right-3 z-10">
    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      %{discountPercentage} تخفیف
    </span>
  </div>
)}

{!inStock && (
  <div className="absolute top-3 right-3 z-10">
    <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      نا موجود
    </span>
  </div>
)}

    

 
      <div className="bg-red-500/10 w-48 h-48 rounded-full absolute -top-24 -right-12 -z-0" />

      <div className="w-full h-40 flex items-center justify-center mb-3">
        <img 
          src={src} 
          alt={name} 
          className="object-contain max-h-36 transition-opacity duration-300 hover:opacity-90"
          loading="lazy"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center leading-tight mb-2 line-clamp-1">
        {name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed 
                   line-clamp-2 overflow-hidden text-ellipsis mb-3 min-h-[48px]">
        {shortDescription}
      </p>

    {inStock &&  <div className="w-full flex justify-between items-center mt-auto pt-2">
        <div className="flex flex-col items-start">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
          {discountPercentage ? seperatedPriceWithDiscount :seperatedPrice}  
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">تومان</span>
        </div>

        {discountPercentage > 0 && (
          <div className="text-right">
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {seperatedPrice}
            </span>
          </div>
        )}
      </div>} 
     {inStock && <Button  btn={{text:"افزودن به سبد خرید",fn(e) {
        console.log(e)
      }}}/>} 
    </div>
  );
};

export default ProductCard;