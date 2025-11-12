import usePrice from "../../hooks/priceHook";
import useCartStore from "../../store/cart";
import Button from "../button";

const Price = ({
  title,
  id,
  colors,
  price,
  discountPercentage,
  images
}: {
  title: string;
  id:string;
  colors: string[];
  images: string[];
  price: number;
  discountPercentage: number;
}) => {
  const {seperatedPrice,seperatedPriceWithDiscount } = usePrice({ priceOrDiscount:price, discountPercentage });
  const addToCart=useCartStore(state=>state)

  return (
    <div className="flex justify-center items-center py-5 w-full rounded-md bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 w-full max-w-full px-4">
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <img
            src={images[0]}
            alt={title}
            className="w-full max-w-[200px] h-auto rounded-md  dark:bg-gray-700 object-cover mx-auto"
          />
        </div>

        <div className="w-full text-center lg:text-right space-y-3">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 text-gray-700 dark:text-gray-300">
            <span>رنگ‌ها:</span>
            {colors.map((color, index) => (
              <span
                key={index}
                className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 inline-block"
                style={{ backgroundColor: color }}
                aria-label={`رنگ ${color}`}
              />
            ))}
          </div>

          <div className="flex flex-col items-center lg:items-end">
            {seperatedPriceWithDiscount && (
              <div className="flex gap-2 items-center mb-1">
                <p className="text-gray-500 dark:text-gray-400 line-through text-lg">
                  {seperatedPrice}
                </p>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {discountPercentage}%
                </span>
              </div>
            )}

            <p className="text-2xl font-bold text-red-500 dark:text-red-400">
              {seperatedPriceWithDiscount || seperatedPrice}
            </p>
          </div>
          <Button  style={{color:"primary"}} btn={{fn:(e)=>{addToCart.addToCart(id)},text:"افزودن به سبد خرید"}}/>
        </div>
      </div>
    </div>
  );
};

export default Price;