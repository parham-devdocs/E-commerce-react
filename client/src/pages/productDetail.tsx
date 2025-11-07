
import Price from '../components/productDetails/price'
import iphone11 from "../../public/iphone-11-header.png";

const index = () => {
  return (
    <div className=' flex items-center justify-center  '>
        <Price   title="گوشی هوشمند سامسونگ گلکسی S24"
        images={[iphone11]}
  colors={["#1e2939","#4a5565"]}
  price= {24500000}
  discountPercentage= {20}/>
  
    </div>
)
}

export default index