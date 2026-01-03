import ProductCard from "./productCard"
import type {  CartProductType } from "../../types";

const ProductSection = ({products}:{products:CartProductType[]}) => {
  console.log(products)
  return (
    <div className=" w-full  flex flex-col gap-5">
{products.map(p=>{
  return <ProductCard id={p.id}  key={p.id} quantity={p.quantity} img={p.img} price={p.price} name={p.name}  discountPercentage={p.discountPercentage}/>
})}
    </div>
  )
}

export default ProductSection


