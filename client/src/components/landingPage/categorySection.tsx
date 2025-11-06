import { Link } from "react-router-dom";
import iphoneImage from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import Header from "../header";
const CategorySection = () => {
    const categories = [
        { id: 1, name: "کفش", path: "/shoes", image: iphoneImage },
        { id: 2, name: "لوازم الکترونیکی", path: "/electronics", image: iphoneImage },
        { id: 3, name: "پوشاک", path: "/clothing", image: iphoneImage },
        { id: 4, name: "خانه و آشپزخانه", path: "/home-kitchen", image: iphoneImage },
        { id: 5, name: "آرایشی و بهداشتی", path: "/beauty", image:iphoneImage },
        { id: 6, name: "کتاب", path: "/books", image:iphoneImage },
        { id: 7, name: "ورزش و فضای باز", path: "/sports", image: iphoneImage },
        { id: 8, name: "اسباب‌بازی و بازی", path: "/toys", image: iphoneImage },
        { id: 9, name: "جواهرات", path: "/jewelry", image: iphoneImage },
        { id: 10, name: "ساعت", path: "/watches", image: iphoneImage },
        { id: 11, name: "کیف و اکسسوری", path: "/bags", image: iphoneImage },
        { id: 12, name: "سلامت و تندرستی", path: "/health", image: iphoneImage }
      ];  return (
        <div className="w-full 
        bg-gradient-to-br from-red-50 to-white 
        dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 
        rounded-lg mx-auto px-4 py-6">
      
        <Header link="/cats" title="دسته بندی ها"/>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              to={cat.path}
              key={cat.id}
              className="group flex flex-col items-center text-center 
                bg-white dark:bg-gray-800
                rounded-xl shadow-sm hover:shadow-md 
                transition-all duration-200 
                overflow-hidden border border-gray-100 dark:border-neutral-900"
            >
              <div className="w-full aspect-square flex items-center justify-center p-4 
                bg-gray-50 dark:bg-gray-700/90">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full rounded-md h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 px-2 pb-3 font-medium 
                text-gray-800 dark:text-gray-200 
                text-sm line-clamp-1">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
  )
}

export default CategorySection