import ProductCard from "./productCard"
import iphone11 from "../../../public/iphone-11-header.png";
const products=[
  {
    "id":"1",
    "img": iphone11,
    "productName": "Laptop Pro 15",
    "price": 1299.99,
    "discountPercentage": 15,
    "defaultNumberOfProducts": 1
  },
  {
    "id":"1",
    "img": iphone11,
    "productName": "Wireless Headphones",
    "price": 199.99,
    "discountPercentage": 20,
    "defaultNumberOfProducts": 1
  },
  {
    "id":"1",

    "img": iphone11,
    "productName": "Smart Watch Series 5",
    "price": 299.99,
    "discountPercentage": 10,
    "defaultNumberOfProducts": 1
  },
  {
    "id":"1",

    "img": iphone11,
    "productName": "Bluetooth Speaker",
    "price": 89.99,
    "discountPercentage": 25,
    "defaultNumberOfProducts": 2
  },
  {
    "id":"1",

    "img":iphone11,
    "productName": "Gaming Mouse RGB",
    "price": 59.99,
    "discountPercentage": 5,
    "defaultNumberOfProducts": 1
  }
]
const ProductSection = () => {
  return (
    <div className=" w-full  flex flex-col gap-5">
{products.map(p=>{
  return <ProductCard id={p.id}  img={p.img} price={p.price} productName={p.productName} defaultNumberOfProducts={p.defaultNumberOfProducts} discountPercentage={p.discountPercentage}/>
})}
    </div>
  )
}

export default ProductSection


