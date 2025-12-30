


const Loader = ({size}:{size:"sm"|"md"|"lg"}) => {
 const circleSizeClasses={sm:"w-8 h-8" , md:"w-12 h-12" , lg:"w-18 h-18"}
 const pointSizeClasses={sm:"w-2 h-2" , md:"w-4 h-4" , lg:"w-6 h-6"}
  return (
    <div className={`bg-transparent rounded-full border-4 border-t-transparent  border-red-500 ${circleSizeClasses[size]} animate-spin flex items-center justify-center`}> 
    <div className={` rounded-full ${pointSizeClasses[size]} bg-red-500 animate-ping`}/>
     </div>
  )
}

export default Loader