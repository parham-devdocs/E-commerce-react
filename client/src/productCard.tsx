import { Link } from "react-router-dom";

const Card = ({
  image,
  slideWidth,
  name,
  category,
  brand,
  count,
  priceWithDiscount,
  price,
  discountPercent,
  path
}: {
  image: string;
  brand: string;
  category: string;
  count: string; // or consider using number if possible
  name: string;
  priceWithDiscount: number;
  price: number;
  slideWidth: string;
  discountPercent: number;
  path: string;
}) => {
  // Convert count to number safely
  const stockCount = Number(count);

  return (
    <div
      className={`group w-${slideWidth} flex flex-col h-full rounded-xl border border-gray-200 bg-white 
                  overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300
                  hover:-translate-y-1`}
    >
      {/* Image Container - Fixed Aspect */}
      <div className="relative bg-gray-50 aspect-square w-full flex items-center justify-center p-4">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          %{discountPercent}
        </div>

        {/* Low Stock Badge (only if count < 5) */}
        {stockCount < 5 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {stockCount} موجود
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 leading-tight mb-3 line-clamp-2 text-right">
          {name}
        </h3>
        <h3 className="text-sm font-medium text-gray-800 leading-tight mb-3 line-clamp-2 text-right">
          {category}
        </h3>
        <h3 className="text-sm font-medium text-gray-800 leading-tight mb-3 line-clamp-2 text-right">
          {brand}
        </h3>

        {/* Price Section */}
        <div className="space-y-1">
          {/* Final Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-red-600">
              {priceWithDiscount} تومان
            </span>
          </div>

          {/* Original Price */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm line-through">
              {price} تومان
            </span>
          </div>
        </div>

        <Link
          to={path}
          className="mt-3 flex items-center justify-center w-full py-2 bg-gradient-to-r from-red-500 to-red-600 
                     text-white text-sm font-medium rounded-lg
                     hover:from-red-600 hover:to-red-700 transition-all
                     shadow-md hover:shadow-lg"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
};

export default Card;