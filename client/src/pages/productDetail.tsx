
import Price from '../components/productDetails/price'
import iphone11 from "../../public/iphone-11-header.png";
import CircleSlider from '../components/landingPage/circleSlider';
import Gallery from '../components/productDetails/gallery';
import Details from '../components/productDetails/details';

const index = () => {
  return (
    <div className=' w-full flex items-center justify-center'>
<div className=' flex items-center justify-center flex-col gap-5 w-full md:w-[700px] '>
        <Price   title="گوشی هوشمند سامسونگ گلکسی S24"
        images={[iphone11]}
  colors={["#1e2939","#4a5565"]}
  price= {24500000}
  discountPercentage= {20}/>
  <Gallery/>
  <Details/>
    </div>
    </div>
    
)
}

export default index