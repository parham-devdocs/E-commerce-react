import { Link } from "react-router-dom";
import noPhotoIcon from "../../../public/259987.png";
import Header from "../header";
import { useGetCategories } from "../../queries/categoryQueries";
import Loader from "../loader";
const CategorySection = () => {
   const {error,data:categories,isLoading}=useGetCategories(1)
      return (
        <div className="w-full 
        bg-gradient-to-br from-red-50 to-white 
        dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 
        rounded-lg mx-auto px-4 py-6">
      
        <Header link="/cats" title="دسته بندی ها"/>
      {isLoading && <div className=" flex w-full h-full justify-center items-center"><Loader size="lg"/></div> }
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories && categories.data.map((cat) => (
            <Link
              to={`categories/${cat.title}`}
              key={cat._id}
              className="group flex flex-col items-center text-center 
                bg-white dark:bg-gray-800
                rounded-xl shadow-sm hover:shadow-md 
                transition-all duration-200 
                overflow-hidden border border-gray-100 dark:border-neutral-900"
            >
              <div className="w-full aspect-square flex items-center justify-center p-4 
                bg-gray-50 dark:bg-gray-700/90">
                <img
                  src={cat.image ? cat.image : noPhotoIcon}
                  className="w-full rounded-md h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 px-2 pb-3 font-medium 
                text-gray-800 dark:text-gray-200 
                text-sm line-clamp-1">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
  )
}

export default CategorySection