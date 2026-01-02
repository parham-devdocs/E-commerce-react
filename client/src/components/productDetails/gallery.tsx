import Header from "../header";
const Gallery = ({images}:{images:string[]}) => {
    
  return (
    <div className=" flex w-full flex-col">
          <Header title="تصاویر"/>
          

  <div className=' w-full justify-between flex items-center overflow-x-auto  rounded-md shadow-2xl p-5 gap-3  '>
{images.map(image=>{return <img src={`http://localhost:5000/uploads/${image.trim()}`} className=" w-32 h-32 rounded-md"/>})}
    </div>

    </div>
  
  )
}

export default Gallery