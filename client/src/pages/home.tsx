import CategorySection from '../components/landingPage/categorySection'
import CircleSlider from '../components/landingPage/circleSlider'
import DiscountSlider from '../components/landingPage/discountSlider'
import HeroSlider from '../components/landingPage/heroSlider'

const Home = () => {
  return (
    <div className=' space-y-5 ' >
        <HeroSlider/>
        <DiscountSlider title='تخفیفات ' />
        <CategorySection/>
        <CircleSlider title='پرفروش ها' autoPlay/>
        </div>
  )
}

export default Home