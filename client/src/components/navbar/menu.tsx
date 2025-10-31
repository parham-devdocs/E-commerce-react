import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Picture from "../../../public/iphone-11-header.png";
const menuData = [
    {
      id: 1,
      name: "موبایل",
      path: "/category/mobile",
      products: [
        { id: 101, name: "آیفون ۱۵", path: "/product/iphone-15",src:Picture },
        { id: 102, name: "سامسونگ گلکسی S24", path: "/product/galaxy-s24" },
        { id: 103, name: "شیائومی ۱۴", path: "/product/xiaomi-14" },
        { id: 104, name: "هوآوی P60", path: "/product/huawei-p60" },
        { id: 105, name: "اپو فایند ایکس۷", path: "/product/oppo-find-x7" }
      ]
    },
    {
      id: 2,
      name: "لپ‌تاپ",
      path: "/category/laptop",
      products: [
        { id: 201, name: "مک‌بوک ایر M3", path: "/product/macbook-air-m3" },
        { id: 202, name: "دل اینسپایرون", path: "/product/dell-inspiron" },
        { id: 203, name: "لنوو تینک‌پد", path: "/product/lenovo-thinkpad" },
        { id: 204, name: "اچ‌پی پاویلیون", path: "/product/hp-pavilion" },
        { id: 205, name: "ایسوس روگ", path: "/product/asus-rog" }
      ]
    },
    {
      id: 3,
      name: "تلویزیون",
      path: "/category/tv",
      products: [
        { id: 301, name: "سامسونگ QLED 55 اینچ", path: "/product/samsung-qled-55" },
        { id: 302, name: "ال‌جی OLED 65 اینچ", path: "/product/lg-oled-65" },
        { id: 303, name: "سونی براویا 4K", path: "/product/sony-bravia-4k" },
        { id: 304, name: "شیائومی تی‌وی پی", path: "/product/xiaomi-tv-p" }
      ]
    },
    {
      id: 4,
      name: "لباس مردانه",
      path: "/category/men-clothing",
      products: [
        { id: 401, name: "پیراهن رسمی", path: "/product/men-formal-shirt" },
        { id: 402, name: "شلوار جین راسته", path: "/product/men-straight-jeans" },
        { id: 403, name: "کت و شلوار", path: "/product/men-suit" },
        { id: 404, name: "پولوشرت", path: "/product/men-polo" },
        { id: 405, name: "پیراهن مجلسی", path: "/product/men-dress-shirt" }
      ]
    },
    {
      id: 5,
      name: "لباس زنانه",
      path: "/category/women-clothing",
      products: [
        { id: 501, name: "مانتو دوخت دست", path: "/product/handmade-manteau" },
        { id: 502, name: "لباس مجلسی", path: "/product/women-evening-dress" },
        { id: 503, name: "شلوارک ورزشی", path: "/product/women-leggings" },
        { id: 504, name: "بلوز پف‌دار", path: "/product/puff-sleeve-blouse" },
        { id: 505, name: "لباس راحتی", path: "/product/women-loungewear" }
      ]
    },
    {
      id: 6,
      name: "کفش",
      path: "/category/shoes",
      products: [
        { id: 601, name: "کفش رسمی مردانه", path: "/product/men-formal-shoes" },
        { id: 602, name: "کفش پاشنه بلند", path: "/product/high-heel" },
        { id: 603, name: "اسنیکر نایکی", path: "/product/nike-sneakers" },
        { id: 604, name: "کفش ورزشی آدیداس", path: "/product/adidas-sport-shoes" },
        { id: 605, name: "صندل تابستانه", path: "/product/summer-sandals" }
      ]
    },
    {
      id: 7,
      name: "آرایشی",
      path: "/category/makeup",
      products: [
        { id: 701, name: "رژلب مات", path: "/product/matte-lipstick" },
        { id: 702, name: "کرم کانسیلر", path: "/product/concealer" },
        { id: 703, name: "سایه چشم", path: "/product/eyeshadow-palette" },
        { id: 704, name: "ریمل ضد آب", path: "/product/waterproof-mascara" },
        { id: 705, name: "خط چشم مایع", path: "/product/liquid-eyeliner" }
      ]
    },
    {
      id: 8,
      name: "عطر",
      path: "/category/perfume",
      products: [
        { id: 801, name: "عطر مردانه دیور", path: "/product/dior-sauvage" },
        { id: 802, name: "عطر زنانه شانل", path: "/product/chanel-coco" },
        { id: 803, name: "عطر داخلی گلاب", path: "/product/golab-perfume" },
        { id: 804, name: "ادکلن توم فورد", path: "/product/tom-ford-oud" },
        { id: 805, name: "عطر مردانه دیور", path: "/product/dior-sauvage" },
        { id: 806, name: "عطر زنانه شانل", path: "/product/chanel-coco" },
        { id: 807, name: "عطر داخلی گلاب", path: "/product/golab-perfume" },
        { id: 808, name: "ادکلن توم فورد", path: "/product/tom-ford-oud" },
        { id: 809, name: "عطر مردانه دیور", path: "/product/dior-sauvage" },
        { id: 810, name: "عطر زنانه شانل", path: "/product/chanel-coco" },
        { id: 811, name: "عطر داخلی گلاب", path: "/product/golab-perfume" },
        { id: 812, name: "ادکلن توم فورد", path: "/product/tom-ford-oud" }
      ]
    },
    {
      id: 9,
      name: "کتاب",
      path: "/category/books",
      products: [
        { id: 901, name: "دن کیشوت", path: "/product/don-quixote" },
        { id: 902, name: "شاهنامه فردوسی", path: "/product/shahnameh" },
        { id: 903, name: "۱۹۸۴ جورج اورول", path: "/product/1984-orwell" },
        { id: 904, name: "کتابخانه نیمه‌شب", path: "/product/midnight-library" },
        { id: 905, name: "روانشناسی رنگ", path: "/product/psychology-of-color" }
      ]
    },
    {
      id: 10,
      name: "لوازم خانگی",
      path: "/category/home-appliances",
      products: [
        { id: 1001, name: "ماشین لباسشویی", path: "/product/washing-machine" },
        { id: 1002, name: "یخچال دو درب", path: "/product/double-door-fridge" },
        { id: 1003, name: "مایکروویو", path: "/product/microwave" },
        { id: 1004, name: "جاروبرقی رباتیک", path: "/product/robot-vacuum" },
        { id: 1005, name: "اجاق گاز", path: "/product/gas-stove" }
      ]
    },
    {
      id: 11,
      name: "ابزار آشپزی",
      path: "/category/cookware",
      products: [
        { id: 1101, name: "سوخاری‌ساز", path: "/product/toaster" },
        { id: 1102, name: "دستگاه قهوه‌ساز", path: "/product/coffee-maker" },
        { id: 1103, name: "هود آشپزخانه", path: "/product/kitchen-hood" },
        { id: 1104, name: "مخلوط‌کن", path: "/product/blender" },
        { id: 1105, name: "دیگ فشار", path: "/product/pressure-cooker" }
      ]
    },
    {
      id: 12,
      name: "کالاهای ورزشی",
      path: "/category/sports",
      products: [
        { id: 1201, name: "توپ فوتبال", path: "/product/football-ball" },
        { id: 1202, name: "دمبل ۵ کیلویی", path: "/product/5kg-dumbbell" },
        { id: 1203, name: "حصیر یوگا", path: "/product/yoga-mat" },
        { id: 1204, name: "کفش دویدن", path: "/product/running-shoes" },
        { id: 1205, name: "کوله‌پشتی ورزشی", path: "/product/sports-backpack" }
      ]
    }
  ];

  const Menu = ({onClose,isDisplayed}:{onClose:()=>void,isDisplayed:boolean}) => {
    const [selectedId, setSelectedId] = useState(1);
  const menuRef=useRef<HTMLDivElement>(null)
  
    const selectedCategory = menuData.find(cat => cat.id === selectedId);
 
    return (
<div 
  className={`fixed inset-0 z-40 bg-transparent ${isDisplayed ? " block" : " hidden"} `} 
  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;
    if (
      menuRef.current &&
      target instanceof Node &&
      !menuRef.current.contains(target)
    ) {
      onClose()
    }
  }}
> <div
  ref={menuRef}

  className={`fixed top-16 right-0 left-0 mx-auto mt-2 z-50 w-full max-w-7xl px-6 py-5
    bg-white rounded-xl shadow-xl border border-gray-100
    transition-all duration-500 ease-out transform
    ${isDisplayed 
      ? 'opacity-100 translate-y-0'        
      : 'opacity-0 translate-y-2'}        
  `}
        style={{ maxHeight: '80vh' }} 
      >
        <div className="flex flex-row-reverse gap-12 h-[70vh]"> {/* Constrain height */}
          {/* Category List */}
          <div className="w-1/4 min-w-[200px] flex-shrink-0">
            <nav className="space-y-2 overflow-y-auto pr-2 h-full">
              {menuData.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  onMouseEnter={() => setSelectedId(cat.id)}
                  className={`block px-4 py-2.5 rounded-lg text-right transition-all duration-200
                    ${selectedId === cat.id
                      ? 'bg-red-50 text-red-700 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
  <div className=" h-full my-2 w-1 rounded-full bg-red-500"></div>
          {/* Scrollable Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedCategory?.products.map((product) => (
                <Link
                  key={product.id}
                  to={product.path}
                  className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="relative w-full flex flex-col">
                    <img
                      src={product.src || Picture} // Use product-specific image if available
                      alt={product.name}
                      className="w-full h-32 object-contain mb-2" // Fixed height for uniformity
                    />
                    <span className="text-sm text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 text-center">
                      {product.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
     
    );
  };
export default Menu