

import React, { useState } from 'react'
import Pagination from '../../components/pagination'
import ProductCard from '../../components/productCard';
import iphone14 from "../../../public/iPhone_14_Blue_PDP_Image_Position-1A__WWEN.webp";
import Header from '../../components/header';
import { useParams } from 'react-router-dom';
const products = [
  {
    id: "iphone14-pro-max-256gb",
    src: iphone14,
    category:"smart phone",
    name: "آیفون 14 پرو مکس",
    shortDescription: "گوشی هوشمند اپل با نمایشگر داینامیک آی‌ام‌او‌ال، چیپست A16 بایونیک و دوربین 48 مگاپیکسلی",
    price: 100000000,
    discountPercentage: 10,
    inStock: true,
  },
  {
    id: "samsung-s23-ultra-512gb",
    src: iphone14,
    category:"smart phone",
    name: "سامسونگ گلکسی اس 23 الترا",
    shortDescription: "گوشی پرچمدار سامسونگ با دوربین 200 مگاپیکسلی، چیپست اسنپدراگون 8 جنریشن 2 و قلم S Pen داخلی",
    price: 85000000,
    discountPercentage: 15,
    inStock: true,
  },
  {
    id: "xiaomi-13-pro-256gb",
    src:iphone14,
    category:"smart phone",

    name: "شیائومی 13 پرو",
    shortDescription: "گوشی لوکس شیائومی با لنز لایکا، نمایشگر 120 هرتز و شارژ سریع 120 واتی",
    price: 62000000,
    discountPercentage: 8,
    inStock: true,
  },
  {
    id: "macbook-pro-14-m2",
    src: iphone14,
    category:"smart phone",

    name: "مک‌بوک پرو 14 اینچی ام2 پرو",
    shortDescription: "لپ‌تاپ حرفه‌ای اپل با چیپست M2 Pro، نمایشگر لیکوید رتینا و عمر باتری 18 ساعته",
    price: 185000000,
    discountPercentage: 5,
    inStock: false,
  },
  {
    id: "airpods-pro-2",
    src: iphone14,
    category:"smart phone",

    name: "ایرپادز پرو نسل دوم",
    shortDescription: "هدفون بی‌سیم اپل با حذف نویز فعال، صدای فضایی و مقاومت در برابر عرق",
    price: 12500000,
    discountPercentage: 20,
    inStock: true,
  },
  {
    id: "ipad-air-5-64gb",
    src: iphone14,
    category:"smart phone",

    name: "آیپد ایر 2022",
    shortDescription: "تبلت قدرتمند اپل با چیپست M1، نمایشگر 10.9 اینچی و پشتیبانی از استایلوس اپل",
    price: 48000000,
    discountPercentage: 12,
    inStock: true,
  },
  {
    id: "sony-wh1000xm5",
    src: iphone14,
    category:"smart phone",

    name: "هدفون سونی WH-1000XM5",
    shortDescription: "هدفون بی‌سیم حرفه‌ای با بهترین حذف نویز، کیفیت صدای استودیویی و عمر باتری 30 ساعت",
    price: 18000000,
    discountPercentage: 25,
    inStock: true,
  },
  {
    id: "dell-xps-13-9320",
    src: iphone14,
    name: "دل ایکس‌پی‌اس 13",
    category:"smart phone",

    shortDescription: "لپ‌تاپ سبک و زیبا با بدنه آلومینیومی، نمایشگر 4K و عملکرد عالی برای کار",
    price: 95000000,
    discountPercentage: 0,
    inStock: true,
  },
  {
    id: "apple-watch-ultra",
    src: iphone14,
    category:"smart phone",

    name: "اپل واچ الترا",
    shortDescription: "ساعت هوشمند اپل برای ورزش‌های شدید با بدنه تیتانیومی، عمر باتری 36 ساعت و GPS دوگانه",
    price: 32000000,
    discountPercentage: 7,
    inStock: false,
  },
  {
    id: "galaxy-tab-s9-ultra",
    src: iphone14,
    category:"smart phone",

    name: "گلکسی تب اس 9 الترا",
    shortDescription: "تبلت پرچمدار سامسونگ با نمایشگر 14.6 اینچی، چیپست اسنپدراگون 8 جنریشن 2 و قلم S Pen",
    price: 75000000,
    discountPercentage: 18,
    inStock: false,
  },
  {
    id: "pixel-7-pro-256gb",
    src: iphone14,
    name: "گوگل پیکسل 7 پرو",
    category:"smart phone",

    shortDescription: "گوشی هوشمند گوگل با هوش مصنوعی پیشرفته، دوربین عالی و به‌روزرسانی‌های 7 ساله",
    price: 58000000,
    discountPercentage: 13,
    inStock: true,
  },
  {
    id: "bose-quietcomfort-ultra",
    src: iphone14,
    name: "هدفون بوس کوایت‌کامفرت الترا",
    category:"smart phone",

    shortDescription: "هدفون بی‌سیم با فناوری صدای فضایی ایموسیون و حذف نویز پیشرفته",
    price: 22000000,
    discountPercentage: 10,
    inStock: true,
  },
  {
    id: "huawei-matepad-pro",
    src: iphone14,
    name: "هواوی میت‌پد پرو",
    category:"smart phone",

    shortDescription: "تبلت لوکس هواوی با نمایشگر OLED 12.2 اینچی و همکاری هوشمند با سایر دستگاه‌ها",
    price: 42000000,
    discountPercentage: 5,
    inStock: false,
  },
  {
    id: "razer-blade-16",
    src: iphone14,
    category:"smart phone",

    name: "ریزر بلید 16 اینچ",
    shortDescription: "لپ‌تاپ گیمینگ حرفه‌ای با کارت گرافیک RTX 4090، نمایشگر دوگانه و خنک‌کننده پیشرفته",
    price: 220000000,
    discountPercentage: 0,
    inStock: true,
  },
  {
    id: "samsung-odyssey-g9",

    category:"smart phone",

    src: iphone14,
    name: "مانیتور سامسونگ اودیسی جی9",
    shortDescription: "مانیتور گیمینگ منحنی 49 اینچی با نرخ نوسازی 240 هرتز و رزولوشن DQHD",
    price: 65000000,
    discountPercentage: 22,
    inStock: true,
  },
  {
    id: "logitech-mx-master-3s",
    src: iphone14,
    category:"smart phone",

    name: "ماوس لوژیتک ام‌ایکس مستر 3اس",
    shortDescription: "ماوس حرفه‌ای برای طراحان و برنامه‌نویسان با دقت بالا و طراحی ارگونومیک",
    price: 8500000,
    discountPercentage: 15,
    inStock: true,
  },
  {
    id: "anker-solix-f3800",
    src: iphone14,
    category:"smart phone",
    name: "پاور استیشن انکر سولیکس اف3800",
    shortDescription: "باتری ذخیره انرژی خورشیدی 3840 واتی برای استفاده در خانه و سفر",
    price: 380000000,
    discountPercentage: 5,
    inStock: false,
  },
  {
    id: "dyson-v15-detect",
    src: iphone14,
    category:"smart phone",
    name: "جاروبرقی دایسون وی15 دی‌تکت",
    shortDescription: "جاروبرقی بی‌سیم هوشمند با سنسور لیزری برای تشخیص گرد و غبار و مکش فوق‌العاده",
    price: 45000000,
    discountPercentage: 0,
    inStock: true,
  },
  {
    id: "apple-vision-pro",
    src: iphone14,
    category:"smart phone",
    name: "اپل ویژن پرو",
    shortDescription: "عینک واقعیت ترکیبی اپل با نمایشگرهای 4K، چیپست دوگانه و رابط کاربری با چشم و دست",
    price: 550000000,
    discountPercentage: 0,
    inStock: false,
  },
  {
    id: "nothing-phone-2",
    src: iphone14,
    category:"smart phone",
    name: "ناشین فون 2",
    shortDescription: "گوشی منحصر به فرد با نمایشگر گلوی فون، طراحی شفاف و سیستم عامل سبک و سریع",
    price: 32000000,
    discountPercentage: 20,
    inStock: true,
  }
];
const Products = () => {
  const [currentPage,setCurrentPage]=useState(1)
  const {category}=useParams() 
console.log(category)
  return (
    <div className=' w-full h-auto flex items-center flex-col gap-12'>
      <Header title={category as string}/>
                <div className=' flex items-center justify-center flex-wrap gap-8  '>
                  {products.map(item=>{
                    return <ProductCard key={item.id} id={item.id} inStock={item.inStock} shortDescription={item.shortDescription} src={item.src} name={item.name} price={item.price} discountPercentage={item.discountPercentage} />
                  })}
                </div>

        <Pagination pages={20} onClickHandler={(e)=>{setCurrentPage(e)}}/>

    </div>
  )
}

export default Products