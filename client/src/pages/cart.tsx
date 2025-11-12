
import Payment from '../components/cart/payment'

const Cart = () => {
  return (
    <div className=' flex xl:flex-row flex-col gap-8'>
      <div className=' flex-1 bg-amber-950'></div>
      <div className=' w-full xl:w-xl'> <Payment price={15000000} totalDiscount={500000} totalNumberOfProducts={10} totalPriceWithDiscount={12000000}/></div>  

    </div>
  )
}

export default Cart