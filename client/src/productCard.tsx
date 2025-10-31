const Card = ({ image,slideWidth, title, price, discountPercent, priceAfterDiscount }: {
    image: string;
    title: string;
    price: string;
    slideWidth:string
    discountPercent: string;
    priceAfterDiscount: string;
  }) => {
    return (
      <div className={`group w-${slideWidth}  flex flex-col h-full rounded-xl border border-gray-200 bg-white 
                      overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300
                      hover:-translate-y-1`}>
        
        {/* Image Container - Fixed Aspect */}
        <div className="relative bg-gray-50 aspect-square w-full flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            %{discountPercent}
          </div>
        </div>
  
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-800 leading-tight mb-3 line-clamp-2 text-right">
            {title}
          </h3>
  
          {/* Price Section */}
          <div className="space-y-1">
            {/* Final Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-red-600">
                {priceAfterDiscount} تومان
              </span>
            </div>
  
            {/* Original Price */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm line-through">
                {price} تومان
              </span>
            </div>
          </div>
  
          {/* CTA Button (Optional but powerful) */}
          <button className="mt-3 w-full py-2 bg-gradient-to-r from-red-500 to-red-600 
                            text-white text-sm font-medium rounded-lg
                            hover:from-red-600 hover:to-red-700 transition-all
                            shadow-md hover:shadow-lg">
            افزودن به سبد
          </button>
        </div>
      </div>
    );
  };

  export default Card