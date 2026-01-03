

import  { useState } from 'react'
import Pagination from '../../../components/pagination'
import ProductCard from '../../../components/productCard';
import Header from '../../../components/header';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/loader';
import { useGetProducts } from '../../../queries/productsQueries';
import uriDecoder from '../../../utils/uriDecoder';

const Products = () => {
  const [currentPage,setCurrentPage]=useState(1)
  const {data:products,isError,error,isLoading}=useGetProducts(currentPage,10)
  const {category}=useParams() 
  const decodedUri=category && decodeURI(category)

  return (
    <div className=' w-full h-auto flex items-center flex-col gap-12'>
         {isError &&   <div className="h-64 flex items-center justify-center text-red-500"> Failed to load recent products: {error?.message}</div>}
        {isLoading &&   <Loader size='lg'/>}

      <Header title={decodedUri as string}/>

                <div className=' flex items-center justify-center flex-wrap gap-8  '>
                  {products?.data.map(item=>{
                    return <ProductCard key={item.id} id={item.id} inStock={item.inStock} shortDescription={item.description} src={item.images[0]} name={item.name} price={item.price} discountPercentage={item.discountPercentage} />
                  })}
                </div>

        <Pagination pages={20} onClickHandler={(e)=>{setCurrentPage(e)}}/>

    </div>
  )
}

export default Products