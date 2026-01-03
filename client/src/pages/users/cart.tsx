
import Payment from '../../components/cart/payment'
import ProductSection from '../../components/cart/productSection'
import Loader from '../../components/loader';
import { useFindWholeCart } from "../../queries/cartQueries";
const Cart = () => {
  const {data,isError,isLoading}=useFindWholeCart()
  if (!data ||isLoading) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <div className="flex w-full h-full justify-center items-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className="space-y-3 dark:bg-gradient-to-br p-5 rounded-md bg-white bg-gradient- dark:from-gray-900 dark:to-gray-950">
        <div className="h-64 flex items-center justify-center text-red-500">
          Failed to load carts
        </div>
      </div>
    );
  }
  return (
    <div className=' flex xl:flex-row flex-col gap-8'>
      <div className=' flex-1 '> <ProductSection products={data.products}/></div>
      <div className=' w-full xl:w-xl'>
         <Payment price={15000000} totalDiscount={500000} totalNumberOfProducts={10} totalPriceWithDiscount={12000000}/>\
        
      </div>  

    </div>
  )
}

export default Cart