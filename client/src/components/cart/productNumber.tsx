


const ProductNumber = ({number,onChangeHandler,increaseHandler,decreaseHandler}:{number:number,onChangeHandler:(e:string)=>void,increaseHandler:()=>void,decreaseHandler:()=>void}) => {
    
  return (
<div className="flex gap-2 items-center">
  <input 
    type="number" 
    name="" 
    value={number} 
    onChange={(e) => onChangeHandler(e.currentTarget.value)}
    className="w-16 h-10 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
  />
  <div className="flex flex-col gap-1 items-center">
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      onClick={()=>increaseHandler()}
    >
      +
    </button>
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      onClick={()=>decreaseHandler()}
    >
      -
    </button>
  </div>
</div>
  )
}

export default ProductNumber