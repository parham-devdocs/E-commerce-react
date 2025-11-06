import { useState, type ReactNode } from "react";
import wave from "../../public/wave.svg";
import { FaBook, FaBriefcase, FaChartLine, FaCheckCircle, FaFacebook, FaHandshake, FaHeadset, FaHeart, FaHome, FaInfoCircle, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaQuestionCircle, FaShieldAlt, FaShoppingBag, FaStore, FaTag, FaTelegram, FaTruck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import { GiMailbox } from "react-icons/gi";
import { BiMinus, BiPlus } from "react-icons/bi";
type ItemType = {
    name: string
    link:string
    icon:ReactNode
  };
  type Column = {
    [key: string]: ItemType[]
  };
const Footer = () => {
    const [selectedItem,setSelectedItem]=useState<string | null>()
    const items: Column = {
        خدمات: [
          { name: 'سفارش آنلاین', link: '/order', icon: <FaTruck /> },
          { name: 'پیگیری سفارش', link: '/track-order', icon: <FaHeadset /> },
          { name: 'بازگشت کالا', link: '/returns', icon: <FaShieldAlt /> },
          { name: 'پرسش و پاسخ', link: '/faq', icon: <FaQuestionCircle /> },
        ],
        شرکت: [
          { name: 'درباره ما', link: '/about', icon: <FaInfoCircle /> },
          { name: 'تماس با ما', link: '/contact', icon: <FaPhone /> },
          { name: 'آدرس فروشگاه', link: '/stores', icon: <FaMapMarkerAlt /> },
          { name: 'وبلاگ', link: '/blog', icon: <FaHome /> },
        ],
        حساب_کاربری: [
          { name: 'ورود / ثبت‌نام', link: '/login', icon: <FaUser /> },
          { name: 'لیست علاقه‌مندی‌ها', link: '/wishlist', icon: <FaHeart /> },
          { name: 'تخفیف‌ها و کدها', link: '/coupons', icon: <FaTag /> },
          { name: 'سفارشات من', link: '/my-orders', icon: <FaShoppingBag /> },
        ],
        // ➕ New Section 1: Support & Warranty
        "گارانتی و پشتیبانی": [
          { name: 'گارانتی اصالت کالا', link: '/authenticity', icon: <FaCheckCircle /> },
          { name: 'ضمانت بازگشت وجه', link: '/refund-policy', icon: <FaMoneyBillWave /> },
          { name: 'پشتیبانی 24/7', link: '/support', icon: <FaHeadset /> },
          { name: 'راهنمای خرید', link: '/buying-guide', icon: <FaBook /> },
        ],
        // ➕ New Section 2: Business Collaboration
        "همکاری با ما": [
          { name: 'فروشنده شوید', link: '/sell-on-platform', icon: <FaStore /> },
          { name: 'نمایندگی فروش', link: '/reseller', icon: <FaHandshake /> },
          { name: 'تبلیغات و همکاری', link: '/ads', icon: <FaChartLine /> },
          { name: 'فرصت‌های شغلی', link: '/careers', icon: <FaBriefcase /> },
        ],
      };
  return (
    <div className="xl:p-5 ">

        <img src={wave}/>
       <div className="bg-red-500 min-h-24 xl:flex hidden px-8 py-6 text-white w-full justify-between">
  {Object.entries(items).map(([title, list]) => (
    <div key={title} className="flex flex-col gap-2.5 w-48 ">
      <h3 className="font-bold text-sm uppercase tracking-wider opacity-90 mb-1">
        {title}
      </h3>
      <div className="space-y-2">
        {list.map((l, idx) => (
          <Link
            key={idx}
            to={l.link}
            className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-yellow-100 transition-opacity group"
          >
            <span className="text-white group-hover:text-yellow-200 transition-colors">
              {l.icon}
            </span>
            <span className="border-b border-transparent group-hover:border-yellow-200 pb-0.5">
              {l.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  ))}

</div>
<div className="bg-red-500 min-h-24 xl:hidden flex flex-col items-center gap-3 px-8 py-6 text-white w-full justify-between">
  {Object.entries(items).map(([title, list]) => (
    <button key={title} className="flex flex-col gap-2.5  w-full cursor-pointer " onClick={()=>{setSelectedItem(title)}}>
      <div className="font-bold w-full flex justify-between text-sm uppercase tracking-wider opacity-90 mb-1 text-cente border-b-[1px] border-white">
        {title}
      {title === selectedItem ? <BiMinus/> : <BiPlus/>}  
      </div>
      {selectedItem===title &&   <div className="space-y-2">
        {list.map((l, idx) => (
          <Link
            key={idx}
            to={l.link}
            className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-yellow-100 transition-opacity group"
          >
            <span className="text-white group-hover:text-yellow-200 transition-colors">
              {l.icon}
            </span>
            <span className="border-b border-transparent group-hover:border-yellow-200 pb-0.5">
              {l.name}
            </span>
          </Link>
        ))}
      </div>}


    </button>
  ))}

</div>
            <div className="w-full bg-red-500 flex-col py-4 flex flex-wrap items-center justify-center gap-5 md:gap-7 px-4">
  <div className=" flex gap-5">
  <Link
    to="https://facebook.com/yourshop"
    target="_blank"
    rel="noopener noreferrer"
    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
    aria-label="فیسبوک"
  >
    <FaFacebook className="text-white text-lg group-hover:text-white transition-colors" />
  </Link>

  <Link
    to="https://x.com/yourshop"
    target="_blank"
    rel="noopener noreferrer"
    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
    aria-label="توییتر (ایکس)"
  >
    <BsTwitter className="text-white text-lg group-hover:text-white" />
  </Link>

  <Link
    to="https://wa.me/989123456789"
    target="_blank"
    rel="noopener noreferrer"
    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
    aria-label="واتساپ"
  >
    <BsWhatsapp className="text-white text-lg group-hover:text-green-100 transition-colors" />
  </Link>

  <Link
    to="mailto:info@yourshop.ir"
    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
    aria-label="ایمیل"
  >
    <GiMailbox className="text-white text-lg group-hover:text-blue-100 transition-colors" />
  </Link>

  <Link
    to="https://t.me/yourshop"
    target="_blank"
    rel="noopener noreferrer"
    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
    aria-label="تلگرام"
  >
    <FaTelegram className="text-white text-lg group-hover:text-blue-300 transition-colors" />
  </Link>
  </div>
  
</div>
    </div>
  )
}

export default Footer