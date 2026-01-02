import type { KeyValuePair } from "../../types";
import Header from "../header";

interface DetailsProps {
  attributes: KeyValuePair[];
}
const Details = ({attributes}:any) => {
console.log(attributes)
  return (
    <div className=" w-full flex-col flex items-center ">
      <Header title="مشخصات"/>
      <div className=" w-full flex flex-wrap gap-3 items-center justify-center rounded-md shadow-2xl p-5 ">
      {attributes.map(attr=>{
        console.log(attr)
        return (
          <div 
            dir="rtl" 
            className="px-2 py-1 min-h-14 w-48  rounded-md dark:bg-gray-800 dark:bg-opacity-80 bg-gray-100 relative flex items-center justify-center"
          >
            <p 
              className="absolute text-[10px]  top-1 right-3 text-gray-500 dark:text-gray-400 font-light truncate"
              aria-hidden="true"
            >
              {attr.key}
            </p>
        
            <p className="text-gray-800 text-xs dark:text-white font-medium mt-5 break-words text-center max-w-full">
              {attr.value}
            </p>
          </div>
        );
      })}
    </div>
    </div>
    
 )
}
export default Details