import Button from '../button'
import usePrice from "../../hooks/priceHook";
import { BiCartAlt, BiCreditCard} from 'react-icons/bi';
import { GiPriceTag } from 'react-icons/gi';
import {  MdOutlineDiscount } from 'react-icons/md';

const Payment = ({totalNumberOfProducts,totalDiscount,totalPriceWithDiscount,price}:{totalNumberOfProducts:number,price:number,totalDiscount:number,totalPriceWithDiscount:number}) => {
const {seperatedPrice:seperatedTotalPrice}=usePrice({priceOrDiscount:price})
const {seperatedPrice:seperatedTotalPriceWithDiscount}=usePrice({priceOrDiscount:totalPriceWithDiscount})
const {seperatedPrice:seperatedTotalDiscount}=usePrice({priceOrDiscount:totalDiscount})

  return (
    <div className="w-full px-6 py-6 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    {/* Total Products */}
    <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
      <div className=' flex items-center gap-1'><BiCartAlt className=' text-gray-600 dark:text-gray-300'/> <p className="text-gray-600 dark:text-gray-300 font-medium">تعداد کل محصول</p></div>
      <div className="flex items-center gap-2">
        
        <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
          {totalNumberOfProducts}
        </span>
      </div>
    </div>
    <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700">
     <div className=' flex gap-1 items-center'><GiPriceTag className=' text-gray-600 dark:text-gray-300'/> <p className="text-gray-600 dark:text-gray-300 font-medium">مجموع قیمت </p></div>
      <span className="text-gray-600 dark:text-gray-500 line-through font-semibold text-lg">
        {seperatedTotalPrice} تومان
      </span>
    </div>
    {/* Discount */}
    <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700">
    <div className=' flex gap-1 items-center'> <MdOutlineDiscount className=' text-gray-600 dark:text-gray-300'/>   <p className="text-gray-600 dark:text-gray-300 font-medium">تخفیف</p></div>
      <span className="text-gray-600 dark:text-red-500 font-semibold text-lg">
        {seperatedTotalDiscount} تومان
      </span>
    </div>
  
    {/* Final Price */}
    <div className="flex justify-between items-center py-4">
    <div className=' flex gap-1 items-center'> <BiCreditCard size={20} className=' text-gray-600 dark:text-gray-300'/>    <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">مبلغ قابل پرداخت</p></div>
      <span className="text-2xl font-extrabold dark:text-gray-300 text-gray-900 ">
        {seperatedTotalPriceWithDiscount} تومان
      </span>
    </div>
  
    {/* Checkout Button */}
    <div className="mt-6 mx-auto">
      <Button 
        style={{ 
          size: "md",
        }} 
        link={{ 
          text: "نهایی سازی خرید", 
          href: "/payment" 
        }} 
      />
    </div>
  </div>
  )
}

export default Payment