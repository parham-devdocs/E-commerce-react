import Payment from '../../components/cart/payment';
import ProductSection from '../../components/cart/productSection';
import Loader from '../../components/loader';
import { useFindWholeCart } from "../../queries/cartQueries";
import {type CartResponse } from '../../types'; // ensure this is correctly exported

const Cart = () => {
  const { data, isError, isLoading } = useFindWholeCart();

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white dark:from-gray-900 dark:to-gray-950">
        <div className="flex w-full h-64 justify-center items-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-3 p-5 rounded-md bg-white dark:bg-gray-900">
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load cart
        </div>
      </div>
    );
  }

  // Safe-guard: data should exist here if no error & not loading
  if (!data) {
    return (
      <div className="p-5">Unexpected error: No cart data</div>
    );
  }

  // Empty cart check
  const isEmpty = !data.products || data.products.length === 0;

  if (isEmpty) {
    return (
      <div className="p-5 rounded-md bg-white dark:bg-gray-900">
        <div className="text-center py-12 text-gray-500">
          Your cart is empty.
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex xl:flex-row flex-col gap-8">
      <div className="flex-1">
     {data.products && <ProductSection products={data.products} />}   
      </div>
      <div className="w-full xl:w-[400px]">
        <Payment
          price={data.price}
          totalDiscount={data.totalDiscount}
          totalNumberOfProducts={10}
          totalPriceWithDiscount={data.finalPrice}
        />
      </div>
    </div>
  );
};

export default Cart;