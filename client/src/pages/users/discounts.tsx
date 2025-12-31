

import  { useState } from 'react'
import Pagination from '../../components/pagination'
import ProductCard from '../../components/productCard';
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import Header from '../../components/header';
import { useParams } from 'react-router-dom';
import { useGetDiscountedProducts } from '../../queries/productsQueries';
import Loader from '../../components/loader';

const Discounts = () => {
  const [currentPage,setCurrentPage]=useState(1)
  const {data:discounts,isError,error,isLoading}=useGetDiscountedProducts(currentPage,200)
  const {category}=useParams() 
  return (
    <div className=' w-full h-auto flex items-center flex-col gap-12'>
        {isError &&   <div className="h-64 flex items-center justify-center text-red-500"> Failed to load recent products: {error?.message}</div>}
        {isLoading &&   <Loader size='lg'/>}

      <Header title={category as string}/>
                <div className=' flex items-center justify-center flex-wrap gap-8  '>
                  {discounts?.data.map(item=>{
                    return <ProductCard key={item.id} id={item.id} inStock={item.inStock} shortDescription={item.description} src={item.images[0]} name={item.name} price={item.price} discountPercentage={item.discountPercentage} />
                  })}
                </div>

        <Pagination pages={20} onClickHandler={(e)=>{setCurrentPage(e)}}/>

    </div>
  )
}

export default Discounts