import type { ProductCardInCart } from "../../types"
import usePrice from "../../hooks/priceHook";
import ProductNumber from "./productNumber";
import { useState } from "react";
import useCartStore from "../../store/cart";

const ProductCard = ({img,id,productName,price,discountPercentage,defaultNumberOfProducts}:ProductCardInCart) => {
    const [numberOfProducts,setNumberOfProducts] = useState(defaultNumberOfProducts);
    const decrementNumberOfProducts=useCartStore(state=>state.decrementNumberOfProducts)
    const incrementNumberOfProducts=useCartStore(state=>state.increaseNumberOfProducts)

    // Calculate individual item prices
    const { priceWithDiscount} = usePrice({
        discountPercentage, 
        priceOrDiscount: price
    });
    
    // Calculate total prices
    const totalOriginalPrice = price * numberOfProducts;
    const totalDiscountedPrice = priceWithDiscount ? priceWithDiscount * numberOfProducts : totalOriginalPrice;
    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    
    const formattedTotalOriginal = new Intl.NumberFormat("fa-IR").format(totalOriginalPrice);
    const formattedTotalDiscounted = priceWithDiscount 
        ? new Intl.NumberFormat("fa-IR").format(totalDiscountedPrice) 
        : formattedTotalOriginal;
    const formattedTotalDiscount = new Intl.NumberFormat("fa-IR").format(totalDiscount);

    const decreaseHandler = () => {
        setNumberOfProducts(prev => Math.max(1, prev - 1)); 
        decrementNumberOfProducts({id})
    };
    
    const increaseHandler = () => {
        setNumberOfProducts(prev => prev + 1);
        incrementNumberOfProducts({id})
        
    };

    return (
        <div className="w-full py-6 px-6 flex items-center justify-between shadow-xl dark:shadow-2xl dark:bg-gray-800 bg-white rounded-3xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white truncate max-w-[60%]">
                        {productName}
                    </h3>
                    <div className="flex flex-col items-end">
                        <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
                            {formattedTotalOriginal}
                        </p>
                        <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full mt-1">
                            تخفیف {discountPercentage}%
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-lg">
                            <div className="text-sm font-medium text-green-100">قیمت نهایی</div>
                            <div className="text-2xl font-bold mt-1">{formattedTotalDiscounted}</div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-gradient-to-r from-red-500 to-red-400 text-white rounded-2xl p-4 shadow-lg">
                            <div className="text-sm font-medium text-amber-100">تخفیف</div>
                            <div className="text-2xl font-bold mt-1">{formattedTotalDiscount}</div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-2">
                    <ProductNumber 
                        decreaseHandler={decreaseHandler} 
                        increaseHandler={increaseHandler} 
                        onChangeHandler={(e) => setNumberOfProducts(Number(e))}
                        number={numberOfProducts}
                    />
                </div>
            </div>
            
            <div className="ml-6 flex-shrink-0 flex flex-col items-center">
                <div className="relative">
                    <img 
                        className="w-32 h-32 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-700 transition-transform duration-300 hover:scale-105" 
                        src={img} 
                        alt={productName} 
                    />
                    {discountPercentage && (
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard