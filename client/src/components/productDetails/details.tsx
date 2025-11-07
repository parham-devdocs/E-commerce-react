import Header from "../header";

const Details = () => {
  const details = [
    { key: "نام دستگاه", value: "آیفون 15 پرو", flag: "essential" },
    { key: "مدل", value: "A2849", flag: "technical" },
    { key: "صفحه‌نمایش", value: "6.1 اینچ، Super Retina XDR OLED", flag: "display" },
    { key: "پردازنده", value: "چیپ A17 Pro، 6 هسته‌ای", flag: "performance" },
    { key: "حافظه رم", value: "8 گیگابایت", flag: "memory" },
    { key: "ظرفیت ذخیره‌سازی", value: "256 گیگابایت", flag: "storage" },
    { key: "دوربین عقب", value: "48 مگاپیکسل (اصلی) + 12 مگاپیکسل (اولترا واید)", flag: "camera" },
    { key: "دوربین جلو", value: "12 مگاپیکسل، TrueDepth", flag: "camera" },
    { key: "باتری", value: "تا 29 ساعت پخش ویدیو", flag: "battery" },
    { key: "مقاومت آب و گردوغبار", value: "IP68 (تا 6 متر برای 30 دقیقه)", flag: "durability" }
  ];
  return (
    <div className=" w-full flex-col flex items-center ">
      <Header title="مشخصات"/>
      <div className=" w-full flex flex-wrap gap-3 items-center justify-center rounded-md shadow-2xl p-5 ">
      {details.map(attr=>{
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