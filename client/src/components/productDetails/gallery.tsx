import iphone11 from "../../../public/iphone-11-header.png";
import Header from "../header";
const Gallery = () => {
    const pics=[
        {id:1,src:iphone11},
        {id:2,src:iphone11},
        {id:2,src:iphone11},
        {id:2,src:iphone11},
        {id:2,src:iphone11}
    ]
  return (
    <div className=" flex w-full flex-col">
          <Header title="تصاویر" link="/product/pics"/>
          

  <div className=' w-full justify-between flex items-center overflow-x-auto  rounded-md shadow-2xl p-5 '>
{pics.map(pic=>{return <img src={pic.src} className=" w-32 h-32 rounded-md"/>})}
    </div>

    </div>
  
  )
}

export default Gallery